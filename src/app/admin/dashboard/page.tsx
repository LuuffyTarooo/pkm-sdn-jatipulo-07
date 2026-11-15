'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalBerita: number;
  totalGaleri: number;
  totalPengumuman: number;
  beritaDraft: number;
}

interface BeritaItem {
  id: string;
  slug: string;
  judul: string;
  kategori: string;
  tanggal: string;
  status: 'draft' | 'published';
}

interface PengumumanItem {
  id: string;
  judul: string;
  tanggal: string;
  status: 'aktif' | 'tidak_aktif';
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBerita: 0,
    totalGaleri: 0,
    totalPengumuman: 0,
    beritaDraft: 0,
  });
  const [latestBerita, setLatestBerita] = useState<BeritaItem[]>([]);
  const [latestPengumuman, setLatestPengumuman] = useState<PengumumanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [resStats, resBerita, resPengumuman] = await Promise.all([
          fetch('/api/admin/stats').then((r) => r.json()),
          fetch('/api/admin/berita').then((r) => r.json()),
          fetch('/api/admin/pengumuman').then((r) => r.json()),
        ]);

        if (resStats.success) setStats(resStats.stats);
        if (resBerita.success) setLatestBerita(resBerita.data.slice(0, 5));
        if (resPengumuman.success) setLatestPengumuman(resPengumuman.data.slice(0, 5));
      } catch (err) {
        console.error('Gagal memuat data dashboard:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* 1. Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0f2d4a] to-[#163d63] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 pointer-events-none rounded-l-full transform translate-x-12" />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[#7dd3fc] text-xs font-semibold uppercase tracking-wider mb-2">
            Selamat Datang di Panel Pengelola
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
            Dashboard Administrasi SDN Jatipulo 07
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
            Kelola publikasi berita, dokumentasi galeri kegiatan, pengumuman sekolah, serta informasi profil lembaga secara terintegrasi dan aman.
          </p>
        </div>
      </div>

      {/* 2. Kartu Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Berita */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Berita</p>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] mt-1">
              {isLoading ? '...' : stats.totalBerita}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              {stats.beritaDraft} draf &bull; {stats.totalBerita - stats.beritaDraft} terbit
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#1d4e78] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
          </div>
        </div>

        {/* Total Galeri Foto */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Foto Galeri</p>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] mt-1">
              {isLoading ? '...' : stats.totalGaleri}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Dokumentasi aktif</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        </div>

        {/* Total Pengumuman */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pengumuman</p>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2d4a] mt-1">
              {isLoading ? '...' : stats.totalPengumuman}
            </h3>
            <p className="text-[11px] text-amber-600 font-medium mt-1">Pengumuman terdaftar</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 11 18-5v12L3 14v-3z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          </div>
        </div>

        {/* Status Database */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Penyimpanan</p>
            <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0f2d4a] mt-1">
              SQLite Node 24
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">Tersimpan permanen</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5V19A9 3 0 0 0 21 19V5" />
              <path d="M3 12A9 3 0 0 0 21 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Aksi Cepat / Shortcut Pengelolaan */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#0f2d4a] mb-4">
          Aksi Cepat Pengelolaan
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/admin/berita/tambah"
            className="p-4 rounded-2xl bg-[#eff6ff] hover:bg-[#dbeafe] text-[#0f2d4a] border border-[#bfdbfe]/60 transition-colors flex flex-col items-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#1d4e78] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold">Tulis Berita Baru</span>
          </Link>

          <Link
            href="/admin/galeri"
            className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 transition-colors flex flex-col items-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold">Unggah Foto Galeri</span>
          </Link>

          <Link
            href="/admin/pengumuman"
            className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 transition-colors flex flex-col items-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-amber-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 11 18-5v12L3 14v-3z" />
                <line x1="12" y1="5" x2="12" y2="19" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold">Buat Pengumuman</span>
          </Link>

          <Link
            href="/admin/profil"
            className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/80 transition-colors flex flex-col items-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-bold">Edit Profil Sekolah</span>
          </Link>
        </div>
      </div>

      {/* 4. Tabel Ringkasan Berita & Pengumuman */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Berita Terbaru */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#0f2d4a]">
                Berita Terakhir
              </h3>
              <Link href="/admin/berita" className="text-xs font-semibold text-[#1d4e78] hover:underline">
                Lihat Semua &rarr;
              </Link>
            </div>

            {latestBerita.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">Belum ada berita tersimpan.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {latestBerita.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                        {item.judul}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                        <span>{item.tanggal}</span>
                        <span>&bull;</span>
                        <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {item.kategori}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'published' ? 'Terbit' : 'Draf'}
                      </span>
                      <Link
                        href={`/admin/berita/edit/${item.id}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#0f2d4a] hover:bg-slate-100"
                        title="Edit Berita"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pengumuman Aktif */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-extrabold text-base text-[#0f2d4a]">
                Pengumuman Sekolah
              </h3>
              <Link href="/admin/pengumuman" className="text-xs font-semibold text-[#1d4e78] hover:underline">
                Lihat Semua &rarr;
              </Link>
            </div>

            {latestPengumuman.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">Belum ada pengumuman tersimpan.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {latestPengumuman.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                        {item.judul}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.tanggal}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                        item.status === 'aktif'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.status === 'aktif' ? 'Aktif' : 'Non-aktif'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
