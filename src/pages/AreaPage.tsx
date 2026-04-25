import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { areas, AreaKey } from "@/data/hotels";

const types = [
  {
    key: "luxury",
    icon: "💎",
    title: "Luxury",
    desc: "High-end hotels, calm and premium experience.",
  },
  {
    key: "family",
    icon: "👨‍👩‍👧",
    title: "Family",
    desc: "Easy, safe, and child-friendly hotels.",
  },
  {
    key: "budget",
    icon: "💰",
    title: "Budget",
    desc: "Good value hotels that are still comfortable.",
  },
] as const;

const AreaPage = () => {
  const { slug } = useParams();
  const area = slug && areas[slug as AreaKey];

  if (!area) return <Navigate to="/" replace />;

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img src={area.image} alt={area.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">Step 2 of 3</span>
          <h1 className="mt-5 font-serif text-5xl md:text-6xl font-light">
            Choose your hotel type in <span className="text-gradient-gold italic">{area.name}</span>
          </h1>
          <p className="mt-5 max-w-xl text-foreground/85">
            Now choose the type of hotel you want in {area.name}.
          </p>
        </div>
      </section>

      {/* TYPE SELECTION */}
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-3">
            {types.map((t) => (
              <Link
                key={t.key}
                to={`/hotels/${area.slug}/${t.key}`}
                className="group bg-card border border-border/60 hover:border-gold/60 rounded-lg p-10 shadow-elegant hover-lift block transition-colors text-center"
              >
                <div className="text-5xl">{t.icon}</div>
                <h3 className="mt-5 font-serif text-3xl">{t.title}</h3>
                <p className="mt-4 text-foreground/85">{t.desc}</p>
                <span className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 group-hover:border-gold transition-colors">
                  See hotels →
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
