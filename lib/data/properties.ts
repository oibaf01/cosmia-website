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
  // Codici identificativi obbligatori per legge (CIN nazionale, CIR regionale)
  cin?: string;
  cir?: string;
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
      it: "In una zona tranquilla di Mattinata, a soli due minuti a piedi da Corso Matino, Casa Lira è un appartamento moderno e luminoso pensato per chi vuole vivere il Gargano con comfort e semplicità. Design contemporaneo e spazi ben organizzati la rendono ideale per coppie, famiglie o soggiorni di media durata — una settimana al mare, qualche giorno fuori stagione o un periodo di lavoro da remoto. Cucina completamente attrezzata, zona pranzo conviviale e camere confortevoli offrono tutto il necessario per sentirsi a casa fin dal primo giorno. Le spiagge del Gargano sono facilmente raggiungibili, il centro è a pochi minuti a piedi, e il parcheggio pubblico si trova a soli 20 metri.",
      en: "In a quiet part of Mattinata, just a two-minute walk from Corso Matino, Casa Lira is a bright, modern apartment designed for those who want to experience the Gargano with comfort and simplicity. Contemporary design and well-organised spaces make it ideal for couples, families or medium-length stays — a week at the beach, a few days off-season or a stretch of remote work. A fully equipped kitchen, a welcoming dining area and comfortable bedrooms give you everything you need to feel at home from day one. Gargano's beaches are easy to reach, the centre is a few minutes' walk away, and public parking is just 20 metres from the door.",
      fr: "Dans un quartier calme de Mattinata, à seulement deux minutes à pied de Corso Matino, Casa Lira est un appartement moderne et lumineux pensé pour vivre le Gargano avec confort et simplicité. Design contemporain et espaces bien organisés en font le choix idéal pour les couples, les familles ou les séjours de moyenne durée — une semaine à la mer, quelques jours hors saison ou une période de télétravail. Cuisine entièrement équipée, coin repas convivial et chambres confortables offrent tout le nécessaire pour se sentir chez soi dès le premier jour. Les plages du Gargano sont facilement accessibles, le centre est à quelques minutes à pied, et le parking public se trouve à seulement 20 mètres.",
      de: "In einem ruhigen Teil von Mattinata, nur zwei Gehminuten von der Corso Matino entfernt, ist Casa Lira eine helle, moderne Wohnung für alle, die den Gargano mit Komfort und Einfachheit erleben möchten. Zeitgemäßes Design und gut organisierte Räume machen sie ideal für Paare, Familien oder mittellange Aufenthalte — eine Woche am Meer, ein paar Tage außerhalb der Saison oder eine Zeit im Homeoffice. Eine voll ausgestattete Küche, ein einladender Essbereich und komfortable Schlafzimmer bieten alles, was man braucht, um sich vom ersten Tag an wie zu Hause zu fühlen. Die Strände des Gargano sind leicht erreichbar, das Zentrum ist wenige Minuten zu Fuß entfernt, und der öffentliche Parkplatz liegt nur 20 Meter entfernt.",
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
      "air_conditioning",
      "kitchen",
      "workspace",
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
      it: "Nel cuore di Mattinata, a soli due minuti dal corso principale, Casa Vela è la soluzione ideale per una o più famiglie e gruppi fino a 8 ospiti. Gli ambienti sono ampi e ben distribuiti tra camera da letto, soppalco e zona living con divani letto, per garantire comfort e praticità in ogni tipo di soggiorno. Il vero punto di forza è il grande terrazzo privato: perfetto per colazioni all'aperto, pranzi in compagnia e serate rilassanti nell'aria del Gargano, in totale tranquillità. L'appartamento si trova in una traversa tranquilla e poco trafficata, a pochi passi da centro, ristoranti e spiagge, con parcheggio pubblico a soli 20 metri — il centro di Mattinata senza rinunciare alla privacy.",
      en: "In the heart of Mattinata, just two minutes from the main street, Casa Vela is the ideal choice for one or more families and groups of up to 8 guests. The rooms are spacious and well laid out across the bedroom, mezzanine and living area with sofa beds, for comfort and practicality in every kind of stay. The real highlight is the large private terrace: perfect for outdoor breakfasts, lunches with friends and relaxed evenings in the Gargano air, in complete peace and quiet. The apartment sits on a quiet, low-traffic side street, just steps from the centre, restaurants and beaches, with public parking only 20 metres away — Mattinata's centre without giving up your privacy.",
      fr: "Au cœur de Mattinata, à seulement deux minutes de la rue principale, Casa Vela est la solution idéale pour une ou plusieurs familles et des groupes jusqu'à 8 personnes. Les espaces sont vastes et bien répartis entre la chambre, la mezzanine et le séjour avec canapés-lits, pour un confort et une praticité adaptés à tous les séjours. Le véritable atout est la grande terrasse privée : parfaite pour les petits-déjeuners en plein air, les déjeuners entre amis et les soirées détendues dans l'air du Gargano, en toute tranquillité. L'appartement se trouve dans une rue calme et peu passante, à quelques pas du centre, des restaurants et des plages, avec un parking public à seulement 20 mètres — le centre de Mattinata sans renoncer à son intimité.",
      de: "Im Herzen von Mattinata, nur zwei Minuten von der Hauptstraße entfernt, ist Casa Vela die ideale Lösung für eine oder mehrere Familien und Gruppen bis zu 8 Personen. Die Räume sind großzügig und gut aufgeteilt zwischen Schlafzimmer, Zwischengeschoss und Wohnbereich mit Schlafsofas — für Komfort und Praktikabilität bei jedem Aufenthalt. Der wahre Trumpf ist die große private Terrasse: perfekt für Frühstück im Freien, gemeinsame Mittagessen und entspannte Abende in der Luft des Gargano, in völliger Ruhe. Die Wohnung liegt in einer ruhigen, wenig befahrenen Seitenstraße, nur wenige Schritte von Zentrum, Restaurants und Stränden entfernt, mit öffentlichem Parkplatz nur 20 Meter entfernt — das Zentrum von Mattinata, ohne auf Privatsphäre zu verzichten.",
    },
    location: "Via Antonio Fogazzaro 36, Mattinata (FG)",
    coordinates: { lat: 41.71013682011915, lng: 16.049828567707333 },
    guests: 8,
    bedrooms: 2,
    bathrooms: 2,
    amenities: [
      "tv",
      "washing_machine",
      "terrace",
      "kitchen",
      "workspace",
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
      "/images/casa-vela/terrazzo1.jpg",
      "/images/casa-vela/terrazzo2.jpg",
      "/images/casa-vela/terrazzo3.jpg",
      "/images/casa-vela/terrazzo4.jpg",
      "/images/casa-vela/soggiorno1.jpg",
      "/images/casa-vela/soggiorno2.jpg",
      "/images/casa-vela/soggiorno3.jpg",
      "/images/casa-vela/soggiorno4.jpg",
      "/images/casa-vela/soggiorno5.jpg",
      "/images/casa-vela/soggiorno6.jpg",
      "/images/casa-vela/soggiorno7.jpg",
      "/images/casa-vela/soggiorno8.jpg",
      "/images/casa-vela/scalasoppalco1.jpg",
      "/images/casa-vela/soppalco1.jpg",
      "/images/casa-vela/soppalco2.jpg",
      "/images/casa-vela/matrimoniale1.jpg",
      "/images/casa-vela/matrimoniale2.jpg",
      "/images/casa-vela/matrimoniale3.jpg",
      "/images/casa-vela/bagno1.jpg",
      "/images/casa-vela/bagno2.jpg",
      "/images/casa-vela/bagnomatrimoniale1.jpg",
      "/images/casa-vela/bagnomatrimoniale2.jpg",
      "/images/casa-vela/bagnomatrimoniale3.jpg",
      "/images/casa-vela/corridoio1.jpg",
      "/images/casa-vela/corridoio2.jpg",
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
          "/images/casa-vela/soggiorno7.jpg",
          "/images/casa-vela/soggiorno8.jpg",
        ],
      },
      {
        label: { it: "Soppalco", en: "Mezzanine", fr: "Mezzanine", de: "Zwischengeschoss" },
        photos: [
          "/images/casa-vela/scalasoppalco1.jpg",
          "/images/casa-vela/soppalco1.jpg",
          "/images/casa-vela/soppalco2.jpg",
        ],
      },
      {
        label: { it: "Camera matrimoniale", en: "Master bedroom", fr: "Chambre double", de: "Schlafzimmer" },
        photos: [
          "/images/casa-vela/matrimoniale1.jpg",
          "/images/casa-vela/matrimoniale2.jpg",
          "/images/casa-vela/matrimoniale3.jpg",
        ],
      },
      {
        label: { it: "Bagno 1", en: "Bathroom 1", fr: "Salle de bain 1", de: "Badezimmer 1" },
        photos: ["/images/casa-vela/bagno1.jpg", "/images/casa-vela/bagno2.jpg"],
      },
      {
        label: { it: "Bagno 2", en: "Bathroom 2", fr: "Salle de bain 2", de: "Badezimmer 2" },
        photos: [
          "/images/casa-vela/bagnomatrimoniale1.jpg",
          "/images/casa-vela/bagnomatrimoniale2.jpg",
          "/images/casa-vela/bagnomatrimoniale3.jpg",
        ],
      },
      {
        label: { it: "Corridoio", en: "Hallway", fr: "Couloir", de: "Flur" },
        photos: ["/images/casa-vela/corridoio1.jpg", "/images/casa-vela/corridoio2.jpg"],
      },
    ],
    heroPhoto: "/images/casa-vela/terrazzo1.jpg",
    googleBusinessUrl: "https://g.page/r/PLACEHOLDER_CASA_VELA",
    airbnbUrl: undefined,
    cin: "IT071031B400129220",
    cir: "071031B400129220",
    logo: "/images/casa-vela/casa-vela-logo-transparent.webp",
    icon: "/images/casa-vela/casa-vela-logo-transparent.webp",
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
