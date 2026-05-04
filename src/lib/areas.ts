// Single source of truth for areas/destinations.
// Adding a new area later (e.g. Larnaca) only requires editing this file
// AND adding the value to the `hotel_area` enum in the database.
import type { AreaKey, HotelCategory } from "@/data/hotels";

export type AreaMeta = {
  key: AreaKey;
  slug: AreaKey; // currently identical to key
  name: string; // English / display name
  swedishName: string; // for SEO copy
};

export const AREA_LIST: AreaMeta[] = [
  { key: "ayia-napa", slug: "ayia-napa", name: "Ayia Napa", swedishName: "Ayia Napa" },
  { key: "limassol", slug: "limassol", name: "Limassol", swedishName: "Limassol" },
  { key: "paphos", slug: "paphos", name: "Paphos", swedishName: "Paphos" },
];

export const AREA_KEYS: AreaKey[] = AREA_LIST.map((a) => a.key);

export const isAreaKey = (v: string | undefined): v is AreaKey =>
  !!v && AREA_KEYS.includes(v as AreaKey);

export const getArea = (slug: string | undefined): AreaMeta | undefined =>
  AREA_LIST.find((a) => a.slug === slug);

export const CATEGORIES: HotelCategory[] = ["luxury", "family", "budget"];

export const isCategory = (v: string | undefined): v is HotelCategory =>
  !!v && (CATEGORIES as string[]).includes(v);

// Swedish translation of categories used in URLs/copy.
export const CATEGORY_SV: Record<HotelCategory, string> = {
  luxury: "Lyx",
  family: "Familj",
  budget: "Budget",
};
