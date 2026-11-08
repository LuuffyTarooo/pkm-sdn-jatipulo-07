'use client';

import React, { useState, useMemo } from 'react';
import { Berita } from '@/types';
import BeritaCard from '@/components/cards/BeritaCard';

interface BeritaDirectoryProps {
  initialBerita: Berita[];
}

type KategoriTab = 'Semua' | 'Berita' | 'Pengumuman' | 'Agenda';

const TABS: KategoriTab[] = ['Semua', 'Berita', 'Pengumuman', 'Agenda'];

/**
 * Direktori Berita, Pengumuman, & Agenda dengan Filter Kategori Interaktif
 * Selaras dengan komponen BeritaTerbaru di halaman Beranda.
 */
export default function BeritaDirectory({ initialBerita }: BeritaDirectoryProps) {
  const [activeTab, setActiveTab] = useState<KategoriTab>('Semua');

  const filteredBerita = useMemo(() => {
    if (activeTab === 'Semua') return initialBerita;
    return initialBerita.filter((item) => item.kategori === activeTab);
  }, [initialBerita, activeTab]);

  if (initialBerita.length === 0) {
    return (
      <p className="text-neutral-500 text-center py-12 text-sm">
        Belum ada berita atau pengumuman yang diunggah.
      </p>
    );
  }

  return (
    <div className="space-y-7 sm:space-y-8">
      {/* Tab Filter Kategori */}
      <div
        className="flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Filter kategori berita"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f2d4a] ${
                isActive
                  ? 'bg-[#0f2d4a] text-white shadow-xs'
                  : 'bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid Kartu Berita */}
      {filteredBerita.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-10 text-center">
          <p className="text-sm text-neutral-600">
            Belum ada publikasi pada kategori <span className="font-semibold">{activeTab}</span>.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredBerita.map((item) => (
            <BeritaCard key={item.id} berita={item} />
          ))}
        </div>
      )}
    </div>
  );
}

