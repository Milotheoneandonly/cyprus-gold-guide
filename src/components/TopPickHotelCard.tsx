import { Link } from "react-router-dom";
import { ShieldCheck, Crown, Flame, Gem, ExternalLink } from "lucide-react";
import GoldButton from "./GoldButton";
import { useLang } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import type { HotelWithMeta } from "@/lib/hotelsApi";
import { slugify } from "@/lib/slugify";

type Rank = 1 | 2 | 3;

const rankStyles: Record<Rank, { ring: string; glow: string; badgeIcon: JSX.Element }> = {
  1: {
    ring: "border-gold/80 ring-2 ring-gold/40",
    glow: "shadow-[0_0_60px_-10px_hsl(var(--gold)/0.6)]",
    badgeIcon: <Crown className="h-3.5 w-3.5" />,
  },
  2: {
    ring: "border-gold/60 ring-1 ring-gold/30",
    glow: "shadow-[0_0_45px_-12px_hsl(var(--gold)/0.45)]",
    badgeIcon: <Flame className="h-3.5 w-3.5" />,
  },
  3: {
    ring: "border-gold/60 ring-1 ring-gold/25",
    glow: "shadow-[0_0_45px_-12px_hsl(var(--gold)/0.4)]",
    badgeIcon: <Gem className="h-3.5 w-3.5" />,
  },
};

type Props = {
  hotel: HotelWithMeta | (import("@/data/hotels").Hotel & { area?: string; slug?: string });
  rank: Rank;
};

const TopPickHotelCard = ({ hotel, rank }: Props) => {
  const { t } = useLang();
  const badgeText =
    rank === 1 ? t.hotelList.badges.first : rank === 2 ? t.hotelList.badges.second : t.hotelList.badges.third;
  const styles = rankStyles[rank];

  const area = (hotel as any).area as string | undefined;
  const slug = (hotel as any).slug || slugify(hotel.name);
  const detailHref = area ? `/hotell/${area}/${hotel.category ?? "luxury"}/${slug}` : undefined;

  const Wrapper: any = detailHref ? Link : "div";
  const wrapperProps: any = detailHref ? { to: detailHref } : {};

  return (
    <Wrapper
      {...wrapperProps}
      aria-label={`${badgeText} — ${hotel.name}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl"
    >
      <article
        className={cn(
          "group relative bg-card border overflow-hidden flex flex-col rounded-xl h-full transition-all duration-500",
          styles.ring,
          styles.glow,
          "hover:-translate-y-2 hover:scale-[1.03]",
        )}
      >
        <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-gradient-gold text-gold-foreground px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] rounded-full shadow-gold font-medium">
          {styles.badgeIcon}
          {badgeText}
        </span>

        {hotel.highlight && (
          <span className="absolute top-4 right-4 z-10 bg-background/85 backdrop-blur text-gold border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] rounded-full">
            {hotel.highlight}
          </span>
        )}

        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            loading="lazy"
            className="h-full w-full object-cover saturate-110 contrast-105 brightness-105 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-serif text-2xl md:text-3xl text-foreground">{hotel.name}</h3>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {hotel.bestFor || hotel.location || hotel.note || ""}
          </p>

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

export default TopPickHotelCard;
