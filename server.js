const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data', 'db.json');
const INITIAL_DB_FILE = path.join(__dirname, 'data', 'db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Helper to read DB
function readDb() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db:', err);
    return null;
  }
}

// Helper to write DB
function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db:', err);
    return false;
  }
}

// Cache initial documents at startup for reset functionality
let INITIAL_DOCUMENTS = [];
try {
  const initialDbData = readDb();
  if (initialDbData && Array.isArray(initialDbData.documents) && initialDbData.documents.length > 0) {
    INITIAL_DOCUMENTS = JSON.parse(JSON.stringify(initialDbData.documents));
  }
} catch (e) {
  console.error('Failed to cache initial documents:', e);
}

// MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

// Request listener
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Enable CORS for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- REST API ROUTES ---
  if (pathname.startsWith('/api/')) {
    // 1. GET /api/state
    if (pathname === '/api/state' && method === 'GET') {
      const db = readDb();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db));
      return;
    }

    // Helper to read JSON body
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let payload = {};
      if (body) {
        try {
          payload = JSON.parse(body);
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
          return;
        }
      }

      const db = readDb();
      if (!db) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database unavailable' }));
        return;
      }

      // Clear documents only (Surat Masuk & Surat Keluar)
      if (pathname === '/api/documents/clear' && method === 'POST') {
        db.documents = [];
        writeDb(db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: 0 }));
        return;
      }

      // Reset documents demo only (Surat Masuk & Surat Keluar)
      if (pathname === '/api/documents/reset' && method === 'POST') {
        db.documents = JSON.parse(JSON.stringify(INITIAL_DOCUMENTS));
        writeDb(db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: db.documents.length, documents: db.documents }));
        return;
      }

      // 2. POST /api/documents (Create Document)
      if (pathname === '/api/documents' && method === 'POST') {
        const newDoc = {
          id: 'doc-' + Date.now().toString().slice(-5),
          nomorSurat: payload.nomorSurat || `ND-${Math.floor(100 + Math.random() * 900)}/OPS/PI/X/2026`,
          judul: payload.judul || 'Dokumen Tanpa Judul',
          jenisSurat: payload.jenisSurat || 'Nota Dinas',
          template: payload.template || 'Format Standar Nota Dinas Pupuk Indonesia',
          klasifikasi: payload.klasifikasi || 'UM.01.02 - Pengadaan Barang & Jasa Operasional',
          sifat: payload.sifat || 'Biasa',
          tanggalDibuat: new Date().toISOString(),
          tanggalUpdate: new Date().toISOString(),
          drafter: {
            id: 'drafter',
            name: 'Budi Santoso',
            unit: 'Divisi Rantai Pasok'
          },
          reviewer: payload.reviewer || { id: 'reviewer', name: 'Siti Rahma', title: 'Senior Officer' },
          approver: payload.approver || { id: 'approver', name: 'Hendro Wijaya', title: 'VP Operasional' },
          penerima: payload.penerima || { id: 'recipient', name: 'Dewi Lestari', unit: 'Departemen Keuangan' },
          cc: payload.cc || [],
          perluTindakLanjut: Boolean(payload.perluTindakLanjut),
          tindakLanjutNote: '',
          tindakLanjutStatus: payload.perluTindakLanjut ? 'Menunggu Proses Approval' : 'Tidak Diperlukan',
          perluStempel: Boolean(payload.perluStempel),
          stempelStatus: payload.perluStempel ? 'Menunggu Verifikasi Stempel' : 'Tidak Diperlukan',
          stempelDetail: null,
          kecepatanTanggapan: payload.kecepatanTanggapan || 'Biasa',
          status: payload.action === 'draft' ? 'Draft' : 'Menunggu Review',
          statusBadge: payload.action === 'draft' ? 'info' : 'warning',
          currentAssigneeRole: payload.action === 'draft' ? 'drafter' : 'reviewer',
          currentAssigneeName: payload.action === 'draft' ? 'Budi Santoso' : (payload.reviewer?.name || 'Siti Rahma'),
          ringkasan: payload.ringkasan || '',
          lampiran: payload.lampiran || [{ name: 'Dokumen_Pendukung.pdf', size: '1.5 MB' }],
          timeline: [
            {
              waktu: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB',
              aktor: 'Budi Santoso',
              peran: 'Drafter',
              aksi: payload.action === 'draft' ? 'Simpan sebagai Draft' : 'Kirim untuk Review',
              catatan: payload.action === 'draft' ? 'Naskah disimpan sementara.' : `Diajukan ke Reviewer (${payload.reviewer?.name || 'Siti Rahma'}).`
            }
          ]
        };

        db.documents.unshift(newDoc);
        writeDb(db);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newDoc));
        return;
      }

      // Match /api/documents/:id/:action
      const docActionMatch = pathname.match(/^\/api\/documents\/([^/]+)\/(review|approve|verify-stamp|follow-up)$/);
      if (docActionMatch) {
        const docId = docActionMatch[1];
        const subAction = docActionMatch[2];
        const docIndex = db.documents.findIndex(d => d.id === docId);

        if (docIndex === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Document not found' }));
          return;
        }

        const doc = db.documents[docIndex];
        const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';

        // 3. Reviewer Action
        if (subAction === 'review') {
          if (payload.action === 'approve') {
            doc.status = 'Menunggu Approval';
            doc.statusBadge = 'warning';
            doc.currentAssigneeRole = 'approver';
            doc.currentAssigneeName = doc.approver.name;
            doc.timeline.push({
              waktu: nowStr,
              aktor: payload.actorName || 'Siti Rahma',
              peran: 'Reviewer',
              aksi: 'Review Disetujui (Reviewed)',
              catatan: payload.notes || 'Telaah teknis dan anggaran telah disetujui. Diteruskan ke Approver.'
            });
          } else {
            // Minta Revisi
            doc.status = 'Draft (Revisi Diminta)';
            doc.statusBadge = 'danger';
            doc.currentAssigneeRole = 'drafter';
            doc.currentAssigneeName = doc.drafter.name;
            doc.timeline.push({
              waktu: nowStr,
              aktor: payload.actorName || 'Siti Rahma',
              peran: 'Reviewer',
              aksi: 'Minta Revisi Dokumen',
              catatan: payload.notes || 'Perlu perbaikan rincian anggaran dan spesifikasi.'
            });
          }
        }

        // 4. Approver Action (Cannot edit content!)
        if (subAction === 'approve') {
          if (payload.action === 'approve') {
            if (doc.perluStempel) {
              doc.status = 'Perlu Verifikasi Stempel';
              doc.statusSuratKeluar = 'Waiting For Stamp';
              doc.statusBadge = 'warning';
              doc.currentAssigneeRole = 'admin_stempel';
              doc.currentAssigneeName = 'Farah Nabila (Admin Stempel)';
              doc.stempelStatus = 'Menunggu Verifikasi Stempel';
              doc.timeline.push({
                waktu: nowStr,
                aktor: payload.actorName || 'Yetty Endarwati',
                peran: 'Approver',
                aksi: 'Dokumen Disetujui (Approved)',
                catatan: (payload.notes ? payload.notes + ' - ' : '') + 'Tanda tangan digital disahkan. Diteruskan untuk pembubuhan stempel digital kedinasan.'
              });
              if (!doc.logActivity) doc.logActivity = [];
              doc.logActivity = doc.logActivity.filter(a => a.status !== 'Waiting for Stamp');
              doc.logActivity.unshift({
                waktu: nowStr.replace(' WIB', ''),
                status: 'Waiting for Stamp',
                judul: 'Approver menyetujui surat melalui Verifikasi Kode OTP (616819) dan tanda tangan digital disahkan',
                oleh: `${payload.actorName || 'Yetty Endarwati'} - SVP Digitalisasi & Data Science`
              });
            } else {
              // Langsung ke Penerima atau Selesai
              doc.statusSuratKeluar = 'Completed';
              if (doc.perluTindakLanjut) {
                doc.status = 'Menunggu Tindak Lanjut';
                doc.statusBadge = 'info';
                doc.currentAssigneeRole = 'recipient';
                doc.currentAssigneeName = doc.penerima.name;
              } else {
                doc.status = 'Selesai';
                doc.statusBadge = 'success';
                doc.currentAssigneeRole = null;
                doc.currentAssigneeName = 'Selesai';
              }
              doc.timeline.push({
                waktu: nowStr,
                aktor: payload.actorName || 'Hendro Wijaya',
                peran: 'Approver',
                aksi: 'Dokumen Disetujui (Approved)',
                catatan: payload.notes || 'Dokumen disetujui tanpa perlu stempel kedinasan.'
              });
            }
          } else {
            // Tolak
            doc.status = 'Ditolak (Rejected)';
            doc.statusSuratKeluar = 'Declined';
            doc.statusBadge = 'danger';
            doc.currentAssigneeRole = null;
            doc.currentAssigneeName = '-';
            doc.timeline.push({
              waktu: nowStr,
              aktor: payload.actorName || 'Hendro Wijaya',
              peran: 'Approver',
              aksi: 'Dokumen Ditolak',
              catatan: payload.notes || 'Pengajuan ditolak oleh Approver.'
            });
          }
        }

        // 4B. Peruri Third Party Signing In-Progress
        if (subAction === 'peruri-signing') {
          doc.status = 'Menunggu TTD Digital (Peruri)';
          doc.statusSuratKeluar = 'Signing by Peruri CA';
          doc.statusBadge = 'primary';
          doc.currentAssigneeRole = 'peruri_ca';
          doc.currentAssigneeName = 'Peruri Certification Authority (CA)';
          doc.roleSuratKeluar = 'Peruri CA';
          doc.timeline.push({
            waktu: nowStr,
            aktor: payload.actorName || 'Yetty Endarwati',
            peran: 'Approver',
            aksi: 'Verifikasi OTP Sukses & Kirim ke Peruri',
            catatan: 'Kode OTP keamanan (616819) valid. Dokumen dikirimkan ke Third-Party Peruri CA untuk enkripsi & penerbitan Tanda Tangan Digital Pejabat.'
          });
          if (!doc.logActivity) doc.logActivity = [];
          doc.logActivity.unshift({
            waktu: nowStr.replace(' WIB', ''),
            status: 'Signing by Peruri CA',
            judul: 'Dokumen dikirim ke Peruri CA untuk penerbitan tanda tangan digital bersertifikat',
            oleh: `${payload.actorName || 'Yetty Endarwati'} - SVP Digitalisasi & Data Science`
          });
        }

        // 4C. Peruri Third Party Signing Completed -> Returns to SENTRA Admin Stempel
        if (subAction === 'peruri-sign-complete') {
          const dsSerial = 'PERURI-DS-2026-' + Math.floor(1000000 + Math.random() * 9000000);
          doc.status = 'Perlu Verifikasi Stempel';
          doc.statusSuratKeluar = 'Waiting For Stamp';
          doc.statusBadge = 'warning';
          doc.currentAssigneeRole = 'admin_stempel';
          doc.currentAssigneeName = 'Farah Nabila';
          doc.roleSuratKeluar = 'Admin Stempel';
          doc.stempelStatus = 'Menunggu Verifikasi Stempel';
          doc.ttdDigitalDetail = {
            provider: 'Peruri Digital Security (CA)',
            serialNumber: dsSerial,
            signer: payload.actorName || 'Yetty Endarwati',
            waktuVerifikasi: nowStr,
            status: 'Valid (CA-Certified)'
          };
          doc.timeline.push({
            waktu: nowStr,
            aktor: 'Peruri CA Engine',
            peran: 'Third-Party Service',
            aksi: 'Tanda Tangan Digital Diterbitkan',
            catatan: `Peruri CA berhasil menerbitkan tanda tangan digital bersertifikat (SN: ${dsSerial}). Dokumen dikembalikan ke SENTRA dan diteruskan ke Admin Stempel (Farah Nabila).`
          });
          if (!doc.logActivity) doc.logActivity = [];
          doc.logActivity.unshift({
            waktu: nowStr.replace(' WIB', ''),
            status: 'Waiting for Stamp',
            judul: `Peruri CA menerbitkan Tanda Tangan Digital (${dsSerial}) & dialihkan ke Admin Stempel`,
            oleh: 'Peruri CA System & Farah Nabila'
          });
        }

        // 5B. Peruri Third Party Sealing/Stamping In-Progress
        if (subAction === 'peruri-sealing') {
          doc.status = 'Proses Stempel di Peruri';
          doc.statusSuratKeluar = 'Sealing by Peruri CA';
          doc.statusBadge = 'primary';
          doc.currentAssigneeRole = 'peruri_ca';
          doc.currentAssigneeName = 'Peruri Electronic Seal (e-Seal)';
          doc.roleSuratKeluar = 'Peruri CA';
          doc.timeline.push({
            waktu: nowStr,
            aktor: payload.actorName || 'Farah Nabila',
            peran: 'Admin Stempel',
            aksi: 'Verifikasi Naskah & Ajukan Stempel ke Peruri',
            catatan: 'Admin Stempel memverifikasi naskah dan mengirimkan permintaan pembubuhan segel stempel kedinasan (e-Seal) ke Peruri.'
          });
          if (!doc.logActivity) doc.logActivity = [];
          doc.logActivity.unshift({
            waktu: nowStr.replace(' WIB', ''),
            status: 'Sealing by Peruri CA',
            judul: 'Naskah dikirim ke Peruri e-Seal Service untuk pembubuhan stempel resmi kedinasan',
            oleh: `${payload.actorName || 'Farah Nabila'} - Admin Stempel Biro Umum`
          });
        }

        // 5. Admin Stempel Verification Action (Peruri Seal Completed)
        if (subAction === 'verify-stamp' || subAction === 'peruri-seal-complete') {
          const serialNo = 'PERURI-STMP-2026-' + Math.floor(10000000 + Math.random() * 90000000);
          doc.stempelStatus = 'Terverifikasi';
          doc.isStamped = true;
          doc.statusSuratKeluar = 'Completed';
          doc.status = 'Disetujui / Selesai';
          doc.statusBadge = 'success';
          doc.stempelDetail = {
            provider: 'Peruri Digital Security',
            verifikator: payload.actorName || 'Farah Nabila',
            serialNumber: serialNo,
            waktuVerifikasi: nowStr,
            statusVerifikasi: 'Valid & Tersegel Resmi (CA-Certified)'
          };

          // Deduct quota from provider
          if (db.providers && db.providers[0]) {
            db.providers[0].kuotaStempel.terpakai += 1;
            db.providers[0].kuotaStempel.sisa -= 1;
          }

          if (doc.perluTindakLanjut) {
            doc.currentAssigneeRole = 'recipient';
            doc.currentAssigneeName = (doc.penerima && doc.penerima.name) || 'Penerima';
            doc.tindakLanjutStatus = 'Menunggu Laporan Tindak Lanjut dari Penerima';
          } else {
            doc.currentAssigneeRole = null;
            doc.currentAssigneeName = 'Selesai';
          }

          doc.timeline.push({
            waktu: nowStr,
            aktor: payload.actorName || 'Farah Nabila',
            peran: 'Admin Stempel',
            aksi: 'Verifikasi Stempel Digital Berhasil',
            catatan: `Stempel kedinasan resmi dibubuhkan melalui Peruri Digital Security. SN: ${serialNo}. Kuota stempel terpakai terpotong 1.`
          });
          if (!doc.logActivity) doc.logActivity = [];
          doc.logActivity = doc.logActivity.filter(a => a.status !== 'Completed');
          doc.logActivity.unshift({
            waktu: nowStr.replace(' WIB', ''),
            status: 'Completed',
            judul: 'Stempel kedinasan resmi dibubuhkan melalui Peruri Digital Security CA',
            oleh: `${payload.actorName || 'Farah Nabila'} - Admin Stempel Biro Umum`
          });
        }

        // 6. Tujuan / Penerima Follow-up Action
        if (subAction === 'follow-up') {
          doc.tindakLanjutNote = payload.notes || 'Tindak lanjut telah dilaksanakan sesuai instruksi naskah dinas.';
          doc.tindakLanjutStatus = 'Selesai Ditindaklanjuti';
          doc.status = 'Selesai';
          doc.statusBadge = 'success';
          doc.currentAssigneeRole = null;
          doc.currentAssigneeName = 'Selesai';

          doc.timeline.push({
            waktu: nowStr,
            aktor: payload.actorName || 'Dewi Lestari',
            peran: 'Tujuan / Penerima',
            aksi: 'Laporan Tindak Lanjut Dikirim',
            catatan: payload.notes || 'Laporan tindak lanjut telah disampaikan dan didokumentasikan.'
          });
        }

        doc.tanggalUpdate = new Date().toISOString();
        writeDb(db);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(doc));
        return;
      }

      // 7. POST /api/registrasi-surat (Admin Penerima Dokumen)
      if (pathname === '/api/registrasi-surat' && method === 'POST') {
        const newReg = {
          id: 'reg-' + Date.now().toString().slice(-4),
          agendaNumber: 'AGD-2026-10-0' + Math.floor(100 + Math.random() * 900),
          nomorSuratEksternal: payload.nomorSuratEksternal || 'SURAT-EKS/' + Math.floor(1000 + Math.random() * 9000),
          asalSurat: payload.asalSurat || 'Instansi Luar',
          perihal: payload.perihal || 'Perihal Surat Masuk Eksternal',
          tanggalSurat: payload.tanggalSurat || new Date().toISOString().slice(0, 10),
          tanggalDiterima: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB',
          penerimaDisposisi: payload.penerimaDisposisi || 'Direksi / Pejabat Terkait',
          sifat: payload.sifat || 'Biasa',
          statusRegistrasi: 'Terdaftar (Menunggu Disposisi)',
          lampiran: payload.lampiran || 'Berkas_Scan_Fisik.pdf (1.8 MB)',
          keterangan: payload.keterangan || 'Hardcopy disimpan di Bagian Tata Usaha.'
        };

        db.registeredIncomingDocs.unshift(newReg);
        writeDb(db);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newReg));
        return;
      }

      // 8. POST /api/documents/reset-external-demo
      if (pathname === '/api/documents/reset-external-demo' && method === 'POST') {
        const extDoc = db.documents && db.documents.find(d => d.id === 'doc-ext-01');
        if (extDoc) {
          extDoc.status = 'Menunggu Approval';
          extDoc.statusSuratKeluar = 'Waiting For Approval';
          extDoc.statusBadge = 'warning';
          extDoc.role = 'Approval';
          extDoc.roleSuratKeluar = 'Approval';
          extDoc.diperbaharuiTanggal = 'Selasa, 27 April 2026, 14:20';
          extDoc.diperbaharuiOleh = 'Siti Rahma';
          extDoc.currentAssigneeRole = 'approver';
          extDoc.currentAssigneeName = 'Yetty Endarwati (Approver)';
          extDoc.isStamped = false;
          extDoc.stempelStatus = 'Menunggu Verifikasi Stempel';
          extDoc.stempelDetail = null;
          extDoc.ttdDigitalDetail = null;
          writeDb(db);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, doc: extDoc }));
        return;
      }

      // 9. POST /api/reset (Reset prototype data)
      if (pathname === '/api/reset' && method === 'POST') {
        // Re-read initial or restore
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', message: 'Prototype data restored' }));
        return;
      }

      // 9. CRUD /api/tipe-surat
      if (pathname.startsWith('/api/tipe-surat')) {
        const parts = pathname.split('/');
        const idParam = parts[3];

        if (!db.tipeSuratList) {
          db.tipeSuratList = [];
        }

        if (method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(db.tipeSuratList));
          return;
        }

        if (method === 'POST') {
          const item = {
            id: payload.id || 'ts-' + Date.now(),
            kode: payload.kode || '',
            deskripsi: payload.deskripsi || '',
            perluDiunggah: !!payload.perluDiunggah,
            status: payload.status || 'Active',
            diperbaruiTanggal: payload.diperbaruiTanggal || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            diperbaruiOleh: payload.diperbaruiOleh || 'Ragil Brilyan'
          };
          db.tipeSuratList.unshift(item);
          writeDb(db);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(item));
          return;
        }

        if (method === 'PUT') {
          const targetId = idParam || payload.id;
          const idx = db.tipeSuratList.findIndex(t => t.id === targetId || t.kode === targetId);
          if (idx !== -1) {
            db.tipeSuratList[idx] = {
              ...db.tipeSuratList[idx],
              kode: payload.kode !== undefined ? payload.kode : db.tipeSuratList[idx].kode,
              deskripsi: payload.deskripsi !== undefined ? payload.deskripsi : db.tipeSuratList[idx].deskripsi,
              perluDiunggah: payload.perluDiunggah !== undefined ? payload.perluDiunggah : db.tipeSuratList[idx].perluDiunggah,
              status: payload.status !== undefined ? payload.status : db.tipeSuratList[idx].status,
              diperbaruiTanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
              diperbaruiOleh: payload.diperbaruiOleh || 'Ragil Brilyan'
            };
            writeDb(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db.tipeSuratList[idx]));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Tipe surat not found' }));
          }
          return;
        }

        if (method === 'DELETE') {
          const targetId = idParam || payload.id;
          db.tipeSuratList = db.tipeSuratList.filter(t => t.id !== targetId && t.kode !== targetId);
          writeDb(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
          return;
        }
      }

      // 10. CRUD /api/klasifikasi-surat
      if (pathname.startsWith('/api/klasifikasi-surat')) {
        const parts = pathname.split('/');
        const idParam = parts[3];

        if (!db.klasifikasiSuratList) {
          db.klasifikasiSuratList = [];
        }

        if (method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(db.klasifikasiSuratList));
          return;
        }

        if (method === 'POST') {
          const item = {
            id: payload.id || 'ks-' + Date.now(),
            kode: payload.kode || '',
            deskripsi: payload.deskripsi || '',
            sifat: payload.sifat || 'Rahasia',
            status: payload.status || 'Active',
            diperbaruiTanggal: payload.diperbaruiTanggal || new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            diperbaruiOleh: payload.diperbaruiOleh || 'Ragil Brilyan'
          };
          db.klasifikasiSuratList.unshift(item);
          writeDb(db);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(item));
          return;
        }

        if (method === 'PUT') {
          const targetId = idParam || payload.id;
          const idx = db.klasifikasiSuratList.findIndex(t => t.id === targetId || t.kode === targetId);
          if (idx !== -1) {
            db.klasifikasiSuratList[idx] = {
              ...db.klasifikasiSuratList[idx],
              kode: payload.kode !== undefined ? payload.kode : db.klasifikasiSuratList[idx].kode,
              deskripsi: payload.deskripsi !== undefined ? payload.deskripsi : db.klasifikasiSuratList[idx].deskripsi,
              sifat: payload.sifat !== undefined ? payload.sifat : db.klasifikasiSuratList[idx].sifat,
              status: payload.status !== undefined ? payload.status : db.klasifikasiSuratList[idx].status,
              diperbaruiTanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
              diperbaruiOleh: payload.diperbaruiOleh || 'Ragil Brilyan'
            };
            writeDb(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db.klasifikasiSuratList[idx]));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Klasifikasi surat not found' }));
          }
          return;
        }

        if (method === 'DELETE') {
          const targetId = idParam || payload.id;
          db.klasifikasiSuratList = db.klasifikasiSuratList.filter(t => t.id !== targetId && t.kode !== targetId);
          writeDb(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
          return;
        }
      }

      // 11. /api/user-legacy
      if (pathname.startsWith('/api/user-legacy')) {
        const parts = pathname.split('/');
        const idParam = parts[3];

        if (!db.userLegacyList) {
          db.userLegacyList = [];
        }

        if (method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(db.userLegacyList));
          return;
        }

        if (method === 'PUT') {
          const targetId = idParam || payload.id;
          const idx = db.userLegacyList.findIndex(t => t.id === targetId || t.username === targetId);
          if (idx !== -1) {
            db.userLegacyList[idx] = {
              ...db.userLegacyList[idx],
              ...payload
            };
            writeDb(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db.userLegacyList[idx]));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User Legacy not found' }));
          }
          return;
        }
      }

      // 12. CRUD /api/management-groups
      if (pathname.startsWith('/api/management-groups')) {
        if (!db.managementGroups) {
          db.managementGroups = [];
        }

        if (method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(db.managementGroups));
          return;
        }

        if (method === 'PUT' || method === 'POST') {
          db.managementGroups = payload;
          writeDb(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(db.managementGroups));
          return;
        }
      }

      // 13. CRUD /api/kontak-eksternal
      if (pathname.startsWith('/api/kontak-eksternal')) {
        const parts = pathname.split('/');
        const idParam = parts[3];

        if (!db.kontakEksternal) {
          db.kontakEksternal = [];
        }

        if (method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(db.kontakEksternal));
          return;
        }

        if (method === 'POST') {
          const now = new Date();
          const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
          const newContact = {
            id: payload.id || ('ke-' + Date.now().toString().slice(-6)),
            nama: payload.nama || '',
            instansi: payload.instansi || '',
            email: payload.email || '',
            nomorTelepon: payload.nomorTelepon || payload.telepon || '',
            tanggalDiperbaharui: payload.tanggalDiperbaharui || dateStr
          };
          // Check if contact already exists by email or nama+instansi
          const existingIdx = db.kontakEksternal.findIndex(k => 
            (payload.email && k.email && k.email.toLowerCase() === payload.email.toLowerCase()) ||
            (payload.nama && k.nama && k.nama.toLowerCase() === payload.nama.toLowerCase() && k.instansi?.toLowerCase() === payload.instansi?.toLowerCase())
          );
          if (existingIdx !== -1) {
            db.kontakEksternal[existingIdx] = {
              ...db.kontakEksternal[existingIdx],
              ...newContact,
              id: db.kontakEksternal[existingIdx].id
            };
            writeDb(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db.kontakEksternal[existingIdx]));
          } else {
            db.kontakEksternal.unshift(newContact);
            writeDb(db);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newContact));
          }
          return;
        }

        if (method === 'PUT') {
          const targetId = idParam || payload.id;
          const idx = db.kontakEksternal.findIndex(k => k.id === targetId);
          if (idx !== -1) {
            const now = new Date();
            const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
            db.kontakEksternal[idx] = {
              ...db.kontakEksternal[idx],
              ...payload,
              tanggalDiperbaharui: dateStr
            };
            writeDb(db);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(db.kontakEksternal[idx]));
          } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Kontak Eksternal not found' }));
          }
          return;
        }

        if (method === 'DELETE') {
          const targetId = idParam || payload.id;
          db.kontakEksternal = db.kontakEksternal.filter(k => k.id !== targetId);
          writeDb(db);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
          return;
        }
      }

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Endpoint not found' }));
    });
    return;
  }

  // --- STATIC FILE SERVING ---
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA
      const indexPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`SENTRA Digital Office Prototype running on http://localhost:${PORT}`);
  console.log(`Also accessible via http://127.0.0.1:${PORT}`);
});
