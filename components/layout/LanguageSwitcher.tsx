'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const otherLocales = routing.locales.filter((l) => l !== locale) as Locale[];

  function switchLocale(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`text-sm font-medium tracking-widest uppercase transition-colors duration-150 hover:text-brand-gold cursor-pointer ${className}`}
      >
        {locale.toUpperCase()}
      </button>
      <AnimatePresence>
        {open && (
          <m.ul
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 py-1 min-w-16 bg-brand-navy border border-white/10 rounded-lg shadow-xl z-50"
          >
            {otherLocales.map((l) => (
              <li key={l} role="option" aria-selected={false}>
                <button
                  onClick={() => switchLocale(l)}
                  className="w-full px-4 py-2 text-left text-sm font-medium tracking-widest uppercase text-white/70 hover:text-brand-gold hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {l.toUpperCase()}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
