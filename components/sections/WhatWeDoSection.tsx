'use client';

import { useRef, type PointerEvent } from 'react';
import { m, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Reveal3D from '@/components/ui/Reveal3D';

const subKeys = ['sub1', 'sub2', 'sub3'] as const;

export default function WhatWeDoSection() {
  const t = useTranslations('what_we_do');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  // Pointer-tracked 3D tilt on the whole card — same technique as AnimatedIcon,
  // gentler angles since the surface is much larger
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 5);
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -5);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <section ref={ref} className="bg-brand-ivory pt-16 lg:pt-24 pb-10 lg:pb-14">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {t('sectionLabel')}
          </p>
          <h2 className="font-serif text-brand-navy text-2xl lg:text-3xl font-light leading-snug max-w-2xl mx-auto">
            {t('headline')}{' '}
            <span className="font-semibold text-brand-gold">{t('headlineBold')}</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
            {t('pillar1.body')}
          </p>
        </m.div>

        {/* Prima → Durante → Dopo timeline, 3D entrance + pointer-tracked tilt */}
        <Reveal3D>
          <div style={{ perspective: 1000 }}>
            <m.div
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{ rotateX: springRotateX, rotateY: springRotateY }}
              className="bg-white rounded-2xl border border-brand-sand p-8 lg:p-10 will-change-transform"
            >
              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
                {/* Single straight connector behind the circles: runs from the centre of
                    column 1 to the centre of column 3, at circle mid-height. Labels sit
                    below the circles, so the line can never cross text. */}
                <div
                  className="hidden sm:block absolute top-4.5 left-[16.67%] right-[16.67%] h-px bg-brand-sand"
                  aria-hidden
                />
                {subKeys.map((key, index) => (
                  <m.div
                    key={key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, ease: 'easeOut', delay: 0.35 + index * 0.12 }}
                    className="relative text-center"
                  >
                    {/* Numbered circle — solid background so it masks the line behind it */}
                    <m.span
                      whileHover={{ scale: 1.18, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                      className="relative z-10 mx-auto w-9 h-9 rounded-full bg-brand-ivory border border-brand-gold/40 flex items-center justify-center text-brand-gold text-sm font-semibold cursor-default"
                    >
                      {index + 1}
                    </m.span>
                    <p className="mt-4 mb-2 text-brand-navy text-sm font-semibold tracking-widest uppercase">
                      {t(`pillar1.${key}.title`)}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {t(`pillar1.${key}.body`)}
                    </p>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </Reveal3D>
      </div>
    </section>
  );
}
