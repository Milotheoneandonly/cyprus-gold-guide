import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";

// 🔑 Replace YOUR_AFFILIATE_ID below with your real Booking.com affiliate ID (aid).
export const BOOKING_AFFILIATE_ID = "YOUR_AFFILIATE_ID";

const booking = (slug: string) =>
  `https://www.booking.com/hotel/cy/${slug}.en.html?aid=${BOOKING_AFFILIATE_ID}`;

export type Hotel = {
  name: string;
  description: string;
  tag: string;
  image: string;
  bookingUrl: string;
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
          name: "Nissi Beach Resort",
          description: "A 5-star beachfront sanctuary on Nissi Beach with infinity pools and refined Mediterranean dining.",
          tag: "Best Luxury",
          image: img(0),
          bookingUrl: booking("nissi-beach"),
        },
      },
      {
        label: "Best Budget",
        hotel: {
          name: "Napa Mermaid Hotel & Suites",
          description: "Stylish and affordable, walking distance to the harbour and the iconic blue lagoon beaches.",
          tag: "Best Budget",
          image: img(4),
          bookingUrl: booking("napa-mermaid"),
        },
      },
      {
        label: "Best for Couples",
        hotel: {
          name: "Cavo Maris Beach Hotel",
          description: "Quiet adults-friendly suites with private terraces and uninterrupted sea views — ideal for honeymoons.",
          tag: "Best for Couples",
          image: img(2),
          bookingUrl: booking("cavo-maris-beach"),
        },
      },
      {
        label: "Best for Families",
        hotel: {
          name: "Asterias Beach Hotel",
          description: "Modern all-inclusive resort steps from the sand. Excellent breakfast and a calm pool deck loved by Nordic guests.",
          tag: "Best for Families",
          image: img(1),
          bookingUrl: booking("asterias-beach"),
        },
      },
      {
        label: "Best Views",
        hotel: {
          name: "Grecian Park Hotel",
          description: "Perched on a cliff between Ayia Napa and Cape Greco — dramatic sea views and quiet luxury.",
          tag: "Best Views",
          image: img(3),
          bookingUrl: booking("grecian-park"),
        },
      },
    ],
    hotels: [
      { name: "Atlantica Aeneas Resort", description: "Spacious rooms next to the famous Nissi Beach. Great for longer stays with multiple pools and spa.", tag: "Best Location", image: img(3), bookingUrl: booking("atlantica-aeneas") },
      { name: "Adams Beach Hotel", description: "Refined beachfront escape with a wellness-first approach. Ideal for guests who value calm over crowds.", tag: "Best Spa", image: img(2), bookingUrl: booking("adams-beach") },
      { name: "Nelia Beach Hotel", description: "Laid-back classic right on the promenade. Honest value and a friendly Scandinavian-friendly team.", tag: "Best Value", image: img(4), bookingUrl: booking("nelia-beach") },
      { name: "The Dome Beach Hotel", description: "An institution in Ayia Napa with direct beach access and easy walks to nightlife and restaurants.", tag: "Best Location", image: img(1), bookingUrl: booking("the-dome-beach") },
      { name: "Olympic Lagoon Resort Ayia Napa", description: "All-inclusive lagoon-style resort with multiple restaurants — a guest favourite for families and couples.", tag: "All-Inclusive", image: img(0), bookingUrl: booking("olympic-lagoon-ayia-napa") },
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
          description: "An iconic 5-star landmark with floor-to-ceiling sea views, signature dining and an exquisite spa.",
          tag: "Best Luxury",
          image: img(3),
          bookingUrl: booking("amara-limassol"),
        },
      },
      {
        label: "Best Budget",
        hotel: {
          name: "Harmony Bay Hotel",
          description: "A smart, well-located stay with seafront access and great value year-round.",
          tag: "Best Budget",
          image: img(4),
          bookingUrl: booking("harmony-bay"),
        },
      },
      {
        label: "Best for Couples",
        hotel: {
          name: "Parklane, a Luxury Collection Resort & Spa",
          description: "Lush gardens, an adults-only pool and one of the largest spas in Europe — pure relaxation.",
          tag: "Best for Couples",
          image: img(0),
          bookingUrl: booking("parklane-limassol"),
        },
      },
      {
        label: "Iconic Luxury",
        hotel: {
          name: "Four Seasons Limassol",
          description: "Timeless elegance on a private beach. Refined service and Mediterranean fine dining.",
          tag: "Iconic Luxury",
          image: img(2),
          bookingUrl: booking("four-seasons-limassol"),
        },
      },
      {
        label: "Best for Families",
        hotel: {
          name: "Mediterranean Beach Hotel",
          description: "Family-run and family-loved. Beachfront pools and easy access to the old town.",
          tag: "Best for Families",
          image: img(1),
          bookingUrl: booking("mediterranean-beach"),
        },
      },
    ],
    hotels: [
      { name: "Londa Beach Boutique Hotel", description: "Adults-only design hotel with a curated, intimate atmosphere right on the seafront.", tag: "Boutique", image: img(0), bookingUrl: booking("londa-beach") },
      { name: "Atlantica Mare Village", description: "All-inclusive done with style — perfect for stress-free Nordic getaways.", tag: "All-Inclusive", image: img(3), bookingUrl: booking("atlantica-mare-village") },
      { name: "Ajax Hotel", description: "Smart 4-star within reach of the marina. Honest value and warm hospitality.", tag: "Best Value", image: img(4), bookingUrl: booking("ajax-limassol") },
      { name: "St Raphael Resort", description: "Beachfront classic with its own marina and lush grounds — a longstanding Limassol favourite.", tag: "Best Location", image: img(2), bookingUrl: booking("st-raphael") },
      { name: "Radisson Blu Hotel Limassol", description: "Modern rooftop pool and contemporary rooms a short walk from the seafront promenade.", tag: "Modern", image: img(1), bookingUrl: booking("radisson-blu-limassol") },
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
          tag: "Best Luxury",
          image: img(0),
          bookingUrl: booking("annabelle"),
        },
      },
      {
        label: "Best Budget",
        hotel: {
          name: "Aliathon Aegean Resort",
          description: "Excellent value all-inclusive with multiple restaurants and a gentle, family-friendly vibe.",
          tag: "Best Budget",
          image: img(4),
          bookingUrl: booking("aliathon-aegean"),
        },
      },
      {
        label: "Best for Couples",
        hotel: {
          name: "Almyra Hotel",
          description: "Adults-friendly suites with private rooftops and sea views — quietly romantic and design-led.",
          tag: "Best for Couples",
          image: img(2),
          bookingUrl: booking("almyra"),
        },
      },
      {
        label: "Heritage Luxury",
        hotel: {
          name: "Elysium Hotel",
          description: "Byzantine-inspired luxury beside the Tombs of the Kings. Refined and calm.",
          tag: "Heritage Luxury",
          image: img(1),
          bookingUrl: booking("elysium"),
        },
      },
      {
        label: "Best All-Inclusive",
        hotel: {
          name: "Olympic Lagoon Resort Paphos",
          description: "Lagoon-style pools and excellent all-inclusive dining. A guest favourite.",
          tag: "All-Inclusive",
          image: img(3),
          bookingUrl: booking("olympic-lagoon-paphos"),
        },
      },
    ],
    hotels: [
      { name: "Constantinou Bros Asimina Suites", description: "Adults-only beachfront suites with award-winning service.", tag: "Best for Couples", image: img(2), bookingUrl: booking("asimina-suites") },
      { name: "Athena Beach Hotel", description: "Classic seafront 4-star with great pools and easy access to Coral Bay.", tag: "Best Location", image: img(0), bookingUrl: booking("athena-beach") },
      { name: "Capital Coast Resort & Spa", description: "Comfortable family resort with strong value and a calm beachfront.", tag: "Best for Families", image: img(4), bookingUrl: booking("capital-coast") },
      { name: "Coral Beach Hotel & Resort", description: "Sprawling beachfront resort on its own private bay — great for longer family stays.", tag: "Beachfront", image: img(1), bookingUrl: booking("coral-beach-paphos") },
      { name: "Amphora Hotel & Suites", description: "Friendly mid-range hotel close to the harbour with a rooftop pool and sea views.", tag: "Best Value", image: img(3), bookingUrl: booking("amphora-paphos") },
    ],
  },
};

export const areaList = Object.values(areas);
