import Image from 'next/image';
import { Prestasi } from '@/types';
import Badge from '@/components/ui/Badge';

interface PrestasiCardProps {
  prestasi: Prestasi;
}

/**
 * Komponen Kartu Prestasi Siswa & Sekolah (Server Component)
 */
export default function PrestasiCard({ prestasi }: PrestasiCardProps) {
  return (
    <article className="prestasi-card border rounded overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={prestasi.foto || '/images/prestasi/prestasi-placeholder.jpg'}
          alt={`Prestasi ${prestasi.judul}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="success">{prestasi.tingkat}</Badge>
          <span className="text-xs text-gray-500">{prestasi.tahun}</span>
        </div>
        <h3 className="font-semibold text-base">{prestasi.judul}</h3>
        <p className="text-sm text-gray-600 mt-1">Peraih: {prestasi.peraih}</p>
        {prestasi.deskripsi && (
          <p className="text-xs text-gray-500 mt-2">{prestasi.deskripsi}</p>
        )}
      </div>
    </article>
  );
}
