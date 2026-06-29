import type { Metadata } from 'next';

const BASE_URL = 'https://cosmiahospitality.it';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/og-default.jpg`;

interface PageMetaOptions {
  titleIt: string;
  titleEn: string;
  descriptionIt: string;
  descriptionEn: string;
  locale: string;
  path: string;
  ogImage?: string;
}

export function buildMetadata({
  titleIt,
  titleEn,
  descriptionIt,
  descriptionEn,
  locale,
  path,
  ogImage,
}: PageMetaOptions): Metadata {
  const isIt = locale === 'it';
  const title = isIt ? titleIt : titleEn;
  const description = isIt ? descriptionIt : descriptionEn;
  const canonical = `${BASE_URL}/${locale}${path}`;
  const alternate = `${BASE_URL}/${isIt ? 'en' : 'it'}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: `${title} | Cosmia Hospitality — Gargano`,
    description,
    alternates: {
      canonical,
      languages: {
        it: `${BASE_URL}/it${path}`,
        en: `${BASE_URL}/en${path}`,
        'x-default': `${BASE_URL}/it${path}`,
      },
    },
    openGraph: {
      title: `${title} | Cosmia Hospitality`,
      description,
      url: canonical,
      siteName: 'Cosmia Hospitality',
      locale: isIt ? 'it_IT' : 'en_US',
      alternateLocale: isIt ? 'en_US' : 'it_IT',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Cosmia Hospitality`,
      description,
      images: [image],
    },
    other: {
      'geo.region': 'IT-FG',
      'geo.placename': 'Gargano, Foggia, Puglia',
      'geo.position': '41.7078;16.0472',
      ICBM: '41.7078, 16.0472',
    },
  };
}
