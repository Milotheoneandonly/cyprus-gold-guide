import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SectionHeader from "@/components/SectionHeader";
import SimpleHotelCard from "@/components/SimpleHotelCard";
import heroImg from "@/assets/hero.jpg";
import { areas, areaList } from "@/data/hotels";

const destinations = [
  {
    slug: "paphos",
    name: "Paphos",
    short: "Calm, romantic, more premium.",
    bestFor: "Best for couples and relaxed trips.",
  },
  {
    slug: "ayia-napa",
    name: "Ayia Napa",
    short: "Lively, beaches, social.",
    bestFor: "Best for friends and active holidays.",
  },
  {
    slug: "limassol",
    name: "Limassol",
    short: "City + beach + luxury.",
    bestFor: "Best all-around option.",
  },
] as const;

const quickHelp = [
  { want: "Want peace and quiet", choose: "Choose Paphos", slug: "paphos" },
  { want: "Want beach life and energy", choose: "Choose Ayia Napa", slug: "ayia-napa" },
  { want: "Want a mix of everything", choose: "Choose Limassol", slug: "limassol" },
] as const;

const Index = () => {
  const topPicks = [
    { label: "Best Overall", hotel: areas.limassol.quickPicks.overall },
    { label: "Best Budget", hotel: areas["ayia-napa"].quickPicks.budget },
    { label: "Best for Couples", hotel: areas.paphos.quickPicks.overall },
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
            <a href="#choose-destination"><GoldButton>Choose destination</GoldButton></a>
            <Link to="/where-to-stay"><GoldButton variant="outline">Where to Stay</GoldButton></Link>
          </div>
        </div>
      </section>

      {/* CHOOSE DESTINATION */}
      <section id="choose-destination" className="py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Step 1"
            title="Choose where to stay in Cyprus"
            subtitle="Three destinations, three different trips. Pick the one that fits you."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                to={`/hotels/${d.slug}`}
                className="group bg-card border border-border/60 hover:border-gold/60 rounded-lg p-8 shadow-elegant hover-lift block transition-colors"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Cyprus</span>
                <h3 className="mt-3 font-serif text-3xl">{d.name}</h3>
                <p className="mt-3 text-foreground/90">{d.short}</p>
                <p className="mt-2 text-sm text-muted-foreground italic">{d.bestFor}</p>
                <span className="mt-6 inline-block text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 group-hover:border-gold transition-colors">
                  See hotels →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK HELP */}
      <section className="py-20 md:py-24 bg-gradient-dark border-y border-border/50">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Step 2"
            title="Not sure where to go?"
            subtitle="A quick guide to make the choice easy."
          />
          <div className="mt-12 max-w-3xl mx-auto space-y-4">
            {quickHelp.map((q) => (
              <Link
                key={q.slug}
                to={`/hotels/${q.slug}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/60 hover:border-gold/60 rounded-lg p-5 transition-colors group"
              >
                <span className="text-foreground/90">
                  {q.want} <span className="text-gold">→</span>{" "}
                  <span className="font-serif italic text-xl text-foreground">{q.choose}</span>
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 self-start sm:self-auto group-hover:border-gold">
                  Open guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOP 3 PICKS */}
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Top 3 picks"
            title="The most loved hotels in Cyprus"
            subtitle="Three reliable choices to get you started — one per traveler type."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {topPicks.map((p) => (
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

      {/* EXPLORE BY AREA */}
      <section className="py-20 md:py-28 bg-gradient-dark border-y border-border/50">
        <div className="container-luxe">
          <SectionHeader
            eyebrow="Explore by area"
            title="Find your perfect corner of Cyprus"
            subtitle="Lively beaches, refined cities or calm coves — pick the mood that fits."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {areaList.map((a) => (
              <Link
                to={`/hotels/${a.slug}`}
                key={a.slug}
                className="group relative h-[440px] overflow-hidden hover-lift shadow-elegant block rounded-lg"
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
                    Discover hotels →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-20 md:py-24">
        <div className="container-luxe grid md:grid-cols-3 gap-10 text-center">
          {[
            { t: "Independently curated", d: "No paid placements. Every hotel is selected on merit." },
            { t: "Built for Scandinavians", d: "Quiet quality, calm service and honest value." },
            { t: "Best-price partners", d: "We connect you to Booking.com for the best available rates." },
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
