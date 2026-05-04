import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import { useLang } from "@/i18n/LanguageContext";
import { useSeo } from "@/lib/useSeo";
import heroImg from "@/assets/hero.jpg";
import paphosImg from "@/assets/paphos.jpg";
import ayiaNapaImg from "@/assets/ayia-napa.jpg";
import limassolImg from "@/assets/limassol.jpg";

const destinations = [
  { slug: "paphos", name: "Paphos", key: "paphos" as const, image: paphosImg },
  { slug: "ayia-napa", name: "Ayia Napa", key: "ayiaNapa" as const, image: ayiaNapaImg },
  { slug: "limassol", name: "Limassol", key: "limassol" as const, image: limassolImg },
];

const Index = () => {
  const { t } = useLang();
  useSeo({
    title: "Hotell på Cypern – Handplockade lyxhotell för skandinaver",
    description:
      "Handplockade hotell på Cypern: Ayia Napa, Limassol och Paphos. Lyx, familj och budget – kuraterat för skandinaver.",
    canonicalPath: "/",
  });
  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[460px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury Cyprus seaside resort at dusk"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover saturate-110 contrast-105 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-background/25" />
        <div className="relative container-luxe h-full flex flex-col justify-center items-center text-center animate-fade-up">
          <span className="text-[11px] uppercase tracking-[0.35em] text-gold">{t.step(1, 3)}</span>
          <h1 className="mt-5 font-serif text-5xl md:text-7xl font-light leading-[1.05] max-w-4xl">
            {t.home.title1} <span className="text-gradient-gold italic">{t.home.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg text-foreground/85">
            {t.home.helper}
          </p>
        </div>
        <ScrollDownArrow targetId="destinations" />
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="py-20 md:py-28">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-3">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                to={`/hotell/${d.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border/60 hover:border-gold/70 shadow-elegant hover-lift block transition-all min-h-[420px] flex flex-col justify-end text-center"
              >
                <img
                  src={d.image}
                  alt={`${d.name} Cyprus`}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 saturate-110 contrast-105 brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-card" />
                <div className="absolute inset-0 opacity-60 mix-blend-overlay bg-gradient-to-br from-sky-500/20 via-transparent to-orange-400/20" />
                <div className="relative p-10">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gold drop-shadow">{t.home.chips}</span>
                  <h3 className="mt-4 font-serif text-4xl text-foreground drop-shadow-lg">{d.name}</h3>
                  <p className="mt-5 text-foreground/95 drop-shadow">{t.home.destinations[d.key]}</p>
                  <span className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-gold border-b border-gold/40 pb-1 group-hover:border-gold group-hover:tracking-[0.28em] transition-all">
                    {t.home.choose}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
