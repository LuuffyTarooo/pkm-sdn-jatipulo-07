import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { dataBerita } from '@/data/berita';

/**
 * File generator sitemap.xml otomatis Next.js
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Gunakan tanggal konten terbaru yang deterministik agar prerender statis Next.js 16 (Cache Components) berjalan mulus
  const latestTimestamp = dataBerita.reduce((latest, item) => {
    const time = new Date(item.tanggal).getTime();
    return Number.isNaN(time) ? latest : Math.max(latest, time);
  }, new Date('2026-10-25').getTime());
  const latestModifiedDate = new Date(latestTimestamp);

  // Daftar rute statis
  const routes = [
    '',
    '/profil',
    '/guru-dan-staf',
    '/sarana-prasarana',
    '/kesiswaan/program-rutin',
    '/kesiswaan/ekstrakurikuler',
    '/kesiswaan/prestasi',
    '/berita',
    '/galeri',
    '/hubungi-kami',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: latestModifiedDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Daftar rute dinamis berita
  const beritaRoutes = dataBerita.map((item) => ({
    url: `${baseUrl}/berita/${item.slug}`,
    lastModified: new Date(item.tanggal),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...beritaRoutes];
}
