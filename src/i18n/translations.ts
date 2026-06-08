export type Lang = "en";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
];

type Dict = {
  brand: string;
  brandTagline: string;
  nav: { home: string; whereToStay: string };
  step: (n: number, total: number) => string;
  home: {
    title1: string;
    titleAccent: string;
    helper: string;
    chips: string;
    choose: string;
    destinations: { paphos: string; ayiaNapa: string; limassol: string };
  };
  area: {
    title1: string;
    helper: (name: string) => string;
    seeHotels: string;
    types: { luxury: string; family: string; budget: string };
    descs: { luxury: string; family: string; budget: string };
  };
  hotelList: {
    title: (type: string, area: string) => string;
    subtitle: string;
    back: string;
    types: { luxury: string; family: string; budget: string };
    topPicksEyebrow: string;
    topPicksTitle: string;
    topPicksSubtitle: string;
    moreHotels: string;
    badges: { first: string; second: string; third: string };
  };
  card: {
    bestFor: string;
    location: string;
    note: string;
    cta: string;
    redirect: string;
    secure: string;
  };
  footer: {
    intro: string;
    explore: string;
    about: string;
    aboutText: string;
    aboutLink: string;
    rights: string;
    madeFor: string;
  };
  navAbout: string;
  whereToStay: {
    eyebrow: string;
    titlePart1: string;
    titleAccent: string;
    intro: string;
    destinationLabel: (n: number) => string;
    bestForLabel: string;
    viewHotels: (name: string) => string;
    stillDeciding: string;
    topPicksTitle: string;
    topPicksSubtitle: string;
    seeTop3: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    methodEyebrow: string;
    methodTitle: string;
    methodSubtitle: string;
    basedOn: string;
    criteria: { location: string; ratings: string; value: string; suitability: string };
    avoid: string;
    goal: string;
  };
};

const en: Dict = {
  brand: "Cyprus · Hotels",
  brandTagline: "Handpicked stays",
  nav: { home: "Home", whereToStay: "Where to stay" },
  step: (n, t) => `Step ${n} of ${t}`,
  home: {
    title1: "Choose your destination",
    titleAccent: "in Cyprus",
    helper: "Start by choosing where in Cyprus you want to stay.",
    chips: "Cyprus",
    choose: "Choose →",
    destinations: {
      paphos: "Calm, romantic, premium.",
      ayiaNapa: "Lively, beaches, social.",
      limassol: "City + beach + luxury.",
    },
  },
  area: {
    title1: "Choose your hotel type in",
    helper: (name) => `Now choose the type of hotel you want in ${name}.`,
    seeHotels: "See hotels →",
    types: { luxury: "Luxury", family: "Family", budget: "Budget" },
    descs: {
      luxury: "High-end hotels, calm and premium experience.",
      family: "Easy, safe and family-friendly hotels.",
      budget: "Good value without unnecessary luxury.",
    },
  },
  hotelList: {
    title: (type, area) => `Best ${type} hotels in ${area}`,
    subtitle: "Click a hotel to see prices on Booking.com.",
    back: "← Choose another type",
    types: { luxury: "luxury", family: "family", budget: "budget" },
    topPicksEyebrow: "Our top picks",
    topPicksTitle: "Top 3 Best Hotels",
    topPicksSubtitle: "Handpicked favorites — our most recommended options.",
    moreHotels: "More recommended hotels",
    badges: { first: "#1 Best Choice", second: "#2 Popular Choice", third: "#3 Great Value" },
  },
  card: {
    bestFor: "Best for",
    location: "Location",
    note: "Note",
    cta: "See price on Booking",
    redirect: "You will be redirected to Booking.com",
    secure: "Secure booking via Booking.com",
  },
  footer: {
    intro: "A handpicked guide to the finest stays in Cyprus.",
    explore: "Explore",
    about: "About",
    aboutText: "",
    aboutLink: "About us & how we select hotels →",
    rights: "Cyprus Hotels",
    madeFor: "Made with care",
  },
  aboutPage: {
    eyebrow: "About",
    title: "About us",
    subtitle: "We help travelers find the right hotels in Cyprus — quickly and without stress.",
    p1: "Instead of showing hundreds of options, we carefully select hotels that are actually worth booking.",
    p2: "We focus on quality, location, and what fits different types of trips.",
    p3: "Everything is designed to make your decision simple and reliable.",
    methodEyebrow: "Our method",
    methodTitle: "How we select hotels",
    methodSubtitle: "We don't show all hotels — only the ones that meet our standards.",
    basedOn: "Each hotel is selected based on:",
    criteria: {
      location: "Location",
      ratings: "Guest ratings",
      value: "Value for money",
      suitability: "Suitability (luxury, family, or budget)",
    },
    avoid: "We avoid hotels with inconsistent quality or poor reviews.",
    goal: "Our goal: make it easy for you to choose and book with confidence via Booking.com.",
  },
  navAbout: "About",
  whereToStay: {
    eyebrow: "The Guide",
    titlePart1: "Where Should You Stay",
    titleAccent: "in Cyprus?",
    intro: "Three coastlines, three very different moods. Choose the area that matches your trip — then explore our handpicked hotels.",
    destinationLabel: (n) => `Destination 0${n}`,
    bestForLabel: "Best For",
    viewHotels: (name) => `See hotels in ${name}`,
    stillDeciding: "Still deciding?",
    topPicksTitle: "Browse our top picks in Cyprus",
    topPicksSubtitle: "Short on time? Start with our overall favorites — handpicked across all regions.",
    seeTop3: "See top 3",
  },
};

export const translations: Record<Lang, Dict> = { en };
