import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataGaleri } from '@/data/galeri';
import GaleriGrid from '@/components/sections/GaleriGrid';

export const metadata: Metadata = {
  title: 'Galeri Foto Kegiatan',
  description: 'Dokumentasi visual berbagai aktivitas, perayaan, dan kegiatan belajar siswa di SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Galeri Foto (/galeri)
 * Menampilkan dokumentasi visual kegiatan sekolah dari public/images/galeri
 */
export default function GaleriPage() {
  return (
    <div className="galeri-page bg-[#f8fafc] min-h-[100svh] pb-20">
      <HeroBanner
        title="Galeri Aktivitas Siswa"
        subtitle="Momen-momen berharga, kreativitas, dan keceriaan peserta didik di lingkungan sekolah."
        preserveSpacing={true}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        <GaleriGrid initialItems={dataGaleri} />
      </div>
    </div>
  );
}
