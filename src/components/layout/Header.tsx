'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

/**
 * Komponen Internal Navigasi Header
 * Mendeteksi scroll dan rute aktif
 */
function HeaderNav() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mode transparan hanya aktif di Beranda dan belum di-scroll
  const isTransparent = isHomePage && !isScrolled;

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isKesiswaanActive = pathname.startsWith('/kesiswaan');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 flex items-center px-[5vw] ${
        isTransparent
          ? 'h-[85px] sm:h-[90px] bg-transparent border-b border-transparent'
          : 'h-[72px] sm:h-[76px] bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-200/80'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Kiri: Logo dan Nama Sekolah */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] rounded-lg py-1"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
            <Image
              src="/images/logo/favicon.ico"
              alt="Logo Resmi SDN Jatipulo 07 Jakarta"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <span
            className={`font-heading font-bold tracking-wide text-base lg:text-lg whitespace-nowrap transition-colors duration-300 ${
              isTransparent ? 'text-white' : 'text-slate-900 group-hover:text-[#064e3b]'
            }`}
          >
            SDN Jatipulo 07 Jakarta
          </span>
        </Link>

        {/* Tengah: Navigasi Desktop */}
        <nav
          className="hidden xl:flex items-center gap-7 text-sm font-normal"
          aria-label="Navigasi Utama"
        >
          {/* Beranda */}
          <Link
            href="/"
            className={`relative py-1 transition-colors duration-200 ${
              isLinkActive('/')
                ? isTransparent
                  ? 'text-white font-medium after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                  : 'text-[#15803d] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                : isTransparent
                ? 'text-white/85 hover:text-white'
                : 'text-gray-700 hover:text-[#15803d]'
            }`}
          >
            Beranda
          </Link>

          {/* Profil */}
          <Link
            href="/profil"
            className={`relative py-1 transition-colors duration-200 ${
              isLinkActive('/profil')
                ? isTransparent
                  ? 'text-white font-medium after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                  : 'text-[#15803d] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                : isTransparent
                ? 'text-white/85 hover:text-white'
                : 'text-gray-700 hover:text-[#15803d]'
            }`}
          >
            Profil
          </Link>

          {/* Guru & Staf */}
          <Link
            href="/guru-dan-staf"
            className={`relative py-1 transition-colors duration-200 ${
              isLinkActive('/guru-dan-staf')
                ? isTransparent
                  ? 'text-white font-medium after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                  : 'text-[#15803d] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                : isTransparent
                ? 'text-white/85 hover:text-white'
                : 'text-gray-700 hover:text-[#15803d]'
            }`}
          >
            Guru &amp; Staf
          </Link>

          {/* Sarana & Prasarana */}
          <Link
            href="/sarana-prasarana"
            className={`relative py-1 transition-colors duration-200 ${
              isLinkActive('/sarana-prasarana')
                ? isTransparent
                  ? 'text-white font-medium after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                  : 'text-[#15803d] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                : isTransparent
                ? 'text-white/85 hover:text-white'
                : 'text-gray-700 hover:text-[#15803d]'
            }`}
          >
            Fasilitas
          </Link>

          {/* Kesiswaan (Dropdown) */}
          <div className="relative group py-2">
            <button
              type="button"
              className={`flex items-center gap-1.5 transition-colors py-1 cursor-pointer focus:outline-none ${
                isKesiswaanActive
                  ? isTransparent
                    ? 'text-white font-medium'
                    : 'text-[#15803d] font-bold'
                  : isTransparent
                  ? 'text-white/85 group-hover:text-white'
                  : 'text-gray-700 group-hover:text-[#15803d]'
              }`}
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>Kesiswaan</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-75 group-hover:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Menu Dropdown Kesiswaan */}
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
              <div
                className={`w-52 py-2 rounded-xl shadow-xl text-sm border transition-colors ${
                  isTransparent
                    ? 'bg-[#051124]/95 backdrop-blur-md border-white/10 text-white'
                    : 'bg-white border-gray-100 text-gray-800'
                }`}
              >
                <Link
                  href="/kesiswaan/program-rutin"
                  className={`block px-4 py-2.5 transition-colors ${
                    isTransparent
                      ? 'text-white/85 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-[#15803d] hover:bg-[#f0fdf4]'
                  }`}
                >
                  Program Rutin
                </Link>
                <Link
                  href="/kesiswaan/ekstrakurikuler"
                  className={`block px-4 py-2.5 transition-colors ${
                    isTransparent
                      ? 'text-white/85 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-[#15803d] hover:bg-[#f0fdf4]'
                  }`}
                >
                  Ekstrakurikuler
                </Link>
                <Link
                  href="/kesiswaan/prestasi"
                  className={`block px-4 py-2.5 transition-colors ${
                    isTransparent
                      ? 'text-white/85 hover:text-white hover:bg-white/10'
                      : 'text-gray-700 hover:text-[#15803d] hover:bg-[#f0fdf4]'
                  }`}
                >
                  Prestasi
                </Link>
              </div>
            </div>
          </div>

          {/* Berita */}
          <Link
            href="/berita"
            className={`relative py-1 transition-colors duration-200 ${
              isLinkActive('/berita')
                ? isTransparent
                  ? 'text-white font-medium after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                  : 'text-[#15803d] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                : isTransparent
                ? 'text-white/85 hover:text-white'
                : 'text-gray-700 hover:text-[#15803d]'
            }`}
          >
            Berita
          </Link>

          {/* Galeri */}
          <Link
            href="/galeri"
            className={`relative py-1 transition-colors duration-200 ${
              isLinkActive('/galeri')
                ? isTransparent
                  ? 'text-white font-medium after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                  : 'text-[#15803d] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                : isTransparent
                ? 'text-white/85 hover:text-white'
                : 'text-gray-700 hover:text-[#15803d]'
            }`}
          >
            Galeri
          </Link>

          {/* Kontak */}
          <Link
            href="/hubungi-kami"
            className={`relative py-1 transition-colors duration-200 ${
              isLinkActive('/hubungi-kami')
                ? isTransparent
                  ? 'text-white font-medium after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                  : 'text-[#15803d] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#22c55e] after:rounded-full'
                : isTransparent
                ? 'text-white/85 hover:text-white'
                : 'text-gray-700 hover:text-[#15803d]'
            }`}
          >
            Kontak
          </Link>
        </nav>

        {/* Kanan: Tombol Portal Archiva & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/archiva/login"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] ${
              isTransparent
                ? 'bg-[#15803d] hover:bg-[#166534] text-white border border-[#22c55e]/40'
                : 'bg-[#15803d] hover:bg-[#166534] text-white'
            }`}
          >
            <span>Portal Archiva</span>
            <svg
              className="w-3.5 h-3.5 text-[#86efac]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </Link>

          {/* Hamburger Mobile Menu */}
          <div className="xl:hidden">
            <MobileMenu isLightMode={!isTransparent} />
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Fallback statis saat SSR / Prerendering
 */
function HeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-[72px] sm:h-[76px] bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-200/80 flex items-center px-[5vw]">
      <div className="w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
            <Image
              src="/images/logo/favicon.ico"
              alt="Logo Resmi SDN Jatipulo 07 Jakarta"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="font-heading font-bold text-slate-900 tracking-wide text-base lg:text-lg">
            SDN Jatipulo 07 Jakarta
          </span>
        </Link>
      </div>
    </header>
  );
}

/**
 * Komponen Header Utama dengan Suspense Boundary
 * Mencegah blocking prerendering client hook di Next.js
 */
export default function Header() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <HeaderNav />
    </Suspense>
  );
}
