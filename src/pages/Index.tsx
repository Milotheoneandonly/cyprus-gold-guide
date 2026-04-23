import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SectionHeader from "@/components/SectionHeader";
import HotelCard from "@/components/HotelCard";
import heroImg from "@/assets/hero.jpg";
import { areas, areaList } from "@/data/hotels";

const Index = () => {
  const topPicks = [
    { label: "Best Overall", ...areas.limassol.topPicks[0] },
    { label: "Best Budget", ...areas["ayia-napa"].topPicks[1] },
    { label: "Best for Couples", ...areas.paphos.topPicks[2] },
  ];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury Cyprus seaside resort at dusk"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center animate-fade-up">
          <div className="flex items-center gap-3">
            <span className="gold-divider" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold">A curated guide</span>
            <span className="gold-divider" />
          </div>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] max-w-4xl">
            Cyprus Hotels <span className="text-gradient-gold italic">for Scandinavians</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/85">
            Handpicked hotels for a better stay in Cyprus.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/where-to-stay"><GoldButton>Where to Stay</GoldButton></Link>
            <Link to="/hotels/limassol"><GoldButton variant="outline">Explore Hotels</GoldButton></Link>
          </div>
        </div>
      </section>

      {/* TOP 3 PICKS */}
      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Top 3 Picks"
            title="The most loved hotels in Cyprus"
            subtitle="Personally selected stays — chosen for comfort, location and the kind of quality Scandinavian travelers expect."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {topPicks.map((p) => (
              <div key={p.label} className="flex flex-col">
                <div className="text-center mb-5">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{p.label}</span>
                </div>
                <HotelCard hotel={p.hotel} cta="Check Availability" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE BY AREA */}
      <section className="py-24 md:py-32 bg-gradient-dark border-y border-border/50">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Explore by Area"
            title="Find your perfect corner of Cyprus"
            subtitle="From energetic beach towns to refined coastal cities, choose the destination that matches your travel style."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {areaList.map((a) => (
              <Link
                to={`/hotels/${a.slug}`}
                key={a.slug}
                className="group relative h-[440px] overflow-hidden hover-lift shadow-elegant block"
              >
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Cyprus</span>
                  <h3 className="font-serif text-4xl mt-2">{a.name}</h3>
                  <p className="mt-2 text-sm text-foreground/80">{a.tagline}</p>
                  <span className="mt-5 text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 self-start group-hover:border-gold transition-colors">
                    Discover Hotels →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-24 md:py-32">
        <div className="container-luxe grid md:grid-cols-3 gap-10 text-center">
          {[
            { t: "Independently Curated", d: "No paid placements. Every hotel is selected on merit." },
            { t: "Built for Scandinavians", d: "Quiet quality, calm service and honest value — the way we like to travel." },
            { t: "Best-Price Partners", d: "We connect you to trusted booking platforms for the best available rates." },
          ].map((b) => (
            <div key={b.t}>
              <div className="mx-auto w-px h-10 bg-gold mb-6" />
              <h3 className="font-serif text-2xl">{b.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
