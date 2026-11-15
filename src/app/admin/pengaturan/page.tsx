'use client';

import React, { useState, useEffect } from 'react';

// Inline Icons
const KeyIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 2-2 2m-1.5 1.5L20 8l-2 2-1.5-1.5M15.5 6.5l-4.5 4.5" />
    <circle cx="7.5" cy="15.5" r="5.5" />
  </svg>
);

const ShieldCheckIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CheckCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ExclamationIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

const LockIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

const ServerIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);

const InfoIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default function AdminPengaturanPage() {
  const [currentUser, setCurrentUser] = useState<string>('admin');
  const [loadingUser, setLoadingUser] = useState(true);

  // Form password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/admin/auth/me');
        const json = await res.json();
        if (json.success && json.data) {
          setCurrentUser(json.data.username);
        }
      } catch {
        // ignore
      } finally {
        setLoadingUser(false);
      }
    }
    loadUser();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (newPassword.length < 6) {
      setFeedback({ type: 'error', message: 'Password baru minimal harus 6 karakter.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Konfirmasi password baru tidak cocok.' });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const json = await res.json();

      if (json.success) {
        setFeedback({
          type: 'success',
          message: 'Password berhasil diperbarui! Silakan gunakan password baru ini pada login berikutnya.',
        });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setFeedback({ type: 'error', message: json.error || 'Gagal mengubah password.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan sistem saat memperbarui password.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Halaman */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#0f2d4a]">Pengaturan Akun &amp; Sistem</h1>
        <p className="text-sm text-slate-500 mt-1">
          Kelola kredensial keamanan akun administrator tunggal dan tinjau status penyimpanan sistem.
        </p>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <ExclamationIcon className="w-5 h-5 text-rose-600 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Ganti Password (2 Kolom) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#0f2d4a]">
              <KeyIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0f2d4a]">Ubah Password Administrator</h2>
              <p className="text-xs text-slate-500">
                Gunakan kombinasi password yang kuat untuk menjaga keamanan situs sekolah.
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5">
            {/* Password Lama */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password Saat Ini *
              </label>
              <div className="relative">
                <input
                  type={showOldPass ? 'text' : 'password'}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Masukkan password lama"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPass(!showOldPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showOldPass ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Baru */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password Baru *
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showNewPass ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password Baru */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Konfirmasi Password Baru *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password baru"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0f2d4a] hover:bg-[#163d63] text-white font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <LockIcon className="w-4 h-4 text-[#38bdf8]" />
                    Simpan Password Baru
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Informasi Akun & Database (1 Kolom) */}
        <div className="space-y-6">
          {/* Kartu Profil Akun */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#0f2d4a] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                AD
              </div>
              <div>
                <h3 className="font-bold text-slate-900 capitalize">
                  {loadingUser ? 'Memuat...' : currentUser}
                </h3>
                <p className="text-xs text-slate-400">Administrator Tunggal</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Hak Akses:</span>
                <span className="font-semibold text-emerald-600">Full Access (Superadmin)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Durasi Sesi:</span>
                <span className="font-semibold text-slate-800">7 Hari (HttpOnly Cookie)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Enkripsi Password:</span>
                <span className="font-semibold text-slate-800">PBKDF2 SHA-512 + Salt</span>
              </div>
            </div>
          </div>

          {/* Kartu Status Database */}
          <div className="bg-[#0f2d4a] text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 text-[#38bdf8] font-bold text-xs uppercase tracking-wider mb-2">
              <ServerIcon className="w-4 h-4" />
              Penyimpanan Sistem
            </div>
            <h4 className="font-bold text-base text-white mb-2">Node.js SQLite Database</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Database tersimpan secara lokal dan permanen pada file{' '}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-sky-200">data/database.sqlite</code>.
            </p>

            <div className="p-3 bg-white/10 rounded-xl flex items-start gap-2.5 text-xs text-slate-200">
              <InfoIcon className="w-4 h-4 text-[#38bdf8] flex-shrink-0 mt-0.5" />
              <span>
                Seluruh data artikel, foto, pengumuman, dan profil otomatis dicadangkan setiap saat di berkas database ini.
              </span>
            </div>
          </div>

          {/* Kartu Keamanan */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-900 flex items-start gap-3">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold mb-1">Proteksi Keamanan Aktif</h5>
              <p className="text-emerald-800 leading-relaxed">
                Panel admin dilindungi dengan brute-force rate limiter (maksimal 5 percobaan gagal per 15 menit) dan token HMAC-SHA256 yang aman.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
