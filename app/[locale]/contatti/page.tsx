import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import ContactForm from '@/components/sections/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    titleIt: 'Contatti',
    titleEn: 'Contact',
    descriptionIt:
      'Contatta Cosmia Hospitality per richiedere disponibilità nei nostri appartamenti sul Gargano, Puglia. Risposta entro 24 ore.',
    descriptionEn:
      'Contact Cosmia Hospitality to request availability at our Gargano apartments, Puglia. Response within 24 hours.',
    locale,
    path: '/contatti',
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('contact');

  const jsonLd = breadcrumbSchema([
    { name: 'Home', url: `https://cosmiahospitality.it/${locale}` },
    { name: t('pageTitle'), url: `https://cosmiahospitality.it/${locale}/contatti` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content" className="bg-brand-ivory min-h-screen">
        {/* Hero */}
        <div className="bg-brand-navy pt-40 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-white text-4xl lg:text-5xl font-light">
              {t('headline')}
            </h1>
            <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-brand-sand shadow-sm">
              <Suspense fallback={<div className="h-64 animate-pulse bg-brand-ivory rounded-xl" />}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-brand-sand">
                <h2 className="font-serif text-brand-navy text-lg font-semibold mb-4">
                  Cosmia Hospitality
                </h2>
                <div className="space-y-3 text-sm text-slate-600">
                  <a
                    href="mailto:info@cosmiahospitality.it"
                    className="flex items-start gap-3 hover:text-brand-gold transition-colors"
                  >
                    <Mail size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    info@cosmiahospitality.it
                  </a>
                  <a
                    href="tel:+393317728100"
                    className="flex items-start gap-3 hover:text-brand-gold transition-colors"
                  >
                    <Phone size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    +39 331 772 8100
                  </a>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-brand-gold mt-0.5 shrink-0" />
                    <span>
                      Lungomare del Sole 1 A/1<br />
                      71043 Manfredonia (FG) — Puglia
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-2xl p-6">
                <p className="text-brand-navy text-sm leading-relaxed">
                  {locale === 'en'
                    ? 'Prefer WhatsApp? Click the button at the bottom right to start a chat immediately.'
                    : 'Preferisci WhatsApp? Clicca il pulsante in basso a destra per iniziare una chat immediata.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
