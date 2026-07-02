'use client';

import { useRef, useState } from 'react';
import { m, AnimatePresence, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { faqItems } from '@/lib/data/faq';
import { pick } from '@/lib/locale';

interface FAQSectionProps {
  locale: string;
}

export default function FAQSection({ locale }: FAQSectionProps) {
  const t = useTranslations('faq');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section ref={ref} className="bg-brand-ivory py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {t('sectionLabel')}
          </p>
          <h2 className="font-serif text-brand-navy text-3xl lg:text-4xl font-light leading-snug">
            {t('headline')}{' '}
            <span className="font-semibold text-brand-gold">{t('headlineBold')}</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </m.div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto border-t border-brand-sand">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <m.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
                className="border-b border-brand-sand"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                >
                  <span className="font-medium text-brand-navy">
                    {pick(item.question, locale)}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={20} className="text-brand-gold" />
                  </m.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-slate-600 leading-relaxed">
                        {pick(item.answer, locale)}
                        {item.link && (
                          <>
                            {' '}
                            <Link href={item.link.href} className="text-brand-gold hover:underline">
                              {pick(item.link.label, locale)}
                            </Link>
                          </>
                        )}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
