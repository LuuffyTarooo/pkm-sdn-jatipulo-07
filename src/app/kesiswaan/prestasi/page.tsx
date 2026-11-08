import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataPrestasi } from '@/data/prestasi';
import PrestasiCard from '@/components/cards/PrestasiCard';

export const metadata: Metadata = {
  title: 'Prestasi Siswa',
  description: 'Daftar raihan prestasi akademik dan non-akademik siswa SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Prestasi Siswa (/kesiswaan/prestasi)
 */
export default function PrestasiPage() {
  return (
    <div className="prestasi-page bg-[#f8fafc] min-h-[100svh] pb-20">
      <HeroBanner
        title="Prestasi Peserta Didik"
        subtitle="Apresiasi atas dedikasi dan kerja keras para peserta didik yang telah mengharumkan nama sekolah."
        preserveSpacing={true}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        {dataPrestasi.length === 0 ? (
          <div className="bg-white border border-slate-200/90 shadow-xs rounded-2xl p-10 sm:p-16 text-center max-w-md mx-auto flex flex-col items-center justify-center">
            {/* Icon Kosong Minimalis */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 text-slate-400"
              aria-hidden="true"
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </div>

            <h2 className="font-heading font-bold text-lg sm:text-xl text-[#0b182a] mb-2">
              Belum ada data
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
              Data raihan prestasi peserta didik sedang dalam proses pendataan dan verifikasi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {dataPrestasi.map((prestasi) => (
              <PrestasiCard key={prestasi.id} prestasi={prestasi} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
