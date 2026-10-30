import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataBerita } from '@/data/berita';
import BeritaCard from '@/components/cards/BeritaCard';

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
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Berita & Pengumuman' },
        ]}
        badge="Informasi & Agenda Terkini"
        title="Berita & Pengumuman Sekolah"
        subtitle="Dapatkan kabar terbaru seputar prestasi, agenda akademik, dan aktivitas SDN Jatipulo 07 Jakarta."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        {dataBerita.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Belum ada berita atau pengumuman yang diunggah.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {dataBerita.map((item) => (
              <BeritaCard key={item.id} berita={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
