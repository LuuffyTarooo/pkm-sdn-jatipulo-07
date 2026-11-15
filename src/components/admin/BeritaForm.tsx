'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { compressImage } from '@/lib/image-compressor';

export interface BeritaFormData {
  id?: string;
  slug?: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  gambarUtama: string;
  tags?: string[];
  status?: 'draft' | 'published';
  isPinned?: boolean;
  sumber?: string;
  sumberUrl?: string;
}

interface BeritaFormProps {
  initialData?: BeritaFormData;
  isEdit?: boolean;
}

export default function BeritaForm({ initialData, isEdit = false }: BeritaFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<BeritaFormData>({
    id: initialData?.id || '',
    slug: initialData?.slug || '',
    judul: initialData?.judul || '',
    ringkasan: initialData?.ringkasan || '',
    konten: initialData?.konten || '',
    kategori: initialData?.kategori || 'Berita',
    penulis: initialData?.penulis || 'Humas SDN Jatipulo 07',
    tanggal: initialData?.tanggal || new Date().toISOString().slice(0, 10),
    gambarUtama: initialData?.gambarUtama || '',
    tags: initialData?.tags || ['Informasi Sekolah'],
    status: initialData?.status || 'published',
    isPinned: initialData?.isPinned || false,
    sumber: initialData?.sumber || '',
    sumberUrl: initialData?.sumberUrl || '',
  });

  const [tagInput, setTagInput] = useState(initialData?.tags?.join(', ') || 'Informasi Sekolah');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle upload gambar utama
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg('');

    try {
      // Kompres otomatis foto besar di browser sebelum diunggah
      const optimizedFile = await compressImage(file, { maxWidth: 1920, maxHeight: 1920, quality: 0.82 });

      const uploadData = new FormData();
      uploadData.append('file', optimizedFile);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || 'Gagal mengunggah gambar.');
        return;
      }

      setFormData((prev) => ({ ...prev, gambarUtama: json.url }));
    } catch {
      setErrorMsg('Terjadi kesalahan saat mengompres atau mengunggah file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSaving(true);

    const parsedTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      tags: parsedTags,
    };

    try {
      const url = isEdit ? `/api/admin/berita/${formData.id}` : '/api/admin/berita';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || 'Gagal menyimpan artikel.');
        setIsSaving(false);
        return;
      }

      router.push('/admin/berita');
      router.refresh();
    } catch {
      setErrorMsg('Terjadi kesalahan sistem saat menghubungi server.');
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Alert Error jika ada */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center justify-between">
          <span>{errorMsg}</span>
          <button type="button" onClick={() => setErrorMsg('')} className="text-red-500 hover:text-red-700 font-bold">
            &times;
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri: Form Utama (Judul, Ringkasan, Konten) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Box Konten */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
              <div>
                <label htmlFor="judul" className="block text-xs font-bold text-[#0f2d4a] uppercase tracking-wider mb-2">
                  Judul Artikel *
                </label>
                <input
                  id="judul"
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Tuliskan judul berita yang jelas dan informatif..."
                  className="w-full px-4 py-3 text-sm sm:text-base font-bold text-slate-900 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              <div>
                <label htmlFor="ringkasan" className="block text-xs font-bold text-[#0f2d4a] uppercase tracking-wider mb-2">
                  Ringkasan / Sinopsis Singkat *
                </label>
                <textarea
                  id="ringkasan"
                  required
                  rows={2}
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat yang tampil di thumbnail kartu berita..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm text-slate-900 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              <div>
                <label htmlFor="konten" className="block text-xs font-bold text-[#0f2d4a] uppercase tracking-wider mb-2">
                  Isi Lengkap Berita *
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Tips: Pisahkan antar paragraf dengan menekan Enter dua kali.
                </p>
                <textarea
                  id="konten"
                  required
                  rows={10}
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  placeholder="Tuliskan isi berita selengkapnya di sini..."
                  className="w-full px-4 py-3 text-xs sm:text-sm text-slate-900 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2d4a] font-sans leading-relaxed"
                />
              </div>
            </div>

            {/* Box Sumber Tambahan */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-heading font-extrabold text-sm text-[#0f2d4a]">
                Atribusi Sumber Asli (Opsional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sumber" className="block text-xs font-semibold text-slate-600 mb-1">
                    Nama Sumber
                  </label>
                  <input
                    id="sumber"
                    type="text"
                    value={formData.sumber || ''}
                    onChange={(e) => setFormData({ ...formData, sumber: e.target.value })}
                    placeholder="Contoh: Berita Jakarta"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                  />
                </div>
                <div>
                  <label htmlFor="sumberUrl" className="block text-xs font-semibold text-slate-600 mb-1">
                    Tautan / URL Sumber
                  </label>
                  <input
                    id="sumberUrl"
                    type="url"
                    value={formData.sumberUrl || ''}
                    onChange={(e) => setFormData({ ...formData, sumberUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Pengaturan Penerbitan & Gambar Utama */}
          <div className="space-y-6">
            {/* Box Gambar Utama */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <label className="block text-xs font-bold text-[#0f2d4a] uppercase tracking-wider">
                Gambar Utama Berita *
              </label>

              {/* Preview Thumbnail */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                {formData.gambarUtama ? (
                  <>
                    <Image
                      src={formData.gambarUtama}
                      alt="Preview Gambar Utama"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gambarUtama: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                      title="Hapus gambar"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                    <svg className="w-8 h-8 mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    <span className="text-xs">Belum ada gambar</span>
                  </div>
                )}
              </div>

              {/* Input File Upload */}
              <div>
                <label className="block w-full text-center py-2.5 px-4 rounded-xl border border-dashed border-slate-300 hover:border-[#0f2d4a] hover:bg-slate-50 transition-colors text-xs font-semibold text-[#1d4e78] cursor-pointer">
                  <span>{isUploading ? 'Mengompres & Mengunggah...' : 'Pilih Foto dari Komputer'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={isUploading}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-slate-400 mt-1 text-center">
                  ✨ Foto kamera berukuran besar akan otomatis dikompres ke WebP.
                </p>
              </div>

              {/* Atau Input URL Manual */}
              <div>
                <span className="block text-[11px] text-slate-400 mb-1">Atau masukkan path file lokal:</span>
                <input
                  type="text"
                  value={formData.gambarUtama}
                  onChange={(e) => setFormData({ ...formData, gambarUtama: e.target.value })}
                  placeholder="/images/berita/..."
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0f2d4a]"
                />
              </div>
            </div>

            {/* Box Metadata Penerbitan */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="font-heading font-extrabold text-sm text-[#0f2d4a]">
                Parameter Publikasi
              </h3>

              {/* Status Draf / Terbit */}
              <div>
                <label htmlFor="status" className="block text-xs font-semibold text-slate-600 mb-1">
                  Status Penerbitan
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                >
                  <option value="published">Terbitkan Langsung (Published)</option>
                  <option value="draft">Simpan sebagai Draf (Draft)</option>
                </select>
              </div>

              {/* Kategori */}
              <div>
                <label htmlFor="kategori" className="block text-xs font-semibold text-slate-600 mb-1">
                  Kategori Artikel
                </label>
                <select
                  id="kategori"
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                >
                  <option value="Berita">Berita</option>
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Agenda">Agenda</option>
                </select>
              </div>

              {/* Tanggal */}
              <div>
                <label htmlFor="tanggal" className="block text-xs font-semibold text-slate-600 mb-1">
                  Tanggal Publikasi
                </label>
                <input
                  id="tanggal"
                  type="date"
                  required
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              {/* Penulis */}
              <div>
                <label htmlFor="penulis" className="block text-xs font-semibold text-slate-600 mb-1">
                  Nama Penulis
                </label>
                <input
                  id="penulis"
                  type="text"
                  required
                  value={formData.penulis}
                  onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-xs font-semibold text-slate-600 mb-1">
                  Tags (Pisahkan koma)
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Sekolah, KBM, Prestasi..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a]"
                />
              </div>

              {/* Pin / Sorotan */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0f2d4a] focus:ring-[#0f2d4a]"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    Sematkan di Atas (Pin Article)
                  </span>
                </label>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-[#0f2d4a] text-[#0f2d4a] hover:bg-[#eff6ff] text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Lihat Preview</span>
              </button>

              <button
                type="submit"
                disabled={isSaving || isUploading}
                className="w-full py-3 px-4 rounded-xl bg-[#0f2d4a] hover:bg-[#163d63] active:bg-[#081726] text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Modal Preview Berita */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            {/* Tombol Tutup */}
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Tutup preview"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Konten Preview */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#1d4e78] font-bold">
                  {formData.kategori}
                </span>
                <span>&bull;</span>
                <span>{formData.tanggal}</span>
                <span>&bull;</span>
                <span>Oleh {formData.penulis}</span>
              </div>

              <h2 className="font-heading font-extrabold text-xl sm:text-3xl text-[#0f2d4a] leading-tight">
                {formData.judul || 'Judul Artikel Masih Kosong'}
              </h2>

              {formData.gambarUtama && (
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={formData.gambarUtama}
                    alt={formData.judul}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <p className="text-sm font-semibold text-slate-700 italic border-l-4 border-[#0f2d4a] pl-4 py-1">
                {formData.ringkasan}
              </p>

              <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 font-sans">
                {formData.konten.split('\n\n').map((paragraf, idx) => (
                  <p key={idx}>{paragraf}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
