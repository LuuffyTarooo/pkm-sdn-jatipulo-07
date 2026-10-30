import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataGuru } from '@/data/guru';
import GuruDirectory from '@/components/sections/GuruDirectory';

export const metadata: Metadata = {
  title: 'Guru & Tenaga Kependidikan',
  description:
    'Profil dewan guru dan tenaga kependidikan berdedikasi dan bersertifikasi di SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Guru & Staf (/guru-dan-staf)
 * Menyajikan profil dewan pendidik dan staf penunjang secara terstruktur,
 * dilengkapi filter kategori, pencarian langsung, dan spotlight pimpinan sekolah.
 */
export default function GuruDanStafPage() {
  return (
    <div className="guru-dan-staf-page bg-[#f8fafc] min-h-screen pb-20">
      {/* 1. Hero Banner Selaras Subpage Profil, Fasilitas, & Berita */}
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Guru & Staf' },
        ]}
        badge="Tenaga Pendidik & Kependidikan"
        title="Guru & Tenaga Kependidikan"
        subtitle="Mengenal dewan guru dan tenaga kependidikan profesional yang membimbing putra-putri di SDN Jatipulo 07 Jakarta."
      />

      {/* 2. Konten Utama: Direktori Guru & Staf */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-10 sm:pt-14 space-y-16 sm:space-y-20">
        <GuruDirectory initialGuru={dataGuru} />

        {/* 3. Seksi Komitmen Dewan Pendidik */}
        <section aria-labelledby="komitmen-heading" className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="max-w-2xl text-left">
            <h2 id="komitmen-heading" className="font-heading text-2xl sm:text-3xl font-extrabold text-[#064e3b] tracking-tight">
              Komitmen Pengabdian Dewan Pendidik
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed font-sans">
              Fondasi pengajaran kami berpusat pada perkembangan holistik, kenyamanan, dan kebahagiaan belajar setiap peserta didik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left font-sans">
            <div className="p-6 rounded-2xl bg-[#f8fdf9] border border-emerald-100/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 4.97 4.03 9 9 9z" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#064e3b]">
                Pendidikan Ramah Anak
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Menciptakan ruang belajar yang aman, bebas dari perundungan, inklusif, dan mendukung kesejahteraan mental serta emosional anak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fdf9] border border-emerald-100/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 11 3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#064e3b]">
                Kurikulum Berdiferensiasi
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Menyesuaikan strategi pengajaran dengan minat, gaya belajar, dan kecepatan pemahaman individual setiap anak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fdf9] border border-emerald-100/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#064e3b]">
                Profil Pelajar Pancasila
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Menanamkan budi pekerti luhur, kemandirian berpikir, bernalar kritis, gotong royong, dan kepedulian terhadap lingkungan.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
