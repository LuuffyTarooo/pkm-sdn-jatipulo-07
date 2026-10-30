/**
 * Fungsi utilitas pembantu untuk format tanggal dan manipulasi string
 */

// Format tanggal ke Bahasa Indonesia (contoh: 25 Oktober 2026)
export function formatTanggal(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

// Menggabungkan nama kelas CSS secara kondisional
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
