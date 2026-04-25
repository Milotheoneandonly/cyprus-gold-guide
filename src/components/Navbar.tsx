import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "@/i18n/LanguageContext";

const Navbar = () => {
  const { t } = useLang();
  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl md:text-2xl tracking-wide text-foreground">
            {t.brand}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
            {t.brandTagline}
          </span>
        </Link>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Navbar;
