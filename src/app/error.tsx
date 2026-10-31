'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Halaman Error Boundary Global (Client Component)
 * Menangkap kesalahan tak terduga dan menyediakan opsi coba lagi
 */
export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error ke konsol atau layanan pemantauan
    console.error('Terjadi kesalahan aplikasi:', error);
  }, [error]);

  return (
    <div className="min-h-[78vh] bg-[#f8fafc] flex flex-col">
      <div className="h-[76px] sm:h-[88px] w-full bg-[#081726]" aria-hidden="true" />
      <div className="flex-1 py-16 sm:py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 text-center shadow-xs">
          <span className="inline-block px-3 py-1 rounded-full bg-[#eff6ff] text-[#0f2d4a] border border-[#bfdbfe] text-xs font-bold uppercase tracking-wider">
            Gangguan Sistem
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mt-4 text-[#0f2d4a]">
            Terjadi Kesalahan
          </h1>
          <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
            Maaf, terjadi gangguan saat memuat halaman ini. Silakan coba muat ulang atau kembali ke beranda.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2.5 bg-[#0f2d4a] hover:bg-[#1d4e78] text-white text-sm rounded-xl font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              Muat Ulang
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 bg-white hover:bg-neutral-50 text-[#0f2d4a] border border-gray-200 text-sm rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              Ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
