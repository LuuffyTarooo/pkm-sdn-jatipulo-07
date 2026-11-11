'use client';

import React, { Suspense, useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

/**
 * Komponen Internal Navigasi Header
 * Desain Royal Academic Navy Glass:
 * - Di pucuk atas Beranda maupun Sub-halaman (di atas foto HeroBanner): transparan penuh dengan scrim atas halus
 * - Saat di-scroll melewati foto: Smoked Midnight Navy Glass (bg-[#0b182a]/85 + backdrop-blur-md)
 *   agar teks putih & tombol menu garis 3 selalu kontras tajam (WCAG AAA) di atas latar putih
 * - Responsif penuh di layar HP sempit (320px+) tanpa memotong tombol hamburger di sisi kanan
 */
function HeaderNav() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isKesiswaanOpen, setIsKesiswaanOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getScrollTop = () =>
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      window.visualViewport?.pageTop ||
      0;

    const handleScroll = () => {
      setIsScrolled(getScrollTop() > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    const vv = window.visualViewport;
    vv?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll, true);
      vv?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Tutup dropdown saat berpindah rute (kompatibel dengan Next.js 16 Cache Components <Activity>)
  useLayoutEffect(() => {
    return () => {
      setIsKesiswaanOpen(false);
    };
  }, [pathname]);

  // Tutup dropdown saat klik di luar atau menekan tombol Escape
  useEffect(() => {
    if (!isKesiswaanOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsKesiswaanOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsKesiswaanOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isKesiswaanOpen]);

  // Hanya halaman Beranda (/) yang transparan saat di pucuk atas banner hero.
  // Sub-halaman (Profil hingga Kontak) SELALU solid penuh tanpa efek transparan.
  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && !isScrolled;
  // Glass hanya di beranda saat scroll; sub-halaman selalu solid penuh
  const isGlass = isHomePage && isScrolled;

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isKesiswaanActive = pathname.startsWith('/kesiswaan');

  const navLinkClass = (href: string) =>
    `relative py-1 transition-colors duration-200 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${
      isLinkActive(href)
        ? "text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#7dd3fc] after:rounded-full"
        : 'text-white/85 hover:text-white'
    }`;

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-[height] duration-300 flex items-center px-4 sm:px-[5vw] ${
        isTransparent ? 'h-[76px] sm:h-[88px]' : 'h-[68px] sm:h-[76px]'
      }`}
    >
      {/* Lapisan latar & blur dipisah dari <header> agar tidak menjebak drawer fixed */}
      {/* taste-skill-ignore: sticky navigation bar — shadow, border, blur adalah intentional untuk nav */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-0 pointer-events-none transition-[background-color,opacity] duration-300 ${
          isTransparent
            ? 'bg-gradient-to-b from-black/48 to-transparent border-b border-transparent' /* taste-skill-ignore: cinematic scrim over hero banner */
            : isGlass
              ? 'bg-[#0b182a]/90 backdrop-blur-md shadow-[0_4px_18px_rgba(8,23,38,0.30)] border-b border-white/10' /* taste-skill-ignore: sticky nav glass — real overlay */
              : 'bg-[#0b182a] shadow-[0_2px_12px_rgba(8,23,38,0.35)] border-b border-white/10' /* taste-skill-ignore: sticky nav solid — real overlay */
        }`}
      />

      <div className="relative z-10 w-full flex items-center justify-between gap-2 min-w-0">
        {/* Kiri: Logo dan Nama Sekolah */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 min-w-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-lg py-1"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
            <Image
              src="/images/logo/logo.png"
              alt="Logo Resmi SDN Jatipulo 07 Jakarta"
              width={38}
              height={36}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>

          <span className="font-heading font-bold tracking-tight sm:tracking-wide text-sm sm:text-base lg:text-base xl:text-lg truncate text-white group-hover:text-[#bae6fd] transition-colors duration-200">
            SDN Jatipulo 07 Jakarta
          </span>
        </Link>

        {/* Tengah: Navigasi Desktop (Mulai dari layar laptop/tablet landscape lg: 1024px+) */}
        <nav
          className="hidden lg:flex items-center gap-3.5 xl:gap-7 text-[13px] xl:text-sm font-normal"
          aria-label="Navigasi Utama"
        >
          <Link href="/" className={navLinkClass('/')}>
            Beranda
          </Link>

          <Link href="/profil" className={navLinkClass('/profil')}>
            Profil
          </Link>

          <Link href="/guru-dan-staf" className={navLinkClass('/guru-dan-staf')}>
            Guru &amp; Staf
          </Link>

          <Link href="/sarana-prasarana" className={navLinkClass('/sarana-prasarana')}>
            Fasilitas
          </Link>

          {/* Kesiswaan (Dropdown dapat diakses via Klik/Tap, Hover, & Keyboard) */}
          <div
            ref={dropdownRef}
            className="relative py-2"
            onMouseEnter={() => setIsKesiswaanOpen(true)}
            onMouseLeave={() => setIsKesiswaanOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsKesiswaanOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 transition-colors py-1 px-1 rounded-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${
                isKesiswaanActive
                  ? 'text-white font-semibold'
                  : 'text-white/85 hover:text-white'
              }`}
              aria-haspopup="menu"
              aria-expanded={isKesiswaanOpen}
            >
              <span>Kesiswaan</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isKesiswaanOpen ? 'rotate-180 opacity-100' : 'opacity-75'
                }`}
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

            {/* Menu Dropdown Kesiswaan (Sedikit Transparan / Semi-Translucent) */}
            <div
              role="menu"
              className={`absolute top-full left-0 pt-1.5 transition-[opacity,transform] duration-200 ${
                isKesiswaanOpen
                  ? 'opacity-100 visible pointer-events-auto translate-y-0'
                  : 'opacity-0 invisible pointer-events-none -translate-y-1'
              }`}
            >
              <div
                data-ui="dropdown-menu"
                className="w-44 p-1.5 rounded-xl bg-[#0f2d4a] border border-white/20 text-white space-y-0.5 text-xs xl:text-[13px]"
              >
                <Link
                  href="/kesiswaan/program-rutin"
                  role="menuitem"
                  onClick={() => setIsKesiswaanOpen(false)}
                  className={`block px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${
                    pathname === '/kesiswaan/program-rutin'
                      ? 'text-[#7dd3fc] font-semibold bg-white/20'
                      : 'text-white/90 font-medium hover:text-white hover:bg-white/15'
                  }`}
                >
                  Program Rutin
                </Link>
                <Link
                  href="/kesiswaan/ekstrakurikuler"
                  role="menuitem"
                  onClick={() => setIsKesiswaanOpen(false)}
                  className={`block px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${
                    pathname === '/kesiswaan/ekstrakurikuler'
                      ? 'text-[#7dd3fc] font-semibold bg-white/20'
                      : 'text-white/90 font-medium hover:text-white hover:bg-white/15'
                  }`}
                >
                  Ekstrakurikuler
                </Link>
                <Link
                  href="/kesiswaan/prestasi"
                  role="menuitem"
                  onClick={() => setIsKesiswaanOpen(false)}
                  className={`block px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${
                    pathname === '/kesiswaan/prestasi'
                      ? 'text-[#7dd3fc] font-semibold bg-white/20'
                      : 'text-white/90 font-medium hover:text-white hover:bg-white/15'
                  }`}
                >
                  Prestasi
                </Link>
              </div>
            </div>
          </div>

          <Link href="/berita" className={navLinkClass('/berita')}>
            Berita
          </Link>

          <Link href="/galeri" className={navLinkClass('/galeri')}>
            Galeri
          </Link>

          <Link href="/hubungi-kami" className={navLinkClass('/hubungi-kami')}>
            Kontak
          </Link>
        </nav>

        {/* Kanan: Tombol Portal Archiva & Mobile Menu */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <Link
            href="/archiva/login"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-2 text-xs xl:text-sm font-medium px-3.5 py-2 xl:px-5 xl:py-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] text-white ${
              isTransparent
                ? 'bg-white/15 hover:bg-white/25 border border-white/35'
                : 'bg-[#163d63] hover:bg-[#1d4e78] border border-[#7dd3fc]/35'
            }`}
          >
            <span>Portal Archiva</span>
            <svg
              className={`w-3.5 h-3.5 ${isTransparent ? 'text-white/90' : 'text-[#bae6fd]'}`}
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

          {/* Hamburger Mobile Menu (Khusus layar < 1024px seperti HP & tablet potret) */}
          <div className="lg:hidden shrink-0">
            <MobileMenu isLightMode={false} />
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Fallback statis saat SSR / Prerendering (transparan di atas foto banner tanpa layout shift)
 */
function HeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-[68px] sm:h-[76px] flex items-center px-4 sm:px-[5vw]"
      style={{ viewTransitionName: 'site-header' }}>
      <div
        aria-hidden="true"
        data-ui="sticky-nav-backdrop" className="absolute inset-0 z-0 pointer-events-none bg-[#0b182a]" /* taste-skill-ignore: SSR nav fallback */
      />
      <div className="relative z-10 w-full flex items-center justify-between gap-2 min-w-0">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
            <Image
              src="/images/logo/logo.png"
              alt="Logo Resmi SDN Jatipulo 07 Jakarta"
              width={38}
              height={36}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
          <span className="font-heading font-bold text-white tracking-tight sm:tracking-wide text-sm sm:text-base lg:text-lg truncate">
            SDN Jatipulo 07 Jakarta
          </span>
        </Link>
        <div
          aria-hidden="true"
          className="lg:hidden shrink-0 w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl border bg-white/15 border-white/25"
        >
          <span className="block w-5 h-0.5 bg-white" />
          <span className="block w-5 h-0.5 bg-white" />
          <span className="block w-5 h-0.5 bg-white" />
        </div>
      </div>
    </header>
  );
}

/**
 * Komponen Header Utama dengan Suspense Boundary
 * Mencegah blocking prerendering client hook di Next.js 16 Cache Components
 */
export default function Header() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <HeaderNav />
    </Suspense>
  );
}

