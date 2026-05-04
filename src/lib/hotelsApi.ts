import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Hotel, AreaKey, HotelCategory } from "@/data/hotels";
import { resolveHotelImage } from "./hotelImages";
import { slugify } from "./slugify";

export type HotelRow = {
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
};

export type HotelWithMeta = Hotel & {
  id: string;
  slug: string;
  area: AreaKey;
  seoTitle?: string;
  seoDescription?: string;
};

export function rowToHotel(r: HotelRow): HotelWithMeta {
  return {
    id: r.id,
    name: r.name,
    description: r.description,
    tag: r.tag,
    image: resolveHotelImage(r.image_url),
    bookingUrl: r.booking_url,
    bestFor: r.best_for ?? undefined,
    location: r.location ?? undefined,
    note: r.note ?? undefined,
    category: r.category,
    stars: r.stars ?? undefined,
    highlight: r.highlight ?? undefined,
    area: r.area,
    slug: r.hotel_slug || slugify(r.name),
    seoTitle: r.seo_title ?? undefined,
    seoDescription: r.seo_description ?? undefined,
  };
}

export async function fetchHotels(area: AreaKey, category: HotelCategory) {
  const { data, error } = await (supabase as any)
    .from("hotels")
    .select("*")
    .eq("area", area)
    .eq("category", category)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as HotelRow[]).map(rowToHotel);
}

export function useHotels(area: AreaKey | undefined, category: HotelCategory | undefined) {
  return useQuery({
    queryKey: ["hotels", area, category],
    queryFn: () => fetchHotels(area!, category!),
    enabled: !!area && !!category,
    staleTime: 60_000,
  });
}

export async function fetchHotelBySlug(area: AreaKey, slug: string) {
  const { data, error } = await (supabase as any)
    .from("hotels")
    .select("*")
    .eq("area", area)
    .eq("hotel_slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToHotel(data as HotelRow) : null;
}

export function useHotelBySlug(area: AreaKey | undefined, slug: string | undefined) {
  return useQuery({
    queryKey: ["hotel", area, slug],
    queryFn: () => fetchHotelBySlug(area!, slug!),
    enabled: !!area && !!slug,
    staleTime: 60_000,
  });
}

export async function fetchAllHotels() {
  const { data, error } = await (supabase as any)
    .from("hotels")
    .select("*")
    .order("area")
    .order("category")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data as HotelRow[]).map(rowToHotel);
}
