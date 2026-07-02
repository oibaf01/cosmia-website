import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';

const BASE_URL = 'https://cosmiahospitality.it';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/og-default.jpg`;

const OG_LOCALE_MAP: Record<Locale, string> = {
  it: 'it_IT',
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
};

interface PageMetaOptions {
  titleIt: string;
  titleEn: string;
  titleFr?: string;
  titleDe?: string;
  descriptionIt: string;
  descriptionEn: string;
  descriptionFr?: string;
  descriptionDe?: string;
  locale: string;
  path: string;
  ogImage?: string;
  /** Locales to advertise via hreflang alternates. Defaults to every site locale — pass a
   * narrower list (e.g. ['it','en']) for pages that don't have real content in every locale. */
  locales?: Locale[];
}

export function buildMetadata({
  titleIt,
  titleEn,
  titleFr,
  titleDe,
  descriptionIt,
  descriptionEn,
  descriptionFr,
  descriptionDe,
  locale,
  path,
  ogImage,
  locales = routing.locales as unknown as Locale[],
}: PageMetaOptions): Metadata {
  const titles: Record<Locale, string> = { it: titleIt, en: titleEn, fr: titleFr ?? titleEn, de: titleDe ?? titleEn };
  const descriptions: Record<Locale, string> = {
    it: descriptionIt,
    en: descriptionEn,
    fr: descriptionFr ?? descriptionEn,
    de: descriptionDe ?? descriptionEn,
  };

  const activeLocale = (locale as Locale) in titles ? (locale as Locale) : 'it';
  const title = titles[activeLocale];
  const description = descriptions[activeLocale];
  const canonical = `${BASE_URL}/${locale}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: `${title} | Cosmia Hospitality — Gargano`,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}${path}`])),
        'x-default': `${BASE_URL}/it${path}`,
      },
    },
    openGraph: {
      title: `${title} | Cosmia Hospitality`,
      description,
      url: canonical,
      siteName: 'Cosmia Hospitality',
      locale: OG_LOCALE_MAP[activeLocale],
      alternateLocale: locales.filter((l) => l !== activeLocale).map((l) => OG_LOCALE_MAP[l]),
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
