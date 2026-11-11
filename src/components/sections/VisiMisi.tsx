import React from 'react';
import Image from 'next/image';
import { dataSekolah } from '@/data/sekolah';
import AnimateIn from '@/components/ui/AnimateIn';
import StaggerChildren from '@/components/ui/StaggerChildren';

interface VisiMisiProps {
  className?: string;
  isSubPage?: boolean;
}

/**
 * Komponen Seksi Visi dan Misi Sekolah
 * Disusun sebagai 1 seksi penuh (full 1 section) di Beranda.
 */
export default function VisiMisi({ className = '', isSubPage = false }: VisiMisiProps = {}) {
  return (
    <section
      id="visi-misi"
      aria-labelledby="visimisi-heading"
      className={`relative w-full ${
        !isSubPage ? 'min-h-[100svh] flex items-center' : ''
      } py-14 sm:py-18 lg:py-20 overflow-hidden bg-black text-white ${className}`}
    >
      {/* 1. Foto Background Sekolah Full-Width */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-image.png"
          alt="Gedung dan Lingkungan SDN Jatipulo 07 Jakarta"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />

        {/* 2. Lapisan Scrim Netral Hitam untuk Kontras Teks Bersih */}
        <div
          className="absolute inset-0 bg-black/75 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Konten Utama Visi & Misi Terpusat dan Proporsional */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        {/* Header Seksi */}
        <AnimateIn variant="fade-up" delay={0} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10" as="div">
          <p className="text-xs font-bold tracking-[0.2em] text-[#7dd3fc] uppercase mb-2">
            Arah &amp; Tujuan
          </p>

          <h2
            id="visimisi-heading"
            className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2.5"
          >
            Visi &amp; Misi
          </h2>

          <p className="font-sans text-xs sm:text-sm text-neutral-200 max-w-lg mx-auto leading-relaxed">
            Sebagai dasar langkah bersama dalam mewujudkan pendidikan yang berkualitas untuk generasi masa depan.
          </p>
        </AnimateIn>

        {/* Dua Kartu Visi dan Misi */}
        <StaggerChildren baseDelay={80} staggerDelay={100} variant="fade-up" className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* KARTU KIRI: VISI */}
          <div
            data-ui="visi-card"
            className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/90"
          >
            <div>
              {/* Header Kartu Visi */}
              <div className="mb-4">
                <h3 className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-[#0f2d4a] uppercase">
                  Visi Sekolah
                </h3>
                <p className="text-xs text-neutral-500 font-sans mt-0.5">
                  Cita-cita utama satuan pendidikan
                </p>
              </div>

              {/* Kutipan Utama Visi */}
              <div className="py-3 sm:py-5">
                <blockquote className="font-heading font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 leading-relaxed tracking-tight">
                  &ldquo;{dataSekolah.visi}&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Nilai Inti Visi */}
            <div className="pt-4 flex flex-wrap gap-2 text-xs font-medium font-sans">
              <span className="px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#0f2d4a]">
                Berakhlak Mulia
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#0f2d4a]">
                Cerdas Literasi &amp; Numerasi
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#0f2d4a]">
                Berbudaya Lingkungan
              </span>
            </div>
          </div>

          {/* KARTU KANAN: MISI */}
          <div
            data-ui="misi-card"
            className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/90"
          >
            {/* Header Kartu Misi */}
            <div className="mb-4">
              <h3 className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-[#0f2d4a] uppercase">
                Misi Sekolah
              </h3>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">
                Langkah strategis penyelenggaraan pendidikan
              </p>
            </div>

            {/* Daftar Butir Misi (1 s.d. 6) */}
            <div className="relative flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
              <div
                className="absolute left-[13px] sm:left-[15px] top-3 bottom-5 w-[2px] bg-[#bfdbfe] pointer-events-none"
                aria-hidden="true"
              />

              {dataSekolah.misi.map((misiItem, idx) => (
                <div key={idx} className="relative z-10 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#eff6ff] text-[#0f2d4a] font-heading font-bold text-xs flex items-center justify-center shrink-0 border border-[#bfdbfe]">
                    {idx + 1}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-800 leading-snug font-normal pt-0.5">
                    {misiItem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}
