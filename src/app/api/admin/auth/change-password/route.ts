import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser, verifyPassword } from '@/lib/auth';
import { getAdminUser, updateAdminPassword } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Password lama dan password baru wajib diisi.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password baru minimal harus 6 karakter.' },
        { status: 400 }
      );
    }

    const admin = getAdminUser(session.username);
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Akun admin tidak ditemukan.' }, { status: 404 });
    }

    // Verifikasi password lama
    const isOldValid = verifyPassword(oldPassword, admin.password_hash, admin.salt);
    if (!isOldValid) {
      return NextResponse.json(
        { success: false, error: 'Password lama yang Anda masukkan salah.' },
        { status: 400 }
      );
    }

    // Perbarui password
    updateAdminPassword(session.username, newPassword);

    return NextResponse.json({
      success: true,
      message: 'Password berhasil diperbarui.',
    });
  } catch (error) {
    console.error('Error ganti password:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memperbarui password.' },
      { status: 500 }
    );
  }
}
