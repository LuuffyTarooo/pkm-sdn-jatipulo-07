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
            <h2 id="komitmen-heading" className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] tracking-tight">
              Komitmen Pengabdian Dewan Pendidik
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed font-sans">
              Fondasi pengajaran kami berpusat pada perkembangan holistik, kenyamanan, dan kebahagiaan belajar setiap peserta didik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left font-sans">
            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading text-xs font-extrabold tracking-wider text-[#1d4e78]">
                  01
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
                Pendidikan Ramah Anak
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Menciptakan ruang belajar yang aman, bebas dari perundungan, inklusif, dan mendukung kesejahteraan mental serta emosional anak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading text-xs font-extrabold tracking-wider text-[#1d4e78]">
                  02
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
                Kurikulum Berdiferensiasi
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Menyesuaikan strategi pengajaran dengan minat, gaya belajar, dan kecepatan pemahaman individual setiap anak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading text-xs font-extrabold tracking-wider text-[#1d4e78]">
                  03
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
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
