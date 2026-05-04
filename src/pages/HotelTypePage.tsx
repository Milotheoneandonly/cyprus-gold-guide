import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SimpleHotelCard from "@/components/SimpleHotelCard";
import TopPickHotelCard from "@/components/TopPickHotelCard";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import { areas, AreaKey, HotelCategory } from "@/data/hotels";
import { useLang } from "@/i18n/LanguageContext";
import { useHotels } from "@/lib/hotelsApi";
import { isAreaKey, isCategory, getArea, CATEGORY_SV } from "@/lib/areas";
import { useSeo } from "@/lib/useSeo";

const PAGE_SIZE = 6;

const HotelTypePage = () => {
  const { slug, type } = useParams();
  const { t } = useLang();
  const [showAll, setShowAll] = useState(false);

  const areaKey = isAreaKey(slug) ? (slug as AreaKey) : undefined;
  const category = isCategory(type) ? (type as HotelCategory) : undefined;

  const { data: dbHotels } = useHotels(areaKey, category);
  const areaMeta = getArea(slug);
  const areaStatic = areaKey ? areas[areaKey] : undefined;

  const categoryLabelSv = category ? CATEGORY_SV[category] : "";
  useSeo({
    title: areaMeta && category
      ? `Bästa ${categoryLabelSv.toLowerCase()}hotellen i ${areaMeta.swedishName} | Cypern`
      : "Hotell på Cypern",
    description:
      areaMeta && category
        ? `Handplockade ${categoryLabelSv.toLowerCase()}hotell i ${areaMeta.swedishName}, Cypern. Topp 3 plus fler rekommendationer.`
        : "Hotell på Cypern, handplockade för skandinaver.",
    canonicalPath: areaMeta && category ? `/hotell/${areaMeta.slug}/${category}` : undefined,
  });

  if (!areaStatic || !category || !areaMeta) return <Navigate to="/" replace />;

  const fallback = areaStatic.categories[category].map((h) => ({ ...h, area: areaKey, slug: undefined as any }));
  const hotels = dbHotels && dbHotels.length > 0 ? dbHotels : fallback;
  const topPicks = hotels.slice(0, 3);
  const rest = hotels.slice(3);
  const visibleRest = showAll ? rest : rest.slice(0, PAGE_SIZE);
  const hiddenCount = rest.length - visibleRest.length;

  return (
    <Layout>
      {/* HERO */}
      <section className="py-20 md:py-28 border-b border-border/50">
        <div className="container-luxe text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.step(3, 3)}</span>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl font-light leading-[1.05] tracking-wide">
            <span className="text-gradient-gold italic">
              {t.hotelList.title(t.hotelList.types[category], areaMeta.swedishName)}
            </span>
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/50" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">{t.hotelList.subtitle}</p>
          <nav aria-label="Brödsmulor" className="mt-6 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-gold">Hem</Link>
            <span className="mx-2">/</span>
            <Link to={`/hotell/${areaMeta.slug}`} className="hover:text-gold">{areaMeta.swedishName}</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">{categoryLabelSv}</span>
          </nav>
        </div>
        <ScrollDownArrow targetId="top-picks" />
      </section>

      {/* TOP 3 PICKS */}
      <section id="top-picks" className="py-16 md:py-20 bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container-luxe">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.hotelList.topPicksEyebrow}</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl font-light">
              <span className="text-gradient-gold italic">{t.hotelList.topPicksTitle}</span>
            </h2>
            <div className="mx-auto mt-5 h-px w-20 bg-gold/50" />
            <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              {t.hotelList.topPicksSubtitle}
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {topPicks.map((h, i) => (
              <TopPickHotelCard key={(h as any).id || h.name} hotel={h as any} rank={(i + 1) as 1 | 2 | 3} />
            ))}
          </div>
        </div>
      </section>

      {/* REMAINING HOTELS */}
      {rest.length > 0 && (
        <section id="hotels" className="py-16 md:py-20 border-t border-border/40">
          <div className="container-luxe">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground/90">{t.hotelList.moreHotels}</h2>
              <div className="mx-auto mt-4 h-px w-16 bg-gold/40" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleRest.map((h) => (
                <SimpleHotelCard key={(h as any).id || h.name} hotel={h as any} />
              ))}
            </div>
            {hiddenCount > 0 && (
              <div className="mt-10 text-center">
                <GoldButton variant="outline" onClick={() => setShowAll(true)}>
                  Visa fler hotell ({hiddenCount})
                </GoldButton>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="pb-20">
        <div className="container-luxe text-center">
          <Link to={`/hotell/${areaMeta.slug}`}>
            <GoldButton variant="outline">{t.hotelList.back}</GoldButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HotelTypePage;
