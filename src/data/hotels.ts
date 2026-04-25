import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";

// 🔑 Replace YOUR_AFFILIATE_ID below with your real Booking.com affiliate ID (aid).
export const BOOKING_AFFILIATE_ID = "YOUR_AFFILIATE_ID";

const booking = (slug: string) =>
  `https://www.booking.com/hotel/cy/${slug}.en.html?aid=${BOOKING_AFFILIATE_ID}`;

export type HotelCategory = "luxury" | "family" | "budget";

export type Hotel = {
  name: string;
  description: string;
  tag: string;
  image: string;
  bookingUrl: string;
  // New simplified fields
  bestFor?: string;
  location?: string;
  note?: string;
  category?: HotelCategory;
  highlight?: string; // e.g. "Best choice", "Best value"
};

export type AreaKey = "ayia-napa" | "limassol" | "paphos";

export type AreaData = {
  slug: AreaKey;
  name: string;
  tagline: string;
  intro: string;
  bestFor: string;
  image: string;
  // Quick picks shown at top of area page
  quickPicks: {
    overall: Hotel;
    family: Hotel;
    budget: Hotel;
  };
  // Hotels grouped by category (max 5 each)
  categories: {
    luxury: Hotel[];
    family: Hotel[];
    budget: Hotel[];
  };
};

const baseImages = [hotel1, hotel2, hotel3, hotel4, hotel5];
const img = (i: number) => baseImages[i % baseImages.length];

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
      overall: {
        name: "Nissi Beach Resort",
        description: "5-star beachfront classic on the famous Nissi Beach.",
        tag: "Best Overall",
        image: img(0),
        bookingUrl: booking("nissi-beach"),
        bestFor: "A reliable, all-around stay",
        location: "Right on Nissi Beach",
        note: "A bit expensive, but very reliable.",
      },
      family: {
        name: "Asterias Beach Hotel",
        description: "All-inclusive resort steps from the sand. Calm pool deck.",
        tag: "Best for Families",
        image: img(1),
        bookingUrl: booking("asterias-beach"),
        bestFor: "Families with kids",
        location: "Beachfront, quiet end of town",
        note: "Easy choice if you travel with kids.",
      },
      budget: {
        name: "Napa Mermaid Hotel & Suites",
        description: "Stylish and affordable, walking distance to the harbour.",
        tag: "Best Budget",
        image: img(4),
        bookingUrl: booking("napa-mermaid"),
        bestFor: "Saving money without losing comfort",
        location: "Near the harbour",
        note: "Great value for the location.",
      },
    },
    categories: {
      luxury: [
        {
          name: "Nissi Beach Resort",
          description: "Iconic 5-star on the most famous beach in Cyprus.",
          tag: "Luxury",
          image: img(0),
          bookingUrl: booking("nissi-beach"),
          bestFor: "Premium beachfront stay",
          location: "Nissi Beach",
          note: "A bit expensive, but very reliable.",
          category: "luxury",
          highlight: "Best choice",
        },
        {
          name: "Grecian Park Hotel",
          description: "Cliffside views between Ayia Napa and Cape Greco.",
          tag: "Luxury",
          image: img(3),
          bookingUrl: booking("grecian-park"),
          bestFor: "Quiet luxury and sea views",
          location: "Cape Greco side",
          note: "Stunning views. Calm and refined.",
          category: "luxury",
        },
        {
          name: "Adams Beach Hotel",
          description: "Refined beachfront escape with a wellness focus.",
          tag: "Luxury",
          image: img(2),
          bookingUrl: booking("adams-beach"),
          bestFor: "Couples who want a calm spa stay",
          location: "Nissi Beach area",
          note: "Great spa. Quiet atmosphere.",
          category: "luxury",
        },
        {
          name: "Cavo Maris Beach Hotel",
          description: "Suites with private terraces and uninterrupted sea views.",
          tag: "Luxury",
          image: img(2),
          bookingUrl: booking("cavo-maris-beach"),
          bestFor: "Romantic getaways",
          location: "Protaras side",
          note: "Quiet, adults-friendly atmosphere.",
          category: "luxury",
        },
      ],
      family: [
        {
          name: "Olympic Lagoon Resort Ayia Napa",
          description: "All-inclusive lagoon-style resort with multiple restaurants.",
          tag: "Family",
          image: img(0),
          bookingUrl: booking("olympic-lagoon-ayia-napa"),
          bestFor: "Families who want everything in one place",
          location: "Quiet end of Ayia Napa",
          note: "Easy all-inclusive. Kids love the pools.",
          category: "family",
          highlight: "Best choice",
        },
        {
          name: "Asterias Beach Hotel",
          description: "All-inclusive steps from the sand. Calm pool deck.",
          tag: "Family",
          image: img(1),
          bookingUrl: booking("asterias-beach"),
          bestFor: "Stress-free family weeks",
          location: "Beachfront",
          note: "Reliable and clean. Good breakfast.",
          category: "family",
        },
        {
          name: "Atlantica Aeneas Resort",
          description: "Spacious rooms next to Nissi Beach. Multiple pools.",
          tag: "Family",
          image: img(3),
          bookingUrl: booking("atlantica-aeneas"),
          bestFor: "Longer family stays",
          location: "Nissi Beach area",
          note: "Lots of space. Great for kids.",
          category: "family",
        },
        {
          name: "The Dome Beach Hotel",
          description: "Direct beach access. Easy walks to restaurants.",
          tag: "Family",
          image: img(1),
          bookingUrl: booking("the-dome-beach"),
          bestFor: "Families who want to walk everywhere",
          location: "Central Ayia Napa",
          note: "Classic, safe and well-located.",
          category: "family",
        },
      ],
      budget: [
        {
          name: "Napa Mermaid Hotel & Suites",
          description: "Stylish and affordable. Close to harbour and beaches.",
          tag: "Budget",
          image: img(4),
          bookingUrl: booking("napa-mermaid"),
          bestFor: "Smart savings near the action",
          location: "Near the harbour",
          note: "Great value. Looks more expensive than it is.",
          category: "budget",
          highlight: "Best value",
        },
        {
          name: "Nelia Beach Hotel",
          description: "Laid-back classic right on the promenade.",
          tag: "Budget",
          image: img(4),
          bookingUrl: booking("nelia-beach"),
          bestFor: "Honest value by the sea",
          location: "Promenade",
          note: "Simple, friendly, well-priced.",
          category: "budget",
        },
        {
          name: "Anesis Hotel",
          description: "Comfortable mid-range hotel in the heart of town.",
          tag: "Budget",
          image: img(2),
          bookingUrl: booking("anesis-ayia-napa"),
          bestFor: "Short stays in the centre",
          location: "Town centre",
          note: "Good for first-time visitors.",
          category: "budget",
        },
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
      overall: {
        name: "Amara Hotel Limassol",
        description: "Iconic 5-star with sea views, fine dining and a great spa.",
        tag: "Best Overall",
        image: img(3),
        bookingUrl: booking("amara-limassol"),
        bestFor: "A polished, modern stay",
        location: "Limassol seafront",
        note: "Premium, but worth it.",
      },
      family: {
        name: "Mediterranean Beach Hotel",
        description: "Family-run and family-loved. Beachfront pools.",
        tag: "Best for Families",
        image: img(1),
        bookingUrl: booking("mediterranean-beach"),
        bestFor: "Families who want city + beach",
        location: "Beachfront, near old town",
        note: "Friendly staff. Easy with kids.",
      },
      budget: {
        name: "Harmony Bay Hotel",
        description: "Smart, well-located stay with seafront access.",
        tag: "Best Budget",
        image: img(4),
        bookingUrl: booking("harmony-bay"),
        bestFor: "Affordable seafront stay",
        location: "East Limassol",
        note: "Great value year-round.",
      },
    },
    categories: {
      luxury: [
        {
          name: "Four Seasons Limassol",
          description: "Timeless elegance on a private beach.",
          tag: "Luxury",
          image: img(2),
          bookingUrl: booking("four-seasons-limassol"),
          bestFor: "True top-tier luxury",
          location: "Private beach, east Limassol",
          note: "The gold standard in Limassol.",
          category: "luxury",
          highlight: "Best choice",
        },
        {
          name: "Amara Hotel Limassol",
          description: "Floor-to-ceiling sea views and signature dining.",
          tag: "Luxury",
          image: img(3),
          bookingUrl: booking("amara-limassol"),
          bestFor: "Modern luxury with great food",
          location: "Limassol seafront",
          note: "Excellent breakfast and spa.",
          category: "luxury",
        },
        {
          name: "Parklane, a Luxury Collection Resort & Spa",
          description: "Lush gardens, adults-only pool, huge spa.",
          tag: "Luxury",
          image: img(0),
          bookingUrl: booking("parklane-limassol"),
          bestFor: "Couples who want full relaxation",
          location: "Eastern beach area",
          note: "One of the largest spas in Europe.",
          category: "luxury",
        },
        {
          name: "Londa Beach Boutique Hotel",
          description: "Adults-only design hotel right on the seafront.",
          tag: "Luxury",
          image: img(0),
          bookingUrl: booking("londa-beach"),
          bestFor: "Quiet, intimate stays",
          location: "Seafront",
          note: "Small and stylish. Adults only.",
          category: "luxury",
        },
      ],
      family: [
        {
          name: "St Raphael Resort",
          description: "Beachfront classic with its own marina and lush grounds.",
          tag: "Family",
          image: img(2),
          bookingUrl: booking("st-raphael"),
          bestFor: "Active families",
          location: "Own marina, east Limassol",
          note: "Lots to do without leaving the resort.",
          category: "family",
          highlight: "Best choice",
        },
        {
          name: "Mediterranean Beach Hotel",
          description: "Family-run beachfront hotel near the old town.",
          tag: "Family",
          image: img(1),
          bookingUrl: booking("mediterranean-beach"),
          bestFor: "Families who want to explore the city",
          location: "Beachfront",
          note: "Warm, personal service.",
          category: "family",
        },
        {
          name: "Atlantica Mare Village",
          description: "All-inclusive done with style.",
          tag: "Family",
          image: img(3),
          bookingUrl: booking("atlantica-mare-village"),
          bestFor: "Stress-free Nordic getaways",
          location: "Pyrgos area",
          note: "Calm and well-organized.",
          category: "family",
        },
      ],
      budget: [
        {
          name: "Harmony Bay Hotel",
          description: "Smart, well-located stay with seafront access.",
          tag: "Budget",
          image: img(4),
          bookingUrl: booking("harmony-bay"),
          bestFor: "Affordable seafront",
          location: "East Limassol",
          note: "Best value in this part of town.",
          category: "budget",
          highlight: "Best value",
        },
        {
          name: "Ajax Hotel",
          description: "Smart 4-star within reach of the marina.",
          tag: "Budget",
          image: img(4),
          bookingUrl: booking("ajax-limassol"),
          bestFor: "City stays on a budget",
          location: "Near the marina",
          note: "Honest value and friendly staff.",
          category: "budget",
        },
        {
          name: "Radisson Blu Hotel Limassol",
          description: "Modern rooftop pool and contemporary rooms.",
          tag: "Budget",
          image: img(1),
          bookingUrl: booking("radisson-blu-limassol"),
          bestFor: "Reliable mid-range",
          location: "Short walk from seafront",
          note: "Predictable and clean.",
          category: "budget",
        },
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
      overall: {
        name: "Annabelle Hotel",
        description: "Heritage 5-star on Paphos harbour with lagoon pools.",
        tag: "Best Overall",
        image: img(0),
        bookingUrl: booking("annabelle"),
        bestFor: "A calm, premium stay",
        location: "Paphos harbour",
        note: "A bit expensive, but very reliable.",
      },
      family: {
        name: "Capital Coast Resort & Spa",
        description: "Comfortable family resort with strong value.",
        tag: "Best for Families",
        image: img(4),
        bookingUrl: booking("capital-coast"),
        bestFor: "Families on a relaxed trip",
        location: "Quiet beachfront",
        note: "Easy and well-priced for families.",
      },
      budget: {
        name: "Aliathon Aegean Resort",
        description: "All-inclusive with multiple restaurants.",
        tag: "Best Budget",
        image: img(4),
        bookingUrl: booking("aliathon-aegean"),
        bestFor: "Best value all-inclusive",
        location: "Universal area",
        note: "Lots of food choice for the price.",
      },
    },
    categories: {
      luxury: [
        {
          name: "Annabelle Hotel",
          description: "Tropical gardens, lagoon pools and impeccable service.",
          tag: "Luxury",
          image: img(0),
          bookingUrl: booking("annabelle"),
          bestFor: "Calm, romantic luxury",
          location: "Paphos harbour",
          note: "A favourite for honeymoons.",
          category: "luxury",
          highlight: "Best choice",
        },
        {
          name: "Almyra Hotel",
          description: "Adults-friendly suites with private rooftops.",
          tag: "Luxury",
          image: img(2),
          bookingUrl: booking("almyra"),
          bestFor: "Design-led couples stays",
          location: "Paphos harbour",
          note: "Quietly romantic. Beautiful rooms.",
          category: "luxury",
        },
        {
          name: "Elysium Hotel",
          description: "Byzantine-inspired luxury beside the Tombs of the Kings.",
          tag: "Luxury",
          image: img(1),
          bookingUrl: booking("elysium"),
          bestFor: "Heritage atmosphere",
          location: "Tombs of the Kings",
          note: "Refined and very quiet.",
          category: "luxury",
        },
        {
          name: "Constantinou Bros Asimina Suites",
          description: "Adults-only beachfront suites with award-winning service.",
          tag: "Luxury",
          image: img(2),
          bookingUrl: booking("asimina-suites"),
          bestFor: "Adults-only seclusion",
          location: "Paphos beachfront",
          note: "Polished service. Adults only.",
          category: "luxury",
        },
      ],
      family: [
        {
          name: "Olympic Lagoon Resort Paphos",
          description: "Lagoon-style pools and excellent all-inclusive dining.",
          tag: "Family",
          image: img(3),
          bookingUrl: booking("olympic-lagoon-paphos"),
          bestFor: "All-inclusive family weeks",
          location: "Universal area",
          note: "Kids love the pools. Easy for parents.",
          category: "family",
          highlight: "Best choice",
        },
        {
          name: "Capital Coast Resort & Spa",
          description: "Comfortable family resort with strong value.",
          tag: "Family",
          image: img(4),
          bookingUrl: booking("capital-coast"),
          bestFor: "Relaxed family stays",
          location: "Quiet beachfront",
          note: "Calm and well-priced.",
          category: "family",
        },
        {
          name: "Coral Beach Hotel & Resort",
          description: "Sprawling beachfront resort on its own private bay.",
          tag: "Family",
          image: img(1),
          bookingUrl: booking("coral-beach-paphos"),
          bestFor: "Longer family stays",
          location: "Coral Bay",
          note: "Lots of space and a private beach.",
          category: "family",
        },
        {
          name: "Athena Beach Hotel",
          description: "Classic seafront 4-star with great pools.",
          tag: "Family",
          image: img(0),
          bookingUrl: booking("athena-beach"),
          bestFor: "Easy access to Coral Bay",
          location: "Paphos seafront",
          note: "Reliable and family-friendly.",
          category: "family",
        },
      ],
      budget: [
        {
          name: "Aliathon Aegean Resort",
          description: "Excellent value all-inclusive with multiple restaurants.",
          tag: "Budget",
          image: img(4),
          bookingUrl: booking("aliathon-aegean"),
          bestFor: "Best all-inclusive value",
          location: "Universal area",
          note: "Hard to beat for the price.",
          category: "budget",
          highlight: "Best value",
        },
        {
          name: "Amphora Hotel & Suites",
          description: "Friendly mid-range hotel close to the harbour.",
          tag: "Budget",
          image: img(3),
          bookingUrl: booking("amphora-paphos"),
          bestFor: "Affordable harbour stays",
          location: "Near the harbour",
          note: "Rooftop pool with sea views.",
          category: "budget",
        },
        {
          name: "Avlida Hotel",
          description: "Simple and well-priced 4-star near the centre.",
          tag: "Budget",
          image: img(2),
          bookingUrl: booking("avlida"),
          bestFor: "Short, affordable trips",
          location: "Tombs of the Kings Avenue",
          note: "Clean, simple, good location.",
          category: "budget",
        },
      ],
    },
  },
};

export const areaList = Object.values(areas);
