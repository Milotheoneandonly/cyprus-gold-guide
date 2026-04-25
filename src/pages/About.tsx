import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";

const About = () => {
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader
          eyebrow="About"
          title="About us"
          subtitle="We help Scandinavian travelers find the right hotels in Cyprus – quickly and without stress."
        />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Instead of showing hundreds of options, we carefully select hotels
            that are actually worth booking.
          </p>
          <p>
            We focus on quality, location, and what fits different types of
            trips.
          </p>
          <p>Everything is designed to make your decision simple and reliable.</p>
        </div>
      </section>

      <section className="border-t border-border/50 bg-secondary/20">
        <div className="container-luxe py-16 md:py-24">
          <SectionHeader
            eyebrow="Our method"
            title="How we select hotels"
            subtitle="We don't show all hotels – only the ones that meet our standards."
          />
          <div className="max-w-2xl mx-auto mt-10 space-y-6 text-base md:text-lg text-foreground/85 leading-relaxed">
            <p>Each hotel is selected based on:</p>
            <ul className="space-y-3 pl-5 list-disc marker:text-gold">
              <li>Location</li>
              <li>Guest ratings</li>
              <li>Value for money</li>
              <li>Suitability (luxury, family, or budget)</li>
            </ul>
            <p>We avoid hotels with inconsistent quality or poor reviews.</p>
            <p className="pt-4 border-t border-border/40 text-muted-foreground">
              Our goal: make it easy for you to choose and book with confidence
              via Booking.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
