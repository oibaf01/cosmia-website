import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import { Heart, Compass, Phone } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    titleIt: 'Chi Siamo',
    titleEn: 'About Us',
    descriptionIt:
      'Cosmia Hospitality — la nostra storia, i nostri valori e il nostro approccio all\'ospitalità autentica sul Gargano, Puglia.',
    descriptionEn:
      'Cosmia Hospitality — our story, our values and our approach to authentic hospitality on the Gargano, Puglia.',
    locale,
    path: '/chi-siamo',
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const valueIcons = { care: Heart, authenticity: Compass, presence: Phone };
const valueKeys = ['care', 'authenticity', 'presence'] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('about_page');

  const jsonLd = breadcrumbSchema([
    { name: 'Home', url: `https://cosmiahospitality.it/${locale}` },
    { name: t('pageTitle'), url: `https://cosmiahospitality.it/${locale}/chi-siamo` },
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
        <div className="bg-brand-navy pt-40 pb-24 text-center px-6">
          <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-6">
            Cosmia Hospitality
          </p>
          <h1 className="font-serif text-white text-4xl lg:text-6xl font-light leading-tight max-w-3xl mx-auto">
            {t('headline')}{' '}
            <span className="font-semibold text-brand-gold">{t('headlineBold')}</span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 space-y-20">
          {/* Section 1 */}
          <div>
            <h2 className="font-serif text-brand-navy text-2xl font-semibold mb-6">
              {t('section1Title')}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t('section1Body')}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-brand-sand" />

          {/* Section 2 */}
          <div>
            <h2 className="font-serif text-brand-navy text-2xl font-semibold mb-6">
              {t('section2Title')}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">{t('section2Body')}</p>
          </div>

          {/* Values */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {valueKeys.map((key) => {
                const Icon = valueIcons[key];
                return (
                  <div key={key} className="text-center p-8 bg-white rounded-2xl border border-brand-sand">
                    <div className="w-12 h-12 mx-auto bg-brand-ivory rounded-xl flex items-center justify-center mb-4">
                      <Icon size={22} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-brand-navy text-lg font-semibold mb-2">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                );
              })}
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
