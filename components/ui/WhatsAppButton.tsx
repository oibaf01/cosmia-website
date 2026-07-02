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
      className="whatsapp-btn fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-200 cursor-pointer"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
}
