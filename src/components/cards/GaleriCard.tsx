'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FotoGaleri } from '@/types';

interface GaleriCardProps {
  foto: FotoGaleri;
  onSelect?: (foto: FotoGaleri) => void;
  className?: string;
}

/**
 * Komponen Kartu Foto Galeri Dokumentasi (Client Component)
 * Menampilkan kartu foto dengan badge kategori dan overlay gradasi sinematik.
 */
export default function GaleriCard({ foto, onSelect, className = '' }: GaleriCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={() => onSelect?.(foto)}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(foto);
              }
            }
          : undefined
      }
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-neutral-200/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-end focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2d4a] ${className}`}
    >
      {/* Gambar Cover */}
      <div className="relative w-full h-full min-h-[220px]">
        {!imgError && foto.foto ? (
          <Image
            src={foto.foto}
            alt={foto.judul}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
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
        {foto.kategori && (
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/45 backdrop-blur-md border border-white/20 text-white/95">
              {foto.kategori}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Info Judul & Tanggal */}
        <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-5 space-y-1 text-left">
          <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-sm group-hover:text-[#bae6fd] transition-colors">
            {foto.judul}
          </h3>
          {foto.tanggal && (
            <p className="font-sans text-xs text-white/75 drop-shadow-xs">
              {foto.tanggal}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
