'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BeritaItem {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  gambarUtama: string;
  status: 'draft' | 'published';
  isPinned?: boolean;
}

export default function AdminBeritaPage() {
  const [items, setItems] = useState<BeritaItem[]>([]);
  const [search, setSearch] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<BeritaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBerita = async () => {
    try {
      const res = await fetch('/api/admin/berita');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      console.error('Gagal mengambil daftar berita:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchKategori = filterKategori === 'Semua' || item.kategori === filterKategori;
      const matchSearch =
        item.judul.toLowerCase().includes(search.toLowerCase()) ||
        item.penulis.toLowerCase().includes(search.toLowerCase());
      return matchKategori && matchSearch;
    });
  }, [items, search, filterKategori]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/berita/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert(data.error || 'Gagal menghapus berita.');
      }
    } catch {
      alert('Terjadi kesalahan saat menghapus berita.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 font-sans pb-16">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0f2d4a]">
            Kelola Berita &amp; Artikel
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Total {items.length} artikel terdaftar dalam sistem database.
          </p>
        </div>

        <Link
          href="/admin/berita/tambah"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2d4a] hover:bg-[#163d63] text-white text-xs sm:text-sm font-bold shadow-md transition-colors self-start sm:self-auto cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Tulis Berita Baru</span>
        </Link>
      </div>

      {/* Filter & Pencarian Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan judul atau penulis..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a] transition-all"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Filter Kategori */}
        <select
          value={filterKategori}
          onChange={(e) => setFilterKategori(e.target.value)}
          className="w-full sm:w-48 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a] text-slate-700"
        >
          <option value="Semua">Semua Kategori</option>
          <option value="Berita">Berita</option>
          <option value="Pengumuman">Pengumuman</option>
          <option value="Agenda">Agenda</option>
        </select>
      </div>

      {/* Tabel Berita */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Memuat data berita...</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Tidak ada berita yang sesuai dengan kriteria pencarian.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Artikel</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Kategori</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Penulis</th>
                  <th className="py-3.5 px-4">Tanggal</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Artikel (Foto + Judul) */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          {item.gambarUtama ? (
                            <Image
                              src={item.gambarUtama}
                              alt={item.judul}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">
                              Foto
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-md">
                          <div className="flex items-center gap-1.5">
                            {item.isPinned && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#eff6ff] text-[#1d4e78] border border-[#bfdbfe]">
                                Pin
                              </span>
                            )}
                            <h3 className="font-heading font-bold text-slate-900 truncate">
                              {item.judul}
                            </h3>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {item.ringkasan}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {item.kategori}
                      </span>
                    </td>

                    {/* Penulis */}
                    <td className="py-3.5 px-4 text-slate-600 hidden lg:table-cell">
                      {item.penulis}
                    </td>

                    {/* Tanggal */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.tanggal}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          item.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'published' ? 'Terbit' : 'Draf'}
                      </span>
                    </td>

                    {/* Tombol Aksi */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          title="Lihat di Web Publik"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </Link>

                        <Link
                          href={`/admin/berita/edit/${item.id}`}
                          className="p-1.5 rounded-lg text-[#1d4e78] hover:bg-[#eff6ff]"
                          title="Edit Artikel"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                          title="Hapus Artikel"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Hapus Artikel Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                &ldquo;{deleteTarget.judul}&rdquo; akan dihapus permanen dari sistem.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
