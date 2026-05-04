import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SectionHeader from "@/components/SectionHeader";
import { areaList } from "@/data/hotels";
import { useLang } from "@/i18n/LanguageContext";

const WhereToStay = () => {
  const { t } = useLang();
  const w = t.whereToStay;
  return (
    <Layout>
      <section className="py-20 md:py-28 border-b border-border/50">
        <div className="container-luxe text-center max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{w.eyebrow}</span>
          <h1 className="mt-5 font-serif text-5xl md:text-6xl font-light leading-tight">
            {w.titlePart1} <em className="text-gradient-gold not-italic">{w.titleAccent}</em>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg">
            {w.intro}
          </p>
        </div>
      </section>

      {areaList.map((a, i) => (
        <section key={a.slug} className={`py-20 md:py-28 ${i % 2 === 1 ? "bg-gradient-dark" : ""}`}>
          <div className="container-luxe grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="overflow-hidden shadow-elegant">
                <img src={a.image} alt={a.name} loading="lazy" className="w-full h-[480px] object-cover" />
              </div>
            </div>
            <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{w.destinationLabel(i + 1)}</span>
              <h2 className="mt-4 font-serif text-5xl font-light">{a.name}</h2>
              <p className="mt-3 text-gold italic font-serif text-xl">{a.tagline}</p>
              <p className="mt-6 text-muted-foreground leading-relaxed">{a.intro}</p>
              <div className="mt-6 border-l-2 border-gold pl-5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold">{w.bestForLabel}</span>
                <p className="mt-1 text-foreground">{a.bestFor}</p>
              </div>
              <div className="mt-8">
                <Link to={`/hotell/${a.slug}`}>
                  <GoldButton>{w.viewHotels(a.name)}</GoldButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 border-t border-border/50">
        <div className="container-luxe">
          <SectionHeader
            eyebrow={w.stillDeciding}
            title={w.topPicksTitle}
            subtitle={w.topPicksSubtitle}
          />
          <div className="mt-10 flex justify-center">
            <Link to="/"><GoldButton variant="outline">{w.seeTop3}</GoldButton></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhereToStay;
