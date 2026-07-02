'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
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

  // Flatten sections into ordered array for lightbox navigation
  const allPhotos = useMemo(
    () => (photoSections ? photoSections.flatMap((s) => s.photos) : photos),
    [photoSections, photos]
  );

  const isOpen = lightboxIndex !== null;

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null));
  }, [allPhotos.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % allPhotos.length : null));
  }, [allPhotos.length]);

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
                          sizes="(max-width: 768px) 50vw, 33vw"
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
                sizes="(max-width: 768px) 50vw, 33vw"
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
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        >
          <button
            onClick={closeLightbox}
            aria-label={t('close')}
            className="btn-glass btn-glass-icon btn-glass-dark absolute top-4 right-4"
          >
            <X size={28} />
          </button>

          <button
            onClick={prevImage}
            aria-label={t('prev')}
            className="btn-glass btn-glass-icon btn-glass-dark absolute left-4"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="relative w-full max-w-4xl max-h-[85vh] mx-16">
            <Image
              src={allPhotos[lightboxIndex]}
              alt={t('photoAlt', { n: lightboxIndex + 1, name: propertyName })}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-lg"
              style={{ maxHeight: '85vh' }}
            />
          </div>

          <button
            onClick={nextImage}
            aria-label={t('next')}
            className="btn-glass btn-glass-icon btn-glass-dark absolute right-4"
          >
            <ChevronRight size={36} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightboxIndex + 1} / {allPhotos.length}
          </div>
        </div>
      )}
    </>
  );
}
