import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/db';
import {
  verifyPassword,
  createSessionToken,
  setSessionCookie,
  checkRateLimit,
  recordFailedLogin,
  resetLoginAttempts,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    // 1. Cek Rate Limiting (Pencegahan Brute-Force)
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Terlalu banyak percobaan gagal. Silakan tunggu ${rateCheck.waitSeconds} detik lagi.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Username dan password wajib diisi.' },
        { status: 400 }
      );
    }

    // 2. Ambil data admin dari database
    const admin = getAdminUser(username.trim());
    if (!admin) {
      recordFailedLogin(ip);
      return NextResponse.json(
        { success: false, error: 'Username atau password tidak valid.' },
        { status: 401 }
      );
    }

    // 3. Verifikasi Password Hashing (PBKDF2)
    const isPasswordValid = verifyPassword(password, admin.password_hash, admin.salt);
    if (!isPasswordValid) {
      recordFailedLogin(ip);
      return NextResponse.json(
        { success: false, error: 'Username atau password tidak valid.' },
        { status: 401 }
      );
    }

    // 4. Reset percobaan gagal & buat sesi
    resetLoginAttempts(ip);
    const token = createSessionToken(admin.username);
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      message: 'Login berhasil.',
      username: admin.username,
    });
  } catch (error) {
    console.error('Error saat login:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat proses login.' },
      { status: 500 }
    );
  }
}
