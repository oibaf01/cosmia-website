import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
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

          {/* Links */}
          <div>
            <h3 className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-6">
              {t('links')}
            </h3>
            <nav className="space-y-3">
              <Link href="/" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {tNav('home')}
              </Link>
              <Link href="/appartamenti" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {tNav('apartments')}
              </Link>
              <Link href="/chi-siamo" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {tNav('about')}
              </Link>
              <Link href="/contatti" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {tNav('contact')}
              </Link>
              <Link href="/privacy" className="block text-white/70 hover:text-brand-gold transition-colors text-sm">
                {t('privacy')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-6">
              Contatti
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:info@cosmiahospitality.it"
                className="flex items-center gap-2 text-white/70 hover:text-brand-gold transition-colors text-sm"
              >
                <Mail size={16} />
                info@cosmiahospitality.it
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
