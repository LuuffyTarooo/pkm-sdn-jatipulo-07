'use client';

import React from 'react';
import { dataSekolah } from '@/data/sekolah';

/**
 * Komponen Floating Shortcut Media Sosial di Sisi Kanan Layar
 * Sesuai referensi pengguna:
 * - Posisi melayang di sisi kanan (fixed right-0 top-1/2 -translate-y-1/2)
 * - Kontainer rounded pill putih dengan shadow lembut dan border halus
 * - Berisi shortcut: WhatsApp, Instagram, Facebook, YouTube, dan TikTok
 * - Tooltip nama platform interaktif muncul di sebelah kiri icon saat hover
 */
export default function SocialSidebar() {
  const rawWa = dataSekolah.kontak.whatsapp || '081298765432';
  const cleanWa = rawWa.replace(/\D/g, '').replace(/^0/, '62');
  const whatsappUrl = `https://wa.me/${cleanWa}?text=Halo%20Admin%20SDN%20Jatipulo%2007,%20saya%20ingin%20bertanya%20mengenai...`;

  const getUrl = (platform: string) => {
    const found = dataSekolah.mediaSosial.find((m) => m.platform === platform);
    return found ? found.url : '#';
  };

  const socials = [
    {
      name: 'WhatsApp',
      href: whatsappUrl,
      bgColor: 'hover:bg-[#25D366]/15',
      icon: (
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-[#25D366]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: getUrl('instagram'),
      bgColor: 'hover:bg-[#E1306C]/15',
      icon: (
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#E1306C]"
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
      bgColor: 'hover:bg-[#1877F2]/15',
      icon: (
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-[#1877F2]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: getUrl('youtube'),
      bgColor: 'hover:bg-[#FF0000]/15',
      icon: (
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#FF0000"
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
          />
          <polygon fill="#FFFFFF" points="9.6,15.5 15.8,12 9.6,8.5" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: getUrl('tiktok'),
      bgColor: 'hover:bg-black/10',
      icon: (
        <svg
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-[#0F172A]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      aria-label="Shortcut Media Sosial Sekolah"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-l-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-r-0 border-gray-200/80 py-2.5 sm:py-3 px-1 sm:px-1.5 flex flex-col items-center gap-2 sm:gap-2.5">
        {socials.map((item) => (
          <div key={item.name} className="relative group flex items-center justify-center">
            {/* Tooltip Melayang di Kiri Tombol */}
            <div className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-gray-900 text-white text-[11px] font-medium tracking-wide whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
              {item.name}
              {/* Panah tooltip ke kanan */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-full border-4 border-transparent border-l-gray-900"
                aria-hidden="true"
              />
            </div>

            {/* Tombol Tautan Icon */}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka akun ${item.name} SDN Jatipulo 07`}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${item.bgColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]`}
            >
              {item.icon}
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
}
