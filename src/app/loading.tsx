/**
 * Komponen Indikator Loading Global (Server Component)
 * Ditampilkan Next.js saat transisi rute sedang berlangsung
 */
export default function Loading() {
  return (
    <div className="min-h-[75vh] bg-[#f8fafc] flex flex-col">
      <div className="h-[76px] sm:h-[88px] w-full bg-[#081726]" aria-hidden="true" />
      <div className="flex-1 py-20 px-4 flex flex-col items-center justify-center">
        <div className="w-11 h-11 border-4 border-[#0f2d4a] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm font-medium text-neutral-600">
          Memuat halaman SDN Jatipulo 07...
        </p>
      </div>
    </div>
  );
}
