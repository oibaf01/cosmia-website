import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { properties } from '@/lib/data/properties';

const BASE_URL = 'https://cosmiahospitality.it';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;

  const staticRoutes = ['', '/appartamenti', '/chi-siamo', '/contatti', '/privacy'];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1.0 : route === '/appartamenti' ? 0.9 : 0.7,
    }))
  );

  const propertyEntries: MetadataRoute.Sitemap = properties.flatMap((property) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/appartamenti/${property.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))
  );

  return [...staticEntries, ...propertyEntries];
}
