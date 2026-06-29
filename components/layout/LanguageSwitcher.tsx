'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { type Locale } from '@/i18n/routing';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale: Locale = locale === 'it' ? 'en' : 'it';

  function switchLocale() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className={`text-sm font-medium tracking-widest uppercase transition-colors duration-150 hover:text-brand-gold cursor-pointer ${className}`}
      aria-label={`Switch to ${otherLocale === 'it' ? 'Italian' : 'English'}`}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
