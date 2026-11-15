/**
 * Utilitas Kompresi Gambar Otomatis di Sisi Klien (Browser)
 * 
 * Mengubah ukuran gambar beresolusi tinggi (misal: foto kamera ponsel 4000x3000px, 10-20MB)
 * menjadi ukuran standar web (maksimal 1920px) dengan format WebP/JPEG berkualitas optimal (~200KB-400KB).
 * Menghemat kuota, mempercepat upload seketika, dan mencegah kegagalan unggah file raksasa.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: 'image/webp' | 'image/jpeg';
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.82,
    outputFormat = 'image/webp',
  } = options;

  // Jika bukan file gambar, return apa adanya
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // Jika file sudah kecil (< 300KB) dan bertipe WebP, tidak perlu kompresi ulang
  if (file.size < 300 * 1024 && file.type === 'image/webp') {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Hitung rasio aspek untuk mempertahankan proporsi
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight;
            height = maxHeight;
          }
        }

        // Gambar pada canvas off-screen
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback jika canvas context gagal
          resolve(file);
          return;
        }

        // Aktifkan image smoothing berkualitas tinggi
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Ekspor ke format webp (atau jpeg jika browser tidak mendukung webp canvas)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }

            // Ganti ekstensi nama file menjadi .webp
            const cleanName = file.name.replace(/\.[^/.]+$/, '');
            const newExtension = outputFormat === 'image/webp' ? '.webp' : '.jpg';
            const compressedFile = new File([blob], `${cleanName}${newExtension}`, {
              type: blob.type || outputFormat,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          outputFormat,
          quality
        );
      };

      img.onerror = () => resolve(file);

      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      } else {
        resolve(file);
      }
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

/**
 * Kompres banyak file sekaligus secara paralel
 */
export async function compressImages(
  files: FileList | File[],
  options?: CompressionOptions
): Promise<File[]> {
  const fileArray = Array.from(files);
  return Promise.all(fileArray.map((f) => compressImage(f, options)));
}
