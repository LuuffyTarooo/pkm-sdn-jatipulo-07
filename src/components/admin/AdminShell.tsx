'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Jika halaman login, jangan render layout dashboard
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Tentukan judul header berdasarkan URL
  const getPageTitle = () => {
    if (pathname === '/admin/dashboard') return 'Dashboard Ringkasan';
    if (pathname.startsWith('/admin/berita')) return 'Manajemen Berita';
    if (pathname.startsWith('/admin/galeri')) return 'Manajemen Galeri';
    if (pathname.startsWith('/admin/pengumuman')) return 'Manajemen Pengumuman';
    if (pathname.startsWith('/admin/profil')) return 'Manajemen Profil Sekolah';
    if (pathname.startsWith('/admin/pengaturan')) return 'Pengaturan Akun & Password';
    return 'Panel Administrasi';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-800">
      {/* Sidebar Navigasi */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        <AdminHeader
          title={getPageTitle()}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
