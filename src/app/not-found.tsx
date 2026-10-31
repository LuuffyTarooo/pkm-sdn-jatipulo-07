import Link from 'next/link';

/**
 * Halaman 404 - Halaman Tidak Ditemukan
 */
export default function NotFound() {
  return (
    <div className="min-h-[78vh] bg-[#f8fafc] flex flex-col">
      <div className="h-[76px] sm:h-[88px] w-full bg-[#081726]" aria-hidden="true" />
      <div className="flex-1 py-16 sm:py-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 text-center shadow-xs">
          <span className="inline-block px-3 py-1 rounded-full bg-[#eff6ff] text-[#0f2d4a] border border-[#bfdbfe] text-xs font-bold uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mt-4 text-[#0f2d4a]">
            Halaman Tidak Ditemukan
          </h1>
          <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
            Maaf, halaman yang Anda cari tidak tersedia atau tautan telah berpindah alamat.
          </p>
          <div className="mt-7">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0f2d4a] hover:bg-[#1d4e78] text-white text-sm rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
