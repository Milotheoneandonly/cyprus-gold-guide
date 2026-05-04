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
const SUPABASE_URL = "https://mbsnghmhqqsgqaqnvprr.supabase.co";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ic25naG1ocXFzZ3FhcW52cHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1Mzk3NDcsImV4cCI6MjA5MzExNTc0N30.yjgmCmwb8H3vnW2TOV64TJy2Kzs3b-GDAdsNHNyfaw4";

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
  for (const c of cats) add(`/hotell/${a}/${c}`, "0.8");
}
for (const h of hotels) {
  if (!h.hotel_slug) continue;
  add(`/hotell/${h.area}/${h.category}/${h.hotel_slug}`, "0.7");
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.join("\n") +
  "\n</urlset>\n";

writeFileSync("public/sitemap.xml", xml);
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`);
