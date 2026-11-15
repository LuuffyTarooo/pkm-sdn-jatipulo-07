'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Login gagal. Periksa kembali username dan password Anda.');
        setIsLoading(false);
        return;
      }

      // Berhasil login, arahkan ke dashboard
      router.push('/admin/dashboard');
      router.refresh();
    } catch {
      setErrorMsg('Gagal terhubung ke server. Periksa koneksi Anda.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#f8fafc] relative overflow-hidden font-sans">
      {/* Background Decorative Circles */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#eff6ff] pointer-events-none blur-3xl opacity-80"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#dbeafe] pointer-events-none blur-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Kartu Form Login */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10">
          {/* Header Kartu: Logo & Identitas */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe]/60 flex items-center justify-center p-3 mb-4 shadow-xs">
              <Image
                src="/images/logo/logo.webp"
                alt="Logo SDN Jatipulo 07 Jakarta"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0f2d4a] tracking-tight">
              Portal Administrasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              SDN Jatipulo 07 Jakarta
            </p>
          </div>

          {/* Alert Error jika ada */}
          {errorMsg && (
            <div
              role="alert"
              className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200"
            >
              <svg
                className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs sm:text-sm font-semibold text-[#0f2d4a] mb-1.5"
              >
                Username Admin
              </label>
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username admin"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a] focus:border-transparent transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-semibold text-[#0f2d4a] mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2d4a] focus:border-transparent transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-heading font-bold text-sm text-white bg-[#0f2d4a] hover:bg-[#163d63] active:bg-[#081726] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0f2d4a] shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>

          {/* Footer Kartu: Kembali ke Website */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0f2d4a] font-medium transition-colors"
            >
              <span aria-hidden="true">&larr;</span>
              <span>Kembali ke Website Sekolah</span>
            </Link>
          </div>
        </div>

        {/* Informasi Bantuan / Hint Keamanan */}
        <p className="text-center text-xs text-slate-400 mt-6 font-sans">
          Sistem Terproteksi SDN Jatipulo 07 Jakarta &bull; Khusus Pengelola Resmi
        </p>
      </div>
    </div>
  );
}
