import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { dataBerita } from '@/data/berita';

/**
 * File generator sitemap.xml otomatis Next.js
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

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
    lastModified: new Date(),
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
