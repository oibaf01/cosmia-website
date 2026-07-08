'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

interface MobileStickyCtaProps {
  href: string;
  label: string;
}

// Docked to the viewport bottom edge; slides away once the footer scrolls into view
export default function MobileStickyCta({ href, label }: MobileStickyCtaProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-30 px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+1rem)] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link
        href={href}
        className="block w-full text-center px-6 py-4 bg-brand-gold text-brand-navy font-semibold text-sm rounded-xl shadow-xl shadow-brand-gold/30"
      >
        {label}
      </Link>
    </div>
  );
}
