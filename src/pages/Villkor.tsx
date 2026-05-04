import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

const Villkor = () => {
  useSeo({
    title: "Villkor – Cypern Hotell",
    description: "Användarvillkor för Cypern Hotell. Information, ansvar och bokning via externa partners.",
    canonicalPath: "/villkor",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Juridik" title="Villkor" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Cypern Hotell är en informationsguide. Sajten visar urval och beskrivningar av hotell på
            Cypern, men själva bokningen hanteras av externa partners (t.ex. Booking.com).
          </p>
          <p>
            Priser, tillgänglighet och villkor kan ändras när som helst hos partnern. Det som visas hos
            bokningspartnern vid bokningstillfället är det som gäller.
          </p>
          <p>
            Hotellbeskrivningar kan innehålla fel eller vara inaktuella och bör verifieras hos partnern
            eller hotellet innan du bokar.
          </p>
          <p>
            Vi lämnar inga garantier kring tillgänglighet, pris, hotellets standard eller upplevelsen av
            din resa. Du är själv ansvarig för att läsa och godkänna bokningspartnerns villkor.
          </p>
          <p>
            Genom att använda sajten godkänner du att informationen kan ändras utan förvarning och att
            den är avsedd som vägledning, inte som ett bindande erbjudande.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Villkor;
