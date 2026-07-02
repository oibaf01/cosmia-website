import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
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
    locales: ['it', 'en'],
  });
}

export function generateStaticParams() {
  return (['it', 'en'] as const).map((locale) => ({ locale }));
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const isIt = locale === 'it';
  const lastUpdated = isIt ? '1 luglio 2026' : 'July 1, 2026';

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
                <p>Cosmia Hospitality, con sede in Puglia — Italia. Email: info@cosmiahospitality.com</p>
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
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">4. Cookie tecnici</h2>
                <p>Il sito utilizza cookie tecnici essenziali per il corretto funzionamento (ad esempio, per ricordare la tua scelta relativa al cookie banner). Questi cookie sono sempre attivi e non richiedono consenso, non essendo utilizzati per profilazione o tracciamento.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">5. Cookie di analisi (Google Analytics)</h2>
                <p>Previo tuo consenso esplicito tramite il cookie banner, utilizziamo Google Analytics 4 per capire come i visitatori usano il sito (pagine visitate, provenienza del traffico, dispositivo, durata della sessione). L&apos;indirizzo IP viene troncato/anonimizzato prima della memorizzazione. Il servizio è fornito da Google Ireland Limited; i dati possono essere trasferiti a Google LLC (USA) sulla base delle clausole contrattuali standard della Commissione Europea. Puoi revocare il consenso in qualsiasi momento cancellando i cookie dal browser o tramite l&apos;<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">add-on di disattivazione di Google Analytics</a>.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">6. Vercel Analytics</h2>
                <p>Utilizziamo inoltre Vercel Analytics, un servizio di analisi del traffico aggregato e anonimo che non utilizza cookie e non raccoglie dati personali identificabili. Non richiede consenso.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">7. Conservazione</h2>
                <p>I dati del modulo di contatto vengono conservati per il tempo strettamente necessario a evadere la tua richiesta e comunque per non più di 12 mesi, salvo obblighi di legge. I dati di Google Analytics vengono conservati per 14 mesi, secondo la configurazione predefinita di Google.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">8. Diritti dell&apos;interessato</h2>
                <p>Hai il diritto di accedere ai tuoi dati, richiederne la rettifica o la cancellazione, opporti al trattamento e richiedere la portabilità. Per esercitare questi diritti scrivi a: info@cosmiahospitality.com</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-slate-600 text-base leading-relaxed">
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">1. Data Controller</h2>
                <p>Cosmia Hospitality, based in Puglia — Italy. Email: info@cosmiahospitality.com</p>
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
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">4. Technical Cookies</h2>
                <p>This website uses essential technical cookies for proper functionality (e.g., to remember your cookie banner choice). These cookies are always active and do not require consent, as they are not used for profiling or tracking.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">5. Analytics Cookies (Google Analytics)</h2>
                <p>Subject to your explicit consent via the cookie banner, we use Google Analytics 4 to understand how visitors use the site (pages visited, traffic source, device, session duration). IP addresses are truncated/anonymized before storage. The service is provided by Google Ireland Limited; data may be transferred to Google LLC (USA) under the European Commission&apos;s standard contractual clauses. You can withdraw consent at any time by clearing your browser cookies or via the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Google Analytics opt-out browser add-on</a>.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">6. Vercel Analytics</h2>
                <p>We also use Vercel Analytics, an aggregated and anonymous traffic analysis service that does not use cookies and does not collect personally identifiable data. No consent is required.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">7. Retention</h2>
                <p>Contact form data is retained for the minimum time necessary to fulfill your request and no longer than 12 months, unless required by law. Google Analytics data is retained for 14 months, per Google&apos;s default configuration.</p>
              </section>
              <section>
                <h2 className="font-serif text-brand-navy text-xl font-semibold mb-3">8. Your Rights</h2>
                <p>You have the right to access your data, request its correction or deletion, object to processing, and request portability. To exercise these rights write to: info@cosmiahospitality.com</p>
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
