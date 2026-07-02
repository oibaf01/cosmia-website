import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['it', 'en', 'fr', 'de'],
  defaultLocale: 'it',
  localeDetection: false, // ignora Accept-Language del browser, usa solo defaultLocale
});

export type Locale = (typeof routing.locales)[number];
