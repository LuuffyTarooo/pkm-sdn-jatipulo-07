import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataEkstrakurikuler } from '@/data/ekstrakurikuler';
import EkskulCard from '@/components/cards/EkskulCard';

export const metadata: Metadata = {
  title: 'Ekstrakurikuler',
  description: 'Pilihan kegiatan ekstrakurikuler untuk mengembangkan minat dan bakat siswa di SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Ekstrakurikuler (/kesiswaan/ekstrakurikuler)
 */
export default function EkstrakurikulerPage() {
  return (
    <div className="ekstrakurikuler-page bg-[#f8fafc] min-h-screen pb-20">
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Kesiswaan' },
          { label: 'Ekstrakurikuler' },
        ]}
        badge="Pengembangan Bakat & Minat"
        title="Kegiatan Ekstrakurikuler"
        subtitle="Wadah eksplorasi potensi kepemimpinan, seni, olahraga, dan kreativitas putra-putri kami."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        {dataEkstrakurikuler.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Data kegiatan ekstrakurikuler sedang diperbarui.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {dataEkstrakurikuler.map((ekskul) => (
              <EkskulCard key={ekskul.id} ekskul={ekskul} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
