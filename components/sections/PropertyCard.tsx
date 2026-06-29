'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Users, BedDouble, Bath, ArrowRight } from 'lucide-react';
import { type Property } from '@/lib/data/properties';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const t = useTranslations('apartments');
  const locale = useLocale();
  const name = locale === 'en' ? property.name.en : property.name.it;
  const tagline = locale === 'en' ? property.tagline.en : property.tagline.it;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden border border-brand-sand shadow-sm hover:shadow-xl hover:shadow-brand-navy/10 transition-shadow duration-400"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-sand">
        <Image
          src={property.heroPhoto}
          alt={name}
          fill
          className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-medium px-3 py-1.5 rounded-full">
          <MapPin size={12} className="text-brand-gold" />
          {property.location.split(',')[0]}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif text-brand-navy text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{tagline}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-brand-gold" />
            {t('guests', { count: property.guests })}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={14} className="text-brand-gold" />
            {t('bedrooms', { count: property.bedrooms })}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={14} className="text-brand-gold" />
            {t('bathrooms', { count: property.bathrooms })}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/appartamenti/${property.slug}`}
          className="inline-flex items-center gap-2 text-brand-navy font-semibold text-sm hover:text-brand-gold transition-colors duration-150 group/link"
        >
          {t('discoverMore')}
          <ArrowRight
            size={16}
            className="group-hover/link:translate-x-1 transition-transform duration-150"
          />
        </Link>
      </div>
    </motion.article>
  );
}
