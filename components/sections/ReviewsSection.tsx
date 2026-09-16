'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { reviews } from '@/lib/data/reviews';
import ReviewCard from '@/components/ui/ReviewCard';

// Sezione recensioni della homepage: tutte le recensioni reali in griglia
export default function ReviewsSection() {
  const t = useTranslations('reviews');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  if (reviews.length === 0) return null;

  return (
    <section ref={ref} className="bg-brand-sand/40 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div
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
        </m.div>

        {/* Review cards — staggered fade-up, same rhythm as the other sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-2xl lg:max-w-none mx-auto">
          {reviews.map((review, index) => (
            <m.div
              key={review.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 + index * 0.12 }}
            >
              <ReviewCard review={review} />
            </m.div>
          ))}
        </div>

        {/* Trasparenza sulla provenienza + invito a lasciare una recensione */}
        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/recensione"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:underline"
          >
            {t('leaveReview')}
            <ArrowRight size={14} />
          </Link>
          <p className="mt-4 text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t('disclaimer')}
          </p>
        </m.div>
      </div>
    </section>
  );
}
