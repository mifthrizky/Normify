export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">Panduan Penggunaan</h1>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-blue-500">
          <h3 className="text-xl font-bold mb-2">1. Persiapkan Data</h3>
          <p>Pastikan Anda sudah memiliki data distribusi frekuensi yang terdiri dari:</p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>
              <strong>Xi (Nilai Tengah):</strong> Nilai tengah dari interval kelas.
            </li>
            <li>
              <strong>Fi (Frekuensi):</strong> Jumlah data pada interval tersebut.
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-purple-500">
          <h3 className="text-xl font-bold mb-2">2. Masukkan Data ke Aplikasi</h3>
          <p>
            Masuk ke halaman <strong>"Uji Kenormalan"</strong>. Masukkan nilai Xi dan Fi satu per satu. Tekan tombol{" "}
            <strong>"Tambah Baris"</strong> jika Anda memiliki lebih banyak kelas interval.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-green-500">
          <h3 className="text-xl font-bold mb-2">3. Analisis Hasil</h3>
          <p>Setelah tombol hitung ditekan, aplikasi akan menampilkan:</p>
          <ul className="list-disc ml-6 mt-2 text-gray-600">
            <li>Tabel perhitungan lengkap (Z-score, Luas tabel, dll).</li>
            <li>Kesimpulan akhir (Normal / Tidak Normal).</li>
            <li>Grafik visualisasi sebaran data.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
