import { ChevronDown } from "lucide-react";

interface Props {
  targetId: string;
  label?: string;
}

const ScrollDownArrow = ({ targetId, label = "Scroll" }: Props) => {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full p-2"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] text-gold/90 group-hover:text-gold transition-colors">
        {label}
      </span>
      <span className="flex items-center justify-center h-11 w-11 rounded-full border border-gold/50 bg-background/40 backdrop-blur-sm text-gold animate-bounce group-hover:bg-gold group-hover:text-gold-foreground group-hover:border-gold transition-colors shadow-gold">
        <ChevronDown className="h-5 w-5" />
      </span>
    </button>
  );
};

export default ScrollDownArrow;
