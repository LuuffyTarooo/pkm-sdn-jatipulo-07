import Image from 'next/image';
import { Ekskul } from '@/types';

interface EkskulCardProps {
  ekskul: Ekskul;
}

/**
 * Komponen Kartu Kegiatan Ekstrakurikuler (Server Component)
 */
export default function EkskulCard({ ekskul }: EkskulCardProps) {
  return (
    <article className="ekskul-card border rounded overflow-hidden">
      <div className="relative h-44 w-full">
        <Image
          src={ekskul.foto || '/images/ekstrakurikuler/ekskul-placeholder.jpg'}
          alt={`Ekstrakurikuler ${ekskul.nama}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{ekskul.nama}</h3>
        <p className="text-sm text-gray-600 mt-1">{ekskul.deskripsi}</p>
        {ekskul.jadwal && (
          <p className="text-xs text-gray-500 mt-2">Jadwal: {ekskul.jadwal}</p>
        )}
      </div>
    </article>
  );
}
