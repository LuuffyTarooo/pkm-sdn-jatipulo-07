'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Guru } from '@/types';

interface GuruCardProps {
  guru: Guru;
  isFeatured?: boolean;
}

export default function GuruCard({ guru, isFeatured = false }: GuruCardProps) {
  const [imgError, setImgError] = useState(false);

  const initials =
    guru.nama
      .replace(/(Dra\.|Hj\.|H\.|Ust\.|M\.Pd\.|S\.Pd\.|S\.Pd\.I\.|S\.Pd\.K\.|M\.M\.|A\.Md\.|S\.Kom\.|S\.I\.Pust\.)/g, '')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'GT';

  const roleText = guru.jabatan;

  // 1. SPOTLIGHT KEPALA SEKOLAH
  if (isFeatured) {
    return (
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-0 md:gap-8">
          <div className="shrink-0 w-48 sm:w-56 md:w-64">
            {!imgError && guru.foto ? (
              <Image
                src={guru.foto}
                alt={`Foto resmi ${guru.nama}`}
                width={600}
                height={750}
                className="w-full h-auto block"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="aspect-[3/4] flex flex-col items-center justify-center text-slate-700 text-center">
                <span className="text-4xl font-bold font-heading">{initials}</span>
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-2 pb-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] leading-tight">
              {guru.nama}
            </h2>
            <p className="text-[#1d4e78] font-semibold text-sm sm:text-base">
              {guru.jabatan} SDN Jatipulo 07 Jakarta
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              {guru.nip && (
                <span data-ui="nip-badge" className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-sans tabular-nums border border-slate-200">
                  NIP: {guru.nip}
                </span>
              )}
              {guru.pendidikanTerakhir && (
                <span data-ui="edu-badge" className="px-3 py-1 rounded-lg bg-[#eff6ff] text-[#0f2d4a] text-xs font-medium border border-[#bfdbfe]">
                  {guru.pendidikanTerakhir}
                </span>
              )}
            </div>
            {guru.kataMutiara && (
              <p className="text-sm text-slate-600 italic leading-relaxed pt-1 max-w-lg">
                &ldquo;{guru.kataMutiara}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. TAMPILAN GURU REGULER
  // Ukuran foto terkontrol max-w-[180px] dengan tinggi seragam rata bawah agar nama sejajar rapi
  return (
    <div className="guru-item flex flex-col items-center text-center group w-full">
      {/* Wadah Foto: Tinggi Seragam & Rata Bawah, Ukuran Terkontrol max-w-[180px] */}
      <div className="w-full h-44 sm:h-48 md:h-52 flex items-end justify-center">
        {!imgError && guru.foto ? (
          <Image
            src={guru.foto}
            alt={`Foto ${guru.nama}`}
            width={400}
            height={500}
            sizes="(max-width: 640px) 180px, 200px"
            className={`max-h-full w-auto h-auto block object-contain object-bottom group-hover:scale-[1.03] transition-transform duration-300 ${
              guru.nama.includes('Dewi') ? 'max-w-[210px] scale-[1.08] origin-bottom' : 'max-w-[180px]'
            }`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-[180px] aspect-square flex flex-col items-center justify-center text-slate-600">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold font-heading text-slate-700">
              {initials}
            </div>
          </div>
        )}
      </div>

      {/* Nama & Info: Sejajar Sempurna Secara Horizontal */}
      <div className="w-full flex flex-col items-center">
        <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#0f2d4a] group-hover:text-[#1d4e78] transition-colors leading-tight mt-2 min-h-[2.5rem] flex items-center justify-center text-center">
          {guru.nama}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-[#1d4e78]">{roleText}</p>

        {guru.tugasTambahan && guru.tugasTambahan.length > 0 && (
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug text-center max-w-[220px]">
            {guru.tugasTambahan.join(' • ')}
          </p>
        )}
      </div>
    </div>
  );
}
