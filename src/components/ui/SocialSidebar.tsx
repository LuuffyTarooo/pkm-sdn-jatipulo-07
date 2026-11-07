'use client';

import React from 'react';
import { dataSekolah } from '@/data/sekolah';

/**
 * Komponen Floating Shortcut Media Sosial di Sisi Kanan Layar (Desktop/Tablet)
 * Desain Smoked Academic Navy Glass (Opsi A):
 * - Kapsul kaca biru-navy semi-transparan dengan ring putih halus (kontras di latar putih maupun gelap)
 * - Ikon seragam putih lembut saat diam, menyala ke warna identitas platform saat hover/fokus
 * - Disembunyikan pada layar ponsel (hidden md:block) agar tidak menutupi ruang baca & kontrol peta
 * - Saat kursor mengarah ke WhatsApp: 2 nomor muncul langsung seketika secara klasik tanpa latar belakang box
 */
export default function SocialSidebar() {
  const wa1Number = dataSekolah.kontak.whatsapp || '0812-1272-2758';
  const wa2Number = dataSekolah.kontak.whatsapp2 || '0856-9107-4386';

  const wa1Clean = wa1Number.replace(/\D/g, '').replace(/^0/, '62');
  const wa2Clean = wa2Number.replace(/\D/g, '').replace(/^0/, '62');

  const wa1Url = `https://wa.me/${wa1Clean}?text=Halo%20Admin%20SDN%20Jatipulo%2007,%20saya%20ingin%20bertanya%20mengenai...`;
  const wa2Url = `https://wa.me/${wa2Clean}?text=Halo%20Admin%20SDN%20Jatipulo%2007,%20saya%20ingin%20bertanya%20mengenai...`;

  const getUrl = (platform: string) => {
    const found = dataSekolah.mediaSosial.find((m) => m.platform === platform);
    return found ? found.url : '#';
  };

  const otherSocials = [
    {
      name: 'Instagram',
      href: getUrl('instagram'),
      hoverIconColor: 'group-hover:text-[#f472b6] group-focus-within:text-[#f472b6]',
      icon: (
        <svg
          className="w-4.5 h-4.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: getUrl('facebook'),
      hoverIconColor: 'group-hover:text-[#60a5fa] group-focus-within:text-[#60a5fa]',
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: getUrl('youtube'),
      hoverIconColor: 'group-hover:text-[#f87171] group-focus-within:text-[#f87171]',
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.6 15.5v-7l6.2 3.5-6.2 3.5z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: getUrl('tiktok'),
      hoverIconColor: 'group-hover:text-[#2dd4bf] group-focus-within:text-[#2dd4bf]',
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      data-ui="floating-shortcuts"
      aria-label="Shortcut Media Sosial Sekolah"
      className="fixed right-2.5 lg:right-3 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div data-ui="pill" className="bg-[#0f2d4a]/72 hover:bg-[#0b2239]/90 backdrop-blur-md rounded-full shadow-[0_8px_28px_rgba(8,23,38,0.28)] border border-white/25 ring-1 ring-black/10 py-2 px-1.5 flex flex-col items-center gap-1 transition-colors duration-300">
        
        {/* WhatsApp dengan 2 Nomor Langsung Muncul saat Hover (Tanpa Latar Belakang) */}
        <div className="relative group flex items-center justify-center">
          {/* Teks 2 Nomor Melayang di Kiri Tombol (Tanpa Latar Belakang Box) */}
          <div
            data-ui="tooltip"
            className="absolute right-full mr-3 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-opacity duration-200 flex flex-col gap-1 text-xs font-semibold tracking-wide before:absolute before:-right-3 before:top-0 before:bottom-0 before:w-3"
          >
            <a
              data-ui="wa-link-1"
              href={wa1Url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#4ade80] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] drop-shadow-[0_0_1px_rgba(0,0,0,0.95)] transition-colors py-0.5"
            >
              {wa1Number}
            </a>
            <a
              data-ui="wa-link-2"
              href={wa2Url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#4ade80] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] drop-shadow-[0_0_1px_rgba(0,0,0,0.95)] transition-colors py-0.5"
            >
              {wa2Number}
            </a>
          </div>

          {/* Tombol Tautan Icon WhatsApp */}
          <a
            href={wa1Url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka WhatsApp SDN Jatipulo 07"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/85 hover:bg-white/15 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
          >
            <span className="transition-colors duration-200 group-hover:text-[#4ade80] group-focus-within:text-[#4ade80]">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
          </a>
        </div>

        {/* Media Sosial Lainnya */}
        {otherSocials.map((item) => (
          <div key={item.name} className="relative group flex items-center justify-center">
            {/* Tooltip Melayang di Kiri Tombol */}
            <div data-ui="tooltip" className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-[#081726]/95 border border-white/15 text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 shadow-lg">
              {item.name}
            </div>

            {/* Tombol Tautan Icon */}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka akun ${item.name} SDN Jatipulo 07`}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/85 hover:bg-white/15 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
            >
              <span className={`transition-colors duration-200 ${item.hoverIconColor}`}>
                {item.icon}
              </span>
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
}
