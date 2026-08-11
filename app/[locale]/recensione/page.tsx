import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/CookieBanner';
import ReviewForm from '@/components/sections/ReviewForm';
import { Clock } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const meta = buildMetadata({
    titleIt: 'Lascia una recensione',
    titleEn: 'Leave a review',
    titleFr: 'Laisser un avis',
    titleDe: 'Bewertung abgeben',
    descriptionIt: 'Racconta il tuo soggiorno negli appartamenti Cosmia Hospitality sul Gargano. Due minuti, non di più.',
    descriptionEn: 'Tell us about your stay at Cosmia Hospitality apartments in the Gargano. Two minutes, no more.',
    descriptionFr: 'Racontez votre séjour dans les appartements Cosmia Hospitality au Gargano. Deux minutes, pas plus.',
    descriptionDe: 'Erzählen Sie von Ihrem Aufenthalt in den Cosmia Hospitality Wohnungen im Gargano. Zwei Minuten, nicht mehr.',
    locale,
    path: '/recensione',
  });

  // Pagina raggiungibile solo dal link inviato agli ospiti: fuori dall'indice e dalla sitemap
  return { ...meta, robots: { index: false, follow: false } };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ReviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('review');

  return (
    <>
      {/* alwaysDark: l'hero di questa pagina è chiaro, senza forzare il navy il menu
          resterebbe bianco su bianco */}
      <Header alwaysDark />
      <main id="main-content" className="bg-brand-ivory min-h-screen">
        <div className="bg-brand-navy pt-36 pb-14 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-white text-4xl lg:text-5xl font-light">{t('headline')}</h1>
            <p className="mt-4 text-white/60 text-lg leading-relaxed">{t('subtitle')}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/70">
              <Clock size={14} className="text-brand-gold" />
              {t('timeHint')}
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-brand-sand shadow-sm">
            <ReviewForm />
          </div>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
