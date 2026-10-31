'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dataBerita } from '@/data/berita';
import { formatTanggal } from '@/lib/utils';

type KategoriTab = 'Semua' | 'Berita' | 'Pengumuman' | 'Agenda';

/**
 * Komponen Seksi Berita & Pengumuman di Beranda
 * Didesain ulang menggunakan prinsip UI/UX Pro Max:
 * - Proporsi kompak dan seimbang (tidak terlalu besar / memakan tempat vertikal)
 * - Tab filter interaktif (Semua, Berita, Pengumuman, Agenda) dengan counter
 * - Grid 3 kartu yang harmonis dan responsif
 * - Strip info cepat untuk pengumuman penting yang disematkan
 */
export default function BeritaTerbaru() {
  const [activeTab, setActiveTab] = useState<KategoriTab>('Semua');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Filter berita sesuai tab yang dipilih
  const filteredBerita =
    activeTab === 'Semua'
      ? dataBerita
      : dataBerita.filter((b) => b.kategori === activeTab);

  const tabs: KategoriTab[] = ['Semua', 'Berita', 'Pengumuman', 'Agenda'];

  return (
    <section
      aria-labelledby="berita-heading"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto max-w-6xl space-y-6 sm:space-y-8">
        
        {/* Header Seksi Kompak: Judul, Subjudul & Tombol Arsip */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d4e78] font-sans mb-1">
              Informasi &amp; Publikasi Sekolah
            </p>

            <h2
              id="berita-heading"
              className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] tracking-tight leading-tight"
            >
              Berita &amp; Pengumuman
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-sans max-w-xl">
              Publikasi aktivitas belajar, prestasi peserta didik, dan agenda resmi SDN Jatipulo 07 Jakarta.
            </p>
          </div>

          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#0f2d4a] bg-[#eff6ff] hover:bg-[#dbeafe] transition-colors self-start sm:self-center shrink-0"
          >
            <span>Semua Berita &amp; Pengumuman</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Tab Filter Interaktif */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter kategori berita">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2d4a] ${
                  isActive
                    ? 'bg-[#0f2d4a] text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Grid Kartu Berita Proporsional & Kompak (Maksimal 3 Kartu) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredBerita.slice(0, 3).map((item) => {
            const hasError = imgErrors[item.id];

            return (
              <article
                key={item.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#93c5fd] transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Thumbnail Gambar Kompak (16:10) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                  {!hasError && item.gambarUtama ? (
                    <Image
                      src={item.gambarUtama}
                      alt={item.judul}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={() => handleImgError(item.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#4c637a] text-white p-4 text-center">
                      <svg
                        className="w-8 h-8 text-white/85 mb-1"
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
                      <span className="text-xs font-semibold text-white">
                        SDN Jatipulo 07
                      </span>
                    </div>
                  )}

                  {/* Kategori Badge di Kiri Atas */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/45 backdrop-blur-md border border-white/25 text-white/95">
                      {item.kategori}
                    </span>
                  </div>
                </div>

                {/* Konten Kartu */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata Tanggal & Penulis */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 font-sans">
                      <time dateTime={item.tanggal}>
                        {formatTanggal(item.tanggal)}
                      </time>
                      {item.penulis && (
                        <>
                          <span>&bull;</span>
                          <span className="truncate max-w-[130px]">
                            {item.penulis}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Judul Berita */}
                    <h3 className="font-heading font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#0f2d4a] transition-colors line-clamp-2 leading-snug mb-2">
                      <Link
                        href={`/berita/${item.slug}`}
                        className="focus:outline-none focus:underline"
                      >
                        {item.judul}
                      </Link>
                    </h3>

                    {/* Ringkasan Singkat */}
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-sans">
                      {item.ringkasan}
                    </p>
                  </div>

                  {/* Tautan Baca & Tag */}
                  <div className="pt-3 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <Link
                      href={`/berita/${item.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-[#0f2d4a] group-hover:text-[#1d4e78] transition-colors"
                    >
                      <span>Baca Selengkapnya</span>
                      <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
                        &rarr;
                      </span>
                    </Link>

                    {item.tags && item.tags[0] && (
                      <span className="text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
                        #{item.tags[0]}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
