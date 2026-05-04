import { useParams, Navigate, Link } from "react-router-dom";
import { ShieldCheck, ExternalLink, Star } from "lucide-react";
import Layout from "@/components/Layout";
import GoldButton from "@/components/GoldButton";
import SimpleHotelCard from "@/components/SimpleHotelCard";
import { areas, AreaKey, HotelCategory } from "@/data/hotels";
import { useHotelBySlug, useHotels } from "@/lib/hotelsApi";
import { useSeo } from "@/lib/useSeo";
import { isAreaKey, isCategory, getArea, CATEGORY_SV } from "@/lib/areas";
import { useLang } from "@/i18n/LanguageContext";
import { getBookingCtaLabel } from "@/lib/booking";

const HotelDetailPage = () => {
  const { area: areaParam, type, hotelSlug } = useParams();
  const { t } = useLang();

  const areaKey = isAreaKey(areaParam) ? (areaParam as AreaKey) : undefined;
  const category = isCategory(type) ? (type as HotelCategory) : undefined;
  const areaMeta = getArea(areaParam);

  const { data: hotel, isLoading } = useHotelBySlug(areaKey, hotelSlug);
  const { data: related } = useHotels(areaKey, category);

  const seoTitle = hotel?.seoTitle || (hotel ? `${hotel.name} – ${areaMeta?.swedishName}, Cypern` : "Hotell på Cypern");
  const seoDesc =
    hotel?.seoDescription ||
    (hotel
      ? `${hotel.name} i ${areaMeta?.swedishName}. ${hotel.bestFor || hotel.description}`.slice(0, 155)
      : "Hotell på Cypern.");

  useSeo({
    title: seoTitle,
    description: seoDesc,
    canonicalPath:
      areaMeta && category && hotelSlug ? `/hotell/${areaMeta.slug}/${category}/${hotelSlug}` : undefined,
    image: hotel?.image,
  });

  if (!areaKey || !category || !areaMeta) return <Navigate to="/" replace />;

  if (isLoading) {
    return (
      <Layout>
        <div className="container-luxe py-32 text-center text-muted-foreground">Laddar…</div>
      </Layout>
    );
  }

  if (!hotel) {
    // Fallback: try static data by name match (only if static area exists)
    const staticArea = areas[areaKey];
    const staticHotel = staticArea?.categories[category].find(
      (h) => h.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === hotelSlug,
    );
    if (!staticHotel) {
      return (
        <Layout>
          <div className="container-luxe py-32 text-center">
            <h1 className="font-serif text-3xl text-gradient-gold italic">Hotellet hittades inte</h1>
            <Link to={`/hotell/${areaMeta.slug}/${category}`} className="mt-6 inline-block text-gold underline">
              Tillbaka till {CATEGORY_SV[category].toLowerCase()}hotell i {areaMeta.swedishName}
            </Link>
          </div>
        </Layout>
      );
    }
  }

  const h = hotel;
  if (!h) return null;

  const relatedHotels = (related || []).filter((r) => r.id !== h.id).slice(0, 3);

  return (
    <Layout>
      <article className="pb-20">
        {/* HERO IMAGE */}
        <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
          <img src={h.image} alt={h.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
          <div className="relative container-luxe h-full flex flex-col justify-end pb-10">
            <nav aria-label="Brödsmulor" className="text-xs text-muted-foreground mb-4">
              <Link to="/" className="hover:text-gold">Hem</Link>
              <span className="mx-2">/</span>
              <Link to={`/hotell/${areaMeta.slug}`} className="hover:text-gold">{areaMeta.swedishName}</Link>
              <span className="mx-2">/</span>
              <Link to={`/hotell/${areaMeta.slug}/${category}`} className="hover:text-gold">
                {CATEGORY_SV[category]}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gold">{h.name}</span>
            </nav>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-background/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold border border-gold/30 rounded-full">
                {h.tag}
              </span>
              {h.highlight && (
                <span className="bg-gradient-gold text-gold-foreground px-3 py-1 text-[10px] uppercase tracking-[0.22em] rounded-full shadow-gold">
                  {h.highlight}
                </span>
              )}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-light text-foreground">{h.name}</h1>
            <div className="mt-3 flex items-center gap-4 text-sm text-foreground/80">
              <span>{areaMeta.swedishName}, Cypern</span>
              {h.stars && (
                <span className="flex items-center gap-0.5 text-gold">
                  {Array.from({ length: h.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* DETAILS */}
        <section className="py-12 md:py-16">
          <div className="container-luxe grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-gradient-gold italic mb-3">Om hotellet</h2>
                <p className="text-foreground/85 leading-relaxed">{h.description}</p>
              </div>

              <dl className="grid sm:grid-cols-2 gap-6 border-t border-border/40 pt-8">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-gold mb-1">Destination</dt>
                  <dd className="text-foreground/90">{areaMeta.swedishName}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-gold mb-1">Kategori</dt>
                  <dd className="text-foreground/90">{CATEGORY_SV[category]}</dd>
                </div>
                {h.bestFor && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold mb-1">Bäst för</dt>
                    <dd className="text-foreground/90">{h.bestFor}</dd>
                  </div>
                )}
                {h.location && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold mb-1">Plats</dt>
                    <dd className="text-foreground/90">{h.location}</dd>
                  </div>
                )}
                {h.stars && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold mb-1">Stjärnor</dt>
                    <dd className="text-foreground/90">{h.stars}★</dd>
                  </div>
                )}
                {h.note && (
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-gold mb-1">Notis</dt>
                    <dd className="text-muted-foreground italic">{h.note}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* CTA SIDEBAR */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-gold/40 rounded-xl p-6 shadow-elegant">
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold mb-2">Boka via Booking.com</p>
                <h3 className="font-serif text-xl text-foreground mb-4">Se aktuella priser</h3>
                <a
                  href={h.bookingUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className="block"
                >
                  <GoldButton variant="solid" className="w-full rounded-full">
                    <span className="inline-flex items-center gap-2">
                      {getBookingCtaLabel(h.bookingUrl)}
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </GoldButton>
                </a>
                <p className="mt-3 text-[11px] text-center text-muted-foreground">{t.card.redirect}</p>
                <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-center text-muted-foreground/80">
                  <ShieldCheck className="h-3 w-3 text-gold" />
                  {t.card.secure}
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* RELATED */}
        {relatedHotels.length > 0 && (
          <section className="py-12 border-t border-border/40">
            <div className="container-luxe">
              <h2 className="font-serif text-2xl md:text-3xl text-center mb-10">
                <span className="text-gradient-gold italic">Liknande hotell i {areaMeta.swedishName}</span>
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedHotels.map((r) => (
                  <SimpleHotelCard key={r.id} hotel={r} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link to={`/hotell/${areaMeta.slug}/${category}`}>
                  <GoldButton variant="outline">
                    Alla {CATEGORY_SV[category].toLowerCase()}hotell i {areaMeta.swedishName}
                  </GoldButton>
                </Link>
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default HotelDetailPage;
