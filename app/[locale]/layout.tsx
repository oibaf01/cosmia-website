import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';
import { routing, type Locale } from '@/i18n/routing';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import '@/app/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cosmiahospitality.com'),
  title: 'Cosmia Hospitality — Appartamenti Vacanza sul Gargano',
  description:
    "Appartamenti vacanza a Mattinata, nel cuore del Gargano, Puglia. Casa Lira e Casa Vela — il punto di partenza per scoprire il promontorio, tutto l'anno.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#0D1321',
    },
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Vai al contenuto
        </a>
        <NextIntlClientProvider messages={messages}>
          {/* m.* components below load only the animation features actually used
              (no drag/layout), instead of framer-motion's full engine via <motion.*> */}
          <LazyMotion features={domAnimation}>{children}</LazyMotion>
        </NextIntlClientProvider>
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
