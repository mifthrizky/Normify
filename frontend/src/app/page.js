import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <span className="text-8xl animate-bounce">📊</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Uji Kenormalan Data <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              dengan Mudah & Cepat
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Website interaktif untuk melakukan uji normalitas data distribusi frekuensi menggunakan metode
            <span className="font-bold text-blue-600"> Chi-Square (Chi-Kuadrat)</span>. Dapatkan hasil perhitungan
            langkah demi langkah secara instan.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
            <Link
              href="/uji"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition transform"
            >
              Mulai Uji Sekarang 🚀
            </Link>
            <Link
              href="/teori"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 text-lg font-bold rounded-lg hover:bg-blue-50 transition"
            >
              Pelajari Teori 📚
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Fitur Unggulan</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="⚡"
              title="Hasil Real-time"
              description="Input data xi dan fi, dapatkan tabel perhitungan lengkap dalam hitungan detik tanpa menunggu."
            />
            <FeatureCard
              icon="📊"
              title="Visualisasi Grafik"
              description="Lihat perbandingan histogram data observasi dengan kurva normal ekspektasi secara interaktif."
            />
            <FeatureCard
              icon="📝"
              title="Penjelasan Detail"
              description="Tidak hanya hasil akhir, kami tampilkan langkah-langkah perhitungan Z-Score dan Chi-Square."
            />
            <FeatureCard
              icon="🎓"
              title="Teori Lengkap"
              description="Pelajari konsep dasar Chi-Square, distribusi normal, dan cara interpretasi hasil uji."
            />
            <FeatureCard
              icon="📖"
              title="Guide Book"
              description="Panduan langkah demi langkah untuk pengguna pemula hingga mahir dalam satu tempat."
            />
            <FeatureCard
              icon="✅"
              title="Akurat & Terpercaya"
              description="Semua perhitungan menggunakan rumus statistika standar yang telah diverifikasi."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p className="text-blue-100">Pengguna Aktif</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <p className="text-blue-100">Uji Dilakukan</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="text-blue-100">Kepuasan Pengguna</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Tersedia Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">Siap Memulai?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tidak perlu instalasi rumit atau konfigurasi teknis. Cukup buka Normify dan mulai analisis data Anda
            sekarang.
          </p>
          <Link
            href="/uji"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition transform"
          >
            Mulai Uji Sekarang 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition transform">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
