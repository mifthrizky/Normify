"use client";

import { useState } from "react";
import Link from "next/link";

export default function GuidePage() {
  const [showPDF, setShowPDF] = useState(false);

  const guides = [
    {
      id: 1,
      title: "Persiapkan Data",
      icon: "📋",
      desc: "Pastikan Anda sudah memiliki data distribusi frekuensi yang terdiri dari Xi (Nilai Tengah) dan Fi (Frekuensi).",
      details: ["Xi = Nilai tengah dari interval kelas", "Fi = Jumlah data pada interval tersebut"],
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/30",
    },
    {
      id: 2,
      title: "Masukkan Data",
      icon: "⌨️",
      desc: "Masuk ke halaman 'Uji Kenormalan' dan masukkan nilai Xi dan Fi satu per satu.",
      details: [
        "Tekan tombol 'Tambah Baris' untuk kelas interval tambahan",
        "Pastikan tidak ada nilai yang kosong",
        "Data akan otomatis tersimpan",
      ],
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/30",
    },
    {
      id: 3,
      title: "Analisis Hasil",
      icon: "📊",
      desc: "Setelah tombol hitung ditekan, aplikasi akan menampilkan hasil analisis lengkap.",
      details: [
        "Tabel perhitungan lengkap dengan semua parameter",
        "Kesimpulan akhir (Normal / Tidak Normal)",
        "Grafik visualisasi sebaran data",
      ],
      color: "from-green-500/20 to-green-500/5",
      borderColor: "border-green-500/30",
    },
    {
      id: 4,
      title: "Ekspor Hasil",
      icon: "📥",
      desc: "Simpan dan bagikan hasil analisis Anda dalam berbagai format.",
      details: [
        "Export ke file PDF untuk laporan resmi",
        "Download data dalam format CSV",
        "Bagikan hasil melalui link shareable",
      ],
      color: "from-orange-500/20 to-orange-500/5",
      borderColor: "border-orange-500/30",
    },
  ];

  return (
    <div className="bg-black text-white overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* HEADER */}
      <section className="relative py-20 px-4 pt-32">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              Guide Book
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Panduan Lengkap
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Ikuti langkah-langkah mudah untuk memulai uji normalitas data Anda
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative py-12 px-4 pb-32">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
            {/* LEFT: Guides */}
            <div className="lg:col-span-2 space-y-6">
              {guides.map((guide, i) => (
                <div
                  key={guide.id}
                  className={`group relative backdrop-blur-xl bg-white/5 border ${guide.borderColor} rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 overflow-hidden`}
                  style={{ animation: `slideUp 0.6s ease-out ${i * 0.1}s both` }}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${guide.color} transition-opacity duration-300`}
                  />

                  <div className="relative z-10 space-y-4">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{guide.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">
                          {guide.id}. {guide.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 leading-relaxed">{guide.desc}</p>

                    {/* Details List */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {guide.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-3 text-sm text-white/70">
                          <span className="text-cyan-400 font-bold">✓</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: PDF Viewer Button & Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* PDF Viewer Card */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-500/50 transition-all sticky top-32">
                <div className="text-center space-y-6">
                  <div className="text-6xl">📘</div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">Guide Book Lengkap</h3>
                    <p className="text-sm text-white/70">
                      Baca panduan lengkap dalam format PDF dengan contoh dan penjelasan terperinci
                    </p>
                  </div>

                  <button
                    onClick={() => setShowPDF(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Buka PDF 📄
                  </button>

                  <div className="pt-6 border-t border-white/10 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cyan-400">📄</span>
                      <span>Format: PDF</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cyan-400">📖</span>
                      <span>Halaman Lengkap</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cyan-400">⚡</span>
                      <span>Instant Loading</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <h4 className="font-bold text-purple-400 mb-4 flex items-center gap-2">
                  <span>💡</span> Tips Penting
                </h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Siapkan data Anda sebelum memulai analisis</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Pastikan jumlah data cukup (minimal 30)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Baca hasil dengan teliti sebelum kesimpulan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF MODAL */}
      {showPDF && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border-2 border-cyan-500/50 rounded-2xl w-full h-full max-h-[90vh] max-w-5xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-cyan-400">📘 Guide Book PDF</h2>
              <button
                onClick={() => setShowPDF(false)}
                className="text-3xl text-white/60 hover:text-white transition-colors hover:scale-110"
              >
                ✕
              </button>
            </div>

            {/* PDF Viewer - Using iframe */}
            <div className="flex-1 overflow-hidden bg-white/5">
              <iframe
                src="/file/Latihan.pdf#toolbar=1&navpanes=0&scrollbar=1"
                className="w-full h-full border-0"
                title="Guide Book PDF"
                style={{ background: "#ffffff" }}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 border-t border-white/10 bg-white/5">
              <p className="text-sm text-white/60">📘 Panduan Lengkap Uji Normalitas Data Metode Garis Lurus</p>
              <div className="flex gap-3">
                <a
                  href="/file/Latihan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all text-sm font-semibold"
                >
                  🔗 Buka Tab Baru
                </a>
                <a
                  href="/file/Latihan.pdf"
                  download="Panduan_Uji_Normalitas.pdf"
                  className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all text-sm font-semibold"
                >
                  ⬇️ Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
