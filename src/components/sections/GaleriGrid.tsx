'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FotoGaleri } from '@/types';

interface GaleriGridProps {
  initialItems: FotoGaleri[];
}

type KategoriTab = 'Semua' | 'Akademik' | 'Kegiatan' | 'Umum';

const TABS: KategoriTab[] = ['Semua', 'Akademik', 'Kegiatan', 'Umum'];

/**
 * Galeri Foto SDN Jatipulo 07 Jakarta
 * Grid bento 3 kolom kompak dengan:
 * - Tab filter kategori rata kiri
 * - Layout asimetris: item 0 = tall (2 baris), item 3 = wide (2 kolom)
 * - Kartu kompak dengan overlay teks, badge kategori, dan lightbox
 */
export default function GaleriGrid({ initialItems }: GaleriGridProps) {
  const [activeTab, setActiveTab] = useState<KategoriTab>('Semua');
  const [selectedPhoto, setSelectedPhoto] = useState<FotoGaleri | null>(null);

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
    document.body.style.overflow = selectedPhoto ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPhoto]);

  return (
    <div className="w-full space-y-6 sm:space-y-8">

      {/* Tab Filter Kategori */}
      <div
        role="tablist"
        aria-label="Filter kategori galeri"
        className="flex flex-wrap items-center gap-2"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#064e3b] ${
                isActive
                  ? 'bg-[#064e3b] text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid Bento 3 Kolom Kompak */}
      {filteredPhotos.length === 0 ? (
        <p className="text-neutral-500 text-sm py-16 text-center font-sans">
          Belum ada dokumentasi untuk kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
          {filteredPhotos.map((item, index) => {
            // Layout asimetris: item pertama tall, item keempat wide
            let spanClass = '';
            if (activeTab === 'Semua' && index === 0) {
              spanClass = 'sm:row-span-2';
            } else if (activeTab === 'Semua' && index === 3) {
              spanClass = 'lg:col-span-2';
            }

            return (
              <article
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className={`group relative rounded-xl overflow-hidden cursor-pointer bg-neutral-200 ${spanClass}`}
              >
                {/* Foto */}
                <Image
                  src={item.foto}
                  alt={item.judul}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />

                {/* Badge Kategori */}
                {item.kategori && (
                  <div className="absolute top-2.5 left-2.5 z-20">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-[#064e3b]/85 text-white">
                      {item.kategori}
                    </span>
                  </div>
                )}

                {/* Scrim bawah untuk keterbacaan teks */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" /* taste-skill-ignore: neutral photo scrim */
                  aria-hidden="true"
                />

                {/* Judul & Tanggal */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                  <h3 className="font-heading font-bold text-white text-xs sm:text-sm leading-snug line-clamp-2">
                    {item.judul}
                  </h3>
                  {item.tanggal && (
                    <p className="text-[10px] sm:text-[11px] text-white/70 mt-1 font-sans">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90"
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Foto Besar */}
            <div className="relative w-full aspect-[16/10] bg-black">
              <Image
                src={selectedPhoto.foto}
                alt={selectedPhoto.judul}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
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
                  <span className="text-xs font-semibold text-emerald-400">
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
