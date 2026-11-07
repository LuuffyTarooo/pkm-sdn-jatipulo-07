import { ProgramRutin } from '@/types';

/**
 * Data Program Rutin dan Pembiasaan Siswa SDN Jatipulo 07 Jakarta
 * Terjadwal dari Hari Senin hingga Jumat.
 */
export const dataProgramRutin: ProgramRutin[] = [
  {
    id: 'senin-pembiasaan',
    hari: 'Senin',
    nama: 'Pembiasaan Kesiswaan',
    waktu: '07.00 - 08.00 WIB',
    fotoCover: '/images/program-rutin/rutin-senin.jpg',
    deskripsi:
      'Program pembiasaan dan penguatan karakter peserta didik SDN Jatipulo 07 Jakarta setiap hari Senin pagi yang dilaksanakan secara bergilir setiap pekannya.',
    rotasi: [
      {
        minggu: 'Minggu 1',
        judul: 'Dongeng Pagi',
        deskripsi:
          'Kegiatan mendongeng cerita inspiratif dan bermakna untuk mengasah imajinasi anak, menanamkan nilai-nilai moral budi pekerti luhur, serta membangun budaya tutur yang positif.',
        fokus: 'Pendidikan Budi Pekerti & Imajinasi',
      },
      {
        minggu: 'Minggu 2',
        judul: 'Upacara Bendera',
        deskripsi:
          'Pelaksanaan upacara bendera bersama seluruh dewan guru dan siswa sebagai bentuk pembiasaan kedisiplinan, penghormatan lambang negara, dan penguatan cinta tanah air.',
        fokus: 'Kedisiplinan & Nasionalisme',
      },
      {
        minggu: 'Minggu 3',
        judul: 'Literasi & Resensi Buku',
        deskripsi:
          'Aktivitas membaca hening dan presentasi ulasan buku terpilih oleh siswa untuk menumbuhkan minat baca, wawasan literasi, dan kepercayaan diri di depan umum.',
        fokus: 'Gerakan Literasi Sekolah',
      },
      {
        minggu: 'Minggu 4',
        judul: 'Senam Pagi',
        deskripsi:
          'Senam kebugaran jasmani bersama untuk menjaga stamina, kesehatan fisik, dan keceriaan seluruh warga sekolah dalam mengawali pekan pembelajaran.',
        fokus: 'Kebugaran & Kesehatan Jasmani',
      },
    ],
  },
  {
    id: 'selasa-literasi-numerasi',
    hari: 'Selasa',
    nama: 'Pembiasaan Literasi & Numerasi',
    waktu: '06.45 - 07.15 WIB',
    fotoCover: '/images/program-rutin/rutin-selasa.png',
    deskripsi:
      'Penguatan kecakapan membaca pemahaman, numerasi ceria, dan logika berpikir kritis untuk mendukung capaian belajar siswa.',
    rotasi: [
      {
        minggu: 'Minggu 1',
        judul: 'Literasi Membaca Ceria',
        deskripsi:
          'Membaca teks cerita inspiratif bersama wali kelas dilanjutkan diskusi pemahaman isi bacaan.',
        fokus: 'Membaca Pemahaman',
      },
      {
        minggu: 'Minggu 2',
        judul: 'Numerasi Ceria & Logika',
        deskripsi:
          'Teka-teki matematika, perhitungan cepat kontekstual, dan simulasi pemecahan masalah sederhana.',
        fokus: 'Numerasi & Pola Pikir Logis',
      },
      {
        minggu: 'Minggu 3',
        judul: 'Eksplorasi Sains Dasar',
        deskripsi:
          'Pengamatan fenomena alam sekitar dan percobaan sains sederhana yang interaktif.',
        fokus: 'Rasa Ingin Tahu & Saintifik',
      },
      {
        minggu: 'Minggu 4',
        judul: 'Kuis Tematik Kelas',
        deskripsi:
          'Kuis cerdas cermat antarkelompok seputar wawasan umum, sains, dan literasi dasar.',
        fokus: 'Kolaborasi & Keaktifan',
      },
    ],
  },
  {
    id: 'rabu-bahasa-budaya',
    hari: 'Rabu',
    nama: 'Pembiasaan Bahasa & Budaya',
    waktu: '06.45 - 07.15 WIB',
    fotoCover: '/images/program-rutin/rutin-rabu.jpg',
    deskripsi:
      'Pengembangan kemampuan berbahasa asing dasar, apresiasi budaya lokal Betawi, serta etika bertutur kata yang santun.',
    rotasi: [
      {
        minggu: 'Minggu 1',
        judul: 'English Morning Call',
        deskripsi:
          'Mengenal kosakata bahasa Inggris tematik, sapaan santun, dan menyanyikan lagu edukatif.',
        fokus: 'Wawasan Bahasa Global',
      },
      {
        minggu: 'Minggu 2',
        judul: 'Kearifan Budaya Betawi',
        deskripsi:
          'Mengenal pantun Betawi, bahasa daerah, pakaian tradisional, dan kesenian khas Jakarta.',
        fokus: 'Pelestarian Budaya Lokal',
      },
      {
        minggu: 'Minggu 3',
        judul: 'Pentas Orasi & Puisi',
        deskripsi:
          'Siswa berlatih membacakan puisi atau bercerita singkat untuk memupuk keberanian tampil.',
        fokus: 'Kepercayaan Diri & Bahasa',
      },
      {
        minggu: 'Minggu 4',
        judul: 'Tata Krama & Komunikasi Santun',
        deskripsi:
          'Praktik 5S (Senyum, Sapa, Salam, Sopan, Santun) dalam interaksi antarwarga sekolah.',
        fokus: 'Karakter Sopan Santun',
      },
    ],
  },
  {
    id: 'kamis-seni-kebangsaan',
    hari: 'Kamis',
    nama: 'Pembiasaan Seni & Kebangsaan',
    waktu: '06.45 - 07.15 WIB',
    fotoCover: '/images/program-rutin/rutin-kamis.jpg',
    deskripsi:
      'Penguatan rasa cinta tanah air, penghayatan sejarah perjuangan bangsa, serta apresiasi ragam kesenian tradisional.',
    rotasi: [
      {
        minggu: 'Minggu 1',
        judul: 'Gita Wajib Nasional',
        deskripsi:
          'Menyanyikan bersama lagu-lagu wajib nasional dan memahami makna lirik perjuangannya.',
        fokus: 'Jiwa Patriotisme',
      },
      {
        minggu: 'Minggu 2',
        judul: 'Cerita Rakyat Nusantara',
        deskripsi:
          'Mendengarkan kisah keteladanan tokoh sejarah dan cerita rakyat dari berbagai pulau di Indonesia.',
        fokus: 'Wawasan Kebangsaan',
      },
      {
        minggu: 'Minggu 3',
        judul: 'Permainan Tradisional Edukatif',
        deskripsi:
          'Mengenal dan mempraktikkan permainan tradisional yang membangun kerja sama tim.',
        fokus: 'Sosialisasi & Kebugaran',
      },
      {
        minggu: 'Minggu 4',
        judul: 'Apresiasi Seni & Kriya',
        deskripsi:
          'Membuat kerajinan tangan sederhana atau menggambar motif nusantara bersama.',
        fokus: 'Kreativitas & Estetika',
      },
    ],
  },
  {
    id: 'jumat-rohani-sehat',
    hari: 'Jumat',
    nama: 'Pembiasaan Rohani & Jumat Bersih',
    waktu: '06.45 - 07.30 WIB',
    fotoCover: '/images/program-rutin/rutin-jumat.jpg',
    deskripsi:
      'Pembentukan karakter religius, pembiasaan hidup bersih dan sehat, serta menumbuhkan jiwa kepedulian sosial.',
    rotasi: [
      {
        minggu: 'Minggu 1',
        judul: 'Doa & Tadarus Bersama',
        deskripsi:
          'Pembacaan doa pagi, surat-surat pendek/Yasin bagi muslim, dan bimbingan rohani kebaktian bagi non-muslim.',
        fokus: 'Keimanan & Ketakwaan',
      },
      {
        minggu: 'Minggu 2',
        judul: 'Jumat Bersih & Peduli Lingkungan',
        deskripsi:
          'Operasi semut dan gotong royong membersihkan ruang kelas serta halaman sekolah.',
        fokus: 'Kepedulian Lingkungan',
      },
      {
        minggu: 'Minggu 3',
        judul: 'Kultum Budi Pekerti',
        deskripsi:
          'Nasihat agama dan penanaman akhlak mulia oleh guru pembina dalam kehidupan sehari-hari.',
        fokus: 'Akhlakul Karimah',
      },
      {
        minggu: 'Minggu 4',
        judul: 'Jumat Berbagi & Kasih Sayang',
        deskripsi:
          'Infaq sukarela dan sedekah peduli kawan untuk melatih empati sosial sejak dini.',
        fokus: 'Empati & Kepedulian Sosial',
      },
    ],
  },
];
