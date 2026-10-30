# Tampilan Beranda & Palet Warna Sekolah Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

Rencana implementasi tampilan halaman Beranda SDN Jatipulo 07 Jakarta dengan mengaplikasikan palet warna resmi:
- **Primary Brand**: `#004030` (Deep Forest / Pine Green)
- **Secondary / Accent**: `#b3cfcd` (Sage Mist / Soft Mint-Teal)
- **Surface / Background**: `#e4e9e9` (Soft Pale Ice-Teal)

Serta menyusun 4 seksi utama beranda di bawah Hero Section berstandar UI/UX Pro Max:
1. **Kata Sambutan Kepala Sekolah**
2. **Visi dan Misi**
3. **Bagian Pengumuman & Berita Terbaru**
4. **Bagian Lokasi & Kontak**

---

## User Review Required

> [!IMPORTANT]
> - Warna `#004030` menjadi warna identitas primer (judul, aksen tajam, button utama, border primer).
> - Warna `#b3cfcd` menjadi aksen sekunder (badge, outline halus, hover highlights, icon container).
> - Warna `#e4e9e9` menjadi latar seksi dan kartu alternatif untuk kontras lembut yang nyaman di mata.
> - Data berita dan pengumuman akan diisi dengan data awal yang realistis dan informatif di `src/data/berita.ts`.

---

## Proposed Changes

### 1. Color Palette Tokens
#### [src/app/globals.css](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/app/globals.css)
- Daftarkan variabel warna kustom:
  - `--color-brand-dark: #004030;`
  - `--color-brand-accent: #b3cfcd;`
  - `--color-brand-surface: #e4e9e9;`
  - Serta update skala Tailwind `@theme` agar komponen dapat memanfaatkan token ini secara langsung.

---

### 2. Beranda Sections (UI/UX Pro Max)
#### [src/components/sections/SambutanKepsek.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/components/sections/SambutanKepsek.tsx)
- Redesain tampilan sambutan kepala sekolah dengan layout editorial modern:
  - Frame foto beraksen `#004030` dan `#b3cfcd`
  - Fallback avatar elegan jika foto belum siap
  - Kutipan inspiratif terstruktur (*quote callout*)
  - Profil penandatangan (Kepala Sekolah Dra. Hj. Sri Wahyuni, M.Pd.)
  - Tombol CTA "Baca Profil Lengkap" ke `/profil`

#### [src/components/sections/VisiMisi.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/components/sections/VisiMisi.tsx)
- Desain bertingkat dengan latar `#e4e9e9`:
  - Kartu Visi Utama dengan aksen `#004030`
  - Kartu Misi Interaktif dengan nomor langkah berdesain pill `#b3cfcd`
  - 3 Nilai Inti Sekolah (Pilar Keunggulan: Religius & Berkarakter, Cerdas & Terampil, Peduli Lingkungan)

#### [src/data/berita.ts](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/data/berita.ts) & [src/components/cards/BeritaCard.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/components/cards/BeritaCard.tsx)
- Mengisi data berita, pengumuman, dan agenda sekolah di `dataBerita`.
- Menyesuaikan `BeritaCard` dengan styling baru (badge kategori `#004030` & `#b3cfcd`, transisi hover halus, teks excerpt rapi).

#### [src/components/sections/BeritaTerbaru.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/components/sections/BeritaTerbaru.tsx)
- Layout komprehensif dua bagian:
  - **Berita & Liputan Utama** (Grid kartu berita)
  - **Papan Pengumuman & Agenda Terkini** (List pengumuman penting bertanggal dengan pin aksen)
  - Tombol CTA "Jelajahi Semua Informasi"

#### [src/components/sections/LokasiKontak.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/components/sections/LokasiKontak.tsx)
- Redesain seksi lokasi & kontak:
  - Kolom kiri: Info lengkap alamat, jam operasional, kontak telepon & email, serta tombol langsung WhatsApp.
  - Kolom kanan: Peta interaktif Google Maps embed dengan koordinat SDN Jatipulo 07 Jakarta.
  - Kartu berlatar `#004030` atau aksen `#b3cfcd` untuk visibilitas dan kepastian navigasi orang tua murid.

#### [src/app/page.tsx](file:///c:/Users/fajar/OneDrive/SEMESTER%205/web-sdn-jatipulo07/src/app/page.tsx)
- Memastikan semua seksi tersusun rapi dengan ritme padding, transisi antar bagian, dan struktur semantik HTML (`<main>`, `<section aria-labelledby="...">`).

---

## Verification Plan

### Automated / Build Verification
- Jalankan TypeScript check:
  ```powershell
  npx tsc --noEmit
  ```
- Jalankan ESLint:
  ```powershell
  npm run lint
  ```
- Jalankan Next.js build:
  ```powershell
  npm run build
  ```

### Visual & Interactive Verification
- Pastikan seluruh palet warna (`#004030`, `#b3cfcd`, `#e4e9e9`) teraplikasi harmonis di setiap seksi.
- Uji responsivitas mobile (375px), tablet, dan desktop.
- Uji keterbacaan teks dan kontras rasio WCAG AAA.

