'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ProgramRutin } from '@/types';
import ProgramRutinCard from '@/components/cards/ProgramRutinCard';

interface ProgramRutinDirectoryProps {
  programs: ProgramRutin[];
}

const DAYS = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

export default function ProgramRutinDirectory({ programs }: ProgramRutinDirectoryProps) {
  const [selectedDay, setSelectedDay] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedProgram = useMemo(() => {
    if (selectedDay === 'Semua') return null;
    return programs.find((p) => p.hari.toLowerCase() === selectedDay.toLowerCase()) || null;
  }, [programs, selectedDay]);

  const filteredPrograms = useMemo(() => {
    if (!searchQuery.trim()) return programs;
    const q = searchQuery.toLowerCase().trim();

    return programs.filter((p) => {
      const matchHari = p.hari.toLowerCase().includes(q);
      const matchNama = p.nama.toLowerCase().includes(q);
      const matchDeskripsi = p.deskripsi?.toLowerCase().includes(q);
      const matchKegiatanUtama = p.kegiatanUtama?.some((k) => k.toLowerCase().includes(q));
      const matchRotasi = p.rotasi.some(
        (r) =>
          r.judul.toLowerCase().includes(q) ||
          r.fokus?.toLowerCase().includes(q) ||
          r.deskripsi?.toLowerCase().includes(q)
      );
      return matchHari || matchNama || matchDeskripsi || matchKegiatanUtama || matchRotasi;
    });
  }, [programs, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* 1. Bar Tab Hari & Pencarian Minimalis */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Tombol Tab Hari */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {DAYS.map((day) => {
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => {
                  setSelectedDay(day);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#0b182a] text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Input Pencarian Ramping */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (selectedDay !== 'Semua') setSelectedDay('Semua');
            }}
            placeholder="Cari kegiatan pembiasaan..."
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

      {/* 2. Mode Tampilan Berdasarkan Pilihan */}
      {selectedProgram ? (
        /* Tampilan Fokus Hari yang Bersih */
        <div className="bg-white rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Foto & Detail Pokok */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100">
              <Image
                src={selectedProgram.fotoCover || selectedProgram.foto || '/images/hero/hero-image.png'}
                alt={`Dokumentasi Program Hari ${selectedProgram.hari}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#0b182a] leading-tight mb-2">
                Hari {selectedProgram.hari} &ndash; {selectedProgram.nama}
              </h2>
              {selectedProgram.deskripsi && (
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {selectedProgram.deskripsi}
                </p>
              )}

              {/* Kegiatan Utama jika ada */}
              {selectedProgram.kegiatanUtama && selectedProgram.kegiatanUtama.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-slate-500 block">
                    Kegiatan Utama:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.kegiatanUtama.map((keg, idx) => (
                      <span
                        key={idx}
                        className="py-1 px-3 rounded-lg bg-blue-50 text-[#0f2d4a] text-xs font-semibold inline-flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" aria-hidden="true" />
                        {keg}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Rincian Kegiatan / Rotasi Mingguan */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-semibold text-slate-500 block mb-2">
              {selectedProgram.rotasi.length > 1
                ? 'Komponen Mingguan (Minggu Ke-1 s.d. Ke-4)'
                : 'Uraian Pelaksanaan Kegiatan'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedProgram.rotasi.map((rot, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white text-[#0b182a] font-heading font-bold text-xs">
                      {rot.minggu}
                    </span>
                    <span className="font-heading font-semibold text-xs sm:text-sm text-slate-900 truncate">
                      {rot.judul}
                    </span>
                  </div>
                  {rot.deskripsi && (
                    <p className="font-sans text-xs text-slate-600 leading-relaxed">
                      {rot.deskripsi}
                    </p>
                  )}
                  {rot.fokus && (
                    <div className="text-[11px] text-slate-500 font-medium">
                      Fokus: {rot.fokus}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : filteredPrograms.length > 0 ? (
        /* Tampilan 5 Hari Terpadu (Clean 5-Column Grid di Desktop) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
          {filteredPrograms.map((program, idx) => (
            <ProgramRutinCard
              key={program.id}
              program={program}
              priority={idx < 3}
            />
          ))}
        </div>
      ) : (
        /* Status Kosong */
        <div className="text-center py-16 bg-white rounded-2xl p-8">
          <p className="font-heading font-semibold text-base text-slate-800">
            Tidak ada kegiatan yang cocok
          </p>
          <p className="font-sans text-xs sm:text-sm text-slate-500 mt-1">
            Silakan coba kata kunci lain atau pilih tab &ldquo;Semua&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDay('Semua');
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
