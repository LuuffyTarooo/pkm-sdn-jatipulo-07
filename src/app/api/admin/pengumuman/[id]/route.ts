import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getPengumumanById, savePengumuman, deletePengumuman } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const { id } = await params;
  const item = getPengumumanById(id);
  if (!item) {
    return NextResponse.json({ success: false, error: 'Pengumuman tidak ditemukan.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: item });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
    }

    const { id } = await params;
    const existing = getPengumumanById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Pengumuman tidak ditemukan.' }, { status: 404 });
    }

    const body = await request.json();
    const { judul, konten, tanggal, status } = body;

    savePengumuman({
      id,
      judul: judul || existing.judul,
      konten: konten || existing.konten,
      tanggal: tanggal || existing.tanggal,
      status: status || existing.status,
    });

    return NextResponse.json({ success: true, message: 'Pengumuman berhasil diperbarui.' });
  } catch (error) {
    console.error('Error update pengumuman:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memperbarui pengumuman.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deletePengumuman(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Gagal menghapus pengumuman.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: 'Pengumuman berhasil dihapus.' });
}
