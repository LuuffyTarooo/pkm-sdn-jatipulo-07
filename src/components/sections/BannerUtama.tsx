import Image from 'next/image';
import Link from 'next/link';

/**
 * Komponen Banner Utama / Hero Section Sinematik Hitam (Server Component)
 * - Foto udara gedung SDN Jatipulo 07 Jakarta sebagai background full-screen (100svh)
 * - Lapisan overlay sinematik warna hitam (Black Gradient) yang netral, tajam, dan elegan
 * - Tipografi berkarakter: Eyebrow uppercase Sky-Navy (#7dd3fc), Judul Montserrat putih tebal, Deskripsi bersih
 * - Tombol CTA putih sudut membulat dengan teks Academic Navy (#0f2d4a)
 */
export default function BannerUtama() {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden bg-black">
      {/* 1. Foto Background Udara Sekolah */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-image.png"
          alt="Pemandangan Udara Gedung dan Lapangan SDN Jatipulo 07 Jakarta"
          fill
          preload
          sizes="100vw"
          quality={90}
          className="object-cover object-[60%_35%] md:object-[56%_32%]"
        />

        {/* 2. Lapisan Overlay Hitam Halus */}
        <div
          className="absolute inset-0 bg-black/25 pointer-events-none"
          aria-hidden="true"
        />

        {/* 3. Gradient Horizontal Sinematik Hitam: Kontras di Kiri untuk Teks, Jelas di Kanan untuk Foto Sekolah */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 via-55% to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* 4. Gradient Vertikal Hitam: Bayangan di Atas (untuk Header) & Bawah (Transisi ke Konten) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-40% to-black/75 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Konten Hero Teks (Sisi Kiri, 5vw dari viewport, vertikal di tengah) */}
      <div className="relative z-10 w-full px-[5vw] pt-[100px] pb-16 flex flex-col justify-center">
        <div className="max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          {/* Eyebrow: Montserrat huruf kapital berjarak renggang dengan aksen Sky-Navy Cerah */}
          <p className="font-heading text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#7dd3fc] uppercase mb-3 sm:mb-4">
            SELAMAT DATANG DI
          </p>

          {/* Judul: Font Heading Modern Montserrat, Tebal, Berkarakter, Bersih */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold text-white tracking-tight leading-[1.08] mb-5">
            SDN Jatipulo 07 Jakarta
          </h1>

          {/* Deskripsi: Sans-serif Bersih Plus Jakarta Sans */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-200 font-normal leading-relaxed mb-8 sm:mb-10 max-w-xl">
            Membangun generasi cerdas, berkarakter mulia, dan berprestasi unggul.
          </p>

          {/* Tombol CTA: Putih, Teks Academic Navy, Sudut Membulat, Ikon Panah */}
          <div>
            <Link
              href="/profil"
              className="inline-flex items-center gap-3 bg-white text-[#0f2d4a] hover:bg-[#eff6ff] font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] border border-[#bfdbfe] text-base group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
            >
              <span>Jelajahi Profil Sekolah</span>
              <svg
                className="w-5 h-5 text-[#1d4e78] transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
