import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dataSekolah } from '@/data/sekolah';

/**
 * Komponen Footer Situs Kompak & Elegan
 * - Dimensi vertikal ramping dan proporsional
 * - Grid terstruktur rapi: Identitas & Medsos, Tautan Cepat, Kontak Langsung
 * - Ikon media sosial interaktif tersinkronisasi dengan dataSekolah.mediaSosial
 * - Palet Midnight Academic Navy (#081726) dengan kontras teks tinggi
 */
export default function Footer() {
  const currentYear = 2026;

  const getSocialUrl = (platform: string, fallback: string) => {
    const found = dataSekolah.mediaSosial.find((m) => m.platform === platform);
    return found ? found.url : fallback;
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: getSocialUrl('instagram', 'https://www.instagram.com/sdn_jatipulo07'),
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: getSocialUrl('tiktok', 'https://www.tiktok.com/@sdnjatipulo07_'),
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: getSocialUrl('youtube', 'https://youtube.com/@sdnjatipulo07'),
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: getSocialUrl('facebook', 'https://www.facebook.com/share/16PWfNsgDAz/'),
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="site-footer bg-[#081726] border-t border-[#163d63]/60 text-white pt-8 sm:pt-10 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Grid Konten Utama Ramping (Compact Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start text-left">
          {/* Kolom 1: Identitas Sekolah & Ikon Medsos (5 Kolom) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo/logo.png"
                  alt="Logo SDN Jatipulo 07 Jakarta"
                  width={34}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white leading-tight">
                  {dataSekolah.identitas.nama}
                </h3>
                <p className="text-xs text-[#93c5fd] font-sans">
                  NPSN {dataSekolah.identitas.npsn} &bull; Akreditasi {dataSekolah.identitas.akreditasi}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans max-w-sm">
              {dataSekolah.identitas.alamat}, Kec. {dataSekolah.identitas.kecamatan},{' '}
              {dataSekolah.identitas.kota} {dataSekolah.identitas.kodePos}
            </p>

            {/* Tombol Ikon Media Sosial Kompak */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Kunjungi ${item.name} SDN Jatipulo 07`}
                  className="w-9 h-9 rounded-lg bg-[#0f2d4a]/80 border border-[#1d4e78]/70 hover:border-[#7dd3fc] hover:bg-[#163d63] text-neutral-200 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat (3 Kolom) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#bae6fd]">
              Navigasi Halaman
            </h4>
            <ul className="text-xs text-neutral-300 space-y-1.5 font-sans">
              <li>
                <Link href="/profil" className="hover:text-white transition-colors">
                  Profil &amp; Visi Misi
                </Link>
              </li>
              <li>
                <Link href="/guru-dan-staf" className="hover:text-white transition-colors">
                  Guru &amp; Tenaga Kependidikan
                </Link>
              </li>
              <li>
                <Link href="/sarana-prasarana" className="hover:text-white transition-colors">
                  Sarana &amp; Prasarana
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-white transition-colors">
                  Berita &amp; Pengumuman
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-white transition-colors">
                  Galeri Foto Sekolah
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Kontak Cepat (4 Kolom) */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#bae6fd]">
              Layanan Informasi
            </h4>
            <div className="text-xs text-neutral-300 space-y-1.5 font-sans">
              <div className="flex items-start gap-2">
                <span className="text-[#7dd3fc] font-semibold w-16 shrink-0">Telepon:</span>
                <span className="text-white">
                  {dataSekolah.kontak.telepon}
                  {dataSekolah.kontak.telepon2 && ` / ${dataSekolah.kontak.telepon2}`}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#7dd3fc] font-semibold w-16 shrink-0">WhatsApp:</span>
                <span className="text-white">
                  {dataSekolah.kontak.whatsapp}
                  {dataSekolah.kontak.whatsapp2 && ` / ${dataSekolah.kontak.whatsapp2}`}
                </span>
              </div>
              <p className="flex items-center gap-2">
                <span className="text-[#7dd3fc] font-semibold w-16 shrink-0">Email:</span>
                <span className="text-white truncate">{dataSekolah.kontak.email}</span>
              </p>
              <p className="pt-1 text-xs text-neutral-300 leading-relaxed">
                Jam Pelayanan: Senin–Kamis (06.30–15.00) &bull; Jumat (06.30–14.30 WIB)
              </p>
            </div>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta Kompak */}
        <div className="border-t border-[#163d63]/60 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2 text-center sm:text-left font-sans">
          <p>
            &copy; {currentYear} {dataSekolah.identitas.nama}. All rights reserved.
          </p>
          <p className="text-[#93c5fd] font-medium">DKI Jakarta, Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
