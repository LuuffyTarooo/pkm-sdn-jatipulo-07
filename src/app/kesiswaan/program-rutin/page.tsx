import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataProgramRutin } from '@/data/program-rutin';
import ProgramRutinCard from '@/components/cards/ProgramRutinCard';

export const metadata: Metadata = {
  title: 'Program Rutin Kesiswaan',
  description: 'Program pembiasaan dan kegiatan rutin pembentukan karakter peserta didik di SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Program Rutin Kesiswaan (/kesiswaan/program-rutin)
 */
export default function ProgramRutinPage() {
  return (
    <div className="program-rutin-page bg-[#f8fafc] min-h-screen pb-20">
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Kesiswaan' },
          { label: 'Program Rutin' },
        ]}
        badge="Pembiasaan Karakter Mulia"
        title="Program Rutin & Pembiasaan Siswa"
        subtitle="Membangun karakter mulia melalui kegiatan terencana, berkelanjutan, dan berbudaya positif."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        {dataProgramRutin.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Data program rutin sedang diperbarui.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {dataProgramRutin.map((program) => (
              <ProgramRutinCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
