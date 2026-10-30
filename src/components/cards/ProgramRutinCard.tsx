import Image from 'next/image';
import { ProgramRutin } from '@/types';

interface ProgramRutinCardProps {
  program: ProgramRutin;
}

/**
 * Komponen Kartu Program Rutin / Pembiasaan Siswa (Server Component)
 */
export default function ProgramRutinCard({ program }: ProgramRutinCardProps) {
  return (
    <article className="program-rutin-card border rounded overflow-hidden">
      {program.foto && (
        <div className="relative h-44 w-full">
          <Image
            src={program.foto}
            alt={`Program ${program.nama}`}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs font-semibold text-blue-600 block mb-1">
          {program.jadwal}
        </span>
        <h3 className="font-semibold text-base">{program.nama}</h3>
        <p className="text-sm text-gray-600 mt-2">{program.deskripsi}</p>
      </div>
    </article>
  );
}
