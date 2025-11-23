"use client";

import { useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

export default function UjiPage() {
  // --- STATE MANAGEMENT ---
  const [rows, setRows] = useState([{ xi: "", fi: "" }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showAddRowModal, setShowAddRowModal] = useState(false);
  const [addRowCount, setAddRowCount] = useState(1);

  // --- HANDLERS ---
  const addRow = (count = 1) => {
    const newRows = Array(count)
      .fill(null)
      .map(() => ({ xi: "", fi: "" }));
    setRows([...rows, ...newRows]);
    setShowAddRowModal(false);
    setAddRowCount(1);
  };

  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    // 1. Validasi Input: Pastikan tidak ada yang kosong dan ubah ke Number
    const cleanedData = rows
      .map((r) => ({
        xi: parseFloat(r.xi),
        fi: parseFloat(r.fi),
      }))
      .filter((r) => !isNaN(r.xi) && !isNaN(r.fi));

    if (cleanedData.length < 2) {
      setError("Mohon masukkan minimal 2 baris data yang valid.");
      setLoading(false);
      return;
    }

    try {
      // 2. Tembak API Backend (Python)
      const response = await fetch("http://localhost:8000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: cleanedData }),
      });

      if (!response.ok) {
        throw new Error("Gagal menghitung. Cek koneksi backend.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">Uji Kenormalan Data (Chi-Square)</h1>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* === BAGIAN KIRI: INPUT FORM === */}
        <div className="lg:col-span-4 h-fit sticky top-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 flex justify-between items-center">
              <span>📝 Input Data</span>
              <span className="text-xs font-normal text-gray-500">{rows.length} Baris</span>
            </h2>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex font-semibold text-gray-600 text-xs text-center uppercase tracking-wide">
                <div className="w-1/2">Nilai (Xi)</div>
                <div className="w-1/2">Frekuensi (Fi)</div>
                <div className="w-8"></div>
              </div>

              {rows.map((row, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={row.xi}
                    onChange={(e) => handleInputChange(index, "xi", e.target.value)}
                    placeholder="0"
                    className="w-1/2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                  />
                  <input
                    type="number"
                    value={row.fi}
                    onChange={(e) => handleInputChange(index, "fi", e.target.value)}
                    placeholder="0"
                    className="w-1/2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                  />
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(index)}
                      className="text-gray-400 hover:text-red-500 transition p-1"
                      title="Hapus Baris"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => setShowAddRowModal(true)}
                className="w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-500 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                + Tambah Data
              </button>
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sedang Menghitung..." : "HITUNG HASIL 🚀"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">⚠️ {error}</div>
            )}
          </div>
        </div>

        {/* === MODAL TAMBAH BARIS === */}
        {showAddRowModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Tambah Berapa Baris?</h3>
              <input
                type="number"
                min="1"
                max="100"
                value={addRowCount}
                onChange={(e) => setAddRowCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg font-semibold text-center"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">Masukkan jumlah baris (1-100)</p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddRowModal(false)}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  onClick={() => addRow(addRowCount)}
                  className="flex-1 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Tambahkan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* === BAGIAN KANAN: HASIL === */}
        <div className="lg:col-span-8 space-y-6">
          {!result ? (
            // Placeholder State (Belum ada hasil)
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 h-96 flex flex-col items-center justify-center text-gray-400">
              <div className="text-6xl mb-4 opacity-50">📊</div>
              <p className="font-medium">Hasil analisis akan muncul di sini</p>
              <p className="text-sm mt-1">Masukkan data disamping lalu klik Hitung</p>
            </div>
          ) : (
            // Result View
            <>
              {/* 1. KOTAK KESIMPULAN */}
              <div
                className={`p-6 rounded-xl border-l-8 shadow-sm ${
                  result.statistics.is_normal ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-700">Kesimpulan Akhir</h3>
                <div className="flex items-end gap-3 mt-1">
                  <span
                    className={`text-4xl font-bold ${result.statistics.is_normal ? "text-green-700" : "text-red-700"}`}
                  >
                    DATA {result.statistics.conclusion}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">
                  Karena nilai <strong>Chi-Square Hitung ({result.statistics.chi_square_hitung})</strong>{" "}
                  {result.statistics.is_normal ? "lebih kecil" : "lebih besar"} dari{" "}
                  <strong>Chi-Square Tabel ({result.statistics.chi_square_tabel})</strong>.
                </p>
              </div>

              {/* 2. STATISTIK RINGKAS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Rata-rata (Mean)" value={result.statistics.mean} />
                <StatCard label="Standar Deviasi" value={result.statistics.std_dev} />
                <StatCard label="Total Data (N)" value={result.statistics.total_data} />
                <StatCard label="Derajat Kebebasan" value={result.statistics.dk} />
              </div>

              {/* 3. GRAFIK */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-bold mb-6 text-gray-800">Visualisasi Observasi vs Ekspektasi</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={result.table_data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="xi"
                        label={{
                          value: "Nilai Tengah (Xi)",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        name="Frekuensi Observasi (fo)"
                        dataKey="fi"
                        barSize={40}
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        name="Frekuensi Ekspektasi (fe)"
                        type="monotone"
                        dataKey="fe"
                        stroke="#ff7300"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4 italic">
                  *Grafik Batang Biru = Data Asli Anda, Garis Oranye = Pola Distribusi Normal Ideal
                </p>
              </div>

              {/* 4. TABEL DETAIL */}
              <div className="bg-white p-6 rounded-xl shadow-sm border overflow-x-auto">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Tabel Perhitungan Detail</h3>
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">No</th>
                      <th className="px-4 py-3">Xi</th>
                      <th className="px-4 py-3">Fi (Obs)</th>
                      <th className="px-4 py-3">Batas Bawah</th>
                      <th className="px-4 py-3">Batas Atas</th>
                      <th className="px-4 py-3">Z Bawah</th>
                      <th className="px-4 py-3">Z Atas</th>
                      <th className="px-4 py-3">Luas Area</th>
                      <th className="px-4 py-3">Fe (Exp)</th>
                      <th className="px-4 py-3">Chi-Square</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.table_data.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{idx + 1}</td>
                        <td className="px-4 py-3">{row.xi}</td>
                        <td className="px-4 py-3 font-bold text-blue-600">{row.fi}</td>
                        <td className="px-4 py-3">{row.tb.toFixed(2)}</td>
                        <td className="px-4 py-3">{row.ta.toFixed(2)}</td>
                        <td className="px-4 py-3">{row.z_tb.toFixed(2)}</td>
                        <td className="px-4 py-3">{row.z_ta.toFixed(2)}</td>
                        <td className="px-4 py-3">{row.luas_area.toFixed(4)}</td>
                        <td className="px-4 py-3 font-bold text-orange-500">{row.fe.toFixed(2)}</td>
                        <td className="px-4 py-3">{row.chi_square_val.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100 font-bold text-gray-900">
                    <tr>
                      <td colSpan={9} className="px-4 py-3 text-right">
                        TOTAL CHI-SQUARE HITUNG :
                      </td>
                      <td className="px-4 py-3 text-blue-700">{result.statistics.chi_square_hitung}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Komponen Kecil untuk Kartu Statistik
function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
