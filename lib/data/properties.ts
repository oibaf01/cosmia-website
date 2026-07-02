import type { Localized } from '@/lib/locale';

export interface PhotoSection {
  label: Localized;
  photos: string[];
}

export interface Property {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  location: string;
  coordinates: { lat: number; lng: number };
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  photos: string[];
  photoSections?: PhotoSection[];
  heroPhoto: string;
  googleBusinessUrl: string;
  airbnbUrl?: string;
  logo?: string;
  icon?: string;
}

export const properties: Property[] = [
  {
    slug: "casa-lira",
    name: {
      it: "Casa Lira",
      en: "Casa Lira",
      fr: "Casa Lira",
      de: "Casa Lira",
    },
    tagline: {
      it: "Appartamento moderno nel cuore di Mattinata.",
      en: "Modern apartment in the heart of Mattinata.",
      fr: "Appartement moderne au cœur de Mattinata.",
      de: "Moderne Wohnung im Herzen von Mattinata.",
    },
    description: {
      it: "Casa Lira è un appartamento moderno e luminoso in una zona tranquilla di Mattinata, a due minuti a piedi dal centro. Cucina completamente attrezzata, spazi ben organizzati, tutto il necessario per soggiorni di qualsiasi durata — che si tratti di una settimana al mare, di qualche giorno fuori stagione o di un periodo di lavoro da remoto. Le spiagge del Gargano sono facilmente raggiungibili. Parcheggio pubblico a 20 metri.",
      en: "Casa Lira is a bright, modern apartment in a quiet part of Mattinata, two minutes' walk from the centre. Fully equipped kitchen, well-organised spaces, everything you need for any length of stay — a week at the beach, a few days off-season or a remote working stint. Gargano's beaches are easy to reach. Public parking 20 metres away.",
      fr: "Casa Lira est un appartement moderne et lumineux dans un quartier calme de Mattinata, à deux minutes à pied du centre. Cuisine entièrement équipée, espaces bien organisés, tout le nécessaire pour tout type de séjour — une semaine à la mer, quelques jours hors saison ou une période de télétravail. Les plages du Gargano sont facilement accessibles. Parking public à 20 mètres.",
      de: "Casa Lira ist eine helle, moderne Wohnung in einem ruhigen Teil von Mattinata, zwei Gehminuten vom Zentrum entfernt. Voll ausgestattete Küche, gut organisierte Räume, alles was man für jede Aufenthaltsdauer braucht — eine Woche am Meer, ein paar Tage außerhalb der Saison oder eine Zeit im Homeoffice. Die Strände des Gargano sind leicht erreichbar. Öffentlicher Parkplatz 20 Meter entfernt.",
    },
    location: "Via Emile Zola 30, Mattinata (FG)",
    coordinates: { lat: 41.71018611353891, lng: 16.050100473835958 },
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: [
      "wifi",
      "tv",
      "washing_machine",
      "kitchen",
      "microwave",
      "coffee",
      "iron",
      "hair_dryer",
      "linen",
      "wardrobe",
      "cleaning_kit",
      "personal_welcome",
      "local_tips",
    ],
    photos: [
      "/images/casa-lira/hero.jpg",
      "/images/casa-lira/photo-1.jpg",
      "/images/casa-lira/photo-2.jpg",
      "/images/casa-lira/photo-3.jpg",
      "/images/casa-lira/photo-4.jpg",
      "/images/casa-lira/photo-5.jpg",
      "/images/casa-lira/photo-6.jpg",
      "/images/casa-lira/photo-7.jpg",
      "/images/casa-lira/photo-8.jpg",
      "/images/casa-lira/photo-9.jpg",
      "/images/casa-lira/photo-10.jpg",
      "/images/casa-lira/photo-11.jpg",
      "/images/casa-lira/photo-12.jpg",
      "/images/casa-lira/photo-13.jpg",
      "/images/casa-lira/photo-14.jpg",
      "/images/casa-lira/photo-15.jpg",
      "/images/casa-lira/photo-16.jpg",
      "/images/casa-lira/photo-17.jpg",
    ],
    photoSections: [
      {
        label: { it: "Stanza matrimoniale", en: "Master bedroom", fr: "Chambre double", de: "Schlafzimmer" },
        photos: [
          "/images/casa-lira/hero.jpg",
          "/images/casa-lira/photo-1.jpg",
          "/images/casa-lira/photo-2.jpg",
          "/images/casa-lira/photo-16.jpg",
        ],
      },
      {
        label: { it: "Cameretta", en: "Twin bedroom", fr: "Chambre jumelle", de: "Zweites Schlafzimmer" },
        photos: [
          "/images/casa-lira/photo-3.jpg",
          "/images/casa-lira/photo-4.jpg",
          "/images/casa-lira/photo-5.jpg",
          "/images/casa-lira/photo-6.jpg",
        ],
      },
      {
        label: { it: "Bagno", en: "Bathroom", fr: "Salle de bain", de: "Badezimmer" },
        photos: [
          "/images/casa-lira/photo-7.jpg",
          "/images/casa-lira/photo-8.jpg",
          "/images/casa-lira/photo-9.jpg",
          "/images/casa-lira/photo-10.jpg",
        ],
      },
      {
        label: { it: "Soggiorno e cucina", en: "Living room & kitchen", fr: "Séjour et cuisine", de: "Wohnzimmer und Küche" },
        photos: [
          "/images/casa-lira/photo-11.jpg",
          "/images/casa-lira/photo-12.jpg",
          "/images/casa-lira/photo-15.jpg",
          "/images/casa-lira/photo-17.jpg",
        ],
      },
    ],
    heroPhoto: "/images/casa-lira/photo-16.jpg",
    googleBusinessUrl: "https://g.page/r/PLACEHOLDER_CASA_LIRA",
    airbnbUrl: undefined,
    logo: "/images/casa-lira/casa-lira-logo-transparent.webp",
    icon: "/images/casa-lira/casa-lira-logo-transparent.webp",
  },
  {
    slug: "casa-vela",
    name: {
      it: "Casa Vela",
      en: "Casa Vela",
      fr: "Casa Vela",
      de: "Casa Vela",
    },
    tagline: {
      it: "Casa con terrazzo panoramico nel cuore di Mattinata.",
      en: "Private terrace and space for everyone, in the heart of Mattinata.",
      fr: "Terrasse privée et de l'espace pour tous, au cœur de Mattinata.",
      de: "Private Terrasse und Platz für alle, im Herzen von Mattinata.",
    },
    description: {
      it: "Nel cuore di Mattinata, a pochi passi dal corso principale, Casa Vela accoglie fino a 8 persone tra la camera da letto, il soppalco e il living con divani letto. Il grande terrazzo privato è il vero punto di forza: colazioni all'aperto, pranzi in compagnia, serate con l'aria del Gargano. Centro, ristoranti e spiagge sono tutti raggiungibili a piedi. Parcheggio pubblico a 20 metri.",
      en: "In the heart of Mattinata, steps from the main street, Casa Vela sleeps up to 8 between the bedroom, mezzanine and living area with sofa beds. The large private terrace is the real highlight: outdoor breakfasts, lunches together, evenings in the Gargano air. Town, restaurants and beaches are all walkable. Public parking 20 metres away.",
      fr: "Au cœur de Mattinata, à quelques pas de la rue principale, Casa Vela accueille jusqu'à 8 personnes entre la chambre, la mezzanine et le séjour avec canapés-lits. La grande terrasse privée est le vrai point fort : petits-déjeuners en plein air, déjeuners entre amis, soirées dans l'air du Gargano. Le centre, les restaurants et les plages sont tous accessibles à pied. Parking public à 20 mètres.",
      de: "Im Herzen von Mattinata, nur wenige Schritte von der Hauptstraße entfernt, bietet Casa Vela Platz für bis zu 8 Personen zwischen Schlafzimmer, Zwischengeschoss und Wohnbereich mit Schlafsofas. Die große private Terrasse ist der eigentliche Höhepunkt: Frühstück im Freien, gemeinsame Mittagessen, Abende in der Luft des Gargano. Zentrum, Restaurants und Strände sind alle zu Fuß erreichbar. Öffentlicher Parkplatz 20 Meter entfernt.",
    },
    location: "Via Antonio Fogazzaro 36, Mattinata (FG)",
    coordinates: { lat: 41.71013682011915, lng: 16.049828567707333 },
    guests: 8,
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      "wifi",
      "tv",
      "washing_machine",
      "terrace",
      "kitchen",
      "microwave",
      "coffee",
      "iron",
      "hair_dryer",
      "linen",
      "wardrobe",
      "cleaning_kit",
      "personal_welcome",
      "local_tips",
    ],
    photos: [
      "/images/casa-vela/soggiorno1.jpg",
      "/images/casa-vela/soggiorno2.jpg",
      "/images/casa-vela/soggiorno3.jpg",
      "/images/casa-vela/soggiorno4.jpg",
      "/images/casa-vela/soggiorno5.jpg",
      "/images/casa-vela/soggiorno6.jpg",
      "/images/casa-vela/soppalco1.jpg",
      "/images/casa-vela/soppalco2.jpg",
      "/images/casa-vela/soppalco3.jpg",
      "/images/casa-vela/bagno1.jpg",
      "/images/casa-vela/matrimoniale1.jpg",
      "/images/casa-vela/matrimoniale2.jpg",
      "/images/casa-vela/matrimoniale3.jpg",
      "/images/casa-vela/matrimoniale5.jpg",
      "/images/casa-vela/matrimoniale6.jpg",
      "/images/casa-vela/matrimoniale7.jpg",
      "/images/casa-vela/bagnomatrimoniale1.jpg",
      "/images/casa-vela/bagnomatrimoniale2.jpg",
      "/images/casa-vela/bagnomatrimoniale3.jpg",
      "/images/casa-vela/terrazzo1.jpg",
      "/images/casa-vela/terrazzo2.jpg",
      "/images/casa-vela/terrazzo3.jpg",
      "/images/casa-vela/terrazzo4.jpg",
    ],
    photoSections: [
       {
        label: { it: "Terrazzo", en: "Terrace", fr: "Terrasse", de: "Terrasse" },
        photos: [
          "/images/casa-vela/terrazzo1.jpg",
          "/images/casa-vela/terrazzo2.jpg",
          "/images/casa-vela/terrazzo3.jpg",
          "/images/casa-vela/terrazzo4.jpg",
        ],
      },
      {
        label: { it: "Soggiorno", en: "Living room", fr: "Séjour", de: "Wohnzimmer" },
        photos: [
          "/images/casa-vela/soggiorno1.jpg",
          "/images/casa-vela/soggiorno2.jpg",
          "/images/casa-vela/soggiorno3.jpg",
          "/images/casa-vela/soggiorno4.jpg",
          "/images/casa-vela/soggiorno5.jpg",
          "/images/casa-vela/soggiorno6.jpg",
        ],
      },
      {
        label: { it: "Soppalco", en: "Mezzanine", fr: "Mezzanine", de: "Zwischengeschoss" },
        photos: [
          "/images/casa-vela/soppalco1.jpg",
          "/images/casa-vela/soppalco2.jpg",
          "/images/casa-vela/soppalco3.jpg",
        ],
      },
      {
        label: { it: "Bagno 1", en: "Bathroom 1", fr: "Salle de bain 1", de: "Badezimmer 1" },
        photos: ["/images/casa-vela/bagno1.jpg"],
      },
      {
        label: { it: "Camera matrimoniale", en: "Master bedroom", fr: "Chambre double", de: "Schlafzimmer" },
        photos: [
          "/images/casa-vela/matrimoniale1.jpg",
          "/images/casa-vela/matrimoniale2.jpg",
          "/images/casa-vela/matrimoniale5.jpg",
          "/images/casa-vela/matrimoniale6.jpg",
          "/images/casa-vela/matrimoniale7.jpg",
        ],
      },
      {
        label: { it: "Bagno 2", en: "Bathroom 2", fr: "Salle de bain 2", de: "Badezimmer 2" },
        photos: [
          "/images/casa-vela/bagnomatrimoniale1.jpg",
          "/images/casa-vela/bagnomatrimoniale2.jpg",
          "/images/casa-vela/bagnomatrimoniale3.jpg",
        ],
      },
     
    ],
    heroPhoto: "/images/casa-vela/terrazzo1.jpg",
    googleBusinessUrl: "https://g.page/r/PLACEHOLDER_CASA_VELA",
    airbnbUrl: undefined,
    logo: "/images/casa-vela/casa-vela-logo-transparent.webp",
    icon: "/images/casa-vela/casa-vela-logo-transparent.webp",
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
