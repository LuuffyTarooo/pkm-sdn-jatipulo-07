import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataFasilitas } from '@/data/fasilitas';
import FasilitasCard from '@/components/cards/FasilitasCard';

export const metadata: Metadata = {
  title: 'Sarana & Prasarana',
  description: 'Fasilitas dan sarana penunjang kegiatan belajar mengajar di SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Sarana & Prasarana / Fasilitas (/sarana-prasarana)
 */
export default function SaranaPrasaranaPage() {
  return (
    <div className="sarana-prasarana-page bg-[#f8fafc] min-h-screen pb-20">
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Fasilitas & Sarpras' },
        ]}
        badge="Fasilitas & Lingkungan Belajar"
        title="Sarana & Prasarana Sekolah"
        subtitle="Fasilitas representatif dan ramah anak untuk mendukung proses belajar mengajar yang kondusif."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        {dataFasilitas.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Data fasilitas sekolah sedang diperbarui.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {dataFasilitas.map((fasilitas) => (
              <FasilitasCard key={fasilitas.id} fasilitas={fasilitas} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
