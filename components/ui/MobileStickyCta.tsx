'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';

interface MobileStickyCtaProps {
  href: string;
  label: string;
}

// Docked to the viewport bottom edge; slides away once the in-page "Richiedi
// disponibilità" box or the footer scrolls into view, so the two CTAs never overlap
export default function MobileStickyCta({ href, label }: MobileStickyCtaProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const targets = ['sidebar-request-cta', 'site-footer']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) intersecting.add(entry.target);
        else intersecting.delete(entry.target);
      });
      setVisible(intersecting.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
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
