'use client';

/**
 * AnimateIn — Scroll-triggered animation berbasis CSS + Intersection Observer.
 * Zero-dependency, aman untuk static export GitHub Pages.
 *
 * Standar Kecepatan UI/UX (Nielsen Norman Group & Material Design):
 * - Durasi optimal: 460ms (sweet spot 400ms–500ms agar tidak terasa lambat atau terburu-buru)
 * - Jarak geser micro-movement: 24px (tidak terlalu jauh agar terasa natural)
 * - Easing: cubic-bezier(0.16, 1, 0.3, 1) (Swift Out: start responsif, landing lembut)
 */

import { useEffect, useRef, ReactNode, ElementType } from 'react';

type AnimateVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'zoom';

interface AnimateInProps {
  children: ReactNode;
  variant?: AnimateVariant;
  delay?: number;       // ms, delay animasi masuk (default 0)
  duration?: number;    // ms, durasi transisi (default 460)
  threshold?: number;   // 0–1, default 0.1
  className?: string;
  as?: ElementType;
}

const INITIAL_TRANSFORM: Record<AnimateVariant, string> = {
  'fade-up':    'translateY(24px)',
  'fade-down':  'translateY(-24px)',
  'fade-left':  'translateX(24px)',
  'fade-right': 'translateX(-24px)',
  'fade':       'none',
  'zoom':       'scale(0.95)',
};

export default function AnimateIn({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 460,
  threshold = 0.1,
  className = '',
  as: Tag = 'div',
}: AnimateInProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    // 1. Matikan transisi & set posisi awal tersembunyi secara instan
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = INITIAL_TRANSFORM[variant];

    // 2. Force reflow agar state tersembunyi ter-commit ke GPU/render tree
    void el.offsetHeight;

    let timerId: ReturnType<typeof setTimeout>;

    // 3. Pasang observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(el);

            // 4. Jadwalkan animasi masuk dengan timing cubic-bezier smooth
            timerId = setTimeout(() => {
              el.style.transitionProperty = 'opacity, transform';
              el.style.transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';
              el.style.transitionDuration = `${duration}ms`;
              el.style.opacity = '1';
              el.style.transform = 'none';
            }, Math.max(delay, 20));
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);

    return () => {
      clearTimeout(timerId);
      observer.disconnect();
    };
  }, [variant, delay, duration, threshold]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
