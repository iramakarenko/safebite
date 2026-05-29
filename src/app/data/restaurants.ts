export const allergenLabels: Record<string, string> = {
  gluten: "Glutenfrei",
  lactose: "Laktosefrei",
  nuts: "Nussfrei",
  eggs: "Eifrei",
  fish: "Fischfrei",
  shellfish: "Schalentierfrei",
  soy: "Sojafrei",
  sesame: "Sesamfrei",
};

export const cuisineEmoji: Record<string, string> = {
  "Burger & Fast Food": "🍔",
  "Vegetarisch / Vegan": "🥗",
  "Italienisch": "🍕",
  "Asiatisch": "🍜",
  "Café & Bakery": "☕",
  "Österreichisch / International": "🍽️",
  "Grill & BBQ": "🥩",
  "Café & Frühstück": "🥐",
  "Österreichisch": "🥨",
  "Österreichisch / Fast Food": "🥨",
  "Bowl & Salads": "🥙",
  "International": "🌍",
  "Café & Snacks": "🧁",
  "Japanisch / Sushi": "🍣",
  "Mexikanisch": "🌮",
  "Mediterran": "🫒",
  "Indisch": "🍛",
  "Türkisch": "🥙",
};

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  cuisine: string;
  allergenFree: string[];
  rating: number;
  reviews: Review[];
  description: string;
  imageUrl?: string;
  distance?: string;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  allergenInfo?: string;
}

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Gruenberger",
    address: "Grüne Straße 15, 1010 Wien",
    lat: 48.2082,
    lng: 16.3738,
    cuisine: "Burger & Fast Food",
    allergenFree: ["gluten", "lactose", "shellfish"],
    rating: 4.5,
    distance: "2.8 km",
    description: "Modernes Burger-Restaurant mit vielen allergen-freien Optionen. Spezialisiert auf glutenfreie Brötchen und vegane Alternativen.",
    reviews: [
      {
        id: "r1",
        author: "Maria K.",
        date: "2026-05-15",
        rating: 5,
        comment: "Fantastische glutenfreie Burger! Das Personal ist sehr gut geschult.",
        allergenInfo: "Glutenfreie Brötchen verfügbar, separate Zubereitung"
      },
      {
        id: "r2",
        author: "Thomas B.",
        date: "2026-05-10",
        rating: 4,
        comment: "Sehr gute Auswahl, manchmal etwas lange Wartezeit.",
        allergenInfo: "Auch laktosefreier Käse erhältlich"
      }
    ]
  },
  {
    id: "2",
    name: "Vita Verde",
    address: "Mariahilfer Straße 88, 1070 Wien",
    lat: 48.2012,
    lng: 16.3502,
    cuisine: "Vegetarisch / Vegan",
    allergenFree: ["gluten", "nuts", "lactose", "shellfish", "sesame"],
    rating: 4.8,
    distance: "4.0 km",
    description: "100% vegetarisches Restaurant mit ausgezeichneter Allergen-Kennzeichnung. Alle Gerichte sind glutenfrei verfügbar.",
    reviews: [
      {
        id: "r3",
        author: "Sandra W.",
        date: "2026-05-20",
        rating: 5,
        comment: "Beste glutenfreie Pasta in Wien!",
        allergenInfo: "Alle Allergene sind klar auf der Karte gekennzeichnet"
      }
    ]
  },
  {
    id: "3",
    name: "Pizzeria Bella Napoli",
    address: "Neubaugasse 42, 1070 Wien",
    lat: 48.2015,
    lng: 16.3520,
    cuisine: "Italienisch",
    allergenFree: ["gluten"],
    rating: 4.3,
    distance: "3.8 km",
    description: "Authentische neapolitanische Pizza mit glutenfreiem Teig. Separate Zubereitung in eigenem Ofen.",
    reviews: [
      {
        id: "r4",
        author: "Lukas M.",
        date: "2026-05-18",
        rating: 4,
        comment: "Endlich gute glutenfreie Pizza!",
        allergenInfo: "Eigener Ofen für glutenfreie Pizzen"
      }
    ]
  },
  {
    id: "4",
    name: "Asia Fusion",
    address: "Währinger Straße 25, 1090 Wien",
    lat: 48.2180,
    lng: 16.3650,
    cuisine: "Asiatisch",
    allergenFree: ["gluten", "lactose"],
    rating: 4.6,
    distance: "1.9 km",
    description: "Moderne asiatische Küche mit vielen glutenfreien Optionen. Sushi, Currys und Wok-Gerichte.",
    reviews: []
  },
  {
    id: "5",
    name: "Brotzeit Bakery",
    address: "Alser Straße 12, 1090 Wien",
    lat: 48.2165,
    lng: 16.3580,
    cuisine: "Café & Bakery",
    allergenFree: ["gluten", "nuts", "lactose", "shellfish"],
    rating: 4.7,
    distance: "2.3 km",
    description: "Bäckerei und Café mit großer Auswahl an glutenfreiem Gebäck und Kuchen.",
    reviews: [
      {
        id: "r5",
        author: "Anna F.",
        date: "2026-05-22",
        rating: 5,
        comment: "Die glutenfreien Croissants sind unglaublich!",
        allergenInfo: "Täglich frisches glutenfreies Gebäck"
      }
    ]
  },
  {
    id: "6",
    name: "Naschmarkt Deli",
    address: "Linke Wienzeile 4, 1060 Wien",
    lat: 48.1991,
    lng: 16.3660,
    cuisine: "Österreichisch / International",
    allergenFree: ["gluten", "lactose", "soy"],
    rating: 4.4,
    distance: "2.3 km",
    description: "Frische Küche direkt am Naschmarkt. Täglich wechselnde Gerichte aus regionalen Zutaten, alles glutenfrei gekennzeichnet.",
    reviews: [
      {
        id: "r6",
        author: "Peter H.",
        date: "2026-05-12",
        rating: 4,
        comment: "Tolles Angebot, sehr frisch und lecker.",
        allergenInfo: "Alle Gerichte mit Allergen-Liste verfügbar"
      },
      {
        id: "r7",
        author: "Eva M.",
        date: "2026-05-19",
        rating: 5,
        comment: "Bester Mittagstisch in der Gegend!",
        allergenInfo: "Separates glutenfreies Menü vorhanden"
      }
    ]
  },
  {
    id: "7",
    name: "Prater Grill",
    address: "Prater Hauptallee 2, 1020 Wien",
    lat: 48.2148,
    lng: 16.4008,
    cuisine: "Grill & BBQ",
    allergenFree: ["gluten", "lactose"],
    rating: 4.2,
    distance: "3.5 km",
    description: "Rustikales Grillrestaurant im Prater mit glutenfreien Fleischspezialitäten und Beilagen.",
    reviews: [
      {
        id: "r8",
        author: "Klaus R.",
        date: "2026-05-08",
        rating: 4,
        comment: "Herrlicher Ausblick und gutes Essen!",
        allergenInfo: "Glutenfreie Marinade auf Anfrage"
      }
    ]
  },
  {
    id: "8",
    name: "Belvedere Café",
    address: "Prinz-Eugen-Straße 27, 1030 Wien",
    lat: 48.1925,
    lng: 16.3806,
    cuisine: "Café & Frühstück",
    allergenFree: ["gluten", "nuts", "eggs", "shellfish", "sesame"],
    rating: 4.9,
    distance: "2.8 km",
    description: "Elegantes Café nahe dem Belvedere. Bietet täglich frische glutenfreie und nussfreie Backwaren sowie ein ausgiebiges Frühstücksangebot.",
    reviews: [
      {
        id: "r9",
        author: "Sophia L.",
        date: "2026-05-21",
        rating: 5,
        comment: "Absoluter Geheimtipp! Das Frühstücksbuffet ist grandios.",
        allergenInfo: "Separates Glutenfrei-Buffet mit Kennzeichnung"
      },
      {
        id: "r10",
        author: "Michael T.",
        date: "2026-05-16",
        rating: 5,
        comment: "Traumhafter Ort, perfekte Allergiker-Betreuung!",
        allergenInfo: "Personal bestens geschult, alle Zutaten transparent"
      }
    ]
  },
  {
    id: "9",
    name: "Schönbrunn Taverne",
    address: "Schönbrunner Schloßstraße 47, 1130 Wien",
    lat: 48.1845,
    lng: 16.3122,
    cuisine: "Österreichisch",
    allergenFree: ["gluten", "lactose"],
    rating: 4.1,
    distance: "4.2 km",
    description: "Traditionelles Wiener Gasthaus nahe Schloss Schönbrunn mit glutenfreien Varianten der Klassiker.",
    reviews: [
      {
        id: "r11",
        author: "Hilde B.",
        date: "2026-05-05",
        rating: 4,
        comment: "Gemütliche Atmosphäre, gutes Wiener Schnitzel auch glutenfrei!",
        allergenInfo: "Glutenfreies Schnitzel auf Vorbestellung möglich"
      }
    ]
  },
  {
    id: "10",
    name: "Green Bowl",
    address: "Ringstraße 18, 1010 Wien",
    lat: 48.2049,
    lng: 16.3695,
    cuisine: "Bowl & Salads",
    allergenFree: ["gluten", "lactose", "nuts", "soy", "shellfish", "sesame"],
    rating: 4.6,
    distance: "0.5 km",
    description: "Modernes Bowl-Restaurant direkt an der Ringstraße. Alles frisch zubereitet, 100% glutenfrei und transparent deklariert.",
    reviews: [
      {
        id: "r12",
        author: "Nina S.",
        date: "2026-05-23",
        rating: 5,
        comment: "Mein neues Lieblingslokal! So lecker und sicher.",
        allergenInfo: "Vollständig glutenfrei, alle Allergene ausgewiesen"
      }
    ]
  },
  {
    id: "11",
    name: "Floridsdorf Kitchen",
    address: "Floridsdorfer Hauptstraße 10, 1210 Wien",
    lat: 48.2559,
    lng: 16.4005,
    cuisine: "International",
    allergenFree: ["gluten", "fish"],
    rating: 4.0,
    distance: "5.1 km",
    description: "Gemütliches Nachbarschaftslokal mit internationalen Gerichten. Glutenfreie Küche auf Wunsch, fischfreie Optionen ständig verfügbar.",
    reviews: []
  },
  {
    id: "12",
    name: "Meidlinger Markt",
    address: "Niederhofstraße 30, 1120 Wien",
    lat: 48.1727,
    lng: 16.3422,
    cuisine: "Café & Snacks",
    allergenFree: ["gluten", "lactose", "eggs"],
    rating: 4.3,
    distance: "3.9 km",
    description: "Kleines, familiäres Café mit hausgemachten glutenfreien Snacks und Kuchen. Laktosefrei auf Anfrage.",
    reviews: [
      {
        id: "r13",
        author: "Franz W.",
        date: "2026-05-14",
        rating: 4,
        comment: "Wunderbarer Kuchen, alles selbst gemacht!",
        allergenInfo: "Glutenfreier Kuchen täglich frisch"
      }
    ]
  },
  {
    id: "13",
    name: "Sushimi",
    address: "Mariahilfer Straße 45, 1060 Wien",
    lat: 48.2005,
    lng: 16.3540,
    cuisine: "Japanisch / Sushi",
    allergenFree: ["eggs", "shellfish"],
    rating: 4.4,
    distance: "1.2 km",
    description: "Modernes Sushi-Restaurant mit ei- und schalentierfreien Rolls. Glutenfreie Tamari-Soße auf Anfrage erhältlich.",
    reviews: [
      {
        id: "r14",
        author: "Jonas K.",
        date: "2026-05-20",
        rating: 5,
        comment: "Endlich Sushi ohne Angst vor Eiern im Teig!",
        allergenInfo: "Keine Ei-Zutaten in Standard-Rolls, Personal sehr aufmerksam"
      }
    ]
  },
  {
    id: "14",
    name: "La Cantina",
    address: "Neubaugürtel 12, 1070 Wien",
    lat: 48.2040,
    lng: 16.3430,
    cuisine: "Mexikanisch",
    allergenFree: ["gluten", "lactose", "nuts", "fish"],
    rating: 4.3,
    distance: "3.1 km",
    description: "Authentisches mexikanisches Restaurant mit Maistortillas statt Weizen. Allergen-Ampel auf jeder Karte, kompetente Beratung.",
    reviews: [
      {
        id: "r15",
        author: "Laura B.",
        date: "2026-05-17",
        rating: 4,
        comment: "Tolle Tacos! Die Maistortillas sind glutenfrei und superlecker.",
        allergenInfo: "Alle Tortillas aus 100% Mais, keine Erdnüsse verwendet"
      },
      {
        id: "r16",
        author: "Stefan M.",
        date: "2026-05-24",
        rating: 5,
        comment: "Bestes mexikanisches Essen in Wien, und das als Allergiker sicher!",
        allergenInfo: "Küche komplett fischfrei, glutenfreie Guacamole"
      }
    ]
  },
  {
    id: "15",
    name: "Hummus & Co.",
    address: "Gumpendorfer Straße 22, 1060 Wien",
    lat: 48.1965,
    lng: 16.3560,
    cuisine: "Mediterran",
    allergenFree: ["lactose", "eggs", "nuts"],
    rating: 4.6,
    distance: "2.0 km",
    description: "Levantinische Bowl-Küche mit frischen Zutaten. Alle Gerichte laktose- und eifrei, nussfreie Küche garantiert.",
    reviews: [
      {
        id: "r17",
        author: "Mira S.",
        date: "2026-05-21",
        rating: 5,
        comment: "Der Hummus ist göttlich und ich kann bedenkenlos essen!",
        allergenInfo: "Komplett eifrei, alle Dips ohne Milchprodukte"
      }
    ]
  },
  {
    id: "16",
    name: "The Spice Garden",
    address: "Alser Straße 38, 1090 Wien",
    lat: 48.2192,
    lng: 16.3520,
    cuisine: "Indisch",
    allergenFree: ["gluten", "nuts", "soy", "shellfish"],
    rating: 4.5,
    distance: "2.7 km",
    description: "Indische Currys und Dal-Gerichte mit detaillierter Allergen-Kennzeichnung. Viele von Natur aus glutenfreie Gerichte.",
    reviews: [
      {
        id: "r18",
        author: "Priya N.",
        date: "2026-05-19",
        rating: 5,
        comment: "Als Inder mit Glutenunverträglichkeit hier endlich heimisch fühlen!",
        allergenInfo: "Glutenfreie Pappadums, alle Currys ohne Nüsse erhältlich"
      },
      {
        id: "r19",
        author: "David W.",
        date: "2026-05-22",
        rating: 4,
        comment: "Sehr gute Auswahl, Personal erklärt Zutaten genau.",
        allergenInfo: "Sojasauce wird nicht verwendet, sichereres Küchensystem"
      }
    ]
  },
  {
    id: "17",
    name: "Bratlfettn",
    address: "Favoritenstraße 88, 1100 Wien",
    lat: 48.1850,
    lng: 16.3720,
    cuisine: "Österreichisch / Fast Food",
    allergenFree: ["gluten", "eggs", "lactose"],
    rating: 3.9,
    distance: "4.5 km",
    description: "Wiener Fast Food mit glutenfreien Würsteln, eierfreien Beilagen und laktosefreien Saucen. Günstig und transparent.",
    reviews: [
      {
        id: "r20",
        author: "Heinz P.",
        date: "2026-05-11",
        rating: 4,
        comment: "Guter Würstelstand, überraschend gut für Allergiker!",
        allergenInfo: "Glutenfreies Brot auf Wunsch, keine Ei-Produkte im Standard-Menü"
      }
    ]
  },
  {
    id: "18",
    name: "Pasta di Roma",
    address: "Josefstädter Straße 14, 1080 Wien",
    lat: 48.2115,
    lng: 16.3480,
    cuisine: "Italienisch",
    allergenFree: ["lactose", "eggs", "shellfish", "fish"],
    rating: 4.2,
    distance: "1.8 km",
    description: "Traditionelle Pasta-Bar mit laktose- und eierfreien Nudeln auf Bestellung. Komplett frei von Fisch und Schalentieren.",
    reviews: [
      {
        id: "r21",
        author: "Chiara F.",
        date: "2026-05-18",
        rating: 4,
        comment: "Endlich Pasta ohne Ei! Schmeckt genauso gut.",
        allergenInfo: "Pasta aus Hartweizengrieß ohne Ei auf Anfrage"
      }
    ]
  },
  {
    id: "19",
    name: "Garden Kitchen",
    address: "Währinger Straße 78, 1180 Wien",
    lat: 48.2298,
    lng: 16.3502,
    cuisine: "Vegetarisch / Vegan",
    allergenFree: ["gluten", "lactose", "nuts", "eggs", "soy", "fish", "shellfish", "sesame"],
    rating: 4.7,
    distance: "3.3 km",
    description: "Wiens allergikerfreundlichstes Restaurant. Alle 14 EU-Allergene klar deklariert, vegane Vollwertküche ohne Kompromisse.",
    reviews: [
      {
        id: "r22",
        author: "Anna Z.",
        date: "2026-05-23",
        rating: 5,
        comment: "Ich habe 6 Allergien und kann hier die komplette Karte essen!",
        allergenInfo: "Vollständig deklariert, eigene Allergie-Checkliste für jeden Tisch"
      },
      {
        id: "r23",
        author: "Ben T.",
        date: "2026-05-25",
        rating: 5,
        comment: "Absolute Empfehlung für alle Allergiker. Top Personal!",
        allergenInfo: "Separate Küchenbereiche für verschiedene Allergene"
      }
    ]
  },
  {
    id: "20",
    name: "Bosphorus Grill",
    address: "Lerchenfelder Straße 95, 1070 Wien",
    lat: 48.2135,
    lng: 16.3445,
    cuisine: "Türkisch",
    allergenFree: ["lactose", "nuts", "fish", "shellfish", "eggs"],
    rating: 4.1,
    distance: "2.9 km",
    description: "Türkischer Grill mit klarer Allergen-Beratung. Ohne Nüsse, Fisch, Schalentiere und Eier — für viele Allergiker gut geeignet.",
    reviews: [
      {
        id: "r24",
        author: "Aylin D.",
        date: "2026-05-16",
        rating: 4,
        comment: "Sehr freundlich und auf Allergien gut eingegangen.",
        allergenInfo: "Kein Fisch in der Küche, nussfreie Döner-Saucen"
      }
    ]
  }
];
