import { useParams, Navigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SectionHeader from "@/components/SectionHeader";
import HotelCard from "@/components/HotelCard";
import { areas, AreaKey } from "@/data/hotels";

const AreaPage = () => {
  const { slug } = useParams();
  const area = slug && (areas as Record<string, any>)[slug as AreaKey];

  if (!area) return <Navigate to="/" replace />;

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={area.image} alt={area.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">Cyprus Guide</span>
          <h1 className="mt-5 font-serif text-5xl md:text-7xl font-light">
            Best Hotels in <span className="text-gradient-gold italic">{area.name}</span>
          </h1>
          <p className="mt-6 max-w-xl text-foreground/85">{area.tagline}</p>
        </div>
      </section>

      {/* TOP 3 PICKS */}
      <section className="py-24">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Top 3 Picks"
            title={`Our favorites in ${area.name}`}
            subtitle="Three trusted hotels for three types of traveler — start here if you're short on time."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {area.topPicks.map((p: any) => (
              <div key={p.label} className="flex flex-col">
                <div className="text-center mb-5">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.label}</span>
                </div>
                <HotelCard hotel={p.hotel} cta="Check Price" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOTEL LIST */}
      <section className="py-24 bg-gradient-dark border-y border-border/50">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="The Full List"
            title={`More handpicked stays in ${area.name}`}
            subtitle="A wider selection of trusted hotels — from boutique escapes to family-friendly resorts."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {area.hotels.map((h: any) => (
              <HotelCard key={h.name} hotel={h} cta="View Deal" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-luxe text-center max-w-2xl">
          <SectionHeader
            eyebrow="Explore More"
            title="Discover the rest of Cyprus"
            subtitle="Different mood for the next trip? Explore other areas in our curated guide."
          />
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {Object.values(areas).filter((a) => a.slug !== area.slug).map((a) => (
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
