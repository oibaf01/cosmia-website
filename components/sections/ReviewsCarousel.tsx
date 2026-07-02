'use client';

import { useState, useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '@/lib/data/reviews';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} su 5 stelle`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-brand-gold fill-brand-gold' : 'text-slate-300'}
        />
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const total = reviews.length;

  function prev() {
    setCurrent((c) => (c - 1 + total) % total);
  }
  function next() {
    setCurrent((c) => (c + 1) % total);
  }

  const review = reviews[current];
  const text = locale === 'en' ? review.textEn : review.textIt;

  return (
    <section ref={ref} className="bg-brand-sand py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {t('sectionLabel')}
          </p>
          <h2 className="font-serif text-brand-navy text-3xl lg:text-4xl font-light">
            {t('headline')}
          </h2>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Review card */}
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-brand-sand/60">
            <StarRating rating={review.rating} />
            <blockquote className="mt-6 font-serif text-brand-navy text-xl lg:text-2xl font-light leading-relaxed">
              &ldquo;{text}&rdquo;
            </blockquote>
            <footer className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                <span className="text-brand-gold text-xs font-bold">
                  {review.authorName[0]}
                </span>
              </div>
              <div>
                <cite className="not-italic font-semibold text-brand-navy text-sm">
                  {review.authorName}
                </cite>
                <p className="text-slate-400 text-xs">
                  {review.propertySlug === 'casa-lira' ? 'Casa Lira' : 'Casa Vela'}
                </p>
              </div>
            </footer>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Recensione precedente"
              className="w-10 h-10 rounded-full border border-brand-navy/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors duration-150 cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-slate-400 text-sm">
              {current + 1} / {total}
            </span>
            <button
              onClick={next}
              aria-label="Recensione successiva"
              className="w-10 h-10 rounded-full border border-brand-navy/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors duration-150 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </m.div>
      </div>
    </section>
  );
}
