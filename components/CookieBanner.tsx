'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';

const COOKIE_KEY = 'cosmia_cookie_consent';

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const tFooter = useTranslations('footer');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-40 bg-brand-navy/98 backdrop-blur-sm border-t border-brand-gold/20 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
          {t('message')}{' '}
          <Link href="/privacy" className="text-brand-gold hover:underline">
            {tFooter('privacy')}
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
          >
            {t('decline')}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-brand-gold text-brand-navy text-sm font-semibold rounded hover:bg-brand-gold/90 transition-colors cursor-pointer"
          >
            {t('accept')}
          </button>
          <button
            onClick={handleDecline}
            aria-label="Chiudi"
            className="text-white/40 hover:text-white transition-colors cursor-pointer ml-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
