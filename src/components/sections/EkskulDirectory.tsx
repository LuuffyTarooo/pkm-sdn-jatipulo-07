'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Ekskul, KategoriEkskul } from '@/types';
import EkskulCard from '@/components/cards/EkskulCard';

interface EkskulDirectoryProps {
  initialEkskul: Ekskul[];
}

type TabType = 'all' | KategoriEkskul;

interface TabConfig {
  id: TabType;
  label: string;
}

const TABS: TabConfig[] = [
  { id: 'all', label: 'Semua Program' },
  { id: 'Wajib', label: 'Wajib & Kepemimpinan' },
  { id: 'Olahraga', label: 'Olahraga' },
  { id: 'Bela Diri', label: 'Bela Diri' },
  { id: 'Seni & Budaya', label: 'Seni & Budaya' },
  { id: 'Keagamaan', label: 'Keagamaan' },
];

export default function EkskulDirectory({ initialEkskul }: EkskulDirectoryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  // Filter daftar ekskul berdasarkan tab kategori
  const filteredEkskul = useMemo(() => {
    if (activeTab === 'all') {
      return initialEkskul;
    }
    return initialEkskul.filter((item) => item.kategori === activeTab);
  }, [initialEkskul, activeTab]);

  return (
    <div className="space-y-8 sm:space-y-10">
      
      {/* Tab Filter Kategori */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter kategori ekstrakurikuler">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0f2d4a] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:bg-[#eff6ff] hover:text-[#0f2d4a] border border-gray-200/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-neutral-500 font-sans">
          Menampilkan <span className="font-bold text-[#0f2d4a]">{filteredEkskul.length}</span> kegiatan
        </div>
      </div>

      {/* Grid Kartu Ekstrakurikuler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredEkskul.map((ekskul) => (
          <EkskulCard key={ekskul.id} ekskul={ekskul} />
        ))}
      </div>

      {/* Kotak Panduan & Ketentuan Partisipasi Ekstrakurikuler */}
      <section
        aria-labelledby="ketentuan-heading"
        className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs"
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[2.5px] bg-[#0f2d4a] rounded-full" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0f2d4a] font-sans">
              INFORMASI &amp; KETENTUAN
            </span>
          </div>

          <h3
            id="ketentuan-heading"
            className="font-heading font-extrabold text-xl sm:text-2xl text-[#0f2d4a] tracking-tight leading-snug mb-3"
          >
            Ketentuan Partisipasi Kegiatan Ekstrakurikuler
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong>Ekskul Wajib Pramuka:</strong> Wajib diikuti oleh seluruh peserta didik dari kelas 1 sampai kelas 6 guna membentuk kedisiplinan dan karakter dasar kepanduan.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong>Batas Pilihan Ekskul:</strong> Setiap peserta didik dianjurkan memilih maksimal <strong>2 kegiatan pilihan</strong> agar waktu istirahat dan capaian belajar akademik tetap terjaga secara seimbang.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#eff6ff] text-[#0f2d4a] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </span>
              <p>
                <strong>Fasilitas &amp; Perlengkapan:</strong> Pembinaan didampingi oleh pelatih bersertifikasi dan dewan guru pembina tanpa dipungut biaya operasional bulanan sekolah.
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-gray-100 flex flex-wrap items-center gap-3">
            <Link
              href="/hubungi-kami"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2d4a] hover:bg-[#163d63] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <span>Konsultasi &amp; Tanya Koordinator Ekskul</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <Link
              href="/kesiswaan/prestasi"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Lihat Rekam Jejak Prestasi Siswa</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
