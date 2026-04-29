export type Lang = "sv" | "no" | "da" | "en";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "da", label: "Dansk", flag: "🇩🇰" },
  { code: "en", label: "English", flag: "🇬🇧" },
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

export const translations: Record<Lang, Dict> = {
  sv: {
    brand: "Cypern · Hotell",
    brandTagline: "För skandinaver",
    nav: { home: "Hem", whereToStay: "Var ska du bo" },
    step: (n, t) => `Steg ${n} av ${t}`,
    home: {
      title1: "Välj din destination",
      titleAccent: "på Cypern",
      helper: "Börja med att välja var på Cypern du vill bo.",
      chips: "Cypern",
      choose: "Välj →",
      destinations: {
        paphos: "Lugnt, romantiskt, premium.",
        ayiaNapa: "Livligt, stränder, socialt.",
        limassol: "Stad + strand + lyx.",
      },
    },
    area: {
      title1: "Välj typ av hotell i",
      helper: (name) => `Välj nu vilken typ av hotell du vill ha i ${name}.`,
      seeHotels: "Se hotell →",
      types: { luxury: "Lyx", family: "Familj", budget: "Budget" },
      descs: {
        luxury: "Exklusiva hotell, lugn och premiumupplevelse.",
        family: "Enkla, säkra och barnvänliga hotell.",
        budget: "Bra valuta för pengarna, fortfarande bekvämt.",
      },
    },
    hotelList: {
      title: (type, area) => `Bästa ${type} hotellen i ${area}`,
      subtitle: "Klicka på ett hotell för att se priser på Booking.com.",
      back: "← Välj en annan typ",
      types: { luxury: "lyx", family: "familje", budget: "budget" },
    },
    card: {
      bestFor: "Bäst för",
      location: "Plats",
      note: "Notis",
      cta: "Se pris på Booking",
      redirect: "Du skickas vidare till Booking.com",
      secure: "Säker bokning via Booking.com",
    },
    footer: {
      intro: "En handplockad guide för skandinaver som söker de finaste boendena på Cypern.",
      explore: "Utforska",
      about: "Om oss",
      aboutText: "",
      aboutLink: "Om oss & hur vi väljer hotell →",
      rights: "Cypern Hotell för skandinaver",
      madeFor: "Skapad med omsorg · För Sverige, Norge & Danmark",
    },
    aboutPage: {
      eyebrow: "Om oss",
      title: "Om oss",
      subtitle: "Vi hjälper skandinaviska resenärer hitta rätt hotell på Cypern – snabbt och utan stress.",
      p1: "Istället för att visa hundratals alternativ väljer vi noggrant ut hotell som faktiskt är värda att boka.",
      p2: "Vi fokuserar på kvalitet, läge och vad som passar olika typer av resor.",
      p3: "Allt är utformat för att göra ditt val enkelt och pålitligt.",
      methodEyebrow: "Vår metod",
      methodTitle: "Hur vi väljer hotell",
      methodSubtitle: "Vi visar inte alla hotell – endast de som uppfyller våra krav.",
      basedOn: "Varje hotell väljs ut baserat på:",
      criteria: {
        location: "Läge",
        ratings: "Gästbetyg",
        value: "Valuta för pengarna",
        suitability: "Passform (lyx, familj eller budget)",
      },
      avoid: "Vi undviker hotell med ojämn kvalitet eller dåliga recensioner.",
      goal: "Vårt mål: göra det enkelt för dig att välja och boka tryggt via Booking.com.",
    },
  },
  no: {
    brand: "Kypros · Hoteller",
    brandTagline: "For skandinaver",
    nav: { home: "Hjem", whereToStay: "Hvor du skal bo" },
    step: (n, t) => `Trinn ${n} av ${t}`,
    home: {
      title1: "Velg din destinasjon",
      titleAccent: "på Kypros",
      helper: "Start med å velge hvor på Kypros du vil bo.",
      chips: "Kypros",
      choose: "Velg →",
      destinations: {
        paphos: "Rolig, romantisk, premium.",
        ayiaNapa: "Livlig, strender, sosialt.",
        limassol: "By + strand + luksus.",
      },
    },
    area: {
      title1: "Velg hotelltype i",
      helper: (name) => `Velg nå hvilken type hotell du vil ha i ${name}.`,
      seeHotels: "Se hoteller →",
      types: { luxury: "Luksus", family: "Familie", budget: "Budsjett" },
      descs: {
        luxury: "Eksklusive hoteller, rolig og premium opplevelse.",
        family: "Enkle, trygge og barnevennlige hoteller.",
        budget: "God verdi, fortsatt komfortabelt.",
      },
    },
    hotelList: {
      title: (type, area) => `Beste ${type}hotellene i ${area}`,
      subtitle: "Klikk på et hotell for å se priser på Booking.com.",
      back: "← Velg en annen type",
      types: { luxury: "luksus", family: "familie", budget: "budsjett" },
    },
    card: {
      bestFor: "Best for",
      location: "Sted",
      note: "Notat",
      cta: "Se pris på Booking",
      redirect: "Du sendes videre til Booking.com",
      secure: "Sikker booking via Booking.com",
    },
    footer: {
      intro: "En håndplukket guide for skandinaver som søker de fineste oppholdene på Kypros.",
      explore: "Utforsk",
      about: "Om oss",
      aboutText: "",
      aboutLink: "Om oss & hvordan vi velger hoteller →",
      rights: "Kypros Hoteller for skandinaver",
      madeFor: "Laget med omhu · For Sverige, Norge & Danmark",
    },
    aboutPage: {
      eyebrow: "Om oss",
      title: "Om oss",
      subtitle: "Vi hjelper skandinaviske reisende å finne de rette hotellene på Kypros – raskt og uten stress.",
      p1: "I stedet for å vise hundrevis av alternativer velger vi nøye ut hoteller som faktisk er verdt å bestille.",
      p2: "Vi fokuserer på kvalitet, beliggenhet og hva som passer ulike typer reiser.",
      p3: "Alt er laget for å gjøre valget ditt enkelt og pålitelig.",
      methodEyebrow: "Vår metode",
      methodTitle: "Hvordan vi velger hoteller",
      methodSubtitle: "Vi viser ikke alle hoteller – kun de som oppfyller våre krav.",
      basedOn: "Hvert hotell velges ut basert på:",
      criteria: {
        location: "Beliggenhet",
        ratings: "Gjestevurderinger",
        value: "Valuta for pengene",
        suitability: "Passform (luksus, familie eller budsjett)",
      },
      avoid: "Vi unngår hoteller med ujevn kvalitet eller dårlige anmeldelser.",
      goal: "Vårt mål: gjøre det enkelt for deg å velge og bestille trygt via Booking.com.",
    },
  },
  da: {
    brand: "Cypern · Hoteller",
    brandTagline: "Til skandinaver",
    nav: { home: "Hjem", whereToStay: "Hvor skal du bo" },
    step: (n, t) => `Trin ${n} af ${t}`,
    home: {
      title1: "Vælg din destination",
      titleAccent: "på Cypern",
      helper: "Start med at vælge, hvor på Cypern du vil bo.",
      chips: "Cypern",
      choose: "Vælg →",
      destinations: {
        paphos: "Roligt, romantisk, premium.",
        ayiaNapa: "Livligt, strande, socialt.",
        limassol: "By + strand + luksus.",
      },
    },
    area: {
      title1: "Vælg hoteltype i",
      helper: (name) => `Vælg nu hvilken type hotel du vil have i ${name}.`,
      seeHotels: "Se hoteller →",
      types: { luxury: "Luksus", family: "Familie", budget: "Budget" },
      descs: {
        luxury: "Eksklusive hoteller, ro og premium-oplevelse.",
        family: "Nemme, sikre og børnevenlige hoteller.",
        budget: "God værdi, stadig behageligt.",
      },
    },
    hotelList: {
      title: (type, area) => `Bedste ${type}hoteller i ${area}`,
      subtitle: "Klik på et hotel for at se priser på Booking.com.",
      back: "← Vælg en anden type",
      types: { luxury: "luksus", family: "familie", budget: "budget" },
    },
    card: {
      bestFor: "Bedst til",
      location: "Beliggenhed",
      note: "Note",
      cta: "Se pris på Booking",
      redirect: "Du sendes videre til Booking.com",
      secure: "Sikker booking via Booking.com",
    },
    footer: {
      intro: "En håndplukket guide for skandinaver, der søger de fineste ophold på Cypern.",
      explore: "Udforsk",
      about: "Om os",
      aboutText: "",
      aboutLink: "Om os & sådan vælger vi hoteller →",
      rights: "Cypern Hoteller for skandinaver",
      madeFor: "Lavet med omhu · Til Sverige, Norge & Danmark",
    },
    aboutPage: {
      eyebrow: "Om os",
      title: "Om os",
      subtitle: "Vi hjælper skandinaviske rejsende med at finde de rigtige hoteller på Cypern – hurtigt og uden stress.",
      p1: "I stedet for at vise hundredvis af muligheder udvælger vi omhyggeligt hoteller, der faktisk er værd at booke.",
      p2: "Vi fokuserer på kvalitet, beliggenhed og hvad der passer til forskellige typer rejser.",
      p3: "Alt er designet til at gøre din beslutning enkel og pålidelig.",
      methodEyebrow: "Vores metode",
      methodTitle: "Sådan vælger vi hoteller",
      methodSubtitle: "Vi viser ikke alle hoteller – kun dem, der lever op til vores standarder.",
      basedOn: "Hvert hotel udvælges ud fra:",
      criteria: {
        location: "Beliggenhed",
        ratings: "Gæstevurderinger",
        value: "Værdi for pengene",
        suitability: "Egnethed (luksus, familie eller budget)",
      },
      avoid: "Vi undgår hoteller med svingende kvalitet eller dårlige anmeldelser.",
      goal: "Vores mål: gøre det nemt for dig at vælge og booke trygt via Booking.com.",
    },
  },
  en: {
    brand: "Cyprus · Hotels",
    brandTagline: "For Scandinavians",
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
      intro: "A handpicked guide for Scandinavians looking for the finest stays in Cyprus.",
      explore: "Explore",
      about: "About",
      aboutText: "",
      aboutLink: "About us & how we select hotels →",
      rights: "Cyprus Hotels for Scandinavians",
      madeFor: "Made with care · For Sweden, Norway & Denmark",
    },
    aboutPage: {
      eyebrow: "About",
      title: "About us",
      subtitle: "We help Scandinavian travelers find the right hotels in Cyprus – quickly and without stress.",
      p1: "Instead of showing hundreds of options, we carefully select hotels that are actually worth booking.",
      p2: "We focus on quality, location, and what fits different types of trips.",
      p3: "Everything is designed to make your decision simple and reliable.",
      methodEyebrow: "Our method",
      methodTitle: "How we select hotels",
      methodSubtitle: "We don't show all hotels – only the ones that meet our standards.",
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
  },
};
