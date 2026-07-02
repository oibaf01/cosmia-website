import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  organizationSchema,
  websiteSchema,
  itemListSchema,
  faqSchema,
} from "@/lib/seo/schema";
import { properties } from "@/lib/data/properties";
import { faqItems } from "@/lib/data/faq";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import Hero from "@/components/sections/Hero";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import SectionDivider from "@/components/ui/SectionDivider";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ApartmentsSection from "@/components/sections/ApartmentsSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
// Recensioni oscurate temporaneamente: nessuna recensione reale ancora raccolta.
// import ReviewsCarousel from '@/components/sections/ReviewsCarousel';
import FAQSection from "@/components/sections/FAQSection";
import CtaSection from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({
    titleIt: "Appartamenti Vacanza sul Gargano",
    titleEn: "Vacation Rentals on the Gargano",
    titleFr: "Locations de Vacances sur le Gargano",
    titleDe: "Ferienwohnungen am Gargano",
    descriptionIt:
      "Cosmia Hospitality — appartamenti vacanza a Mattinata, Gargano, Puglia. Casa Lira e Casa Vela: il punto di partenza per scoprire il promontorio, tutto l'anno.",
    descriptionEn:
      "Cosmia Hospitality — vacation apartments in Mattinata, Gargano, Puglia. Casa Lira and Casa Vela: your base for exploring the promontory, year-round.",
    descriptionFr:
      "Cosmia Hospitality — appartements de vacances à Mattinata, Gargano, Puglia. Casa Lira et Casa Vela : votre point de départ pour découvrir le promontoire, toute l'année.",
    descriptionDe:
      "Cosmia Hospitality — Ferienwohnungen in Mattinata, Gargano, Apulien. Casa Lira und Casa Vela: Ihr Ausgangspunkt, um das Vorgebirge das ganze Jahr über zu entdecken.",
    locale,
    path: "",
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    itemListSchema(properties, locale),
    faqSchema(faqItems, locale),
  ];

  return (
    <>
      {/* JSON-LD */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Header />
      <main id="main-content">
        <Hero />
        <WhatWeDoSection />
        <SectionDivider className="bg-brand-ivory" />
        <AboutTeaser />
        <ApartmentsSection />
        <ExperiencesSection />
        {/* <ReviewsCarousel /> */}
        <CtaSection />
        <FAQSection locale={locale} />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
