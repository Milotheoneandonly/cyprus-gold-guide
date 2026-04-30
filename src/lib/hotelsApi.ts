import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Hotel, AreaKey, HotelCategory } from "@/data/hotels";
import { resolveHotelImage } from "./hotelImages";

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
};

export function rowToHotel(r: HotelRow): Hotel & { id: string } {
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
  };
}

export async function fetchHotels(area: AreaKey, category: HotelCategory) {
  const { data, error } = await supabase
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

export async function fetchAllHotels() {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .order("area")
    .order("category")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as HotelRow[];
}
