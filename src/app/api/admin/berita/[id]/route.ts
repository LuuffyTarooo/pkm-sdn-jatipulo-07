import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getBeritaById, saveBerita, deleteBerita } from '@/lib/db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const { id } = await params;
  const item = getBeritaById(id);
  if (!item) {
    return NextResponse.json({ success: false, error: 'Berita tidak ditemukan.' }, { status: 404 });
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
    const existing = getBeritaById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Berita tidak ditemukan.' }, { status: 404 });
    }

    const body = await request.json();
    const { slug, judul, ringkasan, konten, kategori, penulis, tanggal, gambarUtama, tags, status, isPinned, sumber, sumberUrl } = body;

    saveBerita({
      id,
      slug: slug || existing.slug,
      judul: judul || existing.judul,
      ringkasan: ringkasan || existing.ringkasan,
      konten: konten || existing.konten,
      kategori: kategori || existing.kategori,
      penulis: penulis || existing.penulis,
      tanggal: tanggal || existing.tanggal,
      gambarUtama: gambarUtama || existing.gambarUtama,
      tags: Array.isArray(tags) ? tags : existing.tags,
      status: status === 'draft' ? 'draft' : 'published',
      isPinned: Boolean(isPinned),
      sumber,
      sumberUrl,
    });

    return NextResponse.json({ success: true, message: 'Berita berhasil diperbarui.' });
  } catch (error) {
    console.error('Error update berita:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memperbarui berita.' },
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
  const deleted = deleteBerita(id);
  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Gagal menghapus berita.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: 'Berita berhasil dihapus.' });
}
