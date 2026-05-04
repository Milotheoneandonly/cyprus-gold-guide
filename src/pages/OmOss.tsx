import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

const OmOss = () => {
  useSeo({
    title: "Om oss – Cypern Hotell",
    description:
      "Cypern Hotell är en svensk guide för resenärer som vill hitta rätt hotell på Cypern utan att jämföra hundratals alternativ själva.",
    canonicalPath: "/om-oss",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Om oss" title="En svensk guide till Cypern" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Cypern Hotell är en svensk guide för resenärer som vill hitta rätt hotell på Cypern utan att
            behöva jämföra hundratals alternativ själva.
          </p>
          <p>
            Vi fokuserar på svenska och skandinaviska resenärer. Hotellen är kurerade efter destination
            och typ av resa — lyx, familj eller budget — så att du snabbt kan hitta något som passar dig.
          </p>
          <p>
            Sajten är oberoende. Vi äger inga hotell och driver ingen resebyrå. Själva bokningen sker via
            externa partners, främst Booking.com, och priser samt tillgänglighet ska alltid kontrolleras
            hos partnern innan du bokar.
          </p>
          <p>
            Vi hävdar inte att vi personligen har besökt varje hotell. Våra rekommendationer baseras på
            offentligt tillgänglig information, läge, hotellets profil och hur väl det matchar olika typer
            av resor.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default OmOss;
