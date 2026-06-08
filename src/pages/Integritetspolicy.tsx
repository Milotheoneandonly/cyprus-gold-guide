import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

// TODO: Replace contact email once final domain is purchased.
const CONTACT_EMAIL = "contact@FINAL-DOMAIN.com";

const Integritetspolicy = () => {
  useSeo({
    title: "Privacy Policy – Cyprus Hotels",
    description: "How Cyprus Hotels handles personal data and your rights under GDPR.",
    canonicalPath: "/integritetspolicy",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Legal" title="Privacy Policy" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <h2 className="font-serif text-2xl text-gold">Information we may collect</h2>
          <ul className="list-disc pl-5 space-y-2 marker:text-gold">
            <li>Information you send us directly via email.</li>
            <li>Login credentials for administrators (used only for internal site administration).</li>
            <li>
              Anonymous page-view statistics if analytics tools are added in the future — this will
              only happen with your consent.
            </li>
          </ul>

          <h2 className="font-serif text-2xl text-gold pt-4">Third-party services</h2>
          <p>
            We use services from Lovable (hosting and platform), Supabase (database and authentication)
            and Booking.com and similar booking partners. These have their own privacy policies that
            apply when you use them.
          </p>

          <h2 className="font-serif text-2xl text-gold pt-4">Your rights (GDPR)</h2>
          <p>
            You have the right to request information about what data we hold about you, to have it
            corrected or deleted, and to object to processing. Contact us to exercise these rights.
          </p>

          <h2 className="font-serif text-2xl text-gold pt-4">Contact</h2>
          <p>
            Questions about privacy:{" "}
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
