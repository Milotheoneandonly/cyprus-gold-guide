import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="border-t border-border/50 bg-background mt-24">
      <div className="container-luxe py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl">{t.brand}</h3>
          <p className="text-sm text-muted-foreground mt-3 max-w-sm">
            {t.footer.intro}
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">{t.footer.explore}</h4>
          <ul className="space-y-2 text-sm text-foreground/85">
            <li><Link to="/hotell/ayia-napa" className="hover:text-gold transition-colors">Ayia Napa</Link></li>
            <li><Link to="/hotell/limassol" className="hover:text-gold transition-colors">Limassol</Link></li>
            <li><Link to="/hotell/paphos" className="hover:text-gold transition-colors">Paphos</Link></li>
            <li><Link to="/hotell/protaras" className="hover:text-gold transition-colors">Protaras</Link></li>
            <li><Link to="/hotell/larnaca" className="hover:text-gold transition-colors">Larnaca</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Information</h4>
          <ul className="space-y-2 text-sm text-foreground/85">
            <li><Link to="/om-oss" className="hover:text-gold transition-colors">Om oss</Link></li>
            <li><Link to="/kontakt" className="hover:text-gold transition-colors">Kontakt</Link></li>
            <li><Link to="/annonslankar" className="hover:text-gold transition-colors">Annonslänkar</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Juridik</h4>
          <ul className="space-y-2 text-sm text-foreground/85">
            <li><Link to="/integritetspolicy" className="hover:text-gold transition-colors">Integritetspolicy</Link></li>
            <li><Link to="/cookies" className="hover:text-gold transition-colors">Cookies</Link></li>
            <li><Link to="/villkor" className="hover:text-gold transition-colors">Villkor</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container-luxe py-5 text-xs text-muted-foreground/90">
          Cypern Hotell innehåller annonslänkar. Vi kan få provision om du bokar via våra länkar, utan
          extra kostnad för dig.
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container-luxe py-6 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
          <span>{t.footer.madeFor}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
