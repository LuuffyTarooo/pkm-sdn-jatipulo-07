'use client';

import React, { useState, useMemo } from 'react';
import { Ekskul, KategoriEkskul } from '@/types';
import EkskulCard from '@/components/cards/EkskulCard';
import StaggerChildren from '@/components/ui/StaggerChildren';
import AnimateIn from '@/components/ui/AnimateIn';

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
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0f2d4a] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90'
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
      {/* key={activeTab} → StaggerChildren remount & re-animate saat filter berubah */}
      <StaggerChildren
        key={activeTab}
        baseDelay={60}
        staggerDelay={100}
        variant="fade-up"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
      >
        {filteredEkskul.map((ekskul) => (
          <EkskulCard key={ekskul.id} ekskul={ekskul} />
        ))}
      </StaggerChildren>
    </div>
  );
}
