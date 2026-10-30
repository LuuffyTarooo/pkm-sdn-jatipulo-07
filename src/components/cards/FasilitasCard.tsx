import Image from 'next/image';
import { Fasilitas } from '@/types';

interface FasilitasCardProps {
  fasilitas: Fasilitas;
}

/**
 * Komponen Kartu Sarana & Fasilitas Sekolah (Server Component)
 */
export default function FasilitasCard({ fasilitas }: FasilitasCardProps) {
  return (
    <article className="fasilitas-card border rounded overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={fasilitas.foto || '/images/fasilitas/fasilitas-placeholder.jpg'}
          alt={`Fasilitas ${fasilitas.nama}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{fasilitas.nama}</h3>
        <p className="text-sm text-gray-600 mt-1">{fasilitas.deskripsi}</p>
      </div>
    </article>
  );
}
