import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

const OmOss = () => {
  useSeo({
    title: "About us – Cyprus Hotels",
    description:
      "Cyprus Hotels is a curated guide for travelers who want to find the right hotel in Cyprus without comparing hundreds of options themselves.",
    canonicalPath: "/om-oss",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="About us" title="A curated guide to Cyprus" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Cyprus Hotels is a curated guide for travelers who want to find the right hotel in Cyprus
            without having to compare hundreds of options themselves.
          </p>
          <p>
            Hotels are curated by destination and type of trip — luxury, family or budget — so you can
            quickly find something that fits your stay.
          </p>
          <p>
            The site is independent. We do not own any hotels and do not operate a travel agency. The
            booking itself takes place via external partners, primarily Booking.com, and prices and
            availability should always be checked with the partner before you book.
          </p>
          <p>
            We do not claim to have personally visited every hotel. Our recommendations are based on
            publicly available information, location, the hotel's profile and how well it matches
            different types of trips.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default OmOss;
