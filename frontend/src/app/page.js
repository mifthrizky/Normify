"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt45">
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-0 bg-grid-pattern" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/40 transition-all w-fit">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm text-white/80">Uji Normalitas Kurva Lurus</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-black leading-tight">
                  Uji Normalitas
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                    Metode Garis Lurus
                  </span>
                </h1>
                <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                  Dari manual yang rumit menjadi otomatis dalam{" "}
                  <span className="text-cyan-400 font-bold">kurang dari 1 detik</span>. Interpolasi distribusi normal,
                  regresi linear, dan visualisasi kurva kenormalan dalam satu platform.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/uji"
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Mulai Analisis Sekarang <span className="group-hover:translate-x-1 transition-transform">⚡</span>
                  </span>
                </Link>
                <Link
                  href="/teori"
                  className="px-8 py-4 backdrop-blur-md bg-white/10 border-2 border-white/30 rounded-xl font-bold text-lg hover:border-white/60 hover:bg-white/20 transition-all duration-300"
                >
                  Pelajari Teori 📚
                </Link>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { icon: "⚡", value: "1s", label: "Perhitungan" },
                  { icon: "📊", value: "Efisien", label: "Akurat" },
                  { icon: "24/7", value: "Aktif", label: "Kapan Saja" },
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content: Dynamic Visualization */}
            <div className="relative hidden lg:block animate-fade-in-up delay-200">
              {/* Main Graph Card */}
              <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10">
                {/* Header Graph */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-white font-bold text-lg">Distribusi Data</h3>
                    <p className="text-white/50 text-xs">Real-time Interpolation</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                </div>

                {/* THE GRAPH AREA */}
                <div className="relative h-64 w-full bg-black/40 rounded-xl overflow-hidden border border-white/5">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

                  {/* SVG Visualization */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Bell Curve Path (Kurva Lonceng) */}
                    <path
                      d="M0,220 C100,220 140,50 200,50 C260,50 300,220 400,220"
                      fill="url(#curveGradient)"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    />

                    {/* The "Straight Line" Method Representation (Diagonal) */}
                    <line
                      x1="50"
                      y1="220"
                      x2="350"
                      y2="30"
                      stroke="#9333ea"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="opacity-70"
                    />

                    {/* Data Points (Animated Circles) */}
                    {[
                      { cx: 80, cy: 200 },
                      { cx: 120, cy: 150 },
                      { cx: 160, cy: 80 },
                      { cx: 200, cy: 50 },
                      { cx: 240, cy: 80 },
                      { cx: 280, cy: 150 },
                      { cx: 320, cy: 200 },
                    ].map((point, i) => (
                      <circle
                        key={i}
                        cx={point.cx}
                        cy={point.cy}
                        r="4"
                        fill="white"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </svg>

                  {/* Scanning Line Effect */}
                  <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-[scan_3s_ease-in-out_infinite] opacity-50 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -right-6 -bottom-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <span className="text-xl">📈</span>
                    </div>
                    <div>
                      <div className="text-xs text-white/60">Linearity (R²)</div>
                      <div className="text-lg font-bold text-green-400">0.998</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-6 top-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-xl animate-pulse-slow">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div>
                      <div className="text-xs text-white/60">Process Time</div>
                      <div className="text-lg font-bold text-purple-400">0.04s</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Glow Behind */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Manual vs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                Normify
              </span>
            </h2>
            <p className="text-xl text-white/70">Lihat perbedaan efisiensi waktu dan akurasi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Manual Method */}
            <div className="backdrop-blur-xl bg-red-500/5 border-2 border-red-500/30 rounded-2xl p-8 hover:border-red-500/50 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📝</span>
                <h3 className="text-2xl font-bold text-red-400">Perhitungan Manual</h3>
              </div>

              <div className="space-y-4">
                {[
                  { step: "Buat F Kumulatif", time: "5-10 menit" },
                  { step: "Cari u di Tabel", time: "15-20 menit" },
                  { step: "Regresi Linear Manual", time: "20-30 menit" },
                  { step: "Hitung p(u')", time: "15-20 menit" },
                  { step: "Hitung σ & p(x')", time: "10-15 menit" },
                  { step: "Hitung f(x')", time: "15-20 menit" },
                  { step: "Gambar Grafik", time: "20-30 menit" },
                  { step: "Interpretasi Hasil", time: "5-10 menit" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-white/80">{item.step}</span>
                    <span className="text-red-400 font-semibold text-sm">{item.time}</span>
                  </div>
                ))}
                <div className="pt-4 border-t-2 border-red-500/30 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">Total Waktu</span>
                    <span className="text-2xl font-black text-red-400">2-3 Jam</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="text-xs text-red-400 mb-2">⚠️ Perhatian: Risiko Kesalahan Tinggi</div>
                <div className="text-sm text-white/80">
                  Banyak perhitungan manual berpotensi error pada interpolasi dan regresi
                </div>
              </div>
            </div>

            {/* Normify Method */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/50 rounded-2xl p-8 hover:border-cyan-400 transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">⚡</span>
                  <h3 className="text-2xl font-bold text-cyan-400">Normify (Web)</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { step: "Input Data Xi & Fi", time: "1 detik" },
                    { step: "Hitung F Kumulatif", time: "50ms" },
                    { step: "Interpolasi u Otomatis", time: "100ms" },
                    { step: "Regresi Linear Real-time", time: "75ms" },
                    { step: "Hitung p(u') & σ", time: "50ms" },
                    { step: "Hitung p(x') & f(x')", time: "75ms" },
                    { step: "Generate Grafik", time: "150ms" },
                    { step: "Interpretasi", time: "Instant" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-white/80">{item.step}</span>
                      <span className="text-cyan-400 font-semibold text-sm">{item.time}</span>
                    </div>
                  ))}
                  <div className="pt-4 border-t-2 border-cyan-500/30 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">Total Waktu</span>
                      <span className="text-2xl font-black text-cyan-400">&lt; 1 Detik</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="text-xs text-green-400 mb-2">✓ Sukses: Zero Error</div>
                  <div className="text-sm text-white/80">99.9% Akurat - 8 Tahap Terverifikasi</div>
                </div>
              </div>
            </div>
          </div>

          {/* Efficiency Metric */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-8 text-center">
              <div className="text-5xl font-black mb-4">
                <span className="text-cyan-400">10,800x</span>
                <span className="text-white/60"> lebih cepat</span>
              </div>
              <p className="text-lg text-white/70">
                Hemat waktu berharga Anda dari <span className="text-red-400 font-bold">2-3 jam</span> menjadi{" "}
                <span className="text-cyan-400 font-bold">kurang dari 1 detik</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN METODE */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Keunggulan Metode{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                Garis Lurus
              </span>
            </h2>
            <p className="text-xl text-white/70">Mengapa metode ini efektif untuk uji normalitas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Interpolasi Akurat",
                desc: "Tabel distribusi normal standar untuk nilai u yang presisi dari F% kumulatif",
              },
              {
                icon: "📈",
                title: "Regresi Linear Optimal",
                desc: "Persamaan y=mx+c menghasilkan garis lurus yang sempurna untuk uji normalitas",
              },
              {
                icon: "🔢",
                title: "Perhitungan Sistematis",
                desc: "8 langkah terstruktur dari F% hingga frekuensi harapan f(x') yang terukur",
              },
              {
                icon: "📐",
                title: "Transformasi Skala",
                desc: "Konversi dari standar normal u ke skala data x menggunakan σ",
              },
              {
                icon: "📋",
                title: "Verifikasi Visual",
                desc: "Grafik pemeriksa kenormalan menunjukkan keselarasan data dengan teori",
              },
              {
                icon: "🎯",
                title: "Interpretasi Jelas",
                desc: "Garis lurus sempurna = data normal, penyimpangan = data menyimpang",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 overflow-hidden"
                style={{
                  animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 transition-opacity duration-300" />

                <div className="relative z-10 space-y-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto">
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-3xl p-16 overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-blob" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
              <h2 className="text-5xl font-black">
                Hemat{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  2-3 Jam
                </span>{" "}
                Hari Ini
              </h2>
              <p className="text-xl text-white/70">
                8 tahap uji normalitas metode garis lurus dalam waktu kurang dari 1 detik
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href="/uji"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  Mulai Analisis Sekarang ⚡
                </Link>
                <Link
                  href="/teori"
                  className="px-8 py-4 backdrop-blur-md bg-white/10 border-2 border-white/30 rounded-xl font-bold text-lg hover:border-white/60 transition-all"
                >
                  Pelajari Teori
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
