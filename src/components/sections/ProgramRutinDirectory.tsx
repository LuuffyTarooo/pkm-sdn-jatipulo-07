'use client';

import React, { useState, useMemo } from 'react';
import { ProgramRutin } from '@/types';
import ProgramRutinCard from '@/components/cards/ProgramRutinCard';

interface ProgramRutinDirectoryProps {
  programs: ProgramRutin[];
}

export default function ProgramRutinDirectory({ programs }: ProgramRutinDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pencarian berdasarkan nama hari, nama kegiatan, atau rotasi kegiatan
  const filteredPrograms = useMemo(() => {
    if (!searchQuery.trim()) return programs;
    const q = searchQuery.toLowerCase().trim();

    return programs.filter((p) => {
      const matchHari = p.hari.toLowerCase().includes(q);
      const matchNama = p.nama.toLowerCase().includes(q);
      const matchDeskripsi = p.deskripsi?.toLowerCase().includes(q);
      const matchRotasi = p.rotasi.some(
        (r) =>
          r.judul.toLowerCase().includes(q) ||
          r.fokus?.toLowerCase().includes(q) ||
          r.deskripsi?.toLowerCase().includes(q)
      );

      return matchHari || matchNama || matchDeskripsi || matchRotasi;
    });
  }, [programs, searchQuery]);

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* 1. HIGHLIGHT STATS BAR (UI/UX Pro Max Pattern) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(15,45,74,0.04)] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-heading font-bold text-[#0f2d4a]">5 Hari</div>
            <div className="text-xs text-slate-500 font-medium">Senin s.d. Jumat</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(15,45,74,0.04)] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-heading font-bold text-[#0f2d4a]">4 Siklus</div>
            <div className="text-xs text-slate-500 font-medium">Rotasi Mingguan</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(15,45,74,0.04)] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-heading font-bold text-[#0f2d4a]">Pagi Hari</div>
            <div className="text-xs text-slate-500 font-medium">Sebelum KBM Efektif</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(15,45,74,0.04)] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-heading font-bold text-[#0f2d4a]">Karakter</div>
            <div className="text-xs text-slate-500 font-medium">Disiplin & Berakhlak</div>
          </div>
        </div>
      </div>

      {/* 2. PENCARIAN & KETERANGAN DIREKTORI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/80">
        <div>
          <h2 className="font-heading font-bold text-lg text-[#0f2d4a]">
            Jadwal Rutin Mingguan Sekolah
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Menampilkan seluruh program pembiasaan dari Senin sampai Jumat secara lengkap.
          </p>
        </div>

        {/* Input Pencarian Cepat */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kegiatan (mis: Upacara, Senam)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]/20 focus:border-[#0f2d4a] transition-all"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3. GRID UTAMA: TAMPILKAN SEMUA HARI SECARA LANGSUNG BERSAMAAN */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {filteredPrograms.map((program, idx) => (
            <ProgramRutinCard
              key={program.id}
              program={program}
              priority={idx < 3}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-800">
            Tidak ada kegiatan yang sesuai
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Coba gunakan kata kunci lain seperti &quot;Literasi&quot;, &quot;Dongeng&quot;, atau &quot;Jumat&quot;.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0f2d4a] text-white hover:bg-[#1d4e78] transition-colors"
          >
            Tampilkan Semua Kegiatan
          </button>
        </div>
      )}

      {/* 4. PANDUAN PELAKSANAAN PEMBIASAAN (EDUCATIONAL INFO BANNER) */}
      <section className="bg-gradient-to-br from-[#0f2d4a] via-[#143a5e] to-[#1d4e78] rounded-3xl text-white p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden">
        {/* Dekorasi Aksen Latar Belakang */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-emerald-300 border border-white/10 mb-4">
            Ketentuan & Tata Tertib
          </span>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-snug">
            Panduan Pembiasaan Siswa SDN Jatipulo 07 Jakarta
          </h3>
          <p className="text-sm text-white/80 mt-2 leading-relaxed">
            Untuk memastikan kegiatan pembiasaan berlangsung tertib dan bermakna, seluruh peserta didik diharapkan memperhatikan tata tertib berikut:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">Hadir Tepat Waktu</h4>
                <p className="text-[11px] text-white/75 mt-0.5">
                  Tiba di sekolah 15 menit sebelum pembiasaan dimulai pukul 06.45 WIB.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">Seragam & Perlengkapan</h4>
                <p className="text-[11px] text-white/75 mt-0.5">
                  Mengenakan seragam rapi dan membawa perlengkapan (buku literasi/alat ibadah).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">Budaya 5S</h4>
                <p className="text-[11px] text-white/75 mt-0.5">
                  Menerapkan Senyum, Sapa, Salam, Sopan, dan Santun kepada seluruh warga sekolah.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                4
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">Pendampingan Wali Kelas</h4>
                <p className="text-[11px] text-white/75 mt-0.5">
                  Setiap kegiatan didampingi secara aktif oleh wali kelas dan dewan guru pembina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
