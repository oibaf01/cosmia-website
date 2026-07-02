import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Compass } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default async function NotFound() {
  const t = await getTranslations('not_found');

  return (
    <>
      <Header />
      <main
        id="main-content"
        className="bg-brand-navy min-h-screen flex items-center justify-center px-6 pt-32 pb-20"
      >
        <div className="text-center max-w-lg">
          <div className="mx-auto w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-8">
            <Compass size={28} className="text-brand-gold" />
          </div>
          <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            404
          </p>
          <h1 className="font-serif text-white text-3xl lg:text-4xl font-light mb-4">
            {t('title')}
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="btn-glass btn-glass-md btn-glass-gold font-semibold tracking-wide"
            >
              {t('backHome')}
            </Link>
            <Link
              href="/appartamenti"
              className="btn-glass btn-glass-md btn-glass-dark font-medium tracking-wide"
            >
              {t('seeApartments')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
