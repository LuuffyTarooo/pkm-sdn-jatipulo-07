'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Fasilitas } from '@/types';

interface FasilitasCardProps {
  fasilitas: Fasilitas;
}

/**
 * Komponen Kartu Sarana & Fasilitas Sekolah
 * Dilengkapi fallback aman jika foto fasilitas belum tersedia.
 */
export default function FasilitasCard({ fasilitas }: FasilitasCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="fasilitas-card bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full bg-white">
        {!imgError && fasilitas.foto ? (
          <Image
            src={fasilitas.foto}
            alt={`Fasilitas ${fasilitas.nama}`}
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
              <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
              <path d="M9 22v-4h6v4" />
              <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
            </svg>
            <span className="text-xs font-semibold text-white">
              {fasilitas.nama}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex-1">
        <h3 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
          {fasilitas.nama}
        </h3>
        <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">
          {fasilitas.deskripsi}
        </p>
      </div>
    </article>
  );
}
