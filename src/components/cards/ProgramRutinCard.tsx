'use client';

import React from 'react';
import Image from 'next/image';
import { ProgramRutin } from '@/types';

interface ProgramRutinCardProps {
  program: ProgramRutin;
  priority?: boolean;
}

export default function ProgramRutinCard({ program, priority = false }: ProgramRutinCardProps) {
  const coverSrc = program.fotoCover || program.foto || '/images/hero/hero-image.png';
  const hasRotasiMingguan = program.rotasi.length > 1;

  return (
    <article className="bg-white border border-slate-200/90 shadow-xs rounded-2xl overflow-hidden flex flex-col justify-between">
      {/* 1. Foto Cover Bersih */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden shrink-0">
        <Image
          src={coverSrc}
          alt={`Program Hari ${program.hari} - ${program.nama}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover"
          priority={priority}
        />
      </div>

      {/* 2. Informasi Utama Program */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <span className="font-heading font-bold text-base text-[#0b182a] block mb-1">
            Hari {program.hari}
          </span>

          <h3 className="font-heading font-bold text-sm text-slate-800 leading-snug mb-3">
            {program.nama}
          </h3>

          {/* Kegiatan Utama (Jika Ada) */}
          {program.kegiatanUtama && program.kegiatanUtama.length > 0 && (
            <div className="space-y-1.5 mb-3">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Kegiatan Utama:
              </span>
              <div className="space-y-1">
                {program.kegiatanUtama.map((keg, idx) => (
                  <div
                    key={idx}
                    className="py-1 px-2.5 rounded-lg bg-blue-50/70 text-[#0f2d4a] text-xs font-medium flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" aria-hidden="true" />
                    <span>{keg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Komponen Mingguan (Jika Ada Siklus M1 - M4) */}
          {hasRotasiMingguan && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Komponen Mingguan:
              </span>
              <div className="space-y-1">
                {program.rotasi.map((rot, idx) => (
                  <div
                    key={idx}
                    className="py-1.5 px-2.5 rounded-lg bg-slate-50 flex items-baseline gap-2 text-xs"
                  >
                    <span className="font-heading font-bold text-slate-400 shrink-0 text-[11px]">
                      M{idx + 1}
                    </span>
                    <span className="font-medium text-slate-800 truncate" title={rot.judul}>
                      {rot.judul}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
