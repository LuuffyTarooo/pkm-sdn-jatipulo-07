import { cookies } from 'next/headers';
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
  verifySessionToken,
  SESSION_MAX_AGE,
} from '@/lib/crypto';

export { hashPassword, verifyPassword, createSessionToken, verifySessionToken, SESSION_MAX_AGE };

export const SESSION_COOKIE_NAME = 'sdn07_admin_session';

// Rate limiting in-memory untuk proteksi brute force login
interface RateLimitRecord {
  attempts: number;
  blockedUntil: number;
}
const loginRateLimitMap = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip);

  if (!record) {
    return { allowed: true };
  }

  if (record.blockedUntil > now) {
    const waitSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  if (record.blockedUntil !== 0 && record.blockedUntil <= now) {
    loginRateLimitMap.delete(ip);
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const record = loginRateLimitMap.get(ip) || { attempts: 0, blockedUntil: 0 };

  record.attempts += 1;
  if (record.attempts >= 5) {
    record.blockedUntil = now + 15 * 60 * 1000; // Blokir 15 menit
  }
  loginRateLimitMap.set(ip, record);
}

export function resetLoginAttempts(ip: string): void {
  loginRateLimitMap.delete(ip);
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

export async function getSessionUser(): Promise<{ username: string } | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    return verifySessionToken(sessionCookie.value);
  } catch {
    return null;
  }
}
