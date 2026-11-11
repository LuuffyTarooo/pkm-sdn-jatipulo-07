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
 */
export default function BeritaDirectory({ initialBerita }: BeritaDirectoryProps) {
  const [activeTab, setActiveTab] = useState<KategoriTab>('Semua');

  const filteredBerita = useMemo(() => {
    if (activeTab === 'Semua') return initialBerita;
    return initialBerita.filter((item) => item.kategori === activeTab);
  }, [initialBerita, activeTab]);

  if (initialBerita.length === 0) {
    return (
      <div
        data-ui="berita-directory-empty"
        className="text-center py-20 px-6 bg-white rounded-3xl border border-slate-200/90 max-w-md mx-auto shadow-xs"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#eff6ff] text-[#1d4e78] flex items-center justify-center">
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8V6Z" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-lg sm:text-xl text-[#0f2d4a]">
          Belum Ada Data
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          Belum ada publikasi berita, pengumuman, atau agenda resmi yang diunggah saat ini.
        </p>
      </div>
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
        <div
          data-ui="berita-tab-empty"
          className="text-center py-16 px-6 bg-white rounded-3xl border border-slate-200/90 max-w-md mx-auto shadow-xs"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#eff6ff] text-[#1d4e78] flex items-center justify-center">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6Z" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-base sm:text-lg text-[#0f2d4a]">
            Belum Ada Data
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Belum ada publikasi pada kategori <strong className="font-semibold text-slate-700">{activeTab}</strong>.
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
