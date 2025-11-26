"use client";

import { useState } from "react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function UjiPage() {
  // --- STATE MANAGEMENT ---
  const [rows, setRows] = useState([{ xi: "", fi: "" }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // --- HANDLERS ---
  const addRow = () => {
    setRows([...rows, { xi: "", fi: "" }]);
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

    // Validasi Input
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
      const response = await fetch("http://localhost:8000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: cleanedData }),
      });

      const data = await response.json();

      // CEK KEAMANAN: Pastikan data statistics ada
      if (!response.ok || !data.statistics) {
        throw new Error(data.detail || "Terjadi kesalahan pada perhitungan backend.");
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal menghitung. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk memformat persamaan (menangani tanda plus/minus)
  const renderEquation = () => {
    if (!result?.statistics) return "";
    const m = result.statistics.slope_m;
    const c = result.statistics.intercept_c;
    const sign = c >= 0 ? "+" : "-";
    // Menampilkan u' = m(xi) ± c
    return `u' = ${m}(xi) ${sign} ${Math.abs(c)}`;
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-2 text-center text-blue-900">Uji Kenormalan Data</h1>
      <p className="text-center text-gray-500 mb-8">Metode Normalisasi Kurva (Curve Fitting & Regresi Linear)</p>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* === INPUT FORM === */}
        <div className="lg:col-span-4 h-fit sticky top-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 flex justify-between items-center">
              <span>📝 Input Data</span>
              <span className="text-xs font-normal text-gray-500">{rows.length} Baris</span>
            </h2>

            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 mb-4">
              <strong>Tips:</strong> Masukkan data Xi secara berurutan dari terkecil ke terbesar.
            </div>

            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
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
                    className="w-1/2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                  />
                  <input
                    type="number"
                    value={row.fi}
                    onChange={(e) => handleInputChange(index, "fi", e.target.value)}
                    placeholder="0"
                    className="w-1/2 p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                  />
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(index)}
                      className="text-gray-400 hover:text-red-500 transition p-1 font-bold"
                      title="Hapus Baris"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={addRow}
                className="w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-500 font-medium rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                + Tambah Baris
              </button>
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sedang Menghitung..." : "HITUNG HASIL 🚀"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">⚠️ {error}</div>
            )}
          </div>
        </div>

        {/* === HASIL === */}
        <div className="lg:col-span-8 space-y-6">
          {!result ? (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 h-96 flex flex-col items-center justify-center text-gray-400">
              <div className="text-6xl mb-4 opacity-50">📊</div>
              <p className="font-medium">Hasil analisis akan muncul di sini</p>
            </div>
          ) : (
            <>
              {/* 1. KOTAK KESIMPULAN (Dengan Safety Check ?.) */}
              <div
                className={`p-6 rounded-xl border-l-8 shadow-sm ${
                  result?.statistics?.is_normal ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                }`}
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Kesimpulan Akhir</h3>
                <div className="flex flex-col md:flex-row md:items-end gap-3 mt-1">
                  <span
                    className={`text-3xl font-bold ${
                      result?.statistics?.is_normal ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    DATA {result?.statistics?.conclusion}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Didasarkan pada tingkat kelurusan garis probabilitas (Regresi Linear). <br />
                  <strong>R-Squared (R²) = {result?.statistics?.r_squared}</strong>
                  {result?.statistics?.is_normal
                    ? " (Mendekati 1.0, sangat lurus)"
                    : " (Jauh dari 1.0, garis tidak lurus)"}
                  .
                </p>
              </div>

              {/* 2. STATISTIK RINGKAS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Rata-rata (Mean)" value={result.statistics.mean} />
                <StatCard label="Standar Deviasi" value={result.statistics.std_dev} />
                <StatCard label="Slope (Kemiringan m)" value={result.statistics.slope_m} />
                <StatCard label="Intercept (c)" value={result.statistics.intercept_c} />
              </div>

              {/* === BARU: KOTAK PERSAMAAN GARIS === */}
              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl text-center shadow-sm">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-2">
                  Persamaan Regresi Linear (y = mx + c)
                </p>
                <p className="text-2xl md:text-3xl font-mono font-bold text-blue-900 tracking-tight">
                  {renderEquation()}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Digunakan untuk mencari nilai <strong>u'</strong> di tabel bawah.
                </p>
              </div>

              {/* 3. GRAFIK */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-bold mb-6 text-gray-800">Grafik Pemeriksa Kenormalan (Fi vs f(x'))</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={result.table_data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="xi" label={{ value: "Nilai (Xi)", position: "insideBottom", offset: -5 }} />
                      <YAxis label={{ value: "Frekuensi", angle: -90, position: "insideLeft" }} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Bar name="Fi (Data Asli)" dataKey="fi" barSize={40} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Line
                        name="f(x') (Kurva Normal)"
                        type="monotone"
                        dataKey="f_x_accent"
                        stroke="#ff7300"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#ff7300", strokeWidth: 2 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 4. TABEL DETAIL */}
              <div className="bg-white p-6 rounded-xl shadow-sm border overflow-x-auto">
                <h3 className="text-lg font-bold mb-4 text-gray-800">Tabel Perhitungan Detail</h3>
                <table className="w-full text-xs text-left text-gray-600 border-collapse">
                  <thead className="uppercase bg-gray-100 text-gray-700 font-bold text-[10px] md:text-xs">
                    <tr>
                      <th className="px-3 py-3 border">No</th>
                      <th className="px-3 py-3 border">Xi</th>
                      <th className="px-3 py-3 border bg-blue-50 text-blue-800">Fi</th>
                      <th className="px-3 py-3 border">F Kum</th>
                      <th className="px-3 py-3 border">F %</th>
                      <th className="px-3 py-3 border bg-yellow-50 text-yellow-800">u (Tabel)</th>
                      <th className="px-3 py-3 border bg-green-50 text-green-800">u' (Regresi)</th>
                      <th className="px-3 py-3 border">p(u')</th>
                      <th className="px-3 py-3 border">p(x')</th>
                      <th className="px-3 py-3 border bg-orange-50 text-orange-800">f(x')</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.table_data.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50 transition">
                        <td className="px-3 py-3 border text-center">{idx + 1}</td>
                        <td className="px-3 py-3 border font-medium">{row.xi}</td>
                        <td className="px-3 py-3 border font-bold text-blue-600 bg-blue-50/30">{row.fi}</td>
                        <td className="px-3 py-3 border">{row.f_kum}</td>
                        <td className="px-3 py-3 border">{(row.f_percent * 100).toFixed(4)}%</td>
                        <td className="px-3 py-3 border bg-yellow-50/30 font-mono">{row.u_obs.toFixed(4)}</td>
                        <td className="px-3 py-3 border bg-green-50/30 font-mono font-semibold">
                          {row.u_pred.toFixed(4)}
                        </td>
                        <td className="px-3 py-3 border">{row.p_u_accent.toFixed(4)}</td>
                        <td className="px-3 py-3 border">{row.p_x_accent.toFixed(4)}</td>
                        <td className="px-3 py-3 border bg-orange-50/30 font-bold text-orange-600">
                          {row.f_x_accent.toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <p className="text-[10px] md:text-xs text-gray-500 uppercase font-semibold mb-1">{label}</p>
      <p className="text-lg md:text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
