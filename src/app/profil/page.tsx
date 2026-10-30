import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import SambutanKepsek from '@/components/sections/SambutanKepsek';
import VisiMisi from '@/components/sections/VisiMisi';

export const metadata: Metadata = {
  title: 'Profil Sekolah',
  description:
    'Profil lengkap SDN Jatipulo 07 Jakarta: visi, misi, dan sambutan kepala sekolah.',
};

/**
 * Halaman Profil Sekolah (/profil)
 * Hanya memuat 3 seksi utama sesuai struktur asli tanpa penambahan seksi lain:
 * 1. HeroBanner
 * 2. SambutanKepsek
 * 3. VisiMisi
 * Gap antarseksi diperbaiki dengan merapikan ritme padding dan menghapus pb-20 di bagian bawah.
 */
export default function ProfilPage() {
  return (
    <div className="profil-page bg-[#f4f9f6] min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Profil Sekolah' },
        ]}
        badge="Tentang Satuan Pendidikan"
        title="Profil SDN Jatipulo 07 Jakarta"
        subtitle="Mengenal lebih dekat visi, misi, sejarah, dan nilai keunggulan lingkungan belajar kami."
      />

      {/* 2. Sambutan Kepala Sekolah (Padding dirapikan agar tidak ada gap berlebih) */}
      <SambutanKepsek className="py-6 sm:py-8 lg:py-10" isSubPage={true} />

      {/* 3. Visi & Misi (Langsung menempel ke Footer tanpa celah pb-20) */}
      <VisiMisi />
    </div>
  );
}
