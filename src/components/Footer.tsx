import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background mt-24">
    <div className="container-luxe py-16 grid gap-10 md:grid-cols-3">
      <div>
        <h3 className="font-serif text-2xl">Cyprus Hotels</h3>
        <p className="text-sm text-muted-foreground mt-3 max-w-sm">
          A handpicked guide for Scandinavian travelers seeking the finest stays
          across Cyprus.
        </p>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Explore</h4>
        <ul className="space-y-2 text-sm text-foreground/85">
          <li><Link to="/where-to-stay" className="hover:text-gold transition-colors">Where to Stay</Link></li>
          <li><Link to="/hotels/ayia-napa" className="hover:text-gold transition-colors">Ayia Napa</Link></li>
          <li><Link to="/hotels/limassol" className="hover:text-gold transition-colors">Limassol</Link></li>
          <li><Link to="/hotels/paphos" className="hover:text-gold transition-colors">Paphos</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-[0.25em] text-gold mb-4">About</h4>
        <p className="text-sm text-muted-foreground">
          We earn a small commission when you book through our partners — at no
          extra cost to you. This keeps our recommendations honest and our
          guides free.
        </p>
      </div>
    </div>
    <div className="border-t border-border/40">
      <div className="container-luxe py-6 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Cyprus Hotels for Scandinavians</span>
        <span>Curated with care · Made for Sweden, Norway & Denmark</span>
      </div>
    </div>
  </footer>
);

export default Footer;
