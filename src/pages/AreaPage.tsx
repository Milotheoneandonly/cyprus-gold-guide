import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { areas, AreaKey } from "@/data/hotels";
import { useLang } from "@/i18n/LanguageContext";

const typeKeys = ["luxury", "family", "budget"] as const;
const typeIcons: Record<(typeof typeKeys)[number], string> = {
  luxury: "💎",
  family: "👨‍👩‍👧",
  budget: "💰",
};

const AreaPage = () => {
  const { slug } = useParams();
  const area = slug && areas[slug as AreaKey];
  const { t } = useLang();

  if (!area) return <Navigate to="/" replace />;

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img src={area.image} alt={area.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.step(2, 3)}</span>
          <h1 className="mt-5 font-serif text-5xl md:text-6xl font-light">
            {t.area.title1} <span className="text-gradient-gold italic">{area.name}</span>
          </h1>
          <p className="mt-5 max-w-xl text-foreground/85">
            {t.area.helper(area.name)}
          </p>
        </div>
      </section>

      {/* TYPE SELECTION */}
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-3">
            {typeKeys.map((key) => (
              <Link
                key={key}
                to={`/hotels/${area.slug}/${key}`}
                className="group bg-card border border-border/60 hover:border-gold/60 rounded-lg p-10 shadow-elegant hover-lift block transition-colors text-center"
              >
                <div className="text-5xl">{typeIcons[key]}</div>
                <h3 className="mt-5 font-serif text-3xl">{t.area.types[key]}</h3>
                <p className="mt-4 text-foreground/85">{t.area.descs[key]}</p>
                <span className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 group-hover:border-gold transition-colors">
                  {t.area.seeHotels}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AreaPage;
