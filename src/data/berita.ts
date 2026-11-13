import { Berita } from '@/types';

/**
 * Data Berita, Pengumuman, dan Agenda Terkini SDN Jatipulo 07 Jakarta
 */
export const dataBerita: Berita[] = [
  {
    id: 'berita-01',
    slug: 'gedung-baru-sdn-jati-pulo-07-resmi-ditempati',
    judul: 'Gedung Baru SDN Jati Pulo 07 Resmi Ditempati dengan Lingkungan Belajar Modern',
    ringkasan:
      'Pemerintah Provinsi (Pemprov) DKI Jakarta melalui Dinas Pendidikan telah merampungkan proyek revitalisasi dan rehabilitasi total gedung SDN Jati Pulo 07, Palmerah, Jakarta Barat.',
    konten: `Pemerintah Provinsi (Pemprov) DKI Jakarta melalui Dinas Pendidikan telah merampungkan proyek revitalisasi dan rehabilitasi total gedung SDN Jati Pulo 07, Palmerah, Jakarta Barat.

Gedung baru yang menghadirkan fasilitas dan lingkungan belajar modern ini resmi ditempati sejak tahun ajaran baru (Juli 2026) dan terintegrasi dalam satu kawasan pendidikan bersama SDN Jati Pulo 08 serta SMP Negeri 298 Jakarta.

Pembaruan infrastruktur ini bertujuan meningkatkan kenyamanan serta kualitas kegiatan belajar mengajar (KBM) bagi seluruh siswa dan tenaga pendidik.`,
    kategori: 'Berita',
    penulis: 'Berita Jakarta',
    tanggal: '2026-10-15',
    gambarUtama: '/images/berita/gedung-tampak-belakang.jpeg',
    tags: ['Gedung Baru', 'Revitalisasi', 'Fasilitas Sekolah', 'KBM'],
    isPinned: true,
    sumber: 'Berita Jakarta',
    sumberUrl:
      'https://m.beritajakarta.id/potret-jakarta/album/20133/menengok-gedung-baru-sdn-jati-pulo-07-dan-08',
  },
];
