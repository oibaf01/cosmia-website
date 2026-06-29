'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = 'PLACEHOLDER_NUMBER'; // es. 393331234567
const WHATSAPP_MESSAGE = 'Ciao! Vorrei informazioni sugli appartamenti Cosmia Hospitality sul Gargano.';

export default function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-200 cursor-pointer"
      style={{
        animation: 'whatsapp-pulse 4s ease-in-out infinite',
      }}
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
      <style>{`
        @keyframes whatsapp-pulse {
          0%, 85%, 100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3); }
          90% { box-shadow: 0 4px 28px rgba(37, 211, 102, 0.6); }
        }
        @media (prefers-reduced-motion: reduce) {
          .whatsapp-btn { animation: none !important; }
        }
      `}</style>
    </a>
  );
}
