'use client';

import React from 'react';
import Link from 'next/link';
import { dataSekolah } from '@/data/sekolah';
import MapEmbed from '@/components/ui/MapEmbed';

/**
 * Komponen Seksi Lokasi & Kontak Sekolah di Beranda
 * Standar Desain UI/UX Pro Max - High-Density & Compact:
 * - Dimensi proporsional dan tidak bulky (vertikal ramping, hemat ruang scroll)
 * - Tata letak 12-kolom terpadu dengan ketinggian seimbang antara kontak dan peta
 * - Akses langsung WhatsApp, panggilan telepon, rute Google Maps
 * - Status operasional terpadu tanpa ornamen berlebih
 */
export default function LokasiKontak() {
  const whatsappNumber = dataSekolah.kontak.whatsapp?.replace(/\D/g, '') || '';
  const whatsappLink = `https://wa.me/62${whatsappNumber.replace(/^0/, '')}?text=Halo%20Admin%20SDN%20Jatipulo%2007,%20saya%20ingin%20bertanya%20mengenai...`;

  return (
    <section
      aria-labelledby="lokasi-heading"
      className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-[#064e3b] text-white"
    >
      <div className="container mx-auto max-w-6xl space-y-6 sm:space-y-8">
        
        {/* Header Kompak */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left border-b border-emerald-800/60 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-950/70 text-[#a7f3d0] border border-emerald-500/30 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span>Pusat Layanan &amp; Informasi</span>
            </div>
            <h2
              id="lokasi-heading"
              className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              Kunjungi &amp; Hubungi Kami
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-emerald-200/90 font-sans sm:text-right max-w-md">
            Layanan administrasi, konsultasi wali murid, dan informasi pendaftaran peserta didik baru.
          </p>
        </div>

        {/* Konten 12-Kolom Kompak & Sejajar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch text-left">
          
          {/* Kolom Kiri: Rincian Kontak Padat (5 Kolom) */}
          <div className="lg:col-span-5 bg-emerald-950/50 rounded-2xl border border-emerald-700/40 p-5 sm:p-6 flex flex-col justify-between space-y-4">
            
            <div className="space-y-3.5">
              {/* Alamat Singkat & Jelas */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a7f3d0] block">
                  Alamat Satuan Pendidikan
                </span>
                <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed font-sans">
                  {dataSekolah.identitas.alamat}, Kel. {dataSekolah.identitas.kelurahan}, Kec. {dataSekolah.identitas.kecamatan}, {dataSekolah.identitas.kota} {dataSekolah.identitas.kodePos}
                </p>
              </div>

              {/* Saluran Kontak Cepat (Grid 2 Kolom Ringkas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {/* Telepon */}
                <a
                  href={`tel:${dataSekolah.kontak.telepon.replace(/\D/g, '')}`}
                  className="p-2.5 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-700/30 transition-colors flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-800/80 text-[#34d399] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] text-emerald-300 font-sans">Telepon</span>
                    <span className="block text-xs font-bold text-white truncate">{dataSekolah.kontak.telepon}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${dataSekolah.kontak.email}`}
                  className="p-2.5 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/70 border border-emerald-700/30 transition-colors flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-800/80 text-[#34d399] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] text-emerald-300 font-sans">Email</span>
                    <span className="block text-xs font-bold text-white truncate">{dataSekolah.kontak.email}</span>
                  </div>
                </a>
              </div>

              {/* Jam Operasional */}
              <div className="pt-1 text-xs text-emerald-200 font-sans flex items-center justify-between border-t border-emerald-800/40 pt-2.5">
                <span className="text-neutral-300">Pelayanan TU:</span>
                <span className="font-semibold text-white">Senin &ndash; Jumat, 06.30 &ndash; 15.00 WIB</span>
              </div>
            </div>

            {/* Aksi Cepat WhatsApp & Link Kontak */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#064e3b] font-bold text-xs sm:text-sm shadow-sm transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Chat WhatsApp</span>
              </a>

              <a
                href="https://maps.google.com/?q=SDN+Jatipulo+07+Pagi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 text-white font-medium text-xs sm:text-sm border border-emerald-700/50 transition-colors"
              >
                <span>Google Maps</span>
                <span aria-hidden="true">&nearr;</span>
              </a>
            </div>

          </div>

          {/* Kolom Kanan: Peta Google Maps Kompak (7 Kolom) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-emerald-950/60 border border-emerald-700/40">
              <div className="px-4 py-2.5 bg-emerald-950/80 border-b border-emerald-800/60 flex items-center justify-between text-xs font-sans">
                <span className="font-semibold text-white flex items-center gap-1.5 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  Lokasi Resmi SDN Jatipulo 07
                </span>
                <Link href="/hubungi-kami" className="text-emerald-300 hover:text-white transition-colors text-[11px] font-medium">
                  Detail Kontak &rarr;
                </Link>
              </div>

              <div className="relative w-full flex-1 min-h-[220px] sm:min-h-[260px]">
                <MapEmbed
                  embedUrl={dataSekolah.kontak.googleMapsEmbedUrl}
                  title="Peta Lokasi SDN Jatipulo 07"
                  className="h-full w-full rounded-none"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
