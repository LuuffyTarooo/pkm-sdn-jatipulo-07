import Link from 'next/link';

/**
 * Halaman 404 - Halaman Tidak Ditemukan
 */
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-700">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-gray-500 max-w-md mx-auto">
        Maaf, halaman yang Anda cari tidak tersedia atau tautan telah berpindah alamat.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
