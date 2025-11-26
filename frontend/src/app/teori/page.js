"use client";

import Link from "next/link";

export default function TeoriPage() {
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* HEADER */}
      <section className="relative py-24 px-4 pt-32">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6 mb-20">
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              Teori Dasar
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Uji Normalitas Data
              </span>
            </h1>
            <p className="text-xl text-white/70">
              Memahami statistika dan metode garis lurus untuk pengujian distribusi normal
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-16">
            {/* APA ITU STATISTIKA */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl">📊</span>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Apa itu Statistika?
                </h2>
              </div>

              <div className="space-y-6 text-white/80 leading-relaxed">
                <p className="text-lg">
                  <span className="font-bold text-cyan-400">Statistika</span> adalah ilmu yang mempelajari cara
                  pengumpulan, pengolahan, analisis, dan interpretasi data untuk mengambil kesimpulan dan membuat
                  keputusan berdasarkan data tersebut.
                </p>

                <p>
                  Dalam konteks penelitian dan eksperimen, statistika membantu kita memahami pola, tren, dan
                  karakteristik dari populasi yang sedang diteliti melalui sampel data yang representatif. Statistika
                  menjadi tulang punggung dalam pengambilan keputusan yang berbasis fakta dan data empiris.
                </p>

                {/* Cabang Statistika */}
                <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/10">
                  <div className="space-y-3 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">📈</span>
                      <h4 className="font-bold text-cyan-400 text-lg">Statistika Deskriptif</h4>
                    </div>
                    <p className="text-sm leading-relaxed">
                      Menggunakan teknik untuk merangkum, menggambarkan, dan mempresentasikan karakteristik data melalui
                      grafik, tabel, dan ukuran-ukuran seperti mean, median, modus, dan standar deviasi.
                    </p>
                  </div>

                  <div className="space-y-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">🔍</span>
                      <h4 className="font-bold text-purple-400 text-lg">Statistika Inferensi</h4>
                    </div>
                    <p className="text-sm leading-relaxed">
                      Menggunakan sampel data untuk membuat generalisasi, estimasi, dan prediksi tentang populasi yang
                      lebih besar. Mencakup uji hipotesis dan pengujian normalitas data.
                    </p>
                  </div>
                </div>

                {/* Konsep Penting */}
                <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="space-y-2">
                    <h5 className="font-bold text-cyan-400">Populasi</h5>
                    <p className="text-sm">Seluruh kumpulan data yang menjadi fokus penelitian</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-blue-400">Sampel</h5>
                    <p className="text-sm">Bagian dari populasi yang dipilih untuk analisis</p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-purple-400">Data</h5>
                    <p className="text-sm">Informasi atau nilai yang dikumpulkan dari observasi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* DISTRIBUSI NORMAL */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl">📈</span>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Distribusi Normal (Kurva Gauss)
                </h2>
              </div>

              <div className="space-y-6 text-white/80 leading-relaxed">
                <p className="text-lg">
                  <span className="font-bold text-purple-400">Distribusi normal</span> adalah distribusi probabilitas
                  yang paling penting dan sering digunakan dalam statistika. Disebut juga sebagai kurva Gauss atau
                  Gaussian distribution.
                </p>

                <p>
                  Banyak fenomena alami dalam kehidupan nyata mengikuti distribusi normal, seperti tinggi badan, berat
                  badan, nilai ujian, dan banyak variabel lainnya. Oleh karena itu, memahami distribusi normal sangat
                  penting dalam analisis statistika.
                </p>

                {/* Karakteristik */}
                <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/10">
                  <div className="space-y-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-purple-400 text-lg">Karakteristik Distribusi Normal</h4>
                    <ul className="text-sm space-y-3">
                      <li className="flex gap-3">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>Kurva berbentuk lonceng (bell curve) yang simetris sempurna</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>Rata-rata (μ) adalah pusat distribusi dan titik tertinggi kurva</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>68% data berada dalam μ ± σ (satu standar deviasi)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>95% data berada dalam μ ± 2σ (dua standar deviasi)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>99.7% data berada dalam μ ± 3σ (tiga standar deviasi)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>Tidak pernah menyentuh garis horizontal (asimtotis)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-cyan-400 text-lg">Formula Distribusi Normal</h4>
                    <div className="text-sm space-y-4 font-mono bg-black/50 rounded-lg p-4">
                      <div className="text-cyan-300">f(x) = (1/(σ√2π)) × e^(-(x-μ)²/2σ²)</div>
                      <div className="border-t border-white/10 pt-4">
                        <div className="text-white/60 mb-3">Dimana:</div>
                        <ul className="text-xs space-y-2 text-white/80">
                          <li>
                            <span className="text-cyan-400">μ</span> = rata-rata (mean)
                          </li>
                          <li>
                            <span className="text-cyan-400">σ</span> = standar deviasi
                          </li>
                          <li>
                            <span className="text-cyan-400">x</span> = nilai data
                          </li>
                          <li>
                            <span className="text-cyan-400">e</span> = konstanta Euler (≈2.718)
                          </li>
                          <li>
                            <span className="text-cyan-400">π</span> = konstanta pi (≈3.14159)
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* UJI NORMALITAS */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl">✓</span>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
                  Uji Normalitas (Normality Test)
                </h2>
              </div>

              <div className="space-y-6 text-white/80 leading-relaxed">
                <p className="text-lg">
                  <span className="font-bold text-cyan-400">Uji normalitas</span> adalah serangkaian prosedur statistik
                  yang digunakan untuk menentukan apakah data sampel mengikuti distribusi normal atau tidak.
                </p>

                <p>
                  Uji ini sangat penting karena banyak metode statistik parametrik (seperti t-test, ANOVA, regresi
                  linear) mengasumsikan bahwa data berdistribusi normal. Jika asumsi ini tidak terpenuhi, hasil analisis
                  mungkin tidak valid atau menyesatkan.
                </p>

                {/* Kapan Digunakan */}
                <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                  <div className="space-y-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/50 transition-all">
                    <h5 className="font-bold text-blue-400">Kapan Digunakan?</h5>
                    <p className="text-sm">
                      Sebelum melakukan analisis lanjutan yang membutuhkan asumsi normalitas data
                    </p>
                  </div>
                  <div className="space-y-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/50 transition-all">
                    <h5 className="font-bold text-purple-400">Metode Apa Saja?</h5>
                    <p className="text-sm">Kolmogorov-Smirnov, Shapiro-Wilk, Anderson-Darling, Garis Lurus, dll</p>
                  </div>
                  <div className="space-y-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4 hover:border-green-500/50 transition-all">
                    <h5 className="font-bold text-green-400">Hasil Interpretasi</h5>
                    <p className="text-sm">Normal atau Menyimpang dari distribusi normal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8 LANGKAH METODE GARIS LURUS */}
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-6xl font-black">
                  8 Langkah Metode{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                    Garis Lurus
                  </span>
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  Proses sistematis uji normalitas dengan interpolasi distribusi normal, regresi linear, dan
                  transformasi data
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    step: 1,
                    title: "F Kumulatif & F%",
                    desc: "Hitung frekuensi kumulatif dan persentase kumulatif dari data observasi",
                    formula: "F% = F(kum) / (n+1)",
                    color: "from-blue-500/20 to-blue-500/5",
                  },
                  {
                    step: 2,
                    title: "Interpolasi u (Tabel Normal)",
                    desc: "Cari nilai u dari tabel distribusi kumulatif normal standar berdasarkan F%",
                    formula: "P{u} = F%(kumulatif)",
                    color: "from-cyan-500/20 to-cyan-500/5",
                  },
                  {
                    step: 3,
                    title: "Regresi Linear u'",
                    desc: "Buat persamaan garis lurus u' = mx + c menggunakan metode least squares",
                    formula: "y = mx + c",
                    color: "from-purple-500/20 to-purple-500/5",
                  },
                  {
                    step: 4,
                    title: "p{u'} - Density Normal",
                    desc: "Hitung probability density function dari nilai u yang diinterpolasi",
                    formula: "p{u'} = (1/√2π) × e^(-u²/2)",
                    color: "from-pink-500/20 to-pink-500/5",
                  },
                  {
                    step: 5,
                    title: "Standar Deviasi",
                    desc: "Hitung standar deviasi dari slope regresi untuk skala transformasi",
                    formula: "σ = 1/m (slope)",
                    color: "from-orange-500/20 to-orange-500/5",
                  },
                  {
                    step: 6,
                    title: "p{x'} - Density Data",
                    desc: "Transformasi density normal ke skala data dengan standar deviasi",
                    formula: "p{x'} = p{u'} / σ",
                    color: "from-yellow-500/20 to-yellow-500/5",
                  },
                  {
                    step: 7,
                    title: "f{x'} - Frekuensi Harapan",
                    desc: "Hitung frekuensi harapan teoritis untuk setiap kelas interval",
                    formula: "f{x'} = p{x'} × Δ × n",
                    color: "from-green-500/20 to-green-500/5",
                  },
                  {
                    step: 8,
                    title: "Grafik Pemeriksaan",
                    desc: "Visualisasi kurva normal dengan garis lurus untuk verifikasi kenormalan",
                    formula: "Plot: data vs kurva teori",
                    color: "from-emerald-500/20 to-emerald-500/5",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                    style={{ animation: `slideUp 0.6s ease-out ${i * 0.1}s both` }}
                  >
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${item.color} transition-opacity duration-300`}
                    />

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-sm">
                          {item.step}
                        </div>
                        <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                      <div className="pt-3 border-t border-white/10">
                        <div className="text-xs text-cyan-400 font-mono">{item.formula}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note Section */}
              <div className="backdrop-blur-xl bg-white/5 border-2 border-cyan-500/30 rounded-2xl p-8 mt-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                    <span>📌</span> Notasi Penting
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <div className="text-cyan-400 font-semibold text-base">Δ = Ketelitian Alat Ukur</div>
                      <p className="text-white/70">
                        Presisi atau interval ukur dari instrumen pengukuran data (contoh: 1.0, 0.5, dll)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-cyan-400 font-semibold text-base">n = Total Frekuensi</div>
                      <p className="text-white/70">Jumlah keseluruhan sampel data yang dianalisis (ukuran sampel)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-cyan-400 font-semibold text-base">u = Nilai Standar Normal</div>
                      <p className="text-white/70">Nilai z-score dari tabel distribusi kumulatif normal (dari tabel)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-cyan-400 font-semibold text-base">σ = Standar Deviasi</div>
                      <p className="text-white/70">Ukuran penyebaran data dari nilai tengahnya (variabilitas data)</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-cyan-400 font-semibold text-base">F% = Frekuensi Persentase</div>
                      <p className="text-white/70">Persentase kumulatif frekuensi observasi</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-cyan-400 font-semibold text-base">m = Slope Regresi</div>
                      <p className="text-white/70">Kemiringan garis dalam persamaan regresi linear</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA SECTION */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-3xl p-12 overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center space-y-6">
                <h3 className="text-4xl font-black">
                  Siap Menggunakan
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                    Normify?
                  </span>
                </h3>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Mulai uji normalitas data Anda sekarang dengan metode garis lurus yang akurat dan cepat
                </p>
                <Link
                  href="/uji"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  Mulai Uji Sekarang ⚡
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
