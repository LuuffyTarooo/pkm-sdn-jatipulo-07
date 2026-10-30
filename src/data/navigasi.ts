import { MenuNavigasi } from '@/types';

/**
 * Data menu navigasi utama website SDN Jatipulo 07 Jakarta
 */
export const menuNavigasi: MenuNavigasi[] = [
  {
    label: 'Beranda',
    href: '/',
  },
  {
    label: 'Profil',
    href: '/profil',
  },
  {
    label: 'Guru & Staf',
    href: '/guru-dan-staf',
  },
  {
    label: 'Fasilitas',
    href: '/sarana-prasarana',
  },
  {
    label: 'Kesiswaan',
    href: '#',
    children: [
      {
        label: 'Program Rutin',
        href: '/kesiswaan/program-rutin',
        deskripsi: 'Kegiatan pembiasaan dan program berkala siswa',
      },
      {
        label: 'Ekstrakurikuler',
        href: '/kesiswaan/ekstrakurikuler',
        deskripsi: 'Wadah minat, bakat, dan kreativitas siswa',
      },
      {
        label: 'Prestasi',
        href: '/kesiswaan/prestasi',
        deskripsi: 'Capaian prestasi siswa di berbagai bidang',
      },
    ],
  },
  {
    label: 'Berita',
    href: '/berita',
  },
  {
    label: 'Galeri',
    href: '/galeri',
  },
  {
    label: 'Kontak',
    href: '/hubungi-kami',
  },
  {
    label: 'Portal Archiva',
    href: '/archiva/login',
    isCta: true,
    isExternal: true,
  },
];
