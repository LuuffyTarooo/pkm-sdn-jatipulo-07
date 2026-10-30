/**
 * Komponen Indikator Loading Global (Server Component)
 * Ditampilkan Next.js saat transisi rute sedang berlangsung
 */
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-sm text-gray-500">Memuat halaman SDN Jatipulo 07...</p>
    </div>
  );
}
