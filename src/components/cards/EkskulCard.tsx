'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Ekskul } from '@/types';

interface EkskulCardProps {
  ekskul: Ekskul;
}

export default function EkskulCard({ ekskul }: EkskulCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article data-ui="ekskul-card" className="group bg-white rounded-2xl border border-gray-200/80 hover:border-[#1d4e78]/40 transition-colors duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1" style={{ transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94), border-color 300ms ease' }}>
      {/* Thumbnail Foto Kegiatan */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
        {!imgError && ekskul.foto ? (
          <Image
            src={ekskul.foto}
            alt={`Kegiatan Ekstrakurikuler ${ekskul.nama}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-xs font-semibold text-white/90">
              {ekskul.nama}
            </span>
          </div>
        )}
      </div>

      {/* Konten Kartu */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Judul Ekstrakurikuler */}
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#0f2d4a] group-hover:text-[#1d4e78] transition-colors leading-snug">
            {ekskul.nama}
          </h3>

          {/* Deskripsi Singkat */}
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed mt-1.5 font-sans">
            {ekskul.deskripsi}
          </p>
        </div>

        {/* Jadwal Latihan */}
        {ekskul.jadwal && (
          <div className="mt-3.5 pt-3 flex items-center gap-2 text-xs text-[#1d4e78] font-sans font-medium">
            <svg
              className="w-3.5 h-3.5 text-[#1d4e78] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="truncate">{ekskul.jadwal}</span>
          </div>
        )}
      </div>
    </article>
  );
}
