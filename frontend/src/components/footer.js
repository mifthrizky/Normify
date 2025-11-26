export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-black/80 border-t border-white/5 text-white/70 mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg blur opacity-75" />
                <img src="/logo.png" alt="Normify Logo" className="relative w-12 h-12 rounded-lg" />
              </div>
              <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Normify
              </h3>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Platform otomatis untuk uji kenormalan data dengan metode garis lurus. Mengubah perhitungan manual 2-3 jam
              menjadi instant dalam 1 detik.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all text-lg"
              >
                📧
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 transition-all text-lg"
              >
                💻
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Menu Utama
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-400">→</span>
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/teori"
                  className="text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-cyan-400">→</span>
                  Teori Dasar
                </a>
              </li>
              <li>
                <a
                  href="/guide"
                  className="text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <span className="text-cyan-400">→</span>
                  Guide Book
                </a>
              </li>
              <li>
                <a href="/uji" className="text-white/60 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-cyan-400">→</span>
                  Uji Kenormalan
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Fitur Utama
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-white/60 flex items-center gap-2">
                <span className="text-cyan-400">⚡</span>
                Kalkulasi Real-time
              </li>
              <li className="text-white/60 flex items-center gap-2">
                <span className="text-purple-400">📊</span>
                Visualisasi Grafik
              </li>
              <li className="text-white/60 flex items-center gap-2">
                <span className="text-cyan-400">📝</span>
                Langkah Terperinci
              </li>
              <li className="text-white/60 flex items-center gap-2">
                <span className="text-purple-400">🎓</span>
                Teori Lengkap
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Tentang Kami
            </h4>
            <div className="space-y-4 text-sm">
              <p className="text-white/60 leading-relaxed">
                Solusi lengkap untuk uji normalitas data menggunakan metode garis lurus dengan akurasi 99.9%.
              </p>
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-3">
                <p className="text-white/80 font-semibold text-xs">📚 Kelompok 3 | Projek Akhir Statistika</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>&copy; 2025 Normify. Sistem Uji Kenormalan Statistika dengan Metode Garis Lurus.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
