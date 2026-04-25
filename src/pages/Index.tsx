import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero.jpg";

const destinations = [
  { slug: "paphos", name: "Paphos", short: "Calm, romantic, premium." },
  { slug: "ayia-napa", name: "Ayia Napa", short: "Lively, beaches, social." },
  { slug: "limassol", name: "Limassol", short: "City + beach + luxury mix." },
] as const;

const Index = () => (
  <Layout>
    {/* HERO */}
    <section className="relative h-[60vh] min-h-[460px] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Luxury Cyprus seaside resort at dusk"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-background/55" />
      <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center animate-fade-up">
        <span className="text-[11px] uppercase tracking-[0.35em] text-gold">Step 1 of 3</span>
        <h1 className="mt-5 font-serif text-5xl md:text-7xl font-light leading-[1.05] max-w-4xl">
          Choose your destination <span className="text-gradient-gold italic">in Cyprus</span>
        </h1>
        <p className="mt-5 max-w-xl text-base md:text-lg text-foreground/85">
          Start by choosing where in Cyprus you want to stay.
        </p>
      </div>
    </section>

    {/* DESTINATIONS */}
    <section className="py-20 md:py-28">
      <div className="container-luxe">
        <div className="grid gap-6 md:grid-cols-3">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              to={`/hotels/${d.slug}`}
              className="group bg-card border border-border/60 hover:border-gold/60 rounded-lg p-10 shadow-elegant hover-lift block transition-colors text-center"
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">Cyprus</span>
              <h3 className="mt-4 font-serif text-4xl">{d.name}</h3>
              <p className="mt-5 text-foreground/90">{d.short}</p>
              <span className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 group-hover:border-gold transition-colors">
                Choose →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
