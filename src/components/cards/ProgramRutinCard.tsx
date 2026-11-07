'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProgramRutin } from '@/types';

interface ProgramRutinCardProps {
  program: ProgramRutin;
  priority?: boolean;
}

// Skema warna aksen spesifik per hari untuk sentuhan visual elegan & berkarakter
const DAY_THEMES: Record<
  string,
  {
    badgeBg: string;
    badgeText: string;
    ringColor: string;
    iconColor: string;
  }
> = {
  senin: {
    badgeBg: 'bg-blue-600',
    badgeText: 'text-white',
    ringColor: 'ring-blue-100',
    iconColor: 'text-blue-600',
  },
  selasa: {
    badgeBg: 'bg-indigo-600',
    badgeText: 'text-white',
    ringColor: 'ring-indigo-100',
    iconColor: 'text-indigo-600',
  },
  rabu: {
    badgeBg: 'bg-teal-600',
    badgeText: 'text-white',
    ringColor: 'ring-teal-100',
    iconColor: 'text-teal-600',
  },
  kamis: {
    badgeBg: 'bg-amber-600',
    badgeText: 'text-white',
    ringColor: 'ring-amber-100',
    iconColor: 'text-amber-600',
  },
  jumat: {
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    ringColor: 'ring-emerald-100',
    iconColor: 'text-emerald-600',
  },
};

export default function ProgramRutinCard({ program, priority = false }: ProgramRutinCardProps) {
  const [imgError, setImgError] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const dayKey = program.hari.toLowerCase();
  const theme = DAY_THEMES[dayKey] || DAY_THEMES.senin;
  const coverSrc = program.fotoCover || program.foto || '/images/hero/hero-image.png';

  const toggleExpand = (idx: number) => {
    setExpandedWeek((prev) => (prev === idx ? null : idx));
  };

  return (
    <article className="program-rutin-card flex flex-col h-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(15,45,74,0.06)] hover:shadow-[0_16px_36px_rgba(15,45,74,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
      {/* 1. BAGIAN ATAS: 1 Foto Cover Utama per hari */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 shrink-0">
        {!imgError ? (
          <Image
            src={coverSrc}
            alt={`Cover Hari ${program.hari} - ${program.nama}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={priority}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2d4a] via-[#163e63] to-[#1d4e78] text-white p-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="font-heading font-bold text-base">Hari {program.hari}</span>
            <span className="text-xs text-white/80 mt-0.5">SDN Jatipulo 07 Jakarta</span>
          </div>
        )}

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        {/* Badge Hari (Pill Atas Kiri) */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-105 ${theme.badgeBg} ${theme.badgeText}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Hari {program.hari}
          </span>
        </div>

        {/* Badge Waktu di sudut kanan atas cover untuk keterbacaan instan */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-md text-xs font-semibold border border-white/20 shadow-md">
            <svg
              className="w-3.5 h-3.5 text-emerald-400 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{program.waktu}</span>
          </span>
        </div>

        {/* Quick Tag Label di Bawah Gambar */}
        <div className="absolute bottom-3.5 left-4 right-4 z-10 text-white">
          <p className="text-[11px] font-medium tracking-wider uppercase text-white/80 mb-0.5">
            Pembiasaan Karakter
          </p>
          <p className="text-sm font-semibold text-white truncate drop-shadow-sm">
            {program.nama}
          </p>
        </div>
      </div>

      {/* 2. BAGIAN TENGAH: Judul Hari, Nama Kegiatan Rutin Utama, dan Badge Waktu */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="pb-4 border-b border-slate-100">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-[#0f2d4a] group-hover:text-[#1d4e78] transition-colors leading-snug">
                Hari {program.hari} - {program.nama}
              </h2>
            </div>
          </div>

          {/* Badge Waktu Inline (Kontras Tinggi & Mudah Dipahami) */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs font-semibold shadow-2xs">
              <svg
                className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{program.waktu}</span>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
              <span>Diikuti Seluruh Siswa</span>
            </div>
          </div>

          {/* Deskripsi Singkat */}
          {program.deskripsi && (
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              {program.deskripsi}
            </p>
          )}
        </div>

        {/* 3. BAGIAN BAWAH: Daftar list rotasi mingguan yang langsung terlihat jelas (Minggu 1 s.d. Minggu 4) */}
        <div className="pt-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#0f2d4a] flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#0f2d4a]/10 text-[#0f2d4a] flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              Rotasi Mingguan:
            </h3>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100/90 border border-slate-200/60 px-2.5 py-0.5 rounded-full">
              4 Siklus Pekan
            </span>
          </div>

          {/* List Rotasi Mingguan Langsung Terlihat Jelas */}
          <ul className="space-y-2.5 mt-auto" role="list">
            {program.rotasi.map((item, idx) => {
              const pekanLabel = item.minggu.replace(/minggu/i, 'Pekan');
              const isExpanded = expandedWeek === idx;

              return (
                <li
                  key={idx}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-blue-50/60 border-blue-200/90 shadow-2xs'
                      : 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="w-full p-2.5 sm:p-3 text-left flex items-start gap-2.5 cursor-pointer select-none group/item"
                    aria-expanded={isExpanded}
                    title="Klik untuk melihat penjelasan lengkap"
                  >
                    {/* Badge Nomor Pekan */}
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#0f2d4a] text-white shrink-0 mt-0.5 shadow-2xs group-hover/item:bg-[#1d4e78] transition-colors">
                      {pekanLabel}
                    </span>

                    {/* Judul & Fokus */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug group-hover/item:text-[#0f2d4a] transition-colors">
                          {item.judul}
                        </span>
                        <svg
                          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-blue-600' : ''
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>

                      {item.fokus && (
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5 line-clamp-1">
                          🎯 {item.fokus}
                        </p>
                      )}
                    </div>
                  </button>

                  {/* Keterangan Detail Tambahan (Expandable secara halus jika diklik) */}
                  {isExpanded && item.deskripsi && (
                    <div className="px-3 pb-3 pt-1 text-xs text-slate-600 border-t border-blue-100/80 leading-relaxed bg-white/70">
                      <p>{item.deskripsi}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}
