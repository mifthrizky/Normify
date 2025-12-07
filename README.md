# Normify - Uji Normalitas Metode Garis Lurus

**Normify** adalah platform berbasis web modern yang mengotomatisasi proses Uji Normalitas Data menggunakan **Metode Garis Lurus (Straight Line Method)**. Aplikasi ini mengubah proses perhitungan statistik manual yang rumit dan memakan waktu menjadi analisis instan (kurang dari 1 detik) dengan akurasi tinggi, visualisasi interaktif, dan laporan mendetail.

---

## 📸 Tampilan Aplikasi

### Halaman Utama (Dashboard)
<img width="1872" height="963" alt="Normify Dashboard" src="https://github.com/user-attachments/assets/3884f985-bfc2-4d88-9367-6c1b7c0ecf92" />

### Halaman Perhitungan & Analisis Data
<div style="display: flex; gap: 10px;">
<img width="1122" height="935" alt="Input Data & Hasil" src="https://github.com/user-attachments/assets/608b6aaf-d40f-4e97-a469-56c5687401cb" />
<img width="702" height="592" alt="Grafik & Tabel Detail" src="https://github.com/user-attachments/assets/c2b84c6c-3752-4457-a3de-59e5dc7b9a55" />
</div>

### Panduan Pengguna (GuideBook)
<img width="659" height="914" alt="Guide Book" src="[https://github.com/user-attachments/assets/756203dd-5d54-4714-8aa9-c5050b38c0b8](https://drive.google.com/file/d/1lLwvr9uj_wh4OV-eETNV2-t0xNJmGFL4/view?usp=drive_link)" />

---

## ✨ Fitur Utama

* **⚡ Perhitungan Real-time:** Menghitung Mean, Standar Deviasi, Slope, Intercept, dan R-squared secara instan menggunakan backend Python yang dioptimasi.
* **📊 Visualisasi Interaktif:** Menampilkan grafik histogram data asli vs kurva normal ideal (f(x')) menggunakan `Recharts` untuk memudahkan interpretasi visual.
* **📥 Import & Export Data:** Mendukung input data manual serta impor massal dari file Excel (`.xlsx`) menggunakan template yang disediakan.
* **📝 Analisis Mendetail:** Menyajikan tabel perhitungan langkah demi langkah (F Kumulatif, Z-score/u, u', p(u'), dll) untuk transparansi akademis.
* **📘 Edukasi Terintegrasi:** Dilengkapi dengan halaman Teori Dasar dan Guide Book interaktif (termasuk viewer PDF) untuk membantu pengguna memahami konsep statistik di baliknya.
* **📱 Responsif Modern:** Antarmuka pengguna (UI) yang estetis dan responsif dibangun dengan Next.js dan Tailwind CSS.

---

## 🛠️ Teknologi yang Digunakan

Project ini dibangun dengan arsitektur **Microservices** menggunakan Docker.

### Frontend
* **Framework:** [Next.js 16](https://nextjs.org/) (React)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Visualization:** [Recharts](https://recharts.org/)
* **Data Handling:** [SheetJS (xlsx)](https://docs.sheetjs.com/)
* **PDF Viewer:** React-PDF / Native Object

### Backend
* **Language:** Python 3.9
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/)
* **Computation:** Pandas, NumPy, SciPy (untuk interpolasi statistik dan regresi linear)
* **Server:** Uvicorn

### Infrastructure
* **Containerization:** Docker & Docker Compose

---

## 🚀 Prasyarat Instalasi

Sebelum memulai, pastikan perangkat Anda telah terinstal:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Direkomendasikan)
* Atau secara manual: [Node.js](https://nodejs.org/) (v18+) dan [Python](https://www.python.org/) (v3.9+)

---

## 📦 Cara Menjalankan Project

### Metode 1: Menggunakan Docker (Direkomendasikan)

Cara termudah untuk menjalankan aplikasi tanpa konfigurasi environment manual.

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/mifthrizky/normify.git](https://github.com/mifthrizky/normify.git)
    cd normify
    ```

2.  **Jalankan dengan Docker Compose:**
    ```bash
    docker-compose up --build
    ```

3.  **Akses Aplikasi:**
    * Frontend: Buka [http://localhost:3000](http://localhost:3000)
    * Backend API Docs: Buka [http://localhost:8000/docs](http://localhost:8000/docs)

### Metode 2: Instalasi Manual

Jika Anda ingin menjalankan frontend dan backend secara terpisah.

**1. Menjalankan Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**2. Menjalankan Frontend: Buka terminal baru:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Akses aplikasi di http://localhost:3000.

## 📂 Susunan Project
```plaintext
normify/
├── docker-compose.yml      # Orkestrasi container
├── backend/                # Service Backend (Python/FastAPI)
│   ├── app/
│   │   ├── main.py         # Entry point API
│   │   └── calculation.py  # Logika perhitungan statistik (Core Logic)
│   ├── Dockerfile
│   └── requirements.txt
└── frontend/               # Service Frontend (Next.js)
    ├── public/             # Aset statis (Images, PDF Guide)
    ├── src/
    │   ├── app/            # App Router (Dashboard, Uji, Teori, Guide)
    │   └── components/     # Komponen UI (Navbar, Footer, Charts)
    ├── Dockerfile
    ├── package.json
    └── tailwind.config.js
```

## 💡 Contoh Penggunaan
1. Buka halaman Uji Kenormalan.
2. Masukkan data Nilai (Xi) dan Frekuensi (Fi) pada tabel input, atau klik Import dari Excel dan gunakan template yang tersedia.
3. Klik tombol HITUNG HASIL.Sistem akan menampilkan:
     Kesimpulan: Apakah data NORMAL atau MENYIMPANG.
     Statistik: Mean, Standar Deviasi, dan Persamaan Regresi Linear **(u' = mx + c)**.
     Grafik: Kurva lonceng yang membandingkan distribusi data Anda dengan distribusi normal teoritis.

## 🤝 Kontribusi
Kontribusi selalu diterima! Jika Anda ingin menambahkan fitur atau memperbaiki bug:
1. Fork repository ini.
2. Buat branch fitur baru (git checkout -b fitur-keren).
3. Commit perubahan Anda (git commit -m 'Menambahkan fitur keren').
4. Push ke branch (git push origin fitur-keren).
5. Buat Pull Request.

## 📄 Lisensi
Project ini dilisensikan di bawah MIT License.

**Dibuat dengan ❤️ oleh <b>Miftah Rizky</b> & Tim Normify**

