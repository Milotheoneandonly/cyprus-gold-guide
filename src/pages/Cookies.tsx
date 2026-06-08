import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useSeo } from "@/lib/useSeo";

const Cookies = () => {
  useSeo({
    title: "Cookies – Cyprus Hotels",
    description:
      "Cyprus Hotels uses only necessary technical cookies. Analytics or marketing cookies are not activated without consent.",
    canonicalPath: "/cookies",
  });
  return (
    <Layout>
      <section className="container-luxe py-16 md:py-24">
        <SectionHeader eyebrow="Legal" title="Cookies" />
        <div className="max-w-2xl mx-auto mt-10 space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            We use necessary technical cookies so the website works. If we later add analytics or
            marketing cookies, they will not be activated without your consent.
          </p>
          <p>
            No analytics, pixel, heatmap or marketing scripts are currently used on the site, so no
            cookie banner is shown. When that changes, you will be asked before anything loads.
          </p>
          <p>
            External services you click through to — for example Booking.com — may set their own
            cookies according to their own policies.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Cookies;
