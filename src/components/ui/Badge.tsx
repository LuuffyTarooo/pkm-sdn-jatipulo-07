import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

/**
 * Komponen Label / Badge UI (Server Component)
 * Digunakan untuk menampilkan kategori berita, jenjang, atau status
 */
export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant} inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${className}`}>
      {children}
    </span>
  );
}
