import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataBerita } from '@/data/berita';
import BeritaDirectory from '@/components/sections/BeritaDirectory';

export const metadata: Metadata = {
  title: 'Berita, Pengumuman & Agenda',
  description: 'Informasi terkini, pengumuman sekolah, serta agenda kegiatan penting SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Daftar Berita (/berita)
 */
export default function BeritaPage() {
  return (
    <div className="berita-page bg-[#f8fafc] min-h-screen pb-20">
      <HeroBanner
        title="Berita & Pengumuman Sekolah"
        subtitle="Dapatkan kabar terbaru seputar prestasi, agenda akademik, dan aktivitas SDN Jatipulo 07 Jakarta."
        preserveSpacing={true}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        <BeritaDirectory initialBerita={dataBerita} />
      </div>
    </div>
  );
}
