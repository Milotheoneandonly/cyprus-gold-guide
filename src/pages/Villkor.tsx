import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

const Villkor = () => {
  useSeo({
    title: "Terms – Cyprus Hotels",
    description: "Terms of use for Cyprus Hotels. Information, responsibility and booking via external partners.",
    canonicalPath: "/villkor",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Legal" title="Terms" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Cyprus Hotels is an information guide. The site shows a selection of hotels in Cyprus with
            descriptions, but the booking itself is handled by external partners (for example
            Booking.com).
          </p>
          <p>
            Prices, availability and terms can change at any time at the partner. What is shown at the
            booking partner at the time of booking is what applies.
          </p>
          <p>
            Hotel descriptions may contain errors or be out of date and should be verified with the
            partner or the hotel before you book.
          </p>
          <p>
            We give no guarantees regarding availability, price, hotel standard or the experience of
            your trip. You are responsible for reading and accepting the booking partner's terms.
          </p>
          <p>
            By using the site you accept that the information may change without notice and that it is
            intended as guidance, not as a binding offer.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Villkor;
