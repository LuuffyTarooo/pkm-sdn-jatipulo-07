'use client';

import React, { useState, useEffect } from 'react';
import { DataSekolah } from '@/types';

// Inline Icons
const BuildingIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="20" x="4" y="2" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M8 10h.01" />
    <path d="M16 10h.01" />
    <path d="M8 14h.01" />
    <path d="M16 14h.01" />
  </svg>
);

const PhoneIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const GlobeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ClockIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DocumentTextIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

const CheckCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ExclamationIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const PlusIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="5" y2="19" />
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
);

const TrashIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export default function AdminProfilPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [activeTab, setActiveTab] = useState<'identitas' | 'visimisi' | 'kontak' | 'jamKerja' | 'medsos'>('identitas');

  const [formData, setFormData] = useState<DataSekolah>({
    identitas: {
      nama: '',
      npsn: '',
      akreditasi: 'A',
      kurikulum: '',
      alamat: '',
      kelurahan: '',
      kecamatan: '',
      kota: '',
      provinsi: '',
      kodePos: '',
    },
    visi: '',
    misi: [],
    tujuan: [],
    kontak: {
      telepon: '',
      telepon2: '',
      whatsapp: '',
      whatsapp2: '',
      email: '',
      googleMapsEmbedUrl: '',
    },
    jamKerja: [],
    mediaSosial: [],
  });

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/profil');
      const json = await res.json();
      if (json.success && json.data) {
        setFormData(json.data);
      }
    } catch {
      setFeedback({ type: 'error', message: 'Gagal memuat profil sekolah dari server.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/profil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (json.success) {
        setFeedback({ type: 'success', message: 'Data profil sekolah berhasil disimpan dan diperbarui!' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setFeedback({ type: 'error', message: json.error || 'Gagal menyimpan profil.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan koneksi saat menyimpan profil.' });
    } finally {
      setSaving(false);
    }
  };

  // Helper Misi
  const handleAddMisi = () => {
    setFormData((prev) => ({
      ...prev,
      misi: [...(prev.misi || []), ''],
    }));
  };

  const handleUpdateMisi = (index: number, val: string) => {
    const updated = [...(formData.misi || [])];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, misi: updated }));
  };

  const handleRemoveMisi = (index: number) => {
    const updated = (formData.misi || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, misi: updated }));
  };

  // Helper Tujuan
  const handleAddTujuan = () => {
    setFormData((prev) => ({
      ...prev,
      tujuan: [...(prev.tujuan || []), ''],
    }));
  };

  const handleUpdateTujuan = (index: number, val: string) => {
    const updated = [...(formData.tujuan || [])];
    updated[index] = val;
    setFormData((prev) => ({ ...prev,配合: updated }));
  };

  const handleRemoveTujuan = (index: number) => {
    const updated = (formData.tujuan || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tujuan: updated }));
  };

  // Helper Jam Kerja
  const handleAddJamKerja = () => {
    setFormData((prev) => ({
      ...prev,
      jamKerja: [...(prev.jamKerja || []), { hari: '', jam: '' }],
    }));
  };

  const handleUpdateJamKerja = (index: number, field: 'hari' | 'jam', val: string) => {
    const updated = [...(formData.jamKerja || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, jamKerja: updated }));
  };

  const handleRemoveJamKerja = (index: number) => {
    const updated = (formData.jamKerja || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, jamKerja: updated }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500">
        <div className="w-10 h-10 border-4 border-[#38bdf8] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium">Memuat data profil sekolah...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0f2d4a]">Manajemen Profil Sekolah</h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data pokok, visi misi, kontak operasional, dan identitas resmi SDN Jatipulo 07 Jakarta.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0f2d4a] hover:bg-[#163d63] text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-5 h-5 text-[#38bdf8]" />
              Simpan Perubahan
            </>
          )}
        </button>
      </div>

      {/* Alert Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <ExclamationIcon className="w-5 h-5 text-rose-600 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tab Navigasi */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-2 shadow-sm flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('identitas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'identitas'
              ? 'bg-[#0f2d4a] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BuildingIcon className="w-4 h-4" />
          Identitas &amp; Alamat
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('visimisi')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'visimisi'
              ? 'bg-[#0f2d4a] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <DocumentTextIcon className="w-4 h-4" />
          Visi, Misi &amp; Tujuan
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('kontak')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'kontak'
              ? 'bg-[#0f2d4a] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <PhoneIcon className="w-4 h-4" />
          Kontak &amp; Peta
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('jamKerja')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'jamKerja'
              ? 'bg-[#0f2d4a] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ClockIcon className="w-4 h-4" />
          Jam Operasional
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('medsos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'medsos'
              ? 'bg-[#0f2d4a] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GlobeIcon className="w-4 h-4" />
          Media Sosial
        </button>
      </div>

      {/* Formulir Tab Konten */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm">
        {/* TAB 1: IDENTITAS */}
        {activeTab === 'identitas' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0f2d4a] border-b border-slate-100 pb-3">
              Identitas Pokok Satuan Pendidikan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Resmi Sekolah *
                </label>
                <input
                  type="text"
                  required
                  value={formData.identitas.nama}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      identitas: { ...formData.identitas, nama: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  NPSN *
                </label>
                <input
                  type="text"
                  required
                  value={formData.identitas.npsn}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      identitas: { ...formData.identitas, npsn: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Akreditasi
                </label>
                <select
                  value={formData.identitas.akreditasi}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      identitas: { ...formData.identitas, akreditasi: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8] bg-white"
                >
                  <option value="A">A (Unggul)</option>
                  <option value="B">B (Baik)</option>
                  <option value="C">C (Cukup)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Kurikulum Berlaku
                </label>
                <input
                  type="text"
                  value={formData.identitas.kurikulum}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      identitas: { ...formData.identitas, kurikulum: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>
            </div>

            <h3 className="text-base font-bold text-[#0f2d4a] pt-4 border-b border-slate-100 pb-2">
              Lokasi &amp; Alamat
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Alamat Lengkap / Jalan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.identitas.alamat}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      identitas: { ...formData.identitas, alamat: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kelurahan
                  </label>
                  <input
                    type="text"
                    value={formData.identitas.kelurahan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identitas: { ...formData.identitas, kelurahan: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    value={formData.identitas.kecamatan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identitas: { ...formData.identitas, kecamatan: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kota / Kab.
                  </label>
                  <input
                    type="text"
                    value={formData.identitas.kota}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identitas: { ...formData.identitas, kota: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    value={formData.identitas.provinsi}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identitas: { ...formData.identitas, provinsi: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    value={formData.identitas.kodePos}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        identitas: { ...formData.identitas, kodePos: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VISI, MISI & TUJUAN */}
        {activeTab === 'visimisi' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Visi Sekolah *
              </label>
              <textarea
                rows={3}
                required
                value={formData.visi}
                onChange={(e) => setFormData({ ...formData, visi: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                placeholder="Tulis visi sekolah..."
              />
            </div>

            {/* Misi List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Misi Sekolah ({formData.misi?.length || 0} Poin)
                </label>
                <button
                  type="button"
                  onClick={handleAddMisi}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2d4a] hover:text-[#38bdf8] transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Tambah Poin Misi
                </button>
              </div>

              <div className="space-y-2.5">
                {(formData.misi || []).map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-slate-100 rounded-lg text-xs font-bold text-slate-600">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={m}
                      onChange={(e) => handleUpdateMisi(idx, e.target.value)}
                      placeholder={`Poin misi ke-${idx + 1}`}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMisi(idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Hapus poin ini"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tujuan List */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Tujuan Sekolah ({formData.tujuan?.length || 0} Poin)
                </label>
                <button
                  type="button"
                  onClick={handleAddTujuan}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2d4a] hover:text-[#38bdf8] transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Tambah Poin Tujuan
                </button>
              </div>

              <div className="space-y-2.5">
                {(formData.tujuan || []).map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-slate-100 rounded-lg text-xs font-bold text-slate-600">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={t}
                      onChange={(e) => handleUpdateTujuan(idx, e.target.value)}
                      placeholder={`Poin tujuan ke-${idx + 1}`}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTujuan(idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Hapus poin ini"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KONTAK & PETA */}
        {activeTab === 'kontak' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0f2d4a] border-b border-slate-100 pb-3">
              Informasi Kontak Resmi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor Telepon Utama
                </label>
                <input
                  type="text"
                  value={formData.kontak.telepon}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kontak: { ...formData.kontak, telepon: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor Telepon Cadangan / Alternatif
                </label>
                <input
                  type="text"
                  value={formData.kontak.telepon2 || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kontak: { ...formData.kontak, telepon2: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  WhatsApp Utama
                </label>
                <input
                  type="text"
                  value={formData.kontak.whatsapp || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kontak: { ...formData.kontak, whatsapp: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  WhatsApp Cadangan / Alternatif
                </label>
                <input
                  type="text"
                  value={formData.kontak.whatsapp2 || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kontak: { ...formData.kontak, whatsapp2: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Resmi Sekolah
                </label>
                <input
                  type="email"
                  value={formData.kontak.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kontak: { ...formData.kontak, email: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Google Maps Embed URL
                </label>
                <input
                  type="text"
                  value={formData.kontak.googleMapsEmbedUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      kontak: { ...formData.kontak, googleMapsEmbedUrl: e.target.value },
                    })
                  }
                  placeholder="https://www.google.com/maps?q=..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
                <p className="text-xs text-slate-400 mt-1">
                  URL sematan peta Google Maps yang digunakan pada halaman Hubungi Kami.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: JAM OPERASIONAL */}
        {activeTab === 'jamKerja' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-[#0f2d4a]">Jam Operasional Pelayanan</h2>
                <p className="text-xs text-slate-500">Jadwal buka pelayanan administrasi dan sekolah.</p>
              </div>
              <button
                type="button"
                onClick={handleAddJamKerja}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#eff6ff] text-[#0f2d4a] hover:bg-[#dbeafe] text-xs font-semibold rounded-lg transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                Tambah Baris Jam
              </button>
            </div>

            <div className="space-y-3">
              {(formData.jamKerja || []).map((j, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Hari</label>
                    <input
                      type="text"
                      value={j.hari}
                      onChange={(e) => handleUpdateJamKerja(idx, 'hari', e.target.value)}
                      placeholder="Contoh: Senin - Kamis"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Jam Pelayanan</label>
                    <input
                      type="text"
                      value={j.jam}
                      onChange={(e) => handleUpdateJamKerja(idx, 'jam', e.target.value)}
                      placeholder="Contoh: 06.30 - 15.00 WIB"
                      className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                    />
                  </div>
                  <div className="self-end sm:self-center sm:pt-5">
                    <button
                      type="button"
                      onClick={() => handleRemoveJamKerja(idx)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Hapus jadwal ini"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: MEDIA SOSIAL */}
        {activeTab === 'medsos' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0f2d4a] border-b border-slate-100 pb-3">
              Tautan Media Sosial Resmi
            </h2>

            <div className="space-y-4">
              {['instagram', 'tiktok', 'youtube', 'facebook'].map((plat) => {
                const item = formData.mediaSosial?.find((m) => m.platform === plat) || {
                  platform: plat as 'facebook' | 'instagram' | 'youtube' | 'tiktok',
                  url: '',
                  handle: '',
                };

                const updateMedsos = (field: 'url' | 'handle', val: string) => {
                  const existingIdx = (formData.mediaSosial || []).findIndex((m) => m.platform === plat);
                  let updated = [...(formData.mediaSosial || [])];
                  if (existingIdx >= 0) {
                    updated[existingIdx] = { ...updated[existingIdx], [field]: val };
                  } else {
                    updated.push({
                      platform: plat as 'facebook' | 'instagram' | 'youtube' | 'tiktok',
                      url: field === 'url' ? val : '',
                      handle: field === 'handle' ? val : '',
                    });
                  }
                  setFormData({ ...formData, mediaSosial: updated });
                };

                return (
                  <div key={plat} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <p className="text-sm font-bold text-slate-800 capitalize mb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                      {plat}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Tautan URL Profil
                        </label>
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => updateMedsos('url', e.target.value)}
                          placeholder={`https://www.${plat}.com/...`}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Username / Display Handle
                        </label>
                        <input
                          type="text"
                          value={item.handle}
                          onChange={(e) => updateMedsos('handle', e.target.value)}
                          placeholder={`@sdn_jatipulo07`}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Button Bottom */}
        <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#0f2d4a] hover:bg-[#163d63] text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <CheckCircleIcon className="w-5 h-5 text-[#38bdf8]" />
                Simpan Perubahan Profil
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
