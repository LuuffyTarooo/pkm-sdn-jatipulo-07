'use client';

import React, { useState, useMemo } from 'react';
import { Guru, KategoriGuru } from '@/types';
import GuruCard from '@/components/cards/GuruCard';

interface GuruDirectoryProps {
  initialGuru: Guru[];
}

type TabType = 'all' | KategoriGuru;

interface TabConfig {
  id: TabType;
  label: string;
}

const TABS: TabConfig[] = [
  { id: 'all', label: 'Semua Guru & Staf' },
  { id: 'pimpinan', label: 'Pimpinan' },
  { id: 'guru-kelas', label: 'Guru Kelas' },
  { id: 'guru-mapel', label: 'Guru Mapel' },
  { id: 'staf', label: 'Tenaga Kependidikan' },
];

/**
 * Komponen Interaktif Direktori Guru & Tenaga Kependidikan (Client Component)
 * Mengadopsi prinsip desain responsif, rapi, dan fungsional:
 * - Navigasi kategori dan pencarian langsung yang responsif
 * - Hitungan badge kategori per-tab yang akurat
 * - Spotlight pimpinan sekolah yang menonjol dan berwibawa
 * - Tata letak grid kartu potret yang proporsional dan sejajar
 */
export default function GuruDirectory({ initialGuru }: GuruDirectoryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter daftar guru berdasarkan tab dan search query
  const filteredGuru = useMemo(() => {
    return initialGuru.filter((guru) => {
      // 1. Filter Kategori
      if (activeTab !== 'all' && guru.kategori !== activeTab) {
        return false;
      }

      // 2. Filter Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchNama = guru.nama.toLowerCase().includes(query);
        const matchJabatan = guru.jabatan.toLowerCase().includes(query);
        const matchMapel = guru.mataPelajaran?.toLowerCase().includes(query) ?? false;
        const matchKelas = guru.kelasDiampu?.toLowerCase().includes(query) ?? false;
        const matchNip = guru.nip?.replace(/\s/g, '').includes(query.replace(/\s/g, '')) ?? false;

        return matchNama || matchJabatan || matchMapel || matchKelas || matchNip;
      }

      return true;
    });
  }, [initialGuru, activeTab, searchQuery]);

  // Pisahkan Kepala Sekolah jika ada di tab pimpinan atau all
  const kepalaSekolah = useMemo(() => {
    if (activeTab === 'all' || activeTab === 'pimpinan') {
      return filteredGuru.find((g) => g.kategori === 'pimpinan');
    }
    return null;
  }, [filteredGuru, activeTab]);

  // Daftar kartu guru reguler
  const regularGuru = useMemo(() => {
    if (kepalaSekolah) {
      return filteredGuru.filter((g) => g.id !== kepalaSekolah.id);
    }
    return filteredGuru;
  }, [filteredGuru, kepalaSekolah]);

  const handleReset = () => {
    setActiveTab('all');
    setSearchQuery('');
  };

  const isFiltered = activeTab !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* Kontrol Utama: Pencarian & Filter Kategori */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Input Pencarian */}
          <div className="relative flex-1 max-w-lg">
            <label htmlFor="search-guru" className="sr-only">
              Cari nama guru, mata pelajaran, kelas, atau jabatan
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              id="search-guru"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama guru, mata pelajaran, kelas, atau jabatan..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0f2d4a] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus kata kunci pencarian"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 focus:outline-none cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Indikator Hasil Pencarian */}
          <div className="flex items-center gap-3">
            <div className="text-xs sm:text-sm text-neutral-600 font-sans">
              Menampilkan <span className="font-bold text-[#0f2d4a]">{filteredGuru.length}</span> dari{' '}
              <span className="font-semibold text-neutral-800">{initialGuru.length}</span> pendidik &amp; staf
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-[#1d4e78] hover:text-[#0f2d4a] underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Tab Filter Kategori */}
        <div
          role="tablist"
          aria-label="Filter kategori pendidik"
          className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2d4a] ${
                  isActive
                    ? 'bg-[#0f2d4a] text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Spotlight: Kepala Sekolah */}
      {kepalaSekolah && (
        <section aria-labelledby="featured-kepsek-heading" className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#1d4e78] rounded-full" />
            <h2 id="featured-kepsek-heading" className="font-heading text-lg sm:text-xl font-bold text-[#0f2d4a]">
              Pimpinan Satuan Pendidikan
            </h2>
          </div>
          <GuruCard guru={kepalaSekolah} isFeatured={true} />
        </section>
      )}

      {/* Grid Kartu Guru & Staf Reguler */}
      {regularGuru.length > 0 && (
        <section aria-labelledby="dewan-guru-heading" className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#1d4e78] rounded-full" />
            <h2 id="dewan-guru-heading" className="font-heading text-lg sm:text-xl font-bold text-[#0f2d4a]">
              {activeTab === 'all'
                ? 'Dewan Guru & Tenaga Kependidikan'
                : TABS.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {regularGuru.map((guru) => (
              <GuruCard key={guru.id} guru={guru} />
            ))}
          </div>
        </section>
      )}

      {/* State Jika Pencarian Kosong */}
      {filteredGuru.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-14 text-center max-w-md mx-auto shadow-xs">
          <h3 className="font-heading text-lg font-bold text-neutral-900 mb-1">
            Data Tidak Ditemukan
          </h3>
          <p className="text-sm text-neutral-600 mb-6 leading-relaxed font-sans">
            Tidak ada guru atau staf yang cocok dengan kriteria kata kunci &ldquo;<span className="text-neutral-900 font-semibold">{searchQuery}</span>&rdquo;.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2d4a] hover:bg-[#1d4e78] text-white font-bold text-sm transition-colors cursor-pointer shadow-xs"
          >
            <span>Reset Pencarian</span>
          </button>
        </div>
      )}
    </div>
  );
}
