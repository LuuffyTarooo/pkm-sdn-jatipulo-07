import { Guru } from '@/types';

/**
 * Data Resmi Dewan Guru dan Tenaga Pendidik SDN Jatipulo 07 Jakarta
 * Menggunakan foto asli tenaga pendidik dari direktori public/images/guru
 */
export const dataGuru: Guru[] = [
  // 1. Pimpinan Sekolah
  {
    id: 'guru-01',
    nama: 'Hj. Emma SUSANTY, S.Pd. M.Pd',
    jabatan: 'Kepala Sekolah',
    kategori: 'pimpinan',
    foto: '/images/kepala-sekolah/kepalasekolah.png',
    email: 'kepsek@sdnjatipulo07.sch.id',
    kataMutiara:
      'Memimpin dengan Hati, Mendidik dengan Kasih, Menginspirasi untuk Berprestasi',
    urutan: 1,
  },

  // 2. Guru Kelas 1 s.d. Kelas 6
  {
    id: 'guru-02',
    nama: 'Ine Andriyanti, S.Pd.',
    nip: '19900825 201503 2 006',
    jabatan: 'Guru Kelas 1A',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 1A',
    tugasTambahan: ['Kepala UKS', 'PJ Paduan Suara', 'Pendamping FLS3N'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Negeri Jakarta',
    foto: '/images/guru/ine-anriyanti.png',
    kataMutiara:
      'Setiap anak adalah bintang yang bersinar terang pada waktunya masing-masing.',
    urutan: 2,
  },
  {
    id: 'guru-03',
    nama: 'Elminah, S.Pd.',
    nip: '19841108 200801 2 009',
    jabatan: 'Guru Kelas 1B',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 1B',
    tugasTambahan: ['PJ Pramuka Siaga', 'PJ Seni Tari', 'Pendamping FLS3N'],
    pendidikanTerakhir: 'S1 PGSD - Uhamka',
    foto: '/images/guru/elminah.png',
    kataMutiara:
      'Menanamkan budi pekerti luhur dan kebiasaan saling menghargai sejak fase fondasi awal.',
    urutan: 3,
  },
  {
    id: 'guru-04',
    nama: 'Siti Aisah, S.Pd.',
    nip: '19880315 201201 2 007',
    jabatan: 'Guru Kelas 1C',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 1C',
    tugasTambahan: ['Koordinator 7K'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Negeri Jakarta',
    foto: '/images/guru/siti-aisah.png',
    kataMutiara:
      'Kebersihan, kenyamanan, dan keteraturan kelas adalah awal pembelajaran yang bermakna.',
    urutan: 4,
  },
  {
    id: 'guru-05',
    nama: 'Jamilah M, S.Pd.',
    nip: '19860520 201001 2 018',
    jabatan: 'Guru Kelas 2A',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 2A',
    tugasTambahan: ['Koordinator 7 KAIH'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Terbuka',
    foto: '/images/guru/jamilah.png',
    kataMutiara:
      'Mendidik dengan keteladanan karakter, kasih sayang, dan keikhlasan budi.',
    urutan: 5,
  },
  {
    id: 'guru-06',
    nama: 'Sekar Ayu Fenina, S.Pd.',
    nip: '19920614 201701 2 004',
    jabatan: 'Guru Kelas 2B',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 2B',
    tugasTambahan: ['PJ Karate', 'Tim Dokumentasi'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Negeri Jakarta',
    foto: '/images/guru/sekar-ayu-fenina.png',
    kataMutiara:
      'Pembelajaran berbasis eksplorasi menghidupkan daya nalar kritis dan keceriaan kolaborasi.',
    urutan: 6,
  },
  {
    id: 'guru-07',
    nama: 'Sri Rahayu, S.Pd.',
    nip: '19830917 200801 2 014',
    jabatan: 'Guru Kelas 3A',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 3A',
    tugasTambahan: ['Wakil Kepala Sekolah', 'Koordinator Proyek Kokurikuler'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Negeri Jakarta',
    foto: '/images/guru/sri-rahayu.png',
    kataMutiara:
      'Kolaborasi guru dan siswa melahirkan pembelajaran bermakna dan berdaya guna.',
    urutan: 7,
  },
  {
    id: 'guru-08',
    nama: 'Firmansyah, S.Pd.',
    nip: '19910410 201502 1 005',
    jabatan: 'Guru Kelas 3B',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 3B',
    tugasTambahan: ['PJ Pramuka Penggalang', 'PJ Drum Band', 'Pendamping TKA'],
    pendidikanTerakhir: 'S1 PGSD - Uhamka',
    foto: '/images/guru/firmansyah.png',
    kataMutiara:
      'Disiplin, kepemimpinan, dan keceriaan berkarya adalah modal generasi berkarakter unggul.',
    urutan: 8,
  },
  {
    id: 'guru-09',
    nama: 'Dewi Cahyu Armania, S.Pd.',
    nip: '19870415 201101 2 012',
    jabatan: 'Guru Kelas 4A',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 4A',
    tugasTambahan: ['Kepala Perpustakaan', 'PJ Pencak Silat', 'Pendamping OSN'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Negeri Jakarta',
    foto: '/images/guru/dewi-cahyu-armania-v2.png',
    kataMutiara:
      'Membaca membuka cakrawala dunia, olahraga dan seni melatih ketangguhan mental.',
    urutan: 9,
  },
  {
    id: 'guru-10',
    nama: 'Ulfa Fujiah Fasha, S.Pd.',
    nip: '19931102 201903 2 007',
    jabatan: 'Guru Kelas 4B',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 4B',
    tugasTambahan: ['PJ Melukis', 'Pendamping OSN'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Pendidikan Indonesia',
    foto: '/images/guru/ulfa-fujiah-fasha.png',
    kataMutiara:
      'Seni dan kreativitas membebaskan imajinasi anak untuk berani bermimpi dan berkarya.',
    urutan: 10,
  },
  {
    id: 'guru-11',
    nama: 'Masitoh, S.Pd.',
    nip: '19860319 201001 2 015',
    jabatan: 'Guru Kelas 5',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 5',
    tugasTambahan: ['PJ Paskibra', 'Humas'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Terbuka',
    foto: '/images/guru/masitoh.png',
    kataMutiara:
      'Kreativitas tumbuh subur saat rasa ingin tahu anak didampingi dengan kesabaran dan dorongan positif.',
    urutan: 11,
  },
  {
    id: 'guru-12',
    nama: 'Sarah Fransiska Agata, S.Pd.',
    nip: '19940518 201902 2 006',
    jabatan: 'Guru Kelas 6A',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 6A',
    tugasTambahan: ['PJ Drum Band', 'Pendamping OSN', 'Pendamping TKA', 'PBPP'],
    pendidikanTerakhir: 'S1 PGSD - Universitas Negeri Jakarta',
    foto: '/images/guru/sarah-fransiska-agata.png',
    kataMutiara:
      'Mempersiapkan lulusan berkarakter tangguh, berprestasi akademik, dan siap menyongsong masa depan.',
    urutan: 12,
  },
  {
    id: 'guru-13',
    nama: 'Jaya Kusumah, S.Pd.',
    nip: '19890214 201402 1 003',
    jabatan: 'Guru Kelas 6B',
    kategori: 'guru-kelas',
    kelasDiampu: 'Kelas 6B',
    tugasTambahan: ['Bendahara Barang', 'PJ Futsal', 'Pendamping TKA'],
    pendidikanTerakhir: 'S1 PGSD - Uhamka',
    foto: '/images/guru/jaya-kusumah.png',
    kataMutiara:
      'Sportivitas di lapangan cerminan kejujuran dan integritas dalam kehidupan bermasyarakat.',
    urutan: 13,
  },

  // 3. Guru Mata Pelajaran
  {
    id: 'guru-14',
    nama: 'Jepry Handani, S.Pd.',
    nip: '19910815 201602 1 004',
    jabatan: 'Guru PJOK Kelas 1-6',
    kategori: 'guru-mapel',
    mataPelajaran: 'Guru PJOK Kelas 1-6',
    tugasTambahan: ['Koordinator O2SN', 'PJ Bulutangkis', 'Tim Dokumentasi'],
    pendidikanTerakhir: 'S1 Pendidikan Jasmani - UNJ',
    foto: '/images/guru/jepri-handani.png',
    kataMutiara:
      'Di dalam tubuh yang sehat terdapat jiwa yang kuat; sportivitas adalah cermin watak ksatria.',
    urutan: 14,
  },
  {
    id: 'guru-15',
    nama: 'Haratul Juliyah, S.Pd.I.',
    nip: '19890722 201402 2 008',
    jabatan: 'Guru PAI Kelas 1, 2, & 5',
    kategori: 'guru-mapel',
    mataPelajaran: 'Guru PAI Kelas 1, 2, & 5',
    tugasTambahan: ['PJ Marawis', 'Pendamping'],
    pendidikanTerakhir: 'S1 Tarbiyah - UIN Syarif Hidayatullah',
    foto: '/images/guru/haratul-juliyah.png',
    kataMutiara:
      'Adab mendahului ilmu; akhlak mulia dan ketakwaan adalah perhiasan terbaik seorang insan berilmu.',
    urutan: 15,
  },
  {
    id: 'guru-16',
    nama: 'Hanif Azhar, S.Pd.I.',
    nip: '19920816 201702 1 003',
    jabatan: 'Guru PAI Kelas 3, 4, & 6',
    kategori: 'guru-mapel',
    mataPelajaran: 'Guru PAI Kelas 3, 4, & 6',
    tugasTambahan: ['PJ BTQ & Rohis', 'Operator Dapodik', 'Koordinator PHBI'],
    pendidikanTerakhir: 'S1 Pendidikan Agama Islam - UIN Syarif Hidayatullah',
    foto: '/images/guru/hanif-azhar.png',
    kataMutiara:
      'Mendidik dengan Al-Quran dan keteladanan untuk membentuk insan yang berakhlak mulia.',
    urutan: 16,
  },

  // 4. Tenaga Kependidikan & Staf
  {
    id: 'guru-17',
    nama: 'Neneng Nurhidayah',
    jabatan: 'Operator Sekolah',
    kategori: 'staf',
    tugasTambahan: ['Operator Dapodik', 'Administrasi Sekolah'],
    foto: '/images/guru/neneng-nurhidayah.png',
    kataMutiara:
      'Ketelitian data dan pelayanan prima mendukung kelancaran administrasi serta kemajuan sekolah.',
    urutan: 17,
  },
  {
    id: 'guru-18',
    nama: 'Suratmin',
    jabatan: 'Caraka',
    kategori: 'staf',
    tugasTambahan: ['Pemeliharaan Lingkungan & Kebersihan Sekolah'],
    foto: '/images/guru/suratmin.png',
    kataMutiara:
      'Lingkungan sekolah yang bersih, sehat, dan asri menciptakan suasana belajar yang nyaman bagi seluruh warga sekolah.',
    urutan: 18,
  },
];

/**
 * Statistik Ringkas Guru & Tenaga Kependidikan
 */
export const statistikGuru = {
  totalPendidikDanStaf: dataGuru.length,
  guruSertifikasi: 14,
  kualifikasiSarjanaDanMagister: '100%',
  akreditasi: 'A (Unggul)',
};
