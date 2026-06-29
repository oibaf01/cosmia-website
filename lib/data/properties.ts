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
  heroPhoto: string;
  googleBusinessUrl: string;
  airbnbUrl?: string;
}

export const properties: Property[] = [
  {
    slug: 'casa-lira',
    name: {
      it: 'Casa Lira',
      en: 'Casa Lira',
    },
    tagline: {
      it: 'Luce, silenzio e il profumo del Gargano a due passi dal mare',
      en: 'Light, silence and the scent of Gargano steps from the sea',
    },
    description: {
      it: 'Casa Lira è un rifugio autentico nel cuore di Mattinata, uno dei borghi più belli del Gargano. Ogni spazio è stato pensato per farti sentire a casa, con materiali naturali, luce abbondante e un\'atmosfera che invita al relax. Svegliati con la brezza del mare, esplora le calette nascoste a pochi minuti, e torna la sera a goderti il tramonto dal terrazzo.',
      en: 'Casa Lira is an authentic refuge in the heart of Mattinata, one of Gargano\'s most beautiful villages. Every space has been thoughtfully designed to make you feel at home, with natural materials, abundant light, and an atmosphere that invites relaxation. Wake up to the sea breeze, explore hidden coves just minutes away, and return in the evening to enjoy the sunset from the terrace.',
    },
    location: 'Mattinata, Foggia — Puglia',
    coordinates: { lat: 41.7078, lng: 16.0472 },
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: [
      'wifi',
      'air_conditioning',
      'kitchen',
      'parking',
      'terrace',
      'sea_view',
      'washing_machine',
      'tv',
    ],
    photos: [
      '/images/casa-lira/photo-1.jpg',
      '/images/casa-lira/photo-2.jpg',
      '/images/casa-lira/photo-3.jpg',
      '/images/casa-lira/photo-4.jpg',
    ],
    heroPhoto: '/images/casa-lira/hero.jpg',
    googleBusinessUrl: 'https://g.page/r/PLACEHOLDER_CASA_LIRA',
    airbnbUrl: undefined,
  },
  {
    slug: 'casa-vela',
    name: {
      it: 'Casa Vela',
      en: 'Casa Vela',
    },
    tagline: {
      it: 'Un appartamento dove il tempo scorre al ritmo del Gargano',
      en: 'An apartment where time flows to the rhythm of Gargano',
    },
    description: {
      it: 'Casa Vela prende il nome dalla vela che sposta l\'orizzonte — e in questo appartamento, ogni giorno porta una prospettiva nuova. Ambienti luminosi, arredi curati e una posizione strategica per esplorare il Gargano: dalle falesie di Mattinata alle acque cristalline del promontorio, tutto è raggiungibile. Un posto dove tornare ogni sera con qualcosa da raccontare.',
      en: 'Casa Vela takes its name from the sail that moves the horizon — and in this apartment, each day brings a new perspective. Bright rooms, carefully selected furnishings, and a strategic location for exploring Gargano: from the cliffs of Mattinata to the crystal waters of the promontory, everything is within reach. A place to return to each evening with stories to tell.',
    },
    location: 'Gargano, Foggia — Puglia',
    coordinates: { lat: 41.7100, lng: 16.0500 },
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: [
      'wifi',
      'air_conditioning',
      'kitchen',
      'parking',
      'balcony',
      'washing_machine',
      'tv',
    ],
    photos: [
      '/images/casa-vela/photo-1.jpg',
      '/images/casa-vela/photo-2.jpg',
      '/images/casa-vela/photo-3.jpg',
      '/images/casa-vela/photo-4.jpg',
    ],
    heroPhoto: '/images/casa-vela/hero.jpg',
    googleBusinessUrl: 'https://g.page/r/PLACEHOLDER_CASA_VELA',
    airbnbUrl: undefined,
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
