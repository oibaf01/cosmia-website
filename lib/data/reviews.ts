import type { Locale } from '@/i18n/routing';
import type { Localized } from '@/lib/locale';

// Punti forti selezionabili nel form /recensione (stesse chiavi di messages review.highlights)
export type ReviewHighlight = 'cleanliness' | 'location' | 'communication' | 'comfort' | 'value' | 'checkin';

// Recensione reale di Cosmia Hospitality. Nessun voto: per scelta non si espongono stelle/punteggi.
export interface Review {
  id: string;
  authorName: string;
  // Casa del soggiorno. Il nome è salvato qui perché resti visibile anche dopo che la casa
  // viene tolta da properties.ts (in quel caso la card la segna come non più disponibile)
  stay: { slug: string; name: string };
  source: 'website' | 'booking';
  // Lingua in cui l'ospite ha scritto: le altre versioni sono traduzioni e vengono etichettate
  originalLocale: Locale;
  text: Localized;
  highlights: ReviewHighlight[];
}

// Solo recensioni reali. Quelle dal form richiedono CONSENSO ALLA PUBBLICAZIONE: SÌ.
// authorName: solo il nome di battesimo, mai il cognome. Nessun dato di prenotazione negli id.
export const reviews: Review[] = [
  {
    id: 'website-2026-ismaele',
    authorName: 'Ismaele',
    stay: { slug: 'casa-lira', name: 'Casa Lira' },
    source: 'website',
    originalLocale: 'it',
    text: {
      it: 'Casa bellissima ottima posizione e ottima accoglienza!!! Posto da consigliare a chi vuole fare una vacanza in tranquillità e senza pensieri!!!',
      en: 'Beautiful house, great location and a great welcome! A place to recommend to anyone who wants a relaxed, worry-free holiday!',
      fr: 'Très belle maison, excellent emplacement et excellent accueil ! Un endroit à recommander à tous ceux qui veulent des vacances tranquilles et sans soucis !',
      de: 'Wunderschönes Haus, tolle Lage und ein herzlicher Empfang! Ein Ort, den man allen empfehlen kann, die einen ruhigen und sorgenfreien Urlaub möchten!',
    },
    highlights: ['comfort', 'value', 'cleanliness', 'checkin', 'location', 'communication'],
  },
  {
    id: 'website-2026-ilia',
    authorName: 'Ilia',
    stay: { slug: 'casa-vela', name: 'Casa Vela' },
    source: 'website',
    originalLocale: 'it',
    text: {
      it: 'Ottima accoglienza, molto vicina al centro e al supermercato, circondati da vicoli caratteristici della zona e terrazza piacevole da condividere in compagnia',
      en: 'Great welcome, very close to the town centre and the supermarket, surrounded by the charming local alleyways, with a lovely terrace to share with friends.',
      fr: 'Excellent accueil, très proche du centre et du supermarché, entouré des ruelles typiques du quartier, avec une agréable terrasse à partager entre amis.',
      de: 'Herzlicher Empfang, ganz nah am Zentrum und am Supermarkt, umgeben von den typischen Gassen der Gegend, mit einer schönen Terrasse, die man gemeinsam genießen kann.',
    },
    highlights: ['location', 'communication', 'value'],
  },
  {
    id: 'booking-2026-nunzia',
    authorName: 'Nunzia',
    stay: { slug: 'casa-vela', name: 'Casa Vela' },
    source: 'booking',
    originalLocale: 'it',
    text: {
      it: 'Posizione strategica per raggiungere le città limitrofe; la struttura si trova a pochi passi dal centro storico e dai servizi utili per un soggiorno come supermercati e bar. Lo staff disponibile ci ha accolti con cortesia e massima serietà.',
      en: 'A strategic location for reaching the nearby towns; the property is just a few steps from the historic centre and from useful services such as supermarkets and cafés. The helpful staff welcomed us with courtesy and the utmost professionalism.',
      fr: 'Emplacement stratégique pour rejoindre les villes voisines ; le logement se trouve à quelques pas du centre historique et des services utiles pour un séjour, comme les supermarchés et les bars. Le personnel, disponible, nous a accueillis avec courtoisie et un grand sérieux.',
      de: 'Strategische Lage, um die umliegenden Orte zu erreichen; die Unterkunft liegt nur wenige Schritte von der Altstadt und von nützlichen Einrichtungen wie Supermärkten und Bars entfernt. Das hilfsbereite Team hat uns freundlich und äußerst zuverlässig empfangen.',
    },
    highlights: [],
  },
];

// Recensioni dei soggiorni in una specifica casa
export function getReviewsByProperty(slug: string): Review[] {
  return reviews.filter((r) => r.stay.slug === slug);
}
