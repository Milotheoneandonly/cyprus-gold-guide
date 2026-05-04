import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

const Annonslankar = () => {
  useSeo({
    title: "Annonslänkar – Cypern Hotell",
    description:
      "Cypern Hotell använder annonslänkar. Vi kan få provision om du bokar via en partner, utan extra kostnad för dig.",
    canonicalPath: "/annonslankar",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Transparens" title="Annonslänkar" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Vissa länkar på Cypern Hotell är annonslänkar. Det betyder att vi kan få provision om du
            klickar vidare och bokar hotell via en partner, utan extra kostnad för dig.
          </p>
          <p>
            Våra rekommendationer ska vara användbara först. Provision påverkar inte att vi försöker
            visa rätt hotell för rätt typ av resa.
          </p>
          <p>
            Priser, tillgänglighet och villkor kontrolleras alltid hos bokningspartnern innan du bokar.
          </p>
          <p>
            Booking-knappar kan ibland leda till en sökning hos bokningspartnern, inte alltid direkt till
            hotellets exakta bokningssida.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Annonslankar;
