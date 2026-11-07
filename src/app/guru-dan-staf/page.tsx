import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataGuru } from '@/data/guru';
import GuruDirectory from '@/components/sections/GuruDirectory';

export const metadata: Metadata = {
  title: 'Guru & Tenaga Kependidikan | SDN Jatipulo 07 Jakarta',
  description:
    'Profil resmi dewan guru dan tenaga kependidikan berdedikasi, bersertifikasi, dan berintegritas di SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Guru & Tenaga Kependidikan (/guru-dan-staf)
 * Dirombak secara komprehensif menggunakan standar UI/UX Pro Max:
 * - Menampilkan foto asli seluruh dewan pendidik
 * - Tata letak Bento & Portrait Grid 4-kolom yang proporsional
 * - Filter kategori terpadu & pencarian instan
 * - Spotlight kepemimpinan Kepala Sekolah
 * - Seksi komitmen pengabdian dewan pendidik
 */
export default function GuruDanStafPage() {
  return (
    <div className="guru-dan-staf-page bg-[#f8fafc] min-h-screen pb-24">
      {/* 1. HERO BANNER RESMI */}
      <HeroBanner
        title="Dewan Guru & Tenaga Kependidikan"
        subtitle="Mengenal sosok-sosok pendidik berintegritas yang membimbing dan mendampingi tumbuh kembang putra-putri di SDN Jatipulo 07 Jakarta."
        backgroundImage="/images/guru/hero-dewan-guru.png"
        backgroundPosition="object-center"
        preserveSpacing={true}
        highContrast={true}
      />

      {/* 2. KONTEN UTAMA: DIREKTORI GURU & STAF */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-8 sm:pt-12">
        <GuruDirectory initialGuru={dataGuru} />
      </main>
    </div>
  );
}
