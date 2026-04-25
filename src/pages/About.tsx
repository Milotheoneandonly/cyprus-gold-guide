import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLang();
  const a = t.aboutPage;
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow={a.eyebrow} title={a.title} subtitle={a.subtitle} />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>{a.p1}</p>
          <p>{a.p2}</p>
          <p>{a.p3}</p>
        </div>
      </section>

      <section className="border-t border-border/50 bg-secondary/20">
        <div className="container-luxe py-16 md:py-24">
          <SectionHeader
            eyebrow={a.methodEyebrow}
            title={a.methodTitle}
            subtitle={a.methodSubtitle}
          />
          <div className="max-w-2xl mx-auto mt-10 space-y-6 text-base md:text-lg text-foreground/85 leading-relaxed">
            <p>{a.basedOn}</p>
            <ul className="space-y-3 pl-5 list-disc marker:text-gold">
              <li>{a.criteria.location}</li>
              <li>{a.criteria.ratings}</li>
              <li>{a.criteria.value}</li>
              <li>{a.criteria.suitability}</li>
            </ul>
            <p>{a.avoid}</p>
            <p className="pt-4 border-t border-border/40 text-muted-foreground">
              {a.goal}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
