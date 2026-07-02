'use client';

import { useState } from 'react';
import { Sunrise, Sunset } from 'lucide-react';
import {
  morningToSea,
  morningToTown,
  afternoonToSea,
  afternoonToTown,
  type BusTable,
} from '@/lib/data/busSchedule';

interface BusScheduleProps {
  locale: string;
}

const copy = {
  it: {
    morning: 'Mattina',
    afternoon: 'Pomeriggio e sera',
    toSea: 'Verso il mare',
    toTown: 'Verso Mattinata',
    stop: 'Fermata',
    run: 'Partenza',
    captionSea: (period: string, range: string) =>
      `Orari corse verso il mare — ${period}, dalle ${range}. Ogni colonna è una corsa; l'orario indicato è quello di partenza da Capolinea Giorni.`,
    captionTown: (period: string, range: string) =>
      `Orari corse verso Mattinata — ${period}, dalle ${range}. Ogni colonna è una corsa; l'orario indicato è quello di partenza da Capolinea Punta Grugno.`,
  },
  en: {
    morning: 'Morning',
    afternoon: 'Afternoon & evening',
    toSea: 'To the seaside',
    toTown: 'To Mattinata',
    stop: 'Stop',
    run: 'Departure',
    captionSea: (period: string, range: string) =>
      `Bus times to the seaside — ${period}, from ${range}. Each column is one run; the time shown is the departure from Capolinea Giorni.`,
    captionTown: (period: string, range: string) =>
      `Bus times to Mattinata — ${period}, from ${range}. Each column is one run; the time shown is the departure from Capolinea Punta Grugno.`,
  },
  fr: {
    morning: 'Matin',
    afternoon: 'Après-midi et soir',
    toSea: 'Vers la mer',
    toTown: 'Vers Mattinata',
    stop: 'Arrêt',
    run: 'Départ',
    captionSea: (period: string, range: string) =>
      `Horaires des bus vers la mer — ${period}, à partir de ${range}. Chaque colonne correspond à un trajet ; l'heure indiquée est celle du départ de Capolinea Giorni.`,
    captionTown: (period: string, range: string) =>
      `Horaires des bus vers Mattinata — ${period}, à partir de ${range}. Chaque colonne correspond à un trajet ; l'heure indiquée est celle du départ de Capolinea Punta Grugno.`,
  },
  de: {
    morning: 'Vormittag',
    afternoon: 'Nachmittag und Abend',
    toSea: 'Zum Meer',
    toTown: 'Nach Mattinata',
    stop: 'Haltestelle',
    run: 'Abfahrt',
    captionSea: (period: string, range: string) =>
      `Busfahrplan zum Meer — ${period}, ab ${range}. Jede Spalte steht für eine Fahrt; die angegebene Zeit ist die Abfahrt von Capolinea Giorni.`,
    captionTown: (period: string, range: string) =>
      `Busfahrplan nach Mattinata — ${period}, ab ${range}. Jede Spalte steht für eine Fahrt; die angegebene Zeit ist die Abfahrt von Capolinea Punta Grugno.`,
  },
};

function timeRange(columns: string[]): string {
  const strip = (s: string) => s.replace(/[¹²³]/g, '');
  return `${strip(columns[0])}–${strip(columns[columns.length - 1])}`;
}

function ScheduleTable({
  table,
  stopLabel,
  caption,
  locale,
}: {
  table: BusTable;
  stopLabel: string;
  caption: string;
  locale: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-brand-sand">
      <table className="min-w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-brand-navy text-white">
            <th
              scope="col"
              className="text-left font-medium px-4 py-3 sticky left-0 z-10 bg-brand-navy whitespace-nowrap"
            >
              {stopLabel}
            </th>
            {table.columns.map((col, index) => (
              <th key={col} scope="col" className="text-center font-medium px-3 py-3 whitespace-nowrap">
                <span className="block text-[10px] uppercase tracking-wide text-white/50">
                  {locale === 'it' && `Corsa ${index + 1}`}
                  {locale === 'en' && `Run ${index + 1}`}
                  {locale === 'fr' && `Trajet ${index + 1}`}
                  {locale === 'de' && `Fahrt ${index + 1}`}
                </span>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => {
            const rowBg = i % 2 === 0 ? 'bg-white' : 'bg-brand-ivory';
            return (
              <tr key={row.stop} className={rowBg}>
                <th
                  scope="row"
                  className={`text-left px-4 py-2.5 text-slate-700 font-medium sticky left-0 z-10 whitespace-nowrap ${rowBg}`}
                >
                  {row.stop}
                </th>
                {row.times.map((time, j) => (
                  <td key={j} className="text-center px-3 py-2.5 text-slate-600 whitespace-nowrap">
                    {time}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function BusSchedule({ locale }: BusScheduleProps) {
  const t = copy[locale as keyof typeof copy] ?? copy.it;
  const [period, setPeriod] = useState<'morning' | 'afternoon'>('morning');

  const seaTable = period === 'morning' ? morningToSea : afternoonToSea;
  const townTable = period === 'morning' ? morningToTown : afternoonToTown;
  const periodLabel = period === 'morning' ? t.morning : t.afternoon;
  const range = timeRange(seaTable.columns);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setPeriod('morning')}
          aria-pressed={period === 'morning'}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            period === 'morning'
              ? 'bg-brand-gold text-brand-navy'
              : 'bg-white text-slate-600 border border-brand-sand hover:border-brand-gold'
          }`}
        >
          <Sunrise size={16} />
          <span>
            {t.morning}
            <span className="hidden sm:inline opacity-70"> · {timeRange(morningToSea.columns)}</span>
          </span>
        </button>
        <button
          onClick={() => setPeriod('afternoon')}
          aria-pressed={period === 'afternoon'}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            period === 'afternoon'
              ? 'bg-brand-gold text-brand-navy'
              : 'bg-white text-slate-600 border border-brand-sand hover:border-brand-gold'
          }`}
        >
          <Sunset size={16} />
          <span>
            {t.afternoon}
            <span className="hidden sm:inline opacity-70"> · {timeRange(afternoonToSea.columns)}</span>
          </span>
        </button>
      </div>

      {/* Tables */}
      <div className="space-y-10">
        <div>
          <h2 className="font-serif text-brand-navy text-lg font-semibold mb-4">{t.toSea}</h2>
          <ScheduleTable
            table={seaTable}
            stopLabel={t.stop}
            caption={t.captionSea(periodLabel, range)}
            locale={locale}
          />
        </div>
        <div>
          <h2 className="font-serif text-brand-navy text-lg font-semibold mb-4">{t.toTown}</h2>
          <ScheduleTable
            table={townTable}
            stopLabel={t.stop}
            caption={t.captionTown(periodLabel, timeRange(townTable.columns))}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
