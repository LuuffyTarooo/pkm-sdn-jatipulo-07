import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getGaleriById, saveGaleri, deleteGaleri } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const { id } = await params;
  const item = getGaleriById(id);
  if (!item) {
    return NextResponse.json({ success: false, error: 'Foto galeri tidak ditemukan.' }, { status: 404 });
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
    const existing = getGaleriById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Foto galeri tidak ditemukan.' }, { status: 404 });
    }

    const body = await request.json();
    const { judul, deskripsi, foto, kategori, tanggal } = body;

    saveGaleri({
      id,
      judul: judul || existing.judul,
      deskripsi: deskripsi !== undefined ? deskripsi : existing.deskripsi,
      foto: foto || existing.foto,
      kategori: kategori !== undefined ? kategori : existing.kategori,
      tanggal: tanggal !== undefined ? tanggal : existing.tanggal,
    });

    return NextResponse.json({ success: true, message: 'Foto galeri berhasil diperbarui.' });
  } catch (error) {
    console.error('Error update galeri:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memperbarui galeri.' },
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
  const deleted = deleteGaleri(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Gagal menghapus foto galeri.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: 'Foto galeri berhasil dihapus.' });
}
