import { Metadata } from 'next';
import BannerUtama from '@/components/sections/BannerUtama';
import SambutanKepsek from '@/components/sections/SambutanKepsek';
import VisiMisi from '@/components/sections/VisiMisi';
import BeritaTerbaru from '@/components/sections/BeritaTerbaru';
import LokasiKontak from '@/components/sections/LokasiKontak';
import { getAllBerita } from '@/lib/db';
import { dataBerita as fallbackBerita } from '@/data/berita';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    absolute: 'SDN Jatipulo 07',
  },
  description:
    'Selamat datang di website resmi SDN Jatipulo 07 Jakarta Barat. Pusat informasi akademik, profil sekolah, kesiswaan, dan prestasi.',
};

/**
 * Halaman Beranda Utama (/) SDN Jatipulo 07 Jakarta
 */
export default function HomePage() {
  let beritaList = fallbackBerita;
  try {
    const fromDb = getAllBerita(false);
    if (fromDb && fromDb.length > 0) {
      beritaList = fromDb;
    }
  } catch (e) {
    console.error('Error fetching berita on HomePage:', e);
  }

  return (
    <div className="home-page">
      <BannerUtama />
      <SambutanKepsek />
      <VisiMisi />
      <BeritaTerbaru initialBerita={beritaList} />
      <LokasiKontak />
    </div>
  );
}
