'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

// WebGL canvas needs window — no SSR
const CompassScene = dynamic(() => import('@/components/ui/CompassScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-brand-navy" />,
});

export default function AboutTeaser() {
  const t = useTranslations('about');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section ref={ref} className="bg-brand-ivory py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-6">
              {t('sectionLabel')}
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-light leading-snug mb-8">
              <span className="text-brand-navy">{t('headline')}</span>
              <br />
              <span className="text-brand-gold font-semibold">{t('headlineBold')}</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-prose">
              {t('body')}
            </p>
            <Link
              href="/chi-siamo"
              className="inline-flex items-center gap-2 text-brand-navy font-semibold text-sm tracking-wide hover:text-brand-gold transition-colors duration-150 group"
            >
              {t('cta')}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-150"
              />
            </Link>
          </motion.div>

          {/* Visual — decorative gold block */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-brand-navy overflow-hidden">
              {inView && <CompassScene />}
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-brand-gold/20 -z-10"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
