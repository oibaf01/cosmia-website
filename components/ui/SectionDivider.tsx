'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';

// Full-width navy band that separates two same-background (ivory) sections.
// Navy ties into the Hero / CTA / footer palette; the gold ornament pops against
// it, giving a clear, intentional break instead of a monochrome blend.
export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const line = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };
  const dot = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
  };

  return (
    <div ref={ref} className="relative w-full bg-brand-navy py-12 overflow-hidden">
      {/* Gold hairlines at the band edges, echoing the Hero top accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-brand-gold/25" aria-hidden />
      <div className="absolute bottom-0 inset-x-0 h-px bg-brand-gold/25" aria-hidden />

      {/* Centered ornament */}
      <m.div
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        transition={{ staggerChildren: 0.08 }}
        className="flex items-center justify-center gap-3"
      >
        <m.div variants={line} className="w-20 sm:w-32 h-px bg-brand-gold/50 origin-right" />
        <m.div variants={dot} className="w-1 h-1 rounded-full bg-brand-gold/70" />
        <m.div variants={dot} className="w-2 h-2 rotate-45 bg-brand-gold" />
        <m.div variants={dot} className="w-1 h-1 rounded-full bg-brand-gold/70" />
        <m.div variants={line} className="w-20 sm:w-32 h-px bg-brand-gold/50 origin-left" />
      </m.div>
    </div>
  );
}
