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
import limassolMediterraneanBeach from "@/assets/limassol-mediterranean-beach.jpg";
import limassolCrownePlaza from "@/assets/limassol-crowne-plaza.jpg";
import limassolAtlanticaMiramare from "@/assets/limassol-atlantica-miramare.jpg";
import limassolPoseidonia from "@/assets/limassol-poseidonia.jpg";
import limassolAlasia from "@/assets/limassol-alasia.jpg";
import limassolAtlanticaOasis from "@/assets/limassol-atlantica-oasis.jpg";
import tsanotelImg from "@/assets/tsanotel.png";
import harmonyBayImg from "@/assets/harmony-bay.png";
import pefkosImg from "@/assets/pefkos.png";
import chrielkaImg from "@/assets/chrielka.png";
import yamasImg from "@/assets/yamas.png";
import mariannaImg from "@/assets/marianna.png";
import jediImg from "@/assets/jedi.png";
import olympiaImg from "@/assets/olympia.png";
import nissibluImg from "@/assets/nissiblu-beach-resort.png";
import alionBeachImg from "@/assets/alion-beach-hotel.png";
import atlanticaAeneasImg from "@/assets/atlantica-aeneas-resort.png";
import grecianBayImg from "@/assets/grecian-bay-hotel.png";
import amarandeImg from "@/assets/amarande-hotel.png";
import capoBayImg from "@/assets/capo-bay-hotel.png";
import vassosNissiImg from "@/assets/vassos-nissi-plage.png";
import okeanosBeachImg from "@/assets/okeanos-beach.png";
import nissiBeachResortImg from "@/assets/nissi-beach-resort.png";
import asteriasBeachImg from "@/assets/asterias-beach-hotel.png";
import neliaBeachImg from "@/assets/nelia-beach-hotel.png";
import margadinaImg from "@/assets/margadina-hotel.png";
import christofiniaImg from "@/assets/christofinia-hotel.png";
import pavloNapaImg from "@/assets/pavlo-napa-beach.png";
import tofinisImg from "@/assets/tofinis-hotel.png";
import nissiParkImg from "@/assets/nissi-park-hotel.png";
import antheaImg from "@/assets/anthea-hotel.png";
import corfuImg from "@/assets/corfu-hotel.png";
import euronapaImg from "@/assets/euronapa-hotel.png";
import christabelleImg from "@/assets/christabelle-hotel.png";
import cosmeleniaImg from "@/assets/cosmelenia-hotel.png";
import piereAnneImg from "@/assets/piere-anne-beach-hotel.png";
import loutsianaImg from "@/assets/loutsiana-hotel.png";
import elysiumImg from "@/assets/elysium-hotel.png";
import amaviImg from "@/assets/amavi-hotel.png";
import annabelleImg from "@/assets/annabelle-hotel.png";
import almyraImg from "@/assets/almyra-hotel.png";
import asiminaSuitesImg from "@/assets/asimina-suites-hotel.png";
import louisIviMareImg from "@/assets/louis-ivi-mare-hotel.png";
import olympicLagoonPaphosImg from "@/assets/olympic-lagoon-paphos-hotel.png";
import aziaResortImg from "@/assets/azia-resort-hotel.png";
import alexanderGreatImg from "@/assets/alexander-the-great-hotel.png";
import leonardoLauraImg from "@/assets/leonardo-laura-hotel.png";
import louisPhaethonImg from "@/assets/louis-phaethon-hotel.png";
import athenaBeachImg from "@/assets/athena-beach-hotel.png";
import avantiPaphosImg from "@/assets/avanti-hotel.png";
import mayfairPaphosImg from "@/assets/mayfair-hotel.png";
import kefalosBeachImg from "@/assets/kefalos-beach-hotel.png";

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
      // 5★ only — curated luxury list
      luxury: [
        {
          name: "NissiBlu Beach Resort",
          description: "Modern beachfront 5★ on iconic Nissi Beach.",
          tag: "Luxury",
          image: nissibluImg,
          bookingUrl: "https://www.booking.com/hotel/cy/nissiblu-beach-resort.en-gb.html?aid=2311236",
          bestFor: "Premium beachfront stays",
          location: "Nissi Beach",
          note: "Sleek design, direct beach access and elegant pools.",
          category: "luxury",
          stars: 5,
          highlight: "Best choice",
        },
        {
          name: "Alion Beach Hotel",
          description: "Refined 5★ with manicured gardens and beachfront calm.",
          tag: "Luxury",
          image: alionBeachImg,
          bookingUrl: "https://www.booking.com/hotel/cy/alion-beach.en-gb.html?aid=2311236",
          bestFor: "Quiet luxury",
          location: "Ayia Napa beachfront",
          note: "Elegant, peaceful and beautifully maintained.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Atlantica Aeneas Resort",
          description: "Elegant 5★ with lush gardens close to Nissi Beach.",
          tag: "Luxury",
          image: atlanticaAeneasImg,
          bookingUrl: "https://www.booking.com/hotel/cy/atlantica-aeneas-resort.en-gb.html?aid=2311236",
          bestFor: "Refined family luxury",
          location: "Nissi Beach area",
          note: "Spacious rooms, multiple pools and polished service.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Grecian Bay Hotel",
          description: "Timeless 5★ beachfront landmark in central Ayia Napa.",
          tag: "Luxury",
          image: grecianBayImg,
          bookingUrl: "https://www.booking.com/hotel/cy/grecian-bay.en-gb.html?aid=2311236",
          bestFor: "Classic beachfront luxury",
          location: "Grecian Bay",
          note: "Premium beachfront classic with attentive service.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Amarande Hotel",
          description: "Adults-only 5★ retreat with a refined Mediterranean feel.",
          tag: "Luxury",
          image: amarandeImg,
          bookingUrl: "https://www.booking.com/hotel/cy/amarande.en-gb.html?aid=2311236",
          bestFor: "Adults-only escapes",
          location: "Ayia Napa",
          note: "Calm, stylish and beautifully designed for couples.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Vassos Nissi Plage Hotel & Spa",
          description: "Refined 5★ beachfront retreat steps from Nissi Beach.",
          tag: "Luxury",
          image: vassosNissiImg,
          bookingUrl: "https://www.booking.com/hotel/cy/vassos-nissi-plage.en-gb.html?aid=2311236",
          bestFor: "Beachfront luxury",
          location: "Nissi Beach, Ayia Napa",
          note: "Elegant rooms, spa and direct beach access.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Capo Bay Hotel",
          description: "Polished beachfront 5★ on Fig Tree Bay, Protaras.",
          tag: "Luxury",
          image: capoBayImg,
          bookingUrl: "https://www.booking.com/hotel/cy/capo-bay.en-gb.html?aid=2311236",
          bestFor: "Beachfront elegance",
          location: "Fig Tree Bay, Protaras",
          note: "Award-winning service and a stunning beach setting.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Okeanos Beach Boutique Hotel",
          description: "Stylish boutique stay with a chic seafront setting.",
          tag: "Luxury",
          image: okeanosBeachImg,
          bookingUrl: "https://www.booking.com/hotel/cy/okeanos-beach.en-gb.html?aid=2311236",
          bestFor: "Boutique seafront escapes",
          location: "Ayia Napa seafront",
          note: "Modern design, intimate vibe and sea views.",
          category: "luxury",
          stars: 5,
        },
      ],
      // 4★ family-suitable — curated list
      family: [
        {
          name: "Nissi Beach Resort",
          description: "Iconic family beachfront resort right on Nissi Beach.",
          tag: "Family",
          image: nissiBeachResortImg,
          bookingUrl: "https://www.booking.com/hotel/cy/nissi-beach-resort.en-gb.html?aid=2311236",
          bestFor: "Families wanting iconic beach",
          location: "Nissi Beach",
          note: "Direct beach access, big pools and family rooms.",
          category: "family",
          stars: 4,
          highlight: "Best choice",
        },
        {
          name: "Vassos Nissi Plage Hotel & Spa",
          description: "Family-friendly beachfront stay near Nissi Beach.",
          tag: "Family",
          image: vassosNissiImg,
          bookingUrl: "https://www.booking.com/hotel/cy/vassos-nissi-plage.en-gb.html?aid=2311236",
          bestFor: "Beach holidays with kids",
          location: "Nissi Beach area",
          note: "Spacious rooms, pools and direct beach access.",
          category: "family",
          stars: 4,
        },
        {
          name: "Asterias Beach Hotel",
          description: "Reliable beachfront 4★ with friendly family service.",
          tag: "Family",
          image: asteriasBeachImg,
          bookingUrl: "https://www.booking.com/hotel/cy/asterias-beach.en-gb.html?aid=2311236",
          bestFor: "Stress-free family weeks",
          location: "Beachfront, quiet end of town",
          note: "Reliable, clean and great breakfast.",
          category: "family",
          stars: 4,
        },
        {
          name: "Pavlo Napa Beach Hotel",
          description: "Modern 4★ steps from Pantachou Beach.",
          tag: "Family",
          image: pavloNapaImg,
          bookingUrl: "https://www.booking.com/hotel/cy/pavlo-napa.en-gb.html?aid=2311236",
          bestFor: "Beach holidays with kids",
          location: "Pantachou Beach",
          note: "Direct beach access and family rooms.",
          category: "family",
          stars: 4,
        },
        {
          name: "Nelia Beach Hotel & Spa",
          description: "Calm seaside 4★ with pools and family-friendly comfort.",
          tag: "Family",
          image: neliaBeachImg,
          bookingUrl: "https://www.booking.com/hotel/cy/nelia-beach.en-gb.html?aid=2311236",
          bestFor: "Relaxed beach families",
          location: "Ayia Napa promenade",
          note: "Friendly, well-priced and close to the sea.",
          category: "family",
          stars: 4,
        },
        {
          name: "Tofinis Hotel",
          description: "Family-friendly 4★ with a great pool in central Ayia Napa.",
          tag: "Family",
          image: tofinisImg,
          bookingUrl: "https://www.booking.com/hotel/cy/tofinis.en-gb.html?aid=2311236",
          bestFor: "Family value stays",
          location: "Ayia Napa, near centre",
          note: "Friendly service, big pool and excellent value.",
          category: "family",
          stars: 4,
        },
        {
          name: "Margadina Hotel",
          description: "Quiet, well-kept 4★ with a relaxed family atmosphere.",
          tag: "Family",
          image: margadinaImg,
          bookingUrl: "https://www.booking.com/hotel/cy/margadina.en-gb.html?aid=2311236",
          bestFor: "Calm family stays",
          location: "Ayia Napa, near centre",
          note: "Friendly service and lovely pool area.",
          category: "family",
          stars: 4,
        },
        {
          name: "Christofinia Hotel",
          description: "Popular all-inclusive 4★ for easy family holidays.",
          tag: "Family",
          image: christofiniaImg,
          bookingUrl: "https://www.booking.com/hotel/cy/christofinia.en-gb.html?aid=2311236",
          bestFor: "All-inclusive simplicity",
          location: "Town centre",
          note: "Easy, safe and family-focused.",
          category: "family",
          stars: 4,
        },
      ],
      // 3★ only
      budget: [
        {
          name: "Nissi Park Hotel",
          description: "Affordable 3★ close to Nissi Beach with great value for money.",
          tag: "Budget",
          image: nissiParkImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Nissi+Park+Hotel+Ayia+Napa",
          bestFor: "Budget beach stays",
          location: "Near Nissi Beach",
          note: "Simple, clean and excellent location.",
          category: "budget",
          stars: 3,
          highlight: "Best value",
        },
        {
          name: "Anthea Hotel Apartments",
          description: "Simple budget apartments close to shops, beach and nightlife.",
          tag: "Budget",
          image: antheaImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Anthea+Hotel+Apartments+Ayia+Napa",
          bestFor: "Central budget stays",
          location: "Town centre",
          note: "Great location for the price.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Corfu Hotel",
          description: "Easy 3★ hotel with pool and friendly service at a low price.",
          tag: "Budget",
          image: corfuImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Corfu+Hotel+Ayia+Napa",
          bestFor: "Simple value stays",
          location: "Ayia Napa centre",
          note: "Reliable budget pick.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Euronapa Hotel Apartments",
          description: "Self-catering apartments offering simple comfort at a low price.",
          tag: "Budget",
          image: euronapaImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Euronapa+Hotel+Apartments+Ayia+Napa",
          bestFor: "Self-catering on a budget",
          location: "Ayia Napa centre",
          note: "Practical apartments with kitchenettes.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Christabelle Hotel Apartments",
          description: "Quiet, friendly 3★ apartments with a pool and good value.",
          tag: "Budget",
          image: christabelleImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Christabelle+Hotel+Apartments+Ayia+Napa",
          bestFor: "Relaxed budget stays",
          location: "Ayia Napa, near centre",
          note: "Calm, clean and well-priced.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Cosmelenia Hotel Apartments",
          description: "Simple 3★ apartments with pool, great value in Ayia Napa.",
          tag: "Budget",
          image: cosmeleniaImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Cosmelenia+Hotel+Apartments+Ayia+Napa",
          bestFor: "Affordable apartment stays",
          location: "Ayia Napa",
          note: "Practical, clean and budget-friendly.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Piere-Anne Beach Hotel",
          description: "Easygoing 3★ near the beach with great value for the location.",
          tag: "Budget",
          image: piereAnneImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Piere-Anne+Beach+Hotel+Ayia+Napa",
          bestFor: "Beach on a budget",
          location: "Near Pantachou Beach",
          note: "Simple seaside stay at a fair price.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Loutsiana Hotel Apartments",
          description: "Self-catering apartments with pool, perfect for budget travellers.",
          tag: "Budget",
          image: loutsianaImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Loutsiana+Hotel+Apartments+Ayia+Napa",
          bestFor: "Longer budget stays",
          location: "Town centre",
          note: "Apartments with kitchenettes.",
          category: "budget",
          stars: 3,
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
        {
          name: "Four Seasons Hotel Limassol",
          description: "Refined 5★ beachfront resort with elegant gardens and family suites.",
          tag: "Family",
          image: limassolFourSeasons,
          bookingUrl: "https://www.booking.com/hotel/cy/four-seasons-limassol.en-gb.html?aid=2311236",
          bestFor: "Families wanting top-tier comfort",
          location: "Private beach, east Limassol",
          note: "Polished service and spacious family rooms.",
          category: "family",
          stars: 5,
          highlight: "Best choice",
        },
        {
          name: "City of Dreams Mediterranean",
          description: "Brand-new integrated resort with pools, dining and family entertainment.",
          tag: "Family",
          image: limassolCityOfDreams,
          bookingUrl: "https://www.booking.com/hotel/cy/city-of-dreams-mediterranean.en-gb.html?aid=2311236",
          bestFor: "Families seeking variety on-site",
          location: "Limassol, near the coast",
          note: "Newest 5★ resort in Cyprus with plenty for kids and adults.",
          category: "family",
          stars: 5,
        },
        {
          name: "Mediterranean Beach Hotel",
          description: "Warm beachfront 4★ with friendly staff and easy access to town.",
          tag: "Family",
          image: limassolMediterraneanBeach,
          bookingUrl: "https://www.booking.com/hotel/cy/mediterranean-beach.en-gb.html?aid=2311236",
          bestFor: "Families who want city + beach",
          location: "Beachfront, near old town",
          note: "Reliable favourite for family stays.",
          category: "family",
          stars: 4,
        },
        {
          name: "Crowne Plaza Limassol",
          description: "Modern central seafront 4★ with pools and family rooms.",
          tag: "Family",
          image: limassolCrownePlaza,
          bookingUrl: "https://www.booking.com/hotel/cy/crowne-plaza-limassol.en-gb.html?aid=2311236",
          bestFor: "City + beach families",
          location: "Central seafront",
          note: "Reliable international 4★ in a great location.",
          category: "family",
          stars: 4,
        },
        {
          name: "Alasia Boutique Hotel",
          description: "Stylish 4★ boutique hotel in central Limassol with a rooftop pool.",
          tag: "Family",
          image: limassolAlasia,
          bookingUrl: "https://www.booking.com/hotel/cy/alasia.en-gb.html?aid=2311236",
          bestFor: "Families who like boutique stays",
          location: "Central Limassol",
          note: "Chic design and walkable to the seafront.",
          category: "family",
          stars: 4,
        },
        {
          name: "Atlantica Oasis Hotel",
          description: "4★ family resort with large pools, gardens and kids' activities.",
          tag: "Family",
          image: limassolAtlanticaOasis,
          bookingUrl: "https://www.booking.com/hotel/cy/atlantica-oasis.en-gb.html?aid=2311236",
          bestFor: "Families wanting a resort feel",
          location: "Tourist area, Limassol",
          note: "Spacious grounds and great for kids.",
          category: "family",
          stars: 4,
        },
        {
          name: "Atlantica Miramare Beach",
          description: "All-inclusive beachfront resort with pools and kids' facilities.",
          tag: "Family",
          image: limassolAtlanticaMiramare,
          bookingUrl: "https://www.booking.com/hotel/cy/atlantica-miramare-beach.en-gb.html?aid=2311236",
          bestFor: "All-inclusive families",
          location: "Amathus area, beachfront",
          note: "Easy all-in-one stay with great food.",
          category: "family",
          stars: 4,
        },
        {
          name: "Poseidonia Beach Hotel",
          description: "Classic beachfront 4★ with gardens and a relaxed atmosphere.",
          tag: "Family",
          image: limassolPoseidonia,
          bookingUrl: "https://www.booking.com/hotel/cy/poseidonia-beach.en-gb.html?aid=2311236",
          bestFor: "Classic family stay",
          location: "Beachfront",
          note: "Old-school charm and well-loved by returning families.",
          category: "family",
          stars: 4,
        },
      ],
      budget: [
        {
          name: "Harmony Bay Hotel",
          description: "Affordable seafront stay on the east side of Limassol.",
          tag: "Budget",
          image: harmonyBayImg,
          bookingUrl: "https://www.booking.com/hotel/cy/harmony-bay.en-gb.html?aid=2311236",
          bestFor: "Affordable seafront stay",
          location: "East Limassol, by the sea",
          note: "Best value in this part of town.",
          category: "budget",
          stars: 3,
          highlight: "Best value",
        },
        {
          name: "Pefkos Hotel",
          description: "Simple, well-priced hotel close to the old town.",
          tag: "Budget",
          image: pefkosImg,
          bookingUrl: "https://www.booking.com/hotel/cy/pefkos.en-gb.html?aid=2311236",
          bestFor: "Quiet budget stay",
          location: "Near Limassol old town",
          note: "Clean and centrally located.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Chrielka Apartments",
          description: "Self-catering apartments with a homely feel.",
          tag: "Budget",
          image: chrielkaImg,
          bookingUrl: "https://www.booking.com/hotel/cy/chrielka-apartments.en-gb.html?aid=2311236",
          bestFor: "Longer stays on a budget",
          location: "Tourist area, Limassol",
          note: "Spacious apartments with kitchen.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Yamas Urban Living",
          description: "Modern urban apartments in the heart of Limassol.",
          tag: "Budget",
          image: yamasImg,
          bookingUrl: "https://www.booking.com/hotel/cy/yamas-urban-living.en-gb.html?aid=2311236",
          bestFor: "Stylish city stays",
          location: "Central Limassol",
          note: "Sleek design at a fair price.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Marianna Apartments",
          description: "Comfortable apartments close to the beach.",
          tag: "Budget",
          image: mariannaImg,
          bookingUrl: "https://www.booking.com/hotel/cy/marianna-apartments.en-gb.html?aid=2311236",
          bestFor: "Families on a budget",
          location: "Tourist area, near the beach",
          note: "Friendly hosts, great value.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Jedi Hub",
          description: "Trendy budget stay with a creative atmosphere.",
          tag: "Budget",
          image: jediImg,
          bookingUrl: "https://www.booking.com/hotel/cy/jedi-omdom.en-gb.html?aid=2311236",
          bestFor: "Solo travellers and couples",
          location: "Central Limassol",
          note: "Cosy and well-designed rooms.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Tsanotel",
          description: "Reliable city hotel with friendly service.",
          tag: "Budget",
          image: tsanotelImg,
          bookingUrl: "https://www.booking.com/hotel/cy/tsanotel.en-gb.html?aid=2311236",
          bestFor: "Short city breaks",
          location: "Central Limassol",
          note: "Simple comfort at a fair price.",
          category: "budget",
          stars: 3,
        },
        {
          name: "Olympia Studio (Old Town Marvel)",
          description: "Charming studio in the heart of the old town.",
          tag: "Budget",
          image: olympiaImg,
          bookingUrl: "https://www.booking.com/hotel/cy/olympia-studio-old-town-marvel.en-gb.html?aid=2311236",
          bestFor: "Couples exploring the old town",
          location: "Limassol old town",
          note: "Walk to restaurants, bars and the sea.",
          category: "budget",
          stars: 3,
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
      overall: h("Annabelle Hotel", "Paphos", "luxury", 5, "A calm, premium stay", "Paphos harbour", "A bit expensive, but very reliable.", 0),
      family: h("Capital Coast Resort & Spa", "Paphos", "family", 4, "Families on a relaxed trip", "Quiet beachfront", "Easy and well-priced for families.", 4),
      budget: h("Aliathon Aegean Resort", "Paphos", "budget", 3, "Best value all-inclusive", "Universal area", "Lots of food choice for the price.", 4),
    },
    categories: {
      luxury: [
        {
          name: "Elysium Hotel",
          description: "Iconic 5★ beachfront resort by the Tombs of the Kings.",
          tag: "Luxury",
          image: elysiumImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Elysium+Paphos",
          bestFor: "Heritage luxury experience",
          location: "Tombs of the Kings, Paphos",
          note: "Grand architecture, premium service and a stunning beachfront.",
          category: "luxury",
          stars: 5,
          highlight: "Best choice",
        },
        {
          name: "Amavi Hotel (Adults Only)",
          description: "Sleek adults-only 5★ retreat with refined seafront design.",
          tag: "Luxury",
          image: amaviImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Amavi+Hotel+Paphos",
          bestFor: "Adults-only escapes",
          location: "Paphos beach area",
          note: "Modern luxury, quiet pools and a romantic atmosphere.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Annabelle Hotel",
          description: "Timeless 5★ luxury landmark by Paphos harbour.",
          tag: "Luxury",
          image: annabelleImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Annabelle+Paphos",
          bestFor: "Romantic premium stays",
          location: "Paphos harbour",
          note: "Lush gardens, lagoon pools and impeccable service.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Almyra Hotel",
          description: "Design-led 5★ beachfront hotel with a stylish Mediterranean vibe.",
          tag: "Luxury",
          image: almyraImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Almyra+Paphos",
          bestFor: "Design lovers & couples",
          location: "Paphos harbour",
          note: "Contemporary luxury with a relaxed beach atmosphere.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Constantinou Bros Asimina Suites Hotel",
          description: "Adults-only all-suite 5★ resort directly on the beach.",
          tag: "Luxury",
          image: asiminaSuitesImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Asimina+Suites+Paphos",
          bestFor: "Adults-only beachfront luxury",
          location: "Paphos beachfront",
          note: "Spacious suites, polished service and direct beach access.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Louis Ivi Mare Hotel",
          description: "Modern adults-only 5★ with a chic seafront setting.",
          tag: "Luxury",
          image: louisIviMareImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Louis+Ivi+Mare+Paphos",
          bestFor: "Stylish adults-only stays",
          location: "Paphos seafront",
          note: "Contemporary design, calm pools and great sea views.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Olympic Lagoon Resort Paphos",
          description: "Premium all-inclusive 5★ with lagoon pools and top dining.",
          tag: "Luxury",
          image: olympicLagoonPaphosImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Olympic+Lagoon+Paphos",
          bestFor: "Premium all-inclusive",
          location: "Universal area, Paphos",
          note: "Lagoon pools, multiple restaurants and full luxury service.",
          category: "luxury",
          stars: 5,
        },
        {
          name: "Azia Resort & Spa",
          description: "Cliffside 5★ resort with breathtaking sea views and a top spa.",
          tag: "Luxury",
          image: aziaResortImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Azia+Resort+Paphos",
          bestFor: "Spa & sea-view luxury",
          location: "Chlorakas, Paphos",
          note: "Stunning views, infinity pools and refined wellness experience.",
          category: "luxury",
          stars: 5,
        },
      ],
      family: [
        {
          name: "Alexander The Great Beach Hotel",
          description: "Family-friendly 4★ beachfront hotel with pools and central location.",
          tag: "Family",
          image: alexanderGreatImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Alexander+The+Great+Beach+Hotel+Paphos",
          bestFor: "Beachfront family stays",
          location: "Paphos beachfront",
          note: "Direct beach access and easy walks to the harbour.",
          category: "family",
          stars: 4,
          highlight: "Best choice",
        },
        {
          name: "Leonardo Laura Beach & Splash Resort",
          description: "Family resort with a splash water park and big pools.",
          tag: "Family",
          image: leonardoLauraImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Leonardo+Laura+Beach+Resort+Paphos",
          bestFor: "Kids who love water parks",
          location: "Chlorakas beachfront",
          note: "Splash park, multiple pools and family activities.",
          category: "family",
          stars: 4,
        },
        {
          name: "Louis Phaethon Beach",
          description: "All-inclusive family resort with extensive gardens and pools.",
          tag: "Family",
          image: louisPhaethonImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Louis+Phaethon+Beach+Paphos",
          bestFor: "All-inclusive families",
          location: "Yeroskipou beachfront",
          note: "Classic family resort with kids' clubs and entertainment.",
          category: "family",
          stars: 4,
        },
        {
          name: "Aquamare Beach Hotel & Spa",
          description: "Family-friendly beachfront 4★ with pools, spa and comfortable rooms.",
          tag: "Family",
          image: img(3),
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Aquamare+Beach+Hotel+Paphos",
          bestFor: "Beach families & comfort",
          location: "Paphos beachfront",
          note: "Direct beach access, pools and relaxed family atmosphere.",
          category: "family",
          stars: 4,
        },
        {
          name: "Athena Beach Hotel",
          description: "Reliable beachfront 4★ with pools and family-friendly comfort.",
          tag: "Family",
          image: athenaBeachImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Athena+Beach+Hotel+Paphos",
          bestFor: "Easy family weeks",
          location: "Paphos seafront",
          note: "Reliable and family-friendly with pool complex.",
          category: "family",
          stars: 4,
        },
        {
          name: "Avanti Hotel",
          description: "Popular family-favourite hotel with big pools and central walks.",
          tag: "Family",
          image: avantiPaphosImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Avanti+Hotel+Paphos",
          bestFor: "Family-favourite all-inclusive",
          location: "Paphos centre",
          note: "Pools, gardens and easy walks to shops and restaurants.",
          category: "family",
          stars: 4,
        },
        {
          name: "Mayfair Hotel",
          description: "Friendly family hotel close to the centre with pool and good value.",
          tag: "Family",
          image: mayfairPaphosImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Mayfair+Hotel+Paphos",
          bestFor: "Central family value",
          location: "Kato Paphos",
          note: "Comfortable rooms, pool and easy access to attractions.",
          category: "family",
          stars: 4,
        },
        {
          name: "Kefalos Beach Tourist Village",
          description: "Bungalow-style family village with gardens, pools and beach access.",
          tag: "Family",
          image: kefalosBeachImg,
          bookingUrl: "https://www.booking.com/searchresults.en-gb.html?ss=Kefalos+Beach+Tourist+Village+Paphos",
          bestFor: "Bungalow family stays",
          location: "Paphos beachfront",
          note: "Spacious bungalows in green gardens with sea access.",
          category: "family",
          stars: 4,
        },
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
