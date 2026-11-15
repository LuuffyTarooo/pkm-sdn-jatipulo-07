'use client';

import React from 'react';
import Link from 'next/link';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title: string;
}

export default function AdminHeader({ onToggleSidebar, title }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white border-b border-slate-200/90 px-4 sm:px-8 flex items-center justify-between font-sans shadow-2xs">
      {/* Sisi Kiri: Hamburger & Judul */}
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-[#0f2d4a] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          aria-label="Buka menu navigasi"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-xl text-[#0f2d4a] leading-tight">
            {title}
          </h1>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Panel Pengelolaan Konten SDN Jatipulo 07
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Status Database & Profil Admin */}
      <div className="flex items-center gap-3">
        {/* Indikator Status Database */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SQLite Aktif</span>
        </div>

        {/* Profil Admin Pill */}
        <Link
          href="/admin/pengaturan"
          className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#eff6ff] hover:text-[#0f2d4a] transition-colors border border-slate-200/80 text-xs font-semibold text-slate-700"
        >
          <div className="w-6 h-6 rounded-full bg-[#0f2d4a] text-white flex items-center justify-center text-[11px] font-bold">
            A
          </div>
          <span className="hidden sm:inline">Admin Sekolah</span>
        </Link>
      </div>
    </header>
  );
}
