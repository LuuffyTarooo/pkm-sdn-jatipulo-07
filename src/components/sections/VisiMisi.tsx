import React from 'react';
import Image from 'next/image';
import { dataSekolah } from '@/data/sekolah';

/**
 * Komponen Seksi Visi dan Misi Sekolah (Compact Edge-to-Edge Showcase)
 * Menerapkan Palet "Emerald Academy & Sun Gold":
 * - Foto latar belakang panjang mentok sisi kanan & kiri (full-width horizontal)
 * - Dimensi vertikal (lebar/tinggi) dibuat lebih ringkas dan proporsional (tidak bulky)
 * - Gradasi hitam dibuat lebih terang dan transparan (tidak terlalu gelap) sehingga foto sekolah terlihat jelas
 * - Tipografi berkarakter dengan kartu putih kontras tinggi
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

        {/* 2. Lapisan Overlay Hitam Halus (Lebih Terang, Tidak Terlalu Gelap) */}
        <div
          className="absolute inset-0 bg-black/25 pointer-events-none"
          aria-hidden="true"
        />

        {/* 3. Gradasi Sinematik Hitam Ringan (Menjaga Foto Tetap Terlihat Hidup) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/60 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Konten Utama Visi & Misi Terpusat dan Ringkas */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header Seksi Ringkas */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          {/* Eyebrow: Garis Emas Kiri - Teks - Garis Emas Kanan */}
          <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em] text-[#fbbf24] uppercase mb-1.5">
            <span className="w-6 sm:w-8 h-[2px] bg-[#fbbf24] rounded-full" />
            <span>ARAH &amp; TUJUAN</span>
            <span className="w-6 sm:w-8 h-[2px] bg-[#fbbf24] rounded-full" />
          </div>

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
          <div className="relative bg-white rounded-2xl p-5 sm:p-6 md:p-7 shadow-xl overflow-hidden flex flex-col justify-between border border-white/80">
            {/* Watermark Mata */}
            <div
              className="absolute -top-3 -right-3 text-[#064e3b]/[0.05] pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg className="w-28 h-28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>

            <div>
              {/* Header Kartu Visi */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#064e3b] text-white flex items-center justify-center shrink-0 shadow-xs">
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
                  <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-[#064e3b] uppercase">
                    VISI
                  </h3>
                  <div className="w-8 h-1 bg-[#f59e0b] rounded-full mt-0.5" />
                </div>
              </div>

              {/* Kutipan Utama Visi */}
              <div className="my-auto py-1 sm:py-2 pr-1 pb-4 sm:pb-6">
                <blockquote className="font-heading font-bold text-base sm:text-lg md:text-xl text-gray-900 leading-snug tracking-tight">
                  &ldquo;{dataSekolah.visi}&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Aksen Lengkungan Pojok Kiri Bawah */}
            <div
              className="absolute bottom-0 left-0 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none overflow-hidden rounded-bl-2xl"
              aria-hidden="true"
            >
              <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
                <path
                  d="M -10 65 C 45 65 95 98 105 170 L -10 170 Z"
                  fill="#f59e0b"
                />
                <path
                  d="M -10 92 C 30 92 68 122 78 170 L -10 170 Z"
                  fill="#059669"
                />
              </svg>
            </div>
          </div>

          {/* KARTU KANAN: MISI */}
          <div className="relative bg-white rounded-2xl p-5 sm:p-6 md:p-7 shadow-xl overflow-hidden flex flex-col border border-white/80">
            {/* Watermark Sasaran Target */}
            <div
              className="absolute -top-4 -right-4 text-[#064e3b]/[0.05] pointer-events-none select-none"
              aria-hidden="true"
            >
              <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>

            {/* Header Kartu Misi */}
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#064e3b] text-white flex items-center justify-center shrink-0 shadow-xs">
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
                <h3 className="font-heading font-extrabold text-sm sm:text-base tracking-wider text-[#064e3b] uppercase">
                  MISI
                </h3>
                <div className="w-8 h-1 bg-[#f59e0b] rounded-full mt-0.5" />
              </div>
            </div>

            {/* Daftar Butir Misi (1 s.d. 6 dengan Garis Penghubung Halus) */}
            <div className="relative flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
              <div
                className="absolute left-[13px] sm:left-[15px] top-3 bottom-5 w-[2px] bg-[#a7f3d0] pointer-events-none -z-0"
                aria-hidden="true"
              />

              {dataSekolah.misi.map((misiItem, idx) => (
                <div key={idx} className="relative z-10 flex items-start gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#ecfdf5] text-[#064e3b] font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs border border-[#a7f3d0]">
                    {idx + 1}
                  </div>

                  <p className="text-xs sm:text-[13px] text-gray-800 leading-snug font-normal pt-0.5">
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
