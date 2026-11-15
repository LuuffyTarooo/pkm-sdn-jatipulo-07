import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getAllGaleri, saveGaleri } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const items = getAllGaleri();
  return NextResponse.json({ success: true, data: items });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
    }

    const body = await request.json();

    // Bisa berupa single object atau array foto (batch multi-upload)
    if (Array.isArray(body)) {
      for (const item of body) {
        if (item.foto && item.judul) {
          saveGaleri({
            judul: item.judul,
            deskripsi: item.deskripsi,
            foto: item.foto,
            kategori: item.kategori,
            tanggal: item.tanggal,
          });
        }
      }
      return NextResponse.json({ success: true, message: `${body.length} foto berhasil ditambahkan ke galeri.` });
    }

    const { judul, deskripsi, foto, kategori, tanggal } = body;
    if (!judul || !foto) {
      return NextResponse.json(
        { success: false, error: 'Judul dan file foto wajib diisi.' },
        { status: 400 }
      );
    }

    const id = saveGaleri({ judul, deskripsi, foto, kategori, tanggal });
    return NextResponse.json({ success: true, message: 'Foto berhasil disimpan ke galeri.', id });
  } catch (error) {
    console.error('Error simpan galeri:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat menyimpan foto galeri.' },
      { status: 500 }
    );
  }
}
