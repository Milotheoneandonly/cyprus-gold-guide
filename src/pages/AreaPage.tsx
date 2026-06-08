import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import { areas, AreaKey } from "@/data/hotels";
import { useLang } from "@/i18n/LanguageContext";
import { isAreaKey, getArea } from "@/lib/areas";
import { useSeo } from "@/lib/useSeo";

const typeKeys = ["luxury", "family", "budget"] as const;

const AreaPage = () => {
  const { slug } = useParams();
  const { t } = useLang();

  const areaKey = isAreaKey(slug) ? (slug as AreaKey) : undefined;
  const areaMeta = getArea(slug);
  const areaStatic = areaKey ? areas[areaKey] : undefined;

  useSeo({
    title: areaMeta?.seoTitle || (areaMeta ? `Hotels in ${areaMeta.name} – Cyprus` : "Hotels in Cyprus"),
    description: areaMeta?.seoDescription || "Hotels in Cyprus.",
    canonicalPath: areaMeta ? `/hotell/${areaMeta.slug}` : undefined,
  });

  if (!areaMeta) return <Navigate to="/" replace />;

  const heroImage = areaStatic?.image || areaMeta.image;
  const heroName = areaMeta.name;
  const helperText = t.area.helper(heroName);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img src={heroImage} alt={heroName} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.step(2, 3)}</span>
          <h1 className="mt-5 font-serif text-5xl md:text-6xl font-light">
            {t.area.title1} <span className="text-gradient-gold italic">{heroName}</span>
          </h1>
          <p className="mt-5 max-w-xl text-foreground/85">{helperText}</p>
          <nav aria-label="Breadcrumb" className="mt-6 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">{heroName}</span>
          </nav>
        </div>
        <ScrollDownArrow targetId="type-selection" />
      </section>

      {/* TYPE SELECTION */}
      <section id="type-selection" className="py-20 md:py-28">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-3">
            {typeKeys.map((key) => (
              <Link
                key={key}
                to={`/hotell/${areaMeta.slug}/${key}`}
                className="group bg-card border border-border/60 hover:border-gold/60 rounded-lg p-10 shadow-elegant hover-lift block transition-colors text-center"
              >
                <h3 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-gradient-gold">
                  {t.area.types[key]}
                </h3>
                <div className="mx-auto mt-4 h-px w-12 bg-gold/50 group-hover:w-20 transition-all duration-500" />
                <p className="mt-6 text-foreground/85">{t.area.descs[key]}</p>
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
