/**
 * Loader gambar untuk ekspor statis GitHub Pages.
 * Optimasi gambar Next.js tidak tersedia pada hosting statis, jadi file dari /public
 * dipakai apa adanya dengan menambahkan awalan basePath (nama repo).
 */
export default function imageLoader({ src }: { src: string }): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return src.startsWith('/') ? `${basePath}${src}` : src;
}
