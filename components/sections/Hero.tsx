'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Three depth layers moving at different speeds → genuine Z parallax
  const bgY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);   // far back
  const bgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const blobY     = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);   // mid
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);   // front (counter)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.65]);

  return (
    <section
      ref={containerRef}
      className="relative h-dvh min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-navy"
      aria-label="Hero section"
    >
      {/* Layer 1 — Background image (furthest, slowest) */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="w-full h-full"
          aria-hidden="true"
          style={{
            backgroundImage: `url('/images/hero/gargano-hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>

      {/* Layer 2 — Overlay (dims on scroll) */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-brand-navy"
        aria-hidden="true"
      />

      {/* Layer 2b — Decorative gold blobs (mid depth, faster than bg) */}
      <motion.div
        style={{ y: blobY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-[15%] w-64 h-64 rounded-full bg-brand-gold/6 blur-[80px]" />
        <div className="absolute bottom-1/3 right-[12%] w-48 h-48 rounded-full bg-brand-gold/4 blur-[60px]" />
      </motion.div>

      {/* Gold accent line — top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-gold/30" aria-hidden="true" />

      {/* Layer 3 — Content (front, counter-scrolls upward) */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-8"
        >
          Gargano — Puglia — Italia
        </motion.p>

        <h1 className="font-serif text-white leading-tight">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="block text-4xl sm:text-5xl lg:text-7xl font-light"
          >
            {t('headline')}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
            className="block text-4xl sm:text-5xl lg:text-7xl font-semibold text-brand-gold"
          >
            {t('headlineBold')}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
          className="mt-8 text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/appartamenti"
            className="px-8 py-4 bg-brand-gold text-brand-navy font-semibold text-sm tracking-wide rounded hover:bg-brand-gold/90 hover:scale-[1.03] transition-all duration-200 shadow-lg shadow-brand-gold/25"
          >
            {t('cta')}
          </Link>
          <Link
            href="/contatti"
            className="px-8 py-4 border border-white/30 text-white font-medium text-sm tracking-wide rounded hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
          >
            {t('ctaContact')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
