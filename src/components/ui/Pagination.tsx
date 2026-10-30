import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

/**
 * Komponen Penomoran Halaman / Pagination
 * Dapat diadaptasi sebagai Client Component interaktif atau link server
 */
export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <nav className="pagination-wrapper flex justify-center gap-2 mt-8" aria-label="Navigasi Halaman">
      <button
        disabled={currentPage <= 1}
        className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
      >
        Sebelumnya
      </button>
      <span className="px-3 py-1 text-sm font-medium">
        Halaman {currentPage} dari {totalPages}
      </span>
      <button
        disabled={currentPage >= totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50 text-sm"
      >
        Selanjutnya
      </button>
    </nav>
  );
}
