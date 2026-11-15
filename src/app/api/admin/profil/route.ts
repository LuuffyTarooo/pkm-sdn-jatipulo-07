import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getProfilSekolah, updateProfilSekolah } from '@/lib/db';
import { DataSekolah } from '@/types';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const profil = getProfilSekolah();
  return NextResponse.json({ success: true, data: profil });
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
    }

    const body = (await request.json()) as DataSekolah;
    if (!body || !body.identitas || !body.identitas.nama) {
      return NextResponse.json(
        { success: false, error: 'Format data profil sekolah tidak valid.' },
        { status: 400 }
      );
    }

    updateProfilSekolah(body);

    return NextResponse.json({ success: true, message: 'Profil sekolah berhasil diperbarui.' });
  } catch (error) {
    console.error('Error update profil sekolah:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memperbarui profil sekolah.' },
      { status: 500 }
    );
  }
}
