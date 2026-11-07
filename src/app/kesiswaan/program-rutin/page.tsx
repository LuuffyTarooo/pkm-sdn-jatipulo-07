import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataProgramRutin } from '@/data/program-rutin';
import ProgramRutinDirectory from '@/components/sections/ProgramRutinDirectory';

export const metadata: Metadata = {
  title: 'Program Rutin Kesiswaan | SDN Jatipulo 07 Jakarta',
  description:
    'Program pembiasaan dan kegiatan rutin pembentukan karakter peserta didik di SDN Jatipulo 07 Jakarta setiap hari Senin hingga Jumat.',
};

/**
 * Halaman Program Rutin Kesiswaan (/kesiswaan/program-rutin)
 * Dirombak dengan standar UI/UX Pro Max untuk visual hierarchy, responsivitas, dan aksesibilitas optimal.
 */
export default function ProgramRutinPage() {
  return (
    <div className="program-rutin-page bg-[#f8fafc] min-h-screen pb-24">
      {/* Hero Banner dengan branding SDN Jatipulo 07 */}
      <HeroBanner
        title="Program Rutin & Pembiasaan Siswa"
        subtitle="Membangun karakter unggul, religius, berbudaya, dan berprestasi melalui kegiatan pembiasaan terencana setiap Senin hingga Jumat."
        preserveSpacing={true}
      />

      {/* Main Container dengan lebar proporsional untuk 3 kolom di desktop */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-8 sm:pt-12">
        <ProgramRutinDirectory programs={dataProgramRutin} />
      </main>
    </div>
  );
}
