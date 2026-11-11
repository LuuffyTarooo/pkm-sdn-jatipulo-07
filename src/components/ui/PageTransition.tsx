'use client';

/**
 * PageTransition — Wrapper animasi fade-in untuk konten halaman.
 * Menggunakan CSS animation sederhana yang diaplikasikan via className,
 * kompatibel penuh dengan Next.js App Router + static export GitHub Pages.
 *
 * Cara pakai: Bungkus <main> atau konten utama halaman dengan <PageTransition>.
 */

import { ReactNode, useEffect, useRef } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset dan trigger animasi fade-up saat mount
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transitionProperty = 'opacity, transform';
    el.style.transitionTimingFunction = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    el.style.transitionDuration = '450ms';

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

