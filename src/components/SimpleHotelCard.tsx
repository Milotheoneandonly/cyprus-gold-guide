import { Link } from "react-router-dom";
import { ShieldCheck, ExternalLink } from "lucide-react";
import GoldButton from "./GoldButton";
import { useLang } from "@/i18n/LanguageContext";
import type { HotelWithMeta } from "@/lib/hotelsApi";
import { slugify } from "@/lib/slugify";

type Props = {
  hotel: HotelWithMeta | (import("@/data/hotels").Hotel & { area?: string; slug?: string });
};

const SimpleHotelCard = ({ hotel }: Props) => {
  const { t } = useLang();
  const area = (hotel as any).area as string | undefined;
  const slug = (hotel as any).slug || slugify(hotel.name);
  const detailHref = area ? `/hotell/${area}/${hotel.category ?? "luxury"}/${slug}` : undefined;

  const Wrapper: any = detailHref ? Link : "div";
  const wrapperProps: any = detailHref ? { to: detailHref } : {};

  return (
    <Wrapper
      {...wrapperProps}
      aria-label={`${hotel.name} – mer information`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
    >
      <article className="group bg-card border border-border/60 hover:border-gold/50 overflow-hidden hover-lift shadow-elegant flex flex-col rounded-xl relative h-full">
        {hotel.highlight && (
          <span className="absolute top-4 right-4 z-10 bg-gradient-gold text-gold-foreground px-3 py-1 text-[10px] uppercase tracking-[0.22em] rounded-full shadow-gold">
            {hotel.highlight}
          </span>
        )}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            loading="lazy"
            className="h-full w-full object-cover saturate-110 contrast-105 transition-transform duration-[1000ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-70" />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-serif text-2xl text-foreground">{hotel.name}</h3>

          <dl className="mt-4 space-y-2 text-sm flex-1">
            {hotel.bestFor && (
              <div className="flex gap-2">
                <dt className="text-gold uppercase tracking-[0.18em] text-[10px] mt-1 shrink-0 w-20">{t.card.bestFor}</dt>
                <dd className="text-foreground/90">{hotel.bestFor}</dd>
              </div>
            )}
            {hotel.location && (
              <div className="flex gap-2">
                <dt className="text-gold uppercase tracking-[0.18em] text-[10px] mt-1 shrink-0 w-20">{t.card.location}</dt>
                <dd className="text-foreground/90">{hotel.location}</dd>
              </div>
            )}
            {hotel.note && (
              <div className="flex gap-2">
                <dt className="text-gold uppercase tracking-[0.18em] text-[10px] mt-1 shrink-0 w-20">{t.card.note}</dt>
                <dd className="text-muted-foreground italic">{hotel.note}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 space-y-2">
            <GoldButton variant="solid" className="w-full rounded-full">
              Visa hotellet
            </GoldButton>
            <a
              href={hotel.bookingUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block w-full text-center text-[11px] uppercase tracking-[0.22em] text-gold border border-gold/40 hover:border-gold rounded-full py-2 transition-colors"
            >
              <span className="inline-flex items-center gap-1.5">
                {t.card.cta}
                <ExternalLink className="h-3 w-3" />
              </span>
            </a>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-center text-muted-foreground/80">
              <ShieldCheck className="h-3 w-3 text-gold" />
              {t.card.secure}
            </p>
          </div>
        </div>
      </article>
    </Wrapper>
  );
};

export default SimpleHotelCard;
