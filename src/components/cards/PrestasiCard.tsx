'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Prestasi } from '@/types';

interface PrestasiCardProps {
  prestasi: Prestasi;
  onOpenModal: (prestasi: Prestasi) => void;
}

/**
 * Kartu Prestasi Siswa SDN Jatipulo 07 Jakarta
 * Mengadopsi tema Royal Academic Navy: elegan, minimalis, dan proporsional.
 */
export default function PrestasiCard({ prestasi, onOpenModal }: PrestasiCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      data-ui="prestasi-card"
      onClick={() => !imgError && prestasi.foto && onOpenModal(prestasi)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !imgError && prestasi.foto) {
          e.preventDefault();
          onOpenModal(prestasi);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Dokumentasi prestasi ${prestasi.judul} - ${prestasi.peraih}`}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#1d4e78]/50 transition-colors duration-200 flex flex-col h-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d4e78]"
    >
      {/* 1. Foto Dokumentasi Poster Beraspek 4:3 dengan Framing Kepala Proporsional */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 shrink-0">
        {!imgError && prestasi.foto ? (
          <Image
            src={prestasi.foto}
            alt={`Dokumentasi prestasi ${prestasi.judul}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 280px"
            className="object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f2d4a] text-white p-4 text-center">
            <svg
              className="w-10 h-10 mb-2 text-[#7dd3fc]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            <span className="text-xs font-semibold text-white/90">
              Dokumentasi Arsip
            </span>
          </div>
        )}
      </div>

      {/* 2. Konten Teks: Judul, Peraih & Tahun, serta Kalimat Deskripsi */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Judul Prestasi */}
          <h3 className="font-heading font-bold text-sm sm:text-base text-[#0f2d4a] group-hover:text-[#1d4e78] transition-colors leading-snug">
            {prestasi.judul}
          </h3>

          {/* Nama Peraih & Tahun */}
          <p className="text-xs text-slate-600 font-sans mt-1.5 flex items-center gap-1.5 flex-wrap">
            <span>
              Peraih: <strong className="font-semibold text-[#0f2d4a]">{prestasi.peraih}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-300">
              &bull;
            </span>
            <span className="text-slate-500 font-medium">Tahun {prestasi.tahun}</span>
          </p>

          {/* Kalimat Deskripsi Lengkap */}
          {prestasi.deskripsi && (
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-4 leading-relaxed mt-2.5 font-sans">
              {prestasi.deskripsi}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
