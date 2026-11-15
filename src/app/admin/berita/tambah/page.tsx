'use client';

import React from 'react';
import Link from 'next/link';
import BeritaForm from '@/components/admin/BeritaForm';

export default function TambahBeritaPage() {
  return (
    <div className="space-y-6 font-sans pb-16">
      {/* Header & Tombol Kembali */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/berita"
          className="p-2 rounded-xl text-slate-500 hover:text-[#0f2d4a] hover:bg-slate-100 transition-colors"
          title="Kembali ke Daftar Berita"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0f2d4a]">
            Tulis Berita Baru
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Lengkapi formulir di bawah ini untuk mempublikasikan berita atau pengumuman ke website.
          </p>
        </div>
      </div>

      {/* Form Tambah */}
      <BeritaForm />
    </div>
  );
}
