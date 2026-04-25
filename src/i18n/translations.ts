export type Lang = "sv" | "no" | "da";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "da", label: "Dansk", flag: "🇩🇰" },
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
    rights: string;
    madeFor: string;
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
      aboutText:
        "Vi får en liten provision när du bokar via våra partners — utan extra kostnad för dig. Det håller våra rekommendationer ärliga och guiderna gratis.",
      rights: "Cypern Hotell för skandinaver",
      madeFor: "Skapad med omsorg · För Sverige, Norge & Danmark",
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
      aboutText:
        "Vi tjener en liten provisjon når du bestiller via våre partnere — uten ekstra kostnad for deg. Det holder anbefalingene ærlige og guidene gratis.",
      rights: "Kypros Hoteller for skandinaver",
      madeFor: "Laget med omhu · For Sverige, Norge & Danmark",
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
      aboutText:
        "Vi tjener en lille provision, når du booker via vores partnere — uden ekstra omkostninger for dig. Det holder vores anbefalinger ærlige og guiderne gratis.",
      rights: "Cypern Hoteller for skandinaver",
      madeFor: "Lavet med omhu · Til Sverige, Norge & Danmark",
    },
  },
};
