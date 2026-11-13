'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  breadcrumbs?: BreadcrumbItem[];
  preserveSpacing?: boolean;
  highContrast?: boolean;
}

/**
 * Komponen Banner Hero Sub-Page Sinematik Hitam (Client Component)
 * - Foto latar belakang gedung sekolah tampak samping (gedung-tampak-samping.jpeg)
 * - Lapisan overlay gradasi warna hitam halus (Black Gradient) yang netral dan tidak terlalu kontras
 * - Foto gedung sekolah tetap terlihat jelas, hidup, dan alami
 * - Skala tipografi proporsional (Montserrat & Plus Jakarta Sans) dengan keterbacaan maksimal
 * - Animasi stagger dinamis: breadcrumbs/badge -> judul -> subtitle di setiap halaman sub-page
 */
export default function HeroBanner({
  title,
  subtitle,
  badge,
  backgroundImage = '/images/hero/gedung-tampak-samping.webp',
  backgroundPosition = 'object-[center_35%]',
  breadcrumbs,
  preserveSpacing = false,
  highContrast = false,
}: HeroBannerProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [
      { el: badgeRef.current, delay: 40 },
      { el: titleRef.current, delay: 140 },
      { el: subtitleRef.current, delay: 240 },
    ];

    // Set initial hidden state
    els.forEach(({ el }) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
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
  }, [title]);

  const spacingClasses = preserveSpacing
    ? 'min-h-[260px] sm:min-h-[290px] md:min-h-[320px] pt-[114px] sm:pt-[134px] md:pt-[148px] pb-10 sm:pb-12 md:pb-14'
    : 'min-h-[240px] sm:min-h-[270px] md:min-h-[300px] pt-[108px] sm:pt-[126px] md:pt-[140px] pb-9 sm:pb-11 md:pb-12';

  return (
    <section
      className={`relative w-full ${spacingClasses} flex flex-col justify-center items-center px-4 text-white text-center overflow-hidden bg-black`}
    >
      {/* 1. Latar Belakang Gambar / Foto Gedung */}
      {backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            preload
            sizes="100vw"
            quality={90}
            className={`object-cover ${backgroundPosition} animate-subtle-zoom`}
          />

          {/* 2. Overlay Hitam Halus / Kontras Seimbang */}
          <div
            className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
              highContrast ? 'bg-black/38' : 'bg-black/30'
            }`}
            aria-hidden="true"
          />

          {/* 3. Gradasi Sinematik Hitam Vertikal */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              highContrast
                ? 'bg-gradient-to-b from-black/70 via-black/30 to-black/75' /* taste-skill-ignore: cinematic scrim over photo */
                : 'bg-gradient-to-b from-black/60 via-black/25 to-black/65' /* taste-skill-ignore: cinematic scrim over photo */
            }`}
            aria-hidden="true"
          />

          {/* 4. Gradasi Sinematik Hitam Horizontal */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              highContrast
                ? 'bg-gradient-to-r from-black/42 via-transparent to-black/42' /* taste-skill-ignore: cinematic scrim over photo */
                : 'bg-gradient-to-r from-black/35 via-transparent to-black/35' /* taste-skill-ignore: cinematic scrim over photo */
            }`}
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 z-0 bg-neutral-950"
          aria-hidden="true"
        />
      )}

      {/* Konten Utama Hero - Tepat di Tengah Vertikal & Horizontal */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col items-center justify-center text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" /* taste-skill-ignore: text legibility over photo */>
        {/* Breadcrumb / Eyebrow Container */}
        <div ref={badgeRef} className="flex flex-col items-center">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-2 sm:mb-2.5">
              <ol className="inline-flex items-center justify-center gap-1.5 text-xs text-neutral-300 font-sans">
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  return (
                    <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                      {index > 0 && (
                        <span className="text-[#7dd3fc]/85" aria-hidden="true">
                          /
                        </span>
                      )}
                      {item.href && !isLast ? (
                        <Link
                          href={item.href}
                          className="hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-white font-semibold">
                          {item.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          {badge && (
            <p className="font-heading text-xs font-semibold tracking-[0.22em] text-[#7dd3fc] uppercase mb-2 text-center">
              {badge}
            </p>
          )}
        </div>

        {/* Judul: Font Montserrat, Proporsional & Berwibawa */}
        <h1
          ref={titleRef}
          className="font-heading text-2xl sm:text-3xl md:text-[2rem] font-bold text-white tracking-tight leading-snug mb-2.5 text-center mx-auto max-w-2xl text-balance"
        >
          {title}
        </h1>

        {/* Subtitle: Font Plus Jakarta Sans, Jelas & Nyaman Dibaca */}
        {subtitle && (
          <p
            ref={subtitleRef}
            className="font-sans text-xs sm:text-sm md:text-[15px] text-neutral-100 font-normal max-w-xl sm:max-w-2xl mx-auto leading-relaxed text-center text-balance"
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
