import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataPrestasi } from '@/data/prestasi';
import PrestasiDirectory from '@/components/sections/PrestasiDirectory';

export const metadata: Metadata = {
  title: 'Prestasi Siswa',
  description: 'Daftar raihan prestasi akademik dan non-akademik peserta didik SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Prestasi Siswa (/kesiswaan/prestasi)
 * Desain Minimalis & Bernapas Mengikuti Kaidah Tasteskill.
 */
export default function PrestasiPage() {
  return (
    <div className="prestasi-page bg-[#f8fafc] min-h-[100svh] pb-24">
      <HeroBanner
        title="Prestasi Siswa"
        subtitle="Raihan prestasi akademik dan non-akademik peserta didik SDN Jatipulo 07 Jakarta."
        preserveSpacing={true}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        <PrestasiDirectory initialPrestasi={dataPrestasi} />
      </main>
    </div>
  );
}
