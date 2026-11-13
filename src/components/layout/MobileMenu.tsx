'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isLightMode?: boolean;
}

/**
 * Komponen Menu Navigasi Mobile (Client Component)
 * Menggunakan Palet Royal Academic Navy & Logo Resmi, dirender via Portal
 * ke document.body agar selalu menutupi layar penuh secara utuh.
 */
export default function MobileMenu({ isLightMode = false }: MobileMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [kesiswaanOpen, setKesiswaanOpen] = useState(false);

  // Tutup drawer saat berpindah halaman
  useLayoutEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, [pathname]);

  // Kunci scroll body & dukung tombol Escape saat menu mobile terbuka
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setKesiswaanOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const openOrToggleMenu = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && pathname.startsWith('/kesiswaan')) {
        setKesiswaanOpen(true);
      }
      return next;
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
    setKesiswaanOpen(false);
  };

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isKesiswaanActive = pathname.startsWith('/kesiswaan');

  const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '/profil' },
    { label: 'Guru & Staf', href: '/guru-dan-staf' },
    { label: 'Fasilitas', href: '/sarana-prasarana' },
  ];

  const bottomNavItems = [
    { label: 'Berita', href: '/berita' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Kontak', href: '/hubungi-kami' },
  ];

  const kesiswaanItems = [
    { label: 'Program Rutin', href: '/kesiswaan/program-rutin' },
    { label: 'Ekstrakurikuler', href: '/kesiswaan/ekstrakurikuler' },
    { label: 'Prestasi', href: '/kesiswaan/prestasi' },
  ];

  const drawer =
    isOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi utama"
            className="fixed inset-0 z-[100] flex flex-col bg-[#081726]/98 backdrop-blur-xl"
          >
            {/* Header Panel Mobile */}
            <div className="flex items-center justify-between px-6 h-[76px] sm:h-[84px] border-b border-white/10 shrink-0">
              <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/logo/logo.webp"
                    alt="Logo SDN Jatipulo 07"
                    width={36}
                    height={34}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-heading font-bold text-white tracking-wide text-base">
                  SDN Jatipulo 07
                </span>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                aria-label="Tutup menu"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigasi Links */}
            <nav
              aria-label="Navigasi Mobile"
              className="flex-1 overflow-y-auto px-6 py-5 space-y-1"
            >
              {navItems.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between py-3 text-lg border-b border-white/5 transition-colors ${
                      active
                        ? 'font-semibold text-[#7dd3fc]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />}
                  </Link>
                );
              })}

              {/* Submenu Kesiswaan */}
              <div className="border-b border-white/5">
                <button
                  type="button"
                  onClick={() => setKesiswaanOpen((prev) => !prev)}
                  aria-expanded={kesiswaanOpen}
                  className={`w-full flex items-center justify-between py-3 text-lg transition-colors cursor-pointer ${
                    isKesiswaanActive
                      ? 'font-semibold text-[#7dd3fc]'
                      : 'text-white/90 hover:text-white'
                  }`}
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
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {kesiswaanOpen && (
                  <div className="pl-4 pb-3 space-y-1.5 border-l border-white/15 ml-2 mt-1">
                    {kesiswaanItems.map((sub) => {
                      const subActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMenu}
                          aria-current={subActive ? 'page' : undefined}
                          className={`flex items-center justify-between py-2 text-base transition-colors ${
                            subActive
                              ? 'text-[#7dd3fc] font-semibold'
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {subActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {bottomNavItems.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between py-3 text-lg border-b border-white/5 transition-colors ${
                      active
                        ? 'font-semibold text-[#7dd3fc]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />}
                  </Link>
                );
              })}

              {/* Tombol CTA Archiva di Menu Mobile */}
              <div className="pt-6 pb-4">
                <Link
                  href="/archiva/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#163d63] hover:bg-[#1d4e78] text-white border border-[#7dd3fc]/35 py-3.5 px-6 rounded-full font-medium text-base shadow-lg transition-colors"
                >
                  <span>Portal Archiva</span>
                  <svg
                    className="w-4 h-4 text-[#bae6fd]"
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
              </div>
            </nav>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="mobile-nav relative z-20 shrink-0">
      {/* Tombol Hamburger (Minimum 44x44px tap target, responsif sentuh instan) */}
      <button
        type="button"
        onClick={openOrToggleMenu}
        className={`relative z-20 touch-manipulation select-none w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${
          isLightMode
            ? 'bg-gray-100 hover:bg-gray-200 border-gray-300/80 text-gray-800'
            : 'bg-white/15 hover:bg-white/25 border-white/25 text-white'
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

      {drawer}
    </div>
  );
}
