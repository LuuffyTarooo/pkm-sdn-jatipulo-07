import { Metadata } from 'next';
import Link from 'next/link';
import { dataBerita } from '@/data/berita';
import { formatTanggal } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import HeroBanner from '@/components/ui/HeroBanner';

interface DetailBeritaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generator metadata dinamis berdasarkan slug artikel berita
 */
export async function generateMetadata({
  params,
}: DetailBeritaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artikel = dataBerita.find((b) => b.slug === slug);

  if (!artikel) {
    return {
      title: 'Artikel Berita',
      description: 'Detail artikel berita SDN Jatipulo 07 Jakarta.',
    };
  }

  return {
    title: artikel.judul,
    description: artikel.ringkasan,
    openGraph: {
      title: artikel.judul,
      description: artikel.ringkasan,
      images: [artikel.gambarUtama],
    },
  };
}

/**
 * Halaman Detail Berita (/berita/[slug])
 */
export default async function DetailBeritaPage({ params }: DetailBeritaPageProps) {
  const { slug } = await params;
  const artikel = dataBerita.find((b) => b.slug === slug);

  return (
    <div className="detail-berita-page bg-[#f8fafc] min-h-screen pb-20">
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Berita', href: '/berita' },
          { label: artikel ? artikel.kategori : 'Detail' },
        ]}
        badge={artikel ? artikel.kategori : 'Kabar Sekolah'}
        title={artikel ? artikel.judul : `Detail Berita: ${slug}`}
        subtitle={
          artikel
            ? `${formatTanggal(artikel.tanggal)} • Ditulis oleh ${artikel.penulis}`
            : 'Informasi dan dokumentasi kegiatan SDN Jatipulo 07 Jakarta.'
        }
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-10 sm:pt-12">
        <div className="mb-6">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#15803d] hover:text-[#166534] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke Semua Berita</span>
          </Link>
        </div>

        {artikel ? (
          <article className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 shadow-xs">
            <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <Badge variant="info">{artikel.kategori}</Badge>
              <time className="text-sm text-gray-500 font-medium">
                {formatTanggal(artikel.tanggal)}
              </time>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">
                Penulis: <span className="font-semibold text-gray-800">{artikel.penulis}</span>
              </span>
            </div>

            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg font-sans space-y-4">
              {artikel.konten}
            </div>
          </article>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center shadow-xs">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h2>
            <p className="text-gray-600">
              Artikel dengan tautan &ldquo;{slug}&rdquo; belum tersedia atau telah dipindahkan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
