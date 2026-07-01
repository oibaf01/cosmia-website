import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { propertySchema, breadcrumbSchema } from '@/lib/seo/schema';
import { properties, getPropertyBySlug } from '@/lib/data/properties';
import { getReviewsByProperty, getAggregateRating } from '@/lib/data/reviews';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import PropertyGallery from '@/components/sections/PropertyGallery';
import ReviewsCarousel from '@/components/sections/ReviewsCarousel';
import { MapPin, Users, BedDouble, Bath, Star, ExternalLink } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const name = locale === 'en' ? property.name.en : property.name.it;
  const tagline = locale === 'en' ? property.tagline.en : property.tagline.it;

  return buildMetadata({
    titleIt: `${property.name.it} — Appartamento a ${property.location.split(',')[0]}`,
    titleEn: `${property.name.en} — Apartment in ${property.location.split(',')[0]}`,
    descriptionIt: property.tagline.it,
    descriptionEn: property.tagline.en,
    locale,
    path: `/appartamenti/${slug}`,
  });
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    properties.map((property) => ({ locale, slug: property.slug }))
  );
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const t = await getTranslations('property_page');
  const tApt = await getTranslations('apartments');
  const tCommon = await getTranslations('common');

  const name = locale === 'en' ? property.name.en : property.name.it;
  const description = locale === 'en' ? property.description.en : property.description.it;
  const aggregateRating = getAggregateRating(slug);

  const jsonLd = [
    propertySchema(property, locale, aggregateRating),
    breadcrumbSchema([
      { name: 'Home', url: `https://cosmiahospitality.it/${locale}` },
      { name: locale === 'en' ? 'Apartments' : 'Appartamenti', url: `https://cosmiahospitality.it/${locale}/appartamenti` },
      { name, url: `https://cosmiahospitality.it/${locale}/appartamenti/${slug}` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Header />
      <main id="main-content" className="bg-brand-ivory min-h-screen">
        {/* Hero */}
        <div className="relative h-[30vh] min-h-48 bg-brand-navy overflow-hidden">
          {(property.icon ?? property.logo) && (
            <Image
              src={property.icon ?? property.logo!}
              alt={name}
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          )}
          <div className="absolute bottom-8 left-0 right-0 px-6 lg:px-8 max-w-7xl mx-auto">
            <h1 className="font-serif text-white text-4xl lg:text-6xl font-light">{name}</h1>
            <p className="flex items-center gap-2 text-white/70 mt-2 text-sm">
              <MapPin size={14} className="text-brand-gold" />
              {property.location}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Back link */}
          <Link
            href="/appartamenti"
            className="inline-block text-sm text-slate-500 hover:text-brand-gold transition-colors mb-12"
          >
            {tCommon('backToApartments')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Stats */}
              <div className="flex flex-wrap gap-6 py-6 border-y border-brand-sand">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users size={18} className="text-brand-gold" />
                  {tApt('guests', { count: property.guests })}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BedDouble size={18} className="text-brand-gold" />
                  {tApt('bedrooms', { count: property.bedrooms })}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Bath size={18} className="text-brand-gold" />
                  {tApt('bathrooms', { count: property.bathrooms })}
                </div>
                {aggregateRating.reviewCount > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <Star size={16} className="text-brand-gold fill-brand-gold" />
                    <span>{aggregateRating.ratingValue}</span>
                    <span className="text-slate-400">({aggregateRating.reviewCount})</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <p className="text-slate-600 text-lg leading-relaxed max-w-prose">{description}</p>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="font-serif text-brand-navy text-2xl font-semibold mb-6">
                  {t('gallery')}
                </h2>
                <PropertyGallery
                  photos={property.photos}
                  photoSections={property.photoSections}
                  propertyName={name}
                />
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-brand-navy text-2xl font-semibold mb-6">
                  {t('amenities')}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 text-sm text-slate-600">
                      <AnimatedIcon
                        iconKey={amenity}
                        size={18}
                        className="text-brand-gold shrink-0"
                      />
                      {t(`amenities_map.${amenity}` as Parameters<typeof t>[0])}
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="font-serif text-brand-navy text-2xl font-semibold mb-6">
                  {t('location')}
                </h2>
                <div className="rounded-2xl overflow-hidden border border-brand-sand h-72">
                  <iframe
                    src={`https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=14&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mappa di ${name}`}
                  />
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="font-serif text-brand-navy text-2xl font-semibold mb-6">
                  {t('reviews')}
                </h2>
                <ReviewsCarousel />
                {property.googleBusinessUrl && !property.googleBusinessUrl.includes('PLACEHOLDER') && (
                  <a
                    href={property.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 text-sm text-brand-gold hover:underline"
                  >
                    {t('leaveReview')}
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl p-8 border border-brand-sand shadow-sm">
                <h3 className="font-serif text-brand-navy text-xl font-semibold mb-2">{name}</h3>
                <p className="text-slate-500 text-sm mb-6">
                  {locale === 'en' ? property.tagline.en : property.tagline.it}
                </p>
                <Link
                  href={`/contatti?appartamento=${slug}`}
                  className="block w-full text-center px-6 py-4 bg-brand-gold text-brand-navy font-semibold text-sm rounded hover:bg-brand-gold/90 transition-colors duration-150"
                >
                  {t('requestAvailability')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-20 left-4 right-4 z-30">
        <Link
          href={`/contatti?appartamento=${slug}`}
          className="block w-full text-center px-6 py-4 bg-brand-gold text-brand-navy font-semibold text-sm rounded-xl shadow-xl shadow-brand-gold/30"
        >
          {t('requestAvailability')}
        </Link>
      </div>

      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
