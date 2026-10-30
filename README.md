<div align="center">

# 🏫 Website Profil Resmi SDN Jatipulo 07 Jakarta

**Aplikasi Web Profil Sekolah Berbasis Next.js 16, React 19, TypeScript, & Tailwind CSS v4**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Status-Production_Ready-emerald?style=for-the-badge)](https://github.com/)

</div>

---

## 📌 Tentang Proyek

Proyek ini merupakan **Website Resmi Profil SDN Jatipulo 07 Jakarta Barat** yang dikembangkan sebagai proyek kolaboratif kelompok. Website ini dirancang untuk menyajikan informasi publik satuan pendidikan secara komprehensif, transparan, dan interaktif bagi peserta didik, orang tua/wali murid, serta masyarakat luas.

Mengadopsi standar **UI/UX Modern**, website ini menyajikan navigasi responsif, tata letak proporsional, serta performa tinggi dengan *Zero-Database Flat Architecture* berbasis TypeScript.

---

## ✨ Fitur-Fitur Utama

- ⚡ **Next.js 16 (Turbopack) & React 19**: Rendering kilat dengan arsitektur App Router dan optimasi gambar bawaan (`next/image`).
- 🎨 **Desain Responsif & Bersih**: Dibangun menggunakan Tailwind CSS v4 dengan palet identitas institusi (*Emerald Academy & Gold Accent*).
- 📰 **Seksi Berita & Pengumuman**: Dilengkapi filter tab interaktif (*Semua, Berita, Pengumuman, Agenda*) dengan live counter.
- 👩‍🏫 **Direktori Pendidik & Tenaga Kependidikan**: Galeri kartu guru lengkap dengan mata pelajaran, NIP/status, dan foto resmi.
- 🏆 **Kesiswaan Lengkap**: Informasi program pembiasaan rutin karakter, ekstrakurikuler, dan rekam jejak prestasi siswa.
- 🏛️ **Fasilitas & Sarana Prasarana**: Katalog ruang belajar, laboratorium, perpustakaan, dan fasilitas penunjang.
- 📸 **Galeri Dokumentasi**: Album dokumentasi foto kegiatan sekolah yang rapi dan interaktif.
- 📍 **Pusat Informasi & Kontak**: Integrasi Google Maps embed, formulir pesan, jadwal operasional, dan shortcut WhatsApp resmi.
- 🔍 **SEO & Metadata Siap Pakai**: Mendukung OpenGraph, Twitter Card, `sitemap.xml`, dan `robots.txt` otomatis.

---

## 🛠️ Tech Stack & Dependensi

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework Utama** | Next.js 16.4.3 (App Router) | Server-Side Rendering (SSR) & Static Site Generation (SSG) dengan Turbopack |
| **Library UI** | React 19.3.0 | Komponen antarmuka modern dan interaktif |
| **Bahasa Pemrograman**| TypeScript 5.x | *Type safety*, keandalan kode, dan kemudahan kolaborasi tim |
| **Styling** | Tailwind CSS v4 | Framework utility-first CSS terbaru dengan performa Lightning CSS |
| **Font Family** | Google Fonts (`next/font`) | Plus Jakarta Sans (Body) & Montserrat (Heading) |
| **Linter** | ESLint 9 (Next.js Config) | Standarisasi dan konsistensi penulisan kode |

---

## 🗺️ Peta Rute Halaman (*Route Map*)

| No | URL Rute | Halaman | Deskripsi |
| :-: | :--- | :--- | :--- |
| 1 | `/` | **Beranda** | Hero banner utama, sambutan kepala sekolah, visi-misi, berita terbaru, dan kontak ringkas |
| 2 | `/profil` | **Profil Sekolah** | Visi, misi, dan sambutan kepala sekolah |
| 3 | `/guru-dan-staf` | **Guru & Staf** | Direktori profil dewan guru dan tenaga kependidikan |
| 4 | `/sarana-prasarana` | **Sarana Prasarana** | Daftar fasilitas ruang belajar dan penunjang akademik |
| 5 | `/kesiswaan/program-rutin` | **Program Rutin** | Kegiatan pembiasaan karakter harian/mingguan siswa |
| 6 | `/kesiswaan/ekstrakurikuler` | **Ekstrakurikuler** | Ragam kegiatan pengembangan bakat dan minat peserta didik |
| 7 | `/kesiswaan/prestasi` | **Prestasi Siswa** | Dokumentasi kejuaraan akademik dan non-akademik |
| 8 | `/berita` | **Berita & Pengumuman** | Arsip lengkap publikasi warta, pengumuman, dan agenda |
| 9 | `/berita/[slug]` | **Detail Berita** | Halaman artikel dinamis dengan rekomendasi berita terkait |
| 10 | `/galeri` | **Galeri Foto** | Dokumentasi album foto kegiatan belajar & acara sekolah |
| 11 | `/hubungi-kami` | **Hubungi Kami** | Informasi alamat, Google Maps, media sosial, dan formulir pesan |
| 12 | `/sitemap.xml` | **Sitemap Otomatis** | Indeks URL untuk optimasi mesin pencari |
| 13 | `/robots.txt` | **Robots File** | Konfigurasi indexing crawler web |

---

## 📂 Struktur Proyek (*Directory Tree*)

```text
web-sdn-jatipulo07/
├── public/                     # Aset statis publik
│   ├── favicon.ico
│   └── images/                 # Gambar logo, hero, kepala sekolah, fasilitas, dll.
├── src/
│   ├── app/                    # Next.js App Router (Halaman & Layout)
│   │   ├── layout.tsx          # Root Layout (Header, Footer, Floating Shortcut)
│   │   ├── page.tsx            # Beranda Utama
│   │   ├── globals.css         # Styling global Tailwind CSS v4
│   │   ├── profil/             # Halaman Profil Sekolah
│   │   ├── guru-dan-staf/      # Halaman Direktori Guru
│   │   ├── sarana-prasarana/   # Halaman Fasilitas
│   │   ├── kesiswaan/          # Halaman Kesiswaan (Program, Ekskul, Prestasi)
│   │   ├── berita/             # Halaman Arsip & Detail Artikel
│   │   ├── galeri/             # Halaman Galeri Dokumentasi
│   │   ├── hubungi-kami/       # Halaman Kontak & Lokasi
│   │   ├── sitemap.ts          # Generator sitemap.xml
│   │   └── robots.ts           # Generator robots.txt
│   ├── components/             # Komponen UI modular
│   │   ├── layout/             # Header, Navbar, Footer
│   │   ├── sections/           # BannerUtama, SambutanKepsek, VisiMisi, BeritaTerbaru, dll.
│   │   ├── cards/              # BeritaCard, GuruCard, FasilitasCard, dll.
│   │   └── ui/                 # HeroBanner, SocialSidebar, Modal, dll.
│   ├── data/                   # Sumber data konten terpusat (Flat TypeScript Data)
│   │   ├── sekolah.ts          # Profil identitas, visi-misi, kontak resmi
│   │   ├── guru.ts             # Data guru & staf
│   │   ├── berita.ts           # Data berita & pengumuman
│   │   ├── fasilitas.ts        # Data sarana & prasarana
│   │   ├── kesiswaan.ts        # Data kesiswaan & pembiasaan
│   │   └── galeri.ts           # Data album dokumentasi
│   ├── lib/                    # Helper utility (formatting tanggal, helpers)
│   └── types/                  # Definisi TypeScript interfaces & types
├── .env.example                # Contoh environment variable
├── next.config.ts              # Konfigurasi Next.js
├── package.json                # Manifest dependensi & skrip npm
├── tsconfig.json               # Konfigurasi TypeScript
└── README.md                   # Dokumentasi proyek kelompok
```

---

## 🚀 Panduan Memulai (*Getting Started*)

### 1. Prasyarat Sistem
Pastikan telah menginstal:
- **Node.js**: versi `v18.18.0` atau lebih baru (Disarankan versi LTS terbaru `v20.x` atau `v22.x`)
- **npm**: versi `v10.x` atau lebih baru (atau pnpm/yarn)
- **Git**

### 2. Kloning Repositori
```bash
git clone https://github.com/username-kelompok/web-sdn-jatipulo07.git
cd web-sdn-jatipulo07
```

### 3. Pasang Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variable
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```
Sesuaikan variabel jika diperlukan:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser dan akses [http://localhost:3000](http://localhost:3000).

### 6. Uji Build Produksi
Pastikan tidak ada galat TypeScript maupun linting sebelum melakukan push ke GitHub:
```bash
# Verifikasi linting kode
npm run lint

# Uji compile static export build
npm run build

# Menjalankan hasil build lokal
npm run start
```

---

## 👥 Tim Pengembang (Kelompok)

| No | Foto | Nama Lengkap | NIM | Peran / Kontribusi |
| :-: | :-: | :--- | :---: | :--- |
| 1 | 👨‍💻 | **Fajar** | *(Isi NIM)* | **Project Lead & Frontend Developer**<br>Arsitektur Next.js, Routing, & State Management |
| 2 | 👨‍💻 | **[Nama Anggota 2]** | *(Isi NIM)* | **UI/UX Designer & Frontend**<br>Desain Komponen, Styling Tailwind, & Responsivitas |
| 3 | 👨‍💻 | **[Nama Anggota 3]** | *(Isi NIM)* | **Content Specialist & Data Integration**<br>Manajemen Data Sekolah, Penulisan Berita & Aset |
| 4 | 👨‍💻 | **[Nama Anggota 4]** | *(Isi NIM)* | **Quality Assurance & Testing**<br>Pengujian Responsif, Cross-Browser, & Dokumentasi |

*(Silakan sesuaikan data anggota kelompok, NIM, dan pembagian tugas di atas sebelum presentasi)*

---

## 🤝 Panduan Kolaborasi Git (*Git Workflow*)

Untuk menjaga kerapian riwayat komit tim di GitHub:

1. **Buat Branch Baru untuk Setiap Fitur:**
   ```bash
   git checkout -b feature/nama-fitur
   ```
2. **Format Pesan Komit yang Disarankan (Conventional Commits):**
   - `feat: tambah seksi galeri kegiatan`
   - `fix: perbaiki padding antarseksi profil`
   - `style: perbarui warna button kontak`
   - `docs: perbarui dokumentasi readme`
3. **Push & Buat Pull Request (PR):**
   ```bash
   git push origin feature/nama-fitur
   ```
4. Diskusikan dan lakukan *Code Review* sebelum melakukan merge ke branch `main`/`master`.

---

## 📄 Lisensi & Hak Cipta

Proyek ini dikembangkan untuk keperluan akademik dan pendidikan. Seluruh hak cipta materi, logo, dan identitas institusi dimiliki oleh **SDN Jatipulo 07 Jakarta Barat**.

<div align="center">
  <p>Dibuat dengan ❤️ untuk kemajuan pendidikan Indonesia</p>
</div>
