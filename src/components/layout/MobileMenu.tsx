'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MobileMenuProps {
  isLightMode?: boolean;
}

/**
 * Komponen Menu Navigasi Mobile (Client Component)
 * Menggunakan Palet Emerald Academy & Logo Resmi
 */
export default function MobileMenu({ isLightMode = false }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [kesiswaanOpen, setKesiswaanOpen] = useState(false);

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setKesiswaanOpen(false);
  };

  return (
    <div className="mobile-nav">
      {/* Tombol Hamburger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] ${
          isLightMode
            ? 'bg-gray-100 hover:bg-gray-200 border-gray-300/80 text-gray-800'
            : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
        }`}
        aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        aria-expanded={isOpen}
      >
        <span
          className={`block w-5 h-0.5 transition-transform duration-300 ${
            isLightMode ? 'bg-gray-800' : 'bg-white'
          } ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`block w-5 h-0.5 transition-opacity duration-300 ${
            isLightMode ? 'bg-gray-800' : 'bg-white'
          } ${isOpen ? 'opacity-0' : 'opacity-100'}`}
        />
        <span
          className={`block w-5 h-0.5 transition-transform duration-300 ${
            isLightMode ? 'bg-gray-800' : 'bg-white'
          } ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </button>

      {/* Overlay & Panel Drawer Menu Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#022c22]/98 backdrop-blur-xl animate-in fade-in duration-200">
          {/* Header Panel Mobile */}
          <div className="flex items-center justify-between px-6 h-[90px] border-b border-white/10">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo/favicon.ico"
                  alt="Logo SDN Jatipulo 07"
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-semibold text-white tracking-wide text-base">
                SDN Jatipulo 07
              </span>
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Tutup menu"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="6" />
              </svg>
            </button>
          </div>

          {/* Navigasi Links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center justify-between py-3 text-lg font-medium text-[#34d399] border-b border-white/5"
            >
              <span>Beranda</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            </Link>

            <Link
              href="/profil"
              onClick={closeMenu}
              className="block py-3 text-lg text-white/90 hover:text-white border-b border-white/5 transition-colors"
            >
              Profil
            </Link>

            <Link
              href="/guru-dan-staf"
              onClick={closeMenu}
              className="block py-3 text-lg text-white/90 hover:text-white border-b border-white/5 transition-colors"
            >
              Guru &amp; Staf
            </Link>

            <Link
              href="/sarana-prasarana"
              onClick={closeMenu}
              className="block py-3 text-lg text-white/90 hover:text-white border-b border-white/5 transition-colors"
            >
              Fasilitas
            </Link>

            {/* Submenu Kesiswaan */}
            <div className="border-b border-white/5">
              <button
                type="button"
                onClick={() => setKesiswaanOpen(!kesiswaanOpen)}
                className="w-full flex items-center justify-between py-3 text-lg text-white/90 hover:text-white transition-colors"
              >
                <span>Kesiswaan</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    kesiswaanOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {kesiswaanOpen && (
                <div className="pl-4 pb-3 space-y-2 border-l border-white/10 ml-2 mt-1">
                  <Link
                    href="/kesiswaan/program-rutin"
                    onClick={closeMenu}
                    className="block py-1.5 text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Program Rutin
                  </Link>
                  <Link
                    href="/kesiswaan/ekstrakurikuler"
                    onClick={closeMenu}
                    className="block py-1.5 text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Ekstrakurikuler
                  </Link>
                  <Link
                    href="/kesiswaan/prestasi"
                    onClick={closeMenu}
                    className="block py-1.5 text-base text-gray-300 hover:text-white transition-colors"
                  >
                    Prestasi
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/berita"
              onClick={closeMenu}
              className="block py-3 text-lg text-white/90 hover:text-white border-b border-white/5 transition-colors"
            >
              Berita
            </Link>

            <Link
              href="/galeri"
              onClick={closeMenu}
              className="block py-3 text-lg text-white/90 hover:text-white border-b border-white/5 transition-colors"
            >
              Galeri
            </Link>

            <Link
              href="/hubungi-kami"
              onClick={closeMenu}
              className="block py-3 text-lg text-white/90 hover:text-white border-b border-white/5 transition-colors"
            >
              Kontak
            </Link>

            {/* Tombol CTA Archiva di Menu Mobile */}
            <div className="pt-6">
              <Link
                href="/archiva/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white border border-[#34d399]/40 py-3.5 px-6 rounded-full font-medium text-base shadow-lg transition-colors"
              >
                <span>Portal Archiva</span>
                <svg
                  className="w-4 h-4 text-[#a7f3d0]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
