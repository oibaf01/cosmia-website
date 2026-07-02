'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Users, BedDouble, Bath, ArrowRight } from 'lucide-react';
import { type Property } from '@/lib/data/properties';
import { pick } from '@/lib/locale';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const t = useTranslations('apartments');
  const locale = useLocale();
  const name = pick(property.name, locale);
  const tagline = pick(property.tagline, locale);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <m.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden border border-brand-sand shadow-sm hover:shadow-xl hover:shadow-brand-navy/10 transition-shadow duration-400"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-navy">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-brand-deep" aria-hidden="true" />
        )}
        <Image
          src={property.logo ?? property.heroPhoto}
          alt={name}
          fill
          onLoad={() => setImgLoaded(true)}
          className={`object-contain group-hover:scale-[1.03] transition-[opacity,transform] duration-700 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-brand-navy text-[11px] font-medium px-2.5 py-1 rounded-full">
          <MapPin size={11} className="text-brand-gold" />
          {property.location.split(',')[1]?.split('(')[0].trim()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-brand-navy text-lg font-semibold mb-1.5">{name}</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{tagline}</p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Users size={12} className="text-brand-gold" />
            {t('guests', { count: property.guests })}
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={12} className="text-brand-gold" />
            {t('bedrooms', { count: property.bedrooms })}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={12} className="text-brand-gold" />
            {t('bathrooms', { count: property.bathrooms })}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/appartamenti/${property.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-navy font-semibold text-xs hover:text-brand-gold transition-colors duration-150 group/link"
        >
          {t('discoverMore')}
          <ArrowRight
            size={14}
            className="group-hover/link:translate-x-1 transition-transform duration-150"
          />
        </Link>
      </div>
    </m.article>
  );
}
