import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const GoldButton = ({ variant = "solid", className, children, ...props }: GoldButtonProps) => {
  const base =
    "inline-flex items-center justify-center px-7 py-3 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 rounded-full";
  const styles =
    variant === "solid"
      ? "bg-gradient-gold text-gold-foreground hover:brightness-110 hover:shadow-gold hover:-translate-y-0.5"
      : "border border-gold/60 text-gold hover:bg-gold hover:text-gold-foreground";

  return (
    <button className={cn(base, styles, className)} {...props}>
      {children}
    </button>
  );
};

export default GoldButton;
