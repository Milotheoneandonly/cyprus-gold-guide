import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GoldButton from "@/components/GoldButton";
import { useSeo } from "@/lib/useSeo";
import { SITE_URL, SITE_NAME, PUBLIC_INDEXING } from "@/config/site";
import type { Session } from "@supabase/supabase-js";

const PUBLIC_ROUTES = [
  "/",
  "/where-to-stay",
  "/om-oss",
  "/kontakt",
  "/annonslankar",
  "/integritetspolicy",
  "/cookies",
  "/villkor",
  "/hotell/ayia-napa",
  "/hotell/protaras",
  "/hotell/larnaca",
  "/hotell/paphos",
  "/hotell/limassol",
  "/hotell/coral-bay",
  "/hotell/polis-latchi",
];
const SEO_FILES = ["/robots.txt", "/sitemap.xml"];
const ADMIN_ROUTES = ["/admin", "/admin/import-hotels", "/admin/qa"];

const RouteRow = ({ href, isExternal = false }: { href: string; isExternal?: boolean }) => (
  <li className="flex items-center justify-between py-2 border-b border-border/40">
    <code className="text-sm text-foreground/90">{href}</code>
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="text-xs text-gold hover:underline"
    >
      Open ↗
    </a>
  </li>
);

const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-destructive">
    ⚠ {children}
  </div>
);

const Ok = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border border-gold/30 bg-gold/5 px-3 py-2 text-sm text-foreground/90">
    ✓ {children}
  </div>
);

const AdminQA = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [hotelCount, setHotelCount] = useState<number | null>(null);
  const [sitemapCount, setSitemapCount] = useState<number | null>(null);

  useSeo({ title: "Admin QA – Cypern Hotell", description: "Staging QA dashboard.", noindex: true });

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setSession(data.session);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roles);
    });
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;
    (supabase as any)
      .from("hotels")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true)
      .then(({ count }: any) => setHotelCount(count ?? 0));
    fetch("/sitemap.xml")
      .then((r) => r.text())
      .then((xml) => setSitemapCount((xml.match(/<loc>/g) || []).length))
      .catch(() => setSitemapCount(0));
  }, [isAdmin]);

  if (!session) return null;
  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (isAdmin === false) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-muted-foreground">Not authorized.</p>
      </main>
    );
  }

  const siteIsLovable = SITE_URL.includes("lovable.app");
  const indexingProductionMismatch = PUBLIC_INDEXING && siteIsLovable;
  const indexingStagingMismatch = !PUBLIC_INDEXING && !siteIsLovable;

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-gradient-gold italic">Admin · QA</h1>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/admin" className="text-gold hover:underline">Admin</Link>
          <Link to="/admin/import-hotels" className="text-gold hover:underline">Import</Link>
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-gold">
            View site
          </button>
        </div>
      </header>

      <div className="container-luxe py-8 space-y-8">
        <section>
          <h2 className="font-serif text-xl mb-3 text-gold">Configuration</h2>
          <ul className="text-sm text-foreground/90 space-y-1">
            <li><strong>SITE_NAME:</strong> {SITE_NAME}</li>
            <li><strong>SITE_URL:</strong> {SITE_URL}</li>
            <li><strong>PUBLIC_INDEXING:</strong> {String(PUBLIC_INDEXING)}</li>
            <li><strong>Active hotels:</strong> {hotelCount ?? "…"}</li>
            <li><strong>Sitemap URLs:</strong> {sitemapCount ?? "…"}</li>
          </ul>
          <div className="mt-4 space-y-2">
            {indexingProductionMismatch && (
              <Warning>
                PUBLIC_INDEXING is true but SITE_URL still points at lovable.app — staging would get
                indexed. Switch SITE_URL to the final domain or set PUBLIC_INDEXING=false.
              </Warning>
            )}
            {indexingStagingMismatch && (
              <Warning>
                PUBLIC_INDEXING is false but SITE_URL no longer contains lovable.app — production pages
                will all be noindex. Set VITE_PUBLIC_INDEXING=true when ready to launch.
              </Warning>
            )}
            {!indexingProductionMismatch && !indexingStagingMismatch && (
              <Ok>Indexing config matches the deployment target.</Ok>
            )}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3 text-gold">Public routes</h2>
          <ul className="rounded-md border border-border/60 bg-card px-4">
            {PUBLIC_ROUTES.map((r) => (
              <RouteRow key={r} href={r} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3 text-gold">SEO files</h2>
          <ul className="rounded-md border border-border/60 bg-card px-4">
            {SEO_FILES.map((r) => (
              <RouteRow key={r} href={r} isExternal />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl mb-3 text-gold">Admin</h2>
          <ul className="rounded-md border border-border/60 bg-card px-4">
            {ADMIN_ROUTES.map((r) => (
              <RouteRow key={r} href={r} />
            ))}
          </ul>
        </section>

        <div className="pt-6">
          <Link to="/admin">
            <GoldButton variant="outline">Back to Admin</GoldButton>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AdminQA;
