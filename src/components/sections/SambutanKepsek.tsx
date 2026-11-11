'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SambutanKepsekProps {
  className?: string;
  isSubPage?: boolean;
}

/**
 * Komponen Sambutan Kepala Sekolah (Beranda)
 * Ditata sebagai 1 seksi penuh (full section) berwibawa, bersih, dan proporsional.
 */
export default function SambutanKepsek({ className = '', isSubPage = false }: SambutanKepsekProps = {}) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      aria-labelledby="sambutan-title"
      className={`relative w-full ${
        !isSubPage ? 'min-h-[100svh] flex items-center' : ''
      } py-14 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] ${className}`}
    >
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
          {/* Kolom Kiri: Potret Kepala Sekolah (Besar, menyatu pas dengan nama) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[420px] flex flex-col items-center">
              {!imgError ? (
                <Image
                  src="/images/kepala-sekolah/kepalasekolah.png"
                  alt="Hj. Emma SUSANTY, S.Pd. M.Pd - Kepala Sekolah SDN Jatipulo 07 Jakarta Barat"
                  width={734}
                  height={791}
                  className="w-full h-auto object-contain mx-auto block"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full aspect-[734/791] flex flex-col items-center justify-center text-white p-8 text-center bg-[#4c637a] rounded-2xl">
                  <svg className="w-12 h-12 text-white/85 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-xs font-semibold text-white">Kepala Sekolah</span>
                </div>
              )}

              {/* Nama & Jabatan Tepat Menempel di Bawah Foto */}
              <div className="text-center mt-3 sm:mt-4">
                <h3 className="font-heading font-extrabold text-lg sm:text-xl lg:text-2xl text-[#0f2d4a] leading-tight tracking-tight">
                  Hj. Emma SUSANTY, S.Pd. M.Pd
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-600 font-medium mt-1">
                  Kepala Sekolah SDN Jatipulo 07
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Narasi Sambutan, 3 Pilar & Tombol Aksi */}
          <div className="lg:col-span-7 space-y-5 lg:space-y-6 text-left">
            
            {/* Eyebrow Kicker dengan Garis Horizontal */}
            <div className="flex items-center gap-3">
              <span className="w-8 sm:w-10 h-[2.5px] bg-[#0f2d4a] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1d4e78] font-sans" /* taste-skill-ignore: official section label */>
                KATA SAMBUTAN KEPALA SEKOLAH
              </span>
            </div>

            {/* Judul Utama / Motto Kepala Sekolah */}
            <h2
              id="sambutan-title"
              className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f2d4a] leading-snug tracking-tight"
            >
              Memimpin dengan Hati,<br className="hidden sm:inline" /> Mendidik dengan Kasih,<br className="hidden sm:inline" /> Menginspirasi untuk Berprestasi
            </h2>

            {/* Narasi Kata Sambutan Hangat & Menginspirasi */}
            <div className="space-y-2.5 font-sans text-xs sm:text-sm lg:text-[15px] text-slate-600 leading-relaxed font-normal">
              <p>
                Assalamu&rsquo;alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera bagi kita semua.
              </p>
              <p>
                Selamat datang di website resmi SDN Jatipulo 07 Jakarta Barat. Kami berkomitmen menyelenggarakan ekosistem pendidikan dasar yang ramah anak, aman, dan berpusat pada penumbuhan potensi setiap peserta didik. Melalui keteladanan budi pekerti, penguatan literasi-numerasi, serta kolaborasi harmonis antara pendidik, orang tua, dan masyarakat, kami mendampingi generasi penerus bangsa untuk bertumbuh cerdas, berkarakter mulia, dan berprestasi tiada henti.
              </p>
            </div>

            {/* 3 Kartu Pilar Komitmen Sekolah */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 pt-1">
              {/* Pilar 1: Cerdas Berkarakter */}
              <div data-ui="pilar-card-1" className="p-4 rounded-2xl bg-white border border-slate-200/90 text-left flex flex-col justify-between shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center mb-3">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                    Cerdas<br className="hidden sm:inline" /> Berkarakter
                  </h4>
                  <p className="text-xs text-neutral-500 font-sans mt-1">
                    Berakhlak mulia &amp; berintegritas
                  </p>
                </div>
              </div>

              {/* Pilar 2: Berbudaya Lingkungan */}
              <div data-ui="pilar-card-2" className="p-4 rounded-2xl bg-white border border-slate-200/90 text-left flex flex-col justify-between shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center mb-3">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                    Berbudaya<br className="hidden sm:inline" /> Lingkungan
                  </h4>
                  <p className="text-xs text-neutral-500 font-sans mt-1">
                    Peduli alam &amp; asri
                  </p>
                </div>
              </div>

              {/* Pilar 3: Berprestasi Tiada Henti */}
              <div data-ui="pilar-card-3" className="p-4 rounded-2xl bg-white border border-slate-200/90 text-left flex flex-col justify-between shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center mb-3">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-neutral-900 leading-snug">
                    Berprestasi<br className="hidden sm:inline" /> Tiada Henti
                  </h4>
                  <p className="text-xs text-neutral-500 font-sans mt-1">
                    Akademik &amp; non-akademik
                  </p>
                </div>
              </div>
            </div>

            {/* Dua Tombol Aksi Berdampingan */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {!isSubPage ? (
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-[#0f2d4a] hover:bg-[#1d4e78] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 text-[#bae6fd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>Profil &amp; Visi Misi Sekolah</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              ) : (
                <a
                  href="#visi-misi"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-[#0f2d4a] hover:bg-[#1d4e78] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 text-[#bae6fd]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>Visi &amp; Misi Sekolah</span>
                  <span aria-hidden="true">&darr;</span>
                </a>
              )}

              <Link
                href="/hubungi-kami"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Hubungi Satuan Pendidikan</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
