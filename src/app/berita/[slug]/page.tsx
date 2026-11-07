import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataBerita } from '@/data/berita';
import { formatTanggal } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import HeroBanner from '@/components/ui/HeroBanner';
import BeritaCoverImage from '@/components/ui/BeritaCoverImage';

interface DetailBeritaPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Prerender daftar slug artikel berita statis (kompatibel dengan Next.js 16 Cache Components)
 */
export function generateStaticParams() {
  return dataBerita.map((berita) => ({
    slug: berita.slug,
  }));
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
      title: 'Artikel Tidak Ditemukan',
      description: 'Artikel berita yang Anda cari tidak ditemukan.',
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
 * Mengurai konten bertag <p>...</p> atau baris baru menjadi array paragraf teks murni
 */
function parseParagraphs(rawContent: string): string[] {
  return rawContent
    .split(/<\/p>\s*<p>|<\/?p>|\n{2,}/gi)
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * Halaman Detail Berita (/berita/[slug])
 */
export default async function DetailBeritaPage({ params }: DetailBeritaPageProps) {
  const { slug } = await params;
  const artikel = dataBerita.find((b) => b.slug === slug);

  if (!artikel) {
    notFound();
  }

  const paragraphs = parseParagraphs(artikel.konten);
  const badgeVariant =
    artikel.kategori === 'Agenda'
      ? 'warning'
      : artikel.kategori === 'Pengumuman'
      ? 'info'
      : 'success';

  return (
    <div className="detail-berita-page bg-[#f8fafc] min-h-screen pb-20">
      <HeroBanner
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Berita', href: '/berita' },
          { label: artikel.kategori },
        ]}
        badge={artikel.kategori}
        title={artikel.judul}
        subtitle={`${formatTanggal(artikel.tanggal)} • Ditulis oleh ${artikel.penulis}`}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-10 sm:pt-12">
        <div className="mb-6">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f2d4a] hover:text-[#1d4e78] transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke Semua Berita</span>
          </Link>
        </div>

        <article className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
          <BeritaCoverImage
            src={artikel.gambarUtama}
            alt={artikel.judul}
            kategori={artikel.kategori}
          />

          <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <Badge variant={badgeVariant}>{artikel.kategori}</Badge>
            <time dateTime={artikel.tanggal} className="text-sm text-neutral-500 font-medium">
              {formatTanggal(artikel.tanggal)}
            </time>
            <span className="text-neutral-300" aria-hidden="true">
              &bull;
            </span>
            <span className="text-sm text-neutral-600">
              Penulis: <span className="font-semibold text-neutral-800">{artikel.penulis}</span>
            </span>
          </div>

          <div className="text-neutral-700 leading-relaxed text-base sm:text-lg font-sans space-y-4">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {artikel.tags && artikel.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
              {artikel.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#f8fafc] border border-gray-200/80 text-xs font-medium text-neutral-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
