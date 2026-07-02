import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { itemListSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { properties } from '@/lib/data/properties';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import PropertyCard from '@/components/sections/PropertyCard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    titleIt: 'I Nostri Appartamenti',
    titleEn: 'Our Apartments',
    titleFr: 'Nos Appartements',
    titleDe: 'Unsere Wohnungen',
    descriptionIt:
      'Scopri gli appartamenti vacanza di Cosmia Hospitality sul Gargano, Puglia. Casa Lira e Casa Vela — soggiorni curati a Mattinata.',
    descriptionEn:
      'Discover Cosmia Hospitality vacation apartments on the Gargano, Puglia. Casa Lira and Casa Vela — curated stays in Mattinata.',
    descriptionFr:
      'Découvrez les appartements de vacances Cosmia Hospitality sur le Gargano, Puglia. Casa Lira et Casa Vela — des séjours soignés à Mattinata.',
    descriptionDe:
      'Entdecken Sie die Ferienwohnungen von Cosmia Hospitality am Gargano, Apulien. Casa Lira und Casa Vela — sorgfältig gestaltete Aufenthalte in Mattinata.',
    locale,
    path: '/appartamenti',
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function ApartmentsContent({ locale }: { locale: string }) {
  const t = useTranslations('apartments_page');

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: `https://cosmiahospitality.com/${locale}` },
    { name: t('pageTitle'), url: `https://cosmiahospitality.com/${locale}/appartamenti` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(properties, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Header />
      <main id="main-content" className="pt-32 pb-24 bg-brand-ivory min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Gargano — Puglia
            </p>
            <h1 className="font-serif text-brand-navy text-4xl lg:text-5xl font-light leading-tight">
              {t('headline')}
            </h1>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {properties.map((property, index) => (
              <PropertyCard key={property.slug} property={property} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}

export default async function ApartmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <ApartmentsContent locale={locale} />;
}
