import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";

export type Hotel = {
  name: string;
  description: string;
  tag: string;
  image: string;
};

export type AreaKey = "ayia-napa" | "limassol" | "paphos";

export type AreaData = {
  slug: AreaKey;
  name: string;
  tagline: string;
  intro: string;
  bestFor: string;
  image: string;
  topPicks: { label: string; hotel: Hotel }[];
  hotels: Hotel[];
};

const baseImages = [hotel1, hotel2, hotel3, hotel4, hotel5];
const img = (i: number) => baseImages[i % baseImages.length];

export const areas: Record<AreaKey, AreaData> = {
  "ayia-napa": {
    slug: "ayia-napa",
    name: "Ayia Napa",
    tagline: "Beach, energy & golden sands",
    intro:
      "Famed for its turquoise waters and lively atmosphere, Ayia Napa is the perfect choice for travelers who want vibrant nightlife paired with some of the Mediterranean's most beautiful beaches.",
    bestFor: "Party, beach lovers and younger travelers.",
    image: new URL("../assets/ayia-napa.jpg", import.meta.url).href,
    topPicks: [
      {
        label: "Best Overall",
        hotel: {
          name: "Nissi Bay Grand Resort",
          description: "A 5-star beachfront sanctuary on Nissi Beach with infinity pools and refined Mediterranean dining.",
          tag: "Best Overall",
          image: img(0),
        },
      },
      {
        label: "Best Budget",
        hotel: {
          name: "Napa Mermaid Boutique",
          description: "Stylish and affordable, walking distance to the harbour and the iconic blue lagoon beaches.",
          tag: "Best Value",
          image: img(4),
        },
      },
      {
        label: "Best for Couples",
        hotel: {
          name: "Cavo Maris Romance Suites",
          description: "Quiet adults-only suites with private terraces and uninterrupted sea views — ideal for honeymoons.",
          tag: "Best for Couples",
          image: img(2),
        },
      },
    ],
    hotels: [
      { name: "Asterias Beach Hotel", description: "Modern all-inclusive resort steps from the sand. Excellent breakfast and a calm pool deck loved by Nordic guests.", tag: "Best for Families", image: img(1) },
      { name: "Atlantica Aeneas Resort", description: "Spacious rooms next to the famous Nissi Beach. Great for longer stays with multiple pools and spa.", tag: "Best Location", image: img(3) },
      { name: "Grecian Park Hotel", description: "Perched on a cliff between Ayia Napa and Cape Greco — dramatic sea views and quiet luxury.", tag: "Best Views", image: img(0) },
      { name: "Adams Beach Hotel", description: "Refined beachfront escape with a wellness-first approach. Ideal for guests who value calm over crowds.", tag: "Best Spa", image: img(2) },
      { name: "Nelia Beach Hotel", description: "Laid-back classic right on the promenade. Honest value and a friendly Scandinavian-friendly team.", tag: "Best Value", image: img(4) },
      { name: "The Dome Beach Hotel", description: "An institution in Ayia Napa with direct beach access and easy walks to nightlife and restaurants.", tag: "Best Location", image: img(1) },
    ],
  },
  limassol: {
    slug: "limassol",
    name: "Limassol",
    tagline: "Modern, stylish, refined",
    intro:
      "Cyprus' most cosmopolitan city. Sleek marinas, design hotels and award-winning dining make Limassol the go-to choice for travelers who want a polished, urban coastal stay.",
    bestFor: "Modern, stylish and relaxed luxury seekers.",
    image: new URL("../assets/limassol.jpg", import.meta.url).href,
    topPicks: [
      {
        label: "Best Overall",
        hotel: {
          name: "Amara Hotel Limassol",
          description: "An iconic 5-star landmark with floor-to-ceiling sea views, Nobu-style dining and an exquisite spa.",
          tag: "Best Overall",
          image: img(3),
        },
      },
      {
        label: "Best Budget",
        hotel: {
          name: "Harmony Bay Hotel",
          description: "A smart, well-located stay with seafront access and great value year-round.",
          tag: "Best Value",
          image: img(4),
        },
      },
      {
        label: "Best for Couples",
        hotel: {
          name: "Parklane Resort & Spa",
          description: "Lush gardens, an adults-only pool and one of the largest spas in Europe — pure relaxation.",
          tag: "Best for Couples",
          image: img(0),
        },
      },
    ],
    hotels: [
      { name: "Four Seasons Limassol", description: "Timeless elegance on a private beach. Refined service and Mediterranean fine dining.", tag: "Iconic Luxury", image: img(2) },
      { name: "Mediterranean Beach Hotel", description: "Family-run and family-loved. Beachfront pools and easy access to old town.", tag: "Best for Families", image: img(1) },
      { name: "Londa Beach Boutique", description: "Adults-only design hotel with a curated, intimate atmosphere.", tag: "Boutique", image: img(0) },
      { name: "Atlantica Mare Village", description: "All-inclusive done with style — perfect for stress-free Nordic getaways.", tag: "All-Inclusive", image: img(3) },
      { name: "Ajax Hotel", description: "Smart 4-star within reach of the marina. Honest value and warm hospitality.", tag: "Best Value", image: img(4) },
    ],
  },
  paphos: {
    slug: "paphos",
    name: "Paphos",
    tagline: "Calm, cultural, timeless",
    intro:
      "A UNESCO-listed city of mosaics, harbours and quiet golden coves. Paphos is the most relaxed corner of Cyprus — perfect for slow mornings, sunset walks and cultured days.",
    bestFor: "Calm, family-friendly and cultural travelers.",
    image: new URL("../assets/paphos.jpg", import.meta.url).href,
    topPicks: [
      {
        label: "Best Overall",
        hotel: {
          name: "Annabelle Hotel",
          description: "A heritage 5-star on Paphos harbour. Tropical gardens, lagoon pools and impeccable service.",
          tag: "Best Overall",
          image: img(0),
        },
      },
      {
        label: "Best Budget",
        hotel: {
          name: "Aliathon Aegean Resort",
          description: "Excellent value all-inclusive with multiple restaurants and a gentle, family-friendly vibe.",
          tag: "Best Value",
          image: img(4),
        },
      },
      {
        label: "Best for Couples",
        hotel: {
          name: "Almyra Adults Wing",
          description: "Adults-only suites with private rooftops and sea views — quietly romantic and design-led.",
          tag: "Best for Couples",
          image: img(2),
        },
      },
    ],
    hotels: [
      { name: "Elysium Hotel", description: "Byzantine-inspired luxury beside the Tombs of the Kings. Refined and calm.", tag: "Heritage Luxury", image: img(1) },
      { name: "Olympic Lagoon Resort", description: "Lagoon-style pools and excellent all-inclusive dining. A guest favourite.", tag: "All-Inclusive", image: img(3) },
      { name: "Constantinou Bros Asimina Suites", description: "Adults-only beachfront suites with award-winning service.", tag: "Best for Couples", image: img(2) },
      { name: "Athena Beach Hotel", description: "Classic seafront 4-star with great pools and easy access to Coral Bay.", tag: "Best Location", image: img(0) },
      { name: "Capital Coast Resort & Spa", description: "Comfortable family resort with strong value and a calm beachfront.", tag: "Best for Families", image: img(4) },
    ],
  },
};

export const areaList = Object.values(areas);
