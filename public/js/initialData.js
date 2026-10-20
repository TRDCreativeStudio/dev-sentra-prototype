// Initial Seed Data matching the user reference screenshot
const INITIAL_SENTRA_DATA = {
  "personas": [
    {
      "id": "drafter",
      "name": "Muhammad Ridha Fadli",
      "roleLabel": "Drafter",
      "title": "Staff Operasional & Tim Digitalisasi",
      "unit": "Komp. Digitalisasi & Data Science",
      "avatar": "MRF",
      "roleLevel": "Drafter",
      "description": "Konseptor naskah dinas: Membuat draft surat, memilih reviewer dan approver, serta memantau status persetujuan."
    },
    {
      "id": "reviewer",
      "name": "Siti Rahma",
      "roleLabel": "Reviewer",
      "title": "Senior Officer Rantai Pasok",
      "unit": "Komp. Digitalisasi & Data Science",
      "avatar": "SR",
      "roleLevel": "Reviewer",
      "description": "Penelaah naskah dinas: Memeriksa isi draft surat, memberikan catatan revisi, atau menyetujui untuk diteruskan ke Approver."
    },
    {
      "id": "approver",
      "name": "Yetty Endarwati",
      "roleLabel": "Approver",
      "title": "SVP Digitalisasi & Data Science",
      "unit": "Komp. Digitalisasi & Data Science",
      "avatar": "YE",
      "roleLevel": "Approver",
      "description": "Pejabat Penandatangan: Memeriksa naskah final, menyetujui, dan menandatangani secara digital (digital signature)."
    },
    {
      "id": "recipient",
      "name": "Dewi Lestari",
      "roleLabel": "Penerima Surat",
      "title": "AVP Keuangan & Anggaran Operasional",
      "unit": "Departemen Anggaran & Perbendaharaan",
      "avatar": "DL",
      "roleLevel": "Penerima Surat",
      "description": "Penerima naskah dinas: Menerima surat masuk resmi berstempel digital dan memberikan tindak lanjut atau disposisi."
    },
    {
      "id": "users",
      "name": "Muhammad Ridha Fadli",
      "roleLabel": "Users (Drafter/Reviewer/Approver)",
      "title": "Staff Operasional & Tim Digitalisasi",
      "unit": "Komp. Digitalisasi & Data Science",
      "avatar": "MRF",
      "roleLevel": "Users (Drafter/Reviewer/Approver)",
      "description": "Akses terpadu pengguna: Membuat, menelaah, dan menyetujui surat dinas tanpa perlu berganti role."
    },
    {
      "id": "admin_dof",
      "name": "Rian Pratama",
      "roleLabel": "Admin DOF",
      "title": "System Administrator SENTRA",
      "unit": "Komp. Teknologi Infromasi",
      "avatar": "RP",
      "roleLevel": "Admin DOF",
      "description": "Pengelola master data, provider kuota tanda tangan/stempel, dan konfigurasi sistem."
    },
    {
      "id": "admin_penerima",
      "name": "Agus Setiawan",
      "roleLabel": "Admin Penerima Dokumen",
      "title": "Staff Tata Usaha & Kearsipan",
      "unit": "Biro Umum & Sekretariat Korporat",
      "avatar": "AS",
      "roleLevel": "Admin Penerima Dokumen",
      "description": "Mencatat dan meregistrasi surat masuk fisik/eksternal ke dalam sistem SENTRA."
    },
    {
      "id": "admin_stempel",
      "name": "Farah Nabila",
      "roleLabel": "Admin Stempel",
      "title": "Verifikator Keabsahan & Stempel Digital",
      "unit": "Biro Hukum & Tata Kelola Korporat",
      "avatar": "FN",
      "roleLevel": "Admin Stempel",
      "description": "Memverifikasi stempel digital melalui Surat Masuk setelah persetujuan Approver."
    }
  ],
  "eligibleReviewers": [
    {
      "id": "rev-1",
      "name": "Siti Rahma",
      "title": "Senior Officer Rantai Pasok",
      "unit": "Komp. Digitalisasi & Data Science"
    },
    {
      "id": "rev-2",
      "name": "Rizky Ananda",
      "title": "Senior Specialist Logistik",
      "unit": "Komp. Teknologi Infromasi"
    },
    {
      "id": "rev-3",
      "name": "Anita Kusuma",
      "title": "Senior Analyst Kebijakan Operasional",
      "unit": "Komp. Digitalisasi & Data Science"
    }
  ],
  "eligibleApprovers": [
    {
      "id": "app-1",
      "name": "Yetty Endarwati",
      "title": "SVP Digitalisasi & Data Science",
      "unit": "Komp. Digitalisasi & Data Science"
    },
    {
      "id": "app-2",
      "name": "Ari Novan Setiono",
      "title": "SVP Digitalisasi & Data Science",
      "unit": "Komp. Digitalisasi & Data Science"
    },
    {
      "id": "app-3",
      "name": "Dewi Kartika",
      "title": "SVP Digitalisasi & Data Science",
      "unit": "Komp. Digitalisasi & Data Science"
    },
    {
      "id": "app-4",
      "name": "Hendro Wijaya",
      "title": "VP Operasional & Pengadaan",
      "unit": "Divisi Rantai Pasok & Logistik"
    }
  ],
  "eligibleRecipients": [
    {
      "id": "rec-1",
      "name": "Dewi Lestari",
      "title": "AVP Keuangan & Anggaran Operasional",
      "unit": "Departemen Anggaran & Perbendaharaan"
    },
    {
      "id": "rec-2",
      "name": "Hadi Pranoto",
      "title": "General Manager Pabrik 1",
      "unit": "PT Petrokimia Gresik"
    },
    {
      "id": "rec-3",
      "name": "Ratna Juwita",
      "title": "Kepala Biro Pengadaan Barang & Jasa",
      "unit": "PT Pupuk Indonesia (Persero)"
    }
  ],
  "documents": [
    {
      "id": "doc-ext-01",
      "hasAlert": true,
      "nomorSurat": "00421/B/UM/P14/EXT/2026",
      "judul": "Surat Kemitraan Kerjasama Distribusi Logistik Pupuk (Eksternal)",
      "status": "Menunggu Approval",
      "statusSuratKeluar": "Waiting For Approval",
      "role": "Approval",
      "roleSuratKeluar": "Approval",
      "diperbaharuiTanggal": "Selasa, 27 April 2026, 14:20",
      "diperbaharuiOleh": "Siti Rahma",
      "pengirim": "Muhammad Ridha Fadli",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Biasa",
      "kecepatanTanggapan": "Biasa",
      "jenisSurat": "Surat Keluar",
      "template": "Surat Eksternal",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "isSuratEksternal": true,
      "perluStempel": true,
      "perluTindakLanjut": true,
      "currentAssigneeRole": "approver",
      "currentAssigneeName": "Yetty Endarwati (Approver)",
      "drafter": {
        "id": "drafter",
        "name": "Muhammad Ridha Fadli",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer Rantai Pasok"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "ext-01",
        "name": "Budi Wicaksono",
        "unit": "PT Logistik Distribusi Nusantara",
        "instansi": "PT Logistik Distribusi Nusantara",
        "email": "budi.wicaksono@logistiknusantara.co.id",
        "noTelepon": "081298817263"
      },
      "cc": [
        "Direktorat Pemasaran & Distribusi",
        "Biro Hukum & Tata Kelola Korporat"
      ],
      "waktu": "27/04/2026 14:20:15",
      "ringkasan": "Permohonan kerjasama strategis dan penjajakan kemitraan distribusi pupuk non-subsidi untuk wilayah Jawa Barat dan sekitarnya.",
      "lampiran": [
        {
          "name": "Proposal_Kemitraan_Logistik_Eksternal.pdf",
          "size": "2.4 MB"
        }
      ],
      "timeline": [
        {
          "waktu": "27/04/2026 09:15:00 WIB",
          "aktor": "Muhammad Ridha Fadli",
          "peran": "Drafter",
          "aksi": "Pengajuan Surat Eksternal Baru",
          "catatan": "Naskah surat eksternal diajukan kepada Reviewer (Siti Rahma)."
        },
        {
          "waktu": "27/04/2026 14:20:15 WIB",
          "aktor": "Siti Rahma",
          "peran": "Reviewer",
          "aksi": "Approve Telaah Surat Eksternal",
          "catatan": "Telaah naskah dinas eksternal disetujui, diteruskan ke Pejabat Approver (Yetty Endarwati) untuk verifikasi persetujuan OTP."
        }
      ]
    },
    {
      "id": "doc-01",
      "hasAlert": false,
      "nomorSurat": "07344/A/TI/P14/ET/2026",
      "judul": "Rebuild Digital Office",
      "status": "Draft",
      "statusSuratKeluar": "Draft",
      "role": "Drafter",
      "roleSuratKeluar": "Drafter",
      "diperbaharuiTanggal": "19/09/2024 11:44:41",
      "diperbaharuiOleh": "Muhammad Ridha Fadli",
      "pengirim": "Muhammad Ridha Fadli",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "kecepatanTanggapan": "Biasa",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "isSuratEksternal": false,
      "perluStempel": false,
      "perluTindakLanjut": false,
      "currentAssigneeRole": "drafter",
      "currentAssigneeName": "Muhammad Ridha Fadli",
      "drafter": {
        "id": "drafter",
        "name": "Muhammad Ridha Fadli",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer Rantai Pasok"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Digitalisasi"
      ],
      "waktu": "19/09/2024 11:44:41",
      "ringkasan": "Pembangunan ulang arsitektur sistem Digital Office SENTRA untuk efisiensi naskah dinas korporat internal.",
      "lampiran": [
        {
          "name": "Kajian_Rebuild_Digital_Office.pdf",
          "size": "1.8 MB"
        }
      ],
      "timeline": [
        {
          "waktu": "19/09/2024 11:44:41",
          "aktor": "Muhammad Ridha Fadli",
          "peran": "Drafter",
          "aksi": "Simpan Draft",
          "catatan": "Naskah dinas internal disimpan sebagai draft."
        }
      ]
    },
    {
      "id": "doc-02",
      "hasAlert": false,
      "nomorSurat": "07345/B/TI/P15/ET/2026",
      "judul": "Implement Cloud Migration",
      "status": "Waiting for Review (1/2)",
      "statusSuratKeluar": "Waiting for Review",
      "role": "Drafter",
      "diperbaharuiTanggal": "20/09/2024 09:15:22",
      "diperbaharuiOleh": "Anisa Putri Rahma",
      "pengirim": "Anisa Putri Rahma",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Segera",
      "sifat": "Rahasia",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "OT.01.00 - Kebijakan & Organisasi",
      "drafter": {
        "id": "drafter",
        "name": "Anisa Putri Rahma",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Divisi IT Infrastructure"
      ],
      "waktu": "20/09/2024 09:15:22",
      "ringkasan": "Migrasi infrastruktur SAP ERP dan layanan SENTRA menuju arsitektur hybrid private cloud.",
      "lampiran": [
        {
          "name": "Cloud_Migration_Plan.pdf",
          "size": "2.4 MB"
        }
      ],
      "timeline": [
        {
          "waktu": "20/09/2024 09:15:22",
          "aktor": "Anisa Putri Rahma",
          "peran": "Drafter",
          "aksi": "Kirim untuk Review",
          "catatan": "Naskah diajukan ke Reviewer."
        }
      ]
    },
    {
      "id": "doc-03",
      "hasAlert": true,
      "nomorSurat": "07346/C/TI/P16/ET/2026",
      "judul": "Upgrade Network Security",
      "status": "Waiting For Approval",
      "statusSuratKeluar": "Waiting for Approval",
      "role": "Approval",
      "diperbaharuiTanggal": "21/09/2024 14:30:05",
      "diperbaharuiOleh": "Budi Santoso",
      "pengirim": "Budi Santoso",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Sangat Segera",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "TK.01.03 - Pemeliharaan Jaringan",
      "drafter": {
        "id": "drafter",
        "name": "Budi Santoso",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Divisi Cyber Security"
      ],
      "waktu": "21/09/2024 14:30:05",
      "ringkasan": "Peningkatan perimeter firewall ZTNA dan enkripsi jaringan pabrik holding.",
      "lampiran": [
        {
          "name": "Spesifikasi_Firewall.pdf",
          "size": "3.1 MB"
        }
      ],
      "timeline": [
        {
          "waktu": "21/09/2024 14:30:05",
          "aktor": "Budi Santoso",
          "peran": "Reviewer",
          "aksi": "Review Disetujui",
          "catatan": "Diteruskan ke Approver."
        }
      ]
    },
    {
      "id": "doc-04",
      "hasAlert": false,
      "nomorSurat": "07347/D/TI/P17/ET/2026",
      "judul": "Develop Mobile Application",
      "status": "Draft",
      "statusSuratKeluar": "Draft",
      "role": "Drafter",
      "diperbaharuiTanggal": "22/09/2024 10:05:47",
      "diperbaharuiOleh": "Lestari Dewi",
      "pengirim": "Lestari Dewi",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Biasa",
      "jenisSurat": "Surat Antar Unit Kerja",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "UM.01.02 - Pengadaan Barang & Jasa",
      "drafter": {
        "id": "drafter",
        "name": "Lestari Dewi",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Mobile Dev"
      ],
      "waktu": "22/09/2024 10:05:47",
      "ringkasan": "Pengembangan aplikasi mobile SENTRA untuk iOS dan Android bagi karyawan.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "22/09/2024 10:05:47",
          "aktor": "Lestari Dewi",
          "peran": "Drafter",
          "aksi": "Simpan Draft",
          "catatan": "Draft aplikasi mobile."
        }
      ]
    },
    {
      "id": "doc-05",
      "hasAlert": false,
      "nomorSurat": "07348/E/TI/P18/ET/2026",
      "judul": "Data Center Optimization",
      "status": "Waiting For Approval",
      "statusSuratKeluar": "Waiting for Approval",
      "role": "Approval",
      "diperbaharuiTanggal": "23/09/2024 13:40:18",
      "diperbaharuiOleh": "Agus Wijaya",
      "pengirim": "Agus Wijaya",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Segera",
      "sifat": "Rahasia",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "OT.01.00 - Kebijakan & Organisasi",
      "drafter": {
        "id": "drafter",
        "name": "Agus Wijaya",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Data Center"
      ],
      "waktu": "23/09/2024 13:40:18",
      "ringkasan": "Optimalisasi konsumsi daya dan pendingin Tier-3 Data Center Holding Pupuk Indonesia.",
      "lampiran": [
        {
          "name": "Audit_DC_2026.pdf",
          "size": "1.9 MB"
        }
      ],
      "timeline": [
        {
          "waktu": "23/09/2024 13:40:18",
          "aktor": "Agus Wijaya",
          "peran": "Reviewer",
          "aksi": "Review Disetujui",
          "catatan": "Menunggu tanda tangan SVP."
        }
      ]
    },
    {
      "id": "doc-extra-1",
      "hasAlert": false,
      "nomorSurat": "07349/F/TI/P19/ET/2026",
      "judul": "ERP System Enhancement 2026",
      "status": "Waiting for Review (1/2)",
      "statusSuratKeluar": "Waiting for Review",
      "role": "Drafter",
      "diperbaharuiTanggal": "24/09/2024 08:20:10",
      "diperbaharuiOleh": "Rian Pratama",
      "pengirim": "Rian Pratama",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Rian Pratama",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "24/09/2024 08:20:10",
      "ringkasan": "Naskah dinas resmi terkait ERP System Enhancement 2026 untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "24/09/2024 08:20:10",
          "aktor": "Rian Pratama",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting for Review (1/2)"
        }
      ]
    },
    {
      "id": "doc-extra-2",
      "hasAlert": false,
      "nomorSurat": "07350/G/TI/P20/ET/2026",
      "judul": "Penyusunan Rencana Kerja & Anggaran 2027",
      "status": "Draft",
      "statusSuratKeluar": "Draft",
      "role": "Drafter",
      "diperbaharuiTanggal": "24/09/2024 10:15:33",
      "diperbaharuiOleh": "Muhammad Ridha Fadli",
      "pengirim": "Muhammad Ridha Fadli",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Muhammad Ridha Fadli",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "24/09/2024 10:15:33",
      "ringkasan": "Naskah dinas resmi terkait Penyusunan Rencana Kerja & Anggaran 2027 untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "24/09/2024 10:15:33",
          "aktor": "Muhammad Ridha Fadli",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Draft"
        }
      ]
    },
    {
      "id": "doc-extra-3",
      "hasAlert": false,
      "nomorSurat": "07351/H/TI/P21/ET/2026",
      "judul": "Pengadaan Lisensi Database Oracle",
      "status": "Waiting For Approval",
      "statusSuratKeluar": "Waiting for Approval",
      "role": "Approval",
      "diperbaharuiTanggal": "24/09/2024 14:00:22",
      "diperbaharuiOleh": "Hendro Wijaya",
      "pengirim": "Hendro Wijaya",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Hendro Wijaya",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "24/09/2024 14:00:22",
      "ringkasan": "Naskah dinas resmi terkait Pengadaan Lisensi Database Oracle untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "24/09/2024 14:00:22",
          "aktor": "Hendro Wijaya",
          "peran": "Approval",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting For Approval"
        }
      ]
    },
    {
      "id": "doc-extra-4",
      "hasAlert": false,
      "nomorSurat": "07352/I/TI/P22/ET/2026",
      "judul": "Integrasi Single Sign-On Subsidiaries",
      "status": "Waiting for Review (1/2)",
      "statusSuratKeluar": "Waiting for Review",
      "role": "Drafter",
      "diperbaharuiTanggal": "25/09/2024 09:30:45",
      "diperbaharuiOleh": "Anita Kusuma",
      "pengirim": "Anita Kusuma",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Anita Kusuma",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "25/09/2024 09:30:45",
      "ringkasan": "Naskah dinas resmi terkait Integrasi Single Sign-On Subsidiaries untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "25/09/2024 09:30:45",
          "aktor": "Anita Kusuma",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting for Review (1/2)"
        }
      ]
    },
    {
      "id": "doc-extra-5",
      "hasAlert": false,
      "nomorSurat": "07353/J/TI/P23/ET/2026",
      "judul": "Pembaruan Kebijakan Tata Kelola Data Holding",
      "status": "Draft",
      "statusSuratKeluar": "Draft",
      "role": "Drafter",
      "diperbaharuiTanggal": "25/09/2024 11:45:00",
      "diperbaharuiOleh": "Dewi Kartika",
      "pengirim": "Dewi Kartika",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Dewi Kartika",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "25/09/2024 11:45:00",
      "ringkasan": "Naskah dinas resmi terkait Pembaruan Kebijakan Tata Kelola Data Holding untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "25/09/2024 11:45:00",
          "aktor": "Dewi Kartika",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Draft"
        }
      ]
    },
    {
      "id": "doc-extra-6",
      "hasAlert": false,
      "nomorSurat": "07354/K/TI/P24/ET/2026",
      "judul": "Standardisasi Infrastruktur Jaringan Pabrik Gresik",
      "status": "Completed",
      "statusSuratKeluar": "Completed",
      "role": "Drafter",
      "diperbaharuiTanggal": "25/09/2024 15:10:12",
      "diperbaharuiOleh": "Hadi Pranoto",
      "pengirim": "Hadi Pranoto",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Hadi Pranoto",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "25/09/2024 15:10:12",
      "ringkasan": "Naskah dinas resmi terkait Standardisasi Infrastruktur Jaringan Pabrik Gresik untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "25/09/2024 15:10:12",
          "aktor": "Hadi Pranoto",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Completed"
        }
      ]
    },
    {
      "id": "doc-extra-7",
      "hasAlert": false,
      "nomorSurat": "07355/L/TI/P25/ET/2026",
      "judul": "Audit Kelaikan Sistem SENTRA Digital Office",
      "status": "Waiting For Approval",
      "statusSuratKeluar": "Waiting for Approval",
      "role": "Approval",
      "diperbaharuiTanggal": "26/09/2024 08:50:30",
      "diperbaharuiOleh": "Yetty Endarwati",
      "pengirim": "Yetty Endarwati",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Yetty Endarwati",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "26/09/2024 08:50:30",
      "ringkasan": "Naskah dinas resmi terkait Audit Kelaikan Sistem SENTRA Digital Office untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "26/09/2024 08:50:30",
          "aktor": "Yetty Endarwati",
          "peran": "Approval",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting For Approval"
        }
      ]
    },
    {
      "id": "doc-extra-8",
      "hasAlert": false,
      "nomorSurat": "07356/M/TI/P26/ET/2026",
      "judul": "Pengadaan Server Backup DRC Palembang",
      "status": "Waiting for Review (1/2)",
      "statusSuratKeluar": "Waiting for Review",
      "role": "Drafter",
      "diperbaharuiTanggal": "26/09/2024 13:15:40",
      "diperbaharuiOleh": "Rizky Ananda",
      "pengirim": "Rizky Ananda",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Rizky Ananda",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "26/09/2024 13:15:40",
      "ringkasan": "Naskah dinas resmi terkait Pengadaan Server Backup DRC Palembang untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "26/09/2024 13:15:40",
          "aktor": "Rizky Ananda",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting for Review (1/2)"
        }
      ]
    },
    {
      "id": "doc-extra-9",
      "hasAlert": false,
      "nomorSurat": "07357/N/TI/P27/ET/2026",
      "judul": "Evaluasi SLA Penyedia Layanan Tanda Tangan Digital",
      "status": "Completed",
      "statusSuratKeluar": "Completed",
      "role": "Approval",
      "diperbaharuiTanggal": "26/09/2024 16:00:00",
      "diperbaharuiOleh": "Farah Nabila",
      "pengirim": "Farah Nabila",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Farah Nabila",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "26/09/2024 16:00:00",
      "ringkasan": "Naskah dinas resmi terkait Evaluasi SLA Penyedia Layanan Tanda Tangan Digital untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "26/09/2024 16:00:00",
          "aktor": "Farah Nabila",
          "peran": "Approval",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Completed"
        }
      ]
    },
    {
      "id": "doc-extra-10",
      "hasAlert": false,
      "nomorSurat": "07358/O/TI/P28/ET/2026",
      "judul": "Implementasi Modul Kearsipan Elektronik",
      "status": "Draft",
      "statusSuratKeluar": "Draft",
      "role": "Drafter",
      "diperbaharuiTanggal": "27/09/2024 09:10:18",
      "diperbaharuiOleh": "Agus Setiawan",
      "pengirim": "Agus Setiawan",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Agus Setiawan",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "27/09/2024 09:10:18",
      "ringkasan": "Naskah dinas resmi terkait Implementasi Modul Kearsipan Elektronik untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "27/09/2024 09:10:18",
          "aktor": "Agus Setiawan",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Draft"
        }
      ]
    },
    {
      "id": "doc-extra-11",
      "hasAlert": false,
      "nomorSurat": "07359/P/TI/P29/ET/2026",
      "judul": "Penyesuaian Hak Akses RBAC Unit Bisnis Pupuk Kaltim",
      "status": "Waiting for Review (1/2)",
      "statusSuratKeluar": "Waiting for Review",
      "role": "Drafter",
      "diperbaharuiTanggal": "27/09/2024 11:22:35",
      "diperbaharuiOleh": "Ratna Juwita",
      "pengirim": "Ratna Juwita",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Ratna Juwita",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "27/09/2024 11:22:35",
      "ringkasan": "Naskah dinas resmi terkait Penyesuaian Hak Akses RBAC Unit Bisnis Pupuk Kaltim untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "27/09/2024 11:22:35",
          "aktor": "Ratna Juwita",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting for Review (1/2)"
        }
      ]
    },
    {
      "id": "doc-extra-12",
      "hasAlert": false,
      "nomorSurat": "07360/Q/TI/P30/ET/2026",
      "judul": "Laporan Bulanan SLA Pengiriman Naskah Dinas",
      "status": "Completed",
      "statusSuratKeluar": "Completed",
      "role": "Drafter",
      "diperbaharuiTanggal": "27/09/2024 14:40:50",
      "diperbaharuiOleh": "Muhammad Ridha Fadli",
      "pengirim": "Muhammad Ridha Fadli",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Muhammad Ridha Fadli",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "27/09/2024 14:40:50",
      "ringkasan": "Naskah dinas resmi terkait Laporan Bulanan SLA Pengiriman Naskah Dinas untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "27/09/2024 14:40:50",
          "aktor": "Muhammad Ridha Fadli",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Completed"
        }
      ]
    },
    {
      "id": "doc-extra-13",
      "hasAlert": false,
      "nomorSurat": "07361/R/TI/P31/ET/2026",
      "judul": "SOP Keamanan Informasi Korporat ISO 27001",
      "status": "Returned for Revision",
      "statusSuratKeluar": "Returned for Revision",
      "role": "Drafter",
      "diperbaharuiTanggal": "28/09/2024 10:00:15",
      "diperbaharuiOleh": "Siti Rahma",
      "pengirim": "Siti Rahma",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Siti Rahma",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "28/09/2024 10:00:15",
      "ringkasan": "Naskah dinas resmi terkait SOP Keamanan Informasi Korporat ISO 27001 untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "28/09/2024 10:00:15",
          "aktor": "Siti Rahma",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Returned for Revision"
        }
      ]
    },
    {
      "id": "doc-extra-14",
      "hasAlert": false,
      "nomorSurat": "07362/S/TI/P32/ET/2026",
      "judul": "Review Perjanjian Kerjasama IT Pupuk Kujang",
      "status": "Waiting For Approval",
      "statusSuratKeluar": "Waiting for Approval",
      "role": "Approval",
      "diperbaharuiTanggal": "28/09/2024 13:30:20",
      "diperbaharuiOleh": "Ari Novan Setiono",
      "pengirim": "Ari Novan Setiono",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Ari Novan Setiono",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "28/09/2024 13:30:20",
      "ringkasan": "Naskah dinas resmi terkait Review Perjanjian Kerjasama IT Pupuk Kujang untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "28/09/2024 13:30:20",
          "aktor": "Ari Novan Setiono",
          "peran": "Approval",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting For Approval"
        }
      ]
    },
    {
      "id": "doc-extra-15",
      "hasAlert": false,
      "nomorSurat": "07363/T/TI/P33/ET/2026",
      "judul": "Pemeliharaan Rutin Fiber Optic Kantor Pusat",
      "status": "Completed",
      "statusSuratKeluar": "Completed",
      "role": "Drafter",
      "diperbaharuiTanggal": "28/09/2024 16:15:00",
      "diperbaharuiOleh": "Budi Santoso",
      "pengirim": "Budi Santoso",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Budi Santoso",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "28/09/2024 16:15:00",
      "ringkasan": "Naskah dinas resmi terkait Pemeliharaan Rutin Fiber Optic Kantor Pusat untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "28/09/2024 16:15:00",
          "aktor": "Budi Santoso",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Completed"
        }
      ]
    },
    {
      "id": "doc-extra-16",
      "hasAlert": false,
      "nomorSurat": "07364/U/TI/P34/ET/2026",
      "judul": "Monitoring Quota Stempel Digital CA Peruri",
      "status": "Waiting for Review (1/2)",
      "statusSuratKeluar": "Waiting for Review",
      "role": "Drafter",
      "diperbaharuiTanggal": "29/09/2024 09:45:10",
      "diperbaharuiOleh": "Rian Pratama",
      "pengirim": "Rian Pratama",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Rian Pratama",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "29/09/2024 09:45:10",
      "ringkasan": "Naskah dinas resmi terkait Monitoring Quota Stempel Digital CA Peruri untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "29/09/2024 09:45:10",
          "aktor": "Rian Pratama",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting for Review (1/2)"
        }
      ]
    },
    {
      "id": "doc-extra-17",
      "hasAlert": false,
      "nomorSurat": "07365/V/TI/P35/ET/2026",
      "judul": "Pembaruan Sertifikat SSL Wildcard Holding",
      "status": "Waiting For Approval",
      "statusSuratKeluar": "Waiting for Approval",
      "role": "Approval",
      "diperbaharuiTanggal": "29/09/2024 11:35:45",
      "diperbaharuiOleh": "Agus Wijaya",
      "pengirim": "Agus Wijaya",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Agus Wijaya",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "29/09/2024 11:35:45",
      "ringkasan": "Naskah dinas resmi terkait Pembaruan Sertifikat SSL Wildcard Holding untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "29/09/2024 11:35:45",
          "aktor": "Agus Wijaya",
          "peran": "Approval",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Waiting For Approval"
        }
      ]
    },
    {
      "id": "doc-extra-18",
      "hasAlert": false,
      "nomorSurat": "07366/W/TI/P36/ET/2026",
      "judul": "Penataan Master Klasifikasi Surat Pupuk Iskandar Muda",
      "status": "Draft",
      "statusSuratKeluar": "Draft",
      "role": "Drafter",
      "diperbaharuiTanggal": "29/09/2024 15:00:25",
      "diperbaharuiOleh": "Dewi Lestari",
      "pengirim": "Dewi Lestari",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Dewi Lestari",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "29/09/2024 15:00:25",
      "ringkasan": "Naskah dinas resmi terkait Penataan Master Klasifikasi Surat Pupuk Iskandar Muda untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "29/09/2024 15:00:25",
          "aktor": "Dewi Lestari",
          "peran": "Drafter",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Draft"
        }
      ]
    },
    {
      "id": "doc-extra-19",
      "hasAlert": false,
      "nomorSurat": "07367/X/TI/P37/ET/2026",
      "judul": "Peremajaan Perangkat End-Point User Legacy",
      "status": "Completed",
      "statusSuratKeluar": "Completed",
      "role": "Approval",
      "diperbaharuiTanggal": "30/09/2024 10:20:00",
      "diperbaharuiOleh": "Yetty Endarwati",
      "pengirim": "Yetty Endarwati",
      "unitKerja": "Komp. Digitalisasi & Data Science",
      "prioritas": "Biasa",
      "sifat": "Terbatas",
      "jenisSurat": "Nota Dinas",
      "template": "Format Standar Nota Dinas Pupuk Indonesia",
      "klasifikasi": "BL.01.04 (pilar Hukum dan Tata Kelola)",
      "drafter": {
        "id": "drafter",
        "name": "Yetty Endarwati",
        "unit": "Komp. Digitalisasi & Data Science"
      },
      "reviewer": {
        "id": "reviewer",
        "name": "Siti Rahma",
        "title": "Senior Officer"
      },
      "approver": {
        "id": "approver",
        "name": "Yetty Endarwati",
        "title": "SVP Digitalisasi & Data Science"
      },
      "penerima": {
        "id": "recipient",
        "name": "Dewi Lestari",
        "unit": "Departemen Anggaran & Perbendaharaan"
      },
      "cc": [
        "Tim Terkait"
      ],
      "waktu": "30/09/2024 10:20:00",
      "ringkasan": "Naskah dinas resmi terkait Peremajaan Perangkat End-Point User Legacy untuk lingkungan holding Pupuk Indonesia.",
      "lampiran": [],
      "timeline": [
        {
          "waktu": "30/09/2024 10:20:00",
          "aktor": "Yetty Endarwati",
          "peran": "Approval",
          "aksi": "Update Terakhir",
          "catatan": "Naskah dinas Completed"
        }
      ]
    }
  ],
  "providers": [
    {
      "id": "prov-1",
      "nama": "Peruri Digital Security (CA)",
      "kode": "PERURI",
      "status": "Aktif",
      "tipeKoneksi": "REST API v2 Enterprise (Terhubung)",
      "kuotaTandaTangan": {
        "total": 50000,
        "terpakai": 18420,
        "sisa": 31580,
        "satuan": "dokumen"
      },
      "kuotaStempel": {
        "total": 25000,
        "terpakai": 9850,
        "sisa": 15150,
        "satuan": "stempel"
      },
      "jumlahPerusahaan": 5,
      "jumlahKontrak": 3,
      "companies": [
        {
          "id": "comp-1",
          "nama": "PT Pupuk Indonesia (Persero) Holding",
          "kode": "PI-HOLDING",
          "status": "Aktif",
          "sisaTandaTangan": 14200,
          "sisaStempel": 7300,
          "terakhirUpdate": "2026-10-18 14:00 WIB",
          "contracts": [
            {
              "nomor": "PKS-042/DIR/PI/2025",
              "judul": "Langganan Layanan Sertifikat Elektronik & Segel Digital Holding 2025-2026",
              "tandaTanganAlokasi": 25000,
              "tandaTanganTerpakai": 10800,
              "tandaTanganSisa": 14200,
              "stempelAlokasi": 12000,
              "stempelTerpakai": 4700,
              "stempelSisa": 7300,
              "nilaiKontrak": "Rp 450.000.000",
              "mulai": "01 Jan 2025",
              "berakhir": "31 Des 2026",
              "status": "Aktif"
            }
          ]
        }
      ]
    }
  ],
  "registeredIncomingDocs": [],
  "rbacMatrix": [],
  "tipeSuratList": [
    {
      "id": "ts-1",
      "kode": "IT",
      "deskripsi": "Surat Antar Unit Kerja",
      "perluDiunggah": false,
      "status": "Active",
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan"
    },
    {
      "id": "ts-2",
      "kode": "ED",
      "deskripsi": "Surat Keluar",
      "perluDiunggah": true,
      "status": "Inactive",
      "diperbaruiTanggal": "21 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan"
    }
  ],
  "klasifikasiSuratList": [
    {
      "id": "ks-1",
      "kode": "HK.07.07",
      "deskripsi": "Perizinan Produk",
      "sifat": "Rahasia",
      "status": "Active",
      "diperbaruiTanggal": "20/07/2026",
      "diperbaruiOleh": "Ragil Brilyan"
    },
    {
      "id": "ks-2",
      "kode": "HK.07.07",
      "deskripsi": "Perizinan Produk",
      "sifat": "Rahasia",
      "status": "Active",
      "diperbaruiTanggal": "20/07/2026",
      "diperbaruiOleh": "Ragil Brilyan"
    }
  ],
  "templatSuratList": [
    {
      "id": "tpl-1",
      "nomor": "IT.A.01",
      "nama": "Surat Akuntansi Keuangan",
      "unitKerja": "Semua Unit",
      "tipe": "Surat Antar Unit Kerja",
      "tandaTanganDigital": false,
      "stampDigital": false,
      "tujuan": "Internal",
      "penerima": "Mujahid - VP Akuntansi Keuangan",
      "status": "Active",
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan"
    },
    {
      "id": "tpl-2",
      "nomor": "ED.A.01",
      "nama": "Surat Eksternal",
      "unitKerja": "Semua Unit",
      "tipe": "Surat Keluar",
      "tandaTanganDigital": true,
      "stampDigital": true,
      "tujuan": "Eksternal",
      "penerima": "-",
      "status": "Active",
      "diperbaruiTanggal": "21 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan"
    }
  ],
  "userLegacyList": [
    {
      "id": "leg-1",
      "username": "admin_pi",
      "namaLegacy": "Admin Pupuk",
      "perusahaanLegacy": "PT Pupuk Indonesia",
      "statusIntegrasi": "Belum Terhubung",
      "nik": "-",
      "namaSentra": "-",
      "jabatanSentra": "-",
      "unitKerjaSentra": "-",
      "perusahaanSentra": "-",
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "SYSTEM"
    },
    {
      "id": "leg-2",
      "username": "admin_pendok",
      "namaLegacy": "Admin Pendok",
      "perusahaanLegacy": "PT Pupuk Indonesia",
      "statusIntegrasi": "Terhubung",
      "nik": "71100021",
      "namaSentra": "Bramantyo",
      "jabatanSentra": "Administrasi Korporat",
      "unitKerjaSentra": "Sekretaris Perusahaan",
      "perusahaanSentra": "PT Pupuk Indonesia",
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "SYSTEM"
    }
  ],
  "sentraEmployeesList": [
    {
      "nik": "93052134",
      "nama": "Ragil Brilliant",
      "jabatan": "Administrasi Korporat",
      "unitKerja": "Sekretaris Perusahaan",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "71100021",
      "nama": "Bramantyo",
      "jabatan": "Administrasi Korporat",
      "unitKerja": "Sekretaris Perusahaan",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "94071741",
      "nama": "A Nur Fadilla",
      "jabatan": "Admin Project Agrosolution",
      "unitKerja": "Agrosolution",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "92083452",
      "nama": "Citra Dewi",
      "jabatan": "Marketing Specialist Agrosolution",
      "unitKerja": "Agrosolution",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "94112789",
      "nama": "Dedi Santoso",
      "jabatan": "UI/UX Designer Agrosolution",
      "unitKerja": "Agrosolution",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "95021243",
      "nama": "Eka Putri",
      "jabatan": "Quality Assurance Agrosolution",
      "unitKerja": "Agrosolution",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "1140105",
      "nama": "Agus Purnomo",
      "jabatan": "VP Tata Kelola",
      "unitKerja": "Tata Kelola Korporat",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "1170026",
      "nama": "Abdul Muhyi Marakarma",
      "jabatan": "VP Entreprise Resource Planning",
      "unitKerja": "Digitalisasi",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "1170028",
      "nama": "Laras Adiyanti",
      "jabatan": "VP Entreprise Resource Planning",
      "unitKerja": "Digitalisasi",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "1170029",
      "nama": "Dimas Prasetyo",
      "jabatan": "Senior Software Engineer",
      "unitKerja": "Digitalisasi & Data Science",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "1170030",
      "nama": "Sari Lestari",
      "jabatan": "Marketing Specialist",
      "unitKerja": "Pemasaran Korporat",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "1170031",
      "nama": "Budi Santoso",
      "jabatan": "Product Manager",
      "unitKerja": "Digitalisasi & Inovasi",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "93052134",
      "nama": "Bima Rahadian",
      "jabatan": "Senior Developer Agrosolution",
      "unitKerja": "Agrosolution",
      "perusahaan": "PT Pupuk Indonesia"
    },
    {
      "nik": "93102056",
      "nama": "Farhan Maulana",
      "jabatan": "Data Analyst Agrosolution",
      "unitKerja": "Agrosolution",
      "perusahaan": "PT Pupuk Indonesia"
    }
  ],
  "managementGroups": [
    {
      "id": "grp-1",
      "name": "PI Group",
      "details": "Semua Karyawan PI Group",
      "parentId": null,
      "level": 0,
      "childCount": 100,
      "userCount": 100,
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan",
      "appliesToAllEntities": true,
      "expanded": true,
      "users": []
    },
    {
      "id": "grp-2",
      "name": "PT Pupuk Indonesia",
      "details": "Semua Karyawan PT Pupuk Indonesia",
      "parentId": "grp-1",
      "level": 1,
      "childCount": 100,
      "userCount": 12131,
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan",
      "appliesToAllEntities": true,
      "expanded": true,
      "users": []
    },
    {
      "id": "grp-3",
      "name": "Direktorat Utama",
      "details": "Semua Karyawan PT Pupuk Indonesia - Direkt...",
      "parentId": "grp-2",
      "level": 2,
      "childCount": 1,
      "userCount": 40,
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan",
      "appliesToAllEntities": false,
      "expanded": false,
      "users": []
    },
    {
      "id": "grp-4",
      "name": "Direktorat Operasi",
      "details": "Semua Karyawan PT Pupuk Indonesia - Direkt...",
      "parentId": "grp-2",
      "level": 2,
      "childCount": 78,
      "userCount": 500,
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan",
      "appliesToAllEntities": false,
      "expanded": true,
      "users": []
    },
    {
      "id": "grp-5",
      "name": "Kompartemen DDS",
      "details": "Semua Karyawan PT Pupuk Indonesia - Direkt...",
      "parentId": "grp-4",
      "level": 3,
      "childCount": 76,
      "userCount": 590,
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan",
      "appliesToAllEntities": false,
      "expanded": true,
      "users": []
    },
    {
      "id": "grp-6",
      "name": "Dept DCS",
      "details": "Semua Karyawan DCS",
      "parentId": "grp-5",
      "level": 4,
      "childCount": 1,
      "userCount": 625,
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan",
      "appliesToAllEntities": false,
      "expanded": true,
      "users": [
        "94071741 - A Nur Fadilla - Admin Project Agrosolution",
        "88112233 - Budi Santoso - Admin Project Agrosolution",
        "92033456 - Citra Dewi - Admin Project Agrosolution",
        "89214567 - Rizky Putra - Senior Developer Agrosolution",
        "90127654 - Nina Safitri - UI/UX Designer Agrosolution"
      ]
    },
    {
      "id": "grp-7",
      "name": "-",
      "details": "(PHIC) All Risk Officer",
      "parentId": "grp-6",
      "level": 5,
      "childCount": 0,
      "userCount": 60,
      "diperbaruiTanggal": "20 Juli 2026",
      "diperbaruiOleh": "Ragil Brilyan",
      "appliesToAllEntities": false,
      "expanded": false,
      "users": [
        "1140105 - Agus Purnomo - VP Tata Kelola",
        "1170026 - Abdul Muhyi Marakarma - VP Entreprise Resource Planning",
        "1170028 - Laras Adiyanti - VP Entreprise Resource Planning",
        "1170029 - Dimas Prasetyo - Senior Software Engineer",
        "1170030 - Sari Lestari - Marketing Specialist",
        "1170031 - Budi Santoso - Product Manager"
      ]
    }
  ],
  "availableGroupUsers": [
    {
      "nik": "93052134",
      "nama": "Bima Rahadian",
      "jabatan": "Senior Developer Agrosolution"
    },
    {
      "nik": "94071741",
      "nama": "A Nur Fadilla",
      "jabatan": "Admin Project Agrosolution"
    },
    {
      "nik": "92083452",
      "nama": "Citra Dewi",
      "jabatan": "Marketing Specialist Agrosolution"
    },
    {
      "nik": "94112789",
      "nama": "Dedi Santoso",
      "jabatan": "UI/UX Designer Agrosolution"
    },
    {
      "nik": "95021243",
      "nama": "Eka Putri",
      "jabatan": "Quality Assurance Agrosolution"
    },
    {
      "nik": "93102056",
      "nama": "Farhan Maulana",
      "jabatan": "Data Analyst Agrosolution"
    },
    {
      "nik": "1250016",
      "nama": "Robby Setiabudi",
      "jabatan": "Direktur Supply Chain"
    },
    {
      "nik": "1210106",
      "nama": "Agung Mahendra",
      "jabatan": "AVP Pupuk Industri"
    }
  ],
  "kontakEksternal": [
    {
      "id": "ke-01",
      "nama": "SDM PT ABC",
      "instansi": "PT ABC",
      "email": "sdm@ptabc.com",
      "nomorTelepon": "098178999178",
      "tanggalDiperbaharui": "27/04/2026"
    },
    {
      "id": "ke-02",
      "nama": "Humas & Protokoler Kementerian BUMN",
      "instansi": "Kementerian BUMN",
      "email": "humas@bumn.go.id",
      "nomorTelepon": "0213845678",
      "tanggalDiperbaharui": "26/04/2026"
    },
    {
      "id": "ke-03",
      "nama": "Sekretariat Perusahaan PT Pertamina",
      "instansi": "PT Pertamina (Persero)",
      "email": "sekper@pertamina.com",
      "nomorTelepon": "0215689123",
      "tanggalDiperbaharui": "25/04/2026"
    },
    {
      "id": "ke-04",
      "nama": "Divisi Pengadaan PT Pupuk Kaltim",
      "instansi": "PT Pupuk Kalimantan Timur",
      "email": "procurement@pupukkaltim.com",
      "nomorTelepon": "054841202",
      "tanggalDiperbaharui": "24/04/2026"
    },
    {
      "id": "ke-05",
      "nama": "Direktorat Tata Kelola Pupuk Indonesia Utilitas",
      "instansi": "PT Pupuk Indonesia Utilitas",
      "email": "tatakelola@pi-utilitas.com",
      "nomorTelepon": "0217983451",
      "tanggalDiperbaharui": "22/04/2026"
    },
    {
      "id": "ke-06",
      "nama": "Sekretaris Direksi Rekayasa Industri",
      "instansi": "PT Rekayasa Industri",
      "email": "sekdir@rekayasa.co.id",
      "nomorTelepon": "0217988700",
      "tanggalDiperbaharui": "20/04/2026"
    },
    {
      "id": "ke-07",
      "nama": "Biro Kerjasama Antar Lembaga Kementan",
      "instansi": "Kementerian Pertanian Republik Indonesia",
      "email": "kerjasama@pertanian.go.id",
      "nomorTelepon": "0217804166",
      "tanggalDiperbaharui": "18/04/2026"
    }
  ]
};
