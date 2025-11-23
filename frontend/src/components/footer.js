export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📊</span>
              <h3 className="text-xl font-bold text-white">Normify</h3>
            </div>
            <p className="text-sm text-gray-400">
              Platform interaktif untuk uji kenormalan data dengan metode Chi-Square.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Menu Utama</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/teori" className="hover:text-blue-400 transition">
                  Teori Dasar
                </a>
              </li>
              <li>
                <a href="/guide" className="hover:text-blue-400 transition">
                  Guide Book
                </a>
              </li>
              <li>
                <a href="/uji" className="hover:text-blue-400 transition">
                  Uji Kenormalan
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4">Fitur</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-blue-400">⚡ Perhitungan Real-time</span>
              </li>
              <li>
                <span className="hover:text-blue-400">📊 Visualisasi Grafik</span>
              </li>
              <li>
                <span className="hover:text-blue-400">📝 Langkah Rinci</span>
              </li>
              <li>
                <span className="hover:text-blue-400">🎓 Teori Lengkap</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tentang</h4>
            <p className="text-sm text-gray-400 mb-4">Dibuat dengan ❤️ untuk memudahkan pembelajaran statistika.</p>
            <div className="flex gap-3">
              <a href="#" className="text-xl hover:text-blue-400 transition">
                📧
              </a>
              <a href="#" className="text-xl hover:text-blue-400 transition">
                💻
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 Normify. Sistem Uji Kenormalan Statistika.</p>
            <p>Kelompok 3 | Projek Akhir Statistika</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
