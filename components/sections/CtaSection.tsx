'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  const t = useTranslations('cta');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section ref={ref} className="bg-brand-navy py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative gold line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-gold/30" aria-hidden="true" />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #C8A26E 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, #C8A26E 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-serif text-white text-3xl lg:text-5xl font-light leading-tight">
            {t('headline')}{' '}
            <span className="font-semibold text-brand-gold">{t('headlineBold')}</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="mt-12">
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 px-10 py-5 bg-brand-gold text-brand-navy font-semibold text-sm tracking-wide rounded hover:bg-brand-gold/90 hover:scale-[1.02] transition-all duration-150 shadow-xl shadow-brand-gold/20 group"
            >
              {t('button')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
