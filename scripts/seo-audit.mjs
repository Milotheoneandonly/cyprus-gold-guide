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

const SITE = (process.env.SITE_URL || "https://cyprus-gold-guide.lovable.app").replace(/\/$/, "");
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
  const robotsBuf = readFileSync(robotsPath);
  const robots = robotsBuf.toString("utf8");
  const lfCount = robotsBuf.filter ? [...robotsBuf].filter((b) => b === 0x0a).length : (robots.match(/\n/g) || []).length;
  console.log(`  · robots.txt LF count: ${lfCount} (lines: ${robots.split("\n").length})`);
  if (lfCount < 10) fail(`robots.txt has only ${lfCount} newline characters — expected ≥ 10`);
  else ok(`robots.txt has ${lfCount} real LF newline characters`);

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

// ---------- useSeo.ts must use config, not hardcoded domains ----------
const useSeoPath = "src/lib/useSeo.ts";
if (existsSync(useSeoPath)) {
  const src = readFileSync(useSeoPath, "utf8");
  // Strip comments before scanning for hardcoded domains.
  const code = src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
  for (const bad of ["cypernhotell.se", "cypern-hotell.se", "lovable.app"]) {
    if (new RegExp(bad.replace(/\./g, "\\.")).test(code))
      fail(`src/lib/useSeo.ts hardcodes "${bad}" — must come from src/config/site.ts`);
    else ok(`useSeo.ts does not hardcode ${bad}`);
  }
  if (!/from\s+["']@\/config\/site["']/.test(src))
    fail("src/lib/useSeo.ts does not import from @/config/site");
  else ok("useSeo.ts imports from @/config/site");
  if (!/PUBLIC_INDEXING/.test(src))
    fail("src/lib/useSeo.ts does not reference PUBLIC_INDEXING");
  else ok("useSeo.ts references PUBLIC_INDEXING");
  if (!/SITE_URL/.test(src))
    fail("src/lib/useSeo.ts does not reference SITE_URL");
  else ok("useSeo.ts references SITE_URL");
}

// ---------- generate-sitemap.mjs must not hardcode supabase creds ----------
const genPath = "scripts/generate-sitemap.mjs";
if (existsSync(genPath)) {
  const src = readFileSync(genPath, "utf8");
  if (/https?:\/\/[a-z0-9-]+\.supabase\.co/i.test(src))
    fail("scripts/generate-sitemap.mjs hardcodes a Supabase URL");
  else ok("generate-sitemap.mjs does not hardcode a Supabase URL");
  // JWT-style anon keys
  if (/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/.test(src))
    fail("scripts/generate-sitemap.mjs hardcodes a Supabase anon key");
  else ok("generate-sitemap.mjs does not hardcode a Supabase anon key");
}

// ---------- HotelTypePage.tsx must wire noindex into useSeo ----------
const htpPath = "src/pages/HotelTypePage.tsx";
if (existsSync(htpPath)) {
  const src = readFileSync(htpPath, "utf8");
  if (!/useSeo\s*\(\s*\{[\s\S]*?noindex\s*:/m.test(src))
    fail("src/pages/HotelTypePage.tsx does not pass `noindex` into useSeo");
  else ok("HotelTypePage.tsx passes noindex into useSeo");
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

// ---------- legal/trust pages must be wired into the router ----------
const appPath = "src/App.tsx";
const requiredRoutes = [
  "/om-oss",
  "/kontakt",
  "/annonslankar",
  "/integritetspolicy",
  "/cookies",
  "/villkor",
  "/admin/qa",
];
if (existsSync(appPath)) {
  const appSrc = readFileSync(appPath, "utf8");
  for (const r of requiredRoutes) {
    if (!new RegExp(`path=["']${r.replace(/\//g, "\\/")}["']`).test(appSrc))
      fail(`src/App.tsx is missing route ${r}`);
    else ok(`route ${r} is registered`);
  }
  for (const f of [
    "src/pages/OmOss.tsx",
    "src/pages/Kontakt.tsx",
    "src/pages/Annonslankar.tsx",
    "src/pages/Integritetspolicy.tsx",
    "src/pages/Cookies.tsx",
    "src/pages/Villkor.tsx",
    "src/pages/AdminQA.tsx",
  ]) {
    if (!existsSync(f)) fail(`missing page file ${f}`);
    else ok(`page file exists: ${f}`);
  }
}

// ---------- Footer must link to legal/trust pages ----------
const footerPath = "src/components/Footer.tsx";
if (existsSync(footerPath)) {
  const src = readFileSync(footerPath, "utf8");
  for (const r of ["/om-oss", "/kontakt", "/annonslankar", "/integritetspolicy", "/cookies", "/villkor"]) {
    if (!src.includes(`to="${r}"`)) fail(`Footer.tsx missing link to ${r}`);
    else ok(`Footer links to ${r}`);
  }
}

// ---------- Affiliate disclosure must exist in code ----------
const discPath = "src/components/AffiliateDisclosure.tsx";
if (!existsSync(discPath)) fail("missing src/components/AffiliateDisclosure.tsx");
else {
  const src = readFileSync(discPath, "utf8");
  if (!/Annonsl[äa]nk:/.test(src)) fail("AffiliateDisclosure.tsx missing Swedish disclosure text");
  else ok("AffiliateDisclosure component contains Swedish disclosure text");
}
for (const f of ["src/pages/HotelDetailPage.tsx", "src/pages/HotelTypePage.tsx"]) {
  if (existsSync(f)) {
    const src = readFileSync(f, "utf8");
    if (!/AffiliateDisclosure/.test(src))
      fail(`${f} does not render <AffiliateDisclosure />`);
    else ok(`${f} renders AffiliateDisclosure`);
  }
}

// ---------- Booking links must keep correct rel attributes ----------
for (const f of [
  "src/components/SimpleHotelCard.tsx",
  "src/components/TopPickHotelCard.tsx",
  "src/pages/HotelDetailPage.tsx",
]) {
  if (existsSync(f)) {
    const src = readFileSync(f, "utf8");
    if (!/rel=["']sponsored nofollow noopener noreferrer["']/.test(src))
      fail(`${f} has Booking links without rel="sponsored nofollow noopener noreferrer"`);
    else ok(`${f} uses sponsored/nofollow rel on Booking links`);
  }
}

// ---------- No fake review / aggregateRating schema anywhere ----------
const schemaScanFiles = [
  "src/components/SchemaJsonLd.tsx",
  "src/pages/HotelDetailPage.tsx",
  "src/pages/HotelTypePage.tsx",
  "src/pages/AreaPage.tsx",
  "src/pages/Index.tsx",
  "src/components/Footer.tsx",
  "src/components/Layout.tsx",
];
for (const f of schemaScanFiles) {
  if (!existsSync(f)) continue;
  const raw = readFileSync(f, "utf8");
  // Strip JS/TS comments so forbidding-text in code comments doesn't trip the check.
  const src = raw
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
  if (/aggregateRating|AggregateRating/.test(src))
    fail(`${f} contains aggregateRating schema — forbidden (no verified reviews)`);
  if (/"@type"\s*:\s*"Review"/.test(src))
    fail(`${f} contains Review schema — forbidden (no verified reviews)`);
}
ok("no aggregateRating or Review schema found");

// ---------- PUBLIC_INDEXING default must remain false ----------
const sitePath = "src/config/site.ts";
if (existsSync(sitePath)) {
  const src = readFileSync(sitePath, "utf8");
  // Look for the default fallback after VITE_PUBLIC_INDEXING ?? "..."
  const m = src.match(/VITE_PUBLIC_INDEXING\s*\?\?\s*["']([^"']+)["']/);
  if (!m) fail("src/config/site.ts has no VITE_PUBLIC_INDEXING default fallback");
  else if (m[1].toLowerCase() !== "false")
    fail(`PUBLIC_INDEXING default must be "false", got "${m[1]}"`);
  else ok('PUBLIC_INDEXING default is "false"');
}

// ---------- Indexing-vs-domain consistency (env-driven) ----------
const envIndexing = String(process.env.VITE_PUBLIC_INDEXING ?? "false").toLowerCase() === "true";
if (envIndexing && /lovable\.app/.test(SITE)) {
  fail(`VITE_PUBLIC_INDEXING=true while SITE_URL still points at lovable.app (${SITE})`);
} else {
  ok("indexing/domain combination is safe");
}

// ---------- Sitemap origin must match SITE_URL exactly ----------
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const wrongOrigin = locs.filter((u) => !u.startsWith(SITE));
  if (wrongOrigin.length)
    fail(`sitemap domain mismatch: ${wrongOrigin.length} URLs not on ${SITE}`);
  else ok(`sitemap domain matches SITE_URL (${SITE})`);
}


// ---------- summary ----------
if (failures.length) {
  console.error(`\n[seo-audit] ❌ ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`\n[seo-audit] ✅ All checks passed.\n`);
