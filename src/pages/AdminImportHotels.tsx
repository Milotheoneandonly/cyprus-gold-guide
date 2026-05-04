import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GoldButton from "@/components/GoldButton";
import { toast } from "@/hooks/use-toast";
import { useSeo } from "@/lib/useSeo";
import type { Session } from "@supabase/supabase-js";
import type { TablesInsert } from "@/integrations/supabase/types";
import { AREA_KEYS, CATEGORIES } from "@/lib/areas";
import { slugify } from "@/lib/slugify";
import type { AreaKey, HotelCategory } from "@/data/hotels";

type ImportRow = {
  area: AreaKey;
  category: HotelCategory;
  name: string;
  description?: string;
  tag?: string;
  image_url?: string;
  booking_url?: string;
  best_for?: string;
  location?: string;
  note?: string;
  stars?: number | null;
  highlight?: string;
  sort_order?: number;
  hotel_slug?: string;
  seo_title?: string;
  seo_description?: string;
  sub_area?: string;
  official_website_url?: string;
  source_url?: string;
  last_verified_at?: string | null;
  is_active?: boolean;
  traveller_tags?: string[];
  image_alt?: string;
  image_source?: string;
  image_license_status?: string;
  image_verified_at?: string | null;
  image_needs_review?: boolean;
};

type RawRow = Record<string, unknown>;

type Parsed = {
  rows: ImportRow[];
  errors: { index: number; reason: string; raw?: RawRow }[];
};

// Very small CSV parser (handles quoted strings + commas)
function parseCsv(text: string): RawRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const split = (line: string) => {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQuotes) {
        if (c === '"' && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (c === '"') inQuotes = false;
        else cur += c;
      } else {
        if (c === ",") {
          out.push(cur);
          cur = "";
        } else if (c === '"') inQuotes = true;
        else cur += c;
      }
    }
    out.push(cur);
    return out.map((s) => s.trim());
  };
  const headers = split(lines[0]);
  const objs: RawRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = split(lines[i]);
    const row: RawRow = {};
    headers.forEach((h, idx) => {
      row[h] = cells[idx] ?? "";
    });
    objs.push(row);
  }
  return objs;
}

function normalizeRow(input: unknown): ImportRow | { __error: string } {
  if (!input || typeof input !== "object") return { __error: "Row is not an object" };
  const raw = input as Record<string, unknown>;
  const name = String(raw.name ?? "").trim();
  if (!name) return { __error: "Missing hotel name" };

  const area = String(raw.area ?? "").trim() as AreaKey;
  if (!AREA_KEYS.includes(area)) return { __error: `Invalid area "${area}"` };

  const category = String(raw.category ?? "").trim() as HotelCategory;
  if (!(CATEGORIES as string[]).includes(category)) return { __error: `Invalid category "${category}"` };

  const hotel_slug = String(raw.hotel_slug ?? "").trim() || slugify(name);
  if (!hotel_slug) return { __error: "Could not generate slug" };

  const booking_url = String(raw.booking_url ?? "").trim();
  const explicitActive =
    raw.is_active === true ||
    raw.is_active === "true" ||
    raw.is_active === 1 ||
    raw.is_active === "1";
  const explicitInactive =
    raw.is_active === false ||
    raw.is_active === "false" ||
    raw.is_active === 0 ||
    raw.is_active === "0";
  // Default rule: if booking_url missing → inactive; otherwise active
  const is_active = explicitInactive ? false : explicitActive ? true : booking_url.length > 0;

  const starsRaw = raw.stars;
  const stars =
    starsRaw === "" || starsRaw === null || starsRaw === undefined ? null : Number(starsRaw) || null;

  const tagsRaw = raw.traveller_tags;
  let traveller_tags: string[] = [];
  if (Array.isArray(tagsRaw)) traveller_tags = tagsRaw.map(String);
  else if (typeof tagsRaw === "string" && tagsRaw)
    traveller_tags = tagsRaw.split(/[|,]/).map((s) => s.trim()).filter(Boolean);

  return {
    area,
    category,
    name,
    description: String(raw.description ?? ""),
    tag: String(raw.tag ?? ""),
    image_url: String(raw.image_url ?? ""),
    booking_url,
    best_for: String(raw.best_for ?? ""),
    location: String(raw.location ?? ""),
    note: String(raw.note ?? ""),
    stars,
    highlight: String(raw.highlight ?? ""),
    sort_order: Number(raw.sort_order ?? 0) || 0,
    hotel_slug,
    seo_title: String(raw.seo_title ?? ""),
    seo_description: String(raw.seo_description ?? ""),
    sub_area: String(raw.sub_area ?? ""),
    official_website_url: String(raw.official_website_url ?? ""),
    source_url: String(raw.source_url ?? ""),
    last_verified_at: raw.last_verified_at ? String(raw.last_verified_at) : null,
    is_active,
    traveller_tags,
    image_alt: raw.image_alt ? String(raw.image_alt) : "",
    image_source: raw.image_source ? String(raw.image_source) : "",
    image_license_status: raw.image_license_status ? String(raw.image_license_status) : "unknown",
    image_verified_at: raw.image_verified_at ? String(raw.image_verified_at) : null,
    image_needs_review:
      raw.image_needs_review === false ||
      raw.image_needs_review === "false" ||
      raw.image_needs_review === 0
        ? false
        : true,
  };
}

function parseInput(text: string): Parsed {
  const trimmed = text.trim();
  let raw: unknown[] = [];
  const errors: Parsed["errors"] = [];
  if (!trimmed) return { rows: [], errors };

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      raw = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return { rows: [], errors: [{ index: 0, reason: `Invalid JSON: ${msg}` }] };
    }
  } else {
    try {
      raw = parseCsv(trimmed);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return { rows: [], errors: [{ index: 0, reason: `Invalid CSV: ${msg}` }] };
    }
  }

  const rows: ImportRow[] = [];
  raw.forEach((r, i) => {
    const norm = normalizeRow(r);
    if ("__error" in norm) errors.push({ index: i, reason: norm.__error, raw: (r && typeof r === "object" ? (r as RawRow) : undefined) });
    else rows.push(norm);
  });

  // duplicate slug within same area (uniqueness key in DB is area + hotel_slug,
  // independent of category — a hotel that moves from "family" to "luxury"
  // should still resolve to the same row).
  const seen = new Map<string, number>();
  rows.forEach((r, i) => {
    const key = `${r.area}|${r.hotel_slug}`;
    if (seen.has(key)) {
      errors.push({
        index: i,
        reason: `Duplicate slug "${r.hotel_slug}" in ${r.area} (also at row ${seen.get(key)})`,
      });
    } else seen.set(key, i);
  });

  return { rows, errors };
}

const AdminImportHotels = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [text, setText] = useState("");
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ inserted: number; updated: number; skipped: number; errors: number } | null>(null);

  useSeo({ title: "Admin · Bulk import hotels", description: "Admin", noindex: true });

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (!s) navigate("/admin/login", { replace: true });
    });
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setSession(data.session);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roles);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const parsed = useMemo(() => parseInput(text), [text]);

  const runImport = async () => {
    if (parsed.rows.length === 0) {
      toast({ title: "Nothing to import", variant: "destructive" });
      return;
    }
    setImporting(true);
    let inserted = 0;
    let updated = 0;
    let skipped = 0;
    let errored = 0;
    try {
      for (const row of parsed.rows) {
        // Upsert key: (area, hotel_slug). Category is not part of the
        // identity — if a hotel moves category, we update the existing row.
        const { data: existing, error: selErr } = await supabase
          .from("hotels")
          .select("id,category")
          .eq("area", row.area)
          .eq("hotel_slug", row.hotel_slug)
          .maybeSingle();
        if (selErr) {
          errored++;
          console.error("[import] select failed", row.name, selErr);
          continue;
        }

        const payload: TablesInsert<"hotels"> = {
          ...row,
          best_for: row.best_for || null,
          location: row.location || null,
          note: row.note || null,
          highlight: row.highlight || null,
          seo_title: row.seo_title || null,
          seo_description: row.seo_description || null,
          sub_area: row.sub_area || null,
          official_website_url: row.official_website_url || null,
          source_url: row.source_url || null,
          last_verified_at: row.last_verified_at || null,
          traveller_tags: row.traveller_tags || [],
          image_alt: row.image_alt || null,
          image_source: row.image_source || null,
          image_license_status: row.image_license_status || "unknown",
          image_verified_at: row.image_verified_at || null,
          image_needs_review: row.image_needs_review ?? true,
        } as TablesInsert<"hotels">;

        if (existing?.id) {
          // Always update — including category if it changed.
          const { error } = await supabase
            .from("hotels")
            .update(payload)
            .eq("id", existing.id);
          if (error) {
            errored++;
            console.error("[import] update failed", row.name, error);
            continue;
          }
          updated++;
        } else {
          const { error } = await supabase.from("hotels").insert([payload]);
          if (error) {
            // Most likely a uniqueness collision we somehow missed → count as skipped.
            if (String(error.message || "").toLowerCase().includes("duplicate")) {
              skipped++;
            } else {
              errored++;
            }
            console.error("[import] insert failed", row.name, error);
            continue;
          }
          inserted++;
        }
      }
      setResult({ inserted, updated, skipped, errors: errored });
      toast({
        title: `Import complete`,
        description: `${inserted} inserted · ${updated} updated · ${skipped} skipped · ${errored} errors`,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({ title: "Import failed", description: msg, variant: "destructive" });
    } finally {
      setImporting(false);
    }
  };

  if (!session) return null;
  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (isAdmin === false) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h1 className="font-serif text-3xl mb-4 text-gradient-gold italic">Not authorized</h1>
          <p className="text-muted-foreground">Admin role required.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-gradient-gold italic">Bulk import hotels</h1>
        <Link to="/admin" className="text-sm text-muted-foreground hover:text-gold">
          ← Back to admin
        </Link>
      </header>

      <div className="container-luxe py-8 space-y-6">
        <section className="bg-card border border-border/60 rounded-lg p-6">
          <h2 className="font-serif text-xl mb-2">Paste JSON or CSV</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Required per row: <code>area</code>, <code>category</code>, <code>name</code>. Slug auto-generated
            from name if missing. Rows with no booking_url default to <code>is_active=false</code>. Upsert
            matches on <code>(area, hotel_slug)</code> — category will be updated in place if it changes.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            placeholder={`[\n  {\n    "area": "protaras",\n    "category": "family",\n    "name": "Capo Bay Hotel",\n    "booking_url": "https://www.booking.com/hotel/cy/capo-bay.html?aid=2311236",\n    "stars": 5,\n    "best_for": "Beachfront elegance",\n    "location": "Fig Tree Bay"\n  }\n]`}
            className="w-full font-mono text-xs rounded-md border border-border bg-background p-3 text-foreground"
          />
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border/60 rounded-lg p-6">
            <h3 className="font-serif text-lg mb-3">
              Preview <span className="text-muted-foreground text-sm">({parsed.rows.length} valid)</span>
            </h3>
            <div className="max-h-[420px] overflow-y-auto space-y-2">
              {parsed.rows.map((r, i) => (
                <div key={i} className="border border-border/40 rounded p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{r.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${
                        r.is_active ? "bg-gold/15 text-gold" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {r.is_active ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <div className="mt-1 text-muted-foreground">
                    {r.area} · {r.category} · /{r.hotel_slug}
                    {r.stars ? ` · ${r.stars}★` : ""}
                  </div>
                </div>
              ))}
              {parsed.rows.length === 0 && (
                <p className="text-muted-foreground text-sm">No valid rows yet.</p>
              )}
            </div>
          </div>

          <div className="bg-card border border-destructive/30 rounded-lg p-6">
            <h3 className="font-serif text-lg mb-3 text-destructive">
              Errors <span className="text-muted-foreground text-sm">({parsed.errors.length})</span>
            </h3>
            <div className="max-h-[420px] overflow-y-auto space-y-2">
              {parsed.errors.map((e, i) => (
                <div key={i} className="border border-destructive/30 rounded p-3 text-xs">
                  <div className="font-medium text-destructive">Row {e.index}: {e.reason}</div>
                  {e.raw?.name && (
                    <div className="mt-1 text-muted-foreground">name: {String(e.raw.name)}</div>
                  )}
                </div>
              ))}
              {parsed.errors.length === 0 && (
                <p className="text-muted-foreground text-sm">No errors.</p>
              )}
            </div>
          </div>
        </section>

        <div className="flex items-center gap-4">
          <GoldButton
            onClick={runImport}
            disabled={importing || parsed.rows.length === 0}
            className="!px-6"
          >
            {importing ? "Importing…" : `Import ${parsed.rows.length} hotels`}
          </GoldButton>
          {result && (
            <span className="text-sm text-muted-foreground">
              Last run: {result.inserted} inserted · {result.updated} updated · {result.skipped} skipped · {result.errors} errors
            </span>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminImportHotels;
