'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Waves, Footprints, Castle, UtensilsCrossed } from 'lucide-react';

const experienceIcons = {
  sea: Waves,
  hikes: Footprints,
  villages: Castle,
  food: UtensilsCrossed,
};

const experienceKeys = ['sea', 'hikes', 'villages', 'food'] as const;

export default function ExperiencesSection() {
  const t = useTranslations('experiences');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section ref={ref} className="bg-brand-ivory py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {t('sectionLabel')}
          </p>
          <h2 className="font-serif text-brand-navy text-3xl lg:text-4xl font-light leading-snug">
            {t('headline')}{' '}
            <span className="font-semibold text-brand-gold">{t('headlineBold')}</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experienceKeys.map((key, index) => {
            const Icon = experienceIcons[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
                className="bg-white rounded-2xl p-8 border border-brand-sand hover:border-brand-gold/40 hover:shadow-lg hover:shadow-brand-gold/8 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-ivory flex items-center justify-center mb-6 group-hover:bg-brand-gold/10 transition-colors duration-300">
                  <Icon size={24} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-brand-navy text-xl font-semibold mb-3">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
