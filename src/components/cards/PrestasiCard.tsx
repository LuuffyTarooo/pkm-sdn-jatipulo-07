'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Prestasi } from '@/types';
import Badge from '@/components/ui/Badge';

interface PrestasiCardProps {
  prestasi: Prestasi;
}

/**
 * Komponen Kartu Prestasi Siswa & Sekolah
 * Dilengkapi fallback aman jika foto dokumentasi belum tersedia.
 */
export default function PrestasiCard({ prestasi }: PrestasiCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="prestasi-card bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full bg-white">
        {!imgError && prestasi.foto ? (
          <Image
            src={prestasi.foto}
            alt={`Prestasi ${prestasi.judul}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#4c637a] text-white p-4 text-center">
            <svg
              className="w-10 h-10 mb-2 text-white/85"
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
            <span className="text-xs font-semibold text-white">
              {prestasi.tingkat} &bull; {prestasi.tahun}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex-1">
        <div className="flex items-center gap-2 mb-2.5">
          <Badge variant="success">{prestasi.tingkat}</Badge>
          <span className="text-xs text-neutral-500 font-medium">{prestasi.tahun}</span>
        </div>
        <h3 className="font-heading font-bold text-base text-[#0f2d4a] leading-snug">
          {prestasi.judul}
        </h3>
        <p className="text-sm text-neutral-700 mt-1.5">Peraih: {prestasi.peraih}</p>
        {prestasi.deskripsi && (
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{prestasi.deskripsi}</p>
        )}
      </div>
    </article>
  );
}
