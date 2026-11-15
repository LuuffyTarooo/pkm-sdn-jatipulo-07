'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { FotoGaleri } from '@/types';

export default function AdminGaleriPage() {
  const [items, setItems] = useState<FotoGaleri[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);

  // Form modal state (tambah / edit)
  const [editingItem, setEditingItem] = useState<FotoGaleri | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<FotoGaleri | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadJudul, setUploadJudul] = useState('');
  const [uploadKategori, setUploadKategori] = useState('Kegiatan');
  const [uploadTanggal, setUploadTanggal] = useState(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const fetchGaleri = async () => {
    try {
      const res = await fetch('/api/admin/galeri');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      console.error('Gagal memuat data galeri:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      (item.kategori && item.kategori.toLowerCase().includes(search.toLowerCase()))
    );
  }, [items, search]);

  // Handle Multi-Upload
  const handleBatchUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Pilih minimal satu file foto.');
      return;
    }

    setUploading(true);

    try {
      const uploadData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        uploadData.append('files', selectedFiles[i]);
      }

      // 1. Upload file ke server
      const resUpload = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      const jsonUpload = await resUpload.json();
      if (!resUpload.ok || !jsonUpload.success) {
        alert(jsonUpload.error || 'Gagal mengunggah foto.');
        setUploading(false);
        return;
      }

      // 2. Simpan setiap URL ke database
      const urls: string[] = jsonUpload.urls || [jsonUpload.url];
      const batchPayload = urls.map((url, idx) => ({
        judul: urls.length === 1 ? uploadJudul : `${uploadJudul} (${idx + 1})`,
        foto: url,
        kategori: uploadKategori || 'Kegiatan',
        tanggal: uploadTanggal,
      }));

      const resSave = await fetch('/api/admin/galeri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batchPayload),
      });

      const jsonSave = await resSave.json();
      if (jsonSave.success) {
        setIsUploadModalOpen(false);
        setUploadJudul('');
        setSelectedFiles(null);
        fetchGaleri();
      } else {
        alert(jsonSave.error || 'Gagal menyimpan data foto ke database.');
      }
    } catch {
      alert('Terjadi kesalahan saat memproses unggahan.');
    } finally {
      setUploading(false);
    }
  };

  // Handle Update Foto
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/galeri/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });

      const json = await res.json();
      if (json.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === editingItem.id ? editingItem : i))
        );
        setIsEditModalOpen(false);
        setEditingItem(null);
      } else {
        alert(json.error || 'Gagal memperbarui foto galeri.');
      }
    } catch {
      alert('Terjadi kesalahan sistem saat memperbarui foto.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/galeri/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert(json.error || 'Gagal menghapus foto.');
      }
    } catch {
      alert('Terjadi kesalahan saat menghapus foto.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans pb-16">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0f2d4a]">
            Kelola Galeri Dokumentasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Total {items.length} foto kegiatan terpasang di galeri publik sekolah.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2d4a] hover:bg-[#163d63] text-white text-xs sm:text-sm font-bold shadow-md transition-colors self-start sm:self-auto cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Unggah Foto Baru</span>
        </button>
      </div>

      {/* Bar Pencarian */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari foto berdasarkan judul kegiatan..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
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
      </div>

      {/* Grid Galeri Card */}
      {isLoading ? (
        <div className="p-16 text-center text-slate-400 text-sm bg-white rounded-3xl border border-slate-200">
          Memuat data galeri...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-16 text-center text-slate-400 text-sm bg-white rounded-3xl border border-slate-200">
          Belum ada foto galeri yang cocok.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Thumbnail Foto */}
              <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.foto}
                  alt={item.judul}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.kategori && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                    {item.kategori}
                  </span>
                )}
              </div>

              {/* Info & Aksi */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                    {item.judul}
                  </h3>
                  {item.tanggal && (
                    <p className="text-[11px] text-slate-500 mt-1 font-sans">
                      {item.tanggal}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(item);
                      setIsEditModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1d4e78] hover:text-[#0f2d4a] cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Hapus foto"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Upload Foto Baru (Dukungan Multi-Upload) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-heading font-extrabold text-lg text-[#0f2d4a]">
                Unggah Foto Dokumentasi
              </h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleBatchUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pilih Foto (Bisa Beberapa Foto Sekaligus) *
                </label>
                <input
                  type="file"
                  required
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50/50 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0f2d4a] file:text-white hover:file:bg-[#163d63]"
                />
                {selectedFiles && (
                  <p className="text-[11px] text-emerald-600 mt-1">
                    {selectedFiles.length} file dipilih.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Judul Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  value={uploadJudul}
                  onChange={(e) => setUploadJudul(e.target.value)}
                  placeholder="Contoh: Upacara Bendera HUT RI ke-81"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={uploadKategori}
                    onChange={(e) => setUploadKategori(e.target.value)}
                    placeholder="Kegiatan, Prestasi..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Keterangan Waktu
                  </label>
                  <input
                    type="text"
                    value={uploadTanggal}
                    onChange={(e) => setUploadTanggal(e.target.value)}
                    placeholder="Contoh: November 2026"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  disabled={uploading}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-[#0f2d4a] hover:bg-[#163d63] text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {uploading ? 'Mengunggah...' : 'Unggah Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Edit Foto */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#0f2d4a]">
                Edit Judul Foto
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src={editingItem.foto}
                  alt={editingItem.judul}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Judul Foto Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.judul}
                  onChange={(e) => setEditingItem({ ...editingItem, judul: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Waktu / Tanggal
                </label>
                <input
                  type="text"
                  value={editingItem.tanggal || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, tanggal: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl bg-[#0f2d4a] hover:bg-[#163d63] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Hapus Foto */}
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
                Hapus Foto Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                &ldquo;{deleteTarget.judul}&rdquo; akan dihapus dari galeri website.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isSaving}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSaving}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {isSaving ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
