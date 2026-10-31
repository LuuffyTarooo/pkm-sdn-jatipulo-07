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
  breadcrumbs?: BreadcrumbItem[];
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
  breadcrumbs,
}: HeroBannerProps) {
  return (
    <section className="relative w-full pt-[96px] sm:pt-[108px] pb-9 sm:pb-12 px-4 text-white text-center overflow-hidden bg-black">
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
            className="object-cover object-[center_35%]"
          />

          {/* 2. Overlay Hitam Halus Ringan */}
          <div
            className="absolute inset-0 bg-black/30 pointer-events-none"
            aria-hidden="true"
          />

          {/* 3. Gradasi Sinematik Hitam Vertikal (Lembut & Tidak Terlalu Kontras) */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/65 pointer-events-none"
            aria-hidden="true"
          />

          {/* 4. Gradasi Sinematik Hitam Horizontal Halus */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 z-0 bg-neutral-950"
          aria-hidden="true"
        />
      )}

      {/* Konten Utama Hero */}
      <div className="relative z-10 container mx-auto max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
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
          <p className="font-heading text-xs font-semibold tracking-[0.22em] text-[#7dd3fc] uppercase mb-2">
            {badge}
          </p>
        )}

        {/* Judul: Font Montserrat, Proporsional & Berwibawa */}
        <h1 className="font-heading text-2xl sm:text-3xl md:text-[2rem] font-bold text-white tracking-tight leading-snug mb-2.5">
          {title}
        </h1>

        {/* Subtitle: Font Plus Jakarta Sans, Jelas & Nyaman Dibaca */}
        {subtitle && (
          <p className="font-sans text-xs sm:text-sm md:text-[15px] text-neutral-100 font-normal max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
