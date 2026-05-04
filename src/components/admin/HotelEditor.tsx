import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import GoldButton from "@/components/GoldButton";
import { resolveHotelImage } from "@/lib/hotelImages";
import { toast } from "@/hooks/use-toast";
import { slugify } from "@/lib/slugify";
import type { AreaKey, HotelCategory } from "@/data/hotels";
import { AREA_KEYS, CATEGORIES } from "@/lib/areas";

export type HotelFormValues = {
  id?: string;
  area: AreaKey;
  category: HotelCategory;
  name: string;
  description: string;
  tag: string;
  image_url: string;
  booking_url: string;
  best_for: string;
  location: string;
  note: string;
  stars: number | null;
  highlight: string;
  sort_order: number;
  hotel_slug: string;
  seo_title: string;
  seo_description: string;
  sub_area: string;
  official_website_url: string;
  source_url: string;
  last_verified_at: string;
  is_active: boolean;
  traveller_tags: string[];
};

export const emptyHotel = (area: AreaKey, category: HotelCategory, sort_order: number): HotelFormValues => ({
  area,
  category,
  name: "",
  description: "",
  tag: category === "luxury" ? "Luxury" : category === "family" ? "Family" : "Budget",
  image_url: "",
  booking_url: "",
  best_for: "",
  location: "",
  note: "",
  stars: category === "luxury" ? 5 : category === "family" ? 4 : 3,
  highlight: "",
  sort_order,
  hotel_slug: "",
  seo_title: "",
  seo_description: "",
  sub_area: "",
  official_website_url: "",
  source_url: "",
  last_verified_at: "",
  is_active: true,
  traveller_tags: [],
});

interface Props {
  initial: HotelFormValues;
  onClose: () => void;
  onSave: (values: HotelFormValues) => void;
  saving: boolean;
}

const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</span>
    {children}
    {hint && <span className="block text-[10px] text-muted-foreground/70 mt-1">{hint}</span>}
  </label>
);

const inputCls = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground";

const HotelEditor = ({ initial, onClose, onSave, saving }: Props) => {
  const [v, setV] = useState<HotelFormValues>(initial);
  const [uploading, setUploading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!initial.hotel_slug);

  useEffect(() => {
    setV(initial);
    setSlugTouched(!!initial.hotel_slug);
  }, [initial]);

  const update = <K extends keyof HotelFormValues>(k: K, val: HotelFormValues[K]) =>
    setV((s) => ({ ...s, [k]: val }));

  // Auto-fill slug from name when user hasn't manually edited it
  useEffect(() => {
    if (!slugTouched && v.name) {
      setV((s) => ({ ...s, hotel_slug: slugify(s.name) }));
    }
  }, [v.name, slugTouched]);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("hotel-images").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("hotel-images").getPublicUrl(path);
      update("image_url", data.publicUrl);
      toast({ title: "Image uploaded" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({ title: "Upload failed", description: msg, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!v.name) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    const finalSlug = v.hotel_slug?.trim() || slugify(v.name);
    if (!finalSlug) {
      toast({ title: "Slug is required", variant: "destructive" });
      return;
    }
    onSave({ ...v, hotel_slug: finalSlug });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <form
        onSubmit={submit}
        className="bg-card border border-border rounded-lg w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-serif text-xl text-gradient-gold italic">{v.id ? "Edit hotel" : "New hotel"}</h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl">
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Image */}
          <Field label="Image">
            <div className="flex gap-4 items-start">
              {v.image_url && (
                <img
                  src={resolveHotelImage(v.image_url)}
                  alt=""
                  className="h-24 w-32 object-cover rounded border border-border"
                />
              )}
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="text-xs"
                />
                {uploading && <p className="text-xs text-muted-foreground">Uploading…</p>}
                <input
                  type="text"
                  placeholder="Or paste image URL"
                  value={v.image_url}
                  onChange={(e) => update("image_url", e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Area">
              <select
                value={v.area}
                onChange={(e) => update("area", e.target.value as AreaKey)}
                className={inputCls}
              >
                {AREA_KEYS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Category">
              <select
                value={v.category}
                onChange={(e) => update("category", e.target.value as HotelCategory)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Name *">
            <input required value={v.name} onChange={(e) => update("name", e.target.value)} className={inputCls} />
          </Field>

          <Field
            label="URL slug *"
            hint="Used in /hotell/area/category/SLUG. Auto-generated from name; edit to override."
          >
            <input
              required
              value={v.hotel_slug}
              onChange={(e) => {
                setSlugTouched(true);
                update("hotel_slug", slugify(e.target.value));
              }}
              className={inputCls}
              placeholder="four-seasons-limassol"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={v.description}
              onChange={(e) => update("description", e.target.value)}
              className={inputCls}
              rows={2}
            />
          </Field>

          <Field label="Booking.com URL">
            <input
              value={v.booking_url}
              onChange={(e) => update("booking_url", e.target.value)}
              className={inputCls}
              placeholder="https://www.booking.com/..."
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tag">
              <input value={v.tag} onChange={(e) => update("tag", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Stars">
              <input
                type="number"
                min={1}
                max={5}
                value={v.stars ?? ""}
                onChange={(e) => update("stars", e.target.value ? Number(e.target.value) : null)}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Best for">
              <input
                value={v.best_for}
                onChange={(e) => update("best_for", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Location">
              <input
                value={v.location}
                onChange={(e) => update("location", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Note">
            <input value={v.note} onChange={(e) => update("note", e.target.value)} className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label='Highlight badge (e.g. "Best choice")'>
              <input
                value={v.highlight}
                onChange={(e) => update("highlight", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Sort order (lower = higher on page)">
              <input
                type="number"
                value={v.sort_order}
                onChange={(e) => update("sort_order", Number(e.target.value))}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="border-t border-border/40 pt-4 space-y-4">
            <h3 className="text-[10px] uppercase tracking-wider text-gold">SEO (optional)</h3>
            <Field label="SEO title" hint="Falls back to hotel name + destination if empty.">
              <input
                value={v.seo_title}
                onChange={(e) => update("seo_title", e.target.value)}
                className={inputCls}
                maxLength={70}
              />
            </Field>
            <Field label="SEO meta description" hint="Aim for ~150 characters.">
              <textarea
                value={v.seo_description}
                onChange={(e) => update("seo_description", e.target.value)}
                className={inputCls}
                rows={2}
                maxLength={170}
              />
            </Field>
          </div>

          <div className="border-t border-border/40 pt-4 space-y-4">
            <h3 className="text-[10px] uppercase tracking-wider text-gold">Advanced (optional)</h3>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Sub-area / neighborhood">
                <input
                  value={v.sub_area}
                  onChange={(e) => update("sub_area", e.target.value)}
                  className={inputCls}
                  placeholder="Fig Tree Bay"
                />
              </Field>
              <Field label="Active (visible to public)">
                <select
                  value={v.is_active ? "true" : "false"}
                  onChange={(e) => update("is_active", e.target.value === "true")}
                  className={inputCls}
                >
                  <option value="true">Active</option>
                  <option value="false">Hidden</option>
                </select>
              </Field>
            </div>

            <Field label="Official website URL">
              <input
                value={v.official_website_url}
                onChange={(e) => update("official_website_url", e.target.value)}
                className={inputCls}
                placeholder="https://..."
              />
            </Field>

            <Field label="Source URL (where data was verified)">
              <input
                value={v.source_url}
                onChange={(e) => update("source_url", e.target.value)}
                className={inputCls}
                placeholder="https://..."
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Last verified at" hint="ISO date or leave blank">
                <input
                  type="date"
                  value={v.last_verified_at ? v.last_verified_at.slice(0, 10) : ""}
                  onChange={(e) => update("last_verified_at", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Traveller tags (comma-separated)">
                <input
                  value={(v.traveller_tags || []).join(", ")}
                  onChange={(e) =>
                    update(
                      "traveller_tags",
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                  className={inputCls}
                  placeholder="couples, spa, beachfront"
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted-foreground px-4 py-2 hover:text-foreground"
          >
            Cancel
          </button>
          <GoldButton type="submit" disabled={saving || uploading} className="!px-5 !py-2 !text-[11px]">
            {saving ? "Saving…" : "Save"}
          </GoldButton>
        </div>
      </form>
    </div>
  );
};

export default HotelEditor;
