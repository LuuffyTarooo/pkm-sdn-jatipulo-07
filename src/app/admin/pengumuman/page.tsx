'use client';

import React, { useEffect, useState, useMemo } from 'react';

interface PengumumanItem {
  id: string;
  judul: string;
  konten: string;
  tanggal: string;
  status: 'aktif' | 'tidak_aktif';
}

export default function AdminPengumumanPage() {
  const [items, setItems] = useState<PengumumanItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeItem, setActiveItem] = useState<PengumumanItem>({
    id: '',
    judul: '',
    konten: '',
    tanggal: new Date().toISOString().slice(0, 10),
    status: 'aktif',
  });
  const [deleteTarget, setDeleteTarget] = useState<PengumumanItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPengumuman = async () => {
    try {
      const res = await fetch('/api/admin/pengumuman');
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      console.error('Gagal memuat pengumuman:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      item.konten.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  const handleOpenAdd = () => {
    setIsEdit(false);
    setActiveItem({
      id: '',
      judul: '',
      konten: '',
      tanggal: new Date().toISOString().slice(0, 10),
      status: 'aktif',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PengumumanItem) => {
    setIsEdit(true);
    setActiveItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = isEdit ? `/api/admin/pengumuman/${activeItem.id}` : '/api/admin/pengumuman';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeItem),
      });

      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchPengumuman();
      } else {
        alert(json.error || 'Gagal menyimpan pengumuman.');
      }
    } catch {
      alert('Terjadi kesalahan saat menyimpan pengumuman.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (item: PengumumanItem) => {
    const newStatus = item.status === 'aktif' ? 'tidak_aktif' : 'aktif';
    try {
      const res = await fetch(`/api/admin/pengumuman/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: newStatus } : i))
        );
      }
    } catch {
      alert('Gagal mengubah status pengumuman.');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/pengumuman/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert(json.error || 'Gagal menghapus pengumuman.');
      }
    } catch {
      alert('Terjadi kesalahan saat menghapus.');
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
            Kelola Pengumuman Sekolah
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Total {items.length} pengumuman terdaftar dalam sistem.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2d4a] hover:bg-[#163d63] text-white text-xs sm:text-sm font-bold shadow-md transition-colors self-start sm:self-auto cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Buat Pengumuman Baru</span>
        </button>
      </div>

      {/* Bar Pencarian */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari isi atau judul pengumuman..."
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

      {/* Daftar Pengumuman */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Memuat data pengumuman...</div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Tidak ada pengumuman yang sesuai.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Judul Pengumuman</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Tanggal</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6">
                      <h4 className="font-heading font-bold text-slate-900 leading-snug">
                        {item.judul}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.konten}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap hidden md:table-cell">
                      {item.tanggal}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                          item.status === 'aktif'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Klik untuk mengubah status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'aktif' ? 'bg-emerald-600' : 'bg-slate-400'
                          }`}
                        />
                        <span>{item.status === 'aktif' ? 'Aktif' : 'Non-aktif'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-[#1d4e78] hover:bg-[#eff6ff] cursor-pointer"
                          title="Edit Pengumuman"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                          title="Hapus Pengumuman"
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

      {/* Modal Tambah / Edit Pengumuman */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#0f2d4a]">
                {isEdit ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Judul Pengumuman *
                </label>
                <input
                  type="text"
                  required
                  value={activeItem.judul}
                  onChange={(e) => setActiveItem({ ...activeItem, judul: e.target.value })}
                  placeholder="Contoh: Jadwal Pembagian Rapor Semester Ganjil"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Isi Lengkap Pengumuman *
                </label>
                <textarea
                  required
                  rows={5}
                  value={activeItem.konten}
                  onChange={(e) => setActiveItem({ ...activeItem, konten: e.target.value })}
                  placeholder="Tuliskan isi pengumuman secara rinci..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={activeItem.tanggal}
                    onChange={(e) => setActiveItem({ ...activeItem, tanggal: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={activeItem.status}
                    onChange={(e) => setActiveItem({ ...activeItem, status: e.target.value as 'aktif' | 'tidak_aktif' })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                  >
                    <option value="aktif">Aktif (Tampil di Web)</option>
                    <option value="tidak_aktif">Non-aktif (Disembunyikan)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-[#0f2d4a] hover:bg-[#163d63] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Pengumuman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
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
                Hapus Pengumuman Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                &ldquo;{deleteTarget.judul}&rdquo; akan dihapus dari sistem.
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
