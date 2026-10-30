'use client';

import { useEffect } from 'react';

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
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-red-600">Terjadi Kesalahan</h1>
      <p className="mt-3 text-gray-600 max-w-md mx-auto">
        Maaf, terjadi gangguan saat memuat halaman ini. Silakan coba kembali.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 bg-red-600 text-white rounded font-medium hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
