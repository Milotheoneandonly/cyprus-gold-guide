import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AREA_LIST, CATEGORIES } from "@/lib/areas";
import { isBookingSearchUrl, isBookingDeepLink } from "@/lib/booking";
import { isPhotoReady, MIN_PHOTO_READY_PER_AREA } from "@/lib/hotelImagePolicy";
import { computeAreaReadiness } from "@/lib/launchReadiness";

type Row = {
  id: string;
  area: string;
  category: string;
  is_active: boolean;
  booking_url: string | null;
  source_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  image_url: string | null;
  image_alt: string | null;
  image_source: string | null;
  image_license_status: string | null;
  image_verified_at: string | null;
  image_needs_review: boolean | null;
};

const Stat = ({ label, value, danger }: { label: string; value: number | string; danger?: boolean }) => (
  <div className="rounded-lg border border-border/60 bg-card px-4 py-3">
    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    <div className={`mt-1 font-serif text-2xl ${danger && value !== 0 ? "text-destructive" : "text-gold"}`}>
      {value}
    </div>
  </div>
);

const DataHealth = () => {
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin-data-health"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select(
          "id,area,category,is_active,booking_url,source_url,seo_title,seo_description,image_url,image_alt,image_source,image_license_status,image_verified_at,image_needs_review",
        );
      if (error) throw error;
      return data as Row[];
    },
    staleTime: 30_000,
  });

  if (isLoading) return <p className="text-muted-foreground text-sm">Loading data health…</p>;

  const active = rows.filter((r) => r.is_active);
  const inactive = rows.filter((r) => !r.is_active);
  const perArea: Record<string, number> = {};
  const perAreaCat: Record<string, number> = {};
  const photoReadyPerArea: Record<string, number> = {};
  const photoReadyPerAreaCat: Record<string, number> = {};
  for (const r of active) {
    perArea[r.area] = (perArea[r.area] || 0) + 1;
    perAreaCat[`${r.area}|${r.category}`] = (perAreaCat[`${r.area}|${r.category}`] || 0) + 1;
    if (isPhotoReady(r)) {
      photoReadyPerArea[r.area] = (photoReadyPerArea[r.area] || 0) + 1;
      photoReadyPerAreaCat[`${r.area}|${r.category}`] =
        (photoReadyPerAreaCat[`${r.area}|${r.category}`] || 0) + 1;
    }
  }
  const inactiveMissingBooking = inactive.filter((r) => !r.booking_url || r.booking_url.trim() === "").length;
  const missingSource = rows.filter((r) => !r.source_url).length;
  const missingSeoTitle = rows.filter((r) => !r.seo_title).length;
  const missingSeoDesc = rows.filter((r) => !r.seo_description).length;

  const activeSearchUrl = active.filter((r) => isBookingSearchUrl(r.booking_url)).length;
  const activeDeepLink = active.filter((r) => isBookingDeepLink(r.booking_url)).length;
  const activeMissingBooking = active.filter((r) => !r.booking_url || r.booking_url.trim() === "").length;

  // Image diagnostics on active hotels
  const activeMissingImage = active.filter((r) => !r.image_url).length;
  const activeSeedImage = active.filter((r) => r.image_url && r.image_url.startsWith("seed:")).length;
  const activeUnknownLicense = active.filter(
    (r) => !r.image_license_status || r.image_license_status === "unknown",
  ).length;
  const activeMissingAlt = active.filter((r) => r.image_url && !r.image_alt).length;
  const activeMissingImgSource = active.filter((r) => r.image_url && !r.image_source).length;
  const activeMissingVerified = active.filter((r) => r.image_url && !r.image_verified_at).length;

  const readiness = computeAreaReadiness(active);

  const emptyCats: string[] = [];
  for (const a of AREA_LIST) {
    for (const c of CATEGORIES) {
      if (!perAreaCat[`${a.key}|${c}`]) emptyCats.push(`${a.name} / ${c}`);
    }
  }

  return (
    <section className="mt-12 border-t border-border/40 pt-8">
      <h2 className="font-serif text-xl text-gradient-gold italic mb-4">Data health</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <Stat label="Total active" value={active.length} />
        <Stat label="Inactive" value={inactive.length} />
        <Stat label="Inactive w/o booking_url" value={inactiveMissingBooking} danger />
        <Stat label="Missing source_url" value={missingSource} danger />
        <Stat label="Missing seo_title" value={missingSeoTitle} danger />
        <Stat label="Missing seo_description" value={missingSeoDesc} danger />
      </div>

      <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Photo readiness</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <Stat label="Active · missing image" value={activeMissingImage} danger />
        <Stat label="Active · seed: fallback" value={activeSeedImage} danger />
        <Stat label="Active · unknown license" value={activeUnknownLicense} danger />
        <Stat label="Active · missing alt" value={activeMissingAlt} danger />
        <Stat label="Active · missing image_source" value={activeMissingImgSource} danger />
        <Stat label="Active · missing verified_at" value={activeMissingVerified} danger />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <Stat label="Active · Booking search URL" value={activeSearchUrl} />
        <Stat label="Active · Booking exact hotel" value={activeDeepLink} />
        <Stat label="Active · missing booking_url" value={activeMissingBooking} danger />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Active per area
          </h3>
          <div className="space-y-1 text-sm">
            {AREA_LIST.map((a) => (
              <div key={a.key} className="flex justify-between border-b border-border/40 py-1.5">
                <span>{a.name}</span>
                <span className={perArea[a.key] ? "text-gold" : "text-destructive"}>
                  {perArea[a.key] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Photo-ready per area (min {MIN_PHOTO_READY_PER_AREA})
          </h3>
          <div className="space-y-1 text-sm">
            {AREA_LIST.map((a) => {
              const n = photoReadyPerArea[a.key] || 0;
              const ok = n >= MIN_PHOTO_READY_PER_AREA;
              return (
                <div key={a.key} className="flex justify-between border-b border-border/40 py-1.5">
                  <span>{a.name}</span>
                  <span className={ok ? "text-gold" : "text-destructive"}>
                    {n} {ok ? "✓" : "✗"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
          Launch readiness
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 text-sm">
          {readiness.map((r) => (
            <div
              key={r.area.key}
              className={`flex justify-between border rounded-md px-3 py-2 ${
                r.launchReady ? "border-gold/40 bg-gold/5" : "border-destructive/40 bg-destructive/5"
              }`}
            >
              <span className="text-foreground/90">{r.area.name}</span>
              <span className={r.launchReady ? "text-gold" : "text-destructive"}>
                {r.launchReady ? "launch-ready" : `not ready (active ${r.active}, photo-ready ${r.photoReady})`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
          Photo-ready per area / category
        </h3>
        <div className="grid sm:grid-cols-2 gap-1 text-sm">
          {AREA_LIST.flatMap((a) =>
            CATEGORIES.map((c) => {
              const n = photoReadyPerAreaCat[`${a.key}|${c}`] || 0;
              return (
                <div
                  key={`${a.key}-${c}`}
                  className="flex justify-between border-b border-border/40 py-1.5"
                >
                  <span className="text-muted-foreground">
                    {a.name} <span className="text-foreground/60">/</span> {c}
                  </span>
                  <span className={n ? "text-gold" : "text-destructive"}>{n}</span>
                </div>
              );
            }),
          )}
        </div>
      </div>

      {emptyCats.length > 0 && (
        <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <div className="font-medium text-destructive mb-2">Categories with zero active hotels</div>
          <ul className="list-disc pl-5 text-muted-foreground space-y-0.5">
            {emptyCats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default DataHealth;
