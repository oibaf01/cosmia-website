import { useTranslations, useLocale } from 'next-intl';
import { Quote, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getPropertyBySlug } from '@/lib/data/properties';
import { pick } from '@/lib/locale';
import type { Review } from '@/lib/data/reviews';

interface ReviewCardProps {
  review: Review;
  // Nasconde la casa del soggiorno quando la card è già nella pagina di quella casa
  showStay?: boolean;
}

// Card recensione: testo, punti forti, autore. Nessun voto mostrato per scelta.
export default function ReviewCard({ review, showStay = true }: ReviewCardProps) {
  const t = useTranslations('reviews');
  const tHighlights = useTranslations('review.highlights');
  const locale = useLocale();

  const isTranslated = locale !== review.originalLocale;
  // Casa ancora pubblicata → link; tolta da properties.ts → etichetta "non più disponibile"
  const isStayAvailable = Boolean(getPropertyBySlug(review.stay.slug));

  return (
    <figure className="h-full flex flex-col bg-white rounded-2xl p-8 border border-brand-sand hover:border-brand-gold/40 transition-colors duration-300">
      <Quote size={28} className="text-brand-gold/60 fill-brand-gold/15 mb-5" aria-hidden="true" />

      <blockquote
        lang={isTranslated ? locale : review.originalLocale}
        className="font-serif text-brand-navy text-lg font-light leading-relaxed"
      >
        {pick(review.text, locale)}
      </blockquote>

      {isTranslated && <p className="mt-3 text-xs italic text-slate-400">{t('translated')}</p>}

      {/* Punti forti scelti dall'ospite */}
      {review.highlights.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {review.highlights.map((h) => (
            <li
              key={h}
              className="px-2.5 py-1 rounded-full bg-brand-ivory text-[11px] font-medium text-brand-navy/70"
            >
              {tHighlights(h)}
            </li>
          ))}
        </ul>
      )}

      <figcaption className="mt-auto pt-6 flex items-center gap-3">
        <span
          className="w-9 h-9 shrink-0 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold text-sm font-semibold"
          aria-hidden="true"
        >
          {review.authorName[0]}
        </span>
        <span className="min-w-0">
          <cite className="block not-italic font-semibold text-brand-navy text-sm">
            {review.authorName}
          </cite>
          <span className="flex flex-wrap items-center gap-x-1.5 text-xs text-slate-400">
            {showStay && isStayAvailable && (
              <Link
                href={`/appartamenti/${review.stay.slug}`}
                className="inline-flex items-center gap-1 text-brand-gold hover:underline"
              >
                {review.stay.name}
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            )}
            {showStay && !isStayAvailable && (
              <span>
                {review.stay.name} · {t('unavailable')}
              </span>
            )}
            {showStay && review.source === 'booking' && <span aria-hidden="true">·</span>}
            {review.source === 'booking' && <span>{t('viaBooking')}</span>}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
