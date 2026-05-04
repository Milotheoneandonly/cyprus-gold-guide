import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

const Cookies = () => {
  useSeo({
    title: "Cookies – Cypern Hotell",
    description:
      "Cypern Hotell använder endast nödvändiga tekniska cookies. Analys- eller marknadsföringscookies aktiveras inte utan samtycke.",
    canonicalPath: "/cookies",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Juridik" title="Cookies" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Vi använder nödvändiga tekniska cookies för att webbplatsen ska fungera. Om vi senare lägger
            till analys- eller marknadsföringscookies kommer de inte att aktiveras utan samtycke.
          </p>
          <p>
            Idag används inga analys-, pixel-, värmekarte- eller marknadsföringsskript på sajten. Därför
            visas inget cookie-banner. När det blir aktuellt kommer du att tillfrågas innan något
            laddas.
          </p>
          <p>
            Externa tjänster du klickar dig vidare till — t.ex. Booking.com — kan sätta egna cookies
            enligt deras egna policys.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Cookies;
