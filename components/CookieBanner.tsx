'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { X } from 'lucide-react';
import { COOKIE_CONSENT_KEY, CONSENT_EVENT } from '@/lib/consent';

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

// No consent recorded yet → banner must show; treat SSR/pre-hydration as "decided" to avoid a flash.
function getSnapshot() {
  return localStorage.getItem(COOKIE_CONSENT_KEY) === null;
}

function getServerSnapshot() {
  return false;
}

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const tFooter = useTranslations('footer');
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  function handleDecline() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t('dialogLabel')}
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
            className="btn-glass btn-glass-sm btn-glass-gold font-semibold"
          >
            {t('accept')}
          </button>
          <button
            onClick={handleDecline}
            aria-label={t('closeLabel')}
            className="text-white/40 hover:text-white transition-colors cursor-pointer ml-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
