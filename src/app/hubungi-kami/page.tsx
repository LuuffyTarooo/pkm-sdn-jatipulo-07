import { Metadata } from 'next';
import HeroBanner from '@/components/ui/HeroBanner';
import { dataSekolah } from '@/data/sekolah';
import MapEmbed from '@/components/ui/MapEmbed';

export const metadata: Metadata = {
  title: 'Hubungi Kami | SDN Jatipulo 07 Jakarta',
  description:
    'Kontak resmi, alamat, jam operasional, dan lokasi SDN Jatipulo 07 Jakarta.',
};

/**
 * Halaman Hubungi Kami (/hubungi-kami)
 * Desain Modern, Seragam, Minimalis & Clean:
 * - 3 Kartu kontak seragam putih dengan aksen navy & ikon minimalis
 * - Alamat ringkas dengan tautan navigasi
 * - Jam layanan tata usaha terstruktur
 * - Peta Google Maps interaktif terintegrasi
 * - Tautan media sosial resmi
 */
export default function HubungiKamiPage() {
  const wa1Clean = dataSekolah.kontak.whatsapp?.replace(/\D/g, '') || '';
  const wa1Url = `https://wa.me/62${wa1Clean.replace(/^0/, '')}?text=Halo%20Admin%20SDN%20Jatipulo%2007...`;
  const wa2Clean = dataSekolah.kontak.whatsapp2?.replace(/\D/g, '') || '';
  const wa2Url = `https://wa.me/62${wa2Clean.replace(/^0/, '')}?text=Halo%20Admin%20SDN%20Jatipulo%2007...`;

  return (
    <div className="hubungi-kami-page bg-[#f8fafc] min-h-[100dvh] pb-24">
      {/* 1. Hero Banner Bersih & Proporsional */}
      <HeroBanner
        title="Hubungi Kami"
        subtitle="Informasi kontak resmi, lokasi, dan jadwal pelayanan tata usaha sekolah."
        preserveSpacing={true}
      />

      {/* 2. Konten Utama: Seragam, Minimalis & Fungsional */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-10 sm:pt-14 space-y-8 sm:space-y-10">
        
        {/* Tiga Saluran Kontak Seragam Putih dengan Aksen Navy */}
        <section aria-label="Saluran Kontak Utama" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Kartu WhatsApp */}
          <div className="bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 rounded-2xl flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">
                  WhatsApp Resmi
                </span>
                <svg
                  className="w-5 h-5 text-emerald-600 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="space-y-1">
                <a
                  href={wa1Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-heading font-bold text-base sm:text-lg text-[#0b182a] hover:text-[#0284c7] transition-colors tracking-tight"
                >
                  {dataSekolah.kontak.whatsapp}
                </a>
                {dataSekolah.kontak.whatsapp2 && (
                  <a
                    href={wa2Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-heading font-bold text-base sm:text-lg text-[#0b182a] hover:text-[#0284c7] transition-colors tracking-tight"
                  >
                    {dataSekolah.kontak.whatsapp2}
                  </a>
                )}
              </div>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0284c7]">
              <span>Kirim Chat WhatsApp</span>
              <span aria-hidden="true">&rarr;</span>
            </div>
          </div>

          {/* Kartu Telepon Kantor */}
          <div className="bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 rounded-2xl flex flex-col justify-between min-h-[160px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">
                  Layanan Telepon
                </span>
                <svg
                  className="w-5 h-5 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="space-y-1">
                <a
                  href={`tel:${dataSekolah.kontak.telepon.replace(/\D/g, '')}`}
                  className="block font-heading font-bold text-base sm:text-lg text-[#0b182a] hover:text-[#0284c7] transition-colors tracking-tight"
                >
                  {dataSekolah.kontak.telepon}
                </a>
                {dataSekolah.kontak.telepon2 && (
                  <a
                    href={`tel:${dataSekolah.kontak.telepon2.replace(/\D/g, '')}`}
                    className="block font-heading font-bold text-base sm:text-lg text-[#0b182a] hover:text-[#0284c7] transition-colors tracking-tight"
                  >
                    {dataSekolah.kontak.telepon2}
                  </a>
                )}
              </div>
            </div>
            <div className="pt-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0284c7]">
              <span>Panggil Nomor Telepon</span>
              <span aria-hidden="true">&rarr;</span>
            </div>
          </div>

          {/* Kartu Email Resmi */}
          <a
            href={`mailto:${dataSekolah.kontak.email}`}
            className="group bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 rounded-2xl flex flex-col justify-between min-h-[160px] hover:bg-slate-50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">
                  Surel Resmi
                </span>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-[#0b182a] transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="font-heading font-bold text-base sm:text-lg text-[#0b182a] group-hover:text-[#0284c7] transition-colors truncate">
                {dataSekolah.kontak.email}
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0284c7]">
              <span>Kirim Email</span>
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </div>
          </a>

        </section>

        {/* Lokasi, Jam Layanan, & Peta Terpadu */}
        <section aria-label="Lokasi dan Jam Layanan" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Kolom Kiri: Alamat, Jam Operasional & Media Sosial (5 Kolom) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
            
            {/* Box Alamat Sekolah */}
            <div className="bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Alamat Sekolah
                </span>
                <svg
                  className="w-4 h-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className="font-sans text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                {dataSekolah.identitas.alamat}, Kel. {dataSekolah.identitas.kelurahan}, Kec. {dataSekolah.identitas.kecamatan}, {dataSekolah.identitas.kota} {dataSekolah.identitas.kodePos}
              </p>

              <a
                href="https://maps.google.com/?q=SDN+Jatipulo+07+Pagi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0284c7] hover:text-[#0369a1] transition-colors"
              >
                <span>Buka Petunjuk Arah</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Box Jam Layanan */}
            <div className="bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 rounded-2xl space-y-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-500">
                  Jam Layanan Tata Usaha
                </span>
                <svg
                  className="w-4 h-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="space-y-2 font-sans text-xs sm:text-sm">
                {dataSekolah.jamKerja.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 px-3.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-600 font-medium">{item.hari}</span>
                    <span className="font-semibold text-[#0b182a]">{item.jam}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kanal Media Sosial Resmi */}
            <div className="bg-white border border-slate-200/90 shadow-xs p-6 sm:p-7 rounded-2xl space-y-3">
              <span className="text-xs font-semibold text-slate-500 block mb-1">
                Media Sosial Resmi
              </span>
              <div className="flex items-center gap-3">
                {dataSekolah.mediaSosial.map((medsos) => {
                  const platform = medsos.platform.toLowerCase();
                  return (
                    <a
                      key={medsos.platform}
                      href={medsos.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={medsos.platform}
                      aria-label={medsos.platform}
                      className="w-11 h-11 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0b182a]"
                    >
                      {platform === 'instagram' && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                          <defs>
                            <linearGradient id="ig-gradient-hubungi" x1="0%" y1="100%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#f09433" />
                              <stop offset="25%" stopColor="#e6683c" />
                              <stop offset="50%" stopColor="#dc2743" />
                              <stop offset="75%" stopColor="#cc2366" />
                              <stop offset="100%" stopColor="#bc1888" />
                            </linearGradient>
                          </defs>
                          <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#ig-gradient-hubungi)" />
                          <circle cx="12" cy="12" r="4.2" fill="none" stroke="#ffffff" strokeWidth="1.8" />
                          <circle cx="17" cy="7" r="1.1" fill="#ffffff" />
                          <rect width="14" height="14" x="5" y="5" rx="3.5" fill="none" stroke="#ffffff" strokeWidth="1.8" />
                        </svg>
                      )}
                      {platform === 'tiktok' && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                          <rect width="20" height="20" x="2" y="2" rx="5" fill="#010101" />
                          <path
                            fill="#ffffff"
                            d="M16.6 8.2a3.8 3.8 0 0 1-2.9-3.2h-2.3v10.3a2.2 2.2 0 1 1-2.2-2.2c.3 0 .6 0 .9.2V11a4.5 4.5 0 1 0 3.6 4.4V9.7a6 6 0 0 0 2.9.8V8.2z"
                          />
                        </svg>
                      )}
                      {platform === 'youtube' && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fill="#FF0000"
                            d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81z"
                          />
                          <polygon fill="#FFFFFF" points="10 15 15.5 12 10 9" />
                        </svg>
                      )}
                      {platform === 'facebook' && (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" fill="#1877F2" />
                          <path
                            fill="#FFFFFF"
                            d="M13.5 12.5h2l.3-2.5h-2.3v-1.6c0-.7.2-1.2 1.2-1.2h1.3V5a17 17 0 0 0-2-.1c-2 0-3.4 1.2-3.4 3.5V10H8.5v2.5h2.1V19c.4.1.9.1 1.4.1.5 0 1 0 1.5-.1v-6.5z"
                          />
                        </svg>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Peta Google Maps (7 Kolom) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 shadow-xs rounded-2xl overflow-hidden flex flex-col min-h-[360px] sm:min-h-[440px]">
            <div className="px-6 py-4 bg-slate-100 flex items-center justify-between text-xs sm:text-sm font-sans">
              <span className="font-heading font-semibold text-[#0b182a]">
                Peta Lokasi Satuan Pendidikan
              </span>
              <span className="text-slate-500">
                Palmerah, Jakarta Barat
              </span>
            </div>
            <div className="relative w-full flex-1">
              <MapEmbed
                embedUrl={dataSekolah.kontak.googleMapsEmbedUrl}
                title="Peta Lokasi SDN Jatipulo 07 Jakarta"
                className="h-full w-full rounded-none"
              />
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}
