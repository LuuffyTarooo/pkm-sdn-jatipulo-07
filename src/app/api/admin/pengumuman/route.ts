import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getAllPengumuman, savePengumuman } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const items = getAllPengumuman(true);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
    }

    const body = await request.json();
    const { judul, konten, tanggal, status } = body;

    if (!judul || !konten || !tanggal) {
      return NextResponse.json(
        { success: false, error: 'Judul, isi pengumuman, dan tanggal wajib diisi.' },
        { status: 400 }
      );
    }

    const id = savePengumuman({
      judul,
      konten,
      tanggal,
      status: status === 'tidak_aktif' ? 'tidak_aktif' : 'aktif',
    });

    return NextResponse.json({ success: true, message: 'Pengumuman berhasil disimpan.', id });
  } catch (error) {
    console.error('Error simpan pengumuman:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat menyimpan pengumuman.' },
      { status: 500 }
    );
  }
}
