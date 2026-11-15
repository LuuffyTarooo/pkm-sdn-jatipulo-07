import crypto from 'node:crypto';

// Secret key untuk penandatanganan HMAC token sesi
export const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'sdn07-secure-admin-secret-key-2026';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

/**
 * Hash password menggunakan PBKDF2 dengan SHA-512 dan 100,000 iterasi.
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

/**
 * Verifikasi password terhadap hash dan salt yang tersimpan dengan timing-safe comparison.
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const computedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    const hashBuffer = Buffer.from(hash, 'hex');
    const computedBuffer = Buffer.from(computedHash, 'hex');

    if (hashBuffer.length !== computedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(hashBuffer, computedBuffer);
  } catch {
    return false;
  }
}

/**
 * Buat signed session token dengan HMAC-SHA256
 */
export function createSessionToken(username: string, maxAgeSeconds: number = SESSION_MAX_AGE): string {
  const expiresAt = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const payload = Buffer.from(JSON.stringify({ u: username, exp: expiresAt })).toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

/**
 * Verifikasi signed session token
 */
export function verifySessionToken(token: string): { username: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [payload, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.u || !data.exp) return null;

    if (Math.floor(Date.now() / 1000) > data.exp) {
      return null;
    }

    return { username: data.u };
  } catch {
    return null;
  }
}
