export interface PhotoSection {
  label: { it: string; en: string };
  photos: string[];
}

export interface Property {
  slug: string;
  name: { it: string; en: string };
  tagline: { it: string; en: string };
  description: { it: string; en: string };
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
    },
    tagline: {
      it: "Appartamento moderno nel cuore di Mattinata.",
      en: "Modern apartment in the heart of Mattinata.",
    },
    description: {
      it: "Casa Lira è un appartamento moderno e luminoso in una zona tranquilla di Mattinata, a due minuti a piedi dal centro. Cucina completamente attrezzata, spazi ben organizzati, tutto il necessario per soggiorni di qualsiasi durata — che si tratti di una settimana al mare, di qualche giorno fuori stagione o di un periodo di lavoro da remoto. Le spiagge del Gargano sono facilmente raggiungibili. Parcheggio pubblico a 20 metri.",
      en: "Casa Lira is a bright, modern apartment in a quiet part of Mattinata, two minutes' walk from the centre. Fully equipped kitchen, well-organised spaces, everything you need for any length of stay — a week at the beach, a few days off-season or a remote working stint. Gargano's beaches are easy to reach. Public parking 20 metres away.",
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
        label: { it: "Stanza matrimoniale", en: "Master bedroom" },
        photos: [
          "/images/casa-lira/hero.jpg",
          "/images/casa-lira/photo-1.jpg",
          "/images/casa-lira/photo-2.jpg",
          "/images/casa-lira/photo-16.jpg",
        ],
      },
      {
        label: { it: "Cameretta", en: "Twin bedroom" },
        photos: [
          "/images/casa-lira/photo-3.jpg",
          "/images/casa-lira/photo-4.jpg",
          "/images/casa-lira/photo-5.jpg",
          "/images/casa-lira/photo-6.jpg",
        ],
      },
      {
        label: { it: "Bagno", en: "Bathroom" },
        photos: [
          "/images/casa-lira/photo-7.jpg",
          "/images/casa-lira/photo-8.jpg",
          "/images/casa-lira/photo-9.jpg",
          "/images/casa-lira/photo-10.jpg",
        ],
      },
      {
        label: { it: "Soggiorno e cucina", en: "Living room & kitchen" },
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
    logo: "/images/casa-lira/casaLiraLogo_nobackground.svg",
    icon: "/images/casa-lira/iconLira.svg",
  },
  {
    slug: "casa-vela",
    name: {
      it: "Casa Vela",
      en: "Casa Vela",
    },
    tagline: {
      it: "Casa con terrazzo panoramico nel cuore di Mattinata.",
      en: "Private terrace and space for everyone, in the heart of Mattinata.",
    },
    description: {
      it: "Nel cuore di Mattinata, a pochi passi dal corso principale, Casa Vela accoglie fino a 8 persone tra la camera da letto, il soppalco e il living con divani letto. Il grande terrazzo privato è il vero punto di forza: colazioni all'aperto, pranzi in compagnia, serate con l'aria del Gargano. Centro, ristoranti e spiagge sono tutti raggiungibili a piedi. Parcheggio pubblico a 20 metri.",
      en: "In the heart of Mattinata, steps from the main street, Casa Vela sleeps up to 8 between the bedroom, mezzanine and living area with sofa beds. The large private terrace is the real highlight: outdoor breakfasts, lunches together, evenings in the Gargano air. Town, restaurants and beaches are all walkable. Public parking 20 metres away.",
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
        label: { it: "Terrazzo", en: "Terrace" },
        photos: [
          "/images/casa-vela/terrazzo1.jpg",
          "/images/casa-vela/terrazzo2.jpg",
          "/images/casa-vela/terrazzo3.jpg",
          "/images/casa-vela/terrazzo4.jpg",
        ],
      },
      {
        label: { it: "Soggiorno", en: "Living room" },
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
        label: { it: "Soppalco", en: "Mezzanine" },
        photos: [
          "/images/casa-vela/soppalco1.jpg",
          "/images/casa-vela/soppalco2.jpg",
          "/images/casa-vela/soppalco3.jpg",
        ],
      },
      {
        label: { it: "Bagno 1", en: "Bathroom 1" },
        photos: ["/images/casa-vela/bagno1.jpg"],
      },
      {
        label: { it: "Camera matrimoniale", en: "Master bedroom" },
        photos: [
          "/images/casa-vela/matrimoniale1.jpg",
          "/images/casa-vela/matrimoniale2.jpg",
          "/images/casa-vela/matrimoniale5.jpg",
          "/images/casa-vela/matrimoniale6.jpg",
          "/images/casa-vela/matrimoniale7.jpg",
        ],
      },
      {
        label: { it: "Bagno 2", en: "Bathroom 2" },
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
    logo: "/images/casa-vela/casaVelaLogo_nobackground.svg",
    icon: "/images/casa-vela/iconVela.svg",
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
