import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataEkstrakurikuler } from '@/data/ekstrakurikuler';
import EkskulDirectory from '@/components/sections/EkskulDirectory';

export const metadata: Metadata = {
  title: 'Ekstrakurikuler',
  description:
    '12 pilihan kegiatan ekstrakurikuler unggulan untuk mengembangkan bakat, kepemimpinan, seni, olahraga, dan karakter siswa di SDN Jatipulo 07 Jakarta.',
  openGraph: {
    title: 'Ekstrakurikuler SDN Jatipulo 07 Jakarta',
    description:
      'Wadah eksplorasi potensi kepemimpinan, seni, olahraga, dan kreativitas peserta didik SDN Jatipulo 07 Jakarta.',
  },
};

/**
 * Halaman Ekstrakurikuler Sekolah (/kesiswaan/ekstrakurikuler)
 * Server Component yang meneruskan data ke EkskulDirectory (Client Component)
 */
export default function EkstrakurikulerPage() {
  return (
    <div className="ekstrakurikuler-page bg-[#f8fafc] min-h-screen pb-16 sm:pb-20">
      {/* 1. Hero Banner Sub-Page */}
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Kesiswaan' },
          { label: 'Ekstrakurikuler' },
        ]}
        badge="Pengembangan Bakat &amp; Minat"
        title="Kegiatan Ekstrakurikuler"
        subtitle="12 pilihan wadah eksplorasi potensi kepemimpinan, seni budaya, olahraga, dan karakter religius putra-putri kami."
      />

      {/* 2. Direktori Interaktif Ekstrakurikuler */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-4 sm:pt-6">
        <EkskulDirectory initialEkskul={dataEkstrakurikuler} />
      </main>
    </div>
  );
}
