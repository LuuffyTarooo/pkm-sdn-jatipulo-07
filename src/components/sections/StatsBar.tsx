/**
 * Komponen Bar Statistik / Angka Kunci Sekolah (Server Component)
 * Menampilkan jumlah siswa, guru, rombel, dan akreditasi
 */
export default function StatsBar() {
  const stats = [
    { label: 'Akreditasi', value: 'A' },
    { label: 'Peserta Didik', value: '300+' },
    { label: 'Guru & Staf', value: '20+' },
    { label: 'Rombongan Belajar', value: '12' },
  ];

  return (
    <section className="stats-bar py-8 bg-gray-900 text-white">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item">
            <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-300 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
