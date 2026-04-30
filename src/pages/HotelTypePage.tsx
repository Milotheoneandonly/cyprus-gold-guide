import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SimpleHotelCard from "@/components/SimpleHotelCard";
import TopPickHotelCard from "@/components/TopPickHotelCard";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import { areas, AreaKey, HotelCategory } from "@/data/hotels";
import { useLang } from "@/i18n/LanguageContext";

const validTypes: HotelCategory[] = ["luxury", "family", "budget"];

const HotelTypePage = () => {
  const { slug, type } = useParams();
  const area = slug && areas[slug as AreaKey];
  const isValidType = type && validTypes.includes(type as HotelCategory);
  const { t } = useLang();

  if (!area || !isValidType) return <Navigate to="/" replace />;

  const category = type as HotelCategory;
  const hotels = area.categories[category].slice(0, 8);
  const topPicks = hotels.slice(0, 3);
  const rest = hotels.slice(3);

  return (
    <Layout>
      {/* HERO */}
      <section className="py-20 md:py-28 border-b border-border/50">
        <div className="container-luxe text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.step(3, 3)}</span>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl font-light leading-[1.05] tracking-wide">
            <span className="text-gradient-gold italic">{t.hotelList.title(t.hotelList.types[category], area.name)}</span>
          </h1>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/50" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">{t.hotelList.subtitle}</p>
        </div>
        <ScrollDownArrow targetId="top-picks" />
      </section>

      {/* TOP 3 PICKS */}
      <section id="top-picks" className="py-16 md:py-20 bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container-luxe">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold">
              {t.hotelList.topPicksEyebrow}
            </span>
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
              <TopPickHotelCard key={h.name} hotel={h} rank={(i + 1) as 1 | 2 | 3} />
            ))}
          </div>
        </div>
      </section>

      {/* REMAINING HOTELS */}
      {rest.length > 0 && (
        <section id="hotels" className="py-16 md:py-20 border-t border-border/40">
          <div className="container-luxe">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground/90">
                {t.hotelList.moreHotels}
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-gold/40" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((h) => (
                <SimpleHotelCard key={h.name} hotel={h} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-20">
        <div className="container-luxe text-center">
          <Link to={`/hotels/${area.slug}`}>
            <GoldButton variant="outline">{t.hotelList.back}</GoldButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HotelTypePage;

