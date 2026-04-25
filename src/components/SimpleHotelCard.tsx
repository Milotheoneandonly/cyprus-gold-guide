import { ShieldCheck } from "lucide-react";
import GoldButton from "./GoldButton";
import { Hotel } from "@/data/hotels";

const SimpleHotelCard = ({ hotel }: { hotel: Hotel }) => (
  <article className="group bg-card border border-border/60 overflow-hidden hover-lift shadow-elegant flex flex-col rounded-lg relative">
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
            <dt className="text-gold uppercase tracking-[0.18em] text-[10px] mt-1 shrink-0 w-20">Best for</dt>
            <dd className="text-foreground/90">{hotel.bestFor}</dd>
          </div>
        )}
        {hotel.location && (
          <div className="flex gap-2">
            <dt className="text-gold uppercase tracking-[0.18em] text-[10px] mt-1 shrink-0 w-20">Location</dt>
            <dd className="text-foreground/90">{hotel.location}</dd>
          </div>
        )}
        {hotel.note && (
          <div className="flex gap-2">
            <dt className="text-gold uppercase tracking-[0.18em] text-[10px] mt-1 shrink-0 w-20">Note</dt>
            <dd className="text-muted-foreground italic">{hotel.note}</dd>
          </div>
        )}
      </dl>

      <div className="mt-6">
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block"
          aria-label={`See price on Booking.com — ${hotel.name}`}
        >
          <GoldButton variant="solid" className="w-full rounded-full">
            See price on Booking
          </GoldButton>
        </a>
        <p className="mt-2 text-[11px] text-center text-muted-foreground">
          You will be redirected to Booking.com
        </p>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-center text-muted-foreground/80">
          <ShieldCheck className="h-3 w-3 text-gold" />
          Secure booking via Booking.com
        </p>
      </div>
    </div>
  </article>
);

export default SimpleHotelCard;
