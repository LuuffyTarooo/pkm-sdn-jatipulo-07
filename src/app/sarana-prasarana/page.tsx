import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataFasilitas } from '@/data/fasilitas';
import FasilitasDirectory from '@/components/sections/FasilitasDirectory';

export const metadata: Metadata = {
  title: 'Sarana & Prasarana',
  description:
    'Fasilitas representatif, aman, dan nyaman di lingkungan SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Sarana & Prasarana / Fasilitas (/sarana-prasarana)
 */
export default function SaranaPrasaranaPage() {
  return (
    <div className="sarana-prasarana-page bg-[#f8fafc] min-h-[100svh] pb-20">
      <HeroBanner
        title="Sarana & Prasarana"
        subtitle="Fasilitas representatif, higienis, dan nyaman yang mendukung proses pembelajaran kondusif bagi seluruh peserta didik."
        preserveSpacing={true}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14">
        <FasilitasDirectory fasilitas={dataFasilitas} />
      </div>
    </div>
  );
}
