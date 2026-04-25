import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useLang } from "@/i18n/LanguageContext";
import heroImg from "@/assets/hero.jpg";

const destinations = [
  { slug: "paphos", name: "Paphos", key: "paphos" as const },
  { slug: "ayia-napa", name: "Ayia Napa", key: "ayiaNapa" as const },
  { slug: "limassol", name: "Limassol", key: "limassol" as const },
];

const Index = () => {
  const { t } = useLang();
  return (
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
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.step(1, 3)}</span>
          <h1 className="mt-5 font-serif text-5xl md:text-7xl font-light leading-[1.05] max-w-4xl">
            {t.home.title1} <span className="text-gradient-gold italic">{t.home.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg text-foreground/85">
            {t.home.helper}
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
                <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{t.home.chips}</span>
                <h3 className="mt-4 font-serif text-4xl">{d.name}</h3>
                <p className="mt-5 text-foreground/90">{t.home.destinations[d.key]}</p>
                <span className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 group-hover:border-gold transition-colors">
                  {t.home.choose}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
