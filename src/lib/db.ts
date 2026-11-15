import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { hashPassword } from '@/lib/crypto';
import { dataBerita as initialBerita } from '@/data/berita';
import { dataGaleri as initialGaleri } from '@/data/galeri';
import { dataSekolah as initialSekolah } from '@/data/sekolah';
import { Berita, FotoGaleri, DataSekolah } from '@/types';

// Buat direktori data/ jika belum ada
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'database.sqlite');

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_PATH);
    initTables(dbInstance);
  }
  return dbInstance;
}

function initTables(db: DatabaseSync): void {
  // 1. Tabel Admin
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  // 2. Tabel Berita
  db.exec(`
    CREATE TABLE IF NOT EXISTS berita (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      judul TEXT NOT NULL,
      ringkasan TEXT NOT NULL,
      konten TEXT NOT NULL,
      kategori TEXT NOT NULL,
      penulis TEXT NOT NULL,
      tanggal TEXT NOT NULL,
      gambar_utama TEXT NOT NULL,
      tags TEXT,
      status TEXT NOT NULL DEFAULT 'published',
      is_pinned INTEGER DEFAULT 0,
      sumber TEXT,
      sumber_url TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  // 3. Tabel Pengumuman
  db.exec(`
    CREATE TABLE IF NOT EXISTS pengumuman (
      id TEXT PRIMARY KEY,
      judul TEXT NOT NULL,
      konten TEXT NOT NULL,
      tanggal TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'aktif',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  // 4. Tabel Galeri Foto
  db.exec(`
    CREATE TABLE IF NOT EXISTS galeri (
      id TEXT PRIMARY KEY,
      judul TEXT NOT NULL,
      deskripsi TEXT,
      foto TEXT NOT NULL,
      kategori TEXT,
      tanggal TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  // 5. Tabel Profil Sekolah (Key-Value JSON)
  db.exec(`
    CREATE TABLE IF NOT EXISTS profil_sekolah (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  // Seed default single-admin jika belum ada
  const adminCheck = db.prepare('SELECT COUNT(*) as count FROM admin').get() as { count: number };
  if (adminCheck.count === 0) {
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';
    const { hash, salt } = hashPassword(defaultPassword);
    const now = new Date().toISOString();
    db.prepare('INSERT INTO admin (username, password_hash, salt, updated_at) VALUES (?, ?, ?, ?)').run(
      'admin',
      hash,
      salt,
      now
    );
  }

  // Seed data berita awal jika tabel masih kosong
  const beritaCheck = db.prepare('SELECT COUNT(*) as count FROM berita').get() as { count: number };
  if (beritaCheck.count === 0 && initialBerita.length > 0) {
    const insertBerita = db.prepare(`
      INSERT INTO berita (
        id, slug, judul, ringkasan, konten, kategori, penulis, tanggal,
        gambar_utama, tags, status, is_pinned, sumber, sumber_url, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    for (const b of initialBerita) {
      insertBerita.run(
        b.id,
        b.slug,
        b.judul,
        b.ringkasan,
        b.konten,
        b.kategori,
        b.penulis,
        b.tanggal,
        b.gambarUtama,
        JSON.stringify(b.tags || []),
        'published',
        b.isPinned ? 1 : 0,
        b.sumber || null,
        b.sumberUrl || null,
        now,
        now
      );
    }
  }

  // Seed data galeri awal jika tabel masih kosong
  const galeriCheck = db.prepare('SELECT COUNT(*) as count FROM galeri').get() as { count: number };
  if (galeriCheck.count === 0 && initialGaleri.length > 0) {
    const insertGaleri = db.prepare(`
      INSERT INTO galeri (
        id, judul, deskripsi, foto, kategori, tanggal, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const now = new Date().toISOString();
    for (const g of initialGaleri) {
      insertGaleri.run(
        g.id,
        g.judul,
        g.deskripsi || null,
        g.foto,
        g.kategori || null,
        g.tanggal || null,
        now,
        now
      );
    }
  }

  // Seed data profil sekolah jika tabel masih kosong
  const profilCheck = db.prepare("SELECT COUNT(*) as count FROM profil_sekolah WHERE key = 'info'").get() as { count: number };
  if (profilCheck.count === 0) {
    const now = new Date().toISOString();
    db.prepare('INSERT INTO profil_sekolah (key, value, updated_at) VALUES (?, ?, ?)').run(
      'info',
      JSON.stringify(initialSekolah),
      now
    );
  }

  // Seed pengumuman awal jika belum ada
  const pengumumanCheck = db.prepare('SELECT COUNT(*) as count FROM pengumuman').get() as { count: number };
  if (pengumumanCheck.count === 0) {
    const now = new Date().toISOString();
    const insertPengumuman = db.prepare(`
      INSERT INTO pengumuman (id, judul, konten, tanggal, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertPengumuman.run(
      'pengumuman-01',
      'Pelaksanaan Penilaian Sumatif Akhir Semester (PSAS) Ganjil',
      'Diberitahukan kepada seluruh orang tua/wali murid bahwa Penilaian Sumatif Akhir Semester (PSAS) Ganjil Tahun Ajaran 2026/2027 akan diselenggarakan mulai awal Desember 2026. Mohon bimbingan belajar putra-putri di rumah.',
      '2026-11-10',
      'aktif',
      now,
      now
    );

    insertPengumuman.run(
      'pengumuman-02',
      'Jadwal Pembagian Rapor Semester Ganjil & Libur Sekolah',
      'Pembagian Buku Laporan Hasil Belajar (Rapor) Semester Ganjil akan dilaksanakan secara tatap muka oleh wali kelas. Libur semester ganjil dimulai sesuai kalender pendidikan Dinas Pendidikan Provinsi DKI Jakarta.',
      '2026-11-12',
      'aktif',
      now,
      now
    );
  }
}

// ==========================================
// OPERASI BERITA
// ==========================================
export interface DbBeritaRow {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  gambar_utama: string;
  tags: string | null;
  status: 'draft' | 'published';
  is_pinned: number;
  sumber: string | null;
  sumber_url: string | null;
  created_at: string;
  updated_at: string;
}

export function rowToBerita(row: DbBeritaRow): Berita & { status: 'draft' | 'published' } {
  let tags: string[] = [];
  try {
    if (row.tags) tags = JSON.parse(row.tags);
  } catch {
    tags = [];
  }

  return {
    id: row.id,
    slug: row.slug,
    judul: row.judul,
    ringkasan: row.ringkasan,
    konten: row.konten,
    kategori: row.kategori as Berita['kategori'],
    penulis: row.penulis,
    tanggal: row.tanggal,
    gambarUtama: row.gambar_utama,
    tags,
    status: row.status,
    isPinned: Boolean(row.is_pinned),
    sumber: row.sumber || undefined,
    sumberUrl: row.sumber_url || undefined,
  };
}

export function getAllBerita(includeDrafts = false): (Berita & { status: 'draft' | 'published' })[] {
  const db = getDb();
  let query = 'SELECT * FROM berita';
  if (!includeDrafts) {
    query += " WHERE status = 'published'";
  }
  query += ' ORDER BY is_pinned DESC, tanggal DESC, created_at DESC';

  const rows = db.prepare(query).all() as unknown as DbBeritaRow[];
  return rows.map(rowToBerita);
}

export function getBeritaBySlug(slug: string, includeDrafts = false): (Berita & { status: 'draft' | 'published' }) | null {
  const db = getDb();
  let query = 'SELECT * FROM berita WHERE slug = ?';
  if (!includeDrafts) {
    query += " AND status = 'published'";
  }

  const row = db.prepare(query).get(slug) as unknown as DbBeritaRow | undefined;
  return row ? rowToBerita(row) : null;
}

export function getBeritaById(id: string): (Berita & { status: 'draft' | 'published' }) | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM berita WHERE id = ?').get(id) as unknown as DbBeritaRow | undefined;
  return row ? rowToBerita(row) : null;
}

export function saveBerita(data: {
  id?: string;
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  gambarUtama: string;
  tags?: string[];
  status?: 'draft' | 'published';
  isPinned?: boolean;
  sumber?: string;
  sumberUrl?: string;
}): string {
  const db = getDb();
  const now = new Date().toISOString();
  const id = data.id || `berita-${Date.now()}`;
  const status = data.status || 'published';
  const isPinned = data.isPinned ? 1 : 0;
  const tagsJson = JSON.stringify(data.tags || []);

  const existing = db.prepare('SELECT id FROM berita WHERE id = ?').get(id);

  if (existing) {
    db.prepare(`
      UPDATE berita SET
        slug = ?, judul = ?, ringkasan = ?, konten = ?, kategori = ?,
        penulis = ?, tanggal = ?, gambar_utama = ?, tags = ?, status = ?,
        is_pinned = ?, sumber = ?, sumber_url = ?, updated_at = ?
      WHERE id = ?
    `).run(
      data.slug,
      data.judul,
      data.ringkasan,
      data.konten,
      data.kategori,
      data.penulis,
      data.tanggal,
      data.gambarUtama,
      tagsJson,
      status,
      isPinned,
      data.sumber || null,
      data.sumberUrl || null,
      now,
      id
    );
  } else {
    db.prepare(`
      INSERT INTO berita (
        id, slug, judul, ringkasan, konten, kategori, penulis, tanggal,
        gambar_utama, tags, status, is_pinned, sumber, sumber_url, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.slug,
      data.judul,
      data.ringkasan,
      data.konten,
      data.kategori,
      data.penulis,
      data.tanggal,
      data.gambarUtama,
      tagsJson,
      status,
      isPinned,
      data.sumber || null,
      data.sumberUrl || null,
      now,
      now
    );
  }

  return id;
}

export function deleteBerita(id: string): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM berita WHERE id = ?').run(id);
  return res.changes > 0;
}

// ==========================================
// OPERASI PENGUMUMAN
// ==========================================
export interface PengumumanItem {
  id: string;
  judul: string;
  konten: string;
  tanggal: string;
  status: 'aktif' | 'tidak_aktif';
  created_at: string;
  updated_at: string;
}

export function getAllPengumuman(includeInactive = false): PengumumanItem[] {
  const db = getDb();
  let query = 'SELECT * FROM pengumuman';
  if (!includeInactive) {
    query += " WHERE status = 'aktif'";
  }
  query += ' ORDER BY tanggal DESC, created_at DESC';

  return db.prepare(query).all() as unknown as PengumumanItem[];
}

export function getPengumumanById(id: string): PengumumanItem | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM pengumuman WHERE id = ?').get(id);
  return (row as unknown as PengumumanItem) || null;
}

export function savePengumuman(data: {
  id?: string;
  judul: string;
  konten: string;
  tanggal: string;
  status?: 'aktif' | 'tidak_aktif';
}): string {
  const db = getDb();
  const now = new Date().toISOString();
  const id = data.id || `pengumuman-${Date.now()}`;
  const status = data.status || 'aktif';

  const existing = db.prepare('SELECT id FROM pengumuman WHERE id = ?').get(id);

  if (existing) {
    db.prepare(`
      UPDATE pengumuman SET
        judul = ?, konten = ?, tanggal = ?, status = ?, updated_at = ?
      WHERE id = ?
    `).run(data.judul, data.konten, data.tanggal, status, now, id);
  } else {
    db.prepare(`
      INSERT INTO pengumuman (id, judul, konten, tanggal, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, data.judul, data.konten, data.tanggal, status, now, now);
  }

  return id;
}

export function deletePengumuman(id: string): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM pengumuman WHERE id = ?').run(id);
  return res.changes > 0;
}

// ==========================================
// OPERASI GALERI FOTO
// ==========================================
export interface DbGaleriRow {
  id: string;
  judul: string;
  deskripsi: string | null;
  foto: string;
  kategori: string | null;
  tanggal: string | null;
  created_at: string;
  updated_at: string;
}

export function getAllGaleri(): FotoGaleri[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM galeri ORDER BY created_at DESC').all() as unknown as DbGaleriRow[];
  return rows.map((r) => ({
    id: r.id,
    judul: r.judul,
    deskripsi: r.deskripsi || undefined,
    foto: r.foto,
    kategori: r.kategori || undefined,
    tanggal: r.tanggal || undefined,
  }));
}

export function getGaleriById(id: string): FotoGaleri | null {
  const db = getDb();
  const r = db.prepare('SELECT * FROM galeri WHERE id = ?').get(id) as unknown as DbGaleriRow | undefined;
  if (!r) return null;
  return {
    id: r.id,
    judul: r.judul,
    deskripsi: r.deskripsi || undefined,
    foto: r.foto,
    kategori: r.kategori || undefined,
    tanggal: r.tanggal || undefined,
  };
}

export function saveGaleri(data: {
  id?: string;
  judul: string;
  deskripsi?: string;
  foto: string;
  kategori?: string;
  tanggal?: string;
}): string {
  const db = getDb();
  const now = new Date().toISOString();
  const id = data.id || `galeri-${Date.now()}`;

  const existing = db.prepare('SELECT id FROM galeri WHERE id = ?').get(id);

  if (existing) {
    db.prepare(`
      UPDATE galeri SET
        judul = ?, deskripsi = ?, foto = ?, kategori = ?, tanggal = ?, updated_at = ?
      WHERE id = ?
    `).run(data.judul, data.deskripsi || null, data.foto, data.kategori || null, data.tanggal || null, now, id);
  } else {
    db.prepare(`
      INSERT INTO galeri (id, judul, deskripsi, foto, kategori, tanggal, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, data.judul, data.deskripsi || null, data.foto, data.kategori || null, data.tanggal || null, now, now);
  }

  return id;
}

export function deleteGaleri(id: string): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM galeri WHERE id = ?').run(id);
  return res.changes > 0;
}

// ==========================================
// OPERASI PROFIL SEKOLAH
// ==========================================
export function getProfilSekolah(): DataSekolah {
  const db = getDb();
  const row = db.prepare("SELECT value FROM profil_sekolah WHERE key = 'info'").get() as { value: string } | undefined;
  if (!row) {
    return initialSekolah;
  }
  try {
    return JSON.parse(row.value) as DataSekolah;
  } catch {
    return initialSekolah;
  }
}

export function updateProfilSekolah(data: DataSekolah): void {
  const db = getDb();
  const now = new Date().toISOString();
  const json = JSON.stringify(data);
  db.prepare(`
    INSERT INTO profil_sekolah (key, value, updated_at)
    VALUES ('info', ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).run(json, now);
}

// ==========================================
// OPERASI ADMIN USER & STATS
// ==========================================
export function getAdminUser(username: string): { id: number; username: string; password_hash: string; salt: string } | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM admin WHERE username = ?').get(username);
  return (row as unknown as { id: number; username: string; password_hash: string; salt: string }) || null;
}

export function updateAdminPassword(username: string, newPassword: string): boolean {
  const db = getDb();
  const { hash, salt } = hashPassword(newPassword);
  const now = new Date().toISOString();
  const res = db.prepare('UPDATE admin SET password_hash = ?, salt = ?, updated_at = ? WHERE username = ?').run(
    hash,
    salt,
    now,
    username
  );
  return res.changes > 0;
}

export function getDashboardStats(): {
  totalBerita: number;
  totalGaleri: number;
  totalPengumuman: number;
  beritaDraft: number;
} {
  const db = getDb();
  const totalBerita = (db.prepare('SELECT COUNT(*) as count FROM berita').get() as { count: number }).count;
  const beritaDraft = (db.prepare("SELECT COUNT(*) as count FROM berita WHERE status = 'draft'").get() as { count: number }).count;
  const totalGaleri = (db.prepare('SELECT COUNT(*) as count FROM galeri').get() as { count: number }).count;
  const totalPengumuman = (db.prepare('SELECT COUNT(*) as count FROM pengumuman').get() as { count: number }).count;

  return {
    totalBerita,
    totalGaleri,
    totalPengumuman,
    beritaDraft,
  };
}
