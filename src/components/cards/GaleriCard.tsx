import React from 'react';
import Image from 'next/image';
import { FotoGaleri } from '@/types';

interface GaleriCardProps {
  foto: FotoGaleri;
  onSelect?: (foto: FotoGaleri) => void;
  className?: string;
}

/**
 * Komponen Kartu Foto Galeri Dokumentasi (Server / Client Component Compatible)
 * Menampilkan kartu foto dengan badge kategori dan overlay gradasi sinematik.
 */
export default function GaleriCard({ foto, onSelect, className = '' }: GaleriCardProps) {
  return (
    <article
      onClick={() => onSelect?.(foto)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-200/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-end ${className}`}
    >
      {/* Gambar Cover */}
      <div className="relative w-full h-full min-h-[220px]">
        <Image
          src={foto.foto}
          alt={foto.judul}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge Kategori Amber/Gold */}
        {foto.kategori && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-amber-300 bg-black/55 backdrop-blur-xs border border-amber-400/50">
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
          <h3 className="font-heading font-bold text-white text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-sm group-hover:text-emerald-200 transition-colors">
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
