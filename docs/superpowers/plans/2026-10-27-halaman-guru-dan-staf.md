# Halaman Guru & Staf SDN Jatipulo 07 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

Rencana implementasi tampilan halaman Guru dan Tenaga Kependidikan untuk website SDN Jatipulo 07 Jakarta dengan mengaplikasikan standar **UI/UX Pro Max** (hierarki visual yang jelas, tipografi proporsional, palet warna sekolah yang harmonis, kartu profil interaktif dengan filter kategori & pencarian real-time, status badge, serta fallback avatar yang elegan).

---

## User Review Required

> [!IMPORTANT]
> - Foto profil guru & staf akan menggunakan gambar placeholder profesional dan seragam (SVG/avatar ilustratif yang elegan serta foto beresolusi teruji) yang mudah diganti kemudian hari oleh sekolah.
> - Data mencakup Kepala Sekolah, Guru Kelas I - VI, Guru Mata Pelajaran (Agama Islam, Agama Kristen, PJOK, Bahasa Inggris), dan Staf Administrasi / Penunjang (Tenaga Administrasi Sekolah, Pustakawan, Pengelola IT, Petugas Kebersihan & Keamanan).

---

## Proposed Changes

### 1. Types & Data
#### [src/types/index.ts](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/types/index.ts)
- Tambahkan field opsional pada interface `Guru`:
  - `kategori`: `'pimpinan' | 'guru-kelas' | 'guru-mapel' | 'staf'`
  - `pendidikanTerakhir?: string`
  - `kelasDiampu?: string`
  - `email?: string`
  - `kataMutiara?: string`

#### [src/data/guru.ts](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/data/guru.ts)
- Mengisi data lengkap realistis untuk dewan guru dan tenaga kependidikan SDN Jatipulo 07 Jakarta:
  - Kepala Sekolah (featured profile)
  - Guru Kelas I s.d. VI (Paralel A dan B)
  - Guru Bidang Studi (Pendidikan Agama, PJOK)
  - Tenaga Kependidikan / Tata Usaha & Tim Operasional
- Menyediakan metadata kategori dan statistik ringkasan guru.

---

### 2. UI Components & Enhancements
#### [src/components/ui/HeroBanner.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/components/ui/HeroBanner.tsx)
- Sesuaikan `HeroBanner` agar memiliki variasi background navy yang selaras dengan `Header` transparan (`absolute top-0` dengan teks putih) dan memiliki padding atas (`pt-[110px]`) agar tidak tertabrak atau terpotong oleh navbar.

#### [src/components/cards/GuruCard.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/components/cards/GuruCard.tsx)
- Redesain `GuruCard` sesuai prinsip UI/UX Pro Max:
  - Card elevation lembut dengan hover effect halus (transform scale halus, shadow elevation, border highlight biru primer).
  - Avatar wrapper dengan fallback avatar ilustratif bergradien elegan jika foto belum tersedia.
  - Badge kategori dan kelas/mapel dengan kode warna tematik (emerald untuk pimpinan/kelas, amber/indigo untuk mapel, slate untuk staf).
  - Tampilan NIP dan gelar pendidik yang rapi dan terstruktur.
  - Quick action: badge info pendidikan dan sambutan/motto singkat.

#### Komponen Baru: [src/components/sections/GuruDirectory.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/components/sections/GuruDirectory.tsx)
- Komponen interaktif Client Component:
  - Filter Tabs kategori: "Semua", "Pimpinan", "Guru Kelas", "Guru Mapel", "Tenaga Kependidikan"
  - Search Input: live search berdasarkan nama atau jabatan/mata pelajaran
  - Counter jumlah guru & staf yang sedang tampil
  - Featured Spotlight untuk Kepala Sekolah di baris teratas
  - Grid card guru dengan animasi transisi yang mulus
  - Empty state bersahabat saat pencarian tidak menemukan hasil

---

### 3. Page Layout
#### [src/app/guru-dan-staf/page.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/app/guru-dan-staf/page.tsx)
- Mengintegrasikan:
  - Hero banner tematik pendidik dengan badge dan deskripsi hangat
  - Stats Bar ringkas (Jumlah Tenaga Pendidik, Tenaga Kependidikan, Tingkat Kualifikasi, dll.)
  - Komponen `GuruDirectory` dengan fitur pencarian dan filter
  - Seksi Nilai Dedikasi Pendidik ("Nilai Utama Pengabdian Kami")
  - Metadata SEO yang lengkap

---

## Verification Plan

### Automated / Build Verification
- Jalankan TypeScript check dan Next.js build:
  ```powershell
  npm run build
  ```
- Pastikan tidak ada type error atau broken links.

### Visual & Interactive Verification
- Uji navigasi ke `/guru-dan-staf`
- Uji filter tab per kategori
- Uji fitur pencarian teks real-time
- Uji responsivitas pada layar mobile (375px), tablet, dan desktop (1280px+)
- Pastikan kontras teks memenuhi standar WCAG (rasio >= 4.5:1)

