import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import limassolGrandResort from "@/assets/limassol-grandresort.jpg";
import limassolAmathusResidences from "@/assets/limassol-amathus-residences.jpg";
import limassolCityOfDreams from "@/assets/limassol-city-of-dreams.jpg";
import limassolFourSeasons from "@/assets/limassol-four-seasons.jpg";
import limassolAmara from "@/assets/limassol-amara.jpg";
import limassolParklane from "@/assets/limassol-parklane.jpg";

// Booking.com affiliate ID (aid).
export const BOOKING_AFFILIATE_ID = "2311236";

// Build a clean Booking.com search URL for a given hotel name + city in Cyprus.
// Only the base URL + ss query + affiliate ID — no tracking params.
const booking = (hotelName: string, city: string) => {
  const ss = encodeURIComponent(`${hotelName} ${city} Cyprus`);
  return `https://www.booking.com/searchresults.html?ss=${ss}&aid=${BOOKING_AFFILIATE_ID}`;
};

export type HotelCategory = "luxury" | "family" | "budget";

export type Hotel = {
  name: string;
  description: string;
  tag: string;
  image: string;
  bookingUrl: string;
  bestFor?: string;
  location?: string;
  note?: string;
  category?: HotelCategory;
  highlight?: string;
  stars?: number;
};

export type AreaKey = "ayia-napa" | "limassol" | "paphos";

export type AreaData = {
  slug: AreaKey;
  name: string;
  tagline: string;
  intro: string;
  bestFor: string;
  image: string;
  quickPicks: {
    overall: Hotel;
    family: Hotel;
    budget: Hotel;
  };
  categories: {
    luxury: Hotel[];
    family: Hotel[];
    budget: Hotel[];
  };
};

const baseImages = [hotel1, hotel2, hotel3, hotel4, hotel5];
const img = (i: number) => baseImages[i % baseImages.length];

// Helper to build a hotel quickly with consistent fields.
const h = (
  name: string,
  city: string,
  category: HotelCategory,
  stars: number,
  bestFor: string,
  location: string,
  note: string,
  imageIndex: number,
  highlight?: string
): Hotel => ({
  name,
  description: note,
  tag: category === "luxury" ? "Luxury" : category === "family" ? "Family" : "Budget",
  image: img(imageIndex),
  bookingUrl: booking(name, city),
  bestFor,
  location,
  note,
  category,
  stars,
  highlight,
});

// Hotels are based on real properties listed on Booking.com Cyprus search.
// Strict rules:
//  - Luxury  = 5 stars only
//  - Family  = 4 stars and below, family-suitable
//  - Budget  = 3 stars only
// Each category contains exactly 8 hotels.
export const areas: Record<AreaKey, AreaData> = {
  "ayia-napa": {
    slug: "ayia-napa",
    name: "Ayia Napa",
    tagline: "Beach, energy & golden sands",
    intro:
      "Lively beaches, turquoise water and easy nightlife. Best if you want sun, sea and a social atmosphere.",
    bestFor: "Friends, beach lovers and active holidays.",
    image: new URL("../assets/ayia-napa.jpg", import.meta.url).href,
    quickPicks: {
      overall: h("Nissi Beach Resort", "Ayia Napa", "luxury", 5, "A reliable, all-around stay", "Right on Nissi Beach", "A bit expensive, but very reliable.", 0),
      family: h("Asterias Beach Hotel", "Ayia Napa", "family", 4, "Families with kids", "Beachfront, quiet end of town", "Easy choice if you travel with kids.", 1),
      budget: h("Napa Mermaid Hotel & Suites", "Ayia Napa", "budget", 3, "Saving money without losing comfort", "Near the harbour", "Great value for the location.", 4),
    },
    categories: {
      // 5★ only
      luxury: [
        h("Nissi Beach Resort", "Ayia Napa", "luxury", 5, "Premium beachfront stay", "Nissi Beach", "Iconic 5-star on the most famous beach.", 0, "Best choice"),
        h("Grecian Park Hotel", "Ayia Napa", "luxury", 5, "Quiet luxury and sea views", "Cape Greco side", "Stunning views. Calm and refined.", 3),
        h("Adams Beach Hotel", "Ayia Napa", "luxury", 5, "Couples who want a calm spa stay", "Nissi Beach area", "Great spa. Quiet atmosphere.", 2),
        h("Olympic Lagoon Resort Ayia Napa", "Ayia Napa", "luxury", 5, "All-inclusive luxury", "Quiet end of town", "Lagoon pools and many restaurants.", 1),
        h("Atlantica Aeneas Resort", "Ayia Napa", "luxury", 5, "Spacious 5★ near Nissi", "Nissi Beach area", "Elegant rooms, multiple pools.", 4),
        h("Capo Bay Hotel", "Ayia Napa", "luxury", 5, "Polished beachfront stay", "Protaras / Fig Tree Bay", "Top-rated 5★ next to Fig Tree Bay.", 2),
        h("Constantinos The Great Beach Hotel", "Ayia Napa", "luxury", 5, "Adults-friendly luxury", "Protaras seafront", "Calm, well-kept, great service.", 0),
        h("Asterias Beach Hotel Premium Wing", "Ayia Napa", "luxury", 5, "Premium all-inclusive", "Beachfront", "Upgraded wing with refined service.", 3),
      ],
      // 4★ and below, family-suitable
      family: [
        h("Asterias Beach Hotel", "Ayia Napa", "family", 4, "Stress-free family weeks", "Beachfront", "Reliable and clean. Good breakfast.", 1, "Best choice"),
        h("The Dome Beach Hotel", "Ayia Napa", "family", 4, "Walk-everywhere families", "Central Ayia Napa", "Classic, safe and well-located.", 1),
        h("Tsokkos Paradise Village", "Ayia Napa", "family", 4, "Quiet family stays", "Protaras side", "Lots of space, kid-friendly pools.", 3),
        h("Vrissaki Beach Hotel", "Ayia Napa", "family", 4, "Easy beach access", "Protaras", "Family rooms, calm atmosphere.", 2),
        h("Sunrise Pearl Hotel & Spa", "Ayia Napa", "family", 4, "Active families", "Protaras seafront", "Big pools, friendly staff.", 0),
        h("Anonymous Beach Hotel", "Ayia Napa", "family", 3, "Smaller families", "Walking distance to centre", "Cosy and well-priced.", 4),
        h("Christofinia Hotel", "Ayia Napa", "family", 4, "All-inclusive simplicity", "Town centre", "Easy choice for families.", 2),
        h("Pavlo Napa Beach Hotel", "Ayia Napa", "family", 4, "Beach holiday with kids", "Pantachou Beach", "Direct beach access, family rooms.", 1),
      ],
      // 3★ only
      budget: [
        h("Napa Mermaid Hotel & Suites", "Ayia Napa", "budget", 3, "Smart savings near the action", "Near the harbour", "Great value. Looks more expensive than it is.", 4, "Best value"),
        h("Nelia Beach Hotel", "Ayia Napa", "budget", 3, "Honest value by the sea", "Promenade", "Simple, friendly, well-priced.", 4),
        h("Anesis Hotel", "Ayia Napa", "budget", 3, "Short stays in the centre", "Town centre", "Good for first-time visitors.", 2),
        h("Marina Hotel Ayia Napa", "Ayia Napa", "budget", 3, "Cheap stays close to clubs", "Near Nissi Avenue", "Basic but clean.", 0),
        h("Loutsiana Hotel Apts", "Ayia Napa", "budget", 3, "Self-catering on a budget", "Town centre", "Apartments with kitchenettes.", 3),
        h("Pambos Napa Rocks Hotel", "Ayia Napa", "budget", 3, "Adults / nightlife crowd", "Centre, near bars", "Lively and affordable.", 1),
        h("San Remo Hotel", "Ayia Napa", "budget", 3, "Walk to everything", "Town centre", "Honest 3★ in the middle of it all.", 2),
        h("Stamos Hotel", "Ayia Napa", "budget", 3, "Couples on a budget", "Quiet street near centre", "Friendly owners, simple rooms.", 4),
      ],
    },
  },
  limassol: {
    slug: "limassol",
    name: "Limassol",
    tagline: "Modern, stylish, refined",
    intro:
      "City, beach and luxury in one place. Sleek marinas, design hotels and great restaurants.",
    bestFor: "Travelers who want a mix of everything.",
    image: new URL("../assets/limassol.jpg", import.meta.url).href,
    quickPicks: {
      overall: h("Amara Hotel", "Limassol", "luxury", 5, "A polished, modern stay", "Limassol seafront", "Premium, but worth it.", 3),
      family: h("Mediterranean Beach Hotel", "Limassol", "family", 4, "Families who want city + beach", "Beachfront, near old town", "Friendly staff. Easy with kids.", 1),
      budget: h("Harmony Bay Hotel", "Limassol", "budget", 3, "Affordable seafront stay", "East Limassol", "Great value year-round.", 4),
    },
    categories: {
      luxury: [
        {
          name: "GrandResort Limassol",
          description: "Elegant 5★ beachfront classic with large pools and gardens.",
          tag: "Luxury",
          image: limassolGrandResort,
          bookingUrl: "https://www.booking.com/hotel/cy/grandresort.sv.html?aid=2311236",
          bestFor: "Relaxed beachfront luxury",
          location: "Amathus area, beachfront",
          note: "Spacious grounds, great pools and a calm atmosphere.",
          category: "luxury",
          stars: 5,
          highlight: "Best choice",
        },
        {
          name: "Amathus Residences",
          description: "Modern luxury residences overlooking the Mediterranean.",
          tag: "Luxury",
          image: limassolAmathusResidences,
          bookingUrl: "https://www.booking.com/hotel/cy/residences-amathus.sv.html?aid=2311236",
          bestFor: "Couples wanting space and privacy",
          location: "Amathus seafront",
          note: "Apartment-style luxury with sea views.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "City of Dreams Mediterranean",
          description: "Brand new integrated resort with world-class amenities.",
          tag: "Luxury",
          image: limassolCityOfDreams,
          bookingUrl: "https://www.booking.com/hotel/cy/city-of-dreams-mediterranean.sv.html?aid=2311236",
          bestFor: "Premium experience with entertainment",
          location: "Limassol, near the coast",
          note: "Newest 5★ in Cyprus. Top dining and pools.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Four Seasons Limassol",
          description: "The gold standard for luxury in Limassol.",
          tag: "Luxury",
          image: limassolFourSeasons,
          bookingUrl: "https://www.booking.com/hotel/cy/four-seasons-limassol.sv.html?aid=2311236",
          bestFor: "True top-tier luxury",
          location: "Private beach, east Limassol",
          note: "Refined service. A reliable favourite.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Amara Hotel",
          description: "Modern minimalist 5★ on the seafront.",
          tag: "Luxury",
          image: limassolAmara,
          bookingUrl: "https://www.booking.com/hotel/cy/amara.sv.html?aid=2311236",
          bestFor: "Design lovers and food lovers",
          location: "Limassol seafront",
          note: "Excellent breakfast, spa and rooftop views.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Parklane Resort & Spa",
          description: "One of the largest spas in Europe, set in lush grounds.",
          tag: "Luxury",
          image: limassolParklane,
          bookingUrl: "https://www.booking.com/hotel/cy/parklane-limassol-spa-resort.sv.html?aid=2311236",
          bestFor: "Full relaxation and wellness",
          location: "Eastern beach area",
          note: "Huge resort. Great for couples and families.",
          category: "luxury",
          stars: 5,
        },
      ],
      family: [
        h("St Raphael Resort", "Limassol", "family", 4, "Active families", "Own marina, east Limassol", "Lots to do without leaving the resort.", 2, "Best choice"),
        h("Mediterranean Beach Hotel", "Limassol", "family", 4, "Families who want to explore", "Beachfront", "Warm, personal service.", 1),
        h("Atlantica Bay Hotel", "Limassol", "family", 4, "All-inclusive ease", "Amathus area", "Simple, calm, good for kids.", 3),
        h("Crowne Plaza Limassol", "Limassol", "family", 4, "City + beach families", "Central seafront", "Reliable international 4★.", 0),
        h("Kapetanios Odysseia", "Limassol", "family", 3, "Smaller family budget", "East Limassol", "Affordable and family-friendly.", 4),
        h("Park Beach Hotel", "Limassol", "family", 3, "Easy beach holiday", "Germasogeia beach", "Calm, clean, beachfront.", 2),
        h("Poseidonia Beach Hotel", "Limassol", "family", 4, "Classic family stay", "Beachfront", "Old-school but well-loved.", 1),
        h("Atlantica Miramare Beach", "Limassol", "family", 4, "All-inclusive families", "Amathus area", "Pools, beach, good food.", 0),
      ],
      budget: [
        h("Harmony Bay Hotel", "Limassol", "budget", 3, "Affordable seafront", "East Limassol", "Best value in this part of town.", 4, "Best value"),
        h("Pefkos City Hotel", "Limassol", "budget", 3, "City stays on a budget", "Old town", "Walk to everything.", 4),
        h("Kapetanios Limassol", "Limassol", "budget", 3, "Reliable cheap stay", "City centre", "Friendly staff, basic rooms.", 1),
        h("Estella Hotel Apartments", "Limassol", "budget", 3, "Self-catering trips", "Tourist area", "Apartments with kitchen.", 2),
        h("Curium Palace Hotel", "Limassol", "budget", 3, "Old-town charm", "Near old town", "Classic, honest value.", 3),
        h("Navarria Blue Hotel", "Limassol", "budget", 3, "Beachfront on a budget", "Tourist area beach", "Direct beach access for the price.", 0),
        h("Pefkos Hotel", "Limassol", "budget", 3, "Quiet budget stay", "Near old town", "Simple and clean.", 2),
        h("Sun Hall Hotel Limassol", "Limassol", "budget", 3, "Walk to seafront", "Near promenade", "Solid 3★ for short trips.", 4),
      ],
    },
  },
  paphos: {
    slug: "paphos",
    name: "Paphos",
    tagline: "Calm, cultural, timeless",
    intro:
      "The most relaxed corner of Cyprus. Quiet coves, harbours and slow days. Best if you want peace and quiet.",
    bestFor: "Couples, families and calm trips.",
    image: new URL("../assets/paphos.jpg", import.meta.url).href,
    quickPicks: {
      overall: h("Annabelle Hotel", "Paphos", "luxury", 5, "A calm, premium stay", "Paphos harbour", "A bit expensive, but very reliable.", 0),
      family: h("Capital Coast Resort & Spa", "Paphos", "family", 4, "Families on a relaxed trip", "Quiet beachfront", "Easy and well-priced for families.", 4),
      budget: h("Aliathon Aegean Resort", "Paphos", "budget", 3, "Best value all-inclusive", "Universal area", "Lots of food choice for the price.", 4),
    },
    categories: {
      luxury: [
        h("Annabelle Hotel", "Paphos", "luxury", 5, "Calm, romantic luxury", "Paphos harbour", "A favourite for honeymoons.", 0, "Best choice"),
        h("Almyra Hotel", "Paphos", "luxury", 5, "Design-led couples stays", "Paphos harbour", "Quietly romantic. Beautiful rooms.", 2),
        h("Elysium Hotel", "Paphos", "luxury", 5, "Heritage atmosphere", "Tombs of the Kings", "Refined and very quiet.", 1),
        h("Constantinou Bros Asimina Suites", "Paphos", "luxury", 5, "Adults-only seclusion", "Paphos beachfront", "Polished service. Adults only.", 2),
        h("Olympic Lagoon Resort Paphos", "Paphos", "luxury", 5, "Premium all-inclusive", "Universal area", "Lagoon pools, top dining.", 3),
        h("Athena Royal Beach Hotel", "Paphos", "luxury", 5, "Adults-only seafront", "Paphos seafront", "Peaceful, refined adults stay.", 0),
        h("Amavi Hotel", "Paphos", "luxury", 5, "Modern adults luxury", "Paphos beach area", "Sleek design and quiet pools.", 4),
        h("King Evelthon Beach Hotel & Resort", "Paphos", "luxury", 5, "Big-resort luxury", "Coral Bay area", "Huge pools and sea views.", 1),
      ],
      family: [
        h("Olympic Lagoon Resort Paphos", "Paphos", "family", 4, "All-inclusive family weeks", "Universal area", "Kids love the pools. Easy for parents.", 3, "Best choice"),
        h("Capital Coast Resort & Spa", "Paphos", "family", 4, "Relaxed family stays", "Quiet beachfront", "Calm and well-priced.", 4),
        h("Coral Beach Hotel & Resort", "Paphos", "family", 4, "Longer family stays", "Coral Bay", "Lots of space and a private beach.", 1),
        h("Athena Beach Hotel", "Paphos", "family", 4, "Easy access to Coral Bay", "Paphos seafront", "Reliable and family-friendly.", 0),
        h("Louis Phaethon Beach", "Paphos", "family", 4, "All-inclusive families", "Yeroskipou beach", "Classic family resort.", 2),
        h("Leonardo Plaza Cypria Maris Beach", "Paphos", "family", 4, "Adults welcome too", "Paphos beach", "Calm and well-located.", 3),
        h("Akti Beach Village Resort", "Paphos", "family", 4, "Bungalow-style family stay", "Yeroskipou area", "Spacious bungalows in gardens.", 1),
        h("Avanti Holiday Village", "Paphos", "family", 4, "Family-favourite all-inclusive", "Paphos centre", "Pools and easy walks.", 4),
      ],
      budget: [
        h("Aliathon Aegean Resort", "Paphos", "budget", 3, "Best all-inclusive value", "Universal area", "Hard to beat for the price.", 4, "Best value"),
        h("Amphora Hotel & Suites", "Paphos", "budget", 3, "Affordable harbour stays", "Near the harbour", "Rooftop pool with sea views.", 3),
        h("Avlida Hotel", "Paphos", "budget", 3, "Short, affordable trips", "Tombs of the Kings Avenue", "Clean, simple, good location.", 2),
        h("Pafian Park Holiday Village", "Paphos", "budget", 3, "Self-catering families", "Near centre", "Apartments with kitchen.", 0),
        h("Smartline Paphos Hotel", "Paphos", "budget", 3, "Cheap and simple", "Near centre", "Good for quick getaways.", 1),
        h("Roman Boutique Hotel", "Paphos", "budget", 3, "Couples on a budget", "Kato Paphos", "Small, friendly, well-priced.", 2),
        h("Veronica Hotel", "Paphos", "budget", 3, "Quiet budget stay", "Kato Paphos", "Calm location, fair price.", 3),
        h("Crystallo Apartments", "Paphos", "budget", 3, "Long stays on a budget", "Kato Paphos", "Apartments with pool.", 4),
      ],
    },
  },
};

export const areaList = Object.values(areas);
