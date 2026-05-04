import { Info } from "lucide-react";

/**
 * Visible affiliate disclosure for placement near Booking CTAs.
 * Per FTC/EU guidance: disclosure must be clear, near the link, before user acts.
 */
type Props = {
  variant?: "inline" | "block";
  className?: string;
};

export const AFFILIATE_DISCLOSURE_TEXT =
  "Annonslänk: Vi kan få provision om du bokar via länken, utan extra kostnad för dig.";

const AffiliateDisclosure = ({ variant = "inline", className = "" }: Props) => {
  if (variant === "block") {
    return (
      <div
        className={`flex items-start gap-2 rounded-md border border-gold/30 bg-gold/5 px-3 py-2 text-[11px] text-foreground/85 ${className}`}
        role="note"
      >
        <Info className="h-3.5 w-3.5 text-gold mt-0.5 shrink-0" />
        <span>{AFFILIATE_DISCLOSURE_TEXT}</span>
      </div>
    );
  }
  return (
    <p className={`text-[10px] text-muted-foreground/90 leading-snug ${className}`}>
      {AFFILIATE_DISCLOSURE_TEXT}
    </p>
  );
};

export default AffiliateDisclosure;
