#!/usr/bin/env node
/**
 * Regenerate public/sitemap.xml from current ACTIVE hotels in Lovable Cloud.
 * Run: bun scripts/generate-sitemap.mjs
 *
 * Includes:
 *   - homepage
 *   - /where-to-stay
 *   - /about
 *   - every destination page
 *   - every destination/category page
 *   - every active hotel detail page
 *
 * Excludes inactive hotels and admin pages.
 */
import { writeFileSync } from "node:fs";

const SITE = process.env.SITE_URL || "https://cypernhotell.se";
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !ANON) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_ANON_KEY env vars (or VITE_ equivalents). Aborting.",
  );
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const areas = [
  "ayia-napa",
  "protaras",
  "paphos",
  "larnaca",
  "limassol",
  "coral-bay",
  "polis-latchi",
];
const cats = ["luxury", "family", "budget"];

const res = await fetch(
  `${SUPABASE_URL}/rest/v1/hotels?select=area,category,hotel_slug,is_active&is_active=eq.true&order=area`,
  { headers: { apikey: ANON } },
);
const hotels = await res.json();

// Build set of (area|category) keys that have at least 1 active hotel
const activeCatKeys = new Set();
for (const h of hotels) {
  if (h.area && h.category) activeCatKeys.add(`${h.area}|${h.category}`);
}

const urls = [];
const add = (loc, prio = "0.5") =>
  urls.push(
    `  <url><loc>${SITE}${loc}</loc><lastmod>${today}</lastmod><priority>${prio}</priority></url>`,
  );

add("/", "1.0");
add("/where-to-stay", "0.8");
add("/about", "0.5");
for (const a of areas) {
  add(`/hotell/${a}`, "0.9");
  for (const c of cats) {
    if (activeCatKeys.has(`${a}|${c}`)) add(`/hotell/${a}/${c}`, "0.8");
  }
}
for (const h of hotels) {
  if (!h.hotel_slug || !h.area || !h.category) continue;
  add(`/hotell/${h.area}/${h.category}/${h.hotel_slug}`, "0.7");
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.join("\n") +
  "\n</urlset>\n";

writeFileSync("public/sitemap.xml", xml);
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`);
