'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { type PhotoSection } from '@/lib/data/properties';

interface PropertyGalleryProps {
  photos: string[];
  photoSections?: PhotoSection[];
  propertyName: string;
}

export default function PropertyGallery({ photos, photoSections, propertyName }: PropertyGalleryProps) {
  const locale = useLocale();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten sections into ordered array for lightbox navigation
  const allPhotos = useMemo(
    () => (photoSections ? photoSections.flatMap((s) => s.photos) : photos),
    [photoSections, photos]
  );

  function openLightbox(index: number) {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }

  function prevImage() {
    setLightboxIndex((i) => (i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null));
  }

  function nextImage() {
    setLightboxIndex((i) => (i !== null ? (i + 1) % allPhotos.length : null));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  }

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
                  {locale === 'en' ? section.label.en : section.label.it}
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
                        aria-label={`Vedi foto ${globalIndex + 1} di ${propertyName}`}
                      >
                        <Image
                          src={photo}
                          alt={`${propertyName} — ${locale === 'en' ? section.label.en : section.label.it}`}
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
              aria-label={`Vedi foto ${index + 1} di ${propertyName}`}
            >
              <Image
                src={photo}
                alt={`${propertyName} — foto ${index + 1}`}
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
          aria-label={`Galleria ${propertyName}`}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            onClick={closeLightbox}
            aria-label="Chiudi galleria"
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer p-2"
          >
            <X size={28} />
          </button>

          <button
            onClick={prevImage}
            aria-label="Foto precedente"
            className="absolute left-4 text-white/70 hover:text-white transition-colors cursor-pointer p-2"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="relative w-full max-w-4xl max-h-[85vh] mx-16">
            <Image
              src={allPhotos[lightboxIndex]}
              alt={`${propertyName} — foto ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-lg"
              style={{ maxHeight: '85vh' }}
            />
          </div>

          <button
            onClick={nextImage}
            aria-label="Foto successiva"
            className="absolute right-4 text-white/70 hover:text-white transition-colors cursor-pointer p-2"
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
