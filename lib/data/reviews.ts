export interface Review {
  id: string;
  propertySlug: string;
  authorName: string;
  rating: number;
  date: string;
  textIt: string;
  textEn: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    propertySlug: 'casa-lira',
    authorName: 'Marco T.',
    rating: 5,
    date: '2025-08-15',
    textIt: 'Un\'esperienza indimenticabile. La casa è esattamente come in foto — forse ancora più bella di persona. Fabio è stato disponibilissimo e ci ha consigliato posti che non avremmo mai trovato da soli. Torneremo sicuramente.',
    textEn: 'An unforgettable experience. The house is exactly as in the photos — perhaps even more beautiful in person. Fabio was incredibly helpful and recommended places we would never have found on our own. We will definitely be back.',
  },
  {
    id: '2',
    propertySlug: 'casa-lira',
    authorName: 'Sofia e Luca',
    rating: 5,
    date: '2025-07-22',
    textIt: 'Il Gargano è già di per sé meraviglioso, ma soggiornare a Casa Lira ha reso tutto ancora più speciale. Silenzio, vista, cura nei dettagli. Il massimo.',
    textEn: 'Gargano is already wonderful in itself, but staying at Casa Lira made everything even more special. Silence, view, attention to detail. The best.',
  },
  {
    id: '3',
    propertySlug: 'casa-vela',
    authorName: 'Claudia M.',
    rating: 5,
    date: '2025-09-03',
    textIt: 'Casa Vela è il posto perfetto per chi vuole scoprire il Gargano senza rinunciare al comfort. Tutto curato, tutto pensato. Cosmia Hospitality è davvero un\'altra cosa rispetto ai soliti affitti.',
    textEn: 'Casa Vela is the perfect place for those who want to discover Gargano without giving up comfort. Everything well-kept, everything thoughtful. Cosmia Hospitality is truly on another level compared to typical rentals.',
  },
  {
    id: '4',
    propertySlug: 'casa-vela',
    authorName: 'Roberto F.',
    rating: 5,
    date: '2025-08-30',
    textIt: 'Servizio impeccabile, appartamento bellissimo e una posizione strategica per esplorare il promontorio. Consiglio vivamente Cosmia Hospitality a chiunque voglia vivere il Gargano in modo autentico.',
    textEn: 'Impeccable service, beautiful apartment and a strategic location for exploring the promontory. I highly recommend Cosmia Hospitality to anyone who wants to experience Gargano authentically.',
  },
];

export function getReviewsByProperty(slug: string): Review[] {
  return reviews.filter((r) => r.propertySlug === slug);
}

export function getAggregateRating(slug: string): { ratingValue: number; reviewCount: number } {
  const propertyReviews = getReviewsByProperty(slug);
  if (propertyReviews.length === 0) return { ratingValue: 5, reviewCount: 0 };
  const avg = propertyReviews.reduce((sum, r) => sum + r.rating, 0) / propertyReviews.length;
  return { ratingValue: Math.round(avg * 10) / 10, reviewCount: propertyReviews.length };
}
