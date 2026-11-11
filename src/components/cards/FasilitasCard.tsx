'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Fasilitas } from '@/types';

interface FasilitasCardProps {
  fasilitas: Fasilitas;
  priority?: boolean;
}

/**
 * Komponen Kartu Fasilitas / Sarana Prasarana Sekolah
 * Tampilan modern, bersih, minimalis (tasteskill v2 anti-slop)
 */
export default function FasilitasCard({ fasilitas, priority = false }: FasilitasCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article data-ui="fasilitas-card" className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col justify-between hover:-translate-y-1" style={{ transition: 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94), border-color 300ms ease' }}>
      {/* 1. Foto Dokumentasi Fasilitas */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden shrink-0">
        {!imgError && fasilitas.foto ? (
          <Image
            src={fasilitas.foto}
            alt={fasilitas.nama}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
            <svg
              className="w-10 h-10 mb-2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
              <path d="M9 22v-4h6v4" />
              <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
            </svg>
            <span className="text-xs font-semibold text-slate-600">
              {fasilitas.nama}
            </span>
          </div>
        )}
      </div>

      {/* 2. Informasi Fasilitas */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {fasilitas.kategori && (
            <span className="inline-block py-1 px-2.5 rounded-lg bg-blue-50/80 text-[#0f2d4a] text-xs font-semibold mb-2">
              {fasilitas.kategori}
            </span>
          )}

          <h3 className="font-heading font-bold text-base text-[#0b182a] leading-snug mb-2">
            {fasilitas.nama}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
            {fasilitas.deskripsi}
          </p>
        </div>

        {/* 3. Fitur / Spesifikasi Penunjang */}
        {fasilitas.fitur && fasilitas.fitur.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5">
            {fasilitas.fitur.map((item, idx) => (
              <span
                key={idx}
                className="py-1 px-2.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
