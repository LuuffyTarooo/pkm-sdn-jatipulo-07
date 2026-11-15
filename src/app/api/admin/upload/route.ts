import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import path from 'node:path';
import fs from 'node:fs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Batas ukuran file 25 MB per foto untuk menampung resolusi tinggi dari kamera guru
const MAX_FILE_SIZE = 25 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Tidak memiliki izin akses.' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      const singleFile = formData.get('file') as File | null;
      if (singleFile) {
        files.push(singleFile);
      } else {
        return NextResponse.json({ success: false, error: 'Tidak ada file yang diunggah.' }, { status: 400 });
      }
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // 1. Validasi Ukuran (Max 25MB)
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} melebihi batas maksimum (25 MB).` },
          { status: 400 }
        );
      }

      // 2. Validasi Tipe MIME
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: `Format file ${file.name} tidak didukung. Harap gunakan JPEG, PNG, atau WebP.` },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const cleanBaseName = file.name
        .toLowerCase()
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-z0-9_-]/g, '-');
      const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Kompres otomatis: resize proporsional ke max 1920px & konversi ke WebP 80% quality
      let savedUrl = '';
      try {
        const sharp = (await import('sharp')).default;
        const fileName = `${cleanBaseName}-${uniqueSuffix}.webp`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        await sharp(buffer)
          .rotate() // Otomatis koreksi rotasi orientasi EXIF kamera HP
          .resize({
            width: 1920,
            height: 1920,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: 80, effort: 4 })
          .toFile(filePath);

        savedUrl = `/images/uploads/${fileName}`;
      } catch (err) {
        console.warn('Sharp kompresi gagal, menyimpan buffer file langsung:', err);
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${cleanBaseName}-${uniqueSuffix}.${ext}`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        fs.writeFileSync(filePath, buffer);
        savedUrl = `/images/uploads/${fileName}`;
      }

      uploadedUrls.push(savedUrl);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      url: uploadedUrls[0],
    });
  } catch (error) {
    console.error('Error saat upload file:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memproses gambar.' },
      { status: 500 }
    );
  }
}
