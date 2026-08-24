'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { m, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { type PhotoSection } from '@/lib/data/properties';
import { pick } from '@/lib/locale';

interface PropertyGalleryProps {
  photos: string[];
  photoSections?: PhotoSection[];
  propertyName: string;
}

export default function PropertyGallery({ photos, photoSections, propertyName }: PropertyGalleryProps) {
  const locale = useLocale();
  const t = useTranslations('gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Slide direction: 1 = forward, -1 = backward. Drives the enter/exit animation
  const [direction, setDirection] = useState(1);

  // Swipe tracking (mobile) and thumbnail strip auto-scroll
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  // Flatten sections into ordered array for lightbox navigation
  const allPhotos = useMemo(
    () => (photoSections ? photoSections.flatMap((s) => s.photos) : photos),
    [photoSections, photos]
  );

  const isOpen = lightboxIndex !== null;

  function openLightbox(index: number) {
    setDirection(1);
    setLightboxIndex(index);
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((i) => (i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null));
  }, [allPhotos.length]);

  const nextImage = useCallback(() => {
    setDirection(1);
    setLightboxIndex((i) => (i !== null ? (i + 1) % allPhotos.length : null));
  }, [allPhotos.length]);

  // Jump straight to a photo from the thumbnail strip
  const goToImage = useCallback(
    (index: number) => {
      setDirection(lightboxIndex !== null && index < lightboxIndex ? -1 : 1);
      setLightboxIndex(index);
    },
    [lightboxIndex]
  );

  // Horizontal swipe > 50px navigates; vertical-dominant gestures are ignored
  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) nextImage();
    else prevImage();
  }

  // Lock page scroll while open — cleanup always restores it, even if the component
  // unmounts (route change) while the lightbox is still open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Window-level listener — the dialog isn't reliably focused on open, so keydown
  // handlers attached to the dialog element itself would silently never fire
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeLightbox, prevImage, nextImage]);

  // Keep the active thumbnail centered in the strip as the user navigates
  useEffect(() => {
    if (lightboxIndex === null) return;
    const strip = thumbStripRef.current;
    const thumb = strip?.children[lightboxIndex] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [lightboxIndex]);

  return (
    <>
      {photoSections ? (
        // Sectioned gallery
        <div className="space-y-10">
          {photoSections.map((section, sectionIndex) => {
            // Calculate global offset for this section's photos
            const offset = photoSections
              .slice(0, sectionIndex)
              .reduce((sum, s) => sum + s.photos.length, 0);

            return (
              <div key={sectionIndex}>
                <h3 className="text-brand-navy font-medium text-sm uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="w-6 h-px bg-brand-gold inline-block" />
                  {pick(section.label, locale)}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.photos.map((photo, localIndex) => {
                    const globalIndex = offset + localIndex;
                    return (
                      <button
                        key={localIndex}
                        onClick={() => openLightbox(globalIndex)}
                        className={`relative overflow-hidden rounded-xl bg-brand-sand cursor-pointer group ${
                          localIndex === 0 ? 'col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-square'
                        }`}
                        aria-label={t('viewPhoto', { n: globalIndex + 1, name: propertyName })}
                      >
                        <Image
                          src={photo}
                          alt={`${propertyName} — ${pick(section.label, locale)}`}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          sizes={
                            localIndex === 0
                              ? '(max-width: 768px) 100vw, 66vw'
                              : '(max-width: 768px) 50vw, 33vw'
                          }
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Flat gallery fallback
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {allPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-xl bg-brand-sand cursor-pointer group ${
                index === 0 ? 'col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
              aria-label={t('viewPhoto', { n: index + 1, name: propertyName })}
            >
              <Image
                src={photo}
                alt={t('photoAlt', { n: index + 1, name: propertyName })}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes={
                  index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'
                }
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('dialogLabel', { name: propertyName })}
          className="fixed inset-0 z-[60] flex h-dvh w-screen flex-col bg-black select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top bar — counter + close, kept off the image so nothing overlaps it */}
          <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 shrink-0">
            <span className="text-white/60 text-sm tabular-nums tracking-wide">
              {lightboxIndex + 1} / {allPhotos.length}
            </span>
            <button
              onClick={closeLightbox}
              aria-label={t('close')}
              className="btn-glass btn-glass-icon btn-glass-dark"
            >
              <X size={22} />
            </button>
          </div>

          {/* Image stage — flex-1 + min-h-0 lets object-contain use all remaining space */}
          <div
            className="relative flex-1 min-h-0 w-full"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.div
                key={lightboxIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute inset-y-0 left-2 right-2 sm:left-6 sm:right-6 lg:left-24 lg:right-24"
              >
                <Image
                  src={allPhotos[lightboxIndex]}
                  alt={t('photoAlt', { n: lightboxIndex + 1, name: propertyName })}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </m.div>
            </AnimatePresence>

            {/* Wrappers carry the positioning: .btn-glass sets position:relative outside
                any @layer, which overrides Tailwind's .absolute on the button itself */}
            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={prevImage}
                aria-label={t('prev')}
                className="btn-glass btn-glass-icon btn-glass-dark"
              >
                <ChevronLeft size={28} />
              </button>
            </div>
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={nextImage}
                aria-label={t('next')}
                className="btn-glass btn-glass-icon btn-glass-dark"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div
            ref={thumbStripRef}
            className="flex gap-2 overflow-x-auto px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shrink-0 scrollbar-none"
          >
            {allPhotos.map((photo, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                aria-label={t('viewPhoto', { n: index + 1, name: propertyName })}
                aria-current={index === lightboxIndex}
                className={`relative shrink-0 h-14 w-20 sm:h-16 sm:w-24 overflow-hidden rounded-md transition-opacity ${
                  index === lightboxIndex
                    ? 'opacity-100 ring-2 ring-brand-gold'
                    : 'opacity-40 hover:opacity-75'
                }`}
              >
                <Image src={photo} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
