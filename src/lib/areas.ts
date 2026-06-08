// Single source of truth for areas/destinations.
import type { AreaKey, HotelCategory } from "@/data/hotels";
import ayiaNapaImg from "@/assets/ayia-napa.jpg";
import paphosImg from "@/assets/paphos.jpg";
import limassolImg from "@/assets/limassol.jpg";

export type AreaMeta = {
  key: AreaKey;
  slug: AreaKey;
  name: string;
  swedishName: string; // retained for backward compatibility (now also English)
  description: string;
  image: string;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
};

export const AREA_LIST: AreaMeta[] = [
  {
    key: "ayia-napa",
    slug: "ayia-napa",
    name: "Ayia Napa",
    swedishName: "Ayia Napa",
    description: "Beaches, energy and hotels near Nissi Beach.",
    image: ayiaNapaImg,
    sortOrder: 1,
    seoTitle: "Hotels in Ayia Napa, Cyprus — Handpicked Stays",
    seoDescription:
      "Find hotels in Ayia Napa for luxury, family and budget travel. A curated guide to hotels near the beaches, Nissi Beach and the best areas of town.",
  },
  {
    key: "paphos",
    slug: "paphos",
    name: "Paphos",
    swedishName: "Paphos",
    description: "Romantic, calmer and close to culture.",
    image: paphosImg,
    sortOrder: 2,
    seoTitle: "Hotels in Paphos, Cyprus — Luxury, Family and Budget",
    seoDescription:
      "Find the right hotel in Paphos with our curated guide. Compare hotels for couples, families and a calmer holiday near the sea, harbour and sights.",
  },
  {
    key: "limassol",
    slug: "limassol",
    name: "Limassol",
    swedishName: "Limassol",
    description: "City, beach, marina and a more upscale feel.",
    image: limassolImg,
    sortOrder: 3,
    seoTitle: "Hotels in Limassol, Cyprus — Luxury, Beach and City",
    seoDescription:
      "Compare hotels in Limassol for luxury, family and budget. A curated guide to city hotels, beachfront stays and hotels near the marina.",
  },
];

export const AREA_KEYS: AreaKey[] = AREA_LIST.map((a) => a.key);

export const isAreaKey = (v: string | undefined): v is AreaKey =>
  !!v && AREA_KEYS.includes(v as AreaKey);

export const getArea = (slug: string | undefined): AreaMeta | undefined =>
  AREA_LIST.find((a) => a.slug === slug);

export const CATEGORIES: HotelCategory[] = ["luxury", "family", "budget"];

export const isCategory = (v: string | undefined): v is HotelCategory =>
  !!v && (CATEGORIES as string[]).includes(v);

// English label of categories used in URLs/copy.
export const CATEGORY_SV: Record<HotelCategory, string> = {
  luxury: "Luxury",
  family: "Family",
  budget: "Budget",
};
