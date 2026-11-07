import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataProgramRutin } from '@/data/program-rutin';
import ProgramRutinDirectory from '@/components/sections/ProgramRutinDirectory';

export const metadata: Metadata = {
  title: 'Program Rutin Pembiasaan Siswa | SDN Jatipulo 07 Jakarta',
  description:
    'Jadwal pembiasaan karakter, literasi, numerasi, dan kebugaran peserta didik SDN Jatipulo 07 Jakarta setiap hari Senin hingga Jumat.',
};

/**
 * Halaman Program Rutin Kesiswaan (/kesiswaan/program-rutin)
 * Desain Modern, Clean & Minimalis:
 * - Hero banner resmi dan proporsional
 * - Filter hari (Senin s.d. Jumat) yang interaktif
 * - Kartu program harian yang rapi dan terstruktur dengan siklus rotasi 4 minggu
 */
export default function ProgramRutinPage() {
  return (
    <div className="program-rutin-page bg-[#f8fafc] min-h-[100dvh] pb-24">
      {/* 1. Hero Banner Bersih & Proporsional */}
      <HeroBanner
        title="Program Pembiasaan Siswa"
        subtitle="Jadwal pembiasaan karakter, literasi, numerasi, dan kebugaran setiap Senin hingga Jumat."
        preserveSpacing={true}
      />

      {/* 2. Direktori Program Rutin */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        <ProgramRutinDirectory programs={dataProgramRutin} />
      </main>
    </div>
  );
}
