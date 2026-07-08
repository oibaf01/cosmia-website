import { getTranslations } from 'next-intl/server';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '393317728100';

interface WhatsAppButtonProps {
  // Lifts the button above a mobile sticky CTA bar so the two never overlap
  raised?: boolean;
}

// No client hooks/state — pure static markup, so this ships zero JS to the browser.
// Keyframes for .whatsapp-btn live in globals.css (avoids injecting a <style> tag at runtime).
export default async function WhatsAppButton({ raised = false }: WhatsAppButtonProps) {
  const t = await getTranslations('whatsapp');
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('message'))}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('ariaLabel')}
      title={t('tooltipTitle')}
      className={`whatsapp-btn fixed right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform duration-200 cursor-pointer ${raised ? 'bottom-24 lg:bottom-6' : 'bottom-6'}`}
    >
      <MessageCircle size={24} fill="white" strokeWidth={0} />
    </a>
  );
}
