'use client';

import React, { useState, useMemo } from 'react';
import { Guru } from '@/types';
import GuruCard from '@/components/cards/GuruCard';

interface GuruDirectoryProps {
  initialGuru: Guru[];
}

type TabKelas = 'all' | 'kelas-1' | 'kelas-2' | 'kelas-3' | 'kelas-4' | 'kelas-5' | 'kelas-6' | 'mapel';

interface TabItem {
  id: TabKelas;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'all', label: 'Semua' },
  { id: 'kelas-1', label: 'Kelas 1' },
  { id: 'kelas-2', label: 'Kelas 2' },
  { id: 'kelas-3', label: 'Kelas 3' },
  { id: 'kelas-4', label: 'Kelas 4' },
  { id: 'kelas-5', label: 'Kelas 5' },
  { id: 'kelas-6', label: 'Kelas 6' },
  { id: 'mapel', label: 'Guru Mapel' },
];

function matchesTab(guru: Guru, tab: TabKelas): boolean {
  if (tab === 'all') return true;
  if (tab === 'kelas-1') return guru.jabatan.includes('Kelas 1');
  if (tab === 'kelas-2') return guru.jabatan.includes('Kelas 2');
  if (tab === 'kelas-3') return guru.jabatan.includes('Kelas 3');
  if (tab === 'kelas-4') return guru.jabatan.includes('Kelas 4');
  if (tab === 'kelas-5') return guru.jabatan.includes('Kelas 5');
  if (tab === 'kelas-6') return guru.jabatan.includes('Kelas 6');
  if (tab === 'mapel') return guru.kategori === 'guru-mapel';
  return true;
}

export default function GuruDirectory({ initialGuru }: GuruDirectoryProps) {
  const [activeTab, setActiveTab] = useState<TabKelas>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Pimpinan / Kepala Sekolah
  const kepalaSekolah = useMemo(() => {
    return initialGuru.find((g) => g.kategori === 'pimpinan');
  }, [initialGuru]);

  // 2. Daftar Guru Reguler
  const regularTeachers = useMemo(() => {
    return initialGuru.filter((g) => g.kategori !== 'pimpinan');
  }, [initialGuru]);

  // Hitung jumlah guru per tab
  const tabCounts = useMemo(() => {
    const counts: Record<TabKelas, number> = {
      all: regularTeachers.length,
      'kelas-1': 0,
      'kelas-2': 0,
      'kelas-3': 0,
      'kelas-4': 0,
      'kelas-5': 0,
      'kelas-6': 0,
      mapel: 0,
    };

    regularTeachers.forEach((g) => {
      (['kelas-1', 'kelas-2', 'kelas-3', 'kelas-4', 'kelas-5', 'kelas-6', 'mapel'] as TabKelas[]).forEach((t) => {
        if (matchesTab(g, t)) {
          counts[t] += 1;
        }
      });
    });

    return counts;
  }, [regularTeachers]);

  // Filter guru reguler
  const displayedTeachers = useMemo(() => {
    return regularTeachers.filter((guru) => {
      if (!matchesTab(guru, activeTab)) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchNama = guru.nama.toLowerCase().includes(query);
        const matchJabatan = guru.jabatan.toLowerCase().includes(query);
        const matchMapel = guru.mataPelajaran?.toLowerCase().includes(query) ?? false;
        const matchKelas = guru.kelasDiampu?.toLowerCase().includes(query) ?? false;
        const matchNip = guru.nip?.replace(/\s/g, '').includes(query.replace(/\s/g, '')) ?? false;
        const matchTugas = guru.tugasTambahan?.some((t) => t.toLowerCase().includes(query)) ?? false;

        return matchNama || matchJabatan || matchMapel || matchKelas || matchNip || matchTugas;
      }

      return true;
    });
  }, [regularTeachers, activeTab, searchQuery]);

  const handleReset = () => {
    setActiveTab('all');
    setSearchQuery('');
  };

  return (
    <div className="w-full space-y-10 sm:space-y-12">
      {/* 1. SPOTLIGHT KEPALA SEKOLAH */}
      {kepalaSekolah && (
        <section aria-label="Profil Kepala Sekolah" className="w-full pb-8 border-b border-slate-200/80">
          <GuruCard guru={kepalaSekolah} isFeatured={true} />
        </section>
      )}

      {/* 2. SEKSI DEWAN GURU */}
      <section aria-label="Daftar Dewan Guru" className="space-y-6">
        {/* Judul: Seluruh Dewan Pendidik */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f2d4a]">
            Seluruh Dewan Pendidik
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {displayedTeachers.length} Guru
          </span>
        </div>

        {/* Tab Navigasi Ringkas & Pencarian (Tepat di bawah kalimat Seluruh Dewan Pendidik) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          {/* Tab Kelas 1 s.d. 6 Lebih Ringkas */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const count = tabCounts[tab.id] ?? 0;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#0f2d4a] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-[#eff6ff] hover:text-[#0f2d4a] hover:border-[#bfdbfe] border border-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box Ringkas */}
          <div className="relative w-full sm:w-60 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari guru atau tugas..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0f2d4a] transition-all"
            />
            <svg
              className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Grid Dewan Guru Reguler */}
        {displayedTeachers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 items-start pt-2">
            {displayedTeachers.map((guru) => (
              <GuruCard key={guru.id} guru={guru} />
            ))}
          </div>
        ) : (
          <div className="text-center py-14">
            <h4 className="font-heading font-bold text-base text-slate-800">
              Tidak ada guru yang ditemukan
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Tidak ada data yang cocok dengan filter atau pencarian &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 px-4 py-2 rounded-full text-xs font-semibold bg-[#0f2d4a] text-white hover:bg-[#1d4e78] transition-colors cursor-pointer"
            >
              Tampilkan Semua Guru
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
