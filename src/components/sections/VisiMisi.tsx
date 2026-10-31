import React from 'react';
import Image from 'next/image';
import { dataSekolah } from '@/data/sekolah';

/**
 * Komponen Seksi Visi dan Misi Sekolah (Compact Edge-to-Edge Showcase)
 * Menerapkan Palet Royal Academic Navy Bersih & Institusional:
 * - Foto latar belakang panjang mentok sisi kanan & kiri (full-width horizontal)
 * - Dimensi vertikal dibuat ringkas dan proporsional
 * - Gradasi hitam halus sehingga foto sekolah tetap terlihat jelas
 * - Kartu putih bersih dengan aksen Academic Navy (bebas blob sudut, watermark, & warna oranye)
 */
export default function VisiMisi() {
  return (
    <section
      id="visi-misi"
      aria-labelledby="visimisi-heading"
      className="relative w-full py-10 sm:py-12 md:py-14 overflow-hidden bg-black text-white"
    >
      {/* 1. Foto Background Sekolah Full-Width (Mentok Sisi Kanan & Kiri) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-image.png"
          alt="Gedung dan Lingkungan SDN Jatipulo 07 Jakarta"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />

        {/* 2. Lapisan Overlay Hitam Halus */}
        <div
          className="absolute inset-0 bg-black/25 pointer-events-none"
          aria-hidden="true"
        />

        {/* 3. Gradasi Sinematik Hitam Ringan */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/60 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Konten Utama Visi & Misi Terpusat dan Ringkas */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header Seksi Ringkas */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          <p className="text-xs font-bold tracking-[0.2em] text-[#7dd3fc] uppercase mb-1.5">
            Arah &amp; Tujuan
          </p>

          <h2
            id="visimisi-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1.5"
          >
            Visi &amp; Misi
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-100 max-w-lg mx-auto leading-relaxed">
            Sebagai dasar langkah bersama dalam mewujudkan pendidikan yang berkualitas untuk generasi masa depan.
          </p>
        </div>

        {/* Dua Kartu Visi dan Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {/* KARTU KIRI: VISI */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between border border-white/80">
            <div>
              {/* Header Kartu Visi */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5 pb-3.5 border-b border-gray-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0f2d4a] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-[#0f2d4a] uppercase">
                    Visi Sekolah
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans">
                    Cita-cita utama satuan pendidikan
                  </p>
                </div>
              </div>

              {/* Kutipan Utama Visi */}
              <div className="py-2 sm:py-3">
                <blockquote className="font-heading font-bold text-base sm:text-lg md:text-xl text-gray-900 leading-relaxed tracking-tight">
                  &ldquo;{dataSekolah.visi}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* KARTU KANAN: MISI */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col border border-white/80">
            {/* Header Kartu Misi */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5 pb-3.5 border-b border-gray-100">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0f2d4a] text-white flex items-center justify-center shrink-0 shadow-xs">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>

              <div>
                <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-[#0f2d4a] uppercase">
                  Misi Sekolah
                </h3>
                <p className="text-xs text-neutral-500 font-sans">
                  Langkah strategis penyelenggaraan pendidikan
                </p>
              </div>
            </div>

            {/* Daftar Butir Misi (1 s.d. 6 dengan Garis Penghubung Halus) */}
            <div className="relative flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
              <div
                className="absolute left-[13px] sm:left-[15px] top-3 bottom-5 w-[2px] bg-[#bfdbfe] pointer-events-none"
                aria-hidden="true"
              />

              {dataSekolah.misi.map((misiItem, idx) => (
                <div key={idx} className="relative z-10 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#eff6ff] text-[#0f2d4a] font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs border border-[#bfdbfe]">
                    {idx + 1}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-800 leading-snug font-normal pt-0.5">
                    {misiItem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
