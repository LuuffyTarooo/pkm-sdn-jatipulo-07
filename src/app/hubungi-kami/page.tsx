import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataSekolah } from '@/data/sekolah';
import MapEmbed from '@/components/ui/MapEmbed';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Alamat lengkap, nomor kontak, jam pelayanan, dan lokasi Google Maps SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Kontak & Lokasi (/hubungi-kami)
 * Desain UI/UX Pro Max ("Royal Academic Navy"):
 * - Ringkasan 3 kartu kontak cepat (Telepon, WhatsApp, Email)
 * - Jadwal operasional pelayanan tata usaha terstruktur
 * - Media sosial resmi (YouTube, Instagram, TikTok) dengan badge representatif
 * - Peta Google Maps interaktif dengan navigasi langsung
 */
export default function HubungiKamiPage() {
  const whatsappNumber = dataSekolah.kontak.whatsapp?.replace(/\D/g, '') || '';
  const whatsappLink = `https://wa.me/62${whatsappNumber.replace(/^0/, '')}?text=Halo%20Admin%20SDN%20Jatipulo%2007,%20saya%20ingin%20bertanya%20mengenai...`;

  return (
    <div className="hubungi-kami-page bg-[#f8fafc] min-h-screen pb-16">
      {/* 1. Hero Banner Bersih */}
      <HeroBanner
        title="Hubungi &amp; Kunjungi Kami"
        subtitle="Kami siap melayani kebutuhan informasi, konsultasi, dan kemitraan pendidikan dengan ramah dan solutif."
        preserveSpacing={true}
      />

      {/* 2. Konten Utama Kontak */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-8 sm:pt-10 space-y-8 sm:space-y-10">
        
        {/* Ringkasan 3 Kartu Komunikasi Langsung */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
          
          {/* Kartu Telepon */}
          <a
            href={`tel:${dataSekolah.kontak.telepon.replace(/\D/g, '')}`}
            className="group p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 hover:border-[#93c5fd] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <span className="text-xs text-neutral-500 font-sans block">Telepon Kantor</span>
              <span className="font-heading font-bold text-base sm:text-lg text-neutral-900 group-hover:text-[#0f2d4a] transition-colors">{dataSekolah.kontak.telepon}</span>
              <span className="text-xs text-[#1d4e78] font-medium block mt-1">Panggilan suara langsung &rarr;</span>
            </div>
          </a>

          {/* Kartu WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 hover:border-[#93c5fd] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div>
              <span className="text-xs text-neutral-500 font-sans block">WhatsApp Center</span>
              <span className="font-heading font-bold text-base sm:text-lg text-neutral-900 group-hover:text-[#0f2d4a] transition-colors">{dataSekolah.kontak.whatsapp}</span>
              <span className="text-xs text-[#1d4e78] font-medium block mt-1">Konsultasi cepat via chat &rarr;</span>
            </div>
          </a>

          {/* Kartu Email */}
          <a
            href={`mailto:${dataSekolah.kontak.email}`}
            className="group p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 hover:border-[#93c5fd] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <span className="text-xs text-neutral-500 font-sans block">Email Resmi</span>
              <span className="font-heading font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#0f2d4a] transition-colors truncate block">{dataSekolah.kontak.email}</span>
              <span className="text-xs text-[#1d4e78] font-medium block mt-1">Korespondensi formal &rarr;</span>
            </div>
          </a>

        </div>

        {/* Seksi Detail Kontak & Peta */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Kolom Kiri: Alamat, Jam Operasional, & Media Sosial (5 Kolom) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box Alamat */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-3">
              <h2 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
                Alamat Satuan Pendidikan
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed font-sans">
                {dataSekolah.identitas.alamat}, Kel. {dataSekolah.identitas.kelurahan}, Kec. {dataSekolah.identitas.kecamatan}, {dataSekolah.identitas.kota}, {dataSekolah.identitas.provinsi} {dataSekolah.identitas.kodePos}
              </p>
              <div className="pt-1">
                <a
                  href="https://maps.google.com/?q=SDN+Jatipulo+07+Pagi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1d4e78] hover:text-[#0f2d4a] underline"
                >
                  <span>Buka di Google Maps Langsung</span>
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Box Jam Layanan */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-3">
              <h2 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
                Jam Operasional Tata Usaha
              </h2>
              <div className="space-y-2 text-xs sm:text-sm font-sans">
                {dataSekolah.jamKerja.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                    <span className="text-neutral-600 font-medium">{item.hari}</span>
                    <span className="text-neutral-900 font-semibold">{item.jam}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box Media Sosial Resmi */}
            <div className="bg-white rounded-2xl border border-gray-200/90 p-6 shadow-xs space-y-3">
              <h2 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
                Kanal Media Sosial Resmi
              </h2>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {dataSekolah.mediaSosial.map((medsos) => (
                  <a
                    key={medsos.platform}
                    href={medsos.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-50 hover:bg-[#eff6ff] border border-gray-200/70 hover:border-[#93c5fd] transition-colors flex items-center justify-between text-xs sm:text-sm font-sans"
                  >
                    <span className="capitalize font-semibold text-neutral-800">{medsos.platform}</span>
                    <span className="text-[#1d4e78] font-medium flex items-center gap-1">
                      {medsos.handle}
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Peta Google Maps Interaktif (7 Kolom) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs">
              <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-200/80 flex items-center justify-between text-xs sm:text-sm font-sans">
                <span className="font-heading font-bold text-[#0f2d4a]">Peta Interaktif Lokasi Sekolah</span>
                <span className="text-neutral-500">Palmerah, Jakarta Barat</span>
              </div>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
                <MapEmbed
                  embedUrl={dataSekolah.kontak.googleMapsEmbedUrl}
                  title="Peta Lokasi Resmi SDN Jatipulo 07 Jakarta Barat"
                  className="h-full w-full rounded-none"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
