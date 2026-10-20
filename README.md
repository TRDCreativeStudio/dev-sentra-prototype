# SENTRA - Digital Office (DoF) Pupuk Indonesia & Subsidiaries
## Interactive Prototype & Live Approval Workflow

Prototipe interaktif siap demo untuk platform **SENTRA Digital Office (DoF) PT Pupuk Indonesia (Persero)**, dibangun sesuai dengan pedoman visual [design.md](design.md) dan spesifikasi alur kerja [prd.md](prd.md).

---

### Cara Menjalankan Prototype Secara Live

#### Opsi 1: Melalui Local Web Server (Sedang Berjalan)
Server backend lokal Node.js telah aktif:
- Buka browser Anda di: **[http://localhost:3000](http://localhost:3000)**

Untuk menjalankan ulang sewaktu-waktu:
```bash
npm start
# atau
node server.js
```

#### Opsi 2: Standalone / Buka Langsung File HTML
Anda juga dapat membuka langsung file [public/index.html](public/index.html) di browser favorit Anda (Chrome, Safari, Edge, Firefox). Prototipe dilengkapi dengan dual-storage adapter (sinkronisasi lokal otomatis ke localStorage jika offline).

---

### Fitur Utama & Panduan Pengujian Alur Persetujuan (Approval Flow)

Di pojok kanan atas layar terdapat **Role Switcher** `Testing as: [Role]`. Ubah dropdown ini untuk menguji hak akses RBAC dan peran yang berbeda secara instan:

#### 1. Alur Persetujuan Dokumen Lengkap (End-to-End Approval Lifecycle)
1. **Drafter (Budi Santoso - Staff Operasional)**
   - Klik **`+ Buat Surat Baru`**.
   - Pemilihan Reviewer dibatasi hanya untuk peer setara (*Siti Rahma, Rizky Ananda, Anita Kusuma*).
   - Pemilihan Approver dibatasi hanya untuk pejabat berwenang (*Hendro Wijaya, Ir. Bambang Soeprapto, Maya Anggraini*).
   - Aktifkan toggle **`Perlu Tindak Lanjut`** dan **`Perlu Stempel Digital`**.
   - Klik **`Kirim untuk Review`** (status berpindah ke `Menunggu Review`).

2. **Reviewer (Siti Rahma - Senior Officer / Peer)**
   - Ganti role ke **`Reviewer`**.
   - Masuk ke **Pesan Masuk** atau lihat kartu tugas di **Beranda**.
   - Buka naskah dinas, teliti isi dan lampiran.
   - Klik **`Setujui & Teruskan ke Approver`** atau **`Minta Revisi`** dengan catatan telaah.
   - Status berpindah ke `Menunggu Approval`.

3. **Approver (Hendro Wijaya - VP Operasional & Pengadaan)**
   - Ganti role ke **`Approver`**.
   - Sesuai ketentuan PRD, Approver tidak dapat menyunting teks naskah.
   - Approver memeriksa ringkasan, riwayat telaah reviewer, dan dokumen lampiran.
   - Klik **`Sahkan Persetujuan (Approve)`** atau **`Tolak Naskah`**.
   - Karena naskah membutuhkan stempel dinas, status berpindah ke `Perlu Verifikasi Stempel`.

4. **Admin Stempel (Farah Nabila - Unit Keabsahan & Stempel Digital)**
   - Ganti role ke **`Admin Stempel`**.
   - Per PRD, Admin Stempel **tidak memiliki sidebar terpisah**, melainkan bekerja dari **Pesan Masuk** dengan tag `Perlu Verifikasi Stempel`.
   - Buka naskah dinas, klik **`Verifikasi & Bubuhkan Stempel Digital`**.
   - Sistem mensimulasikan verifikasi provider CA Peruri, memotong kuota stempel sebanyak 1, membubuhkan segel QR & Serial Number resmi, lalu meneruskan naskah ke Penerima.

5. **Tujuan / Penerima (Dewi Lestari - Dept. Keuangan)**
   - Ganti role ke **`Tujuan / Penerima`**.
   - Buka naskah dinas resmi yang telah dibubuhi stempel digital dan tanda tangan.
   - Karena naskah memiliki tanda wajib tindak lanjut, klik tombol **`Kirim Laporan Tindak Lanjut`**.
   - Masukkan nomor dokumen SAP atau konfirmasi anggaran, lalu kirim. Status naskah selesai secara paripurna (`Selesai Ditindaklanjuti`).

---

### Modul Administrasi Lainnya

- **Admin DOF (Rian Pratama)**:
  - **Konfigurasi Provider**: Tabel hierarkis 3 level (**Provider &rarr; Perusahaan &rarr; Kontrak PKS**), menampilkan sisa kuota tanda tangan digital dan stempel digital secara transparan tanpa ambigu.
  - **Matriks RBAC**: Tabel pemetaan hak akses fitur tiap persona.
  - **Master Data**: Tipe Surat, Klasifikasi Surat, Template Surat.
- **Admin Penerima Dokumen (Agus Setiawan)**:
  - **Registrasi Surat**: Pencatatan agenda surat masuk fisik/eksternal dari kementerian dan mitra luar.
- **Traceability (Riwayat Aktivitas)**:
  - Tab audit trail pada setiap naskah dinas untuk melacak tanggal, jam, aktor, peran, aksi, dan catatan resmi.
