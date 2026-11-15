import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { getDashboardStats } from '@/lib/db';

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
  }

  const stats = getDashboardStats();
  return NextResponse.json({
    success: true,
    stats,
  });
}
