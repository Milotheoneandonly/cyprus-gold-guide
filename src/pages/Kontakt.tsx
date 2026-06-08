import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

// TODO: Replace contact email once final domain is purchased.
const CONTACT_EMAIL = "contact@FINAL-DOMAIN.com";

const Kontakt = () => {
  useSeo({
    title: "Contact – Cyprus Hotels",
    description: "Contact Cyprus Hotels for questions about hotels or incorrect information.",
    canonicalPath: "/kontakt",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Contact" title="Get in touch" />
        <div className="max-w-2xl mx-auto mt-10 space-y-6 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Have questions about hotels in Cyprus or spotted incorrect info? Drop us a diss at{" "}
            <a href="mailto:partnerships.cyprushotel@gmail.com" className="text-gold hover:underline">
              partnerships.cyprushotel@gmail.com
            </a>
            .
          </p>
          <p>
            For partnerships and inquiries, contact us at:{" "}
            <a href="mailto:partnerships.cyprushotel@gmail.com" className="text-gold hover:underline">
              partnerships.cyprushotel@gmail.com
            </a>
            .
          </p>
          <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border/40">
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">For hotel owners</h2>
              <p className="text-sm text-muted-foreground">
                Want to suggest your hotel or correct existing information? Email us.
              </p>
            </div>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">Incorrect hotel information</h2>
              <p className="text-sm text-muted-foreground">
                Found something wrong about a hotel? Let us know and we'll fix it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontakt;
