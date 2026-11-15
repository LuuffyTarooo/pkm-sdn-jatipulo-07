import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getAllBerita, saveBerita } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const items = getAllBerita(true);
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
    }

    const body = await request.json();
    const { judul, ringkasan, konten, kategori, penulis, tanggal, gambarUtama, tags, status, isPinned, sumber, sumberUrl } = body;

    if (!judul || !ringkasan || !konten || !kategori || !tanggal || !gambarUtama) {
      return NextResponse.json(
        { success: false, error: 'Harap lengkapi semua field yang wajib diisi.' },
        { status: 400 }
      );
    }

    // Buat slug bersih dari judul
    const baseSlug = judul
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const id = saveBerita({
      slug,
      judul,
      ringkasan,
      konten,
      kategori,
      penulis: penulis || 'Humas SDN Jatipulo 07',
      tanggal,
      gambarUtama,
      tags: Array.isArray(tags) ? tags : [],
      status: status === 'draft' ? 'draft' : 'published',
      isPinned: Boolean(isPinned),
      sumber,
      sumberUrl,
    });

    return NextResponse.json({ success: true, message: 'Berita berhasil disimpan.', id });
  } catch (error) {
    console.error('Error simpan berita:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat menyimpan berita.' },
      { status: 500 }
    );
  }
}
