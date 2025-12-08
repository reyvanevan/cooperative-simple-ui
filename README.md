# Cooperative Simple UI

Template UI modern dan responsif untuk sistem manajemen Koperasi, dibangun dengan HTML5 dan Tailwind CSS.

## 🚀 Fitur Utama

*   **Dashboard Admin**: Ringkasan penjualan, profitabilitas, dan neraca.
*   **Point of Sales (POS)**: Antarmuka kasir yang cepat dan responsif.
*   **Manajemen Inventori**: Stok barang, kategori, dan mutasi stok.
*   **Sistem Konsinyasi**: Portal khusus untuk mitra/supplier memantau penjualan produk titipan.
*   **Laporan**: Laporan penjualan harian dan performa mitra.

## 🛠️ Teknologi

*   **HTML5 & CSS3**
*   **Tailwind CSS** (via CDN) - Styling utility-first.
*   **ApexCharts** - Visualisasi data interaktif.
*   **Boxicons** - Ikon vektor.
*   **Vanilla JavaScript** - Logika interaksi sederhana.

## 📂 Struktur Folder

```
├── admin/              # Halaman area Admin (Dashboard, POS, Inventory)
├── supplier/           # Halaman area Supplier/Mitra
├── components/         # Komponen reusable (Sidebar, Navbar)
├── js/                 # Script utility (Component Loader)
├── dashboard-demo.html # Versi standalone dashboard (tanpa server lokal)
└── index.html          # Halaman utama / Navigasi
```

## 📦 Cara Menjalankan

### Metode 1: Python Server (Direkomendasikan)
Karena template ini menggunakan `fetch()` untuk memuat komponen (Sidebar/Navbar), disarankan menggunakan local server.

```bash
# Jalankan di terminal root project
python3 -m http.server 8000
```
Buka browser di: `http://localhost:8000`

### Metode 2: Standalone Demo
Untuk melihat tampilan dashboard tanpa menjalankan server, buka file berikut langsung di browser:
`dashboard-demo.html`

### Metode 3: Alternatif Lain (Windows/Mac/Linux)

#### A. VS Code Live Server (Paling Mudah)
1. Install ekstensi **Live Server** di VS Code.
2. Buka file `index.html`.
3. Klik tombol **Go Live** di pojok kanan bawah VS Code.

#### B. Node.js (http-server)
Jika sudah install Node.js:
```bash
npx http-server
```

#### C. PHP Built-in Server
Jika menggunakan XAMPP/Laragon:
```bash
php -S localhost:8000
```

## 🤝 Kontribusi
Silakan fork repository ini dan buat pull request untuk fitur baru atau perbaikan bug.
