'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import BeritaForm, { BeritaFormData } from '@/components/admin/BeritaForm';

export default function EditBeritaPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<BeritaFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetch(`/api/admin/berita/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        } else {
          setErrorMsg(json.error || 'Artikel tidak ditemukan.');
        }
      } catch {
        setErrorMsg('Gagal memuat artikel dari server.');
      } finally {
        setIsLoading(false);
      }
    }
    if (id) loadItem();
  }, [id]);

  return (
    <div className="space-y-6 font-sans pb-16">
      {/* Header & Tombol Kembali */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/berita"
          className="p-2 rounded-xl text-slate-500 hover:text-[#0f2d4a] hover:bg-slate-100 transition-colors"
          title="Kembali ke Daftar Berita"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0f2d4a]">
            Edit Artikel Berita
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Perbarui data konten, gambar, atau status publikasi artikel.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-400 text-sm">Memuat data artikel...</div>
      ) : errorMsg ? (
        <div className="p-6 rounded-2xl bg-red-50 text-red-700 text-sm font-semibold text-center">
          {errorMsg}
        </div>
      ) : (
        data && <BeritaForm initialData={data} isEdit={true} />
      )}
    </div>
  );
}
