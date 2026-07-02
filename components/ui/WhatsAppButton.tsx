import { getTranslations } from 'next-intl/server';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '393317728100';

// No client hooks/state — pure static markup, so this ships zero JS to the browser.
// Keyframes for .whatsapp-btn live in globals.css (avoids injecting a <style> tag at runtime).
export default async function WhatsAppButton() {
  const t = await getTranslations('whatsapp');
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('message'))}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('ariaLabel')}
      title={t('tooltipTitle')}
      className="whatsapp-btn group fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform duration-200 cursor-pointer relative"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
      {/* CSS tooltip on hover */}
      <span className="absolute bottom-full mb-3 right-0 hidden group-hover:block bg-brand-navy text-ivory text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg pointer-events-none after:absolute after:bottom-[-4px] after:right-4 after:w-2 after:h-2 after:bg-brand-navy after:rotate-45">
        {t('tooltipText')}
      </span>
    </a>
  );
}
