import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Mail, Phone } from 'lucide-react';
import { properties } from '@/lib/data/properties';
import { pick } from '@/lib/locale';

export default async function Footer() {
  const t = await getTranslations('footer');
  const tNav = await getTranslations('nav');
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Image
              src="/logos/Icon_white.png"
              alt="Cosmia Hospitality"
              width={48}
              height={48}
              className="h-10 w-auto"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-6">
              {t('links')}
            </h3>
            <nav className="space-y-3">
              <Link href="/" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {tNav('home')}
              </Link>
              <Link href="/chi-siamo" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {tNav('about')}
              </Link>
              <Link href="/contatti" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {tNav('contact')}
              </Link>
              <Link href="/orari-bus" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {t('busSchedule')}
              </Link>
              <Link href="/privacy" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {t('privacy')}
              </Link>
              <Link href="/termini" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {t('terms')}
              </Link>
            </nav>
          </div>

          {/* Apartments */}
          <div>
            <h3 className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-6">
              {t('apartmentsHeading')}
            </h3>
            <nav className="space-y-3">
              <Link href="/appartamenti" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {t('allApartments')}
              </Link>
              {properties.map((property) => (
                <Link
                  key={property.slug}
                  href={`/appartamenti/${property.slug}`}
                  className="block text-white/70 hover:text-brand-gold transition-colors text-sm"
                >
                  {pick(property.name, locale)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-6">
              {tNav('contact')}
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:info@cosmiahospitality.com"
                className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors text-sm"
              >
                <Mail size={16} />
                info@cosmiahospitality.com
              </a>
              <a
                href="tel:+393317728100"
                className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors text-sm"
              >
                <Phone size={16} />
                +39 331 772 8100
              </a>
              <p className="text-white/40 text-xs mt-4">
                Lungomare del Sole 1 A/1<br />
                71043 Manfredonia (FG) — Puglia
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 space-y-2">
          <p className="text-white/40 text-xs text-center">
            {t('rights', { year })}
          </p>
          <p className="text-white/25 text-xs text-center">
            Cosmia srls — P.IVA 04602100713 — Lungomare del Sole 1 A/1, 71043 Manfredonia (FG)
          </p>
        </div>
      </div>
    </footer>
  );
}
