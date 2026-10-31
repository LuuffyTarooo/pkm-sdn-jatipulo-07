'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Guru } from '@/types';

interface GuruCardProps {
  guru: Guru;
  isFeatured?: boolean;
}

/**
 * Komponen Kartu Profil Guru & Tenaga Kependidikan
 * Standar Desain Premium & Humanis:
 * - Rasio potret proporsional aspect-[4/4.5] dengan framing rapi
 * - Badge kategori tematik dengan identitas warna yang jelas
 * - Ketinggian kartu konsisten (baseline-aligned) antar kolom
 * - Informasi lengkap: Nama, Jabatan, Mapel, NIP, dan Pendidikan Terakhir
 */
export default function GuruCard({ guru, isFeatured = false }: GuruCardProps) {
  const [imgError, setImgError] = useState(false);

  // Inisial nama jika foto tidak tersedia
  const initials =
    guru.nama
      .replace(/(Dra\.|Hj\.|H\.|Ust\.|M\.Pd\.|S\.Pd\.|S\.Pd\.I\.|S\.Pd\.K\.|M\.M\.|A\.Md\.|S\.Kom\.|S\.I\.Pust\.)/g, '')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'GT';

  const getCategoryLabel = () => {
    switch (guru.kategori) {
      case 'pimpinan':
        return 'Pimpinan';
      case 'guru-kelas':
        return guru.kelasDiampu ? guru.kelasDiampu : 'Guru Kelas';
      case 'guru-mapel':
        return 'Guru';
      case 'staf':
      default:
        return 'Tenaga Kependidikan';
    }
  };

  // 1. TAMPILAN SPOTLIGHT KHUSUS KEPALA SEKOLAH
  if (isFeatured) {
    return (
      <article className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-10">
        {/* Potret Kepala Sekolah */}
        <div className="relative shrink-0 w-44 sm:w-52 aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-md border-2 border-slate-200">
          {!imgError && guru.foto ? (
            <Image
              src={guru.foto}
              alt={`Foto resmi ${guru.nama}`}
              fill
              sizes="(max-width: 640px) 192px, 224px"
              className="object-cover object-top"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-[#4c637a] text-white p-4 text-center">
              <svg
                className="w-16 h-16 text-white/85 mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-sm font-bold text-white">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Rincian Kredensial Pimpinan Sekolah */}
        <div className="flex-1 text-center md:text-left space-y-3.5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#1d4e78]">
            Pimpinan Satuan Pendidikan
          </p>

          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] leading-tight">
              {guru.nama}
            </h3>
            <p className="text-neutral-700 font-semibold text-base mt-1">
              {guru.jabatan}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1 text-xs text-neutral-700 font-sans">
            {guru.nip && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <svg className="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span>NIP: {guru.nip}</span>
              </span>
            )}

            {guru.pendidikanTerakhir && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff6ff] text-[#0f2d4a] border border-[#bfdbfe]">
                <svg className="w-3.5 h-3.5 text-[#1d4e78]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span>{guru.pendidikanTerakhir}</span>
              </span>
            )}
          </div>

          {guru.kataMutiara && (
            <p className="font-heading italic text-sm sm:text-base text-neutral-700 pt-3 border-t border-slate-200/80 leading-relaxed max-w-2xl">
              &ldquo;{guru.kataMutiara}&rdquo;
            </p>
          )}

          <div className="pt-1.5">
            <Link
              href="/hubungi-kami"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2d4a] hover:bg-[#1d4e78] text-white text-xs sm:text-sm font-bold transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              <span>Hubungi Satuan Pendidikan</span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // 2. TAMPILAN KARTU DEWAN GURU & STAF REGULER
  return (
    <article className="group bg-white rounded-2xl border border-gray-200/90 hover:border-[#93c5fd] shadow-xs hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden text-left">
      {/* Potret Wajah */}
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-white">
        {!imgError && guru.foto ? (
          <Image
            src={guru.foto}
            alt={`Foto ${guru.nama}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full bg-[#4c637a] text-white p-4 text-center">
            <svg
              className="w-12 h-12 text-white/85"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-xs font-bold text-white mt-1">
              {initials}
            </span>
          </div>
        )}

        {/* Badge Kategori di Sudut Foto */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/45 backdrop-blur-md border border-white/20 text-white/95">
            {getCategoryLabel()}
          </span>
        </div>
      </div>

      {/* Konten Identitas Guru */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Nama Guru (Tinggi minimum tetap agar baris grid selalu sejajar rapi) */}
          <h3 className="font-heading font-bold text-base text-neutral-900 group-hover:text-[#0f2d4a] transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
            {guru.nama}
          </h3>

          <p className="text-xs sm:text-sm font-semibold text-[#1d4e78] mt-1">
            {guru.jabatan}
          </p>

          {/* Mata Pelajaran jika ada */}
          {guru.mataPelajaran && (
            <div className="mt-2 p-2 rounded-lg bg-[#eff6ff] border border-[#bfdbfe]">
              <p className="text-xs font-medium text-slate-800 line-clamp-1">
                <span className="font-semibold text-[#0f2d4a]">Mapel:</span> {guru.mataPelajaran}
              </p>
            </div>
          )}

          {/* Kutipan Singkat jika ada */}
          {guru.kataMutiara && !guru.mataPelajaran && (
            <p className="text-xs text-neutral-500 italic mt-2 line-clamp-2 leading-relaxed font-sans">
              &ldquo;{guru.kataMutiara}&rdquo;
            </p>
          )}
        </div>

        {/* NIP & Kualifikasi di Bawah */}
        <div className="pt-3 border-t border-gray-100 flex flex-col gap-1 text-xs text-neutral-500 font-sans mt-auto">
          {guru.nip ? (
            <div className="flex items-center gap-1.5 text-neutral-600">
              <svg className="w-3.5 h-3.5 text-neutral-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span className="truncate">NIP: {guru.nip}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-neutral-500">
              <span>Tenaga Kependidikan</span>
            </div>
          )}

          {guru.pendidikanTerakhir && (
            <div className="flex items-center gap-1.5 text-neutral-600 font-medium">
              <svg className="w-3.5 h-3.5 text-[#1d4e78] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className="truncate">{guru.pendidikanTerakhir}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
