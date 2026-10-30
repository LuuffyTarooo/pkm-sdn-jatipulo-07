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
    <div className="prestasi-page bg-[#f8fafc] min-h-screen pb-20">
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Kesiswaan' },
          { label: 'Prestasi' },
        ]}
        badge="Raihan & Kejuaraan"
        title="Prestasi Peserta Didik"
        subtitle="Apresiasi atas dedikasi dan kerja keras para peserta didik yang telah mengharumkan nama sekolah."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        {dataPrestasi.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Data prestasi siswa sedang diperbarui.</p>
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
