import GoldButton from "./GoldButton";
import { Hotel } from "@/data/hotels";

const HotelCard = ({ hotel, cta = "View Deal" }: { hotel: Hotel; cta?: string }) => (
  <article className="group bg-card border border-border/60 overflow-hidden hover-lift shadow-elegant flex flex-col">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={hotel.image}
        alt={hotel.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold border border-gold/30">
        {hotel.tag}
      </span>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <h3 className="font-serif text-2xl text-foreground">{hotel.name}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
        {hotel.description}
      </p>
      <div className="mt-6">
        <GoldButton variant="outline" className="w-full">{cta}</GoldButton>
      </div>
    </div>
  </article>
);

export default HotelCard;
