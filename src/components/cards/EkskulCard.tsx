'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Ekskul } from '@/types';

interface EkskulCardProps {
  ekskul: Ekskul;
}

/**
 * Komponen Kartu Kegiatan Ekstrakurikuler
 * Dilengkapi fallback aman jika foto kegiatan belum tersedia.
 */
export default function EkskulCard({ ekskul }: EkskulCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="ekskul-card bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden flex flex-col h-full">
      <div className="relative h-44 w-full bg-white">
        {!imgError && ekskul.foto ? (
          <Image
            src={ekskul.foto}
            alt={`Ekstrakurikuler ${ekskul.nama}`}
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
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-xs font-semibold text-white">
              {ekskul.nama}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
            {ekskul.nama}
          </h3>
          <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">
            {ekskul.deskripsi}
          </p>
        </div>
        {ekskul.jadwal && (
          <p className="text-xs font-medium text-[#1d4e78] mt-3 pt-2.5 border-t border-gray-100">
            Jadwal: {ekskul.jadwal}
          </p>
        )}
      </div>
    </article>
  );
}
