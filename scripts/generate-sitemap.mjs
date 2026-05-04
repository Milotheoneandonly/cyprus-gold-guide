#!/usr/bin/env node
/**
 * Regenerate public/sitemap.xml from current ACTIVE hotels in Lovable Cloud.
 *
 * Required env vars:
 *   SUPABASE_URL          (or VITE_SUPABASE_URL)
 *   SUPABASE_ANON_KEY     (or VITE_SUPABASE_PUBLISHABLE_KEY)
 *   SITE_URL              (final production domain, e.g. https://cypern-hotell.se)
 *
 * No Supabase URL or anon key is hardcoded here.
 *
 * Includes:
 *   /
 *   /where-to-stay
 *   /about
 *   every destination page
 *   only category pages with >= 1 active hotel
 *   only active hotel detail pages with valid area + category + hotel_slug
 *
 * Excludes: /admin*, legacy /hotels/*, inactive hotels, empty category pages,
 * duplicates.
 *
 * Run: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from "node:fs";

const SITE_URL_RAW = process.env.SITE_URL || "https://cyprus-gold-guide.lovable.app";
const SITE = SITE_URL_RAW.replace(/\/$/, "");
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

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

const res = await fetch(
  `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/hotels?select=area,category,hotel_slug,is_active&is_active=eq.true&order=area`,
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

// Set of (area|category) combos that have at least 1 active hotel
const activeCatKeys = new Set();
for (const h of hotels) {
  if (h.area && h.category && h.is_active) activeCatKeys.add(`${h.area}|${h.category}`);
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
  add(`/hotell/${a}`, "0.9");
  for (const c of CATS) {
    if (activeCatKeys.has(`${a}|${c}`)) add(`/hotell/${a}/${c}`, "0.8");
  }
}

for (const h of hotels) {
  if (!h.is_active) continue;
  if (!h.area || !h.category || !h.hotel_slug) continue;
  add(`/hotell/${h.area}/${h.category}/${h.hotel_slug}`, "0.7");
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.join("\n") +
  `\n</urlset>\n`;

writeFileSync("public/sitemap.xml", xml);
console.log(`[sitemap] Wrote ${urls.length} URLs to public/sitemap.xml using SITE=${SITE}`);
