'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FotoGaleri } from '@/types';

interface GaleriGridProps {
  initialItems: FotoGaleri[];
}

/**
 * Galeri Foto SDN Jatipulo 07 Jakarta
 * Grid galeri responsif dengan:
 * - Tab filter kategori dinamis
 * - Tata letak adaptif: grid seimbang untuk koleksi terkurasi, dan bento grid untuk koleksi banyak foto
 * - Kartu foto dengan overlay teks, badge kategori, dan modal Lightbox perbesar foto
 */
export default function GaleriGrid({ initialItems }: GaleriGridProps) {
  const tabs = useMemo(() => {
    const rawCategories = initialItems
      .map((item) => item.kategori)
      .filter(Boolean) as string[];
    const unique = Array.from(new Set(rawCategories));
    return ['Semua', ...unique];
  }, [initialItems]);

  const [activeTab, setActiveTab] = useState<string>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<FotoGaleri | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredPhotos = useMemo(() => {
    if (activeTab === 'Semua') return initialItems;
    return initialItems.filter(
      (item) => item.kategori?.toLowerCase() === activeTab.toLowerCase()
    );
  }, [initialItems, activeTab]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPhoto) setSelectedPhoto(null);
    },
    [selectedPhoto]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = selectedPhoto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Tab Filter Kategori (hanya tampil jika terdapat lebih dari 1 opsi tab) */}
      {tabs.length > 1 && (
        <div
          role="tablist"
          aria-label="Filter kategori galeri"
          className="flex flex-wrap items-center gap-2"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2d4a] ${
                  isActive
                    ? 'bg-[#0f2d4a] text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid Galeri Adaptif */}
      {filteredPhotos.length === 0 ? (
        <p className="text-neutral-500 text-sm py-16 text-center font-sans">
          Belum ada dokumentasi untuk kategori ini.
        </p>
      ) : (
        <div
          className={`grid gap-4 sm:gap-6 ${
            filteredPhotos.length <= 2
              ? 'grid-cols-1 sm:grid-cols-2 auto-rows-[280px] sm:auto-rows-[340px]'
              : filteredPhotos.length === 3
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] sm:auto-rows-[300px]'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[180px] sm:auto-rows-[200px]'
          }`}
        >
          {filteredPhotos.map((item, index) => {
            // Layout asimetris hanya berlaku saat koleksi berisi 4 foto atau lebih
            let spanClass = '';
            if (activeTab === 'Semua') {
              if (filteredPhotos.length >= 4 && index === 0) {
                spanClass = 'sm:row-span-2';
              } else if (filteredPhotos.length === 4 && index === 3) {
                spanClass = 'sm:col-span-2 lg:col-span-2';
              } else if (filteredPhotos.length === 6) {
                if (index === 3) spanClass = 'lg:col-span-2';
                if (index === 5) spanClass = 'sm:col-span-2 lg:col-span-2';
              } else if (filteredPhotos.length === 7 && index === 6) {
                spanClass = 'lg:col-span-2';
              }
            }

            return (
              <article
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`Lihat foto: ${item.judul}`}
                onClick={() => setSelectedPhoto(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPhoto(item);
                  }
                }}
                className={`group relative rounded-xl overflow-hidden cursor-pointer bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2d4a] focus-visible:ring-offset-2 ${spanClass}`}
              >
                {/* Foto */}
                {!imgErrors[item.id] && item.foto ? (
                  <Image
                    src={item.foto}
                    alt={item.judul}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [item.id]: true }))
                    }
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#4c637a] text-white p-4 text-center">
                    <svg
                      className="w-10 h-10 text-white/85"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                )}

                {/* Badge Kategori */}
                {item.kategori && (
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/45 backdrop-blur-md border border-white/20 text-white/95">
                      {item.kategori}
                    </span>
                  </div>
                )}

                {/* Scrim bawah untuk keterbacaan teks */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" /* taste-skill-ignore: neutral photo scrim */
                  aria-hidden="true"
                />

                {/* Judul & Tanggal */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 z-10">
                  <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug line-clamp-2">
                    {item.judul}
                  </h3>
                  {item.tanggal && (
                    <p className="text-xs text-white/75 mt-1 font-sans">
                      {item.tanggal}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal Lightbox */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8 bg-black/90"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-950 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tutup */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Tutup"
              className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors duration-150 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Foto Besar */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black max-h-[70vh]">
              {!imgErrors[selectedPhoto.id] && selectedPhoto.foto ? (
                <Image
                  src={selectedPhoto.foto}
                  alt={selectedPhoto.judul}
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                  onError={() =>
                    setImgErrors((prev) => ({
                      ...prev,
                      [selectedPhoto.id]: true,
                    }))
                  }
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#4c637a] text-white p-6 text-center">
                  <svg
                    className="w-12 h-12 mb-2 text-white/85"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="text-xs font-semibold text-white">
                    SDN Jatipulo 07
                  </span>
                </div>
              )}
            </div>

            {/* Keterangan */}
            <div className="p-4 sm:p-6 bg-neutral-950 text-left space-y-1.5">
              <h2
                id="lightbox-title"
                className="font-heading text-base sm:text-lg font-bold text-white leading-snug"
              >
                {selectedPhoto.judul}
              </h2>

              <div className="flex items-center gap-3">
                {selectedPhoto.kategori && (
                  <span className="text-xs font-semibold text-[#7dd3fc]">
                    {selectedPhoto.kategori}
                  </span>
                )}
                {selectedPhoto.tanggal && (
                  <span className="text-xs text-neutral-500 font-sans">
                    {selectedPhoto.tanggal}
                  </span>
                )}
              </div>

              {selectedPhoto.deskripsi && (
                <p className="text-sm text-neutral-300 font-sans leading-relaxed mt-2 max-w-2xl">
                  {selectedPhoto.deskripsi}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
