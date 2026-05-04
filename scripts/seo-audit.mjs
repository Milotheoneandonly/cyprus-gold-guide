#!/usr/bin/env node
/**
 * SEO production audit. Fails (exit 1) on any violation.
 *
 * Env vars (all optional except for hotel-detail validation):
 *   SITE_URL              expected canonical site origin (default https://cypern-hotell.se)
 *   SUPABASE_URL / VITE_SUPABASE_URL
 *   SUPABASE_ANON_KEY / VITE_SUPABASE_PUBLISHABLE_KEY
 *
 * If Supabase env vars are missing, hotel-row validation is skipped (logged, not failed).
 */
import { existsSync, readFileSync } from "node:fs";

const SITE = (process.env.SITE_URL || "https://cypern-hotell.se").replace(/\/$/, "");
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const ANON = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const failures = [];
const fail = (msg) => failures.push(msg);
const ok = (msg) => console.log(`  ✓ ${msg}`);

console.log(`\n[seo-audit] SITE=${SITE}\n`);

// ---------- sitemap.xml ----------
const sitemapPath = "public/sitemap.xml";
if (!existsSync(sitemapPath)) {
  fail("public/sitemap.xml is missing");
} else {
  ok("sitemap.xml exists");
  const xml = readFileSync(sitemapPath, "utf8");

  if (!xml.startsWith("<?xml")) fail("sitemap.xml has no XML prolog");
  else ok("sitemap.xml has XML prolog");

  if (!xml.includes("<urlset")) fail("sitemap.xml has no <urlset>");
  else ok("sitemap.xml has urlset");

  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail("sitemap.xml contains zero URLs");
  else ok(`sitemap.xml contains ${locs.length} URLs`);

  const wrongOrigin = locs.filter((u) => !u.startsWith(SITE + "/") && u !== SITE && !u.startsWith(SITE + "?"));
  if (wrongOrigin.length) fail(`sitemap has URLs not on SITE_URL: ${wrongOrigin.slice(0, 3).join(", ")}…`);
  else ok("every sitemap URL uses SITE_URL");

  const adminUrls = locs.filter((u) => u.includes("/admin"));
  if (adminUrls.length) fail(`sitemap contains admin URLs: ${adminUrls.join(", ")}`);
  else ok("no admin URLs in sitemap");

  const legacy = locs.filter((u) => /\/hotels(\/|$)/.test(u));
  if (legacy.length) fail(`sitemap contains legacy /hotels URLs: ${legacy.join(", ")}`);
  else ok("no legacy /hotels URLs in sitemap");

  const dupes = locs.filter((u, i) => locs.indexOf(u) !== i);
  if (dupes.length) fail(`sitemap has duplicates: ${[...new Set(dupes)].join(", ")}`);
  else ok("no duplicate URLs in sitemap");

  // Validate against active rows from Supabase, if available
  if (SUPABASE_URL && ANON) {
    const res = await fetch(
      `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/hotels?select=area,category,hotel_slug,is_active&is_active=eq.true`,
      { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } },
    );
    if (!res.ok) {
      fail(`could not fetch hotels for validation: ${res.status}`);
    } else {
      const rows = await res.json();
      const activeCatKeys = new Set();
      const activeDetailKeys = new Set();
      for (const r of rows) {
        if (r.area && r.category) activeCatKeys.add(`${r.area}|${r.category}`);
        if (r.area && r.category && r.hotel_slug)
          activeDetailKeys.add(`${r.area}|${r.category}|${r.hotel_slug}`);
      }

      // Empty category pages
      const emptyCats = locs.filter((u) => {
        const m = u.match(/\/hotell\/([^/]+)\/(luxury|family|budget)$/);
        if (!m) return false;
        return !activeCatKeys.has(`${m[1]}|${m[2]}`);
      });
      if (emptyCats.length)
        fail(`sitemap contains empty category pages: ${emptyCats.join(", ")}`);
      else ok("no empty category pages in sitemap");

      // Hotel detail URLs must map to active rows
      const orphans = locs.filter((u) => {
        const m = u.match(/\/hotell\/([^/]+)\/(luxury|family|budget)\/([^/]+)$/);
        if (!m) return false;
        return !activeDetailKeys.has(`${m[1]}|${m[2]}|${m[3]}`);
      });
      if (orphans.length)
        fail(`sitemap contains hotel pages without an active row: ${orphans.join(", ")}`);
      else ok("every hotel detail URL maps to an active row");
    }
  } else {
    console.log("  · skipping Supabase row validation (env not set)");
  }
}

// ---------- robots.txt ----------
const robotsPath = "public/robots.txt";
if (!existsSync(robotsPath)) {
  fail("public/robots.txt is missing");
} else {
  ok("robots.txt exists");
  const robots = readFileSync(robotsPath, "utf8");
  const sitemapLine = `Sitemap: ${SITE}/sitemap.xml`;
  if (!robots.includes(sitemapLine))
    fail(`robots.txt missing sitemap line: ${sitemapLine}`);
  else ok("robots.txt references the SITE_URL sitemap");

  for (const path of ["/admin", "/admin/", "/admin/login", "/admin/import-hotels"]) {
    if (!new RegExp(`Disallow:\\s*${path.replace(/\//g, "\\/")}\\b`).test(robots))
      fail(`robots.txt missing Disallow ${path}`);
    else ok(`robots.txt disallows ${path}`);
  }
}

// ---------- useSeo.ts must not hardcode old domain ----------
const useSeoPath = "src/lib/useSeo.ts";
if (existsSync(useSeoPath)) {
  const src = readFileSync(useSeoPath, "utf8");
  if (/cypernhotell\.se/.test(src))
    fail("src/lib/useSeo.ts still hardcodes cypernhotell.se");
  else ok("src/lib/useSeo.ts no longer hardcodes cypernhotell.se");
}

// ---------- Whole-repo: scan for stray old domain ----------
const filesToCheck = [
  "public/robots.txt",
  "public/sitemap.xml",
  "scripts/generate-sitemap.mjs",
  "src/lib/useSeo.ts",
  "src/config/site.ts",
];
for (const f of filesToCheck) {
  if (!existsSync(f)) continue;
  const txt = readFileSync(f, "utf8");
  if (/cypernhotell\.se/.test(txt)) fail(`${f} still references cypernhotell.se`);
}

// ---------- summary ----------
if (failures.length) {
  console.error(`\n[seo-audit] ❌ ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`\n[seo-audit] ✅ All checks passed.\n`);
