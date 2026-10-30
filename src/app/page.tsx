import { Metadata } from 'next';
import BannerUtama from '@/components/sections/BannerUtama';
import SambutanKepsek from '@/components/sections/SambutanKepsek';
import VisiMisi from '@/components/sections/VisiMisi';
import BeritaTerbaru from '@/components/sections/BeritaTerbaru';
import LokasiKontak from '@/components/sections/LokasiKontak';

export const metadata: Metadata = {
  title: 'Beranda',
  description:
    'Selamat datang di website resmi SDN Jatipulo 07 Jakarta Barat. Pusat informasi akademik, profil sekolah, kesiswaan, dan prestasi.',
};

/**
 * Halaman Beranda Utama (/) SDN Jatipulo 07 Jakarta
 */
export default function HomePage() {
  return (
    <div className="home-page">
      <BannerUtama />
      <SambutanKepsek />
      <VisiMisi />
      <BeritaTerbaru />
      <LokasiKontak />
    </div>
  );
}
