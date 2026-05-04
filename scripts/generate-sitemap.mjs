#!/usr/bin/env node
/**
 * Regenerate public/sitemap.xml from current ACTIVE hotels in Lovable Cloud.
 *
 * Required env vars:
 *   SUPABASE_URL          (or VITE_SUPABASE_URL)
 *   SUPABASE_ANON_KEY     (or VITE_SUPABASE_PUBLISHABLE_KEY)
 *   SITE_URL              public site origin (default https://cyprus-gold-guide.lovable.app)
 *   VITE_PUBLIC_INDEXING  "true" to apply launch-readiness filtering (production mode)
 *
 * Launch readiness rules (only enforced when PUBLIC_INDEXING=true):
 *   - area must have ≥ 5 active hotels
 *   - area must have ≥ 5 photo-ready hotels
 *     (image_url not 'seed:%', image_alt set, image_verified_at set,
 *      image_license_status in licensed/booking_partner_api/hotel_permission/own_photo)
 *
 * In staging (PUBLIC_INDEXING=false) we still emit all destination URLs so the
 * QA team can verify them.
 */
import { writeFileSync } from "node:fs";

const SITE_URL_RAW = process.env.SITE_URL || "https://cyprus-gold-guide.lovable.app";
const SITE = SITE_URL_RAW.replace(/\/$/, "");
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const PUBLIC_INDEXING =
  String(process.env.VITE_PUBLIC_INDEXING ?? "false").toLowerCase() === "true";

if (!SUPABASE_URL) {
  console.error("[sitemap] FATAL: SUPABASE_URL (or VITE_SUPABASE_URL) is not set.");
  process.exit(1);
}
if (!ANON) {
  console.error("[sitemap] FATAL: SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) is not set.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const AREAS = [
  "ayia-napa",
  "protaras",
  "paphos",
  "larnaca",
  "limassol",
  "coral-bay",
  "polis-latchi",
];
const CATS = ["luxury", "family", "budget"];
const APPROVED_LICENSES = new Set([
  "licensed",
  "booking_partner_api",
  "hotel_permission",
  "own_photo",
]);
const MIN_PHOTO_READY = 5;

const res = await fetch(
  `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/hotels?select=area,category,hotel_slug,is_active,image_url,image_alt,image_license_status,image_verified_at&is_active=eq.true&order=area`,
  { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } },
);
if (!res.ok) {
  console.error(`[sitemap] FATAL: hotels fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const hotels = await res.json();
if (!Array.isArray(hotels)) {
  console.error("[sitemap] FATAL: unexpected hotels response:", hotels);
  process.exit(1);
}

const isPhotoReady = (h) =>
  !!h.image_url &&
  !h.image_url.startsWith("seed:") &&
  !!h.image_alt &&
  !!h.image_verified_at &&
  APPROVED_LICENSES.has(h.image_license_status || "unknown");

const photoReadyByArea = {};
const activeByArea = {};
for (const h of hotels) {
  activeByArea[h.area] = (activeByArea[h.area] || 0) + 1;
  if (isPhotoReady(h)) photoReadyByArea[h.area] = (photoReadyByArea[h.area] || 0) + 1;
}

// Areas allowed in the public sitemap.
const launchReadyAreas = new Set(
  AREAS.filter(
    (a) =>
      (activeByArea[a] || 0) >= MIN_PHOTO_READY && (photoReadyByArea[a] || 0) >= MIN_PHOTO_READY,
  ),
);
const allowedAreas = PUBLIC_INDEXING ? launchReadyAreas : new Set(AREAS);

console.log(
  `[sitemap] PUBLIC_INDEXING=${PUBLIC_INDEXING}; launch-ready areas: ${[...launchReadyAreas].join(", ") || "(none)"}`,
);

const activeCatKeys = new Set();
for (const h of hotels) {
  if (h.area && h.category && h.is_active && allowedAreas.has(h.area)) {
    activeCatKeys.add(`${h.area}|${h.category}`);
  }
}

const seenLocs = new Set();
const urls = [];
const add = (loc, prio = "0.5") => {
  if (seenLocs.has(loc)) return;
  seenLocs.add(loc);
  urls.push(
    `  <url><loc>${SITE}${loc}</loc><lastmod>${today}</lastmod><priority>${prio}</priority></url>`,
  );
};

add("/", "1.0");
add("/where-to-stay", "0.8");
add("/om-oss", "0.5");
add("/kontakt", "0.5");
add("/annonslankar", "0.4");
add("/integritetspolicy", "0.3");
add("/cookies", "0.3");
add("/villkor", "0.3");

for (const a of AREAS) {
  if (!allowedAreas.has(a)) continue;
  add(`/hotell/${a}`, "0.9");
  for (const c of CATS) {
    if (activeCatKeys.has(`${a}|${c}`)) add(`/hotell/${a}/${c}`, "0.8");
  }
}

for (const h of hotels) {
  if (!h.is_active) continue;
  if (!h.area || !h.category || !h.hotel_slug) continue;
  if (!allowedAreas.has(h.area)) continue;
  add(`/hotell/${h.area}/${h.category}/${h.hotel_slug}`, "0.7");
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.join("\n") +
  `\n</urlset>\n`;

writeFileSync("public/sitemap.xml", xml);
console.log(`[sitemap] Wrote ${urls.length} URLs to public/sitemap.xml using SITE=${SITE}`);
