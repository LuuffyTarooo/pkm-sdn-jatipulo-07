import { ProgramRutin } from '@/types';

/**
 * Data Program Kedisiplinan dan Pembiasaan Positif
 * SDN Jatipulo 07 Jakarta
 * Terjadwal rutin dari Hari Senin hingga Jumat.
 */
export const dataProgramRutin: ProgramRutin[] = [
  {
    id: 'senin-upacara',
    hari: 'Senin',
    nama: 'Upacara Bendera',
    waktu: '07.00 - 08.00 WIB',
    fotoCover: '/images/program-rutin/upacara-bendera.webp',
    kegiatanUtama: ['Upacara Bendera'],
    deskripsi:
      'Pelaksanaan upacara bendera rutin untuk melatih kedisiplinan, penghormatan lambang negara, dan menumbuhkan semangat nasionalisme seluruh peserta didik.',
    rotasi: [
      {
        minggu: 'Minggu 1 - 4',
        judul: 'Upacara Bendera Rutin',
        deskripsi:
          'Upacara pengibaran sang merah putih yang diikuti secara khidmat oleh seluruh dewan guru dan siswa dengan petugas upacara bergilir setiap pekannya.',
        fokus: 'Kedisiplinan & Jiwa Nasionalisme',
      },
    ],
  },
  {
    id: 'selasa-literasi',
    hari: 'Selasa',
    nama: 'Literasi',
    waktu: '06.45 - 07.15 WIB',
    fotoCover: '/images/program-rutin/literasi.webp',
    deskripsi:
      'Program penguatan minat baca, kecakapan berbahasa asing secara kontekstual, dan daya kreasi menulis karya sendiri.',
    rotasi: [
      {
        minggu: 'Minggu 1',
        judul: 'Mendongeng',
        deskripsi:
          'Menyimak dan menceritakan kembali kisah-kisah inspiratif bermakna untuk mengasah imajinasi serta nilai budi pekerti luhur.',
        fokus: 'Budi Pekerti & Imajinasi',
      },
      {
        minggu: 'Minggu 2',
        judul: 'English Day (Speech)',
        deskripsi:
          'Praktik pidato dan percakapan bahasa Inggris dasar untuk melatih kepercayaan diri dan kemampuan public speaking sejak dini.',
        fokus: 'Public Speaking Bahasa Inggris',
      },
      {
        minggu: 'Minggu 3',
        judul: 'English Day (News Anchor)',
        deskripsi:
          'Simulasi membaca berita bahasa Inggris untuk mengasah pelafalan (pronunciation), intonasi, dan wawasan informasi global.',
        fokus: 'Pelafalan & Wawasan Global',
      },
      {
        minggu: 'Minggu 4',
        judul: 'Menulis Cerita Sendiri (Mentari)',
        deskripsi:
          'Program Mentari (Menulis Cerita Sendiri) sebagai wadah menuangkan kreativitas, ide orisinal, dan karya tulis siswa.',
        fokus: 'Kreativitas Menulis & Ekspresi Diri',
      },
    ],
  },
  {
    id: 'rabu-07-beraksi-mijel',
    hari: 'Rabu',
    nama: '07 Beraksi & Mijel',
    waktu: '06.45 - 07.15 WIB',
    fotoCover: '/images/program-rutin/07-beraksi-mijel.webp',
    deskripsi:
      'Panggung unjuk bakat seni, budaya daerah nusantara, ketangkasan beladiri, dan kecakapan kemandirian kepramukaan siswa SDN Jatipulo 07.',
    rotasi: [
      {
        minggu: 'Minggu 1',
        judul: 'Solo Vocal',
        deskripsi:
          'Pentas vokal solo lagu anak dan daerah nusantara untuk melatih olah vokal, musikalitas, dan keberanian tampil di depan umum.',
        fokus: 'Olah Vokal & Kepercayaan Diri',
      },
      {
        minggu: 'Minggu 2',
        judul: 'Menari',
        deskripsi:
          'Apresiasi seni tari tradisional dan kreasi nusantara untuk melatih keluwesan gerak dan menumbuhkan kecintaan budaya bangsa.',
        fokus: 'Keluwesan Gerak & Apresiasi Seni',
      },
      {
        minggu: 'Minggu 3',
        judul: 'Beladiri',
        deskripsi:
          'Peragaan jurus dan teknik dasar beladiri pencak silat untuk membangun refleks, ketangkasan fisik, dan kedisiplinan mental.',
        fokus: 'Ketangkasan & Disiplin Beladiri',
      },
      {
        minggu: 'Minggu 4',
        judul: 'Kepramukaan',
        deskripsi:
          'Latihan kepanduan pramuka siaga dan penggalang untuk memupuk kemandirian, kerja sama tim, dan penghayatan Dasa Darma.',
        fokus: 'Kemandirian & Dasa Darma Pramuka',
      },
    ],
  },
  {
    id: 'kamis-senam-makan-bersama',
    hari: 'Kamis',
    nama: 'Senam & Makan Bersama',
    waktu: '06.45 - 07.30 WIB',
    fotoCover: '/images/program-rutin/senam-makan-bersama.webp',
    kegiatanUtama: ['Senam Bersama', 'Makan Bersama'],
    deskripsi:
      'Pembiasaan pola hidup bersih dan bugar melalui senam jasmani ceria dilanjutkan dengan menyantap bekal sehat bersama seluruh warga sekolah.',
    rotasi: [
      {
        minggu: 'Minggu 1 - 4',
        judul: 'Senam Bersama & Makan Bersama',
        deskripsi:
          'Senam kebugaran jasmani bersama di lapangan sekolah, dilanjutkan dengan makan bersama bekal bergizi seimbang untuk mempererat kebersamaan dan adab makan sehat.',
        fokus: 'Kebugaran Fisik & Gizi Seimbang',
      },
    ],
  },
  {
    id: 'jumat-sholat-dhuha-tadarus-psn',
    hari: 'Jumat',
    nama: 'Sholat Dhuha, Tadarus, & PSN',
    waktu: '06.45 - 07.45 WIB',
    fotoCover: '/images/program-rutin/sholat-dhuha-tadarus-psn.webp',
    kegiatanUtama: ['Sholat Dhuha & Tadarus', 'PSN (Pemberantasan Sarang Nyamuk)'],
    deskripsi:
      'Penguatan karakter religius melalui ibadah berjamaah dan tadarus Al-Qur\'an, gerakan PSN peduli kesehatan lingkungan, serta kompetisi unjuk bakat keagamaan mingguan.',
    rotasi: [
      {
        minggu: 'Minggu 1',
        judul: 'Pildacil',
        deskripsi:
          'Pemilihan Da\'i Cilik dan ceramah agama singkat oleh perwakilan siswa untuk melatih kemampuan bertausiyah dan berdakwah santun.',
        fokus: 'Karakter Da\'i & Komunikasi Islami',
      },
      {
        minggu: 'Minggu 2',
        judul: 'Marawis',
        deskripsi:
          'Penampilan dan apresiasi seni musik marawis islami untuk mempererat kekompakan dan syiar kesenian religius.',
        fokus: 'Seni Musik Islami & Harmoni',
      },
      {
        minggu: 'Minggu 3',
        judul: 'MTQ',
        deskripsi:
          'Musabaqah Tilawatil Qur\'an untuk mengasah keindahan tajwid, makhraj, dan seni membaca ayat suci Al-Qur\'an.',
        fokus: 'Tartil & Seni Baca Al-Qur\'an',
      },
      {
        minggu: 'Minggu 4',
        judul: 'MHQ',
        deskripsi:
          'Musabaqah Hifdzil Qur\'an untuk menguji kelancaran hafalan surat-surat juz 30 dan memotivasi budaya tahfidz.',
        fokus: 'Hafalan Al-Qur\'an (Tahfidz)',
      },
    ],
  },
];
