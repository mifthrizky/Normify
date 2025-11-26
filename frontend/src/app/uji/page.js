"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import * as XLSX from "xlsx";

export default function UjiPage() {
  // --- STATE MANAGEMENT ---
  const [rows, setRows] = useState([{ xi: "", fi: "" }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [rowsToAdd, setRowsToAdd] = useState(1);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importError, setImportError] = useState("");
  const searchParams = useSearchParams();

  // === LOAD RESULT FROM URL ===
  useEffect(() => {
    const resultParam = searchParams.get("result");
    if (resultParam) {
      try {
        const decodedResult = JSON.parse(atob(resultParam));
        setResult(decodedResult);
      } catch (err) {
        console.error("Error decoding result:", err);
        setError("Link tidak valid atau rusak.");
      }
    }
  }, [searchParams]);

  // --- HANDLERS ---
  const handleAddRowsConfirm = () => {
    const numRows = parseInt(rowsToAdd);
    if (numRows < 1) {
      alert("Masukkan jumlah baris minimal 1");
      return;
    }

    const newRows = Array(numRows)
      .fill(null)
      .map(() => ({ xi: "", fi: "" }));
    setRows([...rows, ...newRows]);
    setShowAddModal(false);
    setRowsToAdd(1);
  };

  // === DOWNLOAD TEMPLATE ===
  const handleDownloadTemplate = () => {
    const templateData = [
      { xi: 2, fi: 3 },
      { xi: 4, fi: 6 },
      { xi: 6, fi: 9 },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Set column widths
    worksheet["!cols"] = [{ wch: 12 }, { wch: 12 }];

    // Add header styling
    worksheet["A1"].font = { bold: true, size: 12 };
    worksheet["B1"].font = { bold: true, size: 12 };

    XLSX.writeFile(workbook, "Template_Uji_Normalitas.xlsx");
  };

  // === IMPORT EXCEL ===
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFile(file);
    setImportError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Parse data from Excel
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Validasi columns
        if (jsonData.length === 0) {
          setImportError("❌ File Excel kosong atau tidak valid.");
          return;
        }

        // Check if columns exist (case-insensitive)
        const firstRow = jsonData[0];
        const hasXi = Object.keys(firstRow).some((key) => key.toLowerCase().includes("xi"));
        const hasFi = Object.keys(firstRow).some((key) => key.toLowerCase().includes("fi"));

        if (!hasXi || !hasFi) {
          setImportError("❌ Kolom tidak valid! File harus memiliki kolom 'Xi' dan 'Fi'.");
          return;
        }

        // Map data properly
        const xiKey = Object.keys(firstRow).find((key) => key.toLowerCase().includes("xi"));
        const fiKey = Object.keys(firstRow).find((key) => key.toLowerCase().includes("fi"));

        const importedData = jsonData
          .map((row) => ({
            xi: row[xiKey]?.toString() || "",
            fi: row[fiKey]?.toString() || "",
          }))
          .filter((row) => row.xi !== "" && row.fi !== "" && row.xi !== "undefined" && row.fi !== "undefined");

        if (importedData.length === 0) {
          setImportError("❌ Tidak ada data valid yang ditemukan di file Excel.");
          return;
        }

        setRows(importedData);
        setShowImportModal(false);
        setImportFile(null);
      } catch (err) {
        console.error("Import error:", err);
        setImportError("❌ Gagal membaca file Excel. Pastikan format file benar.");
      }
    };

    reader.readAsArrayBuffer(file);
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

    // Cek apakah ada input yang kosong
    const emptyFields = [];
    rows.forEach((row, index) => {
      if (row.xi === "" || row.xi === null) {
        emptyFields.push(`Baris ${index + 1}: Nilai Xi kosong`);
      }
      if (row.fi === "" || row.fi === null) {
        emptyFields.push(`Baris ${index + 1}: Frekuensi Fi kosong`);
      }
    });

    if (emptyFields.length > 0) {
      setError(`❌ Ada data yang kosong:\n${emptyFields.join("\n")}`);
      setLoading(false);
      return;
    }

    // Validasi Input - parse dan filter
    const cleanedData = rows
      .map((r) => ({
        xi: parseFloat(r.xi),
        fi: parseFloat(r.fi),
      }))
      .filter((r) => !isNaN(r.xi) && !isNaN(r.fi));

    if (cleanedData.length < 2) {
      setError("⚠️ Mohon masukkan minimal 2 baris data yang valid (tidak kosong dan berupa angka).");
      setLoading(false);
      return;
    }

    if (cleanedData.length < rows.length) {
      const validCount = cleanedData.length;
      const invalidCount = rows.length - validCount;
      setError(
        `⚠️ ${invalidCount} baris diabaikan karena tidak valid. Hanya ${validCount} baris yang digunakan untuk perhitungan.`
      );
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

  const renderEquation = () => {
    if (!result?.statistics) return "";
    const m = result.statistics.slope_m.toFixed(4);
    const c = result.statistics.intercept_c.toFixed(4);
    const sign = parseFloat(c) >= 0 ? "+" : "-";
    return `u' = ${m}(xi) ${sign} ${Math.abs(parseFloat(c)).toFixed(4)}`;
  };

  // === SHARE LINK ===
  const handleShareLink = () => {
    try {
      const baseUrl = window.location.origin;
      const resultData = btoa(JSON.stringify(result));
      const shareUrl = `${baseUrl}/uji?result=${resultData}`;

      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      });
    } catch (error) {
      console.error("Share Error:", error);
      alert("Gagal menyalin link.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
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
              Uji Kenormalan Data
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Metode Garis Lurus
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Analisis distribusi data menggunakan regresi linear dan curve fitting
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative py-12 px-4 pb-32">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* === LEFT: INPUT FORM === */}
            <div className="lg:col-span-4 h-fit sticky top-32">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">📝</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Input Data
                  </span>
                  <span className="ml-auto text-sm font-normal text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-full">
                    {rows.length} Baris
                  </span>
                </h2>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm text-yellow-200 mb-6">
                  <strong className="text-yellow-400">💡 Tips:</strong> Masukkan data Xi dari terkecil ke terbesar
                </div>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                  <div className="flex font-semibold text-white/60 text-xs uppercase tracking-wider gap-2 px-2">
                    <div className="w-1/2">Nilai (Xi)</div>
                    <div className="w-1/2">Frekuensi (Fi)</div>
                  </div>

                  {rows.map((row, index) => (
                    <div key={index} className="flex gap-2 items-center group">
                      <input
                        type="number"
                        value={row.xi}
                        onChange={(e) => handleInputChange(index, "xi", e.target.value)}
                        placeholder="0"
                        className="w-1/2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition text-white text-sm placeholder-white/30"
                      />
                      <input
                        type="number"
                        value={row.fi}
                        onChange={(e) => handleInputChange(index, "fi", e.target.value)}
                        placeholder="0"
                        className="w-1/2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition text-white text-sm placeholder-white/30"
                      />
                      {rows.length > 1 && (
                        <button
                          onClick={() => removeRow(index)}
                          className="text-white/30 hover:text-red-500 transition p-1 font-bold opacity-0 group-hover:opacity-100"
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
                    onClick={() => setShowAddModal(true)}
                    className="w-full py-2.5 border-2 border-dashed border-white/20 text-white/60 font-semibold rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10 transition"
                  >
                    + Tambah Baris
                  </button>
                  <button
                    onClick={() => setShowImportModal(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 text-green-300 font-semibold rounded-lg hover:border-green-500/80 hover:bg-green-500/30 transition"
                  >
                    📥 Import dari Excel
                  </button>
                  <button
                    onClick={handleCalculate}
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⚙️</span>
                        Sedang Menghitung...
                      </span>
                    ) : (
                      "HITUNG HASIL 🚀"
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-lg flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* === RIGHT: HASIL === */}
            <div className="lg:col-span-8 space-y-6">
              {!result ? (
                <div className="backdrop-blur-xl bg-white/5 border-2 border-dashed border-white/10 rounded-2xl h-96 flex flex-col items-center justify-center text-white/40">
                  <div className="text-7xl mb-4">📊</div>
                  <p className="font-semibold text-lg">Masukkan data dan klik "HITUNG HASIL"</p>
                  <p className="text-sm mt-2">Hasil analisis akan ditampilkan di sini</p>
                </div>
              ) : (
                <div id="result-container" className="space-y-6 bg-black/50 rounded-2xl p-6">
                  {/* 1. KESIMPULAN */}
                  <div
                    className={`backdrop-blur-xl border-l-8 rounded-2xl p-8 transition-all ${
                      result?.statistics?.is_normal
                        ? "bg-green-500/10 border-green-500/50 hover:border-green-500/80"
                        : "bg-red-500/10 border-red-500/50 hover:border-red-500/80"
                    }`}
                  >
                    <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-3">
                      📌 Kesimpulan Akhir
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-4xl font-black ${
                            result?.statistics?.is_normal ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {result?.statistics?.is_normal ? "✓ NORMAL" : "✗ TIDAK NORMAL"}
                        </span>
                        <div className="flex-1 text-right">
                          <p className="text-sm text-white/70">R² = {result?.statistics?.r_squared}</p>
                          <p className="text-xs text-white/50">
                            {result?.statistics?.is_normal ? "(Garis sangat lurus)" : "(Garis tidak lurus)"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. STATISTIK RINGKAS */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon="📊" label="Mean" value={result.statistics.mean} />
                    <StatCard icon="📈" label="Std Dev" value={result.statistics.std_dev} />
                    <StatCard icon="📐" label="Slope (m)" value={result.statistics.slope_m} />
                    <StatCard icon="📍" label="Intercept (c)" value={result.statistics.intercept_c} />
                  </div>

                  {/* 3. PERSAMAAN REGRESI */}
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-cyan-500/30 transition-all">
                    <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-4">
                      📐 Persamaan Regresi Linear
                    </p>
                    <p className="text-2xl md:text-4xl font-mono font-bold text-white tracking-tight mb-3">
                      {renderEquation()}
                    </p>
                    <p className="text-xs text-white/60">
                      Persamaan garis untuk menghitung nilai u' (standardized normal)
                    </p>
                  </div>

                  {/* 4. GRAFIK */}
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all">
                    <h3 className="text-xl font-bold mb-6 text-white">📉 Grafik Pemeriksa Kenormalan</h3>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={result.table_data}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                          <XAxis
                            dataKey="xi"
                            stroke="rgba(255,255,255,0.5)"
                            label={{
                              value: "Nilai (Xi)",
                              position: "insideBottom",
                              offset: -5,
                              fill: "rgba(255,255,255,0.7)",
                            }}
                          />
                          <YAxis
                            stroke="rgba(255,255,255,0.5)"
                            label={{
                              value: "Frekuensi",
                              angle: -90,
                              position: "insideLeft",
                              fill: "rgba(255,255,255,0.7)",
                            }}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: "8px",
                              border: "1px solid rgba(255,255,255,0.2)",
                              backgroundColor: "rgba(0,0,0,0.8)",
                              color: "#fff",
                            }}
                          />
                          <Legend verticalAlign="top" height={36} wrapperStyle={{ color: "rgba(255,255,255,0.8)" }} />
                          <Bar name="Fi (Data Asli)" dataKey="fi" barSize={40} fill="#06b6d4" radius={[4, 4, 0, 0]} />
                          <Line
                            name="f(x') (Kurva Normal)"
                            type="monotone"
                            dataKey="f_x_accent"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            dot={{
                              r: 4,
                              fill: "#8b5cf6",
                              strokeWidth: 2,
                            }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 5. TABEL DETAIL */}
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all overflow-x-auto">
                    <h3 className="text-xl font-bold mb-6 text-white">📋 Tabel Perhitungan Detail</h3>
                    <table className="w-full text-xs text-white/80 border-collapse">
                      <thead className="uppercase bg-white/5 border-b border-white/10 text-white/60 font-bold text-[10px]">
                        <tr>
                          <th className="px-3 py-3 text-left">No</th>
                          <th className="px-3 py-3 text-left">Xi</th>
                          <th className="px-3 py-3 text-left bg-cyan-500/10">Fi</th>
                          <th className="px-3 py-3 text-left">F Kum</th>
                          <th className="px-3 py-3 text-left">F %</th>
                          <th className="px-3 py-3 text-left bg-yellow-500/10">u (Tabel)</th>
                          <th className="px-3 py-3 text-left bg-green-500/10">u' (Regresi)</th>
                          <th className="px-3 py-3 text-left">p(u')</th>
                          <th className="px-3 py-3 text-left">p(x')</th>
                          <th className="px-3 py-3 text-left bg-purple-500/10">f(x')</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.table_data.map((row, idx) => (
                          <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition">
                            <td className="px-3 py-3 text-center text-white/60">{idx + 1}</td>
                            <td className="px-3 py-3 font-semibold">{row.xi}</td>
                            <td className="px-3 py-3 font-bold text-cyan-400 bg-cyan-500/10">{row.fi}</td>
                            <td className="px-3 py-3">{row.f_kum}</td>
                            <td className="px-3 py-3">{(row.f_percent * 100).toFixed(4)}%</td>
                            <td className="px-3 py-3 font-mono bg-yellow-500/10 text-yellow-300">
                              {row.u_obs.toFixed(4)}
                            </td>
                            <td className="px-3 py-3 font-mono font-bold bg-green-500/10 text-green-300">
                              {row.u_pred.toFixed(4)}
                            </td>
                            <td className="px-3 py-3">{row.p_u_accent.toFixed(4)}</td>
                            <td className="px-3 py-3">{row.p_x_accent.toFixed(4)}</td>
                            <td className="px-3 py-3 font-bold text-purple-300 bg-purple-500/10">
                              {row.f_x_accent.toFixed(4)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* SHARE LINK SECTION */}
                  <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all">
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                      <span>🔗</span> Bagikan Hasil
                    </h3>
                    <button
                      onClick={handleShareLink}
                      className={`w-full px-6 py-3 rounded-lg font-semibold transition hover:scale-105 text-lg ${
                        copySuccess
                          ? "bg-green-500/30 border-2 border-green-500/50 text-green-300"
                          : "bg-purple-500/30 border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/40"
                      }`}
                    >
                      {copySuccess ? "✓ Link Berhasil Disalin!" : "📋 Salin Link Hasil"}
                    </button>
                    <p className="text-xs text-white/60 mt-3 text-center">
                      Simpan / bagikan link ini untuk menampilkan hasil analisis
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === MODAL TAMBAH BARIS === */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border-2 border-cyan-500/50 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-cyan-500/20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                <span>➕</span> Tambah Baris
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setRowsToAdd(1);
                }}
                className="text-3xl text-white/60 hover:text-white transition hover:scale-110"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 mb-6">
              <p className="text-white/70">Berapa baris data yang ingin Anda tambahkan?</p>
              <input
                type="number"
                min="1"
                max="100"
                value={rowsToAdd}
                onChange={(e) => setRowsToAdd(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border-2 border-cyan-500/30 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition text-white text-lg font-semibold text-center placeholder-white/30"
                placeholder="Jumlah baris"
                autoFocus
              />
              <p className="text-xs text-white/50">Minimal: 1 baris | Maksimal: 100 baris</p>
            </div>

            {/* Preview */}
            <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-sm text-white/70">
                Total baris akan menjadi:{" "}
                <span className="font-bold text-cyan-400">{rows.length + parseInt(rowsToAdd || 0)} baris</span>
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setRowsToAdd(1);
                }}
                className="flex-1 px-4 py-3 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition"
              >
                Batal
              </button>
              <button
                onClick={handleAddRowsConfirm}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:scale-105 transition"
              >
                Tambahkan ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === MODAL IMPORT EXCEL === */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border-2 border-green-500/50 rounded-2xl p-8 w-full max-w-2xl shadow-2xl shadow-green-500/20 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
                <span>📥</span> Import dari Excel
              </h2>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportFile(null);
                  setImportError("");
                }}
                className="text-3xl text-white/60 hover:text-white transition hover:scale-110"
              >
                ✕
              </button>
            </div>

            {/* Info Box */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-blue-200 leading-relaxed">
                <strong className="text-blue-400">ℹ️ Format File:</strong> File Excel harus memiliki 2 kolom dengan
                header <span className="font-mono bg-black/50 px-2 py-1 rounded">Xi</span> dan{" "}
                <span className="font-mono bg-black/50 px-2 py-1 rounded">Fi</span>. Download template di bawah untuk
                referensi format yang benar.
              </p>
            </div>

            {/* Template Download */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-white/70 mb-3">📋 Langkah 1: Download Template</p>
              <button
                onClick={handleDownloadTemplate}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 text-blue-300 font-semibold rounded-lg hover:border-blue-500/80 hover:bg-blue-500/30 transition"
              >
                ⬇️ Download Template Excel
              </button>
              <p className="text-xs text-white/50 mt-2">Template sudah memiliki format yang tepat dengan data contoh</p>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-white/70 mb-3">📤 Langkah 2: Pilih File Excel</p>
              <label className="block">
                <input type="file" accept=".xlsx,.xls" onChange={handleImportFile} className="hidden" />
                <div className="w-full px-4 py-6 bg-white/5 border-2 border-dashed border-green-500/50 rounded-lg cursor-pointer hover:border-green-500/80 hover:bg-white/10 transition text-center">
                  <p className="text-3xl mb-2">📁</p>
                  <p className="text-white font-semibold">Klik untuk memilih file</p>
                  <p className="text-xs text-white/60 mt-1">atau drag and drop file Excel di sini</p>
                  {importFile && <p className="text-xs text-green-400 mt-2">✓ {importFile.name}</p>}
                </div>
              </label>
            </div>

            {/* Tips */}
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="text-xs text-yellow-200 leading-relaxed space-y-2">
                <div>
                  <strong className="text-yellow-400">💡 Tips:</strong>
                </div>
                <div>
                  • Kolom pertama harus bernama <span className="font-mono bg-black/50 px-1">Xi</span> (nilai data)
                </div>
                <div>
                  • Kolom kedua harus bernama <span className="font-mono bg-black/50 px-1">Fi</span> (frekuensi)
                </div>
                <div>• Data harus berupa angka (tidak ada teks/simbol)</div>
                <div>• Baris kosong akan diabaikan secara otomatis</div>
              </div>
            </div>

            {/* Error Message */}
            {importError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-lg flex items-start gap-2">
                <span className="text-lg">❌</span>
                <span className="text-xs">{importError}</span>
              </div>
            )}

            {/* Footer */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportFile(null);
                  setImportError("");
                }}
                className="flex-1 px-4 py-3 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition"
              >
                Batal
              </button>
              <button
                disabled={!importFile}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg shadow-green-500/50 hover:shadow-xl hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✓ Import Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 hover:bg-white/10 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-lg md:text-xl font-bold text-white">{value}</p>
    </div>
  );
}
