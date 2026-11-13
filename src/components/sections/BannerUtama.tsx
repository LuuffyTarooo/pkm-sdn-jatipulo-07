'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Komponen Banner Utama / Hero Section Sinematik Hitam (Client Component)
 * - Foto udara gedung SDN Jatipulo 07 Jakarta sebagai background full-screen (100svh)
 * - Lapisan overlay sinematik warna hitam (Black Gradient) yang netral, tajam, dan elegan
 * - Tipografi berkarakter: Eyebrow uppercase Sky-Navy (#7dd3fc), Judul Montserrat putih tebal, Deskripsi bersih
 * - Tombol CTA Royal Academic Navy (#1d4e78) dengan aksen Sky Mist (#7dd3fc) dan teks putih bersih
 * - Animasi entrance stagger: eyebrow → judul → deskripsi → tombol (cascade)
 */
export default function BannerUtama() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [
      { el: eyebrowRef.current, delay: 60 },
      { el: h1Ref.current,      delay: 180 },
      { el: descRef.current,    delay: 300 },
      { el: ctaRef.current,     delay: 420 },
    ];

    // Set initial hidden state
    els.forEach(({ el }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transitionProperty = 'opacity, transform';
      el.style.transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transitionDuration = '480ms';
    });

    // Trigger animations sequentially
    const timers: ReturnType<typeof setTimeout>[] = [];
    els.forEach(({ el, delay }) => {
      if (!el) return;
      const t = setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden bg-black">
      {/* 1. Foto Background Udara Sekolah */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-image.webp"
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
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 via-55% to-transparent pointer-events-none" /* taste-skill-ignore: cinematic scrim over hero photo */
          aria-hidden="true"
        />

        {/* 4. Gradient Vertikal Hitam: Bayangan di Atas (untuk Header) & Bawah (Transisi ke Konten) */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent via-40% to-black/75 pointer-events-none" /* taste-skill-ignore: cinematic scrim over hero photo */
          aria-hidden="true"
        />
      </div>

      {/* Konten Hero Teks (Sisi Kiri, 5vw dari viewport, vertikal di tengah) */}
      <div className="relative z-10 w-full px-[5vw] pt-[100px] pb-16 flex flex-col justify-center">
        <div className="max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" /* taste-skill-ignore: text legibility over photo */>
          {/* Eyebrow: Montserrat huruf kapital berjarak renggang dengan aksen Sky-Navy Cerah */}
          <p
            ref={eyebrowRef}
            className="font-heading text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#7dd3fc] uppercase mb-3 sm:mb-4"
          >
            SELAMAT DATANG DI
          </p>

          {/* Judul: Font Heading Modern Montserrat, Tebal, Berkarakter, Bersih */}
          <h1
            ref={h1Ref}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold text-white tracking-tight leading-[1.08] mb-5"
          >
            SDN Jatipulo 07 Jakarta
          </h1>

          {/* Deskripsi: Sans-serif Bersih Plus Jakarta Sans */}
          <p
            ref={descRef}
            className="font-sans text-base sm:text-lg md:text-xl text-neutral-200 font-normal leading-relaxed mb-8 sm:mb-10 max-w-xl"
          >
            Membangun generasi cerdas, berkarakter mulia, dan berprestasi unggul.
          </p>

          {/* Tombol CTA: Royal Academic Navy (#1d4e78) dengan aksen Sky Mist (#7dd3fc) */}
          <div ref={ctaRef}>
            <Link
              href="/profil"
              className="inline-flex items-center gap-3 bg-[#1d4e78] hover:bg-[#163d63] text-white font-semibold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full transition-colors border border-[#7dd3fc]/40 text-base group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
            >
              <span>Lihat Profil Sekolah</span>
              <svg
                className="w-5 h-5 text-[#7dd3fc] transition-transform duration-150 group-hover:translate-x-1"
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
