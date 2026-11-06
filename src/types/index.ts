/**
 * Definisi tipe data (TypeScript) untuk website SDN Jatipulo 07 Jakarta
 */

// Tipe Kategori untuk Guru & Tenaga Kependidikan
export type KategoriGuru = 'pimpinan' | 'guru-kelas' | 'guru-mapel' | 'staf';

// Tipe untuk Guru & Tenaga Kependidikan
export interface Guru {
  id: string;
  nama: string;
  nip?: string;
  jabatan: string;
  kategori?: KategoriGuru;
  mataPelajaran?: string;
  kelasDiampu?: string;
  pendidikanTerakhir?: string;
  email?: string;
  kataMutiara?: string;
  foto: string;
  urutan?: number;
}

// Tipe untuk Sarana & Prasarana / Fasilitas
export interface Fasilitas {
  id: string;
  nama: string;
  deskripsi: string;
  foto: string;
  kategori?: string;
}

// Tipe Kategori Ekstrakurikuler
export type KategoriEkskul = 'Wajib' | 'Olahraga' | 'Bela Diri' | 'Seni & Budaya' | 'Keagamaan';

// Tipe untuk Kegiatan Ekstrakurikuler
export interface Ekskul {
  id: string;
  nama: string;
  deskripsi: string;
  pembina?: string;
  jadwal?: string;
  foto: string;
  kategori?: KategoriEkskul;
  tempat?: string;
  sasaran?: string;
  prestasi?: string;
}

// Tipe untuk Prestasi Sekolah & Siswa
export interface Prestasi {
  id: string;
  judul: string;
  kategori: 'Akademik' | 'Non-Akademik';
  tingkat: 'Kecamatan' | 'Kota' | 'Provinsi' | 'Nasional' | 'Internasional';
  tahun: string;
  peraih: string;
  deskripsi?: string;
  foto: string;
}

// Kategori Berita yang didukung
export type KategoriBerita = 'Berita' | 'Pengumuman' | 'Agenda';

// Tipe untuk Artikel Berita, Pengumuman, dan Agenda
export interface Berita {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: KategoriBerita;
  penulis: string;
  tanggal: string; // Format ISO string atau YYYY-MM-DD
  gambarUtama: string;
  tags?: string[];
  isPinned?: boolean;
}

// Tipe untuk Item Foto di Galeri
export interface FotoGaleri {
  id: string;
  judul: string;
  deskripsi?: string;
  foto: string;
  kategori?: string;
  tanggal?: string;
}

// Tipe untuk Program Rutin / Pembiasaan Siswa
export interface ProgramRutin {
  id: string;
  nama: string;
  deskripsi: string;
  jadwal: string; // Misal: "Setiap Senin", "Setiap Jumat"
  foto?: string;
}

// Tipe untuk Menu Navigasi (Navbar & Footer)
export interface SubMenuNavigasi {
  label: string;
  href: string;
  deskripsi?: string;
}

export interface MenuNavigasi {
  label: string;
  href: string;
  isExternal?: boolean;
  isCta?: boolean;
  children?: SubMenuNavigasi[];
}

// Tipe untuk Media Sosial Sekolah
export interface MediaSosial {
  platform: 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'tiktok';
  url: string;
  handle: string;
}

// Tipe untuk Jam Operasional Sekolah
export interface JamKerja {
  hari: string;
  jam: string;
}

// Tipe untuk Identitas & Profil Lengkap Sekolah
export interface DataSekolah {
  identitas: {
    nama: string;
    npsn: string;
    akreditasi: string;
    kurikulum: string;
    alamat: string;
    kelurahan: string;
    kecamatan: string;
    kota: string;
    provinsi: string;
    kodePos: string;
  };
  visi: string;
  misi: string[];
  tujuan?: string[];
  kontak: {
    telepon: string;
    whatsapp?: string;
    email: string;
    googleMapsEmbedUrl: string;
  };
  jamKerja: JamKerja[];
  mediaSosial: MediaSosial[];
}
