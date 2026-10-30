import React from 'react';

interface NilaiCardProps {
  judul: string;
  deskripsi: string;
  ikon?: React.ReactNode;
}

/**
 * Komponen Kartu Nilai Karakter / Keunggulan Sekolah (Server Component)
 */
export default function NilaiCard({ judul, deskripsi, ikon }: NilaiCardProps) {
  return (
    <article className="nilai-card border rounded p-5 bg-white text-center">
      {ikon && <div className="ikon-wrapper mb-3 text-2xl">{ikon}</div>}
      <h3 className="font-semibold text-lg">{judul}</h3>
      <p className="text-sm text-gray-600 mt-2">{deskripsi}</p>
    </article>
  );
}
