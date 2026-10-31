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
  const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
    default: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
    success: 'bg-[#eff6ff] text-[#0f2d4a] border border-[#bfdbfe]',
    warning: 'bg-slate-100 text-[#0f2d4a] border border-slate-300',
    info: 'bg-[#eff6ff] text-[#1d4e78] border border-[#bfdbfe]',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 text-xs font-semibold rounded-full border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
