import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SimpleHotelCard from "@/components/SimpleHotelCard";
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
      </section>

      {/* HOTELS */}
      <section className="py-16 md:py-20">
        <div className="container-luxe">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((h) => (
              <SimpleHotelCard key={h.name} hotel={h} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to={`/hotels/${area.slug}`}>
              <GoldButton variant="outline">{t.hotelList.back}</GoldButton>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HotelTypePage;
