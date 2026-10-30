/**
 * Konfigurasi dan konstanta utama situs SDN Jatipulo 07 Jakarta
 * Digunakan untuk SEO, Open Graph, dan metadata dasar
 */

export const siteConfig = {
  name: 'SDN Jatipulo 07 Jakarta',
  shortName: 'SDN Jatipulo 07',
  description:
    'Website resmi SDN Jatipulo 07 Jakarta Barat. Informasi profil sekolah, tenaga pendidik, sarana prasarana, kegiatan kesiswaan, prestasi, dan berita terkini.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sdnjatipulo07.sch.id',
  ogImage: '/images/hero/gedung-sekolah.jpg',
  links: {
    portalArchiva: '/archiva/login',
  },
  keywords: [
    'SDN Jatipulo 07',
    'SDN Jatipulo 07 Jakarta',
    'Sekolah Dasar Negeri Jatipulo',
    'SD Negeri Jakarta Barat',
    'Pendidikan Dasar Jakarta',
  ],
  author: 'SDN Jatipulo 07 Jakarta',
};

export type SiteConfig = typeof siteConfig;
