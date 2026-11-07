import { Fasilitas } from '@/types';

/**
 * Data Sarana dan Prasarana / Fasilitas SDN Jatipulo 07 Jakarta
 * Menggunakan dokumentasi foto autentik dari public/images/fasilitas
 */
export const dataFasilitas: Fasilitas[] = [
  {
    id: 'gedung-lima-lantai',
    nama: 'Gedung Lima Lantai',
    kategori: 'Infrastruktur',
    foto: '/images/fasilitas/gedung-lima-lantai.png',
    deskripsi:
      'Gedung utama sekolah bertingkat lima yang kokoh, modern, dan tertata rapi untuk menunjang seluruh kegiatan pembelajaran dan operasional sekolah.',
    fitur: ['Konstruksi Kokoh', '5 Lantai Terpadu', 'Sirkulasi Nyaman'],
  },
  {
    id: 'ruang-kelas',
    nama: 'Ruang Kelas Pembelajaran',
    kategori: 'Ruang Belajar',
    foto: '/images/fasilitas/kelas.webp',
    deskripsi:
      'Ruang kelas berorientasi kenyamanan belajar peserta didik, dilengkapi pencahayaan optimal, sirkulasi udara baik, serta sarana meja dan kursi yang ergonomis.',
    fitur: ['Pencahayaan Baik', 'Meja & Kursi Ergonomis', 'Ventilasi Alami'],
  },
  {
    id: 'lapangan-multifungsi',
    nama: 'Lapangan Multifungsi',
    kategori: 'Olahraga & Kegiatan',
    foto: '/images/fasilitas/lapangan-multi-fungsi.jpeg',
    deskripsi:
      'Lapangan serbaguna luar ruangan yang luas dan terawat untuk kegiatan upacara bendera, olahraga, senam bersama, serta berbagai kegiatan kesiswaan.',
    fitur: ['Upacara Bendera', 'Sarana Olahraga', 'Kegiatan Luar Ruangan'],
  },
  {
    id: 'mushola',
    nama: 'Mushola',
    kategori: 'Sarana Ibadah',
    foto: '/images/fasilitas/mushola.jpg',
    deskripsi:
      'Sarana ibadah yang bersih, tenang, dan nyaman yang berlokasi di lantai 1 untuk pelaksanaan sholat berjamaah, tadarus, dan pembinaan karakter religius siswa.',
    fitur: ['Lantai 1', 'Tempat Wudhu Bersih', 'Sholat Berjamaah'],
  },
  {
    id: 'lift-gedung',
    nama: 'Lift Gedung Sekolah',
    kategori: 'Aksesibilitas',
    foto: '/images/fasilitas/lift.webp',
    deskripsi:
      'Fasilitas lift modern untuk mempermudah mobilitas antarlantai bagi seluruh guru, peserta didik, dan warga sekolah.',
    fitur: ['Akses Antarlantai', 'Tombol Pengarah', 'Sensor Pengaman'],
  },
  {
    id: 'akses-lift',
    nama: 'Akses Lift',
    kategori: 'Aksesibilitas',
    foto: '/images/fasilitas/akses-lift.webp',
    deskripsi:
      'Jalur koridor dan area lobby lift yang luas, rapi, dan nyaman untuk mendukung kelancaran mobilitas warga sekolah di setiap lantai.',
    fitur: ['Koridor Luas', 'Lobby Terpadu', 'Sirkulasi Nyaman'],
  },
  {
    id: 'wastafel-cuci-tangan',
    nama: 'Wastafel Cuci Tangan (PHBS)',
    kategori: 'Kesehatan & Sanitasi',
    foto: '/images/fasilitas/wastafel.webp',
    deskripsi:
      'Fasilitas wastafel air mengalir yang tersebar di titik strategis untuk mendukung Gerakan Pembiasaan Hidup Bersih dan Sehat (PHBS) warga sekolah.',
    fitur: ['Air Bersih Mengalir', 'Sabun Cuci Tangan', 'Tinggi Sesuai Usia'],
  },
  {
    id: 'toilet-siswa',
    nama: 'Toilet & Kamar Mandi Siswa',
    kategori: 'Kesehatan & Sanitasi',
    foto: '/images/fasilitas/toilet.webp',
    deskripsi:
      'Fasilitas sanitasi terawat dan higienis yang terpisah antara siswa laki-laki dan perempuan dengan standar kebersihan terjaga setiap hari.',
    fitur: ['Terpisah Laki & Perempuan', 'Kebersihan Terawat', 'Ventilasi Terjaga'],
  },
  {
    id: 'kamar-kecil',
    nama: 'Kamar Kecil',
    kategori: 'Kesehatan & Sanitasi',
    foto: '/images/fasilitas/kamar-kecil.webp',
    deskripsi:
      'Fasilitas sanitasi kamar kecil yang bersih, higienis, dan terawat dengan kelengkapan sanitair yang memadai.',
    fitur: ['Kebersihan Terjaga', 'Pegangan Pengaman', 'Sirkulasi Baik'],
  },
  {
    id: 'tandon-air-bersih',
    nama: 'Sistem Tandon & Air Bersih',
    kategori: 'Infrastruktur',
    foto: '/images/fasilitas/tandon-air.webp',
    deskripsi:
      'Infrastruktur penampungan dan distribusi air bersih berkapasitas besar untuk menjamin ketersediaan pasokan air mengalir di seluruh area sekolah.',
    fitur: ['Kapasitas Memadai', 'Filter Air Bersih', 'Distribusi Otomatis'],
  },
];
