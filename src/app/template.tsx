'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Template — Re-mount setiap kali berpindah halaman (berbeda dari layout yang persisten).
 * Memberikan animasi transisi masuk (fade-up glide) yang halus di setiap navigasi rute.
 * React 19 + Next.js 16 App Router.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-content animate-page-enter">
      {children}
    </div>
  );
}
