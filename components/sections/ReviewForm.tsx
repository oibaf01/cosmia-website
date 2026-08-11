'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { m } from 'framer-motion';
import { Star, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { properties } from '@/lib/data/properties';
import { pick } from '@/lib/locale';

// Rileva URL/link nel testo libero (stesso pattern anti-spam del form contatti)
const LINK_REGEX = /https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|it|info|biz|xyz|click)\b/i;
const MIN_COMMENT = 20;

const HIGHLIGHTS = ['cleanliness', 'location', 'communication', 'comfort', 'value', 'checkin'] as const;
type Highlight = (typeof HIGHLIGHTS)[number];

// Isolata fuori dal componente: Date.now() nel render è impuro per il compilatore React
function elapsedSince(t: number | null) {
  return t ? Date.now() - t : 0;
}

export default function ReviewForm() {
  const t = useTranslations('review');
  const locale = useLocale();

  const [property, setProperty] = useState<string>('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showErrors, setShowErrors] = useState(false);

  // Time-trap anti-bot: impostato in un effect, verificato lato server
  const mountedAtRef = useRef<number | null>(null);
  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  // Validazione dei soli campi obbligatori: casa, stelle, nome, testo
  const errors = {
    property: !property ? t('errors.property') : '',
    rating: rating < 1 ? t('errors.rating') : '',
    name: name.trim().length < 2 ? t('errors.name') : '',
    comment:
      comment.trim().length < MIN_COMMENT
        ? t('errors.comment', { min: MIN_COMMENT })
        : LINK_REGEX.test(comment)
          ? t('errors.commentLinks')
          : '',
  };
  const isValid = Object.values(errors).every((e) => !e);

  function toggleHighlight(h: Highlight) {
    setHighlights((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setShowErrors(true);
      return;
    }
    setStatus('loading');
    void send();
  }

  async function send() {
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          property,
          rating,
          highlights,
          comment: comment.trim(),
          consent,
          locale,
          website,
          elapsedMs: elapsedSince(mountedAtRef.current),
        }),
      });
      if (!res.ok) throw new Error('Network error');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <CheckCircle size={48} className="text-brand-gold mb-4" />
        <p className="font-serif text-brand-navy text-2xl">{t('success.title')}</p>
        <p className="mt-3 text-slate-600 max-w-sm leading-relaxed">{t('success.body')}</p>
      </m.div>
    );
  }

  const fieldError = (msg: string) =>
    showErrors && msg ? (
      <p role="alert" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
        <AlertCircle size={14} />
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      {/* Honeypot anti-bot: invisibile agli utenti reali, i bot lo compilano */}
      <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Lascia questo campo vuoto</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* 1. Casa — bottoni larghi, non un menu a tendina: un tap invece di tre */}
      <fieldset>
        <legend className="font-serif text-brand-navy text-xl mb-4">
          {t('steps.property')}
          <span className="text-brand-gold ml-1" aria-hidden="true">*</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {properties.map((p) => {
            const selected = property === p.slug;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setProperty(p.slug)}
                aria-pressed={selected}
                className={`rounded-xl border px-5 py-4 text-left transition-colors ${
                  selected
                    ? 'border-brand-gold bg-brand-gold/10 ring-2 ring-brand-gold/30'
                    : 'border-brand-sand bg-white hover:border-brand-gold/60'
                }`}
              >
                <span className="block font-serif text-brand-navy text-lg">{pick(p.name, locale)}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{p.location}</span>
              </button>
            );
          })}
        </div>
        {fieldError(errors.property)}
      </fieldset>

      {/* 2. Stelle */}
      <fieldset>
        <legend className="font-serif text-brand-navy text-xl mb-4">
          {t('steps.rating')}
          <span className="text-brand-gold ml-1" aria-hidden="true">*</span>
        </legend>
        <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((value) => {
            const active = (hoverRating || rating) >= value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                aria-label={t('starLabel', { count: value })}
                aria-pressed={rating === value}
                className="p-1.5 rounded-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              >
                <Star
                  size={36}
                  className={active ? 'text-brand-gold' : 'text-brand-sand'}
                  fill={active ? 'currentColor' : 'none'}
                  strokeWidth={1.5}
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="ml-3 text-sm text-slate-500">{t(`ratingLabels.${rating}` as 'ratingLabels.5')}</span>
          )}
        </div>
        {fieldError(errors.rating)}
      </fieldset>

      {/* 3. Punti forti — facoltativi, un tap ciascuno: danno specificità senza costare tempo */}
      <fieldset>
        <legend className="font-serif text-brand-navy text-xl mb-1">{t('steps.highlights')}</legend>
        <p className="text-sm text-slate-500 mb-4">{t('steps.highlightsHint')}</p>
        <div className="flex flex-wrap gap-2">
          {HIGHLIGHTS.map((h) => {
            const selected = highlights.includes(h);
            return (
              <button
                key={h}
                type="button"
                onClick={() => toggleHighlight(h)}
                aria-pressed={selected}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selected
                    ? 'border-brand-gold bg-brand-gold/15 text-brand-navy font-medium'
                    : 'border-brand-sand bg-white text-slate-600 hover:border-brand-gold/60'
                }`}
              >
                {t(`highlights.${h}` as 'highlights.cleanliness')}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 4. Testo + nome */}
      <fieldset className="space-y-5">
        <legend className="font-serif text-brand-navy text-xl mb-4">
          {t('steps.comment')}
          <span className="text-brand-gold ml-1" aria-hidden="true">*</span>
        </legend>

        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            maxLength={3000}
            placeholder={t('commentPlaceholder')}
            aria-required="true"
            className="w-full px-4 py-3 border border-brand-sand rounded-lg text-brand-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors bg-white resize-y"
          />
          {fieldError(errors.comment)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="review-name" className="block text-sm font-medium text-brand-navy mb-1.5">
              {t('name')}
              <span className="text-brand-gold ml-1" aria-hidden="true">*</span>
            </label>
            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              autoComplete="name"
              aria-required="true"
              className="w-full px-4 py-3 border border-brand-sand rounded-lg text-brand-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors bg-white"
            />
            {fieldError(errors.name)}
          </div>
          <div>
            <label htmlFor="review-email" className="block text-sm font-medium text-brand-navy mb-1.5">
              {t('email')}
              <span className="text-slate-400 text-xs ml-1.5">{t('optional')}</span>
            </label>
            <input
              id="review-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              autoComplete="email"
              className="w-full px-4 py-3 border border-brand-sand rounded-lg text-brand-navy text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40 focus:border-brand-gold transition-colors bg-white"
            />
          </div>
        </div>
      </fieldset>

      {/* 5. Consenso alla pubblicazione — facoltativo per legge: il consenso deve essere
          libero, quindi senza spunta la recensione arriva comunque, come feedback privato */}
      <div className="rounded-xl border border-brand-sand bg-brand-ivory/60 p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded border-brand-sand text-brand-gold focus:ring-2 focus:ring-brand-gold/40 accent-[#C8A26E]"
          />
          <span className="text-sm text-slate-600 leading-relaxed">
            <span className="font-medium text-brand-navy block mb-1">{t('consent.label')}</span>
            {t('consent.description')}
          </span>
        </label>
        <p className="mt-3 pl-8 text-xs text-slate-400 leading-relaxed">{t('consent.note')}</p>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600 flex items-center gap-1.5">
          <AlertCircle size={16} />
          {t('errors.submit')}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-glass btn-glass-md btn-glass-gold w-full sm:w-auto font-semibold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
      >
        <Send size={16} />
        {status === 'loading' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
