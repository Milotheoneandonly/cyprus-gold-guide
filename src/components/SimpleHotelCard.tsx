import { ShieldCheck } from "lucide-react";
import GoldButton from "./GoldButton";
import { Hotel } from "@/data/hotels";
import { useLang } from "@/i18n/LanguageContext";

const SimpleHotelCard = ({ hotel }: { hotel: Hotel }) => {
  const { t } = useLang();
  return (
    <a
      href={hotel.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.card.cta} — ${hotel.name}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
    >
      <article className="group bg-card border border-border/60 overflow-hidden hover-lift shadow-elegant flex flex-col rounded-lg relative h-full">
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
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
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

          <div className="mt-6">
            <GoldButton variant="solid" className="w-full rounded-full">
              {t.card.cta}
            </GoldButton>
            <p className="mt-2 text-[11px] text-center text-muted-foreground">
              {t.card.redirect}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-center text-muted-foreground/80">
              <ShieldCheck className="h-3 w-3 text-gold" />
              {t.card.secure}
            </p>
          </div>
        </div>
      </article>
    </a>
  );
};

export default SimpleHotelCard;
