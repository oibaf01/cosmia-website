import Link from 'next/link';
import '@/app/globals.css';

export default function RootNotFound() {
  return (
    <html lang="it">
      <body className="antialiased">
        <main className="bg-brand-navy min-h-screen flex items-center justify-center px-6 text-center">
          <div className="max-w-lg">
            <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              404
            </p>
            <h1 className="font-serif text-white text-3xl lg:text-4xl font-light mb-4">
              Ti sei perso nel Gargano.
            </h1>
            <p className="text-white/60 text-base leading-relaxed mb-10">
              La pagina che cerchi non esiste o è stata spostata.
            </p>
            <Link
              href="/it"
              className="btn-glass btn-glass-md btn-glass-gold font-semibold tracking-wide"
            >
              Torna alla home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
