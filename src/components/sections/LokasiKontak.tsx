import React from 'react';
import Link from 'next/link';
import { dataSekolah } from '@/data/sekolah';
import MapEmbed from '@/components/ui/MapEmbed';

/**
 * Komponen Seksi Lokasi & Kontak Sekolah di Beranda
 * Desain Terang 2 Panel Bersih (Opsi A):
 * - Latar #f8fafc dengan dua panel putih proporsional agar kontras bersih sebelum bertemu Footer gelap
 * - Rincian kontak tersusun vertikal 1 kolom (email terbaca utuh & bebas ruang kosong)
 * - Peta interaktif full-bleed di panel kanan tanpa header ganda
 */
export default function LokasiKontak() {
  const whatsappNumber = dataSekolah.kontak.whatsapp?.replace(/\D/g, '') || '';
  const whatsappLink = `https://wa.me/62${whatsappNumber.replace(/^0/, '')}?text=Halo%20Admin%20SDN%20Jatipulo%2007,%20saya%20ingin%20bertanya%20mengenai...`;

  return (
    <section
      aria-labelledby="lokasi-heading"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] border-t border-gray-100 text-neutral-900"
    >
      <div className="container mx-auto max-w-6xl space-y-6 sm:space-y-8">
        {/* Header Seksi Selaras BeritaTerbaru */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-gray-200/80 text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#1d4e78] font-sans mb-1">
              Pusat Layanan &amp; Informasi
            </p>
            <h2
              id="lokasi-heading"
              className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] tracking-tight leading-tight"
            >
              Kunjungi &amp; Hubungi Kami
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-sans max-w-xl">
              Layanan administrasi, konsultasi wali murid, dan informasi pendaftaran peserta didik baru.
            </p>
          </div>

          <Link
            href="/hubungi-kami"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#0f2d4a] bg-[#eff6ff] hover:bg-[#dbeafe] transition-colors self-start sm:self-center shrink-0"
          >
            <span>Halaman Kontak Lengkap</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Grid 2 Panel Putih Proporsional (12 Kolom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch text-left">
          {/* Panel Kiri: Rincian Kontak Vertikal Rapi (5 Kolom) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Alamat Sekolah */}
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1d4e78] block font-sans">
                  Alamat Satuan Pendidikan
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
                  {dataSekolah.identitas.alamat}, Kel. {dataSekolah.identitas.kelurahan}, Kec.{' '}
                  {dataSekolah.identitas.kecamatan}, {dataSekolah.identitas.kota}{' '}
                  {dataSekolah.identitas.kodePos}
                </p>
              </div>

              {/* Rincian Telepon, Email (Utuh), & Jam Pelayanan */}
              <div className="pt-3.5 border-t border-gray-100 space-y-3 text-xs sm:text-sm font-sans">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-neutral-500 shrink-0">
                    <svg
                      className="w-4 h-4 text-[#1d4e78] shrink-0"
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
                    <span>Telepon</span>
                  </span>
                  <a
                    href={`tel:${dataSekolah.kontak.telepon.replace(/\D/g, '')}`}
                    className="font-bold text-neutral-900 hover:text-[#0f2d4a] transition-colors text-right"
                  >
                    {dataSekolah.kontak.telepon}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-neutral-500 shrink-0">
                    <svg
                      className="w-4 h-4 text-[#1d4e78] shrink-0"
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
                    <span>Email</span>
                  </span>
                  <a
                    href={`mailto:${dataSekolah.kontak.email}`}
                    className="font-bold text-neutral-900 hover:text-[#0f2d4a] transition-colors text-right break-all sm:break-normal"
                  >
                    {dataSekolah.kontak.email}
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-3 pt-2.5 border-t border-gray-100">
                  <span className="inline-flex items-center gap-2 text-neutral-500 shrink-0">
                    <svg
                      className="w-4 h-4 text-[#1d4e78] shrink-0"
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
                    <span>Pelayanan TU</span>
                  </span>
                  <span className="font-semibold text-neutral-800 sm:text-right text-xs leading-relaxed">
                    Senin–Kamis 06.30–15.00 WIB
                    <br className="hidden sm:inline" />
                    <span className="sm:hidden"> &bull; </span>
                    Jumat 06.30–14.30 WIB
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Cepat */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0f2d4a] hover:bg-[#1d4e78] text-white font-semibold text-xs sm:text-sm shadow-2xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2d4a] focus-visible:ring-offset-2"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Chat WhatsApp</span>
              </a>

              <a
                href="https://maps.google.com/?q=SDN+Jatipulo+07+Pagi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 hover:text-[#0f2d4a] font-semibold text-xs sm:text-sm border border-gray-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2d4a] focus-visible:ring-offset-2"
              >
                <span>Google Maps</span>
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

          {/* Panel Kanan: Peta Google Maps Bersih Full-Bleed (7 Kolom) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden flex flex-col min-h-[260px] sm:min-h-[310px]">
            <MapEmbed
              embedUrl={dataSekolah.kontak.googleMapsEmbedUrl}
              title="Peta Lokasi SDN Jatipulo 07"
              className="!aspect-auto flex-1 h-full min-h-[260px] sm:min-h-[310px] w-full rounded-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
