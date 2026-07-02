import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['it', 'en', 'fr', 'de'],
  defaultLocale: 'it',
});

export type Locale = (typeof routing.locales)[number];
