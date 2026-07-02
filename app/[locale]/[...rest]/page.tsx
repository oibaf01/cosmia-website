import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';

// Catches any URL under /[locale]/... that doesn't match a real page. Without this,
// Next.js can't resolve which [locale] segment "won" and falls back to the root
// app/not-found.tsx (single-language). Calling setRequestLocale here before notFound()
// lets the nested app/[locale]/not-found.tsx render with the correct locale.
export default async function CatchAll({
  params,
}: {
  params: Promise<{ locale: string; rest: string[] }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  notFound();
}
