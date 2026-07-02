import type { Locale } from '@/i18n/routing';

export type Localized = Record<Locale, string>;

export function pick(dict: Localized, locale: string): string {
  return dict[locale as Locale] ?? dict.it;
}
