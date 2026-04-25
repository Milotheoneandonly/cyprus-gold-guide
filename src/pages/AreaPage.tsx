import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SectionHeader from "@/components/SectionHeader";
import SimpleHotelCard from "@/components/SimpleHotelCard";
import { areas, AreaKey } from "@/data/hotels";

const categoryMeta = {
  luxury: {
    icon: "💎",
    title: "Luxury",
    subtitle: "A bit expensive, but very reliable.",
  },
  family: {
    icon: "👨‍👩‍👧",
    title: "Family",
    subtitle: "Traveling with kids? These hotels are the easiest choice.",
  },
  budget: {
    icon: "💰",
    title: "Budget",
    subtitle: "Looking to save money? These give you the most value.",
  },
} as const;

const AreaPage = () => {
  const { slug } = useParams();
  const area = slug && areas[slug as AreaKey];

  if (!area) return <Navigate to="/" replace />;

  const quickPicks = [
    { label: "Best overall", hotel: area.quickPicks.overall },
    { label: "Best for families", hotel: area.quickPicks.family },
    { label: "Best budget", hotel: area.quickPicks.budget },
  ];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <img src={area.image} alt={area.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/65" />
        <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">Cyprus Guide</span>
          <h1 className="mt-5 font-serif text-5xl md:text-7xl font-light">
            Best hotels in <span className="text-gradient-gold italic">{area.name}</span>
          </h1>
          <p className="mt-6 max-w-xl text-foreground/85">{area.tagline}</p>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-b border-border/50 bg-background/60">
        <div className="container-luxe py-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>★ Trusted booking partner</span>
          <span>★ Secure booking via Booking.com</span>
          <span>★ Handpicked for Scandinavian travelers</span>
        </div>
      </div>

      {/* QUICK PICKS */}
      <section className="py-20">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Quick picks"
            title="Short on time? Start here."
            subtitle="Three hotels for the three most common trips. Click and book."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {quickPicks.map((p) => (
              <div key={p.label} className="flex flex-col">
                <div className="text-center mb-4">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.label}</span>
                </div>
                <SimpleHotelCard hotel={p.hotel} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {(["luxury", "family", "budget"] as const).map((key, i) => {
        const meta = categoryMeta[key];
        const list = area.categories[key];
        return (
          <section
            key={key}
            id={key}
            className={`py-20 ${i % 2 === 0 ? "bg-gradient-dark border-y border-border/50" : ""}`}
          >
            <div className="container-luxe">
              <div className="text-center max-w-2xl mx-auto">
                <div className="text-4xl">{meta.icon}</div>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light">{meta.title}</h2>
                <p className="mt-3 text-muted-foreground">{meta.subtitle}</p>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.slice(0, 5).map((h) => (
                  <SimpleHotelCard key={h.name} hotel={h} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20">
        <div className="container-luxe text-center max-w-2xl">
          <SectionHeader
            eyebrow="Explore more"
            title="Different mood for the next trip?"
            subtitle="Browse the other areas in our curated guide."
          />
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {Object.values(areas)
              .filter((a) => a.slug !== area.slug)
              .map((a) => (
                <Link key={a.slug} to={`/hotels/${a.slug}`}>
                  <GoldButton variant="outline">{a.name}</GoldButton>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AreaPage;
