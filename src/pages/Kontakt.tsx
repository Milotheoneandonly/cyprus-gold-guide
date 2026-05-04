import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

// TODO: Replace contact email once final domain is purchased.
const CONTACT_EMAIL = "kontakt@FINAL-DOMAIN.se";

const Kontakt = () => {
  useSeo({
    title: "Kontakt – Cypern Hotell",
    description: "Kontakta Cypern Hotell för frågor om hotell, annonslänkar eller felaktig information.",
    canonicalPath: "/kontakt",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Kontakt" title="Hör av dig" />
        <div className="max-w-2xl mx-auto mt-10 space-y-6 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Vi svarar på frågor om hotell på Cypern, annonslänkar och felaktigheter i hotellinformation.
            Skriv till oss på{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-border/40">
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">För hotellägare</h2>
              <p className="text-sm text-muted-foreground">
                Vill du föreslå ditt hotell eller korrigera uppgifter? Mejla oss.
              </p>
            </div>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">För frågor om annonslänkar</h2>
              <p className="text-sm text-muted-foreground">
                Vi använder annonslänkar. Läs mer på sidan Annonslänkar.
              </p>
            </div>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">Felaktig hotellinformation</h2>
              <p className="text-sm text-muted-foreground">
                Hittade du fel om ett hotell? Hör av dig så rättar vi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontakt;
