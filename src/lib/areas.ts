// Single source of truth for areas/destinations.
// Adding a new area requires:
//   1. Adding the value to the `hotel_area` enum in the database
//   2. Adding an entry here
import type { AreaKey, HotelCategory } from "@/data/hotels";
import ayiaNapaImg from "@/assets/ayia-napa.jpg";
import paphosImg from "@/assets/paphos.jpg";
import limassolImg from "@/assets/limassol.jpg";
import protarasImg from "@/assets/protaras.jpg";
import larnacaImg from "@/assets/larnaca.jpg";
import coralBayImg from "@/assets/coral-bay.jpg";
import polisLatchiImg from "@/assets/polis-latchi.jpg";

export type AreaMeta = {
  key: AreaKey;
  slug: AreaKey; // same as key — used in URLs
  name: string; // display name (English)
  swedishName: string; // display name in Swedish copy
  description: string; // short Swedish description for cards
  image: string;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
};

// Order chosen for the homepage rendering order.
export const AREA_LIST: AreaMeta[] = [
  {
    key: "ayia-napa",
    slug: "ayia-napa",
    name: "Ayia Napa",
    swedishName: "Ayia Napa",
    description: "Stränder, energi och hotell nära Nissi Beach.",
    image: ayiaNapaImg,
    sortOrder: 1,
    seoTitle: "Hotell i Ayia Napa på Cypern – handplockade val",
    seoDescription:
      "Hitta hotell i Ayia Napa för lyx, familj och budget. En svensk guide till hotell nära stränder, Nissi Beach och stadens bästa områden.",
  },
  {
    key: "protaras",
    slug: "protaras",
    name: "Protaras",
    swedishName: "Protaras",
    description: "Familjevänligt, klart vatten och Fig Tree Bay.",
    image: protarasImg,
    sortOrder: 2,
    seoTitle: "Hotell i Protaras på Cypern – bästa valen för svenskar",
    seoDescription:
      "Jämför handplockade hotell i Protaras för familjer, par och strandsemester nära Fig Tree Bay och östra Cyperns bästa bad.",
  },
  {
    key: "paphos",
    slug: "paphos",
    name: "Paphos",
    swedishName: "Paphos",
    description: "Romantiskt, lugnare och nära kultur.",
    image: paphosImg,
    sortOrder: 3,
    seoTitle: "Hotell i Paphos på Cypern – lyx, familj och budget",
    seoDescription:
      "Hitta rätt hotell i Paphos med svensk guide. Jämför hotell för par, familjer och lugnare semester nära hav, hamn och sevärdheter.",
  },
  {
    key: "larnaca",
    slug: "larnaca",
    name: "Larnaca",
    swedishName: "Larnaca",
    description: "Smidigt, strandnära och nära flygplatsen.",
    image: larnacaImg,
    sortOrder: 4,
    seoTitle: "Hotell i Larnaca på Cypern – bästa hotellen nära strand och stad",
    seoDescription:
      "Hitta hotell i Larnaca nära Finikoudes, stranden och flygplatsen. Svensk guide till hotell för familj, budget och bekväm semester.",
  },
  {
    key: "limassol",
    slug: "limassol",
    name: "Limassol",
    swedishName: "Limassol",
    description: "Stad, strand, marina och mer exklusiv känsla.",
    image: limassolImg,
    sortOrder: 5,
    seoTitle: "Hotell i Limassol på Cypern – lyx, strand och city",
    seoDescription:
      "Jämför hotell i Limassol för lyx, familj och budget. Svensk guide till stadshotell, strandhotell och hotell nära marinan.",
  },
  {
    key: "coral-bay",
    slug: "coral-bay",
    name: "Coral Bay",
    swedishName: "Coral Bay",
    description: "Strandfokus nära Paphos, bra för familjer.",
    image: coralBayImg,
    sortOrder: 6,
    seoTitle: "Hotell i Coral Bay på Cypern – bästa strandhotellen",
    seoDescription:
      "Hitta hotell i Coral Bay nära stranden och Paphos. Svensk guide till familjevänliga hotell, lugn semester och bra strandläge.",
  },
  {
    key: "polis-latchi",
    slug: "polis-latchi",
    name: "Polis & Latchi",
    swedishName: "Polis & Latchi",
    description: "Lugnare, naturnära och mindre turistigt.",
    image: polisLatchiImg,
    sortOrder: 7,
    seoTitle: "Hotell i Polis och Latchi på Cypern – lugna hotell nära natur",
    seoDescription:
      "Jämför hotell i Polis och Latchi för lugnare semester, natur, bad och närhet till Akamas. Svensk guide till handplockade hotell.",
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

// Swedish translation of categories used in URLs/copy.
export const CATEGORY_SV: Record<HotelCategory, string> = {
  luxury: "Lyx",
  family: "Familj",
  budget: "Budget",
};
