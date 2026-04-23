import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/where-to-stay", label: "Where to Stay" },
  { to: "/hotels/ayia-napa", label: "Ayia Napa" },
  { to: "/hotels/limassol", label: "Limassol" },
  { to: "/hotels/paphos", label: "Paphos" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl md:text-2xl tracking-wide text-foreground">
            Cyprus<span className="text-gold"> · </span>Hotels
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
            For Scandinavians
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? "text-gold" : "text-foreground/80 hover:text-gold"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background">
          <nav className="container-luxe flex flex-col py-6 gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base tracking-wide ${isActive ? "text-gold" : "text-foreground/85"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
