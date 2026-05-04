import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

// TODO: Replace contact email once final domain is purchased.
const CONTACT_EMAIL = "kontakt@FINAL-DOMAIN.se";

const Integritetspolicy = () => {
  useSeo({
    title: "Integritetspolicy – Cypern Hotell",
    description: "Så hanterar Cypern Hotell personuppgifter och dina rättigheter enligt GDPR.",
    canonicalPath: "/integritetspolicy",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Juridik" title="Integritetspolicy" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <h2 className="font-serif text-2xl text-gold">Vilka uppgifter vi kan samla in</h2>
          <ul className="list-disc pl-5 space-y-2 marker:text-gold">
            <li>Information som du själv skickar till oss via e-post.</li>
            <li>Inloggningsuppgifter för administratörer (endast för intern administration av sajten).</li>
            <li>
              Anonym statistik om sidvisningar om analysverktyg läggs till i framtiden — då kommer det att
              ske med samtycke.
            </li>
            <li>
              Klick på annonslänkar kan registreras av vår partner (t.ex. Booking.com) enligt deras
              integritetspolicy.
            </li>
          </ul>

          <h2 className="font-serif text-2xl text-gold pt-4">Tredjepartstjänster</h2>
          <p>
            Vi använder tjänster från Lovable (hosting och plattform), Supabase (databas och inloggning)
            samt Booking.com och liknande bokningspartners. Dessa har egna integritetspolicys som gäller
            när du använder dem.
          </p>

          <h2 className="font-serif text-2xl text-gold pt-4">Dina rättigheter (GDPR)</h2>
          <p>
            Du har rätt att begära information om vilka uppgifter vi har om dig, få dem rättade eller
            raderade, samt invända mot behandling. Kontakta oss för att utöva dessa rättigheter.
          </p>

          <h2 className="font-serif text-2xl text-gold pt-4">Kontakt</h2>
          <p>
            Frågor om integritet:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Integritetspolicy;
