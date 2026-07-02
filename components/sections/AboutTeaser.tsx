'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function AboutTeaser() {
  const t = useTranslations('about');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <section ref={ref} className="bg-brand-ivory pt-12 lg:pt-16 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <m.div
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
          </m.div>

          {/* Visual — finestra ad arco affacciata sul mare, foto intera (3:2 originale,
              nessun crop) in una card semplice come le PropertyCard, senza hover */}
          <m.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="relative aspect-5/6 rounded-2xl overflow-hidden bg-brand-navy border border-brand-sand shadow-sm">
              <Image
                src="/images/hero/window56.jpg"
                alt={t('imageAlt')}
                fill
                sizes="(min-width: 1024px) 384px, 60vw"
                className="object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-brand-gold/20 -z-10"
              aria-hidden="true"
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
