import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import GoldButton from "@/components/GoldButton";
import HotelEditor, { HotelFormValues, emptyHotel } from "@/components/admin/HotelEditor";
import DataHealth from "@/components/admin/DataHealth";
import { resolveHotelImage } from "@/lib/hotelImages";
import { toast } from "@/hooks/use-toast";
import type { AreaKey, HotelCategory } from "@/data/hotels";
import type { Session } from "@supabase/supabase-js";
import { useSeo } from "@/lib/useSeo";
import { AREA_LIST, CATEGORIES as CATS } from "@/lib/areas";

const AREAS: { key: AreaKey; label: string }[] = AREA_LIST.map((a) => ({ key: a.key, label: a.name }));
const CATEGORIES: { key: HotelCategory; label: string }[] = CATS.map((c) => ({
  key: c,
  label: c.charAt(0).toUpperCase() + c.slice(1),
}));

type DbHotel = {
  id: string;
  area: AreaKey;
  category: HotelCategory;
  name: string;
  description: string;
  tag: string;
  image_url: string;
  booking_url: string;
  best_for: string | null;
  location: string | null;
  note: string | null;
  stars: number | null;
  highlight: string | null;
  sort_order: number;
  hotel_slug?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  sub_area?: string | null;
  official_website_url?: string | null;
  source_url?: string | null;
  last_verified_at?: string | null;
  is_active?: boolean;
  traveller_tags?: string[] | null;
  image_alt?: string | null;
  image_source?: string | null;
  image_license_status?: string | null;
  image_verified_at?: string | null;
  image_needs_review?: boolean | null;
};

const Admin = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [area, setArea] = useState<AreaKey>("ayia-napa");
  const [category, setCategory] = useState<HotelCategory>("luxury");
  const [editing, setEditing] = useState<DbHotel | null>(null);
  const [creating, setCreating] = useState(false);

  useSeo({ title: "Admin – Cypern Hotell", description: "Admin", noindex: true });

  // Auth + role check
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (!s) navigate("/admin/login", { replace: true });
    });
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
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const { data: hotels = [], isLoading } = useQuery({
    queryKey: ["admin-hotels", area, category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("area", area)
        .eq("category", category)
        .order("sort_order");
      if (error) throw error;
      return data as DbHotel[];
    },
    enabled: !!session && isAdmin === true,
  });

  const saveMutation = useMutation({
    mutationFn: async (values: HotelFormValues & { id?: string }) => {
      const payload = {
        area: values.area,
        category: values.category,
        name: values.name,
        description: values.description,
        tag: values.tag,
        image_url: values.image_url,
        booking_url: values.booking_url,
        best_for: values.best_for || null,
        location: values.location || null,
        note: values.note || null,
        stars: values.stars,
        highlight: values.highlight || null,
        sort_order: values.sort_order,
        hotel_slug: values.hotel_slug,
        seo_title: values.seo_title || null,
        seo_description: values.seo_description || null,
        sub_area: values.sub_area || null,
        official_website_url: values.official_website_url || null,
        source_url: values.source_url || null,
        last_verified_at: values.last_verified_at || null,
        is_active: values.is_active,
        traveller_tags: values.traveller_tags || [],
      };
      if (values.id) {
        const { error } = await supabase.from("hotels").update(payload).eq("id", values.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("hotels").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-hotels"] });
      qc.invalidateQueries({ queryKey: ["hotels"] });
      setEditing(null);
      setCreating(false);
      toast({ title: "Saved" });
    },
    onError: (e: Error) => toast({ title: "Save failed", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("hotels").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-hotels"] });
      qc.invalidateQueries({ queryKey: ["hotels"] });
      toast({ title: "Deleted" });
    },
    onError: (e: Error) => toast({ title: "Delete failed", description: e.message, variant: "destructive" }),
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string; newOrder: number }) => {
      const { error } = await supabase.from("hotels").update({ sort_order: newOrder }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-hotels"] }),
  });

  const move = async (idx: number, dir: -1 | 1) => {
    const a = hotels[idx];
    const b = hotels[idx + dir];
    if (!a || !b) return;
    await Promise.all([
      moveMutation.mutateAsync({ id: a.id, newOrder: b.sort_order }),
      moveMutation.mutateAsync({ id: b.id, newOrder: a.sort_order }),
    ]);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (!session) return null;

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (isAdmin === false) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h1 className="font-serif text-3xl mb-4 text-gradient-gold italic">Not authorized</h1>
          <p className="text-muted-foreground mb-6">
            Your account ({session.user.email}) is signed in but not yet an admin. Reply to your developer with this
            email so the admin role can be granted.
          </p>
          <GoldButton onClick={signOut}>Sign out</GoldButton>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-gradient-gold italic">Admin</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground hidden sm:inline">{session.user.email}</span>
          <Link to="/admin/import-hotels" className="text-gold hover:underline">
            Bulk import
          </Link>
          <Link to="/admin/qa" className="text-gold hover:underline">
            QA
          </Link>
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-gold">
            View site
          </button>
          <button onClick={signOut} className="text-muted-foreground hover:text-gold">
            Sign out
          </button>
        </div>
      </header>

      <div className="container-luxe py-8">
        <div className="flex gap-2 mb-4 flex-wrap">
          {AREAS.map((a) => (
            <button
              key={a.key}
              onClick={() => setArea(a.key)}
              className={`px-4 py-2 rounded-md text-sm border ${
                area === a.key
                  ? "bg-gold/15 border-gold text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-3 py-1.5 rounded-md text-xs uppercase tracking-wider border ${
                category === c.key
                  ? "bg-gold/10 border-gold/60 text-gold"
                  : "border-border/60 text-muted-foreground hover:border-gold/40"
              }`}
            >
              {c.label}
            </button>
          ))}
          <div className="flex-1" />
          <GoldButton onClick={() => setCreating(true)} className="!px-4 !py-2 !text-[11px]">
            + Add hotel
          </GoldButton>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <div className="space-y-3">
            {hotels.map((h, idx) => (
              <div
                key={h.id}
                className="flex items-center gap-4 rounded-lg border border-border/60 bg-card p-3"
              >
                <img
                  src={resolveHotelImage(h.image_url)}
                  alt={h.name}
                  className="h-16 w-24 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{h.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {h.stars ? "★".repeat(h.stars) + " · " : ""}
                    {h.location || h.tag}
                    {h.highlight ? ` · ${h.highlight}` : ""}
                    {h.hotel_slug ? ` · /${h.hotel_slug}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => move(idx, -1)}
                    className="px-2 py-1 text-xs border border-border rounded hover:border-gold/60 disabled:opacity-30"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    disabled={idx === hotels.length - 1}
                    onClick={() => move(idx, 1)}
                    className="px-2 py-1 text-xs border border-border rounded hover:border-gold/60 disabled:opacity-30"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => setEditing(h)}
                    className="px-3 py-1 text-xs border border-gold/60 text-gold rounded hover:bg-gold/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete ${h.name}?`)) deleteMutation.mutate(h.id);
                    }}
                    className="px-3 py-1 text-xs border border-destructive/60 text-destructive rounded hover:bg-destructive/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {hotels.length === 0 && (
              <p className="text-muted-foreground text-center py-12">No hotels yet in this category.</p>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-6">
          The first 3 hotels (top of the list) appear in "Top 3 Best Picks" on the public site.
        </p>

        <DataHealth />
      </div>

      {(editing || creating) && (
        <HotelEditor
          initial={
            editing
              ? {
                  id: editing.id,
                  area: editing.area,
                  category: editing.category,
                  name: editing.name,
                  description: editing.description,
                  tag: editing.tag,
                  image_url: editing.image_url,
                  booking_url: editing.booking_url,
                  best_for: editing.best_for ?? "",
                  location: editing.location ?? "",
                  note: editing.note ?? "",
                  stars: editing.stars ?? null,
                  highlight: editing.highlight ?? "",
                  sort_order: editing.sort_order,
                  hotel_slug: editing.hotel_slug ?? "",
                  seo_title: editing.seo_title ?? "",
                  seo_description: editing.seo_description ?? "",
                  sub_area: editing.sub_area ?? "",
                  official_website_url: editing.official_website_url ?? "",
                  source_url: editing.source_url ?? "",
                  last_verified_at: editing.last_verified_at ?? "",
                  is_active: editing.is_active ?? true,
                  traveller_tags: editing.traveller_tags ?? [],
                  image_alt: editing.image_alt ?? "",
                  image_source: editing.image_source ?? "",
                  image_license_status: (editing.image_license_status as "licensed" | "booking_partner_api" | "hotel_permission" | "own_photo" | "stock_area_fallback" | "unknown") ?? "unknown",
                  image_verified_at: editing.image_verified_at ?? "",
                  image_needs_review: editing.image_needs_review ?? true,
                }
              : { ...emptyHotel(area, category, hotels.length) }
          }
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={(v) => saveMutation.mutate(v)}
          saving={saveMutation.isPending}
        />
      )}
    </main>
  );
};

export default Admin;
