'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BeritaCoverImageProps {
  src?: string;
  alt: string;
  kategori: string;
}

export default function BeritaCoverImage({ src, alt, kategori }: BeritaCoverImageProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#4c637a] mb-6 sm:mb-8 border border-slate-200/80">
      {!imgError && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#4c637a] text-white p-6 text-center">
          <svg
            className="w-12 h-12 mb-2.5 text-white/85"
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
          <span className="text-xs sm:text-sm font-semibold text-white">
            Dokumentasi {kategori} &bull; SDN Jatipulo 07 Jakarta
          </span>
        </div>
      )}
    </div>
  );
}

