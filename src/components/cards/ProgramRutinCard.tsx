'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProgramRutin } from '@/types';

interface ProgramRutinCardProps {
  program: ProgramRutin;
}

/**
 * Komponen Kartu Program Rutin / Pembiasaan Siswa
 * Dilengkapi fallback aman jika foto dokumentasi belum tersedia.
 */
export default function ProgramRutinCard({ program }: ProgramRutinCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="program-rutin-card bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden flex flex-col h-full">
      {program.foto && !imgError && (
        <div className="relative h-44 w-full bg-[#eff6ff]">
          <Image
            src={program.foto}
            alt={`Program ${program.nama}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      <div className="p-5 flex-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1d4e78] block mb-1.5">
          {program.jadwal}
        </span>
        <h3 className="font-heading font-bold text-base text-[#0f2d4a]">
          {program.nama}
        </h3>
        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          {program.deskripsi}
        </p>
      </div>
    </article>
  );
}
