import { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';

export const metadata: Metadata = {
  title: 'Admin Panel | SDN Jatipulo 07 Jakarta',
  description: 'Sistem Administrasi dan Pengelolaan Konten SDN Jatipulo 07 Jakarta.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
