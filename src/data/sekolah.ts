import { DataSekolah } from '@/types';

/**
 * Data profil, kontak, visi, misi, dan identitas SDN Jatipulo 07 Jakarta
 */
export const dataSekolah: DataSekolah = {
  identitas: {
    nama: 'SDN Jatipulo 07 Jakarta',
    npsn: '20105658',
    akreditasi: 'A',
    kurikulum: 'Kurikulum Merdeka',
    alamat: 'Jl. Semangka II No. 1, RT 07 / RW 07, Jatipulo',
    kelurahan: 'Jatipulo',
    kecamatan: 'Palmerah',
    kota: 'Jakarta Barat',
    provinsi: 'DKI Jakarta',
    kodePos: '11430',
  },
  visi: 'Terwujudnya murid yang Berakhlak Mulia, Cerdas Literasi dan Numerasi, Inovatif, Berwawasan Global, dan Peduli Lingkungan.',
  misi: [
    'Menanamkan nilai keimanan, ketakwaan, dan akhlak mulia melalui pembiasaan karakter dalam kehidupan sehari-hari.',
    'Meningkatkan kemampuan literasi dan numerasi melalui pembelajaran yang berkualitas, menyenangkan, dan berpusat pada murid.',
    'Mengembangkan kreativitas, inovasi, dan berpikir kritis melalui kegiatan belajar yang aktif dan berbasis proyek.',
    'Menumbuhkan wawasan global dengan sikap toleransi, menghargai keberagaman, dan memanfaatkan teknologi informasi secara bijaksana.',
    'Menumbuhkan kepedulian lingkungan melalui pembiasaan hidup bersih, sehat, hemat sumber daya, dan kegiatan pelestarian lingkungan.',
    'Mewujudkan budaya sekolah yang aman, nyaman, inklusif, dan kolaboratif melalui kemitraan sekolah, orang tua, dan masyarakat.',
  ],
  tujuan: [
    'Meningkatkan mutu lulusan yang berkarakter dan berprestasi.',
    'Mengembangkan potensi peserta didik secara utuh sesuai bakat dan minat.',
    'Meningkatkan sarana dan prasarana pendukung proses belajar mengajar.',
  ],
  kontak: {
    telepon: '0812-1272-2758',
    telepon2: '0856-9107-4386',
    whatsapp: '0812-1272-2758',
    whatsapp2: '0856-9107-4386',
    email: 'sdnjatipulo07@gmail.com',
    googleMapsEmbedUrl: 'https://www.google.com/maps?q=SDN+Jatipulo+07+Pagi+Palmerah+Jakarta+Barat&output=embed',
  },
  jamKerja: [
    { hari: 'Senin - Kamis', jam: '06.30 - 15.00 WIB' },
    { hari: 'Jumat', jam: '06.30 - 14.30 WIB' },
    { hari: 'Sabtu - Minggu', jam: 'Libur' },
  ],
  mediaSosial: [
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/sdn_jatipulo07',
      handle: '@sdn_jatipulo07',
    },
    {
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@sdnjatipulo07_',
      handle: '@sdnjatipulo07_',
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/@sdnjatipulo07?si=cKkiJFG-U1qXnRNu',
      handle: '@sdnjatipulo07',
    },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/share/16PWfNsgDAz/',
      handle: 'SDN Jatipulo 07 Jakarta',
    },
  ],
};
