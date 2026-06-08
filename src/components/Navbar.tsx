import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const Navbar = () => {
  const { t } = useLang();
  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex flex-col items-center leading-[1.2]">
          <span className="font-serif text-xl md:text-2xl tracking-wide text-foreground whitespace-nowrap pb-0.5">
            {t.brand}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0">
            {t.brandTagline}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/about"
            className="hidden sm:inline text-sm text-foreground/80 hover:text-gold transition-colors"
          >
            {t.navAbout}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
