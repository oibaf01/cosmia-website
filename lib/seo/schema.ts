import { type Property } from '@/lib/data/properties';
import { type Review } from '@/lib/data/reviews';
import { type FaqItem } from '@/lib/data/faq';
import { pick } from '@/lib/locale';

const BASE_URL = 'https://cosmiahospitality.it';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Cosmia Hospitality',
    description:
      'Cosmia Hospitality gestisce appartamenti vacanza a Mattinata, sul Gargano, Puglia. Due case, un territorio autentico e la conoscenza di chi ci vive.',
    url: BASE_URL,
    logo: `${BASE_URL}/logos/logo_full_gold.svg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mattinata',
      addressRegion: 'FG',
      addressCountry: 'IT',
      postalCode: '71030',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.7078',
      longitude: '16.0472',
    },
    areaServed: 'Gargano, Puglia, Italia',
    knowsLanguage: ['it', 'en', 'fr', 'de'],
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cosmia Hospitality',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/appartamenti`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function propertySchema(property: Property, locale: string, aggregateRating?: { ratingValue: number; reviewCount: number }) {
  const name = pick(property.name, locale);
  const description = pick(property.description, locale);
  const url = `${BASE_URL}/${locale}/appartamenti/${property.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: `${name} — Cosmia Hospitality`,
    description,
    url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location.split(',')[0].trim(),
      addressRegion: 'FG',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.coordinates.lat.toString(),
      longitude: property.coordinates.lng.toString(),
    },
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: property.guests,
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    ...(aggregateRating && aggregateRating.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: aggregateRating.ratingValue,
            reviewCount: aggregateRating.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function reviewsSchema(propertyReviews: Review[], propertyName: string) {
  return propertyReviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Apartment',
      name: propertyName,
    },
    author: {
      '@type': 'Person',
      name: review.authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
    },
    reviewBody: review.textIt,
    datePublished: review.date,
  }));
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: FaqItem[], locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: pick(item.question, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: pick(item.answer, locale),
      },
    })),
  };
}

export function itemListSchema(properties: Property[], locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: properties.map((property, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: pick(property.name, locale),
      url: `${BASE_URL}/${locale}/appartamenti/${property.slug}`,
    })),
  };
}
