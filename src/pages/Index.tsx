import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/lib/useSeo";
import { AREA_LIST } from "@/lib/areas";
import { supabase } from "@/integrations/supabase/client";
import { computeAreaReadiness, type AreaReadinessRow } from "@/lib/launchReadiness";
import { PUBLIC_INDEXING } from "@/config/site";
import heroImg from "@/assets/hero.jpg";

const Index = () => {
  const { t } = useLang();
  useSeo({
    title: "Hotell på Cypern – Handplockade lyxhotell för skandinaver",
    description:
      "Handplockade hotell på Cypern: Ayia Napa, Protaras, Paphos, Larnaca, Limassol, Coral Bay och Polis & Latchi. Lyx, familj och budget – kuraterat för skandinaver.",
    canonicalPath: "/",
  });

  const { data: rows = [] } = useQuery({
    queryKey: ["home-readiness"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("area,is_active,image_url,image_alt,image_license_status,image_verified_at");
      if (error) throw error;
      return (data || []) as AreaReadinessRow[];
    },
    staleTime: 60_000,
  });

  const readiness = computeAreaReadiness(rows);
  const readyByKey = new Map(readiness.map((r) => [r.area.key, r]));

  // In production indexing mode, hide areas that are not launch-ready.
  // In staging, show all areas with a subtle "bilder granskas" badge.
  const visibleAreas = AREA_LIST.filter((a) => {
    const r = readyByKey.get(a.key);
    if (!r) return true;
    if (PUBLIC_INDEXING) return r.launchReady;
    return true;
  });

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[460px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury Cyprus seaside resort at dusk"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover saturate-110 contrast-105 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-background/25" />
        <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center animate-fade-up">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.step(1, 3)}</span>
          <h1 className="mt-5 font-serif text-5xl md:text-7xl font-light leading-[1.05] max-w-4xl">
            {t.home.title1} <span className="text-gradient-gold italic">{t.home.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg text-foreground/85">
            {t.home.helper}
          </p>
        </div>
        <ScrollDownArrow targetId="destinations" />
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="py-20 md:py-28">
        <div className="container-luxe">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleAreas.map((d) => {
              const r = readyByKey.get(d.key);
              const showReviewBadge = !PUBLIC_INDEXING && r && !r.photoReadyOk;
              return (
                <Link
                  key={d.slug}
                  to={`/hotell/${d.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-border/60 hover:border-gold/70 shadow-elegant hover-lift block transition-all min-h-[420px] flex flex-col justify-end text-center"
                >
                  <img
                    src={d.image}
                    alt={`Hotellområde i ${d.swedishName}, Cypern`}
                    loading="lazy"
                    width={1280}
                    height={896}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 saturate-110 contrast-105 brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-card" />
                  <div className="absolute inset-0 opacity-60 mix-blend-overlay bg-gradient-to-br from-sky-500/20 via-transparent to-orange-400/20" />
                  {showReviewBadge && (
                    <span className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur text-[10px] uppercase tracking-[0.2em] text-foreground/80 border border-border/60 rounded-full px-3 py-1">
                      Bilder granskas
                    </span>
                  )}
                  <div className="relative p-10">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-gold drop-shadow">{t.home.chips}</span>
                    <h3 className="mt-4 font-serif text-4xl text-foreground drop-shadow-lg">{d.name}</h3>
                    <p className="mt-5 text-foreground/95 drop-shadow">{d.description}</p>
                    <span className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 group-hover:border-gold group-hover:tracking-[0.28em] transition-all">
                      {t.home.choose}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
