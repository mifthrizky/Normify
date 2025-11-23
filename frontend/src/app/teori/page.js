export default function TeoriPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 border-b pb-4">Teori Uji Normalitas Chi-Square</h1>

      <div className="space-y-6 text-lg leading-relaxed text-gray-700">
        <p>
          Uji Chi-Square ($\chi^2$) adalah salah satu metode statistik non-parametrik yang digunakan untuk menguji
          apakah sebaran data observasi sesuai dengan sebaran data teoretis (dalam hal ini, Distribusi Normal).
        </p>

        <h2 className="text-2xl font-semibold mt-4 text-gray-900">Langkah Perhitungan</h2>
        <ol className="list-decimal list-inside space-y-3 pl-4">
          <li>
            <strong>Menghitung Rata-rata (x̄):</strong>
            <div className="bg-gray-100 p-3 rounded mt-1 font-mono text-sm">Mean = Σ(fi . xi) / Σfi</div>
          </li>
          <li>
            <strong>Menghitung Standar Deviasi ($S$):</strong>
            <div className="bg-gray-100 p-3 rounded mt-1 font-mono text-sm">S = √[ Σfi(xi - x̄)² / (n - 1) ]</div>
          </li>
          <li>
            <strong>Menentukan Nilai Z (Z-Score):</strong>
            <p className="mt-1">Mengubah batas kelas nyata menjadi nilai baku Z.</p>
            <div className="bg-gray-100 p-3 rounded mt-1 font-mono text-sm">Z = (Batas Kelas - Mean) / S</div>
          </li>
          <li>
            <strong>Menghitung Chi-Square Hitung:</strong>
            <div className="bg-gray-100 p-3 rounded mt-1 font-mono text-sm">χ² = Σ [ (fo - fe)² / fe ]</div>
            <p className="text-sm mt-1">
              Dimana <em>fo</em> adalah frekuensi observasi dan <em>fe</em> adalah frekuensi ekspektasi.
            </p>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-4 text-gray-900">Pengambilan Keputusan</h2>
        <ul className="list-disc list-inside pl-4">
          <li>
            Jika <strong>$\chi^2$ Hitung {"<"} $\chi^2$ Tabel</strong>, maka data berdistribusi{" "}
            <span className="text-green-600 font-bold">NORMAL</span>.
          </li>
          <li>
            Jika <strong>$\chi^2$ Hitung {">"} $\chi^2$ Tabel</strong>, maka data{" "}
            <span className="text-red-600 font-bold">TIDAK NORMAL</span>.
          </li>
        </ul>
      </div>
    </div>
  );
}
