import React from 'react';
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
 * Komponen Banner Hero Sub-Page Sinematik Hitam (Server Component)
 * - Foto latar belakang gedung sekolah tampak samping (gedung-tampak-samping.jpeg)
 * - Lapisan overlay gradasi warna hitam halus (Black Gradient) yang netral dan tidak terlalu kontras
 * - Foto gedung sekolah tetap terlihat jelas, hidup, dan alami
 * - Skala tipografi proporsional (Montserrat & Plus Jakarta Sans) dengan keterbacaan maksimal
 */
export default function HeroBanner({
  title,
  subtitle,
  badge,
  backgroundImage = '/images/hero/gedung-tampak-samping.jpeg',
  backgroundPosition = 'object-[center_35%]',
  breadcrumbs,
  preserveSpacing = false,
  highContrast = false,
}: HeroBannerProps) {
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
            className={`object-cover ${backgroundPosition}`}
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
            className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
              highContrast
                ? 'bg-gradient-to-b from-black/70 via-black/30 to-black/75'
                : 'bg-gradient-to-b from-black/60 via-black/25 to-black/65'
            }`}
            aria-hidden="true"
          />

          {/* 4. Gradasi Sinematik Hitam Horizontal */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
              highContrast
                ? 'bg-gradient-to-r from-black/42 via-transparent to-black/42'
                : 'bg-gradient-to-r from-black/35 via-transparent to-black/35'
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
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col items-center justify-center text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
        {/* Breadcrumb Navigasi Halus */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-2 sm:mb-2.5">
            <ol className="inline-flex items-center justify-center gap-1.5 text-xs text-neutral-300 font-sans">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={item.label} className="inline-flex items-center gap-1.5">
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

        {/* Eyebrow / Badge dengan Aksen Sky Mist */}
        {badge && (
          <p className="font-heading text-xs font-semibold tracking-[0.22em] text-[#7dd3fc] uppercase mb-2 text-center">
            {badge}
          </p>
        )}

        {/* Judul: Font Montserrat, Proporsional & Berwibawa */}
        <h1 className="font-heading text-2xl sm:text-3xl md:text-[2rem] font-bold text-white tracking-tight leading-snug mb-2.5 text-center mx-auto max-w-2xl text-balance">
          {title}
        </h1>

        {/* Subtitle: Font Plus Jakarta Sans, Jelas & Nyaman Dibaca */}
        {subtitle && (
          <p className="font-sans text-xs sm:text-sm md:text-[15px] text-neutral-100 font-normal max-w-xl sm:max-w-2xl mx-auto leading-relaxed text-center text-balance">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
