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
      <section className="py-20 md:py-24 border-b border-border/50">
        <div className="container-luxe text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.step(3, 3)}</span>
          <div className="mt-5 text-5xl">{typeIcons[category]}</div>
          <h1 className="mt-5 font-serif text-4xl md:text-6xl font-light">
            {t.hotelList.title(t.hotelList.types[category], area.name)}
          </h1>
          <p className="mt-5 text-muted-foreground">{t.hotelList.subtitle}</p>
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
