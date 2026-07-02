'use client';

import { useRef, useEffect } from 'react';
import { m, useScroll, useTransform, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ChevronDown } from 'lucide-react';

// ── Gold particle system ─────────────────────────────────────────────────────
// Small floating dust rendered on canvas — zero DOM nodes, zero extra deps.
function useGoldParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) return;
    // Capture as non-nullable so closures don't get null-narrowing issues
    const c = rawCtx;

    // brand-gold #C8A26E = rgb(200, 162, 110)
    const COUNT = 55;
    let W = 0, H = 0, raf = 0;

    type P = { x: number; y: number; vx: number; vy: number; r: number; o: number; od: number };

    function make(bottom = false): P {
      return {
        x: Math.random() * W,
        y: bottom ? H + Math.random() * 30 : Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.22 + Math.random() * 0.5),
        r: 0.7 + Math.random() * 2.0,
        o: 0.08 + Math.random() * 0.42,
        od: Math.random() > 0.5 ? 1 : -1,
      };
    }

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    }

    resize();
    window.addEventListener('resize', resize);
    const particles: P[] = Array.from({ length: COUNT }, () => make());

    function tick() {
      c.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.o += p.od * 0.0025;
        if (p.o > 0.5 || p.o < 0.05) p.od *= -1;
        if (p.y < -8) Object.assign(p, make(true));
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(200,162,110,${p.o})`;
        c.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

// ── Animation variants ───────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

// Cinematic clip-reveal: text slides up from behind overflow:hidden parent
const clipReveal = {
  hidden: { y: '108%' },
  show: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGoldParticles(canvasRef as React.RefObject<HTMLCanvasElement>);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.44, 0.65]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh min-h-160 flex items-center justify-center overflow-hidden bg-brand-navy"
      aria-label="Hero section"
    >
      {/* ── Background image (parallax) ── */}
      <m.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/hero/faraglioni.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
          aria-hidden
        />
      </m.div>

      {/* ── Navy overlay (dims on scroll) ── */}
      <m.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-brand-navy"
        aria-hidden
      />

      {/* ── Gold dust particles ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden
      />

      {/* ── Shooting stars (sky area) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[52%] overflow-hidden z-2 pointer-events-none"
        aria-hidden
      >
        <span className="shooting-star shooting-star-1" />
        <span className="shooting-star shooting-star-2" />
        <span className="shooting-star shooting-star-3" />
      </div>

      {/* ── Gold accent line top ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-gold/30" aria-hidden />

      {/* ── Content ── */}
      <m.div
        style={{ y: contentY }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto will-change-transform"
      >
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <m.p
            variants={fadeUp}
            className="text-brand-gold text-xs font-semibold tracking-[0.28em] uppercase mb-10"
          >
            Gargano — Puglia — Italia
          </m.p>

          {/* H1 line 1 — clip reveal */}
          <div className="overflow-hidden">
            <m.h1
              variants={clipReveal}
              className="block font-serif text-white text-4xl sm:text-5xl lg:text-7xl font-light leading-tight"
            >
              {t('headline')}
            </m.h1>
          </div>

          {/* H1 line 2 — gold clip reveal */}
          <div className="overflow-hidden mb-8">
            <m.span
              variants={clipReveal}
              className="block font-serif text-brand-gold text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight"
            >
              {t('headlineBold')}
            </m.span>
          </div>

          {/* Gold ornamental divider */}
          <m.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <div className="w-10 h-px bg-brand-gold/40" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/60" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/40" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/60" />
            <div className="w-10 h-px bg-brand-gold/40" />
          </m.div>

          {/* Subtitle */}
          <m.p
            variants={fadeUp}
            className="text-white/70 text-lg sm:text-xl max-w-xl leading-relaxed font-light"
          >
            {t('subtitle')}
          </m.p>

          {/* CTAs */}
          <m.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/appartamenti"
              className="px-8 py-4 bg-brand-gold text-brand-navy font-semibold text-sm tracking-wide rounded hover:bg-brand-gold/90 hover:scale-[1.03] transition-all duration-200 shadow-lg shadow-brand-gold/25"
            >
              {t('cta')}
            </Link>
            <Link
              href="/contatti"
              className="px-8 py-4 border border-white/30 text-white font-medium text-sm tracking-wide rounded hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
            >
              {t('ctaContact')}
            </Link>
          </m.div>
        </m.div>
      </m.div>

      {/* ── Scroll indicator ── */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        aria-hidden
      >
        <m.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </m.div>
      </m.div>
    </section>
  );
}
