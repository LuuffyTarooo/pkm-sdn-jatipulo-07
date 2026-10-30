'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Berita } from '@/types';
import { formatTanggal } from '@/lib/utils';

interface BeritaCardProps {
  berita: Berita;
}

/**
 * Komponen Kartu Berita, Pengumuman, dan Agenda
 * Mengadopsi prinsip minimalis editorial bebas AI-slop (taste-skill v2):
 * - Permukaan flat alami tanpa garis tepi buatan
 * - Tipografi proporsional dengan rasio gambar 16:10 yang rapi
 * - Transisi warna eksplisit dan bebas gradasi warna
 */
export default function BeritaCard({ berita }: BeritaCardProps) {
  const [imgError, setImgError] = useState(false);

  // Kategori badge dengan warna flat solid
  const getBadgeStyle = () => {
    switch (berita.kategori) {
      case 'Pengumuman':
        return 'bg-[#064e3b] text-white';
      case 'Agenda':
        return 'bg-[#b45309] text-white';
      case 'Berita':
      default:
        return 'bg-[#ecfdf5] text-[#064e3b]';
    }
  };

  return (
    <article className="group bg-white rounded-2xl flex flex-col h-full overflow-hidden">
      {/* Gambar Thumbnail Berita */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ecfdf5]">
        {!imgError && berita.gambarUtama ? (
          <Image
            src={berita.gambarUtama}
            alt={berita.judul}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#064e3b] text-white p-4 text-center">
            <svg
              className="w-10 h-10 mb-2 text-[#a7f3d0]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
            <span className="text-xs font-semibold text-white/90">
              SDN Jatipulo 07
            </span>
          </div>
        )}

        {/* Badge Kategori Solid di Sudut Atas */}
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md ${getBadgeStyle()}`}>
            {berita.kategori}
          </span>
        </div>
      </div>

      {/* Konten Kartu */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Tanggal & Penulis */}
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
            <time dateTime={berita.tanggal}>{formatTanggal(berita.tanggal)}</time>
            {berita.penulis && (
              <>
                <span>&bull;</span>
                <span>{berita.penulis}</span>
              </>
            )}
          </div>

          {/* Judul Berita */}
          <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-900 group-hover:text-[#064e3b] transition-colors line-clamp-2 mb-2 leading-snug">
            <Link href={`/berita/${berita.slug}`} className="focus:outline-none focus:underline">
              {berita.judul}
            </Link>
          </h3>

          {/* Ringkasan */}
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
            {berita.ringkasan}
          </p>
        </div>

        {/* Tautan Baca */}
        <div className="pt-2 mt-auto">
          <Link
            href={`/berita/${berita.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#064e3b] group-hover:text-[#059669] transition-colors"
          >
            <span>Baca Selengkapnya</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
