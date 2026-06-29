'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { properties } from '@/lib/data/properties';
import PropertyCard from './PropertyCard';
import Reveal3D from '@/components/ui/Reveal3D';

export default function ApartmentsSection() {
  const t = useTranslations('apartments');

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

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {properties.map((property, index) => (
            <PropertyCard key={property.slug} property={property} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/appartamenti"
            className="inline-flex items-center gap-2 px-8 py-4 border border-brand-navy text-brand-navy font-semibold text-sm tracking-wide rounded hover:bg-brand-navy hover:text-white transition-all duration-200 group"
          >
            {t('cta')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
        </div>
      </div>
    </section>
  );
}
