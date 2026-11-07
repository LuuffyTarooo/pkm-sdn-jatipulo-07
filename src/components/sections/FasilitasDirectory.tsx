'use client';

import React, { useState, useMemo } from 'react';
import { Fasilitas } from '@/types';
import FasilitasCard from '@/components/cards/FasilitasCard';

interface FasilitasDirectoryProps {
  fasilitas: Fasilitas[];
}

export default function FasilitasDirectory({ fasilitas }: FasilitasDirectoryProps) {
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Ekstrak daftar kategori unik secara dinamis
  const categories = useMemo(() => {
    const set = new Set<string>();
    fasilitas.forEach((f) => {
      if (f.kategori) set.add(f.kategori);
    });
    return ['Semua', ...Array.from(set)];
  }, [fasilitas]);

  // Filter berdasarkan kategori dan teks pencarian
  const filteredFasilitas = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return fasilitas.filter((item) => {
      const matchKategori =
        selectedKategori === 'Semua' || item.kategori === selectedKategori;
      const matchQuery =
        !q ||
        item.nama.toLowerCase().includes(q) ||
        item.deskripsi.toLowerCase().includes(q) ||
        item.kategori?.toLowerCase().includes(q) ||
        item.fitur?.some((feat) => feat.toLowerCase().includes(q));

      return matchKategori && matchQuery;
    });
  }, [fasilitas, selectedKategori, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* 1. Bar Filter Kategori & Pencarian Ramping */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tombol Tab Kategori */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((kat) => {
            const isActive = selectedKategori === kat;
            return (
              <button
                key={kat}
                type="button"
                onClick={() => {
                  setSelectedKategori(kat);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#0b182a] text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                {kat}
              </button>
            );
          })}
        </div>

        {/* Input Pencarian */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari sarana & fasilitas..."
            className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b182a] transition-colors"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              aria-label="Hapus pencarian"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 2. Grid Fasilitas Bersih */}
      {filteredFasilitas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {filteredFasilitas.map((item, idx) => (
            <FasilitasCard
              key={item.id}
              fasilitas={item}
              priority={idx < 3}
            />
          ))}
        </div>
      ) : (
        /* Status Kosong */
        <div className="text-center py-16 bg-white rounded-2xl p-8">
          <p className="font-heading font-semibold text-base text-slate-800">
            Tidak ada fasilitas yang cocok
          </p>
          <p className="font-sans text-xs sm:text-sm text-slate-500 mt-1">
            Silakan coba kata kunci lain atau pilih kategori &ldquo;Semua&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedKategori('Semua');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}

