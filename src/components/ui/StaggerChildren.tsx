'use client';

/**
 * StaggerChildren — Wrapper animasi stagger cascade untuk grid card/item.
 *
 * Standar Kecepatan UI/UX:
 * - Durasi transisi kartu: 440ms
 * - Jeda antar-kartu (stagger interval): 80ms (ritme air terjun alami, tidak draggy)
 * - Jarak pergeseran: 22px
 * - Easing: cubic-bezier(0.16, 1, 0.3, 1)
 */

import { useEffect, useRef, ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  baseDelay?: number;    // ms, delay item pertama (default 50)
  staggerDelay?: number; // ms, selisih antar item (default 80)
  duration?: number;     // ms, durasi fade (default 440)
  variant?: 'fade-up' | 'fade' | 'zoom';
  className?: string;
  threshold?: number;
}

export default function StaggerChildren({
  children,
  baseDelay = 50,
  staggerDelay = 80,
  duration = 440,
  variant = 'fade-up',
  className = '',
  threshold = 0.08,
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];
    if (items.length === 0) return;

    const translateMap = {
      'fade-up': 'translateY(22px)',
      'fade':    'none',
      'zoom':    'scale(0.95)',
    };

    // 1. Matikan transisi & set posisi awal tersembunyi secara instan
    items.forEach((item) => {
      item.style.transition = 'none';
      item.style.opacity = '0';
      item.style.transform = translateMap[variant];
    });

    // 2. Force reflow agar browser mencatat posisi awal
    void container.offsetHeight;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // 3. Observer memicu stagger cascade
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          observer.disconnect();

          items.forEach((item, i) => {
            const delay = baseDelay + i * staggerDelay;
            const t = setTimeout(() => {
              item.style.transitionProperty = 'opacity, transform';
              item.style.transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';
              item.style.transitionDuration = `${duration}ms`;
              item.style.opacity = '1';
              item.style.transform = 'none';
            }, delay);
            timers.push(t);
          });
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(container);

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, [baseDelay, staggerDelay, duration, variant, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
