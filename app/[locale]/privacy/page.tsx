import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    titleIt: 'Privacy Policy',
    titleEn: 'Privacy Policy',
    descriptionIt: 'Informativa sulla privacy di Cosmia Hospitality — GDPR.',
    descriptionEn: 'Cosmia Hospitality privacy policy — GDPR compliant.',
    locale,
    path: '/privacy',
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const isIt = locale === 'it';
  const lastUpdated = '29 giugno 2025';

  return (
    <>
      <Header />
      <main id="main-content" className="bg-brand-ivory min-h-screen">
        <div className="bg-brand-navy pt-40 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-white text-4xl lg:text-5xl font-light">
              Privacy Policy
            </h1>
            <p className="mt-3 text-white/50 text-sm">
              {isIt ? `Ultimo aggiornamento: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 prose prose-slate max-w-none">
          {isIt ? (
            <div className="space-y-8 text-slate-600 text-base leading-relaxed">
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">1. Titolare del trattamento</h2>
                <p>Cosmia Hospitality, con sede in Puglia — Italia. Email: info@cosmiahospitality.it</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">2. Dati raccolti</h2>
                <p>Raccogliamo esclusivamente i dati che fornisci volontariamente tramite il modulo di contatto: nome, email, numero di telefono (opzionale), date di soggiorno, numero di ospiti e messaggio. Nessun dato viene raccolto automaticamente tramite cookie di profilazione.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">3. Finalità del trattamento</h2>
                <p>I dati vengono utilizzati esclusivamente per rispondere alla tua richiesta di informazioni o disponibilità e non vengono ceduti a terzi, né utilizzati per attività di marketing senza tuo esplicito consenso.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">4. Cookie</h2>
                <p>Il sito utilizza esclusivamente cookie tecnici essenziali per il corretto funzionamento (ad esempio, per ricordare la tua scelta relativa al cookie banner). Non vengono utilizzati cookie di profilazione o di tracciamento.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">5. Conservazione</h2>
                <p>I dati vengono conservati per il tempo strettamente necessario a evadere la tua richiesta e comunque per non più di 12 mesi, salvo obblighi di legge.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">6. Diritti dell&apos;interessato</h2>
                <p>Hai il diritto di accedere ai tuoi dati, richiederne la rettifica o la cancellazione, opporti al trattamento e richiedere la portabilità. Per esercitare questi diritti scrivi a: info@cosmiahospitality.it</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-slate-600 text-base leading-relaxed">
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">1. Data Controller</h2>
                <p>Cosmia Hospitality, based in Puglia — Italy. Email: info@cosmiahospitality.it</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">2. Data Collected</h2>
                <p>We collect only data you voluntarily provide through the contact form: name, email, phone number (optional), stay dates, number of guests and message. No data is automatically collected via profiling cookies.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">3. Purpose</h2>
                <p>Data is used solely to respond to your inquiry or availability request and is not shared with third parties or used for marketing without your explicit consent.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">4. Cookies</h2>
                <p>This website uses only essential technical cookies for proper functionality (e.g., to remember your cookie banner choice). No profiling or tracking cookies are used.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">5. Retention</h2>
                <p>Data is retained for the minimum time necessary to fulfill your request and no longer than 12 months, unless required by law.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">6. Your Rights</h2>
                <p>You have the right to access your data, request its correction or deletion, object to processing, and request portability. To exercise these rights write to: info@cosmiahospitality.it</p>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
