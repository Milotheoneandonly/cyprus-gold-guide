import GoldButton from "./GoldButton";
import { Hotel } from "@/data/hotels";
import { ShieldCheck } from "lucide-react";

const HotelCard = ({
  hotel,
  cta = "Check price on Booking.com",
}: {
  hotel: Hotel;
  cta?: string;
}) => (
  <article className="group bg-card border border-border/60 overflow-hidden hover-lift shadow-elegant flex flex-col rounded-lg">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={hotel.image}
        alt={hotel.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold border border-gold/30 rounded-full">
        {hotel.tag}
      </span>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <h3 className="font-serif text-2xl text-foreground">{hotel.name}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
        {hotel.description}
      </p>
      <div className="mt-6">
        <a
          href={hotel.bookingUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block"
          aria-label={`${cta} — ${hotel.name}`}
        >
          <GoldButton variant="solid" className="w-full rounded-full">
            {cta}
          </GoldButton>
        </a>
        <p className="mt-3 text-[11px] text-center text-muted-foreground">
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

export default HotelCard;
