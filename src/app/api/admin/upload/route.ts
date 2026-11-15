import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import path from 'node:path';
import fs from 'node:fs';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

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
      // 1. Validasi Ukuran (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} melebihi ukuran batas maksimum (5 MB).` },
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

      // Coba optimasi via sharp ke WebP, atau fallback simpan langsung buffer file
      let savedUrl = '';
      try {
        const sharp = (await import('sharp')).default;
        const fileName = `${cleanBaseName}-${uniqueSuffix}.webp`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        await sharp(buffer)
          .webp({ quality: 82, effort: 5 })
          .toFile(filePath);
        savedUrl = `/images/uploads/${fileName}`;
      } catch {
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
