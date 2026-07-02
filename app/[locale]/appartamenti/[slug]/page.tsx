import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { propertySchema, breadcrumbSchema } from '@/lib/seo/schema';
import { properties, getPropertyBySlug } from '@/lib/data/properties';
import { pick } from '@/lib/locale';
// Recensioni oscurate temporaneamente: nessuna recensione reale ancora raccolta.
// import { getReviewsByProperty, getAggregateRating } from '@/lib/data/reviews';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import PropertyGallery from '@/components/sections/PropertyGallery';
// import ReviewsCarousel from '@/components/sections/ReviewsCarousel';
import { MapPin, Users, BedDouble, Bath, Clock, VolumeX, CigaretteOff, PawPrint, CalendarRange, FileText, Bus } from 'lucide-react';
import AnimatedIcon from '@/components/ui/AnimatedIcon';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  const place = property.location.split(',')[0];

  return buildMetadata({
    titleIt: `${property.name.it} — Appartamento a ${place}`,
    titleEn: `${property.name.en} — Apartment in ${place}`,
    titleFr: `${property.name.fr} — Appartement à ${place}`,
    titleDe: `${property.name.de} — Wohnung in ${place}`,
    descriptionIt: property.tagline.it,
    descriptionEn: property.tagline.en,
    descriptionFr: property.tagline.fr,
    descriptionDe: property.tagline.de,
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

  const name = pick(property.name, locale);
  const description = pick(property.description, locale);
  // Recensioni oscurate temporaneamente: nessun aggregateRating reale da pubblicare.
  // const aggregateRating = getAggregateRating(slug);

  const jsonLd = [
    propertySchema(property, locale),
    breadcrumbSchema([
      { name: 'Home', url: `https://cosmiahospitality.it/${locale}` },
      {
        name: pick({ it: 'Appartamenti', en: 'Apartments', fr: 'Appartements', de: 'Wohnungen' }, locale),
        url: `https://cosmiahospitality.it/${locale}/appartamenti`,
      },
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
                {/* Recensioni oscurate temporaneamente: nessun rating reale da mostrare.
                {aggregateRating.reviewCount > 0 && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <Star size={16} className="text-brand-gold fill-brand-gold" />
                    <span>{aggregateRating.ratingValue}</span>
                    <span className="text-slate-400">({aggregateRating.reviewCount})</span>
                  </div>
                )} */}
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
                <Link
                  href="/orari-bus"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-brand-gold hover:underline"
                >
                  <Bus size={14} />
                  {t('busLink')}
                </Link>
              </div>

              {/* Info pratiche — regole essenziali, non economiche; dettagli completi in /termini */}
              <div>
                <h2 className="font-serif text-brand-navy text-2xl font-semibold mb-6">
                  {t('house_rules.title')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Clock size={18} className="text-brand-gold shrink-0" />
                    {t('house_rules.checkin')}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <VolumeX size={18} className="text-brand-gold shrink-0" />
                    {t('house_rules.quiet')}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <CigaretteOff size={18} className="text-brand-gold shrink-0" />
                    {t('house_rules.smoking')}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <PawPrint size={18} className="text-brand-gold shrink-0" />
                    {t('house_rules.pets')}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <CalendarRange size={18} className="text-brand-gold shrink-0" />
                    {t('house_rules.minStay')}
                  </div>
                </div>
                <Link
                  href="/termini"
                  className="inline-flex items-center gap-2 mt-6 text-sm text-brand-gold hover:underline"
                >
                  <FileText size={14} />
                  {t('house_rules.fullTerms')}
                </Link>
              </div>

              {/* Reviews — oscurate temporaneamente: nessuna recensione reale ancora raccolta.
                  Da riattivare collegando Google Reviews + recensioni ricevute direttamente. */}
              {/*
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
              */}
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl p-8 border border-brand-sand shadow-sm">
                <h3 className="font-serif text-brand-navy text-xl font-semibold mb-2">{name}</h3>
                <p className="text-slate-500 text-sm mb-6">
                  {pick(property.tagline, locale)}
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
