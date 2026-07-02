'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';

// Scroll-triggered ornamental divider: gold lines grow outward from a central
// cluster of dots. Bridges two same-background sections so the transition reads
// as intentional instead of empty. Matches the Hero ornament styling.
export default function SectionDivider({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  const line = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };
  const dot = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
  };

  return (
    <div ref={ref} className={`flex justify-center ${className}`}>
      <m.div
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        transition={{ staggerChildren: 0.08 }}
        className="flex items-center gap-3"
      >
        <m.div variants={line} className="w-16 sm:w-24 h-px bg-brand-gold/40 origin-right" />
        <m.div variants={dot} className="w-1 h-1 rounded-full bg-brand-gold/60" />
        <m.div variants={dot} className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
        <m.div variants={dot} className="w-1 h-1 rounded-full bg-brand-gold/60" />
        <m.div variants={line} className="w-16 sm:w-24 h-px bg-brand-gold/40 origin-left" />
      </m.div>
    </div>
  );
}
