'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Prestasi } from '@/types';
import PrestasiCard from '@/components/cards/PrestasiCard';

interface PrestasiDirectoryProps {
  initialPrestasi: Prestasi[];
}

/**
 * Direktori Prestasi Siswa SDN Jatipulo 07 Jakarta
 * Desain Bersih, Bernapas, dan Benar-Benar Minimalis.
 */
export default function PrestasiDirectory({ initialPrestasi }: PrestasiDirectoryProps) {
  const [selectedPrestasi, setSelectedPrestasi] = useState<Prestasi | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPrestasi) {
        setSelectedPrestasi(null);
      }
    },
    [selectedPrestasi]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = selectedPrestasi ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPrestasi]);

  return (
    <div className="w-full">
      {/* Grid Kartu Prestasi 4 Kolom Rapi & Proporsional */}
      {initialPrestasi.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
          {initialPrestasi.map((prestasi) => (
            <PrestasiCard
              key={prestasi.id}
              prestasi={prestasi}
              onOpenModal={(p) => setSelectedPrestasi(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/90 p-8 max-w-md mx-auto">
          <p className="font-heading font-semibold text-base text-slate-800">
            Belum ada dokumentasi prestasi
          </p>
          <p className="font-sans text-xs sm:text-sm text-slate-500 mt-1">
            Data raihan prestasi peserta didik sedang dalam proses verifikasi arsip sekolah.
          </p>
        </div>
      )}

      {/* Modal Lightbox Resolusi Penuh Minimalis */}
      {selectedPrestasi && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Piagam ${selectedPrestasi.judul}`}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/90 cursor-pointer"
          onClick={() => setSelectedPrestasi(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] bg-neutral-950 rounded-2xl overflow-hidden cursor-default flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              type="button"
              onClick={() => setSelectedPrestasi(null)}
              aria-label="Tutup pratinjau foto"
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Foto Piagam / Poster Resolusi Penuh */}
            <div className="relative w-full aspect-[4/5] max-h-[72vh]">
              <Image
                src={selectedPrestasi.foto}
                alt={selectedPrestasi.judul}
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-contain"
              />
            </div>

            {/* Footer Keterangan Singkat & Cerita Prestasi */}
            <div className="w-full p-5 bg-neutral-900 text-white text-center space-y-1.5">
              <h4 className="font-heading font-bold text-sm sm:text-base text-white px-4">
                {selectedPrestasi.judul}
              </h4>
              <p className="text-xs text-neutral-300 font-sans">
                Peraih: <span className="text-[#7dd3fc] font-semibold">{selectedPrestasi.peraih}</span> &bull; Tahun {selectedPrestasi.tahun}
              </p>
              {selectedPrestasi.deskripsi && (
                <p className="text-xs text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed pt-1">
                  {selectedPrestasi.deskripsi}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
