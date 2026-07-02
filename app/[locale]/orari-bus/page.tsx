import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { Link } from '@/i18n/navigation';
import { pick, type Localized } from '@/lib/locale';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieBanner from '@/components/CookieBanner';
import BusSchedule from '@/components/sections/BusSchedule';
import { Bus } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata({
    titleIt: 'Come Arrivare al Mare da Mattinata — Orari Bus',
    titleEn: 'How to Get to the Beach from Mattinata — Bus Times',
    titleFr: 'Rejoindre la Mer depuis Mattinata — Horaires Bus',
    titleDe: 'Zum Strand von Mattinata — Busfahrplan',
    descriptionIt:
      'Orari del CityBus Mattinata per raggiungere le spiagge del Gargano senza auto: corse del mattino e del pomeriggio, tutte le fermate, da e per il centro di Mattinata.',
    descriptionEn:
      "CityBus Mattinata timetable to reach Gargano's beaches without a car: morning and afternoon runs, all stops, to and from Mattinata town centre.",
    descriptionFr:
      'Horaires du CityBus de Mattinata pour rejoindre les plages du Gargano sans voiture : trajets du matin et de l’après-midi, tous les arrêts, depuis et vers le centre de Mattinata.',
    descriptionDe:
      'Fahrplan des CityBus Mattinata, um die Strände des Gargano ohne Auto zu erreichen: Fahrten am Vormittag und Nachmittag, alle Haltestellen, hin und zurück vom Zentrum von Mattinata.',
    locale,
    path: '/orari-bus',
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const breadcrumbName: Localized = { it: 'Orari Bus', en: 'Bus Times', fr: 'Horaires Bus', de: 'Busfahrplan' };

const heroSubtitle: Localized = {
  it: 'Gli orari del CityBus di Mattinata per raggiungere le spiagge del Gargano e tornare in centro, aggiornati a questa pagina per i nostri ospiti.',
  en: "CityBus Mattinata timetables to reach Gargano's beaches and get back to town, kept here for our guests.",
  fr: 'Les horaires du CityBus de Mattinata pour rejoindre les plages du Gargano et revenir en ville, tenus à jour ici pour nos hôtes.',
  de: 'Die Fahrpläne des CityBus Mattinata, um die Strände des Gargano zu erreichen und zurück ins Zentrum zu kommen, hier für unsere Gäste aktuell gehalten.',
};

const note1: Localized = {
  it: '¹ Corsa soppressa nei mesi di luglio e agosto.',
  en: '¹ Service suspended in July and August.',
  fr: '¹ Trajet supprimé en juillet et août.',
  de: '¹ Fahrt im Juli und August eingestellt.',
};

const note2: Localized = {
  it: '² Corsa soppressa nei mesi di giugno, settembre e ottobre.',
  en: '² Service suspended in June, September and October.',
  fr: '² Trajet supprimé en juin, septembre et octobre.',
  de: '² Fahrt im Juni, September und Oktober eingestellt.',
};

const note3: Localized = {
  it: '³ Verificare eventuali limitazioni stagionali con il gestore del servizio, Trombetta Viaggi.',
  en: '³ Check for possible seasonal restrictions with the service operator, Trombetta Viaggi.',
  fr: "³ Vérifier les éventuelles restrictions saisonnières auprès de l'exploitant du service, Trombetta Viaggi.",
  de: '³ Etwaige saisonale Einschränkungen beim Betreiber, Trombetta Viaggi, erfragen.',
};

const note4: Localized = {
  it: 'Orari indicativi soggetti a variazione stagionale. Ti consigliamo di verificare gli aggiornamenti con il gestore del servizio prima della partenza.',
  en: 'Times are indicative and subject to seasonal change. We recommend checking for updates with the service operator before travelling.',
  fr: "Horaires indicatifs, sujets à modification saisonnière. Nous vous conseillons de vérifier les mises à jour auprès de l'exploitant avant le départ.",
  de: 'Fahrpläne sind unverbindlich und können sich saisonal ändern. Wir empfehlen, Aktualisierungen vor der Abfahrt beim Betreiber zu prüfen.',
};

const ctaApartments: Localized = {
  it: 'Scopri i nostri appartamenti',
  en: 'Discover our apartments',
  fr: 'Découvrez nos appartements',
  de: 'Unsere Wohnungen entdecken',
};

const ctaContact: Localized = {
  it: 'Scrivici',
  en: 'Contact us',
  fr: 'Écrivez-nous',
  de: 'Schreiben Sie uns',
};

function HeroTitle({ locale }: { locale: string }) {
  switch (locale) {
    case 'en':
      return <>Getting to the beach <span className="text-brand-gold font-semibold">without a car</span></>;
    case 'fr':
      return <>Rejoindre la mer <span className="text-brand-gold font-semibold">sans voiture</span></>;
    case 'de':
      return <>Zum Strand <span className="text-brand-gold font-semibold">ohne Auto</span></>;
    default:
      return <>Come arrivare al mare <span className="text-brand-gold font-semibold">senza auto</span></>;
  }
}

function IntroText({ locale }: { locale: string }) {
  switch (locale) {
    case 'en':
      return (
        <>
          The apartments are both in the centre of Mattinata, a short walk from the main street — handy if you want
          to get around without a car. The easiest way to reach the sea is the CityBus service, which connects the town centre
          to the main beaches and beach clubs several times a day. The most convenient stop from the centre
          (where both apartments are located) is <strong>Rotatoria - Farmacia Sansone</strong>.
        </>
      );
    case 'fr':
      return (
        <>
          Les deux appartements se trouvent dans le centre de Mattinata, à deux pas de la rue principale — pratique pour se
          déplacer même sans voiture. Le moyen le plus simple pour rejoindre la mer est le service CityBus, qui relie le centre
          du village aux principales plages et aux lidos du littoral plusieurs fois par jour. L&apos;arrêt le plus pratique
          depuis le centre (où se trouvent les deux appartements) est <strong>Rotatoria - Farmacia Sansone</strong>.
        </>
      );
    case 'de':
      return (
        <>
          Beide Wohnungen liegen im Zentrum von Mattinata, nur einen Steinwurf von der Hauptstraße entfernt — praktisch, wenn
          man sich auch ohne Auto bewegen möchte. Der einfachste Weg zum Meer ist der CityBus-Service, der das Ortszentrum
          mehrmals täglich mit den wichtigsten Stränden und Strandbädern der Küste verbindet. Die günstigste Haltestelle vom
          Zentrum aus (wo sich beide Wohnungen befinden) ist <strong>Rotatoria - Farmacia Sansone</strong>.
        </>
      );
    default:
      return (
        <>
          Gli appartamenti si trovano nel centro di Mattinata, a due passi dal corso principale — comodo per chi vuole
          muoversi anche senza auto. Il modo più semplice per raggiungere il mare è il servizio CityBus, che collega il centro
          del paese alle principali spiagge e ai lidi del litorale più volte al giorno. La fermata più comoda dal centro
          (dove si trovano entrambi gli appartamenti) è <strong>Rotatoria - Farmacia Sansone</strong>.
        </>
      );
  }
}

export default async function OrariBusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const jsonLd = breadcrumbSchema([
    { name: 'Home', url: `https://cosmiahospitality.com/${locale}` },
    { name: pick(breadcrumbName, locale), url: `https://cosmiahospitality.com/${locale}/orari-bus` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main-content" className="bg-brand-ivory min-h-screen">
        {/* Hero */}
        <div className="bg-brand-navy pt-40 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
              <Bus size={22} className="text-brand-gold" />
            </div>
            <h1 className="font-serif text-white text-4xl lg:text-5xl font-light">
              <HeroTitle locale={locale} />
            </h1>
            <p className="mt-4 text-white/60 text-base leading-relaxed max-w-2xl">
              {pick(heroSubtitle, locale)}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
          {/* Intro */}
          <div className="prose prose-slate max-w-none mb-12">
            <p className="text-slate-600 text-base leading-relaxed">
              <IntroText locale={locale} />
            </p>
          </div>

          {/* Schedule */}
          <BusSchedule locale={locale} />

          {/* Notes */}
          <div className="mt-10 space-y-1.5 text-xs text-slate-400">
            <p>{pick(note1, locale)}</p>
            <p>{pick(note2, locale)}</p>
            <p>{pick(note3, locale)}</p>
            <p className="pt-2">{pick(note4, locale)}</p>
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Link
              href="/appartamenti"
              className="btn-glass btn-glass-md btn-glass-gold font-semibold tracking-wide"
            >
              {pick(ctaApartments, locale)}
            </Link>
            <Link
              href="/contatti"
              className="btn-glass btn-glass-md btn-glass-light font-medium tracking-wide"
            >
              {pick(ctaContact, locale)}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
