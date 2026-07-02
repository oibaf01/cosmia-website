import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { properties } from '@/lib/data/properties';
import PropertyCard from './PropertyCard';
import Reveal3D from '@/components/ui/Reveal3D';

// No client hooks/state here — this is a plain Server Component, PropertyCard/Reveal3D
// (the parts that actually animate) stay client, everything else ships zero JS.
export default async function ApartmentsSection() {
  const t = await getTranslations('apartments');

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <Reveal3D className="text-center mb-16">
          <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {t('sectionLabel')}
          </p>
          <h2 className="font-serif text-brand-navy text-3xl lg:text-4xl font-light max-w-2xl mx-auto leading-snug">
            {t('headline')}
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </Reveal3D>

        {/* Cards grid — narrower than the section so cards read smaller, not full-bleed */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {properties.map((property, index) => (
            <PropertyCard key={property.slug} property={property} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/appartamenti"
            className="btn-glass btn-glass-md btn-glass-gold font-semibold tracking-wide group"
          >
            {t('cta')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
        </div>
      </div>
    </section>
  );
}
