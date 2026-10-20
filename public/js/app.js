/**
 * SENTRA Digital Office - Prototype Application Logic
 * Pupuk Indonesia & Subsidiaries
 */

// Application State
let appState = {
  currentRole: 'users',
  currentPage: 'beranda',
  data: null,
  activeFilter: 'all',
  searchQuery: '',
  isDense: false,
  rowsPerPage: 10,
  expandedProviders: {},
  expandedCompanies: {},
  activeDocModalTab: 'preview',
  activeDoc: null,
  selectedDocId: 'doc-01',
  activeDetailTab: 'isi-surat',
  isPerihalExpanded: true,
  isLampiranDense: true,
  lampiranRowsPerPage: 2,
  lampiranCurrentPage: 1,
  adminViewAllMode: false,
  isKonfigurasiOpen: true,
  tipeSuratSearchQuery: '',
  tipeSuratDense: true,
  tipeSuratRowsPerPage: 10,
  tipeSuratCurrentPage: 1,
  klasifikasiSuratSearchQuery: '',
  klasifikasiSuratDense: true,
  klasifikasiSuratRowsPerPage: 10,
  klasifikasiSuratCurrentPage: 1,
  klasifikasiSuratFilterSifat: 'all',
  klasifikasiSuratFilterStatus: 'all',
  forwardState: {
    docId: null,
    isDropdownOpen: false,
    selectedRecipients: [],
    catatan: ''
  },
  templatSuratSearchQuery: '',
  templatSuratDense: true,
  templatSuratRowsPerPage: 10,
  templatSuratCurrentPage: 1,
  // Universal Filter Drawer State (Matching media_1792464418485_d9289e42.png)
  isFilterDrawerOpen: false,
  filterDrawerPage: '',
  templatSuratFilterUnitKerja: 'all',
  templatSuratFilterTujuan: 'all',
  templatSuratFilterStatus: 'all',
  suratMasukFilterPrioritas: 'all',
  suratMasukFilterSifat: 'all',
  suratMasukFilterTindakLanjut: 'all',
  suratKeluarFilterStatus: 'all',
  suratKeluarFilterSifat: 'all',
  suratKeluarFilterJenis: 'all',
  groupFilterType: 'all',
  editingTemplateId: null,
  templateForm: {
    nama: '',
    unitKerja: '',
    tipe: 'Surat Antar Unit Kerja',
    tujuan: 'Internal',
    penerima: '',
    tandaTanganDigital: false,
    stampDigital: false,
    status: 'Active'
  },
  userLegacySearchQuery: '',
  userLegacyDense: false,
  userLegacyRowsPerPage: 10,
  userLegacyCurrentPage: 1,
  userLegacyFilterStatus: 'all',
  mappingModal: {
    isOpen: false,
    legacyUserId: null,
    selectedNik: '',
    searchNikQuery: '',
    isDropdownOpen: false
  },
  suratKeluarSearchQuery: '',
  suratKeluarDense: false,
  suratKeluarRowsPerPage: 10,
  suratKeluarCurrentPage: 1,
  isCreateSuratAccordionOpen: true,
  isCreateSuratPerluTindakLanjut: true,
  createSuratLampiranDense: false,
  createSuratLampiranRowsPerPage: 5,
  createSuratLampiranPage: 1,
  isDataKosongMode: false,
  initialDocumentsBackup: null,
  berandaDense: true,
  berandaRowsPerPage: 10,
  berandaCurrentPage: 1,
  berandaSearchQuery: '',
  berandaFilterStatus: 'all',
  berandaFilterRole: 'all',
  berandaPeriod: 'today',
  isBerandaFilterOpen: false,
  isBerandaPeriodOpen: false
};

// Sidebar Toggle Function
function toggleSidebar() {
  document.body.classList.toggle('sidebar-collapsed');
}

// SVG Icons Generator
function getIcon(name, size = 18, className = '') {
  const icons = {
    home: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    suratMasuk: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    suratKeluar: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    aksesSurat: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 17v-1a5 5 0 0 1 10 0v1"/></svg>`,
    referensi: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    kontak: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    eye: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    history: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>`,
    inbox: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>`,
    send: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    fileText: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
    checkCircle: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    clock: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    stamp: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V18h16v-2.5a2.5 2.5 0 0 0-.73-1.77Z"/><path d="M14 13V8.5C14 7.12 12.88 6 11.5 6S9 7.12 9 8.5V13"/></svg>`,
    plus: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    search: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    server: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
    layers: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    shield: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    clipboardCheck: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`,
    gear: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    tipeSurat: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15h6"/><path d="M9 11h6"/><path d="M9 19h3"/></svg>`,
    klasifikasiSurat: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    templatSurat: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>`,
    userLegacy: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="18" cy="11" r="3"/><polyline points="18 10 18 11 19 11.5"/></svg>`,
    manajemenGroup: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    edit: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
    trash: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
    filter: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`
  };
  return icons[name] || '';
}

// Fetch State with dual support: Server API and LocalStorage fallback
async function fetchState() {
  // Check if we are running in standalone file mode or if server is unreachable
  if (window.location.protocol === 'file:') {
    loadLocalState();
    return;
  }

  try {
    const res = await fetch('/api/state');
    if (!res.ok) throw new Error('Server returned non-200');
    appState.data = await res.json();
    if (!appState.initialDocumentsBackup && appState.data.documents && appState.data.documents.length > 0) {
      appState.initialDocumentsBackup = JSON.parse(JSON.stringify(appState.data.documents));
      try { localStorage.setItem('sentra_initial_docs_backup', JSON.stringify(appState.initialDocumentsBackup)); } catch(e){}
    } else if (!appState.initialDocumentsBackup) {
      try {
        const cachedBackup = localStorage.getItem('sentra_initial_docs_backup');
        if (cachedBackup) appState.initialDocumentsBackup = JSON.parse(cachedBackup);
      } catch(e){}
    }
    if (!appState.data.tipeSuratList || appState.data.tipeSuratList.length === 0) {
      if (typeof INITIAL_SENTRA_DATA !== 'undefined' && INITIAL_SENTRA_DATA.tipeSuratList) {
        appState.data.tipeSuratList = JSON.parse(JSON.stringify(INITIAL_SENTRA_DATA.tipeSuratList));
      }
    }
    if (!appState.data.klasifikasiSuratList || appState.data.klasifikasiSuratList.length === 0) {
      if (typeof INITIAL_SENTRA_DATA !== 'undefined' && INITIAL_SENTRA_DATA.klasifikasiSuratList) {
        appState.data.klasifikasiSuratList = JSON.parse(JSON.stringify(INITIAL_SENTRA_DATA.klasifikasiSuratList));
      }
    }
    saveLocalCopy(appState.data);
    renderApp();
  } catch (err) {
    console.warn('Server API unavailable, falling back to local storage / seed data:', err);
    loadLocalState();
  }
}

function loadLocalState() {
  try {
    const cached = localStorage.getItem('sentra_prototype_db');
    if (cached) {
      appState.data = JSON.parse(cached);
    } else if (typeof INITIAL_SENTRA_DATA !== 'undefined') {
      appState.data = JSON.parse(JSON.stringify(INITIAL_SENTRA_DATA));
      saveLocalCopy(appState.data);
    }
  } catch (e) {
    if (typeof INITIAL_SENTRA_DATA !== 'undefined') {
      appState.data = JSON.parse(JSON.stringify(INITIAL_SENTRA_DATA));
    }
  }

  if (appState.data) {
    if (!appState.initialDocumentsBackup && appState.data.documents && appState.data.documents.length > 0) {
      appState.initialDocumentsBackup = JSON.parse(JSON.stringify(appState.data.documents));
      try { localStorage.setItem('sentra_initial_docs_backup', JSON.stringify(appState.initialDocumentsBackup)); } catch(e){}
    } else if (!appState.initialDocumentsBackup) {
      try {
        const cachedBackup = localStorage.getItem('sentra_initial_docs_backup');
        if (cachedBackup) appState.initialDocumentsBackup = JSON.parse(cachedBackup);
      } catch(e){}
    }
    if (!appState.data.tipeSuratList || appState.data.tipeSuratList.length === 0) {
      if (typeof INITIAL_SENTRA_DATA !== 'undefined' && INITIAL_SENTRA_DATA.tipeSuratList) {
        appState.data.tipeSuratList = JSON.parse(JSON.stringify(INITIAL_SENTRA_DATA.tipeSuratList));
      }
    }
    if (!appState.data.klasifikasiSuratList || appState.data.klasifikasiSuratList.length === 0) {
      if (typeof INITIAL_SENTRA_DATA !== 'undefined' && INITIAL_SENTRA_DATA.klasifikasiSuratList) {
        appState.data.klasifikasiSuratList = JSON.parse(JSON.stringify(INITIAL_SENTRA_DATA.klasifikasiSuratList));
      }
    }
    saveLocalCopy(appState.data);
  }

  renderApp();
}

function saveLocalCopy(data) {
  try {
    localStorage.setItem('sentra_prototype_db', JSON.stringify(data));
  } catch (e) {}
}

// Toast Notification
function showToast(message, isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'toast-error' : ''}`;
  toast.innerHTML = `
    ${getIcon(isError ? 'alertTriangle' : 'checkCircle', 18, isError ? 'text-danger' : 'text-success')}
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// Toggle Kosongkan Data (Testing alur dari nol untuk Surat Keluar & Surat Masuk)
async function toggleKosongkanData() {
  if (!appState.data) return;
  if (!appState.initialDocumentsBackup && appState.data.documents && appState.data.documents.length > 0) {
    appState.initialDocumentsBackup = JSON.parse(JSON.stringify(appState.data.documents));
    try { localStorage.setItem('sentra_initial_docs_backup', JSON.stringify(appState.initialDocumentsBackup)); } catch(e){}
  }
  
  appState.isDataKosongMode = true;
  appState.data.documents = [];
  saveLocalCopy(appState.data);

  try {
    await fetch('/api/documents/clear', { method: 'POST' });
  } catch (e) {
    console.warn('Cleared locally:', e);
  }

  showToast('Surat Keluar & Surat Masuk telah dikosongkan. Siap untuk testing alur dari nol!');
  renderApp();
}

// Reset Data Demo (Pulihkan seluruh data demo awal untuk Surat Keluar & Surat Masuk)
async function resetDataDemo() {
  if (!appState.data) return;
  let restoredDocs = null;

  try {
    const res = await fetch('/api/documents/reset', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data.documents && Array.isArray(data.documents) && data.documents.length > 0) {
        restoredDocs = data.documents;
      }
    }
  } catch (e) {
    console.warn('Reset via server failed, using local backup:', e);
  }

  if (!restoredDocs && appState.initialDocumentsBackup && appState.initialDocumentsBackup.length > 0) {
    restoredDocs = JSON.parse(JSON.stringify(appState.initialDocumentsBackup));
  } else if (!restoredDocs) {
    try {
      const cached = localStorage.getItem('sentra_initial_docs_backup');
      if (cached) restoredDocs = JSON.parse(cached);
    } catch(e){}
  }

  if (restoredDocs && restoredDocs.length > 0) {
    appState.data.documents = restoredDocs;
  }
  appState.isDataKosongMode = false;
  saveLocalCopy(appState.data);

  showToast('Seluruh data demo Surat Keluar & Surat Masuk berhasil dipulihkan!');
  renderApp();
}

// -------------------------------------------------------------------------
// PENGATURAN PROTOTYPE & DEMO MODAL (Clicking Settings Icon in Header)
// -------------------------------------------------------------------------

function openSettingsModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const isKosong = Boolean(appState.isDataKosongMode);

  modalContainer.innerHTML = `
    <div class="modal-backdrop" onclick="closeSettingsModal()"></div>
    <div class="modal-dialog settings-modal-card" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1050;">
      
      <!-- Modal Header -->
      <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #101828; margin: 0 0 4px 0; display: flex; align-items: center; gap: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00AD78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Pengaturan Prototype & Data Demo
          </h3>
          <p style="font-size: 13px; color: #64748B; margin: 0;">Kontrol pengujian simulasi alur dan manajemen data demo SENTRA.</p>
        </div>
        <button class="modal-close-icon-btn" onclick="closeSettingsModal()" style="background: none; border: none; font-size: 22px; cursor: pointer; color: #64748B; line-height: 1;">&times;</button>
      </div>

      <!-- Info Box: Prototype Interaktif -->
      <div class="settings-info-box">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 11px; font-weight: 700; background: #E8F7F0; color: #00875A; padding: 3px 10px; border-radius: 12px; letter-spacing: 0.04em;">
            PROTOTIPE INTERAKTIF
          </span>
          <span style="font-size: 11px; color: #64748B; font-weight: 600;">SENTRA DOF v2.4</span>
        </div>
        <p style="font-size: 12.5px; color: #344054; line-height: 1.5; margin: 0 0 6px 0;">
          Gunakan dropdown <strong>Testing as</strong> di kanan atas header untuk simulasi perpindahan role secara instan:
        </p>
        <div style="font-size: 12px; color: #0F5132; background: rgba(0, 173, 120, 0.08); padding: 6px 10px; border-radius: 6px; font-weight: 600;">
          Drafter &rarr; Reviewer &rarr; Approver &rarr; Admin Stempel &rarr; Penerima
        </div>
      </div>

      <!-- Section: Kontrol Data Demo -->
      <div style="margin-bottom: 24px;">
        <div style="font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 0.03em;">
          Kelola Data Pengujian
        </div>

        <!-- Action 1: Kosongkan Surat -->
        <div class="settings-action-row">
          <div style="max-width: 330px;">
            <div style="font-size: 13.5px; font-weight: 600; color: #101828; display: flex; align-items: center; gap: 6px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F04438" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Kosongkan Surat (Test dari Nol)
            </div>
            <div style="font-size: 12px; color: #64748B; margin-top: 3px;">
              Kosongkan surat keluar & masuk agar Anda bisa menguji alur pengajuan baru dari awal tanpa tercampur naskah demo bawaan.
            </div>
          </div>
          <button type="button" class="btn btn-sm ${isKosong ? 'btn-secondary' : 'btn-outline-danger'}" onclick="toggleKosongkanDataFromSettings()" style="font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 6px; cursor: pointer; white-space: nowrap;">
            ${isKosong ? 'Data Kosong (Isi Kembali)' : 'Kosongkan Surat'}
          </button>
        </div>

        <!-- Action 2: Reset Data Demo -->
        <div class="settings-action-row">
          <div style="max-width: 330px;">
            <div style="font-size: 13.5px; font-weight: 600; color: #101828; display: flex; align-items: center; gap: 6px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00AD78" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><polyline points="21 3 21 8 16 8"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><polyline points="3 21 3 16 8 16"/></svg>
              Reset Data Demo Awal
            </div>
            <div style="font-size: 12px; color: #64748B; margin-top: 3px;">
              Pulihkan kembali seluruh data surat demo awal, status persetujuan, dan stempel digital ke kondisi default.
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-primary" onclick="resetDataDemoFromSettings()" style="font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 6px; background: #00AD78; border-color: #00AD78; color: #FFFFFF; cursor: pointer; white-space: nowrap;">
            Reset Data Demo
          </button>
        </div>

        <!-- Action 3: Reset Manajemen Group -->
        <div class="settings-action-row">
          <div style="max-width: 330px;">
            <div style="font-size: 13.5px; font-weight: 600; color: #101828; display: flex; align-items: center; gap: 6px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Reset Manajemen Group
            </div>
            <div style="font-size: 12px; color: #64748B; margin-top: 3px;">
              Kembalikan seluruh hierarki unit dan grup organisasi (Level 0 - 5) ke konfigurasi awal.
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-secondary" onclick="resetGroupDataFromSettings()" style="font-size: 12px; font-weight: 600; padding: 7px 14px; border-radius: 6px; cursor: pointer; white-space: nowrap;">
            Reset Group
          </button>
        </div>

      </div>

      <!-- Modal Footer -->
      <div style="display: flex; justify-content: flex-end; padding-top: 14px; border-top: 1px solid #E2E8F0;">
        <button type="button" class="btn btn-secondary" onclick="closeSettingsModal()" style="padding: 9px 20px; font-weight: 600; border-radius: 8px;">
          Tutup
        </button>
      </div>

    </div>
  `;
}

function closeSettingsModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}

async function toggleKosongkanDataFromSettings() {
  await toggleKosongkanData();
  openSettingsModal();
}

async function resetDataDemoFromSettings() {
  await resetDataDemo();
  openSettingsModal();
}

function resetGroupDataFromSettings() {
  if (window.initialData && window.initialData.managementGroups) {
    appState.data.managementGroups = JSON.parse(JSON.stringify(window.initialData.managementGroups));
    saveManagementGroupsData(appState.data.managementGroups);
    showToast('Data Manajemen Group berhasil dikembalikan ke default.');
    openSettingsModal();
    renderApp();
  }
}

// Role-aware Filtering for Surat Keluar
// Selama proses pembuatan naskah, review, dan approval, naskah dinas sepenuhnya berada di SURAT KELUAR
function isDocRelevantForSuratKeluar(doc, persona) {
  if (!persona) return true;
  if (appState.adminViewAllMode && persona.id === 'admin_dof') return true;
  if (!appState.data || !appState.data.documents || appState.data.documents.length === 0) return false;

  const roleId = persona.id;
  const statusSK = (doc.statusSuratKeluar || '').toLowerCase();
  const statusGen = (doc.status || '').toLowerCase();

  // 1. Drafter role: melihat seluruh naskah yang dibuat / diajukan
  if (roleId === 'drafter') {
    if (doc.drafter && (doc.drafter.id === 'drafter' || doc.drafter.name?.toLowerCase().includes('ridha') || doc.drafter.name?.toLowerCase().includes('fadli') || doc.drafter.name?.toLowerCase().includes('budi'))) {
      return true;
    }
    if (doc.roleSuratKeluar === 'Drafter') return true;
    if (doc.keterangan && doc.keterangan.toLowerCase().includes('ridha')) return true;
    return false;
  }

  // 2. Reviewer role: SELAMA ITU UNTUK REVIEWER/APPROVER, TETAP DI SURAT KELUAR
  if (roleId === 'reviewer') {
    const isDesignatedReviewer = doc.reviewer && (
      doc.reviewer.id === 'reviewer' || 
      doc.reviewer.name?.toLowerCase().includes('siti') || 
      doc.reviewer.name?.toLowerCase().includes('rahma')
    );
    if (isDesignatedReviewer) return true;
    if (doc.roleSuratKeluar === 'Reviewer') return true;
    if (statusSK.includes('review') || statusGen.includes('review')) return true;
    return false;
  }

  // 3. Approver role: SELAMA ITU UNTUK REVIEWER/APPROVER, TETAP DI SURAT KELUAR
  if (roleId === 'approver') {
    const isDesignatedApprover = (
      (doc.approver && (doc.approver.id === 'approver' || doc.approver.name?.toLowerCase().includes('yetty') || doc.approver.name?.toLowerCase().includes('endarwati'))) ||
      (doc.approverName && doc.approverName.toLowerCase().includes('yetty'))
    );
    if (!isDesignatedApprover) return false;

    // Approver memantau naskah yang sudah diteruskan untuk persetujuan atau telah disetujui/ditolak
    const isReadyForOrPastApprover = (
      statusSK.includes('approval') ||
      statusGen.includes('approval') ||
      statusSK.includes('completed') ||
      statusGen.includes('selesai') ||
      statusGen.includes('disetujui') ||
      statusSK.includes('declined') ||
      statusGen.includes('ditolak')
    );
    return isReadyForOrPastApprover;
  }

  // 4. Penerima (Recipient):
  // Surat Keluar bukan area kerja penerima (Penerima hanya mengelola Surat Masuk)
  if (roleId === 'recipient') {
    return false;
  }

  // 5. Default untuk Admin DOF / Admin Stempel
  return true;
}

// Get Current Persona Object
function getCurrentPersona() {
  const role = appState.currentRole;
  if (role === 'drafter') {
    return {
      id: 'drafter',
      name: 'Muhammad Ridha Fadli',
      roleLabel: 'Drafter',
      title: 'Staff Operasional & Tim Digitalisasi',
      unit: 'Komp. Digitalisasi & Data Science',
      avatar: 'MRF',
      roleLevel: 'Drafter',
      description: 'Konseptor naskah dinas: Membuat draft surat, memilih reviewer dan approver, serta memantau status persetujuan.'
    };
  }
  if (role === 'reviewer') {
    return {
      id: 'reviewer',
      name: 'Siti Rahma',
      roleLabel: 'Reviewer',
      title: 'Senior Officer Rantai Pasok',
      unit: 'Komp. Digitalisasi & Data Science',
      avatar: 'SR',
      roleLevel: 'Reviewer',
      description: 'Penelaah naskah dinas: Memeriksa isi draft surat, memberikan catatan revisi, atau menyetujui untuk diteruskan ke Approver.'
    };
  }
  if (role === 'approver') {
    return {
      id: 'approver',
      name: 'Yetty Endarwati',
      roleLabel: 'Approver',
      title: 'SVP Digitalisasi & Data Science',
      unit: 'Komp. Digitalisasi & Data Science',
      avatar: 'YE',
      roleLevel: 'Approver',
      description: 'Pejabat Penandatangan: Memeriksa naskah final, menyetujui, dan menandatangani secara digital (digital signature).'
    };
  }
  if (role === 'recipient') {
    return {
      id: 'recipient',
      name: 'Dewi Lestari',
      roleLabel: 'Penerima Surat',
      title: 'AVP Keuangan & Anggaran Operasional',
      unit: 'Departemen Anggaran & Perbendaharaan',
      avatar: 'DL',
      roleLevel: 'Penerima Surat',
      description: 'Penerima naskah dinas: Menerima surat masuk resmi berstempel digital dan memberikan tindak lanjut atau disposisi.'
    };
  }
  if (role === 'users' || role === 'all') {
    return {
      id: 'users',
      name: 'Muhammad Ridha Fadli',
      roleLabel: 'Users (Drafter/Reviewer/Approver)',
      title: 'Staff Operasional & Tim Digitalisasi',
      unit: 'Komp. Digitalisasi & Data Science',
      avatar: 'MRF',
      roleLevel: 'Users (Drafter/Reviewer/Approver)',
      description: 'Akses terpadu pengguna: Membuat, menelaah, dan menyetujui surat dinas tanpa perlu berganti role.'
    };
  }
  if (role === 'admin_dof') {
    return {
      id: 'admin_dof',
      name: 'Rian Pratama',
      roleLabel: 'Admin DOF',
      title: 'System Administrator SENTRA',
      unit: 'Komp. Teknologi Infromasi',
      avatar: 'RP',
      roleLevel: 'Admin DOF',
      description: 'Pengelola master data, provider kuota tanda tangan/stempel, dan konfigurasi sistem.'
    };
  }
  if (role === 'admin_penerima') {
    return {
      id: 'admin_penerima',
      name: 'Agus Setiawan',
      roleLabel: 'Admin Penerima Dokumen',
      title: 'Staff Tata Usaha & Kearsipan',
      unit: 'Biro Umum & Sekretariat Korporat',
      avatar: 'AS',
      roleLevel: 'Admin Penerima Dokumen',
      description: 'Mencatat dan meregistrasi surat masuk fisik/eksternal ke dalam sistem SENTRA.'
    };
  }
  if (role === 'admin_stempel') {
    return {
      id: 'admin_stempel',
      name: 'Farah Nabila',
      roleLabel: 'Admin Stempel',
      title: 'Verifikator Keabsahan & Stempel Digital',
      unit: 'Biro Hukum & Tata Kelola Korporat',
      avatar: 'FN',
      roleLevel: 'Admin Stempel',
      description: 'Memverifikasi stempel digital melalui Surat Masuk setelah persetujuan Approver.'
    };
  }

  if (appState.data && appState.data.personas) {
    const directMatch = appState.data.personas.find(p => p.id === role);
    if (directMatch) return directMatch;
    return appState.data.personas[0];
  }

  return {
    id: 'users',
    name: 'Muhammad Ridha Fadli',
    roleLabel: 'Users (Drafter/Reviewer/Approver)',
    title: 'Staff Operasional & Tim Digitalisasi',
    unit: 'Komp. Digitalisasi & Data Science',
    avatar: 'MRF',
    roleLevel: 'Users (Drafter/Reviewer/Approver)'
  };
}

// User Permissions helper for unified multi-role dashboard
function getUserPermissions(roleId = appState.currentRole) {
  const role = roleId || appState.currentRole;
  return {
    isDrafter: ['users', 'all', 'drafter', 'admin_dof'].includes(role),
    isReviewer: ['users', 'all', 'reviewer'].includes(role),
    isApprover: ['users', 'all', 'approver'].includes(role),
    isRecipient: ['users', 'all', 'recipient', 'admin_penerima'].includes(role),
    isAdminDOF: ['admin_dof'].includes(role),
    isAdminPenerima: ['admin_penerima'].includes(role),
    isAdminStempel: ['admin_stempel'].includes(role)
  };
}

// Check RBAC Menu Access
function canAccessPage(pageKey, roleId) {
  const adminPages = [
    'tipe-surat', 'klasifikasi-surat', 'template-surat', 'templat-surat', 
    'buat-templat-surat', 'edit-templat-surat', 'user-legacy', 
    'manajemen-group', 'rbac', 'konfigurasi-provider', 'provider', 
    'detail-kontrak', 'detail-kontrak-provider'
  ];
  if (adminPages.includes(pageKey)) {
    return roleId === 'admin_dof';
  }
  if (pageKey === 'registrasi-surat') {
    return roleId === 'admin_penerima' || roleId === 'admin_dof';
  }
  return true;
}

// Personalized Mail Filtering: SURAT MASUK HANYA UNTUK PENERIMA
// Selama masih tahap draft, review, atau approval, dokumen TIDAK BOLEH muncul di Surat Masuk!
function isDocRelevantForSuratMasuk(doc, persona) {
  if (!persona) return false;
  if (!appState.data || !appState.data.documents || appState.data.documents.length === 0) return false;

  const roleId = persona.id;

  // Mode Audit Superadmin DOF: dapat menginspeksi seluruh arsip
  if (appState.adminViewAllMode && roleId === 'admin_dof') return true;

  // 1. CEK STATUS ALUR SURAT KELUAR:
  // Selama dokumen masih dalam tahap Draft, Menunggu Review, Menunggu Approval, atau Ditolak,
  // naskah dinas BELUM dikirimkan ke penerima dan HANYA berada di Surat Keluar!
  const statusSK = (doc.statusSuratKeluar || '').toLowerCase();
  const statusGen = (doc.status || '').toLowerCase();

  const isStillInInternalFlow = (
    statusSK.includes('draft') ||
    statusGen.includes('draft') ||
    statusSK.includes('review') ||
    statusGen.includes('review') ||
    statusSK.includes('waiting for review') ||
    statusSK.includes('approval') ||
    statusGen.includes('approval') ||
    statusSK.includes('waiting for approval') ||
    statusSK.includes('declined') ||
    statusGen.includes('ditolak')
  );

  if (isStillInInternalFlow) {
    return false;
  }

  // 2. SURAT MASUK HANYA UNTUK PENERIMA (RECIPIENT / TUJUAN / CC / ADMIN PENERIMA)
  const userName = (persona.name || '').toLowerCase().trim();
  const userUnit = (persona.unit || '').toLowerCase().trim();

  const matchName = (val) => {
    if (!val) return false;
    const s = String(val).toLowerCase().trim();
    return s.includes(userName) || userName.includes(s);
  };

  const matchUnit = (val) => {
    if (!val) return false;
    const s = String(val).toLowerCase().trim();
    return s.includes(userUnit) || userUnit.includes(s) || s.includes('seluruh unit kerja');
  };

  // Admin Penerima Dokumen (mengelola registrasi surat masuk)
  if (roleId === 'admin_penerima') {
    return true;
  }

  // Role Recipient / Penerima (Dewi Lestari)
  if (roleId === 'recipient') {
    if (doc.penerima && (doc.penerima.id === 'recipient' || matchName(doc.penerima.name) || matchUnit(doc.penerima.unit))) return true;
    if (doc.kepada && (matchName(doc.kepada) || matchUnit(doc.kepada))) return true;
    return true;
  }

  // Pengguna lain (misal Drafter/Reviewer/Approver) HANYA jika naskah resmi tersebut secara eksplisit ditujukan ke mereka sebagai Penerima / CC
  if (doc.penerima && (doc.penerima.id === roleId || matchName(doc.penerima.name) || matchUnit(doc.penerima.unit))) {
    return true;
  }
  if (doc.kepada && (matchName(doc.kepada) || matchUnit(doc.kepada))) {
    return true;
  }
  if (Array.isArray(doc.cc) && doc.cc.some(c => matchName(c) || matchUnit(c))) {
    return true;
  }

  return false;
}

// Alias for backwards compatibility
const isDocRelevantForPersona = isDocRelevantForSuratMasuk;

// Get count of actionable items for current role
function getActionableCount(roleId) {
  if (!appState.data || !appState.data.documents) return 0;
  const persona = getCurrentPersona();
  return appState.data.documents.filter(doc => isDocActionableForRole(doc, roleId, persona)).length;
}

function isDocActionableForRole(doc, roleId, persona) {
  const p = persona || getCurrentPersona();
  const effectiveRole = roleId || p.id;
  const statusSK = (doc.statusSuratKeluar || '').toLowerCase();
  const statusGen = (doc.status || '').toLowerCase();

  if (effectiveRole === 'users' || effectiveRole === 'all') {
    const isRevision = (statusSK.includes('returned') || statusGen.includes('dikembalikan') || statusGen.includes('revisi'));
    const isReview = (statusSK.includes('review') || statusGen.includes('review'));
    const isApproval = (statusSK.includes('approval') || statusGen.includes('approval'));
    return isRevision || isReview || isApproval;
  }

  if (effectiveRole === 'reviewer') {
    const isRev = (doc.reviewer && (
      doc.reviewer.id === 'reviewer' || 
      doc.reviewer.name?.toLowerCase().includes('siti') || 
      doc.reviewer.name?.toLowerCase().includes('rahma')
    )) || (doc.role === 'Reviewer') || (doc.currentAssigneeRole === 'reviewer');
    return isRev && (statusSK.includes('review') || statusGen.includes('review'));
  }
  if (effectiveRole === 'approver') {
    const isApp = (doc.approver && (
      doc.approver.id === 'approver' || 
      doc.approver.name?.toLowerCase().includes('yetty') || 
      doc.approver.name?.toLowerCase().includes('endarwati')
    )) || (doc.role === 'Approval') || (doc.approverName && doc.approverName.toLowerCase().includes('yetty')) || (doc.currentAssigneeRole === 'approver');
    return isApp && (statusSK.includes('approval') || statusGen.includes('approval'));
  }
  if (effectiveRole === 'admin_stempel') {
    return (doc.perluStempel || statusGen.includes('stempel') || statusGen === 'perlu verifikasi stempel') && (statusGen.includes('stempel') || statusSK.includes('stempel'));
  }
  if (effectiveRole === 'admin_penerima' || effectiveRole === 'recipient') {
    const isRec = (doc.penerima && (doc.penerima.id === 'recipient' || doc.penerima.name?.toLowerCase().includes('dewi') || doc.penerima.name?.toLowerCase().includes('lestari'))) ||
                  (doc.kepada && (doc.kepada.toLowerCase().includes('dewi') || doc.kepada.toLowerCase().includes('anggaran')));
    const isCompleted = (statusSK.includes('completed') || statusGen.includes('selesai') || statusGen.includes('disetujui') || statusGen.includes('tindak lanjut'));
    return isRec && isCompleted && (doc.statusTindakLanjut === 'Open' || doc.perluTindakLanjut || statusGen.includes('tindak lanjut'));
  }
  if (effectiveRole === 'drafter') {
    const isDraft = (doc.drafter && (doc.drafter.id === 'drafter' || doc.drafter.name?.toLowerCase().includes('ridha'))) || doc.roleSuratKeluar === 'Drafter' || doc.role === 'Drafter';
    const isRevision = (statusSK.includes('returned') || statusGen.includes('dikembalikan') || statusGen.includes('revisi'));
    return isDraft && (statusSK.includes('draft') || statusGen.includes('draft') || isRevision);
  }
  if (effectiveRole === 'admin_dof') {
    return true;
  }
  return false;
}

function toggleAdminViewAll() {
  appState.adminViewAllMode = !appState.adminViewAllMode;
  showToast(appState.adminViewAllMode ? 'Mode Admin: Menampilkan seluruh arsip korporat.' : 'Mode Personal: Menampilkan naskah terkait Rian Pratama.');
  renderApp();
}

// Render Sidebar Navigation matching Section 2 specifications:
// Dashboard: Beranda
// Services: Pesan Masuk, Surat Keluar
// File: Daftar Referensi
// Management: Kontak Eksternal
// (Admin DOF menus shown only when permitted)
function renderSidebar() {
  const currentPersona = getCurrentPersona();
  const roleId = appState.currentRole;
  const perms = getUserPermissions(roleId);
  const isSuratMasukActive = ['surat-masuk', 'pesan-masuk', 'detail-surat-masuk'].includes(appState.currentPage);
  const isSuratKeluarActive = ['surat-keluar', 'daftar-surat', 'buat-surat-baru', 'detail-surat-keluar'].includes(appState.currentPage);

  const navContainer = document.getElementById('sidebar-nav-container');
  if (!navContainer) return;

  let html = `
    <!-- DASHBOARD -->
    <div>
      <div class="nav-group-title">DASHBOARD</div>
      <ul class="nav-list">
        <li class="nav-item ${appState.currentPage === 'beranda' ? 'active' : ''}">
          <a href="#" onclick="navigate('beranda'); return false;">
            ${getIcon('home')}
            <span>Beranda</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- SERVICES -->
    <div>
      <div class="nav-group-title">SERVICES</div>
      <ul class="nav-list">
        <li class="nav-item ${isSuratMasukActive ? 'active' : ''}">
          <a href="#" onclick="navigate('surat-masuk'); return false;">
            ${getIcon('suratMasuk')}
            <span>Surat Masuk</span>
          </a>
        </li>
        <li class="nav-item ${isSuratKeluarActive ? 'active' : ''}">
          <a href="#" onclick="navigate('surat-keluar'); return false;">
            ${getIcon('suratKeluar')}
            <span>Surat Keluar</span>
          </a>
        </li>
      </ul>
    </div>
  `;

  // UTILITY & MANAGEMENT only appear for Admin DOF role
  if (perms.isAdminDOF) {
    html += `
      <!-- UTILITY (ADMIN DOF ONLY) -->
      <div>
        <div class="nav-group-title">UTILITY</div>
        <ul class="nav-list">
          <li class="nav-item ${appState.isKonfigurasiOpen ? 'active' : ''}">
            <a href="#" onclick="toggleKonfigurasi(event); return false;" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <div style="display: flex; align-items: center; gap: 10px;">
                ${getIcon('gear')}
                <span>Konfigurasi</span>
              </div>
              ${appState.isKonfigurasiOpen ? `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00AD78" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              ` : `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B3" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              `}
            </a>
          </li>
          ${appState.isKonfigurasiOpen ? `
            <li class="nav-subitem ${['konfigurasi-provider', 'provider', 'detail-kontrak', 'detail-kontrak-provider'].includes(appState.currentPage) ? 'active' : ''}">
              <a href="#" onclick="navigate('konfigurasi-provider'); return false;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background-color: #00AD78; display: inline-block; flex-shrink: 0;"></span>
                <span>Provider</span>
              </a>
            </li>
          ` : ''}
        </ul>
      </div>

      <!-- MANAGEMENT (ADMIN DOF ONLY) -->
      <div>
        <div class="nav-group-title">MANAGEMENT</div>
        <ul class="nav-list">
          <li class="nav-item ${appState.currentPage === 'tipe-surat' ? 'active' : ''}">
            <a href="#" onclick="navigate('tipe-surat'); return false;">
              ${getIcon('tipeSurat')}
              <span>Tipe Surat</span>
            </a>
          </li>
          <li class="nav-item ${appState.currentPage === 'klasifikasi-surat' ? 'active' : ''}">
            <a href="#" onclick="navigate('klasifikasi-surat'); return false;">
              ${getIcon('klasifikasiSurat')}
              <span>Klasifikasi Surat</span>
            </a>
          </li>
          <li class="nav-item ${['template-surat', 'templat-surat', 'buat-templat-surat', 'edit-templat-surat'].includes(appState.currentPage) ? 'active' : ''}">
            <a href="#" onclick="navigate('template-surat'); return false;">
              ${getIcon('templatSurat')}
              <span>Templat Surat</span>
            </a>
          </li>
          <li class="nav-item ${appState.currentPage === 'user-legacy' ? 'active' : ''}">
            <a href="#" onclick="navigate('user-legacy'); return false;">
              ${getIcon('userLegacy')}
              <span>User Legacy</span>
            </a>
          </li>
          <li class="nav-item ${appState.currentPage === 'manajemen-group' ? 'active' : ''}">
            <a href="#" onclick="navigate('manajemen-group'); return false;">
              ${getIcon('manajemenGroup')}
              <span>Manajemen Group</span>
            </a>
          </li>
          <li class="nav-item ${appState.currentPage === 'rbac' ? 'active' : ''}">
            <a href="#" onclick="navigate('rbac'); return false;">
              ${getIcon('shield')}
              <span>RBAC</span>
            </a>
          </li>
        </ul>
      </div>
    `;
  }

  if (roleId === 'admin_penerima') {
    html += `
      <div>
        <div class="nav-group-title">TATA USAHA</div>
        <ul class="nav-list">
          <li class="nav-item ${appState.currentPage === 'registrasi-surat' ? 'active' : ''}">
            <a href="#" onclick="navigate('registrasi-surat'); return false;">
              ${getIcon('clipboardCheck')}
              <span>Registrasi Surat</span>
            </a>
          </li>
        </ul>
      </div>
    `;
  }

  navContainer.innerHTML = html;
}

// Toggle Konfigurasi Submenu Accordion
function toggleKonfigurasi(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  appState.isKonfigurasiOpen = !appState.isKonfigurasiOpen;
  renderSidebar();
}

// Navigation Handler
function navigate(pageKey) {
  if (!canAccessPage(pageKey, appState.currentRole)) {
    showToast('Akses dibatasi oleh RBAC untuk peran ini.', true);
    return;
  }
  if (pageKey === 'buat-surat-baru') {
    appState.currentRole = 'drafter';
    appState.selectedDocId = null;
  }
  if (pageKey === 'buat-templat-surat' && !appState.editingTemplateId) {
    appState.templateForm = {
      nama: '',
      unitKerja: '',
      tipe: 'Surat Antar Unit Kerja',
      tujuan: 'Internal',
      penerima: '',
      tandaTanganDigital: false,
      stampDigital: false,
      status: 'Active'
    };
  }
  appState.currentPage = pageKey;
  if (['konfigurasi-provider', 'konfigurasi', 'detail-kontrak', 'detail-kontrak-provider'].includes(pageKey)) {
    appState.isKonfigurasiOpen = true;
  }
  if (window.location.hash.replace('#', '') !== pageKey) {
    window.location.hash = pageKey;
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Role Switcher Handler
function onRoleChange(newRole) {
  appState.currentRole = newRole;
  // If current page is forbidden for new role, default to beranda
  if (!canAccessPage(appState.currentPage, newRole)) {
    appState.currentPage = 'beranda';
  }
  const persona = getCurrentPersona();
  showToast(`Beralih simulasi ke: ${persona.roleLabel} (${persona.name})`);
  renderApp();
}

// Main Render Loop
function renderApp() {
  if (!appState.data) return;

  // Set top-right role selector value
  const roleSelect = document.getElementById('prototype-role-select');
  if (roleSelect) {
    roleSelect.value = appState.currentRole;
  }

  // Toggle global header and demo banner for dedicated fixed-bar detail views
  const topHeader = document.querySelector('.top-header');
  const demoBanner = document.querySelector('.demo-banner');
  const isDetailSuratKeluar = (appState.currentPage === 'buat-surat-baru' || appState.currentPage === 'detail-surat-keluar');

  if (topHeader) {
    topHeader.style.display = isDetailSuratKeluar ? 'none' : 'flex';
  }
  if (demoBanner) {
    demoBanner.style.display = isDetailSuratKeluar ? 'none' : 'flex';
  }

  renderSidebar();

  const contentArea = document.getElementById('main-content-view');
  if (!contentArea) return;

  switch (appState.currentPage) {
    case 'beranda':
      contentArea.innerHTML = renderBerandaView();
      break;

    case 'surat-masuk':
    case 'pesan-masuk':
      contentArea.innerHTML = renderSuratMasukView();
      break;
    case 'detail-surat-masuk':
      contentArea.innerHTML = renderDetailSuratMasukView();
      break;
    case 'surat-keluar':
    case 'daftar-surat':
      contentArea.innerHTML = renderSuratKeluarView();
      break;
    case 'buat-surat-baru':
    case 'detail-surat-keluar':
      contentArea.innerHTML = renderBuatSuratBaruView();
      break;
    case 'konfigurasi-provider':
    case 'provider':
      contentArea.innerHTML = renderKonfigurasiProviderView();
      break;
    case 'detail-kontrak':
    case 'detail-kontrak-provider':
      contentArea.innerHTML = renderDetailKontrakProviderView();
      break;
    case 'registrasi-surat':
      contentArea.innerHTML = renderRegistrasiSuratView();
      break;
    case 'rbac':
      contentArea.innerHTML = renderRbacView();
      break;
    case 'tipe-surat':
      contentArea.innerHTML = renderTipeSuratView();
      break;
    case 'klasifikasi-surat':
      contentArea.innerHTML = renderKlasifikasiSuratView();
      break;
    case 'template-surat':
    case 'templat-surat':
      contentArea.innerHTML = renderTemplatSuratView();
      break;
    case 'buat-templat-surat':
    case 'edit-templat-surat':
      contentArea.innerHTML = renderBuatTemplatSuratView();
      break;
    case 'user-legacy':
      contentArea.innerHTML = renderUserLegacyView();
      break;
    case 'manajemen-group':
      contentArea.innerHTML = renderManajemenGroupView();
      break;
    case 'permintaan-akses-surat':
    case 'daftar-referensi':
    case 'kontak-eksternal':
      contentArea.innerHTML = renderGenericAdminView(appState.currentPage);
      break;
    default:
      contentArea.innerHTML = renderBerandaView();
  }

  // Render universal filter drawer if open
  renderFilterDrawer();
}

// ==========================================================================
// Slide-Over Filter Drawer Component (Matching media_1792464418485_d9289e42.png)
// ==========================================================================

function openFilterDrawer(pageKey) {
  appState.filterDrawerPage = pageKey || appState.currentPage;
  appState.isFilterDrawerOpen = true;
  renderFilterDrawer();
}

function closeFilterDrawer() {
  const drawer = document.getElementById('filter-drawer-el');
  const backdrop = document.querySelector('.filter-drawer-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    setTimeout(() => {
      appState.isFilterDrawerOpen = false;
      renderFilterDrawer();
    }, 260);
  } else {
    appState.isFilterDrawerOpen = false;
    renderFilterDrawer();
  }
}

function resetActiveFilterDrawer() {
  const page = appState.filterDrawerPage || appState.currentPage;
  const config = getFilterConfigForPage(page);
  config.fields.forEach(f => {
    appState[f.key] = 'all';
  });
  showToast('Filter telah di-reset.');
  renderFilterDrawer();
  renderActivePageContent();
}

function onFilterDrawerFieldChange(fieldKey, value, page) {
  appState[fieldKey] = value;
  const selectEl = document.getElementById(`filter-select-${fieldKey}`);
  if (selectEl) {
    if (value === 'all' || !value) {
      selectEl.classList.add('is-placeholder');
    } else {
      selectEl.classList.remove('is-placeholder');
    }
  }
  // Render live behind the drawer
  renderActivePageContent();
}

function renderActivePageContent() {
  const contentArea = document.getElementById('main-content-view');
  if (!contentArea) return;

  switch (appState.currentPage) {
    case 'beranda':
      contentArea.innerHTML = renderBerandaView();
      break;
    case 'surat-masuk':
    case 'pesan-masuk':
      contentArea.innerHTML = renderSuratMasukView();
      break;
    case 'surat-keluar':
    case 'daftar-surat':
      contentArea.innerHTML = renderSuratKeluarView();
      break;
    case 'template-surat':
    case 'templat-surat':
      contentArea.innerHTML = renderTemplatSuratView();
      break;
    case 'tipe-surat':
      contentArea.innerHTML = renderTipeSuratView();
      break;
    case 'klasifikasi-surat':
      contentArea.innerHTML = renderKlasifikasiSuratView();
      break;
    case 'user-legacy':
      contentArea.innerHTML = renderUserLegacyView();
      break;
    case 'manajemen-group':
      contentArea.innerHTML = renderManajemenGroupView();
      break;
    default:
      renderApp();
  }
}

function getFilterConfigForPage(page) {
  if (page === 'templat-surat' || page === 'template-surat') {
    return {
      title: 'Filter',
      fields: [
        {
          key: 'templatSuratFilterUnitKerja',
          label: 'Unit Kerja',
          placeholder: 'Pilih Unit Kerja',
          options: [
            'Semua Unit Kerja',
            'Semua Unit',
            'PT Pupuk Indonesia (Persero)',
            'PT Petrokimia Gresik',
            'PT Pupuk Kujang',
            'PT Pupuk Kaltim',
            'PT Pupuk Sriwidjaja Palembang',
            'PT Pupuk Iskandar Muda',
            'Komp. Digitalisasi & Data Science',
            'Departemen Anggaran & Perbendaharaan'
          ]
        },
        {
          key: 'templatSuratFilterTujuan',
          label: 'Tujuan',
          placeholder: 'Pilih Tujuan',
          options: [
            'Semua Tujuan',
            'Surat Antar Unit Kerja',
            'Surat Keluar',
            'Internal',
            'Eksternal'
          ]
        },
        {
          key: 'templatSuratFilterStatus',
          label: 'Status',
          placeholder: 'Pilih Status',
          options: [
            'Semua Status',
            'Active',
            'Inactive'
          ]
        }
      ]
    };
  }

  if (page === 'beranda') {
    return {
      title: 'Filter',
      fields: [
        {
          key: 'berandaFilterStatus',
          label: 'Status',
          placeholder: 'Pilih Status',
          options: [
            { value: 'all', label: 'Semua Status' },
            { value: 'draft', label: 'Draft' },
            { value: 'review', label: 'Waiting for Review' },
            { value: 'approval', label: 'Waiting For Approval' },
            { value: 'revisi', label: 'Returned for Revision' },
            { value: 'selesai', label: 'Completed' }
          ]
        },
        {
          key: 'berandaFilterRole',
          label: 'Role',
          placeholder: 'Pilih Role',
          options: [
            { value: 'all', label: 'Semua Role' },
            { value: 'Drafter', label: 'Drafter' },
            { value: 'Reviewer', label: 'Reviewer' },
            { value: 'Approval', label: 'Approval' }
          ]
        }
      ]
    };
  }

  if (page === 'surat-masuk' || page === 'pesan-masuk') {
    return {
      title: 'Filter',
      fields: [
        {
          key: 'suratMasukFilterPrioritas',
          label: 'Prioritas',
          placeholder: 'Pilih Prioritas',
          options: ['Semua Prioritas', 'Sangat Segera', 'Segera', 'Biasa']
        },
        {
          key: 'suratMasukFilterSifat',
          label: 'Sifat',
          placeholder: 'Pilih Sifat',
          options: ['Semua Sifat', 'Terbatas', 'Biasa', 'Rahasia']
        },
        {
          key: 'suratMasukFilterTindakLanjut',
          label: 'Status Tindak Lanjut',
          placeholder: 'Pilih Status',
          options: [
            { value: 'all', label: 'Semua Status' },
            { value: 'Open', label: 'Open' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Closed', label: 'Closed' }
          ]
        }
      ]
    };
  }

  if (page === 'surat-keluar' || page === 'daftar-surat') {
    return {
      title: 'Filter',
      fields: [
        {
          key: 'suratKeluarFilterStatus',
          label: 'Status',
          placeholder: 'Pilih Status',
          options: [
            'Semua Status',
            'Draft',
            'Waiting for Review',
            'Waiting for Approval',
            'Completed'
          ]
        },
        {
          key: 'suratKeluarFilterSifat',
          label: 'Sifat',
          placeholder: 'Pilih Sifat',
          options: ['Semua Sifat', 'Terbatas', 'Biasa', 'Rahasia']
        },
        {
          key: 'suratKeluarFilterJenis',
          label: 'Jenis Surat',
          placeholder: 'Pilih Jenis Surat',
          options: ['Semua Jenis Surat', 'Nota Dinas', 'Surat Dinas', 'Surat Edaran', 'Memo']
        }
      ]
    };
  }

  if (page === 'tipe-surat') {
    return {
      title: 'Filter',
      fields: [
        {
          key: 'tipeSuratFilterStatus',
          label: 'Status',
          placeholder: 'Pilih Status',
          options: [
            { value: 'all', label: 'Semua Status' },
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
          ]
        },
        {
          key: 'tipeSuratFilterUpload',
          label: 'Perlu Diunggah',
          placeholder: 'Pilih Kebutuhan Unggah',
          options: [
            { value: 'all', label: 'Semua' },
            { value: 'true', label: 'Ya, perlu diunggah' },
            { value: 'false', label: 'Tidak perlu diunggah' }
          ]
        }
      ]
    };
  }

  if (page === 'klasifikasi-surat') {
    return {
      title: 'Filter',
      fields: [
        {
          key: 'klasifikasiSuratFilterSifat',
          label: 'Sifat',
          placeholder: 'Pilih Sifat',
          options: [
            { value: 'all', label: 'Semua Sifat' },
            { value: 'Terbatas', label: 'Terbatas' },
            { value: 'Biasa', label: 'Biasa' },
            { value: 'Rahasia', label: 'Rahasia' }
          ]
        },
        {
          key: 'klasifikasiSuratFilterStatus',
          label: 'Status',
          placeholder: 'Pilih Status',
          options: [
            { value: 'all', label: 'Semua Status' },
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
          ]
        }
      ]
    };
  }

  if (page === 'user-legacy') {
    return {
      title: 'Filter',
      fields: [
        {
          key: 'userLegacyFilterStatus',
          label: 'Status Integrasi',
          placeholder: 'Pilih Status',
          options: [
            { value: 'all', label: 'Semua Status' },
            { value: 'Terhubung', label: 'Terhubung' },
            { value: 'Belum Terhubung', label: 'Belum Terhubung' }
          ]
        }
      ]
    };
  }

  if (page === 'manajemen-group') {
    return {
      title: 'Filter',
      fields: [
        {
          key: 'groupFilterType',
          label: 'Tipe Grup',
          placeholder: 'Pilih Tipe Grup',
          options: ['Semua Tipe', 'Holding', 'Anak Perusahaan', 'Unit Kerja']
        }
      ]
    };
  }

  return {
    title: 'Filter',
    fields: [
      {
        key: 'genericFilterStatus',
        label: 'Status',
        placeholder: 'Pilih Status',
        options: ['Semua Status', 'Active', 'Inactive']
      }
    ]
  };
}

function renderFilterDrawer() {
  const container = document.getElementById('filter-drawer-container');
  if (!container) return;

  if (!appState.isFilterDrawerOpen) {
    container.innerHTML = '';
    return;
  }

  const page = appState.filterDrawerPage || appState.currentPage;
  const config = getFilterConfigForPage(page);

  container.innerHTML = `
    <!-- Backdrop overlay -->
    <div class="filter-drawer-backdrop is-open" onclick="closeFilterDrawer()"></div>

    <!-- Drawer Panel matching reference media_1792464418485_d9289e42.png -->
    <aside class="filter-drawer is-open" id="filter-drawer-el" role="dialog" aria-modal="true" aria-label="Filter Panel">
      <!-- Header -->
      <div class="filter-drawer-header">
        <h2 class="filter-drawer-title">Filter</h2>
        <div class="filter-drawer-actions">
          <button type="button" class="filter-drawer-btn btn-reset" title="Reset Filter" onclick="resetActiveFilterDrawer()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 21h5v-5"/>
            </svg>
          </button>
          <button type="button" class="filter-drawer-btn" title="Tutup" onclick="closeFilterDrawer()">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Filter Fields -->
      <div class="filter-drawer-body">
        ${config.fields.map(field => {
          const val = appState[field.key] || 'all';
          const isPlaceholder = (val === 'all' || !val);
          return `
            <div class="filter-drawer-field">
              <label class="filter-drawer-label" for="filter-select-${field.key}">${field.label}</label>
              <div class="filter-drawer-select-wrapper">
                <select id="filter-select-${field.key}" 
                        class="filter-drawer-select ${isPlaceholder ? 'is-placeholder' : ''}"
                        onchange="onFilterDrawerFieldChange('${field.key}', this.value, '${page}')">
                  <option value="all" ${val === 'all' ? 'selected' : ''}>${field.placeholder}</option>
                  ${field.options.map(opt => {
                    const optVal = typeof opt === 'string' ? opt : opt.value;
                    const optLabel = typeof opt === 'string' ? opt : opt.label;
                    if (optVal === 'all') return '';
                    return `<option value="${escapeHtml(optVal)}" ${val === optVal ? 'selected' : ''}>${escapeHtml(optLabel)}</option>`;
                  }).join('')}
                </select>
                <div class="filter-drawer-select-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </aside>
  `;
}

// Global Escape Key Listener for Filter Drawer
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && appState.isFilterDrawerOpen) {
    closeFilterDrawer();
  }
});

// ---------------- VIEWS ---------------- //

// 1. Beranda View (Exact Match with Reference Dashboard Screenshot)
function renderBerandaView() {
  const currentPeriod = appState.berandaPeriod || 'today';
  const periodLabel = getBerandaPeriodLabel(currentPeriod);
  const isPeriodOpen = !!appState.isBerandaPeriodOpen;
  const isFilterOpen = !!appState.isBerandaFilterOpen;
  const filterStatus = appState.berandaFilterStatus || 'all';
  const filterRole = appState.berandaFilterRole || 'all';
  const searchQuery = appState.berandaSearchQuery || '';

  const allDocs = (appState.data && appState.data.documents) || [];
  const persona = getCurrentPersona();
  const roleId = appState.currentRole;

  // Dynamic metrics:
  const countTindakan = allDocs.filter(d => isDocActionableForRole(d, roleId, persona)).length;

  const countDraft = allDocs.filter(d => {
    const isUserDraft = (d.drafter && (d.drafter.id === 'drafter' || d.drafter.name?.toLowerCase().includes('ridha'))) || d.role === 'Drafter';
    const s = (d.status || '').toLowerCase();
    const sk = (d.statusSuratKeluar || '').toLowerCase();
    return (s.includes('draft') || sk.includes('draft')) && (['admin_dof', 'users', 'all', 'drafter'].includes(roleId) ? isUserDraft : false);
  }).length;

  const countProses = allDocs.filter(d => {
    const s = (d.status || '').toLowerCase();
    const sk = (d.statusSuratKeluar || '').toLowerCase();
    const isCompleted = s.includes('selesai') || s.includes('completed') || sk.includes('completed');
    const isDraft = s.includes('draft') || sk.includes('draft');
    return !isCompleted && !isDraft;
  }).length;

  const countSelesai = allDocs.filter(d => {
    const s = (d.status || '').toLowerCase();
    const sk = (d.statusSuratKeluar || '').toLowerCase();
    return s.includes('selesai') || s.includes('completed') || sk.includes('completed');
  }).length;

  const { total } = getBerandaPaginatedDocuments();

  return `
    <!-- Page Header: Title + Period Dropdown (Exact Match) -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; position: relative;">
      <div>
        <h2 style="font-size: 24px; font-weight: 700; color: #101828; margin: 0; line-height: 1.2;">Beranda</h2>
      </div>

      <!-- Time Period Dropdown -->
      <div style="position: relative;" id="beranda-period-container">
        <button type="button" 
                onclick="toggleBerandaPeriodDropdown(event)" 
                style="background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; padding: 8px 16px; font-size: 13px; font-weight: 500; color: #344054; display: flex; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05); transition: all 0.15s ease;"
                onmouseover="this.style.borderColor='#98A2B3'"
                onmouseout="this.style.borderColor='#D0D5DD'">
          <span>${escapeHtml(periodLabel)}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#667085" stroke-width="2" style="transform: ${isPeriodOpen ? 'rotate(180deg)' : 'rotate(0)'}; transition: transform 0.15s ease;"><polyline points="6 9 12 15 18 9"/></svg>
        </button>

        ${isPeriodOpen ? `
          <div id="beranda-period-dropdown" style="position: absolute; right: 0; top: calc(100% + 6px); width: 170px; background: #FFFFFF; border: 1px solid #EAECF0; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); z-index: 60; padding: 6px 0;">
            <button type="button" onclick="setBerandaPeriod('today')" style="width: 100%; text-align: left; padding: 8px 16px; background: ${currentPeriod === 'today' ? '#E8F7F0' : 'transparent'}; border: none; font-size: 13px; color: ${currentPeriod === 'today' ? '#00AD78' : '#344054'}; font-weight: ${currentPeriod === 'today' ? '600' : '400'}; cursor: pointer;">Hari ini</button>
            <button type="button" onclick="setBerandaPeriod('7days')" style="width: 100%; text-align: left; padding: 8px 16px; background: ${currentPeriod === '7days' ? '#E8F7F0' : 'transparent'}; border: none; font-size: 13px; color: ${currentPeriod === '7days' ? '#00AD78' : '#344054'}; font-weight: ${currentPeriod === '7days' ? '600' : '400'}; cursor: pointer;">7 Hari Terakhir</button>
            <button type="button" onclick="setBerandaPeriod('month')" style="width: 100%; text-align: left; padding: 8px 16px; background: ${currentPeriod === 'month' ? '#E8F7F0' : 'transparent'}; border: none; font-size: 13px; color: ${currentPeriod === 'month' ? '#00AD78' : '#344054'}; font-weight: ${currentPeriod === 'month' ? '600' : '400'}; cursor: pointer;">Bulan ini</button>
            <button type="button" onclick="setBerandaPeriod('year')" style="width: 100%; text-align: left; padding: 8px 16px; background: ${currentPeriod === 'year' ? '#E8F7F0' : 'transparent'}; border: none; font-size: 13px; color: ${currentPeriod === 'year' ? '#00AD78' : '#344054'}; font-weight: ${currentPeriod === 'year' ? '600' : '400'}; cursor: pointer;">Tahun ini</button>
            <button type="button" onclick="setBerandaPeriod('all')" style="width: 100%; text-align: left; padding: 8px 16px; background: ${currentPeriod === 'all' ? '#E8F7F0' : 'transparent'}; border: none; font-size: 13px; color: ${currentPeriod === 'all' ? '#00AD78' : '#344054'}; font-weight: ${currentPeriod === 'all' ? '600' : '400'}; cursor: pointer;">Semua Waktu</button>
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Section 1: Ringkasan Surat Card (Exact Match) -->
    <div class="card" style="margin-bottom: 24px; border: 1px solid #EAECF0; border-radius: 12px; background: #FFFFFF; padding: 20px 24px; box-shadow: 0 1px 3px rgba(16, 24, 40, 0.04);">
      <div style="margin-bottom: 16px;">
        <h3 style="font-size: 16px; font-weight: 700; color: #101828; margin: 0 0 4px 0;">Ringkasan Surat</h3>
        <p style="font-size: 13px; color: #667085; margin: 0;">Pantau status surat dan tindakan yang perlu diselesaikan</p>
      </div>

      <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <!-- Card 1: Perlu Tindakan -->
        <div style="background: #FFFFFF; border: 1px solid #EAECF0; border-radius: 10px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 105px; transition: transform 0.15s ease, box-shadow 0.15s ease;"
             onmouseover="this.style.boxShadow='0 4px 6px -1px rgba(0,0,0,0.05)'"
             onmouseout="this.style.boxShadow='none'">
          <div>
            <div style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 8px;">Perlu Tindakan</div>
            <div style="font-size: 30px; font-weight: 700; color: #101828; line-height: 1;">${countTindakan}</div>
          </div>
          <div style="margin-top: 14px;">
            <a href="#" onclick="filterBerandaBySummary('tindakan'); return false;" style="font-size: 12.5px; font-weight: 500; color: #00AD78; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
              <span>Lihat Perlu Tindakan</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
        </div>

        <!-- Card 2: Draft Saya -->
        <div style="background: #EFF8FF; border: 1px solid #D0E8FF; border-radius: 10px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 105px; transition: transform 0.15s ease, box-shadow 0.15s ease;"
             onmouseover="this.style.boxShadow='0 4px 6px -1px rgba(0,0,0,0.05)'"
             onmouseout="this.style.boxShadow='none'">
          <div>
            <div style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 8px;">Draft Saya</div>
            <div style="font-size: 30px; font-weight: 700; color: #101828; line-height: 1;">${countDraft}</div>
          </div>
          <div style="margin-top: 14px;">
            <a href="#" onclick="filterBerandaBySummary('draft'); return false;" style="font-size: 12.5px; font-weight: 500; color: #00AD78; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
              <span>Lihat Draft</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
        </div>

        <!-- Card 3: Surat Dalam Proses -->
        <div style="background: #FEFBE8; border: 1px solid #FEEFC6; border-radius: 10px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 105px; transition: transform 0.15s ease, box-shadow 0.15s ease;"
             onmouseover="this.style.boxShadow='0 4px 6px -1px rgba(0,0,0,0.05)'"
             onmouseout="this.style.boxShadow='none'">
          <div>
            <div style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 8px;">Surat Dalam Proses</div>
            <div style="font-size: 30px; font-weight: 700; color: #101828; line-height: 1;">${countProses}</div>
          </div>
          <div style="margin-top: 14px;">
            <a href="#" onclick="filterBerandaBySummary('proses'); return false;" style="font-size: 12.5px; font-weight: 500; color: #00AD78; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
              <span>Lihat Surat</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
        </div>

        <!-- Card 4: Surat Selesai -->
        <div style="background: #EDF9F4; border: 1px solid #C7F1DC; border-radius: 10px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; min-height: 105px; transition: transform 0.15s ease, box-shadow 0.15s ease;"
             onmouseover="this.style.boxShadow='0 4px 6px -1px rgba(0,0,0,0.05)'"
             onmouseout="this.style.boxShadow='none'">
          <div>
            <div style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 8px;">Surat Selesai</div>
            <div style="font-size: 30px; font-weight: 700; color: #101828; line-height: 1;">${countSelesai}</div>
          </div>
          <div style="margin-top: 14px;">
            <a href="#" onclick="filterBerandaBySummary('selesai'); return false;" style="font-size: 12.5px; font-weight: 500; color: #00AD78; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
              <span>Lihat Surat Selesai</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 2: Perlu Tindakan Table Card (Exact Match) -->
    <div id="beranda-perlu-tindakan-card" class="card" style="border: 1px solid #EAECF0; border-radius: 12px; background: #FFFFFF; box-shadow: 0 1px 3px rgba(16, 24, 40, 0.04); overflow: hidden;">
      
      <!-- Card Header & Toolbar -->
      <div style="padding: 20px 24px; border-bottom: 1px solid #EAECF0; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
        <div>
          <h3 style="font-size: 16px; font-weight: 700; color: #101828; margin: 0 0 4px 0;">Perlu Tindakan</h3>
          <p style="font-size: 13px; color: #667085; margin: 0;">Surat yang membutuhkan tindakan dari Anda</p>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <!-- Search box -->
          <div style="position: relative; width: 440px; max-width: 100%;">
            <input type="text" 
                   id="beranda-table-search"
                   placeholder="Cari No Surat/Judul/Pengirim/Unit Kerja/Keterangan Approver..." 
                   value="${escapeHtml(searchQuery)}"
                   oninput="handleBerandaSearch(this.value)"
                   style="width: 100%; height: 38px; padding: 8px 14px 8px 36px; border-radius: 8px; border: 1px solid #D0D5DD; font-size: 13px; color: #101828; background: #FFFFFF; outline: none; box-sizing: border-box;" />
            <svg style="position: absolute; left: 12px; top: 11px; pointer-events: none;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667085" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>

          <!-- Filter Button -->
          <div style="position: relative;" id="beranda-filter-container">
            <button type="button" 
                    onclick="openFilterDrawer('beranda')" 
                    style="height: 38px; padding: 0 16px; border-radius: 8px; border: 1px solid #D0D5DD; background: ${(filterStatus !== 'all' || filterRole !== 'all') ? '#E8F7F0' : '#FFFFFF'}; color: ${(filterStatus !== 'all' || filterRole !== 'all') ? '#00AD78' : '#344054'}; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05); transition: all 0.15s ease;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              <span>Filter</span>
              ${(filterStatus !== 'all' || filterRole !== 'all') ? '<span class="filter-btn-active-dot"></span>' : ''}
            </button>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background: #F8FAFC; border-bottom: 1px solid #EAECF0;">
              <th style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: #475467; width: 90px; letter-spacing: 0.02em;">Action</th>
              <th style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: #475467; width: 230px; letter-spacing: 0.02em;">Nomor Surat</th>
              <th style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: #475467; letter-spacing: 0.02em;">Judul Surat</th>
              <th style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: #475467; width: 190px; letter-spacing: 0.02em;">Status</th>
              <th style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: #475467; width: 110px; letter-spacing: 0.02em;">Role</th>
              <th style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: #475467; width: 170px; letter-spacing: 0.02em;">Diperbaharui tanggal</th>
              <th style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: #475467; width: 160px; letter-spacing: 0.02em;">Diperbaharui Oleh</th>
            </tr>
          </thead>
          <tbody id="beranda-table-tbody-container">
            ${getBerandaTableRowsHtml()}
          </tbody>
        </table>
      </div>

      <!-- Table Footer (Dense Toggle & Pagination) -->
      <div id="beranda-table-footer-container">
        ${getBerandaTableFooterInnerHtml()}
      </div>

    </div>
  `;
}

// Get all filtered documents for Beranda table
function getBerandaDocuments() {
  if (!appState.data || !appState.data.documents) return [];
  let docs = [...appState.data.documents];
  const persona = getCurrentPersona();
  const roleId = appState.currentRole;

  // Search filter
  const query = (appState.berandaSearchQuery || '').toLowerCase().trim();
  if (query) {
    docs = docs.filter(doc => {
      const matchNo = (doc.nomorSurat || '').toLowerCase().includes(query);
      const matchJudul = (doc.judul || '').toLowerCase().includes(query);
      const matchPengirim = (doc.pengirim || (doc.drafter && doc.drafter.name) || '').toLowerCase().includes(query);
      const matchUnit = (doc.unitKerja || (doc.drafter && doc.drafter.unit) || '').toLowerCase().includes(query);
      const matchApprover = (doc.diperbaharuiOleh || (doc.approver && doc.approver.name) || '').toLowerCase().includes(query);
      const matchStatus = (doc.status || '').toLowerCase().includes(query);
      return matchNo || matchJudul || matchPengirim || matchUnit || matchApprover || matchStatus;
    });
  }

  // Filter based on role when testing as specific step:
  if (roleId === 'reviewer') {
    docs = docs.filter(d => isDocActionableForRole(d, 'reviewer', persona) || (d.role === 'Reviewer') || (d.statusSuratKeluar && d.statusSuratKeluar.includes('Review')));
  } else if (roleId === 'approver') {
    docs = docs.filter(d => isDocActionableForRole(d, 'approver', persona) || (d.role === 'Approval') || (d.statusSuratKeluar && d.statusSuratKeluar.includes('Approval')));
  } else if (roleId === 'drafter') {
    docs = docs.filter(d => isDocRelevantForSuratKeluar(d, persona));
  } else if (roleId === 'admin_stempel') {
    docs = docs.filter(d => isDocActionableForRole(d, 'admin_stempel', persona));
  } else if (roleId === 'admin_penerima' || roleId === 'recipient') {
    docs = docs.filter(d => isDocRelevantForSuratMasuk(d, persona));
  }

  // Status filter
  const filterStatus = appState.berandaFilterStatus || 'all';
  if (filterStatus !== 'all') {
    if (filterStatus === 'tindakan') {
      docs = docs.filter(d => isDocActionableForRole(d, roleId, persona));
    } else if (filterStatus === 'draft') {
      docs = docs.filter(d => (d.status || '').toLowerCase().includes('draft'));
    } else if (filterStatus === 'review') {
      docs = docs.filter(d => (d.status || '').toLowerCase().includes('review'));
    } else if (filterStatus === 'approval') {
      docs = docs.filter(d => (d.status || '').toLowerCase().includes('approval'));
    } else if (filterStatus === 'revisi') {
      docs = docs.filter(d => (d.status || '').toLowerCase().includes('dikembalikan') || (d.status || '').toLowerCase().includes('revisi') || (d.status || '').toLowerCase().includes('returned'));
    } else if (filterStatus === 'selesai') {
      docs = docs.filter(d => (d.status || '').toLowerCase().includes('selesai') || (d.status || '').toLowerCase().includes('completed'));
    } else if (filterStatus === 'proses') {
      docs = docs.filter(d => {
        const s = (d.status || '').toLowerCase();
        return !s.includes('draft') && !s.includes('selesai') && !s.includes('completed');
      });
    } else {
      docs = docs.filter(d => (d.status || '').toLowerCase().includes(filterStatus.toLowerCase()));
    }
  }

  // Role filter
  const filterRole = appState.berandaFilterRole || 'all';
  if (filterRole !== 'all') {
    docs = docs.filter(d => (d.role || d.roleSuratKeluar || '').toLowerCase().includes(filterRole.toLowerCase()));
  }

  return docs;
}

// Get paginated slice of documents
function getBerandaPaginatedDocuments() {
  const allDocs = getBerandaDocuments();
  const total = allDocs.length;
  const rowsPerPage = appState.berandaRowsPerPage || 10;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  let currentPage = appState.berandaCurrentPage || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;
  appState.berandaCurrentPage = currentPage;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedDocs = allDocs.slice(startIndex, startIndex + rowsPerPage);

  return {
    docs: paginatedDocs,
    total,
    totalPages,
    currentPage,
    startIndex: total === 0 ? 0 : startIndex + 1,
    endIndex: Math.min(startIndex + rowsPerPage, total)
  };
}

// Generate rows HTML
function getBerandaTableRowsHtml() {
  const { docs, total } = getBerandaPaginatedDocuments();
  const isDense = !!appState.berandaDense;
  const pad = isDense ? '8px 16px' : '14px 16px';
  const fontSize = isDense ? '13px' : '13.5px';
  const btnSize = isDense ? '28px' : '32px';
  const iconSize = isDense ? 14 : 16;

  if (total === 0) {
    return `
      <tr>
        <td colspan="7" style="padding: 40px 20px; text-align: center; color: #667085;">
          <div style="font-size: 24px; margin-bottom: 8px;">🔍</div>
          <div style="font-size: 14px; font-weight: 600; color: #101828; margin-bottom: 4px;">Tidak Ada Surat Ditemukan</div>
          <div style="font-size: 13px;">Silakan sesuaikan kata kunci pencarian atau reset filter.</div>
          <button type="button" onclick="resetBerandaFilters()" style="margin-top: 12px; background: #E8F7F0; color: #00AD78; border: 1px solid #00AD78; border-radius: 6px; padding: 6px 14px; font-size: 12.5px; font-weight: 600; cursor: pointer;">Reset Filter</button>
        </td>
      </tr>
    `;
  }

  return docs.map(doc => {
    return `
      <tr style="border-bottom: 1px solid #EAECF0; background: #FFFFFF; cursor: pointer; transition: background 0.12s ease;"
          onmouseover="this.style.background='#F8FAFC'"
          onmouseout="this.style.background='#FFFFFF'"
          onclick="${roleId === 'recipient' ? `openDocDetail('${doc.id}')` : `openDetailSuratKeluar('${doc.id}')`}">
        
        <!-- Action Column -->
        <td style="padding: ${pad}; vertical-align: middle;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <button type="button" 
                    title="Lihat Detail Surat"
                    onclick="event.stopPropagation(); ${roleId === 'recipient' ? `openDocDetail('${doc.id}')` : `openDetailSuratKeluar('${doc.id}')`}"
                    style="width: ${btnSize}; height: ${btnSize}; border-radius: 6px; border: 1px solid #D0D5DD; background: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; color: #475467; cursor: pointer; transition: all 0.15s ease;"
                    onmouseover="this.style.borderColor='#00AD78'; this.style.color='#00AD78'"
                    onmouseout="this.style.borderColor='#D0D5DD'; this.style.color='#475467'">
              <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>

            <div style="position: relative; display: inline-block;">
              <button type="button" 
                      title="Log Aktivitas Surat"
                      onclick="event.stopPropagation(); openLogActivityModal('${doc.id}')"
                      style="width: ${btnSize}; height: ${btnSize}; border-radius: 6px; border: 1px solid #D0D5DD; background: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; color: #475467; cursor: pointer; transition: all 0.15s ease;"
                      onmouseover="this.style.borderColor='#00AD78'; this.style.color='#00AD78'"
                      onmouseout="this.style.borderColor='#D0D5DD'; this.style.color='#475467'">
                <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </button>
              ${doc.hasAlert ? `
                <span style="position: absolute; top: -5px; right: -5px; width: 14px; height: 14px; background: #12B76A; color: #FFFFFF; border-radius: 50%; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid #FFFFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.15);" title="Perlu perhatian segera">!</span>
              ` : ''}
            </div>
          </div>
        </td>

        <!-- Nomor Surat -->
        <td style="padding: ${pad}; font-size: ${fontSize}; color: #344054; font-weight: 500; vertical-align: middle;">
          ${escapeHtml(doc.nomorSurat || '-')}
        </td>

        <!-- Judul Surat -->
        <td style="padding: ${pad}; font-size: ${fontSize}; color: #101828; font-weight: 500; vertical-align: middle;">
          ${escapeHtml(doc.judul || 'Tanpa Judul')}
        </td>

        <!-- Status -->
        <td style="padding: ${pad}; vertical-align: middle;">
          ${getBerandaStatusBadgeHtml(doc.status)}
        </td>

        <!-- Role -->
        <td style="padding: ${pad}; font-size: ${fontSize}; color: #344054; vertical-align: middle;">
          ${escapeHtml(doc.role || doc.roleSuratKeluar || 'Drafter')}
        </td>

        <!-- Diperbaharui tanggal -->
        <td style="padding: ${pad}; font-size: ${fontSize}; color: #475467; vertical-align: middle;">
          ${escapeHtml(doc.diperbaharuiTanggal || doc.waktu || '19/09/2024 11:44:41')}
        </td>

        <!-- Diperbaharui Oleh -->
        <td style="padding: ${pad}; font-size: ${fontSize}; color: #101828; font-weight: 500; vertical-align: middle;">
          ${escapeHtml(doc.diperbaharuiOleh || (doc.drafter && doc.drafter.name) || 'Dary Ramadhan')}
        </td>
      </tr>
    `;
  }).join('');
}

// Status badge helper for Beranda
function getBerandaStatusBadgeHtml(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('draft')) {
    return `<span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #F2F4F7; color: #344054;">Draft</span>`;
  }
  if (s.includes('review')) {
    return `<span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #FEF6EE; color: #B54708; border: 1px solid #FEDF89;">Waiting for Review (1/2)</span>`;
  }
  if (s.includes('approval')) {
    return `<span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #F9F5FF; color: #6941C6; border: 1px solid #E9D7FE;">Waiting For Approval</span>`;
  }
  if (s.includes('dikembalikan') || s.includes('revisi') || s.includes('returned')) {
    return `<span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #FEF3F2; color: #B42318; border: 1px solid #FECDCA;">Returned for Revision</span>`;
  }
  if (s.includes('selesai') || s.includes('completed')) {
    return `<span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #ECFDF3; color: #027A48; border: 1px solid #A6F4C5;">Completed</span>`;
  }
  return `<span style="display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; background: #F2F4F7; color: #344054;">${escapeHtml(status || 'Dalam Proses')}</span>`;
}

// Generate footer HTML (Dense Toggle & Pagination)
function getBerandaTableFooterInnerHtml() {
  const { total, totalPages, currentPage, startIndex, endIndex } = getBerandaPaginatedDocuments();
  const isDense = !!appState.berandaDense;
  const rowsPerPage = appState.berandaRowsPerPage || 10;

  return `
    <div style="padding: 12px 24px; border-top: 1px solid #EAECF0; display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; font-size: 13px; color: #344054; flex-wrap: wrap; gap: 12px;">
      
      <!-- Left: Dense toggle -->
      <div style="display: flex; align-items: center; gap: 10px;">
        <label onclick="toggleBerandaDense()" style="display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none;">
          <div style="width: 36px; height: 20px; border-radius: 10px; background: ${isDense ? '#00AD78' : '#CBD5E1'}; position: relative; transition: background 0.2s ease;">
            <div style="width: 16px; height: 16px; border-radius: 50%; background: #FFFFFF; position: absolute; top: 2px; left: ${isDense ? '18px' : '2px'}; transition: left 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.2);"></div>
          </div>
          <span style="font-weight: 500; color: #334155; font-size: 13px;">Dense</span>
        </label>
      </div>

      <!-- Right: Rows per page + Range info + Pagination buttons -->
      <div style="display: flex; align-items: center; gap: 18px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #667085;">Rows per page:</span>
          <select onchange="onBerandaRowsPerPageChange(this.value)"
                  style="border: 1px solid #D0D5DD; border-radius: 6px; padding: 4px 8px; font-size: 12.5px; color: #344054; background: #FFFFFF; cursor: pointer; outline: none;">
            <option value="5" ${rowsPerPage === 5 ? 'selected' : ''}>5</option>
            <option value="10" ${rowsPerPage === 10 ? 'selected' : ''}>10</option>
            <option value="25" ${rowsPerPage === 25 ? 'selected' : ''}>25</option>
            <option value="50" ${rowsPerPage === 50 ? 'selected' : ''}>50</option>
          </select>
        </div>

        <div style="color: #667085; font-weight: 500; min-width: 75px;">
          ${startIndex}-${endIndex} of ${total}
        </div>

        <div style="display: flex; align-items: center; gap: 6px;">
          <button type="button" 
                  class="pagination-arrow-btn"
                  onclick="changeBerandaPage(-1)"
                  ${currentPage <= 1 ? 'disabled style="width: 28px; height: 28px; border-radius: 6px; border: 1px solid #EAECF0; background: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; color: #D0D5DD; cursor: not-allowed;"' : 'style="width: 28px; height: 28px; border-radius: 6px; border: 1px solid #D0D5DD; background: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; color: #475467; cursor: pointer;"'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button type="button" 
                  class="pagination-arrow-btn"
                  onclick="changeBerandaPage(1)"
                  ${currentPage >= totalPages ? 'disabled style="width: 28px; height: 28px; border-radius: 6px; border: 1px solid #EAECF0; background: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; color: #D0D5DD; cursor: not-allowed;"' : 'style="width: 28px; height: 28px; border-radius: 6px; border: 1px solid #D0D5DD; background: #FFFFFF; display: inline-flex; align-items: center; justify-content: center; color: #475467; cursor: pointer;"'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

    </div>
  `;
}

// Handlers for Beranda Table
function handleBerandaSearch(val) {
  appState.berandaSearchQuery = val;
  appState.berandaCurrentPage = 1;
  const tbody = document.getElementById('beranda-table-tbody-container');
  const footer = document.getElementById('beranda-table-footer-container');
  if (tbody && footer) {
    tbody.innerHTML = getBerandaTableRowsHtml();
    footer.innerHTML = getBerandaTableFooterInnerHtml();
  } else {
    reRenderBerandaView();
  }
}

function toggleBerandaDense() {
  appState.berandaDense = !appState.berandaDense;
  reRenderBerandaView();
}

function onBerandaRowsPerPageChange(val) {
  appState.berandaRowsPerPage = parseInt(val, 10);
  appState.berandaCurrentPage = 1;
  reRenderBerandaView();
}

function changeBerandaPage(delta) {
  const allDocs = getBerandaDocuments();
  const totalPages = Math.max(1, Math.ceil(allDocs.length / (appState.berandaRowsPerPage || 10)));
  const targetPage = (appState.berandaCurrentPage || 1) + delta;
  if (targetPage >= 1 && targetPage <= totalPages) {
    appState.berandaCurrentPage = targetPage;
    reRenderBerandaView();
  }
}

function toggleBerandaFilterDropdown(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  appState.isBerandaFilterOpen = !appState.isBerandaFilterOpen;
  reRenderBerandaView();
}

function closeBerandaFilterDropdown() {
  if (appState.isBerandaFilterOpen) {
    appState.isBerandaFilterOpen = false;
    reRenderBerandaView();
  }
}

function setBerandaFilterStatus(status) {
  appState.berandaFilterStatus = status;
  appState.berandaCurrentPage = 1;
  reRenderBerandaView();
}

function setBerandaFilterRole(role) {
  appState.berandaFilterRole = role;
  appState.berandaCurrentPage = 1;
  reRenderBerandaView();
}

function resetBerandaFilters() {
  appState.berandaSearchQuery = '';
  appState.berandaFilterStatus = 'all';
  appState.berandaFilterRole = 'all';
  appState.berandaCurrentPage = 1;
  appState.isBerandaFilterOpen = false;
  reRenderBerandaView();
}

function filterBerandaBySummary(type) {
  if (type === 'tindakan') {
    appState.berandaFilterStatus = 'all';
  } else if (type === 'draft') {
    appState.berandaFilterStatus = 'draft';
  } else if (type === 'proses') {
    appState.berandaFilterStatus = 'proses';
  } else if (type === 'selesai') {
    appState.berandaFilterStatus = 'selesai';
  }
  appState.berandaCurrentPage = 1;
  reRenderBerandaView();
  const el = document.getElementById('beranda-perlu-tindakan-card');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function toggleBerandaPeriodDropdown(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  appState.isBerandaPeriodOpen = !appState.isBerandaPeriodOpen;
  reRenderBerandaView();
}

function setBerandaPeriod(period) {
  appState.berandaPeriod = period;
  appState.isBerandaPeriodOpen = false;
  reRenderBerandaView();
}

function getBerandaPeriodLabel(period) {
  switch (period) {
    case 'today': return 'Hari ini';
    case '7days': return '7 Hari Terakhir';
    case 'month': return 'Bulan ini';
    case 'year': return 'Tahun ini';
    case 'all': return 'Semua Waktu';
    default: return 'Hari ini';
  }
}

function reRenderBerandaView() {
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'beranda') {
    contentArea.innerHTML = renderBerandaView();
  }
}

// Legacy helper compatibility functions
function getActionableTasks(perms = getUserPermissions()) {
  if (!appState.data || !appState.data.documents) return [];
  return appState.data.documents.filter(d => (d.status || '').toLowerCase().includes('review') || (d.status || '').toLowerCase().includes('approval'));
}

function getMyCreatedLetters(perms = getUserPermissions()) {
  if (!appState.data || !appState.data.documents) return [];
  return appState.data.documents.filter(d => (d.role || d.roleSuratKeluar || '').toLowerCase().includes('drafter'));
}

function getWorkflowPosition(doc) {
  return `<span class="badge" style="background: #F2F4F7; color: #344054; border: 1px solid #D0D5DD; font-weight: 500;">Dalam Alur</span>`;
}

function getDocStatusBadgeHtml(status) {
  return getBerandaStatusBadgeHtml(status);
}

// Helper: Collect latest timeline activities across all docs
function getLatestActivities(limit = 6) {
  if (!appState.data || !appState.data.documents) return [];
  const list = [];
  appState.data.documents.forEach(doc => {
    (doc.timeline || []).forEach(item => {
      list.push({
        ...item,
        docId: doc.id,
        docNomor: doc.nomorSurat,
        docJudul: doc.judul
      });
    });
  });
  return list.slice(-limit).reverse();
}

function getActionBtnLabel(doc, roleId) {
  if (roleId === 'reviewer' && doc.status === 'Menunggu Review') return 'Telaah Dokumen';
  if (roleId === 'approver' && doc.status === 'Menunggu Approval') return 'Proses Persetujuan';
  if (roleId === 'admin_stempel' && doc.status === 'Perlu Verifikasi Stempel') return 'Verifikasi Stempel';
  if (roleId === 'recipient' && doc.status === 'Menunggu Tindak Lanjut') return 'Beri Tindak Lanjut';
  return 'Lihat Detail';
}

// Helper: Dense mode toggle
function toggleDenseMode() {
  appState.isDense = !appState.isDense;
  renderApp();
}

function onRowsPerPageChange(val) {
  appState.rowsPerPage = parseInt(val, 10);
  renderApp();
}

function openDocAuditModal(docId) {
  openDocDetailModal(docId);
  switchDocTab('audit');
}

// Log Activity Modal (Exact match with Reference media_1792428905725_d6e33d20.png)
function getDocLogActivity(doc) {
  if (doc && Array.isArray(doc.logActivity) && doc.logActivity.length > 0) {
    return doc.logActivity;
  }

  const approverName = doc && doc.approver ? doc.approver.name : 'Yetty Endarwati';
  const reviewerName = doc && doc.reviewer ? doc.reviewer.name : 'Abdul Muhyi Marakarma';
  const drafterName = doc && doc.drafter ? doc.drafter.name : 'Sulan sari';

  // Return activities matching reference screenshot media_1792428905725_d6e33d20.png
  return [
    {
      waktu: '20 Mei 2026, 21.34',
      status: 'Completed',
      judul: 'Surat disetujui Approver dan siap dikirim ke tujuan',
      oleh: `${approverName} - SVP Digitalisasi & Data Science`
    },
    {
      waktu: '19 Mei 2026, 21.34',
      status: 'Waiting for Approval',
      judul: 'Reviewer menyetujui surat dan meneruskan ke Approver',
      oleh: `${reviewerName} - VP Enterprise Resource Planning`
    },
    {
      waktu: '19 Mei 2026, 21.32',
      status: 'Waiting for Review',
      judul: 'Drafter mengirim surat ke Reviewer',
      oleh: `${drafterName} - Jr Technician Digitalisasi Corp Services`
    },
    {
      waktu: '19 Mei 2026, 21.30',
      status: 'Draft',
      judul: 'Surat baru dibuat dan disimpan sebagai draft',
      oleh: `${drafterName} - Jr Technician Digitalisasi Corp Services`
    }
  ];
}

function openLogActivityModal(docId) {
  const doc = (appState.data && appState.data.documents.find(d => d.id === docId)) || { id: docId, nomorSurat: '07344/A/TI/P14/ET/2026' };
  const activities = getDocLogActivity(doc);

  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="log-activity-modal-box">
        <div class="log-activity-modal-header">
          <h3>Log Activity</h3>
        </div>

        <div class="log-activity-modal-body">
          <div class="log-activity-timeline">
            ${activities.map((item, idx) => {
              const isLast = idx === activities.length - 1;

              let badgeClass = 'log-badge-draft';
              let dotClass = 'log-dot-gray';

              if (item.status === 'Completed') {
                badgeClass = 'log-badge-completed';
                dotClass = 'log-dot-green';
              } else if (item.status === 'Waiting for Approval' || item.status === 'Waiting for Review') {
                badgeClass = 'log-badge-waiting';
                dotClass = 'log-dot-blue';
              } else if (item.status === 'Draft') {
                badgeClass = 'log-badge-draft';
                dotClass = 'log-dot-gray';
              }

              return `
                <div class="log-activity-item ${isLast ? 'is-last' : ''}">
                  <div class="log-activity-left">
                    <span class="log-activity-dot ${dotClass}"></span>
                    ${!isLast ? '<span class="log-activity-line"></span>' : ''}
                  </div>
                  <div class="log-activity-right">
                    <div class="log-activity-meta">
                      <span class="log-activity-time">${escapeHtml(item.waktu)} - </span>
                      <span class="log-activity-badge ${badgeClass}">${escapeHtml(item.status)}</span>
                    </div>
                    <div class="log-activity-title">${escapeHtml(item.judul)}</div>
                    <div class="log-activity-actor">Oleh: ${escapeHtml(item.oleh)}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="log-activity-modal-footer">
          <button type="button" class="btn-log-activity-close" onclick="closeModal()">
            Close
          </button>
        </div>
      </div>
    </div>
  `;
}

// 2. Surat Masuk View (Exact match with Reference Screenshot + Personalized by User)
function renderSuratMasukView() {
  const docs = appState.data.documents || [];
  const persona = getCurrentPersona();

  // 1. Personalized Mail Filtering: Filter letters where current persona is involved
  const personalizedDocs = docs.filter(doc => isDocRelevantForPersona(doc, persona));

  const isFilterActive = (
    (appState.suratMasukFilterPrioritas && appState.suratMasukFilterPrioritas !== 'all') ||
    (appState.suratMasukFilterSifat && appState.suratMasukFilterSifat !== 'all') ||
    (appState.suratMasukFilterTindakLanjut && appState.suratMasukFilterTindakLanjut !== 'all')
  );

  // 2. Search query & filter drawer filters
  let filteredDocs = personalizedDocs.filter(doc => {
    if (appState.searchQuery) {
      const q = appState.searchQuery.toLowerCase();
      const match = (
        (doc.nomorSurat && doc.nomorSurat.toLowerCase().includes(q)) ||
        (doc.judul && doc.judul.toLowerCase().includes(q)) ||
        (doc.pengirim && doc.pengirim.toLowerCase().includes(q)) ||
        (doc.unitKerja && doc.unitKerja.toLowerCase().includes(q)) ||
        (doc.keterangan && doc.keterangan.toLowerCase().includes(q))
      );
      if (!match) return false;
    }
    if (appState.suratMasukFilterPrioritas && appState.suratMasukFilterPrioritas !== 'all') {
      if ((doc.prioritas || 'Biasa').toLowerCase() !== appState.suratMasukFilterPrioritas.toLowerCase()) return false;
    }
    if (appState.suratMasukFilterSifat && appState.suratMasukFilterSifat !== 'all') {
      if ((doc.sifat || 'Terbatas').toLowerCase() !== appState.suratMasukFilterSifat.toLowerCase()) return false;
    }
    if (appState.suratMasukFilterTindakLanjut && appState.suratMasukFilterTindakLanjut !== 'all') {
      if ((doc.statusTindakLanjut || '').toLowerCase() !== appState.suratMasukFilterTindakLanjut.toLowerCase()) return false;
    }
    return true;
  });

  return `
    <!-- Page Header (Exact match with reference + personalized indicator) -->
    <div style="margin-bottom: 22px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 12px;">
      <div>
        <h2 style="font-size: 26px; font-weight: 700; color: #26323F; letter-spacing: -0.3px; margin: 0;">Surat Masuk</h2>
        <div style="font-size: 13.5px; color: #647789; margin-top: 4px;">
          Surat Masuk &bull; Kotak Masuk: <strong style="color: #00AD78;">${persona.name}</strong> (${persona.roleLabel})
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="badge badge-success" style="padding: 6px 14px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          ${filteredDocs.length} Naskah Terpersonalisasi
        </span>
        ${persona.id === 'admin_dof' ? `
          <button class="btn btn-secondary btn-sm" onclick="toggleAdminViewAll()">
            ${appState.adminViewAllMode ? 'Mode: Semua Naskah Korporat (Audit)' : 'Mode: Naskah Saya Saja'}
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Search & Filter Card (Exact match with reference) -->
    <div class="search-filter-card">
      <div class="search-field-wrapper">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input 
          type="text" 
          class="search-field-input" 
          placeholder="Cari No Surat/Judul/Pengirim/Unit Kerja/Keterangan Approver..." 
          value="${appState.searchQuery}" 
          oninput="onSearchInput(this.value)"
        >
      </div>
      <button class="filter-btn-outline" onclick="openFilterDrawer('surat-masuk')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"/>
          <line x1="4" y1="10" x2="4" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="3"/>
          <line x1="20" y1="21" x2="20" y2="16"/>
          <line x1="20" y1="12" x2="20" y2="3"/>
          <line x1="1" y1="14" x2="7" y2="14"/>
          <line x1="9" y1="8" x2="15" y2="8"/>
          <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
        <span>Filter</span>
        ${isFilterActive ? '<span class="filter-btn-active-dot"></span>' : ''}
      </button>
    </div>

    <!-- Main Table Container Card -->
    <div class="card">
      ${filteredDocs.length === 0 ? `
        <div class="empty-state" style="padding: 48px 20px; text-align: center;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: #EFF8FF; color: #175CD3; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 14px;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </svg>
          </div>
          <h4 style="font-size: 16px; font-weight: 700; color: #1E293B; margin: 0 0 6px 0;">Kotak Masuk Masih Kosong</h4>
          <p style="font-size: 13.5px; color: #64748B; max-width: 460px; margin: 0 auto 18px auto; line-height: 1.5;">
            ${appState.searchQuery 
              ? 'Tidak ada naskah yang sesuai dengan kata kunci pencarian.' 
              : `Belum ada surat masuk untuk akun <strong>${persona.name}</strong> (${persona.roleLabel}). Surat yang telah selesai diapprove akan otomatis diteruskan ke kotak masuk penerima.`}
          </p>
          <div style="display: flex; justify-content: center; gap: 10px;">
            <button class="btn btn-secondary btn-sm" onclick="navigate('surat-keluar')">Periksa Surat Keluar &rarr;</button>
            <button class="btn btn-secondary btn-sm" onclick="resetDataDemo()">${getIcon('history', 14)} Pulihkan Data Demo</button>
          </div>
        </div>
      ` : `
        <div class="table-container">
          <table class="data-table ${appState.isDense ? 'table-dense' : ''}">
            <thead>
              <tr>
                <th style="width: 72px;">Action</th>
                <th style="min-width: 190px;">No Surat</th>
                <th style="min-width: 200px;">Judul</th>
                <th style="min-width: 230px;">Pengirim</th>
                <th style="min-width: 190px;">Unit Kerja</th>
                <th style="min-width: 120px;">Tanggal Tercipta</th>
                <th style="min-width: 110px;">Prioritas</th>
                <th style="min-width: 110px;">Sifat</th>
                <th style="min-width: 190px;">Keterangan</th>
                <th style="min-width: 140px; text-align: center;">Status Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody>
              ${filteredDocs.map(doc => {
                const prioritasClass = doc.prioritas === 'Sangat Segera' 
                  ? 'badge-prioritas-sangat-segera' 
                  : (doc.prioritas === 'Segera' ? 'badge-prioritas-segera' : 'badge-prioritas-biasa');

                let statusHtml = '<span style="color: #647789;">-</span>';
                if (doc.statusTindakLanjut === 'Open') {
                  statusHtml = `<span class="badge-status-open">Open</span>`;
                } else if (doc.statusTindakLanjut === 'In Progress') {
                  statusHtml = `<span class="badge-status-inprogress">In Progress</span>`;
                } else if (doc.statusTindakLanjut === 'Closed') {
                  statusHtml = `<span class="badge-status-closed">Closed</span>`;
                }

                return `
                  <tr style="cursor: pointer;" onclick="openDocDetail('${doc.id}')">
                    <!-- Action Column: Eye and History icons side by side -->
                    <td onclick="event.stopPropagation()">
                      <div class="action-icons-cell">
                        <button class="table-icon-btn" title="Buka Detail & Tindakan" onclick="openDocDetail('${doc.id}')">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button class="table-icon-btn" title="Log Activity" onclick="openLogActivityModal('${doc.id}')">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 14 14"/>
                          </svg>
                        </button>
                      </div>
                    </td>

                    <!-- No Surat Column with green exclamation alert badge -->
                    <td>
                      <div class="no-surat-cell-wrapper">
                        ${doc.hasAlert ? '<div class="alert-circle-green">!</div>' : ''}
                        <span style="font-weight: 500; color: #26323F;">${doc.nomorSurat}</span>
                      </div>
                    </td>

                    <!-- Judul -->
                    <td style="font-weight: 500; color: #26323F;">${doc.judul}</td>

                    <!-- Pengirim -->
                    <td style="color: #26323F; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${doc.pengirim}">
                      ${doc.pengirim}
                    </td>

                    <!-- Unit Kerja -->
                    <td style="color: #26323F;">${doc.unitKerja}</td>

                    <!-- Tanggal Tercipta -->
                    <td style="color: #26323F;">${doc.tanggalTercipta}</td>

                    <!-- Prioritas Pill -->
                    <td>
                      <span class="${prioritasClass}">${doc.prioritas}</span>
                    </td>

                    <!-- Sifat -->
                    <td style="color: #26323F;">${doc.sifat}</td>

                    <!-- Keterangan -->
                    <td style="color: #26323F; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${doc.keterangan}">
                      ${doc.keterangan}
                    </td>

                    <!-- Status Tindak Lanjut -->
                    <td style="text-align: center;">
                      ${statusHtml}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Table Footer matching Reference (Dense switch on left, Rows per page & Pagination on right) -->
        <div class="table-footer-bar">
          <div class="dense-switch-label" onclick="toggleDenseMode()">
            <div class="custom-switch ${appState.isDense ? '' : 'switch-off'}">
              <div class="custom-switch-knob"></div>
            </div>
            <span>Dense</span>
          </div>

          <div class="pagination-wrapper">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span>Rows per page:</span>
              <select class="rows-per-page-select" onchange="onRowsPerPageChange(this.value)">
                <option value="10" ${appState.rowsPerPage === 10 ? 'selected' : ''}>10</option>
                <option value="25" ${appState.rowsPerPage === 25 ? 'selected' : ''}>25</option>
                <option value="50" ${appState.rowsPerPage === 50 ? 'selected' : ''}>50</option>
              </select>
            </div>

            <div>1-${Math.min(filteredDocs.length, appState.rowsPerPage)} of ${filteredDocs.length}</div>

            <div style="display: flex; align-items: center; gap: 4px;">
              <button class="pagination-arrow-btn" disabled style="opacity: 0.4;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button class="pagination-arrow-btn" onclick="showToast('Halaman berikutnya')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

// Alias for backwards compatibility
const renderPesanMasukView = renderSuratMasukView;

// 3. Surat Keluar View (Exact Match with Reference media_1792432357924_56021ee6.png & media_1792432366990_8248c525.png)
function renderSuratKeluarView() {
  const allDocs = appState.data.documents || [];
  const persona = getCurrentPersona();
  const query = (appState.suratKeluarSearchQuery || '').toLowerCase().trim();

  // Role-aware Filtering
  const relevantDocs = allDocs.filter(doc => isDocRelevantForSuratKeluar(doc, persona));

  const isFilterActive = (
    (appState.suratKeluarFilterStatus && appState.suratKeluarFilterStatus !== 'all') ||
    (appState.suratKeluarFilterSifat && appState.suratKeluarFilterSifat !== 'all') ||
    (appState.suratKeluarFilterJenis && appState.suratKeluarFilterJenis !== 'all')
  );

  const filtered = relevantDocs.filter(doc => {
    if (query) {
      const match = (
        (doc.nomorSurat && doc.nomorSurat.toLowerCase().includes(query)) ||
        (doc.judul && doc.judul.toLowerCase().includes(query)) ||
        (doc.approverName && doc.approverName.toLowerCase().includes(query)) ||
        (doc.unitKerja && doc.unitKerja.toLowerCase().includes(query)) ||
        (doc.statusSuratKeluar && doc.statusSuratKeluar.toLowerCase().includes(query)) ||
        (doc.diperbaharuiOleh && doc.diperbaharuiOleh.toLowerCase().includes(query))
      );
      if (!match) return false;
    }
    if (appState.suratKeluarFilterStatus && appState.suratKeluarFilterStatus !== 'all') {
      const s = (doc.statusSuratKeluar || doc.status || '').toLowerCase();
      const f = appState.suratKeluarFilterStatus.toLowerCase();
      if (!s.includes(f)) return false;
    }
    if (appState.suratKeluarFilterSifat && appState.suratKeluarFilterSifat !== 'all') {
      if ((doc.sifat || 'Terbatas').toLowerCase() !== appState.suratKeluarFilterSifat.toLowerCase()) return false;
    }
    if (appState.suratKeluarFilterJenis && appState.suratKeluarFilterJenis !== 'all') {
      const j = (doc.jenisSurat || '').toLowerCase();
      const f = appState.suratKeluarFilterJenis.toLowerCase();
      if (!j.includes(f)) return false;
    }
    return true;
  });

  const totalItems = filtered.length;
  const rowsPerPage = appState.suratKeluarRowsPerPage || 10;
  const maxPage = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const currentPage = Math.min(appState.suratKeluarCurrentPage || 1, maxPage);
  const startIdx = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, totalItems);
  const pageItems = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const isDense = !!appState.suratKeluarDense;

  // Role-specific empty state copy
  let emptyTitle = 'Belum Ada Surat Keluar';
  let emptyDesc = 'Data surat keluar dalam mode kosong. Silakan buat naskah baru untuk menguji alur secara berjenjang dari awal.';
  if (persona.id === 'drafter') {
    emptyTitle = 'Belum Ada Surat yang Dibuat (Drafter)';
    emptyDesc = 'Anda belum memiliki surat keluar yang aktif. Klik "+ Buat Surat Baru" untuk membuat naskah dinas dan mengajukannya ke Reviewer.';
  } else if (persona.id === 'reviewer') {
    emptyTitle = 'Belum Ada Surat Masuk untuk Ditelaah (Reviewer)';
    emptyDesc = 'Kotak review Anda kosong. Beralih ke peran Drafter untuk membuat surat baru dan mengajukannya ke Reviewer (Siti Rahma).';
  } else if (persona.id === 'approver') {
    emptyTitle = 'Belum Ada Surat Menunggu Persetujuan (Approver)';
    emptyDesc = 'Belum ada surat yang diteruskan oleh Reviewer. Surat akan muncul di sini setelah disetujui pada tahapan telaah Reviewer.';
  } else if (persona.id === 'recipient') {
    emptyTitle = 'Area Surat Masuk untuk Penerima Surat';
    emptyDesc = 'Sebagai Penerima Surat (Dewi Lestari), surat dinas resmi yang telah disetujui dan berstempel digital masuk ke menu Surat Masuk.';
  }

  return `
    <!-- Header with Title & Action Buttons (Exact Match) -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
      <div>
        <h1 style="font-size: 24px; font-weight: 700; color: #1E293B; margin: 0 0 4px 0;">Surat Keluar</h1>
        <div style="font-size: 13px; color: #64748B;">Surat Keluar &bull; Role Aktif: <strong style="color: #00AD78;">${persona.roleLabel}</strong> (${persona.name})</div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <button class="btn btn-primary" onclick="openBuatSuratBaru()" style="display: inline-flex; align-items: center; gap: 8px; background-color: #00AD78; border-color: #00AD78; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 13.5px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); cursor: pointer;">
          ${getIcon('plus', 16)} Buat Surat Baru
        </button>
      </div>
    </div>

    <!-- Search & Filter Bar (Exact Match) -->
    <div class="klasifikasi-filter-bar" style="margin-bottom: 16px;">
      <div class="klasifikasi-search-box">
        <div class="klasifikasi-search-icon">
          ${getIcon('search', 18)}
        </div>
        <input 
          type="text" 
          class="klasifikasi-search-input" 
          placeholder="Cari No Surat/Judul/Approver..." 
          value="${escapeHtml(appState.suratKeluarSearchQuery || '')}"
          oninput="handleSuratKeluarSearch(this.value)"
        >
      </div>

      <button class="klasifikasi-filter-btn" type="button" onclick="openFilterDrawer('surat-keluar')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"/>
          <line x1="4" y1="10" x2="4" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="3"/>
          <line x1="20" y1="21" x2="20" y2="16"/>
          <line x1="20" y1="12" x2="20" y2="3"/>
          <line x1="1" y1="14" x2="7" y2="14"/>
          <line x1="9" y1="8" x2="15" y2="8"/>
          <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
        <span>Filter</span>
        ${isFilterActive ? '<span class="filter-btn-active-dot"></span>' : ''}
      </button>
    </div>

    <!-- 11-Column Table Card (Exact Match) -->
    <div class="tipe-surat-table-card" style="border-radius: 8px; border: 1px solid #E2E8F0; background: #FFFFFF; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
      <div style="overflow-x: auto; width: 100%;">
        <table class="tipe-surat-table ${isDense ? 'dense-table' : ''}" style="width: 100%; min-width: 1300px; border-collapse: collapse;">
          <thead>
            <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 12.5px; color: #475569; text-align: left;">
              <th style="width: 75px; padding: 12px 14px;">Action</th>
              <th style="min-width: 200px; padding: 12px 14px;">No Surat</th>
              <th style="min-width: 210px; padding: 12px 14px;">Judul Surat</th>
              <th style="min-width: 160px; padding: 12px 14px;">Approver</th>
              <th style="min-width: 190px; padding: 12px 14px;">Unit Kerja</th>
              <th style="min-width: 130px; padding: 12px 14px;">Tanggal Tercipta</th>
              <th style="width: 110px; padding: 12px 14px;">Sifat</th>
              <th style="width: 165px; padding: 12px 14px;">Status</th>
              <th style="width: 100px; padding: 12px 14px;">Role</th>
              <th style="min-width: 165px; padding: 12px 14px;">Diperbaharui tanggal</th>
              <th style="min-width: 150px; padding: 12px 14px;">Diperbaharui Oleh</th>
            </tr>
          </thead>
          <tbody>
            ${pageItems.length === 0 ? `
              <tr>
                <td colspan="11" style="text-align: center; padding: 60px 20px;">
                  <div style="max-width: 480px; margin: 0 auto; text-align: center;">
                    <div style="width: 52px; height: 52px; border-radius: 50%; background: #F0FDF4; color: #00AD78; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 14px;">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <h3 style="font-size: 16.5px; font-weight: 700; color: #1E293B; margin: 0 0 6px 0;">${emptyTitle}</h3>
                    <p style="font-size: 13.5px; color: #64748B; margin: 0 0 20px 0; line-height: 1.5;">${query ? 'Tidak ada surat keluar yang sesuai dengan kata kunci pencarian.' : emptyDesc}</p>
                    <div style="display: flex; justify-content: center; gap: 10px;">
                      <button class="btn btn-primary" onclick="openBuatSuratBaru()" style="display: inline-flex; align-items: center; gap: 6px; background-color: #00AD78; border-color: #00AD78; padding: 9px 18px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">
                        ${getIcon('plus', 15)} Buat Surat Baru (Drafter)
                      </button>
                      <button class="btn btn-secondary" onclick="resetDataDemo()" style="display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">
                        ${getIcon('history', 15)} Pulihkan Data Demo
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ` : pageItems.map(doc => {
              const sifat = doc.sifat || 'Terbatas';
              const sifatBadge = sifat === 'Rahasia' 
                ? `<span class="badge-sifat-rahasia">Rahasia</span>`
                : `<span class="badge-sifat-terbatas">${escapeHtml(sifat)}</span>`;

              const status = doc.statusSuratKeluar || doc.status || 'Draft';
              let statusBadgeClass = 'badge-sk-draft';
              if (status.includes('Waiting for Review') || status.includes('Review')) {
                statusBadgeClass = 'badge-sk-review';
              } else if (status.includes('Approval')) {
                statusBadgeClass = 'badge-sk-approval';
              } else if (status.includes('Upload')) {
                statusBadgeClass = 'badge-sk-upload';
              } else if (status.includes('Declined')) {
                statusBadgeClass = 'badge-sk-declined';
              } else if (status.includes('Completed')) {
                statusBadgeClass = 'badge-sk-completed';
              }

              return `
                <tr style="border-bottom: 1px solid #F1F5F9; transition: background 0.15s ease; cursor: pointer;" onclick="openDetailSuratKeluar('${doc.id}')">
                  <td style="padding: 12px 14px;" onclick="event.stopPropagation()">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <button class="action-icon-btn" onclick="openDetailSuratKeluar('${doc.id}')" title="Buka Detail Surat" style="color: #64748B;">
                        ${getIcon('eye', 17)}
                      </button>
                      <button class="action-icon-btn" onclick="openLogActivityModal('${doc.id}')" title="Log Activity" style="color: #64748B;">
                        ${getIcon('history', 17)}
                      </button>
                    </div>
                  </td>
                  <td style="padding: 12px 14px; font-weight: 500; color: #1E293B;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      ${doc.hasAlert ? `
                        <span style="display: inline-flex; align-items: center; justify-content: center; width: 17px; height: 17px; border-radius: 50%; background-color: #00AD78; color: #FFFFFF; font-size: 11px; font-weight: 700; flex-shrink: 0;" title="Pemberitahuan aktif">!</span>
                      ` : ''}
                      <span style="font-family: monospace; font-size: 12.5px;">${escapeHtml(doc.nomorSurat || '-')}</span>
                    </div>
                  </td>
                  <td style="padding: 12px 14px; font-weight: 600; color: #1E293B;">
                    ${escapeHtml(doc.judul || '-')}
                  </td>
                  <td style="padding: 12px 14px; color: #334155;">
                    ${escapeHtml(doc.approverName || (doc.approver && doc.approver.name) || '-')}
                  </td>
                  <td style="padding: 12px 14px; color: #334155;">
                    ${escapeHtml(doc.unitKerja || '-')}
                  </td>
                  <td style="padding: 12px 14px; color: #64748B;">
                    ${escapeHtml(doc.tanggalTercipta || '-')}
                  </td>
                  <td style="padding: 12px 14px;">
                    ${sifatBadge}
                  </td>
                  <td style="padding: 12px 14px;">
                    <span class="${statusBadgeClass}">${escapeHtml(status)}</span>
                  </td>
                  <td style="padding: 12px 14px; color: #334155; font-weight: 500;">
                    ${escapeHtml(doc.roleSuratKeluar || 'Drafter')}
                  </td>
                  <td style="padding: 12px 14px; color: #64748B; font-size: 12px;">
                    ${escapeHtml(doc.diperbaharuiTanggal || '-')}
                  </td>
                  <td style="padding: 12px 14px; color: #334155;">
                    ${escapeHtml(doc.diperbaharuiOleh || '-')}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pagination & Dense Footer (Exact Match) -->
      <div class="tipe-surat-pagination-footer" style="padding: 12px 20px; border-top: 1px solid #E2E8F0; background: #FFFFFF;">
        <!-- Dense Toggle Switch -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="position: relative; display: inline-block; width: 38px; height: 20px; cursor: pointer; margin: 0;">
            <input type="checkbox" ${isDense ? 'checked' : ''} onchange="toggleSuratKeluarDense(this.checked)" style="opacity: 0; width: 0; height: 0; position: absolute;">
            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isDense ? '#00AD78' : '#CBD5E1'}; transition: .25s ease; border-radius: 20px;">
              <span style="position: absolute; content: ''; height: 16px; width: 16px; left: ${isDense ? '20px' : '2px'}; bottom: 2px; background-color: white; transition: .25s ease; border-radius: 50%;"></span>
            </span>
          </label>
          <span style="font-weight: 500; color: #334155; font-size: 13px;">Dense</span>
        </div>

        <!-- Pagination Controls -->
        <div style="display: flex; align-items: center; gap: 18px; font-size: 13px; color: #475569;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>Rows per page:</span>
            <select onchange="changeSuratKeluarRowsPerPage(this.value)" style="border: 1px solid #E2E8F0; border-radius: 4px; padding: 4px 8px; font-size: 13px; color: #334155; background: #fff; cursor: pointer;">
              <option value="10" ${rowsPerPage === 10 ? 'selected' : ''}>10</option>
              <option value="25" ${rowsPerPage === 25 ? 'selected' : ''}>25</option>
              <option value="50" ${rowsPerPage === 50 ? 'selected' : ''}>50</option>
            </select>
          </div>
          <div>${totalItems > 0 ? `${startIdx}-${endIdx}` : '0-0'} of ${totalItems}</div>
          <div style="display: flex; gap: 4px;">
            <button class="pagination-arrow-btn" ${currentPage <= 1 ? 'disabled' : ''} onclick="changeSuratKeluarPage(${currentPage - 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="pagination-arrow-btn" ${endIdx >= totalItems ? 'disabled' : ''} onclick="changeSuratKeluarPage(${currentPage + 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Surat Keluar Handlers
function handleSuratKeluarSearch(val) {
  appState.suratKeluarSearchQuery = val;
  appState.suratKeluarCurrentPage = 1;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'surat-keluar' || appState.currentPage === 'daftar-surat')) {
    contentArea.innerHTML = renderSuratKeluarView();
  }
}

function toggleSuratKeluarDense(val) {
  appState.suratKeluarDense = !!val;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'surat-keluar' || appState.currentPage === 'daftar-surat')) {
    contentArea.innerHTML = renderSuratKeluarView();
  }
}

function changeSuratKeluarRowsPerPage(val) {
  appState.suratKeluarRowsPerPage = parseInt(val, 10) || 10;
  appState.suratKeluarCurrentPage = 1;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'surat-keluar' || appState.currentPage === 'daftar-surat')) {
    contentArea.innerHTML = renderSuratKeluarView();
  }
}

function changeSuratKeluarPage(page) {
  appState.suratKeluarCurrentPage = page;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'surat-keluar' || appState.currentPage === 'daftar-surat')) {
    contentArea.innerHTML = renderSuratKeluarView();
  }
}

function openDetailSuratKeluar(docId) {
  appState.selectedDocId = docId || 'doc-01';
  navigate('detail-surat-keluar');
}

// Helper to open Buat Surat Baru with fresh Drafter state
function openBuatSuratBaru() {
  appState.currentRole = 'drafter';
  appState.selectedDocId = null;
  navigate('buat-surat-baru');
}

// Live update paper preview title as user types
function updatePaperPreviewTitle(val) {
  const text = (val || '').trim();
  const previewEl = document.getElementById('paper-preview-judul');
  const accordionEl = document.getElementById('accordion-preview-judul');
  if (previewEl) previewEl.textContent = text || 'Draft Naskah Dinas Baru';
  if (accordionEl) accordionEl.textContent = text || '(Draft Naskah Baru)';
}

// 3.B Buat Surat Baru / Detail Surat Drafter & Reviewer (Exact Match with Reference media_1792432392384_d57f98c0.png & media_1792433652323_8dc085a1.png)
function renderBuatSuratBaruView() {
  const isCreatingNew = (appState.currentPage === 'buat-surat-baru');
  const isAccordionOpen = appState.isCreateSuratAccordionOpen !== false;
  const isPerluTindakLanjut = !!appState.isCreateSuratPerluTindakLanjut;
  const isLampiranDense = !!appState.createSuratLampiranDense;

  // If viewing an existing document in detail-surat-keluar
  let doc = null;
  if (!isCreatingNew) {
    doc = appState.data && appState.data.documents && (
      appState.data.documents.find(d => d.id === appState.selectedDocId) || appState.data.documents[0]
    );
    if (!doc) {
      return `
        <div style="padding: 60px 20px; text-align: center; background: #fff; border-radius: 8px; margin: 30px auto; max-width: 500px; border: 1px solid #E2E8F0;">
          <h3 style="font-size: 18px; color: #1E293B; margin-bottom: 8px;">Dokumen Tidak Ditemukan</h3>
          <p style="color: #64748B; font-size: 13.5px; margin-bottom: 20px;">Dokumen yang dipilih tidak ditemukan atau data surat telah dikosongkan.</p>
          <button class="btn btn-primary" onclick="navigate('surat-keluar')">Kembali ke Surat Keluar</button>
        </div>
      `;
    }
  }

  // Determine role & actionability for review/approval
  const isReviewerActionable = !isCreatingNew && (appState.currentRole === 'reviewer' || appState.currentRole === 'users' || appState.currentRole === 'all') && (
    (doc?.statusSuratKeluar && (doc.statusSuratKeluar.includes('Review') || doc.statusSuratKeluar.includes('Waiting for Review'))) ||
    doc?.status === 'Menunggu Review' || (doc?.status && doc.status.includes('Review'))
  );
  const isApproverActionable = !isCreatingNew && (appState.currentRole === 'approver' || appState.currentRole === 'users' || appState.currentRole === 'all') && (
    (doc?.statusSuratKeluar && (doc.statusSuratKeluar.includes('Approval') || doc.statusSuratKeluar === 'Waiting For Approval')) ||
    doc?.status === 'Menunggu Approval' || (doc?.status && doc.status.includes('Approval'))
  );

  // Top Bar Title & Status Badge
  const pageTitle = isCreatingNew ? 'Buat Surat' : 'Detail Surat';
  const breadcrumbText = isCreatingNew ? 'Buat Surat' : 'Detail Surat';

  let statusBadgeHtml = `<span class="badge-sk-draft" style="font-size: 12px; padding: 3px 12px;">Draft</span>`;
  if (!isCreatingNew && doc) {
    const status = doc.statusSuratKeluar || doc.status || 'Draft';
    if (status.includes('Waiting for Review') || status.includes('Review')) {
      statusBadgeHtml = `<span class="badge-sk-review" style="font-size: 12px; padding: 3px 12px;">${escapeHtml(status)}</span>`;
    } else if (status.includes('Approval') || status === 'Waiting For Approval') {
      statusBadgeHtml = `<span class="badge-sk-approval" style="font-size: 12px; padding: 3px 12px;">${escapeHtml(status)}</span>`;
    } else if (status.includes('Completed') || status === 'Disetujui / Selesai' || status === 'Selesai') {
      statusBadgeHtml = `<span class="badge-sk-completed" style="font-size: 12px; padding: 3px 12px;">Completed</span>`;
    } else if (status.includes('Declined') || status === 'Ditolak') {
      statusBadgeHtml = `<span class="badge-sk-declined" style="font-size: 12px; padding: 3px 12px;">Declined</span>`;
    } else {
      statusBadgeHtml = `<span class="badge-sk-draft" style="font-size: 12px; padding: 3px 12px;">${escapeHtml(status)}</span>`;
    }
  }

  // Form values
  const judulVal = isCreatingNew ? '' : (doc?.judul || '');
  const jenisVal = isCreatingNew ? 'Surat Antar Unit Kerja' : (doc?.jenisSurat || 'Surat Antar Unit Kerja');
  const templatVal = isCreatingNew ? 'Surat Internal' : (doc?.template || 'Surat Internal');
  const klasifikasiVal = isCreatingNew ? 'BL.01.04 (pilar Hukum dan Tata Kelola)' : (doc?.klasifikasi || 'BL.01.04 (pilar Hukum dan Tata Kelola)');
  const sifatVal = isCreatingNew ? 'Biasa' : (doc?.sifat || 'Terbatas');
  const kecepatanVal = isCreatingNew ? 'Biasa' : (doc?.kecepatanTanggapan || 'Biasa');

  const reviewerDisplay = isCreatingNew ? 'Siti Rahma' : ((doc?.reviewer && doc.reviewer.name) || 'Siti Rahma');
  const approverDisplay = isCreatingNew ? 'Yetty Endarwati' : ((doc?.approver && doc.approver.name) || doc?.approverName || 'Yetty Endarwati');
  const customTujuan = appState.customRecipient;
  if (!appState.tujuanChips || !appState.tujuanChips.length) {
    if (customTujuan) {
      appState.tujuanChips = [{
        id: customTujuan.id || 'custom',
        name: customTujuan.name,
        role: customTujuan.role || customTujuan.unit || '',
        label: `${customTujuan.id ? customTujuan.id + ' - ' : ''}${customTujuan.name}${customTujuan.role ? ' - ' + customTujuan.role : ''}`
      }];
    } else {
      appState.tujuanChips = [{
        id: '1250016',
        name: 'Robby Setiabudi',
        role: 'Direktur Supply Chain',
        label: '1250016 - Robby Setiabudi - Direktur Supply Chain'
      }];
    }
  }

  const tujuanDisplay = isCreatingNew 
    ? (appState.tujuanChips.map(c => c.name).join(', ')) 
    : ((doc?.penerima && doc.penerima.name) || 'Dewi Lestari');

  const accordionDisplayTitle = isCreatingNew ? '(Draft Naskah Baru)' : (doc?.judul || '-');
  const accordionDisplayDate = isCreatingNew 
    ? `Hari ini, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` 
    : (doc?.diperbaharuiTanggal || doc?.tanggalTercipta || 'Selasa, 27 April 2026, 11:41');

  // Paper sheet data
  const paperNomor = isCreatingNew ? '[Akan diterbitkan otomatis setelah disetujui]' : (doc?.nomorSurat || '07344/A/TI/P14/ET/2026');
  const paperSifat = sifatVal;
  const paperJudul = isCreatingNew ? (judulVal || 'Draft Naskah Dinas Baru') : (doc?.judul || 'Rebuild Digital Office');
  const paperDate = isCreatingNew 
    ? `Jakarta, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` 
    : `Jakarta, 27 April 2026`;
  const paperKepada = appState.tujuanChips.length 
    ? appState.tujuanChips.map(c => c.name).join(', ')
    : (tujuanDisplay || 'Dewi Lestari');
  const paperKepadaUnit = appState.tujuanChips.length
    ? (appState.tujuanChips[0].role || 'Departemen Anggaran & Perbendaharaan')
    : (customTujuan ? customTujuan.unit : 'Departemen Anggaran & Perbendaharaan');

  // Sign-off block
  let paperSignOffHtml = '';
  if (isCreatingNew) {
    paperSignOffHtml = `
      <div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px dashed #E2E8F0;">
        <div style="text-align: center; width: 200px;">
          <div style="font-size: 11.5px; color: #64748B;">Konseptor (Drafter):</div>
          <div style="font-size: 11px; color: #D97706; font-weight: 600; margin: 8px 0;">[Konsep Naskah Dinas]</div>
          <div style="font-weight: 700; font-size: 13px; color: #1E293B;">Muhammad Ridha Fadli</div>
          <div style="font-size: 11px; color: #64748B;">Staff Operasional & Perencanaan</div>
        </div>
        <div style="text-align: center; width: 200px;">
          <div style="font-size: 11.5px; color: #64748B;">Reviewer Ditunjuk:</div>
          <div style="font-size: 11px; color: #94A3B8; font-weight: 600; margin: 8px 0;">[Menunggu Pengajuan]</div>
          <div style="font-weight: 700; font-size: 13px; color: #1E293B;">${escapeHtml(reviewerDisplay)}</div>
          <div style="font-size: 11px; color: #64748B;">Senior Officer Rantai Pasok</div>
        </div>
        <div style="text-align: center; width: 200px;">
          <div style="font-size: 11.5px; color: #64748B;">Approver Ditunjuk:</div>
          <div style="font-size: 11px; color: #94A3B8; font-weight: 600; margin: 8px 0;">[Menunggu Persetujuan]</div>
          <div style="font-weight: 700; font-size: 13px; color: #1E293B;">${escapeHtml(approverDisplay)}</div>
          <div style="font-size: 11px; color: #64748B;">SVP Digitalisasi & Data Science</div>
        </div>
      </div>
    `;
  } else {
    const isCompleted = (doc?.statusSuratKeluar === 'Completed' || doc?.status === 'Disetujui / Selesai');
    paperSignOffHtml = `
      <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
        <div style="width: 280px; text-align: left; font-size: 13px;">
          <div>PT PUPUK INDONESIA (PERSERO)</div>
          <div style="font-weight: 700; margin-bottom: 12px;">SVP Digitalisasi & Data Science</div>
          
          <div style="border: 1px dashed ${isCompleted ? '#00AD78' : '#F59E0B'}; background: ${isCompleted ? '#F0FDF4' : '#FFFBEB'}; border-radius: 8px; padding: 12px; margin-bottom: 12px; text-align: center;">
            <div style="color: ${isCompleted ? '#00AD78' : '#D97706'}; font-weight: 700; font-size: 11px; letter-spacing: 0.5px;">
              ${isCompleted ? 'TERVERIFIKASI DIGITAL' : (doc?.statusSuratKeluar || 'Waiting for Review (1/2)')}
            </div>
            <div style="color: ${isCompleted ? '#166534' : '#92400E'}; font-size: 10.5px; margin-top: 2px;">
              ${isCompleted ? 'SENTRA BSrE Electronic CA Certified' : 'Sedang dalam alur telaah & persetujuan'}
            </div>
          </div>

          <div style="font-weight: 700; text-decoration: underline; color: #101828;">${escapeHtml(approverDisplay)}</div>
          <div style="font-size: 11.5px; color: #64748B;">NIP. 88120491</div>
        </div>
      </div>
    `;
  }

  return `
    <!-- Fixed Top Bar (Exact Match with Reference media_1792432392384_d57f98c0.png) -->
    <div class="create-surat-fixed-top-bar">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 32px 10px 32px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748B; margin-bottom: 4px;">
            <a href="#" onclick="navigate('surat-keluar'); return false;" style="color: #64748B; text-decoration: none; font-weight: 500;">
              Surat Keluar
            </a>
            <span>&bull;</span>
            <span style="color: #1E293B; font-weight: 600;">${breadcrumbText}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <h1 style="font-size: 22px; font-weight: 700; color: #1E293B; margin: 0; line-height: 1.2;">${pageTitle}</h1>
            ${statusBadgeHtml}
          </div>
        </div>

        <!-- Right Header Controls: Testing as & Header Icons -->
        <div style="display: flex; align-items: center; gap: 16px;">
          <div class="role-switcher-container" style="margin: 0;">
            <span class="role-switcher-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Testing as:
            </span>
            <select class="role-select" onchange="onRoleChange(this.value)">
              <optgroup label="Alur Surat (Step-by-Step)">
                <option value="drafter" ${appState.currentRole === 'drafter' ? 'selected' : ''}>Drafter (Muhammad Ridha Fadli)</option>
                <option value="reviewer" ${appState.currentRole === 'reviewer' ? 'selected' : ''}>Reviewer (Siti Rahma)</option>
                <option value="approver" ${appState.currentRole === 'approver' ? 'selected' : ''}>Approver (Yetty Endarwati)</option>
                <option value="recipient" ${appState.currentRole === 'recipient' ? 'selected' : ''}>Penerima Surat (Dewi Lestari)</option>
                <option value="users" ${appState.currentRole === 'users' ? 'selected' : ''}>Users (Semua Role Terpadu)</option>
              </optgroup>
              <optgroup label="Verifikator & Administrator">
                <option value="admin_stempel" ${appState.currentRole === 'admin_stempel' ? 'selected' : ''}>Admin Stempel (Farah Nabila)</option>
                <option value="admin_penerima" ${appState.currentRole === 'admin_penerima' ? 'selected' : ''}>Admin Penerima Dokumen (Agus Setiawan)</option>
                <option value="admin_dof" ${appState.currentRole === 'admin_dof' ? 'selected' : ''}>Admin DOF (Rian Pratama)</option>
              </optgroup>
            </select>
          </div>

          <div class="header-actions" style="gap: 10px;">
            <button class="table-icon-btn" title="Notifikasi" onclick="showToast('Pemberitahuan aktif.')">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#647789" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
            <button class="table-icon-btn" title="Pengaturan" onclick="showToast('Pengaturan preferensi antarmuka.')">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#647789" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
            <div style="width: 34px; height: 34px; border-radius: 50%; background: #E5EAEE; display: flex; align-items: center; justify-content: center; cursor: pointer;" title="Profil Pengguna">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#94A3B3"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation (Isi Surat & Hierarki) -->
      <div style="display: flex; gap: 24px; padding: 0 32px; border-top: 1px solid #F1F5F9;">
        <button style="background: none; border: none; padding: 11px 4px; font-size: 14px; font-weight: 600; color: #00AD78; border-bottom: 2px solid #00AD78; cursor: pointer;">
          Isi Surat
        </button>
        <button onclick="showToast('Tab Hierarki dibuka.')" style="background: none; border: none; padding: 11px 4px; font-size: 14px; font-weight: 500; color: #64748B; cursor: pointer;">
          Hierarki
        </button>
      </div>
    </div>

    <!-- Scrollable Body Content -->
    <div class="create-surat-scroll-content">

    <!-- Collapsible Accordion: Informasi Surat & Penerima/Approval (Exact Match) -->
    <div class="card" style="padding: 0; border: 1px solid #E2E8F0; border-radius: 8px; background: #FFFFFF; margin-bottom: 24px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
      <!-- Accordion Header Bar -->
      <div onclick="toggleCreateSuratAccordion()" style="display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; cursor: pointer; user-select: none; background: #FFFFFF;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span id="accordion-preview-judul" style="font-size: 16px; font-weight: 700; color: #1E293B;">${escapeHtml(accordionDisplayTitle)}</span>
            <span class="badge-sifat-terbatas">${escapeHtml(sifatVal)}</span>
          </div>
          <div style="font-size: 12.5px; color: #64748B; margin-top: 4px;">${escapeHtml(accordionDisplayDate)}</div>
        </div>
        <button type="button" style="background: none; border: none; color: #64748B; cursor: pointer; padding: 4px; display: flex; align-items: center;">
          ${isAccordionOpen ? `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          ` : `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          `}
        </button>
      </div>

      <!-- Accordion Content Form Body -->
      ${isAccordionOpen ? `
        <div style="padding: 0 24px 24px 24px; border-top: 1px solid #F1F5F9;">
          <div class="create-surat-grid" style="margin-top: 20px;">
            <!-- Left Column: Informasi Surat -->
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <label class="form-field-label" style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 6px; display: block;">Jenis <span style="color: #F04438;">*</span></label>
                <select id="create-surat-jenis" class="form-field-input" style="width: 100%; height: 42px; border-radius: 8px; border: 1px solid #D0D5DD; padding: 0 12px; font-size: 13.5px; color: #1E293B; background: #fff;">
                  <option ${jenisVal === 'Surat Antar Unit Kerja' ? 'selected' : ''}>Surat Antar Unit Kerja</option>
                  <option ${jenisVal === 'Nota Dinas' ? 'selected' : ''}>Nota Dinas</option>
                  <option ${jenisVal === 'Surat Dinas' ? 'selected' : ''}>Surat Dinas</option>
                  <option ${jenisVal === 'Surat Keputusan' ? 'selected' : ''}>Surat Keputusan</option>
                </select>
              </div>

              <div>
                <label class="form-field-label" style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 6px; display: block;">Templat <span style="color: #F04438;">*</span></label>
                <select id="create-surat-templat" class="form-field-input" style="width: 100%; height: 42px; border-radius: 8px; border: 1px solid #D0D5DD; padding: 0 12px; font-size: 13.5px; color: #1E293B; background: #fff;">
                  <option ${templatVal === 'Surat Internal' ? 'selected' : ''}>Surat Internal</option>
                  <option ${templatVal.includes('Nota Dinas') ? 'selected' : ''}>Format Standar Nota Dinas Pupuk Indonesia</option>
                  <option ${templatVal.includes('Direksi') ? 'selected' : ''}>Surat Keputusan Direksi</option>
                </select>
              </div>

              <div>
                <label class="form-field-label" style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 6px; display: block;">Klasifikasi <span style="color: #F04438;">*</span></label>
                <select id="create-surat-klasifikasi" class="form-field-input" style="width: 100%; height: 42px; border-radius: 8px; border: 1px solid #D0D5DD; padding: 0 12px; font-size: 13.5px; color: #1E293B; background: #fff;">
                  <option ${klasifikasiVal.includes('BL.01.04') ? 'selected' : ''}>BL.01.04 (pilar Hukum dan Tata Kelola)</option>
                  <option ${klasifikasiVal.includes('TI.01.01') ? 'selected' : ''}>TI.01.01 (Tata Kelola Teknologi Informasi)</option>
                  <option ${klasifikasiVal.includes('KU.02.01') ? 'selected' : ''}>KU.02.01 (Perbendaharaan & Anggaran)</option>
                </select>
              </div>

              <div>
                <label class="form-field-label" style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 6px; display: block;">Sifat <span style="color: #F04438;">*</span></label>
                <select id="create-surat-sifat" class="form-field-input" style="width: 100%; height: 42px; border-radius: 8px; border: 1px solid #D0D5DD; padding: 0 12px; font-size: 13.5px; color: #1E293B; background: #fff;">
                  <option ${sifatVal === 'Terbatas' ? 'selected' : ''}>Terbatas</option>
                  <option ${sifatVal === 'Biasa' ? 'selected' : ''}>Biasa</option>
                  <option ${sifatVal === 'Rahasia' ? 'selected' : ''}>Rahasia</option>
                  <option ${sifatVal === 'Sangat Rahasia' ? 'selected' : ''}>Sangat Rahasia</option>
                </select>
              </div>

              <div>
                <label class="form-field-label" style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 6px; display: block;">Kecepatan Tanggapan <span style="color: #F04438;">*</span></label>
                <select id="create-surat-kecepatan" class="form-field-input" style="width: 100%; height: 42px; border-radius: 8px; border: 1px solid #D0D5DD; padding: 0 12px; font-size: 13.5px; color: #1E293B; background: #fff;">
                  <option ${kecepatanVal === 'Biasa' ? 'selected' : ''}>Biasa</option>
                  <option ${kecepatanVal === 'Segera' ? 'selected' : ''}>Segera</option>
                  <option ${kecepatanVal === 'Amat Segera' ? 'selected' : ''}>Amat Segera</option>
                </select>
              </div>

              <div>
                <label class="form-field-label" style="font-size: 13px; font-weight: 600; color: #344054; margin-bottom: 6px; display: block;">Judul <span style="color: #F04438;">*</span></label>
                <input type="text" id="create-surat-judul" class="form-field-input" value="${escapeHtml(judulVal)}" placeholder="Masukkan judul naskah dinas..." oninput="updatePaperPreviewTitle(this.value)" style="width: 100%; height: 42px; border-radius: 8px; border: 1px solid #D0D5DD; padding: 0 12px; font-size: 13.5px; color: #1E293B;">
              </div>
            </div>

            <!-- Right Column: Penerima & Approval (Matching Design) -->
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div>
                <fieldset class="group-fieldset form-recipient-fieldset">
                  <legend>Reviewer <span style="color: #F04438;">*</span></legend>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span class="group-user-chip">
                      <span>${escapeHtml(reviewerDisplay)}</span>
                      <span class="group-user-chip-remove" onclick="showToast('Reviewer ditetapkan: ${escapeHtml(reviewerDisplay)}')">✓</span>
                    </span>
                  </div>
                </fieldset>
              </div>

              <div>
                <fieldset class="group-fieldset form-recipient-fieldset">
                  <legend>Approver <span style="color: #F04438;">*</span></legend>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span class="group-user-chip">
                      <span>1210106 - Agung Mahendra - AVP Pupuk Industri</span>
                      <span class="group-user-chip-remove" onclick="showToast('Ubah pilihan Approver')">✕</span>
                    </span>
                  </div>
                </fieldset>
              </div>

              <!-- Field Tujuan with Group Icon & Live Dropdown Matching Screenshot 1 & 2 -->
              <div style="position: relative;">
                <fieldset class="group-fieldset form-recipient-fieldset" onclick="focusTujuanSearchInput(event)">
                  <legend>Tujuan <span style="color: #F04438;">*</span></legend>
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <!-- Group Icon Button that triggers Modal Pilih Group -->
                    <button type="button" class="btn-group-icon-tujuan" onclick="event.stopPropagation(); openPilihGroupModal();" title="Pilih Group dari Manajemen Group">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </button>

                    <!-- Chips List -->
                    ${appState.tujuanChips.map((chip, idx) => `
                      <span class="group-user-chip">
                        <span>${escapeHtml(chip.label || (chip.name + (chip.role ? ' - ' + chip.role : '')))}</span>
                        <span class="group-user-chip-remove" onclick="event.stopPropagation(); removeTujuanChip(${idx});">✕</span>
                      </span>
                    `).join('')}

                    <!-- Search Input inside field -->
                    <input 
                      type="text" 
                      id="tujuan-quick-search-input" 
                      class="tujuan-input-search"
                      placeholder="${appState.tujuanChips.length ? '' : 'Cari nama, NIK, atau jabatan'}"
                      value="${escapeHtml(appState.tujuanQuickQuery || '')}"
                      onfocus="setTujuanQuickDropdown(true)"
                      oninput="onSearchTujuanQuick(this.value)"
                    />
                  </div>
                </fieldset>

                <!-- Dropdown Candidates List (Matching Screenshot 1) -->
                ${appState.isTujuanDropdownOpen ? `
                  <div class="tujuan-quick-dropdown" id="tujuan-quick-dropdown-list">
                    ${getFilteredTujuanCandidates().map(c => `
                      <div class="tujuan-quick-item" onclick="selectTujuanCandidate('${escapeHtml(c.nik)}')">
                        <strong>${escapeHtml(c.nama)} - ${escapeHtml(c.nik)}</strong>
                        <span>${escapeHtml(c.jabatan)}</span>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>

              <div>
                <fieldset class="group-fieldset form-recipient-fieldset" style="cursor: pointer;" onclick="showToast('Pilih penerima tembusan (CC)')">
                  <legend>CC (Internal)</legend>
                  <div style="display: flex; align-items: center; gap: 6px; color: #94A3B8; font-size: 13.5px; padding: 2px 0;">
                    <span style="font-size: 16px; font-weight: 600;">+</span> Tambah Penerima CC
                  </div>
                </fieldset>
              </div>

              <!-- Toggle Card: Perlu Tindak Lanjut -->
              <div class="sk-toggle-box">
                <div>
                  <div class="sk-toggle-title">Perlu Tindak Lanjut</div>
                  <div class="sk-toggle-desc">Penerima surat harus memberikan respon tindak lanjut atas surat yang dikirimkan.</div>
                </div>
                <div>
                  <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer; margin: 0;">
                    <input type="checkbox" ${isPerluTindakLanjut ? 'checked' : ''} onchange="toggleCreateSuratPerluTindakLanjut(this.checked)" style="opacity: 0; width: 0; height: 0; position: absolute;">
                    <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isPerluTindakLanjut ? '#00AD78' : '#CBD5E1'}; transition: .25s ease; border-radius: 24px;">
                      <span style="position: absolute; content: ''; height: 18px; width: 18px; left: ${isPerluTindakLanjut ? '23px' : '3px'}; bottom: 3px; background-color: white; transition: .25s ease; border-radius: 50%;"></span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Official Paper Document Canvas Preview (Exact Match) -->
    <div class="paper-sheet-container">
      <div class="a4-paper-sheet">
        <!-- Letterhead Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #101828; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="background: linear-gradient(135deg, #00AD78 0%, #166534 100%); width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 800; font-size: 20px;">
              PI
            </div>
            <div>
              <div style="font-size: 16px; font-weight: 800; color: #101828; letter-spacing: 0.5px;">PT PUPUK INDONESIA (PERSERO)</div>
              <div style="font-size: 11.5px; color: #64748B;">HOLDING COMPANY &bull; SENTRA DIGITAL OFFICE</div>
            </div>
          </div>
          <div style="text-align: right; font-size: 11px; color: #64748B; line-height: 1.4;">
            Jl. Wijaya II No. 5, Kebayoran Baru<br>
            Jakarta Selatan 12160 &bull; www.pupuk-indonesia.com
          </div>
        </div>

        <!-- Letter Metadata Table -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; font-size: 13.5px;">
          <div style="display: grid; grid-template-columns: 80px 12px 1fr; gap: 6px;">
            <span style="color: #64748B;">Nomor</span><span>:</span><span style="font-weight: 600; font-family: monospace;">${escapeHtml(paperNomor)}</span>
            <span style="color: #64748B;">Sifat</span><span>:</span><span style="font-weight: 600;">${escapeHtml(paperSifat)}</span>
            <span style="color: #64748B;">Lampiran</span><span>:</span><span>1 (satu) Berkas</span>
            <span style="color: #64748B;">Perihal</span><span>:</span><span id="paper-preview-judul" style="font-weight: 700;">${escapeHtml(paperJudul)}</span>
          </div>
          <div style="text-align: right; color: #334155; font-weight: 500;">
            ${escapeHtml(paperDate)}
          </div>
        </div>

        <!-- Recipient -->
        <div style="margin-bottom: 24px; font-size: 13.5px; line-height: 1.5;">
          <div>Kepada Yth.</div>
          <div style="font-weight: 700; color: #101828;">Sdr. ${escapeHtml(paperKepada)}</div>
          <div>${escapeHtml(paperKepadaUnit)}</div>
          <div>di Tempat</div>
        </div>

        <!-- Letter Body Content -->
        <div style="font-size: 13.5px; line-height: 1.7; color: #1E293B; text-align: justify; margin-bottom: 32px;">
          <p style="margin-bottom: 12px;">Dengan hormat,</p>
          <p style="margin-bottom: 12px;">
            ${isCreatingNew ? `
              Sehubungan dengan kebutuhan operasional naskah dinas di lingkungan PT Pupuk Indonesia (Persero), bersama ini kami ajukan permohonan penerbitan surat dinas resmi untuk dapat ditelaah dan disetujui sesuai dengan tata kelola administrasi korporat yang berlaku.
            ` : (doc?.ringkasan || `
              Sehubungan dengan program akselerasi transformasi digital dan standardisasi tata kelola administrasi perkantoran terintegrasi di lingkungan Pupuk Indonesia Grup, bersama ini kami sampaikan rencana pelaksanaan implementasi arsitektur SENTRA Digital Office (DoF) versi pembaruan (Rebuild Digital Office).
            `)}
          </p>
          <p style="margin-bottom: 8px;">
            Adapun pokok-pokok ruang lingkup pelaksanaan adalah sebagai berikut:
          </p>
          <ol style="padding-left: 20px; margin-bottom: 12px;">
            <li>Penyelarasan alur naskah dinas elektronik dan verifikasi persetujuan multi-entitas holding.</li>
            <li>Peningkatan kecepatan alur disposisi serta kepatuhan Service Level Agreement (SLA) tindak lanjut antar unit kerja.</li>
            <li>Penerapan kontrol Role-Based Access Control (RBAC) presisi dan mitigasi keterbukaan informasi surat.</li>
          </ol>
          <p style="margin-bottom: 0;">
            Demikian naskah dinas ini kami sampaikan untuk menjadi perhatian dan dapat segera ditindaklanjuti sesuai dengan ketentuan yang berlaku. Atas perhatian dan kerja samanya diucapkan terima kasih.
          </p>
        </div>

        <!-- Dynamic Sign-off Block -->
        ${paperSignOffHtml}
      </div>
    </div>

    <!-- Lampiran Section Card (Exact Match) -->
    <div class="card" style="padding: 0; border: 1px solid #E2E8F0; border-radius: 8px; background: #FFFFFF; margin-bottom: 40px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 18px 24px; border-bottom: 1px solid #E2E8F0;">
        <h3 style="font-size: 16px; font-weight: 700; color: #1E293B; margin: 0;">Lampiran</h3>
        <button class="btn-upload-file" onclick="showToast('Pilih file lampiran untuk diunggah')">
          ${getIcon('plus', 15)} Upload File
        </button>
      </div>

      <div style="overflow-x: auto; width: 100%;">
        <table class="tipe-surat-table ${isLampiranDense ? 'dense-table' : ''}" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 12.5px; color: #475569; text-align: left;">
              <th style="padding: 12px 20px;">Nama File</th>
              <th style="padding: 12px 20px;">Diunggah Tanggal</th>
              <th style="padding: 12px 20px;">Diunggah Oleh</th>
              <th style="padding: 12px 20px; width: 120px;">Ukuran</th>
              <th style="padding: 12px 20px; width: 80px; text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 12px 20px; font-weight: 600; color: #1E293B;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F04438" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span>Surat Pengantar.pdf</span>
                </div>
              </td>
              <td style="padding: 12px 20px; color: #64748B;">
                ${isCreatingNew ? 'Hari ini' : (doc?.tanggalTercipta || 'Senin, 26 April 2026')}
              </td>
              <td style="padding: 12px 20px; color: #334155;">
                Muhammad Ridha Fadli
              </td>
              <td style="padding: 12px 20px; color: #64748B; font-size: 12.5px;">
                1.8 MB
              </td>
              <td style="padding: 12px 20px; text-align: center;">
                <button class="action-icon-btn" onclick="showToast('Mengunduh Surat Pengantar.pdf')" title="Unduh File" style="color: #64748B;">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Lampiran Dense & Pagination Footer -->
      <div class="tipe-surat-pagination-footer" style="padding: 12px 20px; border-top: 1px solid #E2E8F0; background: #FFFFFF;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="position: relative; display: inline-block; width: 38px; height: 20px; cursor: pointer; margin: 0;">
            <input type="checkbox" ${isLampiranDense ? 'checked' : ''} onchange="toggleCreateSuratLampiranDense(this.checked)" style="opacity: 0; width: 0; height: 0; position: absolute;">
            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isLampiranDense ? '#00AD78' : '#CBD5E1'}; transition: .25s ease; border-radius: 20px;">
              <span style="position: absolute; content: ''; height: 16px; width: 16px; left: ${isLampiranDense ? '20px' : '2px'}; bottom: 2px; background-color: white; transition: .25s ease; border-radius: 50%;"></span>
            </span>
          </label>
          <span style="font-weight: 500; color: #334155; font-size: 13px;">Dense</span>
        </div>

        <div style="display: flex; align-items: center; gap: 18px; font-size: 13px; color: #475569;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>Rows per page:</span>
            <select style="border: 1px solid #E2E8F0; border-radius: 4px; padding: 4px 8px; font-size: 13px; color: #334155; background: #fff;">
              <option value="5" selected>5</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>1-1 of 1</div>
          <div style="display: flex; gap: 4px;">
            <button class="pagination-arrow-btn" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="pagination-arrow-btn" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    </div> <!-- End create-surat-scroll-content -->

    <!-- Fixed Bottom Bar: strictly differentiated between Buat Surat Baru vs Detail Review/Approval -->
    <div class="create-surat-fixed-bottom-bar" style="${(isReviewerActionable || isApproverActionable) ? 'justify-content: flex-end; gap: 12px;' : ''}">
      ${isCreatingNew ? `
        <!-- Drafter Creation Action Buttons (Always Clean Draft Mode in buat-surat-baru) -->
        <div>
          <button type="button" class="btn" onclick="navigate('surat-keluar')" style="padding: 10px 20px; font-weight: 600; color: #344054; background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; cursor: pointer;">
            Cancel
          </button>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <button type="button" class="btn" onclick="saveDraftSurat()" style="padding: 10px 20px; font-weight: 600; color: #344054; background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; cursor: pointer;">
            Save as Draft
          </button>
          <button type="button" class="btn btn-primary" onclick="submitCreateSurat()" style="padding: 10px 24px; font-weight: 600; background: #00AD78; border-color: #00AD78; border-radius: 8px; color: #FFFFFF; cursor: pointer;">
            Submit
          </button>
        </div>
      ` : (isReviewerActionable || isApproverActionable) ? `
        <!-- Reviewer & Approver Action Buttons (Save Change, Cancel, Declined, Approve) -->
        <button type="button" class="btn btn-sk-savechange" onclick="saveReviewerChanges('${doc?.id}')">
          Save Change
        </button>
        <button type="button" class="btn btn-sk-cancel" onclick="openBatalSuratModal('${doc?.id}')">
          Cancel
        </button>
        <button type="button" class="btn btn-sk-declined" onclick="openDeclineSuratModal('${doc?.id}')">
          Declined
        </button>
        <button type="button" class="btn btn-sk-approve" onclick="openApproveSuratModal('${doc?.id}')">
          Approve
        </button>
      ` : `
        <!-- Read-only / Completed / Non-actionable document footer -->
        <div>
          <button type="button" class="btn" onclick="navigate('surat-keluar')" style="padding: 10px 20px; font-weight: 600; color: #344054; background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; cursor: pointer;">
            &larr; Kembali ke Surat Keluar
          </button>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          ${(doc?.statusSuratKeluar === 'Completed' || doc?.status === 'Disetujui / Selesai') ? `
            <span style="display: inline-flex; align-items: center; gap: 6px; color: #00AD78; font-weight: 600; font-size: 13.5px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Naskah Telah Disahkan Resmi
            </span>
            <button type="button" class="btn btn-secondary" onclick="showToast('Mengunduh naskah dinas resmi PDF...')" style="padding: 10px 18px; font-weight: 600; border-radius: 8px; cursor: pointer;">
              Unduh PDF
            </button>
          ` : (doc?.statusSuratKeluar === 'Declined' || doc?.status === 'Ditolak') ? `
            <span style="display: inline-flex; align-items: center; gap: 6px; color: #D92D20; font-weight: 600; font-size: 13.5px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              Pengajuan Naskah Telah Ditolak
            </span>
          ` : `
            <span style="font-size: 13px; color: #64748B;">
              Status: <strong>${escapeHtml(doc?.statusSuratKeluar || doc?.status || '-')}</strong>
            </span>
          `}
        </div>
      `}
    </div>
  `;
}

// Buat Surat Baru & Reviewer/Approver Handlers
function toggleCreateSuratAccordion() {
  appState.isCreateSuratAccordionOpen = !appState.isCreateSuratAccordionOpen;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'buat-surat-baru' || appState.currentPage === 'detail-surat-keluar')) {
    contentArea.innerHTML = renderBuatSuratBaruView();
  }
}

function toggleCreateSuratPerluTindakLanjut(val) {
  appState.isCreateSuratPerluTindakLanjut = !!val;
  showToast(val ? 'Penerima surat wajib memberikan respon tindak lanjut.' : 'Tindak lanjut dinonaktifkan untuk surat ini.');
}

function toggleCreateSuratLampiranDense(val) {
  appState.createSuratLampiranDense = !!val;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'buat-surat-baru' || appState.currentPage === 'detail-surat-keluar')) {
    contentArea.innerHTML = renderBuatSuratBaruView();
  }
}

async function saveDraftSurat() {
  const judulEl = document.getElementById('create-surat-judul');
  const jenisEl = document.getElementById('create-surat-jenis');
  const templatEl = document.getElementById('create-surat-templat');
  const klasifikasiEl = document.getElementById('create-surat-klasifikasi');
  const sifatEl = document.getElementById('create-surat-sifat');
  const kecepatanEl = document.getElementById('create-surat-kecepatan');

  const judul = (judulEl && judulEl.value.trim()) || 'Draft Naskah Baru (Tanpa Judul)';
  const jenis = (jenisEl && jenisEl.value) || 'Surat Antar Unit Kerja';
  const templat = (templatEl && templatEl.value) || 'Surat Internal';
  const klasifikasi = (klasifikasiEl && klasifikasiEl.value) || 'BL.01.04 (pilar Hukum dan Tata Kelola)';
  const sifat = (sifatEl && sifatEl.value) || 'Biasa';
  const kecepatan = (kecepatanEl && kecepatanEl.value) || 'Biasa';
  const perluTindakLanjut = !!appState.isCreateSuratPerluTindakLanjut;

  const now = new Date();
  const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  const nowStr = `${dateFormatted} ${timeFormatted}`;

  const docId = 'doc-' + Date.now().toString().slice(-5);

  const draftDoc = {
    id: docId,
    nomorSurat: '[Draft Belum Bernomor]',
    judul: judul,
    pengirim: 'Muhammad Ridha Fadli',
    unitKerja: 'Komp. Digitalisasi & Data Science',
    tanggalTercipta: dateFormatted,
    prioritas: kecepatan === 'Amat Segera' ? 'Sangat Segera' : (kecepatan === 'Segera' ? 'Segera' : 'Biasa'),
    sifat: sifat,
    keterangan: 'Draft Surat Baru',
    statusTindakLanjut: 'Open',
    jenisSurat: jenis,
    template: templat,
    klasifikasi: klasifikasi,
    drafter: {
      id: 'drafter',
      name: 'Muhammad Ridha Fadli',
      unit: 'Komp. Digitalisasi & Data Science'
    },
    reviewer: {
      id: 'reviewer',
      name: 'Siti Rahma',
      title: 'Senior Officer Rantai Pasok'
    },
    approver: {
      id: 'approver',
      name: 'Yetty Endarwati',
      title: 'SVP Digitalisasi & Data Science'
    },
    penerima: (appState.tujuanChips && appState.tujuanChips.length) ? {
      id: appState.tujuanChips[0].id || 'recipient-custom',
      name: appState.tujuanChips.map(c => c.name).join(', '),
      unit: appState.tujuanChips[0].role || 'Tujuan Naskah Dinas',
      isGroup: Boolean(appState.tujuanChips.some(c => c.isGroup))
    } : (appState.customRecipient ? {
      id: appState.customRecipient.id || 'recipient-custom',
      name: appState.customRecipient.name,
      unit: appState.customRecipient.role || appState.customRecipient.unit || 'Grup Penerima',
      isGroup: !!appState.customRecipient.isGroup
    } : {
      id: 'recipient',
      name: 'Dewi Lestari',
      unit: 'Departemen Anggaran & Perbendaharaan'
    }),
    cc: ['Tim Digitalisasi'],
    perluTindakLanjut: perluTindakLanjut,
    tindakLanjutNote: '',
    tindakLanjutStatus: perluTindakLanjut ? 'Draft' : 'Tidak Diperlukan',
    perluStempel: false,
    stempelStatus: 'Tidak Diperlukan',
    stempelDetail: null,
    kecepatanTanggapan: kecepatan,
    status: 'Draft',
    statusBadge: 'secondary',
    statusSuratKeluar: 'Draft',
    roleSuratKeluar: 'Drafter',
    currentAssigneeRole: 'drafter',
    currentAssigneeName: 'Muhammad Ridha Fadli',
    ringkasan: 'Draft konsep naskah dinas baru.',
    lampiran: [
      { name: 'Surat Pengantar.pdf', size: '1.8 MB', tanggal: `${dateFormatted}, ${timeFormatted}`, oleh: 'Muhammad Ridha Fadli' }
    ],
    timeline: [
      {
        waktu: `${nowStr} WIB`,
        aktor: 'Muhammad Ridha Fadli',
        peran: 'Drafter',
        aksi: 'Simpan Draft',
        catatan: 'Draft naskah dinas disimpan oleh Drafter.'
      }
    ],
    approverName: 'Yetty Endarwati',
    diperbaharuiTanggal: nowStr,
    diperbaharuiOleh: 'Muhammad Ridha Fadli'
  };

  if (!appState.data.documents) appState.data.documents = [];
  appState.data.documents.unshift(draftDoc);
  appState.isDataKosongMode = false;
  appState.selectedDocId = draftDoc.id;
  saveLocalCopy(appState.data);

  try {
    await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draftDoc)
    });
  } catch (e) {
    console.warn('Saved draft locally');
  }

  showToast('Draft naskah dinas berhasil disimpan.');
  setTimeout(() => {
    navigate('surat-keluar');
  }, 700);
}

async function submitCreateSurat() {
  const judulEl = document.getElementById('create-surat-judul');
  const jenisEl = document.getElementById('create-surat-jenis');
  const templatEl = document.getElementById('create-surat-templat');
  const klasifikasiEl = document.getElementById('create-surat-klasifikasi');
  const sifatEl = document.getElementById('create-surat-sifat');
  const kecepatanEl = document.getElementById('create-surat-kecepatan');

  const judul = (judulEl && judulEl.value.trim()) || 'Naskah Dinas Tanpa Judul';
  const jenis = (jenisEl && jenisEl.value) || 'Surat Antar Unit Kerja';
  const templat = (templatEl && templatEl.value) || 'Surat Internal';
  const klasifikasi = (klasifikasiEl && klasifikasiEl.value) || 'BL.01.04 (pilar Hukum dan Tata Kelola)';
  const sifat = (sifatEl && sifatEl.value) || 'Terbatas';
  const kecepatan = (kecepatanEl && kecepatanEl.value) || 'Biasa';
  const perluTindakLanjut = appState.isCreateSuratPerluTindakLanjut !== false;

  const now = new Date();
  const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  const nowStr = `${dateFormatted} ${timeFormatted}`;

  const docId = 'doc-' + Date.now().toString().slice(-5);
  const newNomor = `07344/A/TI/P14/ET/${now.getFullYear()}`;

  const newDoc = {
    id: docId,
    hasAlert: true,
    nomorSurat: newNomor,
    judul: judul,
    pengirim: 'Yetty Endarwati - SVP Digitalisasi & Data Science',
    unitKerja: 'Komp. Digitalisasi & Data Science',
    tanggalTercipta: dateFormatted,
    prioritas: kecepatan === 'Amat Segera' ? 'Sangat Segera' : (kecepatan === 'Segera' ? 'Segera' : 'Biasa'),
    sifat: sifat,
    keterangan: 'Surat Dari: Muhammad Ridha Fadli',
    statusTindakLanjut: 'Open',
    jenisSurat: jenis,
    template: templat,
    klasifikasi: klasifikasi,
    drafter: {
      id: 'drafter',
      name: 'Muhammad Ridha Fadli',
      unit: 'Komp. Digitalisasi & Data Science'
    },
    reviewer: {
      id: 'reviewer',
      name: 'Siti Rahma',
      title: 'Senior Officer Rantai Pasok'
    },
    approver: {
      id: 'approver',
      name: 'Yetty Endarwati',
      title: 'SVP Digitalisasi & Data Science'
    },
    penerima: (appState.tujuanChips && appState.tujuanChips.length) ? {
      id: appState.tujuanChips[0].id || 'recipient-custom',
      name: appState.tujuanChips.map(c => c.name).join(', '),
      unit: appState.tujuanChips[0].role || 'Tujuan Naskah Dinas',
      isGroup: Boolean(appState.tujuanChips.some(c => c.isGroup))
    } : (appState.customRecipient ? {
      id: appState.customRecipient.id || 'recipient-custom',
      name: appState.customRecipient.name,
      unit: appState.customRecipient.role || appState.customRecipient.unit || 'Grup Penerima',
      isGroup: !!appState.customRecipient.isGroup
    } : {
      id: 'recipient',
      name: 'Dewi Lestari',
      unit: 'Departemen Anggaran & Perbendaharaan'
    }),
    cc: ['Tim Digitalisasi', 'Divisi Rantai Pasok'],
    perluTindakLanjut: perluTindakLanjut,
    tindakLanjutNote: '',
    tindakLanjutStatus: perluTindakLanjut ? 'Menunggu Proses Approval' : 'Tidak Diperlukan',
    perluStempel: false,
    stempelStatus: 'Tidak Diperlukan',
    stempelDetail: null,
    kecepatanTanggapan: kecepatan,
    status: 'Menunggu Review',
    statusBadge: 'warning',
    statusSuratKeluar: 'Waiting for Review (1/2)',
    roleSuratKeluar: 'Drafter',
    currentAssigneeRole: 'reviewer',
    currentAssigneeName: 'Siti Rahma',
    ringkasan: 'Sehubungan dengan program akselerasi transformasi digital dan standardisasi tata kelola administrasi perkantoran terintegrasi di lingkungan Pupuk Indonesia Grup, bersama ini kami sampaikan rencana pelaksanaan implementasi arsitektur SENTRA Digital Office (DoF) versi pembaruan (Rebuild Digital Office).',
    lampiran: [
      { name: 'Surat Pengantar.pdf', size: '1.8 MB', tanggal: `${dateFormatted}, ${timeFormatted}`, oleh: 'Yetty Endarwati' }
    ],
    timeline: [
      {
        waktu: `${nowStr} WIB`,
        aktor: 'Muhammad Ridha Fadli',
        peran: 'Drafter',
        aksi: 'Pengajuan Surat Baru',
        catatan: 'Naskah dinas diajukan kepada Reviewer (Siti Rahma).'
      }
    ],
    approverName: 'Yetty Endarwati',
    diperbaharuiTanggal: nowStr,
    diperbaharuiOleh: 'Muhammad Ridha Fadli'
  };

  if (!appState.data.documents) appState.data.documents = [];
  appState.data.documents.unshift(newDoc);
  appState.isDataKosongMode = false;
  appState.selectedDocId = newDoc.id;
  saveLocalCopy(appState.data);

  try {
    await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoc)
    });
  } catch (e) {
    console.warn('Saved doc locally');
  }

  showToast('Surat berhasil dibuat & diajukan ke Reviewer (Siti Rahma)!');
  setTimeout(() => {
    navigate('surat-keluar');
  }, 700);
}

function saveReviewerChanges(docId) {
  const roleLabel = (appState.currentRole === 'approver') ? 'Approver' : 'Reviewer';
  showToast(`Perubahan naskah dinas oleh ${roleLabel} berhasil disimpan.`);
}

// Reviewer & Approver Modals matching Reference Images 2, 3, 4

// Modal 1: Konfirmasi Approve Surat (Image 2)
function openApproveSuratModal(docId) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const isApprover = (appState.currentRole === 'approver');
  const messageText = isApprover
    ? 'Dengan ini saya menyatakan sudah membaca dan menyetujui isi surat. Surat akan disahkan dan diterbitkan secara resmi.'
    : 'Dengan ini saya menyatakan sudah membaca dan memahami isi surat. Surat akan diteruskan untuk proses review selanjutnya.';

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card" style="max-width: 500px; padding: 28px; border-radius: 12px; background: #FFFFFF; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
        <h3 style="font-size: 18px; font-weight: 700; color: #1E293B; margin: 0 0 16px 0;">Konfirmasi Approve Surat</h3>
        <p style="font-size: 14px; color: #344054; line-height: 1.55; margin: 0 0 28px 0;">
          ${messageText}
        </p>
        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
          <button type="button" class="btn" onclick="closeModal()" style="padding: 9px 20px; font-size: 14px; font-weight: 600; background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; color: #344054; cursor: pointer;">
            Cancel
          </button>
          <button type="button" class="btn btn-sk-approve" onclick="confirmApproveSurat('${docId || 'doc-01'}')" style="padding: 9px 24px; font-size: 14px; font-weight: 600; border-radius: 8px; cursor: pointer;">
            Approve
          </button>
        </div>
      </div>
    </div>
  `;
}

function confirmApproveSurat(docId) {
  const doc = appState.data && appState.data.documents && (appState.data.documents.find(d => d.id === docId) || appState.data.documents[0]);
  const isApprover = (appState.currentRole === 'approver');
  const now = new Date();
  const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  const nowStr = `${dateFormatted} ${timeFormatted}`;

  if (doc) {
    if (isApprover) {
      doc.statusSuratKeluar = 'Completed';
      doc.status = 'Disetujui / Selesai';
      doc.statusBadge = 'success';
      doc.currentAssigneeRole = 'recipient';
      doc.currentAssigneeName = (doc.penerima && doc.penerima.name) || 'Dewi Lestari';
      doc.roleSuratKeluar = 'Approval';
      doc.diperbaharuiTanggal = nowStr;
      doc.diperbaharuiOleh = getCurrentPersona().name;
      if (!doc.timeline) doc.timeline = [];
      doc.timeline.push({
        waktu: `${nowStr} WIB`,
        aktor: getCurrentPersona().name,
        peran: 'Approver',
        aksi: 'Sahkan Persetujuan (Approve)',
        catatan: 'Naskah dinas telah disetujui & disahkan secara digital oleh Pejabat Approver. Surat diteruskan ke kotak masuk Penerima.'
      });
    } else {
      doc.statusSuratKeluar = 'Waiting For Approval';
      doc.status = 'Menunggu Approval';
      doc.statusBadge = 'warning';
      doc.currentAssigneeRole = 'approver';
      doc.currentAssigneeName = (doc.approver && doc.approver.name) || 'Yetty Endarwati';
      doc.roleSuratKeluar = 'Approval';
      doc.diperbaharuiTanggal = nowStr;
      doc.diperbaharuiOleh = getCurrentPersona().name;
      if (!doc.timeline) doc.timeline = [];
      doc.timeline.push({
        waktu: `${nowStr} WIB`,
        aktor: getCurrentPersona().name,
        peran: 'Reviewer',
        aksi: 'Approve Telaah',
        catatan: 'Naskah dinas telah ditelaah dan disetujui oleh Reviewer, diteruskan ke Pejabat Approver (Yetty Endarwati).'
      });
    }
    saveLocalCopy(appState.data);
  }
  closeModal();
  showToast(isApprover ? 'Surat dinas berhasil disahkan oleh Approver & masuk ke kotak Penerima.' : 'Surat berhasil diapprove oleh Reviewer & diteruskan ke Approver.');
  setTimeout(() => {
    navigate('surat-keluar');
  }, 900);
}

// Modal 2: Decline Surat (Image 3)
function openDeclineSuratModal(docId) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card" style="max-width: 520px; padding: 28px; border-radius: 12px; background: #FFFFFF; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
        <h3 style="font-size: 18px; font-weight: 700; color: #1E293B; margin: 0 0 14px 0;">Decline Surat</h3>
        <p style="font-size: 14px; color: #344054; line-height: 1.5; margin: 0 0 14px 0;">
          Apakah Anda yakin untuk menolak pengajuan ini?
        </p>
        <div style="margin-bottom: 24px;">
          <textarea id="decline-catatan" placeholder="Tambahkan catatan" style="width: 100%; height: 110px; border: 1px solid #D0D5DD; border-radius: 8px; padding: 12px; font-size: 13.5px; font-family: inherit; color: #1E293B; outline: none; resize: vertical; box-sizing: border-box;"></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
          <button type="button" class="btn" onclick="closeModal()" style="padding: 9px 20px; font-size: 14px; font-weight: 600; background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; color: #344054; cursor: pointer;">
            Cancel
          </button>
          <button type="button" class="btn btn-sk-declined" onclick="confirmDeclineSurat('${docId || 'doc-01'}')" style="padding: 9px 24px; font-size: 14px; font-weight: 600; border-radius: 8px; cursor: pointer;">
            Confirm
          </button>
        </div>
      </div>
    </div>
  `;
}

function confirmDeclineSurat(docId) {
  const catatanInput = document.getElementById('decline-catatan');
  const isApprover = (appState.currentRole === 'approver');
  const defaultNote = isApprover ? 'Pengajuan ditolak oleh Approver.' : 'Pengajuan ditolak oleh Reviewer.';
  const catatan = (catatanInput && catatanInput.value.trim()) || defaultNote;
  const now = new Date();
  const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  const nowStr = `${dateFormatted} ${timeFormatted}`;

  const doc = appState.data && appState.data.documents && (appState.data.documents.find(d => d.id === docId) || appState.data.documents[0]);
  if (doc) {
    doc.statusSuratKeluar = 'Declined';
    doc.status = 'Ditolak';
    doc.statusBadge = 'danger';
    doc.diperbaharuiTanggal = nowStr;
    doc.diperbaharuiOleh = getCurrentPersona().name;
    if (!doc.timeline) doc.timeline = [];
    doc.timeline.push({
      waktu: `${nowStr} WIB`,
      aktor: getCurrentPersona().name,
      peran: isApprover ? 'Approver' : 'Reviewer',
      aksi: 'Decline Pengajuan',
      catatan: catatan
    });
    saveLocalCopy(appState.data);
  }
  closeModal();
  showToast('Pengajuan surat telah ditolak.');
  setTimeout(() => {
    navigate('surat-keluar');
  }, 900);
}

// Modal 3: Konfirmasi Pembatalan (Image 4)
function openBatalSuratModal(docId) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card" style="max-width: 520px; padding: 28px; border-radius: 12px; background: #FFFFFF; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
        <h3 style="font-size: 18px; font-weight: 700; color: #1E293B; margin: 0 0 16px 0;">Konfirmasi Pembatalan</h3>
        
        <!-- Warning Alert Banner matching Image 4 -->
        <div style="background: #FEF3F2; border: 1px solid #FECDCA; border-radius: 8px; padding: 12px 16px; display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 22px; height: 22px; border-radius: 50%; background: #F04438; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; flex-shrink: 0;">!</div>
          <div style="font-size: 13.5px; font-weight: 500; color: #B42318;">Apakah Anda yakin untuk membatalkan surat ini?</div>
        </div>

        <div style="margin-bottom: 24px;">
          <textarea id="batal-catatan" placeholder="Tambahkan catatan" style="width: 100%; height: 110px; border: 1px solid #D0D5DD; border-radius: 8px; padding: 12px; font-size: 13.5px; font-family: inherit; color: #1E293B; outline: none; resize: vertical; box-sizing: border-box;"></textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
          <button type="button" class="btn" onclick="closeModal()" style="padding: 9px 20px; font-size: 14px; font-weight: 600; background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; color: #344054; cursor: pointer;">
            Cancel
          </button>
          <button type="button" class="btn btn-sk-cancel" onclick="confirmBatalSurat('${docId || 'doc-01'}')" style="padding: 9px 24px; font-size: 14px; font-weight: 600; border-radius: 8px; cursor: pointer;">
            Confirm
          </button>
        </div>
      </div>
    </div>
  `;
}

function confirmBatalSurat(docId) {
  closeModal();
  showToast('Surat berhasil dibatalkan.');
  setTimeout(() => {
    navigate('surat-keluar');
  }, 500);
}



// 4. Konfigurasi Provider (Exact match with reference screenshots: Image 1, 2, 3, 4)

function getProviderHierarchy() {
  if (appState.data && appState.data.providerHierarchy && appState.data.providerHierarchy.length > 0) {
    return appState.data.providerHierarchy;
  }

  const initialHierarchy = [
    {
      id: 'prov-peruri-1',
      nama: 'Peruri',
      kuotaTTD: '439/1000',
      kuotaStamp: '987/1000',
      perusahaanAktif: 4,
      kontrakAktif: 3,
      status: 'Active',
      isExpanded: true,
      companies: [
        {
          id: 'comp-pi-1',
          nama: 'PT Pupuk Indonesia',
          status: 'Active',
          kuotaTTD: '439/1000',
          kuotaStamp: '987/1000',
          diperbarui: '29 Maret 2026',
          diperbaruiOleh: 'Ragil Brilyan',
          isExpanded: true,
          contracts: [
            {
              id: 'kontrak-500013125',
              nomorKontrak: '#500013125',
              nomorKontrakRaw: '500013125',
              kuotaTTD: '439/1000',
              kuotaStamp: '987/1000',
              nilaiKontrak: 'Rp80.000.000',
              status: 'Active',
              periodeKontrak: '1 Jan 2026 – 31 Des 2026',
              tanggalAwal: '1 Januari 2026',
              tanggalAkhir: '31 Desember 2026',
              lampiran: 'Surat Kontrak #500013123.pdf',
              diperbarui: '29 Maret 2026',
              diperbaruiOleh: 'Ragil Brilyan',
              usageLogs: [
                { nomorSurat: '027/A/BL/DCS/IT/2026', tanggal: '01 Agustus 2026', aktivitas: 'User Melakukan Tanda tangan', jenis: 'TTD', user: 'Muhammad Ridha Fahlawy', direktorat: 'Direktorat Operasi', kompartemen: 'Digitalisasi' },
                { nomorSurat: '027/A/BL/DCS/IT/2026', tanggal: '02 Agustus 2026', aktivitas: 'Admin Pendok Melakukan Stempel', jenis: 'Stempel', user: 'Muhammad Ridha Fahlawy', direktorat: 'Direktorat Operasi', kompartemen: 'Digitalisasi' },
                { nomorSurat: '028/B/BL/HRM/IT/2026', tanggal: '05 Agustus 2026', aktivitas: 'Pembaruan Sistem Keamanan', jenis: 'Stempel', user: 'Sari Dewi Kusuma', direktorat: 'Direktorat Teknologi Informasi', kompartemen: 'Keamanan Sistem' },
                { nomorSurat: '029/C/BL/FIN/IT/2026', tanggal: '10 Agustus 2026', aktivitas: 'Verifikasi Anggaran Proyek', jenis: 'Stempel', user: 'Arif Hidayat', direktorat: 'Direktorat Keuangan', kompartemen: 'Manajemen Anggaran' },
                { nomorSurat: '030/D/BL/MKT/IT/2026', tanggal: '12 Agustus 2026', aktivitas: 'Kampanye Digital Baru', jenis: 'TTD', user: 'Lia Anindita', direktorat: 'Direktorat Pemasaran', kompartemen: 'Pemasaran Holding' },
                { nomorSurat: '031/E/BL/OPS/IT/2026', tanggal: '15 Agustus 2026', aktivitas: 'Pemeliharaan Server Rutin', jenis: 'TTD', user: 'Rizky Pratama', direktorat: 'Direktorat Operasi', kompartemen: 'Infrastruktur Pabrik' },
                { nomorSurat: '032/F/BL/DEV/IT/2026', tanggal: '18 Agustus 2026', aktivitas: 'Pengujian Modul Baru', jenis: 'TTD', user: 'Nina Wulandari', direktorat: 'Direktorat Pengembangan', kompartemen: 'Riset & Rekayasa' }
              ]
            },
            {
              id: 'kontrak-500013124',
              nomorKontrak: '#500013124',
              nomorKontrakRaw: '500013124',
              kuotaTTD: '0/1000',
              kuotaStamp: '0/1000',
              nilaiKontrak: 'Rp80.000.000',
              status: 'Inactive',
              periodeKontrak: '1 Jan 2026 – 31 Des 2026',
              tanggalAwal: '1 Januari 2026',
              tanggalAkhir: '31 Desember 2026',
              lampiran: 'Surat Kontrak #500013124.pdf',
              diperbarui: '31 Desember 2025',
              diperbaruiOleh: 'Ragil Brilyan',
              usageLogs: [
                { nomorSurat: '015/A/BL/DCS/IT/2025', tanggal: '10 Desember 2025', aktivitas: 'User Melakukan Tanda tangan', jenis: 'TTD', user: 'Muhammad Ridha Fadli', direktorat: 'Direktorat Operasi', kompartemen: 'Digitalisasi' }
              ]
            }
          ]
        },
        {
          id: 'comp-pi-2',
          nama: 'PT Pupuk Indonesia',
          status: 'Active',
          kuotaTTD: '990/1000',
          kuotaStamp: '990/1000 tersisa',
          diperbarui: '1 Januari 2026',
          diperbaruiOleh: 'Ragil Brilyan',
          isExpanded: false,
          contracts: [
            {
              id: 'kontrak-500013122',
              nomorKontrak: '#500013122',
              nomorKontrakRaw: '500013122',
              kuotaTTD: '990/1000',
              kuotaStamp: '990/1000',
              nilaiKontrak: 'Rp80.000.000',
              status: 'Active',
              periodeKontrak: '1 Jan 2026 – 31 Des 2026',
              tanggalAwal: '1 Januari 2026',
              tanggalAkhir: '31 Desember 2026',
              lampiran: 'Surat Kontrak #500013122.pdf',
              diperbarui: '1 Januari 2026',
              diperbaruiOleh: 'Ragil Brilyan',
              usageLogs: []
            }
          ]
        }
      ]
    },
    {
      id: 'prov-peruri-2',
      nama: 'Peruri',
      kuotaTTD: '30/1000',
      kuotaStamp: '990/1000',
      perusahaanAktif: 4,
      kontrakAktif: 3,
      status: 'Active',
      isExpanded: false,
      companies: [
        {
          id: 'comp-petro-1',
          nama: 'PT Petrokimia Gresik',
          status: 'Active',
          kuotaTTD: '30/1000',
          kuotaStamp: '990/1000',
          diperbarui: '15 Januari 2026',
          diperbaruiOleh: 'Ragil Brilyan',
          isExpanded: false,
          contracts: [
            {
              id: 'kontrak-500013121',
              nomorKontrak: '#500013121',
              nomorKontrakRaw: '500013121',
              kuotaTTD: '30/1000',
              kuotaStamp: '990/1000',
              nilaiKontrak: 'Rp80.000.000',
              status: 'Active',
              periodeKontrak: '1 Jan 2026 – 31 Des 2026',
              tanggalAwal: '1 Januari 2026',
              tanggalAkhir: '31 Desember 2026',
              lampiran: 'Surat Kontrak #500013121.pdf',
              diperbarui: '15 Januari 2026',
              diperbaruiOleh: 'Ragil Brilyan',
              usageLogs: []
            }
          ]
        }
      ]
    }
  ];

  if (!appState.data) appState.data = {};
  appState.data.providerHierarchy = initialHierarchy;
  saveLocalCopy(appState.data);
  return initialHierarchy;
}

function handleProviderSearch(val) {
  appState.providerSearchQuery = (val || '').trim();
  renderApp();
}

function toggleProviderRow(provId) {
  const hierarchy = getProviderHierarchy();
  const prov = hierarchy.find(p => p.id === provId);
  if (prov) {
    prov.isExpanded = !prov.isExpanded;
    saveLocalCopy(appState.data);
    renderApp();
  }
}

function toggleCompanyRow(provId, compId) {
  const hierarchy = getProviderHierarchy();
  hierarchy.forEach(p => {
    if (p.companies) {
      const comp = p.companies.find(c => c.id === compId);
      if (comp) {
        comp.isExpanded = !comp.isExpanded;
      }
    }
  });
  saveLocalCopy(appState.data);
  renderApp();
}

function toggleProviderDense(checked) {
  appState.isProviderDense = !!checked;
  renderApp();
}

function toggleContractDense(checked) {
  appState.isContractDense = !!checked;
  renderApp();
}

// 4.A Main Konfigurasi Provider View (Exact match with Image 1 & 2)
function renderKonfigurasiProviderView() {
  const hierarchy = getProviderHierarchy();
  const query = (appState.providerSearchQuery || '').toLowerCase();
  const isDense = !!appState.isProviderDense;

  const filteredProviders = hierarchy.filter(prov => {
    if (!query) return true;
    const matchProv = (prov.nama && prov.nama.toLowerCase().includes(query)) ||
                      (prov.status && prov.status.toLowerCase().includes(query));
    const matchCompany = (prov.companies || []).some(c => 
      c.nama.toLowerCase().includes(query) || (c.status && c.status.toLowerCase().includes(query))
    );
    return matchProv || matchCompany;
  });

  return `
    <div class="prov-page-container">
      <!-- Title & Breadcrumb -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 26px; font-weight: 700; color: #1E293B; margin: 0 0 4px 0;">Konfigurasi Provider</h1>
        <div style="font-size: 13.5px; color: #64748B;">Konfigurasi</div>
      </div>

      <!-- Search & Filter Bar (Exact Match) -->
      <div class="klasifikasi-filter-bar" style="margin-bottom: 16px;">
        <div class="klasifikasi-search-box">
          <div class="klasifikasi-search-icon">
            ${getIcon('search', 18)}
          </div>
          <input 
            type="text" 
            class="klasifikasi-search-input" 
            placeholder="Cari Nama Provider/Status..." 
            value="${escapeHtml(appState.providerSearchQuery || '')}"
            oninput="handleProviderSearch(this.value)"
          >
        </div>

        <button class="klasifikasi-filter-btn" type="button" onclick="showToast('Penyaringan provider dibuka.')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"/>
            <line x1="4" y1="10" x2="4" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="3"/>
            <line x1="20" y1="21" x2="20" y2="16"/>
            <line x1="20" y1="12" x2="20" y2="3"/>
            <line x1="1" y1="14" x2="7" y2="14"/>
            <line x1="9" y1="8" x2="15" y2="8"/>
            <line x1="17" y1="16" x2="23" y2="16"/>
          </svg>
          <span>Filter</span>
        </button>
      </div>

      <!-- Main 3-Level Hierarchical Table Card (Exact Match with Image 1 & 2) -->
      <div class="card" style="padding: 0; border: 1px solid #E2E8F0; border-radius: 8px; background: #FFFFFF; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <div style="overflow-x: auto; width: 100%;">
          <table class="tipe-surat-table ${isDense ? 'dense-table' : ''}" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 13px; color: #475569; text-align: left;">
                <th style="width: 70px; padding: 14px 16px;">Action</th>
                <th style="min-width: 180px; padding: 14px 16px;">Nama Provider</th>
                <th style="min-width: 140px; padding: 14px 16px;">Kuota TTD</th>
                <th style="min-width: 140px; padding: 14px 16px;">Kuota Stamp</th>
                <th style="min-width: 140px; padding: 14px 16px;">Perusahaan Aktif</th>
                <th style="min-width: 140px; padding: 14px 16px;">Kontrak Aktif</th>
                <th style="width: 120px; padding: 14px 16px;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredProviders.map(prov => {
                const isExpanded = prov.isExpanded !== false;
                const companies = prov.companies || [];

                return `
                  <!-- LEVEL 1: PROVIDER ROW -->
                  <tr style="border-bottom: 1px solid #F1F5F9; background: #FFFFFF; transition: background 0.15s ease;">
                    <td style="padding: 14px 16px;">
                      <button class="action-icon-plain" onclick="toggleProviderRow('${prov.id}')" title="${isExpanded ? 'Tutup Perusahaan' : 'Buka Perusahaan'}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          ${isExpanded ? '<polyline points="18 15 12 9 6 15"/>' : '<polyline points="6 9 12 15 18 9"/>'}
                        </svg>
                      </button>
                    </td>
                    <td style="padding: 14px 16px; font-weight: 600; color: #1E293B;">
                      ${escapeHtml(prov.nama)}
                    </td>
                    <td style="padding: 14px 16px; color: #334155; font-weight: 500;">
                      ${escapeHtml(prov.kuotaTTD)}
                    </td>
                    <td style="padding: 14px 16px; color: #334155; font-weight: 500;">
                      ${escapeHtml(prov.kuotaStamp)}
                    </td>
                    <td style="padding: 14px 16px; color: #334155;">
                      ${escapeHtml(String(prov.perusahaanAktif))}
                    </td>
                    <td style="padding: 14px 16px; color: #334155;">
                      ${escapeHtml(String(prov.kontrakAktif))}
                    </td>
                    <td style="padding: 14px 16px;">
                      <span class="badge-status-${(prov.status || 'Active').toLowerCase()}">${escapeHtml(prov.status || 'Active')}</span>
                    </td>
                  </tr>

                  <!-- LEVEL 2: COMPANIES SUB-TABLE (When Provider is Expanded) -->
                  ${isExpanded ? `
                    <tr>
                      <td colspan="7" style="padding: 0; background: #FAFAFC;">
                        <table style="width: 100%; border-collapse: collapse;">
                          <thead>
                            <tr style="background: #F1F5F9; border-bottom: 1px solid #E2E8F0; font-size: 12.5px; color: #475569; text-align: left;">
                              <th style="width: 100px; padding: 10px 16px 10px 32px;">Action</th>
                              <th style="min-width: 220px; padding: 10px 16px;">Perusahaan</th>
                              <th style="width: 110px; padding: 10px 16px;">Status</th>
                              <th style="min-width: 140px; padding: 10px 16px;">Kuota TTD</th>
                              <th style="min-width: 160px; padding: 10px 16px;">Kuota Stamp</th>
                              <th style="min-width: 150px; padding: 10px 16px;">Diperbarui</th>
                              <th style="min-width: 150px; padding: 10px 16px;">Diperbarui Oleh</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${companies.map(comp => {
                              const isCompExpanded = comp.isExpanded !== false;
                              const contracts = comp.contracts || [];

                              return `
                                <!-- LEVEL 2: COMPANY ROW -->
                                <tr style="border-bottom: 1px solid #E2E8F0; background: #FFFFFF;">
                                  <td style="padding: 12px 16px 12px 32px;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                      <button class="action-icon-plain" onclick="showToast('Opsi perusahaan ${escapeHtml(comp.nama)}')">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                                      </button>
                                      <!-- CIRCLE PLUS: Triggers Modal Tambah Provider (Image 3) -->
                                      <button class="action-circle-btn" onclick="openTambahKontrakModal('${prov.id}', '${comp.id}', '${escapeHtml(comp.nama)}')" title="Tambah Kontrak Perusahaan">
                                        +
                                      </button>
                                      <!-- CHEVRON: Expands / Collapses Level 3 Kontrak Card -->
                                      <button class="action-icon-plain" onclick="toggleCompanyRow('${prov.id}', '${comp.id}')" title="${isCompExpanded ? 'Tutup Kontrak' : 'Buka Kontrak'}">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                          ${isCompExpanded ? '<polyline points="18 15 12 9 6 15"/>' : '<polyline points="6 9 12 15 18 9"/>'}
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                  <td style="padding: 12px 16px; font-weight: 600; color: #1E293B;">
                                    ${escapeHtml(comp.nama)}
                                  </td>
                                  <td style="padding: 12px 16px;">
                                    <span class="badge-status-${(comp.status || 'Active').toLowerCase()}">${escapeHtml(comp.status || 'Active')}</span>
                                  </td>
                                  <td style="padding: 12px 16px; color: #334155; font-weight: 500;">
                                    ${escapeHtml(comp.kuotaTTD)}
                                  </td>
                                  <td style="padding: 12px 16px; color: #334155; font-weight: 500;">
                                    ${escapeHtml(comp.kuotaStamp)}
                                  </td>
                                  <td style="padding: 12px 16px; color: #64748B;">
                                    ${escapeHtml(comp.diperbarui)}
                                  </td>
                                  <td style="padding: 12px 16px; color: #334155;">
                                    ${escapeHtml(comp.diperbaruiOleh)}
                                  </td>
                                </tr>

                                <!-- LEVEL 3: NESTED KONTRAK TABLE CARD (Exact Match with Image 1 & 2) -->
                                ${isCompExpanded ? `
                                  <tr>
                                    <td colspan="7" style="padding: 0 16px 12px 32px; background: #FAFAFC;">
                                      <div class="level3-contract-card">
                                        <table style="width: 100%; border-collapse: collapse;">
                                          <thead>
                                            <tr style="background: #F8FAFC; border-bottom: 1px solid #EAECF0; font-size: 12px; color: #475569; text-align: left;">
                                              <th style="width: 70px; padding: 10px 14px;">Action</th>
                                              <th style="min-width: 160px; padding: 10px 14px;">Nomor Kontrak</th>
                                              <th style="min-width: 120px; padding: 10px 14px;">Kuota TTD</th>
                                              <th style="min-width: 120px; padding: 10px 14px;">Kuota Stamp</th>
                                              <th style="min-width: 140px; padding: 10px 14px;">Nilai Kontrak</th>
                                              <th style="width: 100px; padding: 10px 14px;">Status</th>
                                              <th style="min-width: 170px; padding: 10px 14px;">Periode Kontrak</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            ${contracts.map(cntr => `
                                              <tr style="border-bottom: 1px solid #F2F4F7; font-size: 13px;">
                                                <td style="padding: 10px 14px;">
                                                  <div style="display: flex; align-items: center; gap: 8px;">
                                                    <button class="action-icon-plain" onclick="showToast('Menu opsi kontrak ${cntr.nomorKontrak}')">
                                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                                                    </button>
                                                    <!-- EYE ICON: Triggers Detail Penggunaan Provider (Image 4) -->
                                                    <button class="action-icon-plain" onclick="openDetailKontrak('${cntr.id}')" title="Lihat Detail Kontrak">
                                                      ${getIcon('eye', 16)}
                                                    </button>
                                                  </div>
                                                </td>
                                                <td style="padding: 10px 14px; font-weight: 600; color: #1E293B;">
                                                  ${escapeHtml(cntr.nomorKontrak)}
                                                </td>
                                                <td style="padding: 10px 14px; color: #334155;">
                                                  ${escapeHtml(cntr.kuotaTTD)}
                                                </td>
                                                <td style="padding: 10px 14px; color: #334155;">
                                                  ${escapeHtml(cntr.kuotaStamp)}
                                                </td>
                                                <td style="padding: 10px 14px; color: #334155; font-weight: 500;">
                                                  ${escapeHtml(cntr.nilaiKontrak)}
                                                </td>
                                                <td style="padding: 10px 14px;">
                                                  <span class="badge-status-${(cntr.status || 'Active').toLowerCase()}">${escapeHtml(cntr.status || 'Active')}</span>
                                                </td>
                                                <td style="padding: 10px 14px; color: #475569;">
                                                  ${escapeHtml(cntr.periodeKontrak)}
                                                </td>
                                              </tr>
                                            `).join('')}
                                          </tbody>
                                        </table>

                                        <!-- Level 3 Card Footer: Dense, Rows per page, pagination -->
                                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; background: #FFFFFF; border-top: 1px solid #EAECF0; font-size: 12.5px; color: #475569;">
                                          <div style="display: flex; align-items: center; gap: 8px;">
                                            <label style="position: relative; display: inline-block; width: 34px; height: 18px; cursor: pointer; margin: 0;">
                                              <input type="checkbox" ${appState.isContractDense ? 'checked' : ''} onchange="toggleContractDense(this.checked)" style="opacity: 0; width: 0; height: 0; position: absolute;">
                                              <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${appState.isContractDense ? '#00AD78' : '#CBD5E1'}; transition: .2s; border-radius: 18px;">
                                                <span style="position: absolute; content: ''; height: 14px; width: 14px; left: ${appState.isContractDense ? '17px' : '2px'}; bottom: 2px; background-color: white; transition: .2s; border-radius: 50%;"></span>
                                              </span>
                                            </label>
                                            <span style="font-weight: 500;">Dense</span>
                                          </div>
                                          <div style="display: flex; align-items: center; gap: 16px;">
                                            <div style="display: flex; align-items: center; gap: 6px;">
                                              <span>Rows per page:</span>
                                              <select style="border: 1px solid #D0D5DD; border-radius: 6px; padding: 2px 6px; font-size: 12px; background: #fff;">
                                                <option selected>5</option>
                                                <option>10</option>
                                              </select>
                                            </div>
                                            <div>${contracts.length}-${contracts.length} of ${contracts.length}</div>
                                            <div style="display: flex; gap: 4px;">
                                              <button class="pagination-arrow-btn" disabled><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>
                                              <button class="pagination-arrow-btn" disabled><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ` : ''}
                              `;
                            }).join('')}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ` : ''}
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Main Table Card Footer: Dense, Rows per page 10, pagination (Exact Match) -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: #FFFFFF; border-top: 1px solid #E2E8F0; font-size: 13px; color: #475569;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="position: relative; display: inline-block; width: 36px; height: 20px; cursor: pointer; margin: 0;">
              <input type="checkbox" ${isDense ? 'checked' : ''} onchange="toggleProviderDense(this.checked)" style="opacity: 0; width: 0; height: 0; position: absolute;">
              <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isDense ? '#00AD78' : '#CBD5E1'}; transition: .2s; border-radius: 20px;">
                <span style="position: absolute; content: ''; height: 16px; width: 16px; left: ${isDense ? '17px' : '2px'}; bottom: 2px; background-color: white; transition: .2s; border-radius: 50%;"></span>
              </span>
            </label>
            <span style="font-weight: 500;">Dense</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span>Rows per page:</span>
              <select style="border: 1px solid #D0D5DD; border-radius: 6px; padding: 3px 8px; font-size: 12.5px; background: #fff;">
                <option selected>10</option>
                <option>20</option>
              </select>
            </div>
            <div>2-2 of 2</div>
            <div style="display: flex; gap: 4px;">
              <button class="pagination-arrow-btn" disabled><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>
              <button class="pagination-arrow-btn" disabled><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 4.B Modal: Tambah Provider (Penambahan Kontrak Perusahaan - Exact match with Image 3)
function openTambahKontrakModal(provId, compId, compName) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const targetCompName = compName || 'PT. Pupuk Indonesia';
  const targetProvId = provId || 'prov-peruri-1';
  const targetCompId = compId || 'comp-pi-1';

  appState.tambahKontrakStatus = 'Active';
  appState.tambahKontrakFileName = '';

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card modal-fixed-scroll">
        <!-- Fixed Header -->
        <div class="modal-fixed-header">
          <h2 style="font-size: 18px; font-weight: 700; color: #1E293B; margin: 0;">Tambah Provider</h2>
          <button class="modal-close-btn" onclick="closeModal()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #64748B; line-height: 1;">&times;</button>
        </div>

        <form id="form-tambah-kontrak" onsubmit="saveTambahKontrak(event, '${targetProvId}', '${targetCompId}', '${escapeHtml(targetCompName)}')" style="display: flex; flex-direction: column; flex: 1; overflow: hidden; margin: 0;">
          <!-- Scrollable Body -->
          <div class="modal-scrollable-body">
            <!-- Disabled Company Input -->
            <div style="margin-bottom: 18px;">
              <input type="text" value="${escapeHtml(targetCompName)}" disabled style="width: 100%; height: 42px; border: 1px dashed #D0D5DD; border-radius: 8px; padding: 0 14px; background: #F8FAFC; color: #94A3B8; font-size: 13.5px; font-weight: 500; box-sizing: border-box;">
            </div>

            <!-- Nomor Kontrak (Floating Label) -->
            <div class="modal-float-field">
              <label class="modal-float-label">Nomor Kontrak <span style="color: #F04438;">*</span></label>
              <input 
                type="text" 
                id="tambah-kontrak-nomor" 
                class="modal-float-input"
                value="500013123" 
                required 
                placeholder="500013123"
              >
            </div>

            <!-- Nilai Kontrak (Floating Label) -->
            <div class="modal-float-field">
              <label class="modal-float-label">Nilai Kontrak <span style="color: #F04438;">*</span></label>
              <input 
                type="text" 
                id="tambah-kontrak-nilai" 
                class="modal-float-input"
                value="Rp 80.000.000" 
                required
                placeholder="Rp 0"
              >
            </div>

            <!-- Date Range: Tanggal Awal & Tanggal Akhir (2 Columns with Calendar Icon) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
              <div class="modal-float-field" style="margin-bottom: 0;">
                <label class="modal-float-label">Tanggal Awal Kontrak <span style="color: #F04438;">*</span></label>
                <div style="position: relative;">
                  <div class="modal-float-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <input 
                    type="text" 
                    id="tambah-kontrak-tgl-awal" 
                    class="modal-float-input with-icon"
                    value="1 Januari 2026" 
                    required
                  >
                </div>
              </div>

              <div class="modal-float-field" style="margin-bottom: 0;">
                <label class="modal-float-label">Tanggal Akhir Kontrak <span style="color: #F04438;">*</span></label>
                <div style="position: relative;">
                  <div class="modal-float-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <input 
                    type="text" 
                    id="tambah-kontrak-tgl-akhir" 
                    class="modal-float-input with-icon"
                    value="31 Desember 2026" 
                    required
                  >
                </div>
              </div>
            </div>

            <!-- Kuota Tanda Tangan (Floating Label) -->
            <div class="modal-float-field">
              <label class="modal-float-label">Kuota Tanda Tangan <span style="color: #F04438;">*</span></label>
              <input 
                type="number" 
                id="tambah-kontrak-kuota-ttd" 
                class="modal-float-input"
                value="500" 
                required
              >
            </div>

            <!-- Kuota Stamp Digital (Floating Label) -->
            <div class="modal-float-field">
              <label class="modal-float-label">Kuota Stamp Digital <span style="color: #F04438;">*</span></label>
              <input 
                type="number" 
                id="tambah-kontrak-kuota-stamp" 
                class="modal-float-input"
                value="500" 
                required
              >
            </div>

            <!-- Bukti Lampiran Kontrak (Exact Match with Image 1) -->
            <div style="margin-bottom: 20px;">
              <label style="display: block; font-size: 13px; font-weight: 600; color: #1E293B; margin-bottom: 8px;">
                Bukti Lampiran Kontrak
              </label>
              <div class="upload-drop-area" onclick="simulateLampiranUpload()">
                <!-- Rich SVG Illustration matching Image 1 -->
                <div style="position: relative; width: 140px; height: 100px; margin: 0 auto 10px auto; display: flex; align-items: center; justify-content: center;">
                  <svg width="140" height="100" viewBox="0 0 160 110" fill="none">
                    <ellipse cx="80" cy="65" rx="60" ry="38" fill="#E6F4EA" opacity="0.8"/>
                    <rect x="58" y="22" width="16" height="24" rx="2" fill="#00C49F"/>
                    <rect x="74" y="16" width="16" height="30" rx="2" fill="#00AD78"/>
                    <rect x="90" y="20" width="16" height="26" rx="2" fill="#FFB020"/>
                    <rect x="106" y="26" width="14" height="20" rx="2" fill="#FF5252"/>
                    <path d="M42 44C42 40 45 37 49 37H68L78 47H118C122 47 125 50 125 54V86C125 90 122 93 118 93H49C45 93 42 90 42 86V44Z" fill="#006644"/>
                    <circle cx="83" cy="68" r="9" fill="#00AD78"/>
                    <path d="M83 64V72M79 68H87" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                    <rect x="110" y="58" width="18" height="22" rx="2" fill="#FFFFFF" transform="rotate(15 110 58)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))"/>
                    <circle cx="28" cy="40" r="2" fill="#00AD78" opacity="0.5"/>
                    <circle cx="138" cy="70" r="2.5" fill="#00AD78" opacity="0.6"/>
                    <circle cx="34" cy="74" r="1.5" fill="#00AD78" opacity="0.4"/>
                  </svg>
                </div>
                <div id="upload-preview-text">
                  <div style="font-size: 14.5px; font-weight: 700; color: #1E293B; margin-bottom: 5px;">
                    Pilih atau Tarik File
                  </div>
                  <div style="font-size: 12px; color: #64748B;">
                    Tarik file kesini atau klik <span style="color: #00AD78; font-weight: 600; text-decoration: underline; cursor: pointer;">Jelajah</span> melalui Perangkat Anda
                  </div>
                  <div style="font-size: 11px; color: #94A3B8; margin-top: 4px;">
                    Maksimal file 10MB
                  </div>
                </div>
              </div>
            </div>

            <!-- Status Segmented Toggle (Exact Match Image 1) -->
            <div style="margin-bottom: 12px;">
              <label style="display: block; font-size: 13px; font-weight: 600; color: #1E293B; margin-bottom: 8px;">
                Status
              </label>
              <div class="segmented-status-box">
                <button 
                  type="button" 
                  id="btn-status-active" 
                  class="segmented-status-btn active" 
                  onclick="setTambahKontrakStatus('Active')"
                >
                  Active
                </button>
                <button 
                  type="button" 
                  id="btn-status-inactive" 
                  class="segmented-status-btn" 
                  onclick="setTambahKontrakStatus('Inactive')"
                >
                  Non Active
                </button>
              </div>
            </div>
          </div>

          <!-- Fixed Footer -->
          <div class="modal-fixed-footer">
            <button 
              type="button" 
              class="btn" 
              onclick="closeModal()" 
              style="padding: 10px 22px; font-size: 13.5px; font-weight: 600; color: #344054; background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; cursor: pointer;"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn btn-primary" 
              style="padding: 10px 24px; font-size: 13.5px; font-weight: 600; background: #101828; border-color: #101828; color: #FFFFFF; border-radius: 8px; cursor: pointer;"
            >
              Add Provider
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function setTambahKontrakStatus(status) {
  appState.tambahKontrakStatus = status;
  const btnActive = document.getElementById('btn-status-active');
  const btnInactive = document.getElementById('btn-status-inactive');
  if (btnActive && btnInactive) {
    if (status === 'Active') {
      btnActive.classList.add('active');
      btnInactive.classList.remove('active');
    } else {
      btnActive.classList.remove('active');
      btnInactive.classList.add('active');
    }
  }
}

function simulateLampiranUpload() {
  const el = document.getElementById('upload-preview-text');
  appState.tambahKontrakFileName = 'Surat_Kontrak_500013123.pdf';
  if (el) {
    el.innerHTML = `
      <div style="font-size: 13.5px; font-weight: 700; color: #027A48; margin-bottom: 2px;">
        Surat_Kontrak_500013123.pdf &bull; 2.4 MB
      </div>
      <div style="font-size: 11.5px; color: #00AD78; font-weight: 600;">
        ✓ File lampiran kontrak berhasil dipilih
      </div>
    `;
  }
  showToast('File lampiran kontrak berhasil diunggah.');
}

function saveTambahKontrak(event, provId, compId, compName) {
  if (event) event.preventDefault();

  const nomorInput = document.getElementById('tambah-kontrak-nomor');
  const nilaiInput = document.getElementById('tambah-kontrak-nilai');
  const tglAwalInput = document.getElementById('tambah-kontrak-tgl-awal');
  const tglAkhirInput = document.getElementById('tambah-kontrak-tgl-akhir');
  const kuotaTTDInput = document.getElementById('tambah-kontrak-kuota-ttd');
  const kuotaStampInput = document.getElementById('tambah-kontrak-kuota-stamp');

  const nomorRaw = (nomorInput && nomorInput.value.trim()) || '500013123';
  const nilai = (nilaiInput && nilaiInput.value.trim()) || 'Rp 80.000.000';
  const tglAwal = (tglAwalInput && tglAwalInput.value.trim()) || '1 Januari 2026';
  const tglAkhir = (tglAkhirInput && tglAkhirInput.value.trim()) || '31 Desember 2026';
  const kuotaTTDVal = (kuotaTTDInput && kuotaTTDInput.value.trim()) || '500';
  const kuotaStampVal = (kuotaStampInput && kuotaStampInput.value.trim()) || '500';
  const statusVal = appState.tambahKontrakStatus || 'Active';
  const fileName = appState.tambahKontrakFileName || 'Surat Kontrak #' + nomorRaw + '.pdf';

  const newContract = {
    id: 'kontrak-' + nomorRaw.replace(/[^0-9]/g, ''),
    nomorKontrak: '#' + nomorRaw.replace(/^#/, ''),
    nomorKontrakRaw: nomorRaw.replace(/^#/, ''),
    kuotaTTD: `${kuotaTTDVal}/1000`,
    kuotaStamp: `${kuotaStampVal}/1000`,
    nilaiKontrak: nilai,
    status: statusVal,
    periodeKontrak: `${tglAwal} – ${tglAkhir}`,
    tanggalAwal: tglAwal,
    tanggalAkhir: tglAkhir,
    lampiran: fileName,
    diperbarui: 'Hari ini',
    diperbaruiOleh: getCurrentPersona() ? getCurrentPersona().name : 'Ragil Brilyan',
    usageLogs: [
      {
        nomorSurat: '033/A/BL/DCS/IT/2026',
        tanggal: 'Hari ini',
        aktivitas: 'Aktivasi Alokasi Kontrak Baru',
        jenis: 'TTD',
        user: getCurrentPersona() ? getCurrentPersona().name : 'Ragil Brilyan',
        direktorat: 'Direktorat Operasi',
        kompartemen: 'Digitalisasi'
      }
    ]
  };

  const hierarchy = getProviderHierarchy();
  hierarchy.forEach(p => {
    if (p.companies) {
      const comp = p.companies.find(c => c.id === compId);
      if (comp) {
        if (!comp.contracts) comp.contracts = [];
        comp.contracts.unshift(newContract);
        comp.isExpanded = true;
      }
    }
  });

  saveLocalCopy(appState.data);
  closeModal();
  showToast(`Kontrak #${nomorRaw} berhasil ditambahkan untuk ${compName}!`);
  renderApp();
}

// 4.C Detail Penggunaan Provider (Exact match with Image 4)
function openDetailKontrak(contractId) {
  appState.selectedContractId = contractId || 'kontrak-500013125';
  navigate('detail-kontrak');
}

function handleContractLogSearch(val) {
  appState.contractLogSearchQuery = (val || '').trim();
  renderApp();
}

function renderDetailKontrakProviderView() {
  const hierarchy = getProviderHierarchy();
  let foundContract = null;
  let parentCompany = null;
  let parentProvider = null;

  hierarchy.forEach(p => {
    (p.companies || []).forEach(c => {
      (c.contracts || []).forEach(cntr => {
        if (cntr.id === appState.selectedContractId || cntr.nomorKontrak === appState.selectedContractId) {
          foundContract = cntr;
          parentCompany = c;
          parentProvider = p;
        }
      });
    });
  });

  // Fallback to first contract if not found
  if (!foundContract) {
    foundContract = hierarchy[0]?.companies[0]?.contracts[0] || {
      id: 'kontrak-500013124',
      nomorKontrak: '#500013124',
      kuotaTTD: '439/1000',
      kuotaStamp: '987/1000',
      nilaiKontrak: 'Rp 80.000.000',
      status: 'Active',
      periodeKontrak: '1 Januari 2026 – 31 Desember 2026',
      tanggalAkhir: '31 Des 2026',
      diperbarui: '29 Maret 2026',
      diperbaruiOleh: 'Ragil Brilyan',
      lampiran: 'Surat Kontrak #500013123.pdf',
      usageLogs: []
    };
  }

  const logs = foundContract.usageLogs || [];
  const query = (appState.contractLogSearchQuery || '').toLowerCase();
  const filteredLogs = logs.filter(l => {
    if (!query) return true;
    return (
      (l.nomorSurat && l.nomorSurat.toLowerCase().includes(query)) ||
      (l.user && l.user.toLowerCase().includes(query)) ||
      (l.aktivitas && l.aktivitas.toLowerCase().includes(query)) ||
      (l.direktorat && l.direktorat.toLowerCase().includes(query))
    );
  });

  const isContractDense = !!appState.isContractDetailDense;

  return `
    <div class="prov-page-container">
      <!-- Breadcrumb & Title (Exact Match with Image 4) -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 26px; font-weight: 700; color: #1E293B; margin: 0 0 6px 0;">Detail Penggunaan Provider</h1>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 13.5px; color: #64748B;">
          <a href="#" onclick="navigate('konfigurasi-provider'); return false;" style="color: #64748B; text-decoration: none; font-weight: 500;">
            Konfigurasi
          </a>
          <span>&bull;</span>
          <span>Detail Kontrak #${escapeHtml(foundContract.nomorKontrak)}</span>
        </div>
      </div>

      <!-- 3 Top Metric Cards (Exact Match with Image 4) -->
      <div class="detail-provider-metrics">
        <!-- Card 1: Kuota Tanda Tangan Digital (Teal) -->
        <div class="metric-prov-card teal">
          <div class="metric-prov-title">Kuota Tanda Tangan Digital</div>
          <div class="metric-prov-num">${escapeHtml(foundContract.kuotaTTD)}</div>
          <div class="metric-prov-sub">Digunakan terakhir pada ${escapeHtml(foundContract.diperbarui || '29 Maret 2026')}</div>
        </div>

        <!-- Card 2: Kuota Stamp Digital (Blue) -->
        <div class="metric-prov-card blue">
          <div class="metric-prov-title">Kuota Stamp Digital</div>
          <div class="metric-prov-num">${escapeHtml(foundContract.kuotaStamp)}</div>
          <div class="metric-prov-sub">Digunakan terakhir pada ${escapeHtml(foundContract.diperbarui || '29 Maret 2026')}</div>
        </div>

        <!-- Card 3: Status (Peach / Warm) -->
        <div class="metric-prov-card peach">
          <div class="metric-prov-title">Status</div>
          <div class="metric-prov-num" style="font-size: 28px;">${foundContract.status === 'Active' ? 'Aktif' : 'Non Aktif'}</div>
          <div class="metric-prov-sub">
            Berlaku hingga ${escapeHtml(foundContract.tanggalAkhir || '31 Des 2026')}&nbsp;&nbsp;oleh ${escapeHtml(foundContract.diperbaruiOleh || 'Ragil Brilyan')}
          </div>
        </div>
      </div>

      <!-- Periode Kontrak & Nilai Kontrak Info Bar (Exact Match with Image 4) -->
      <div class="card" style="padding: 16px 20px; border: 1px solid #E2E8F0; border-radius: 8px; background: #FFFFFF; margin-bottom: 24px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div>
            <div style="font-size: 11.5px; color: #64748B; margin-bottom: 4px; font-weight: 500;">Periode Kontrak</div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 600; color: #1E293B;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>${escapeHtml(foundContract.periodeKontrak)}</span>
            </div>
          </div>
          <div>
            <div style="font-size: 11.5px; color: #64748B; margin-bottom: 4px; font-weight: 500;">Nilai Kontrak</div>
            <div style="font-size: 13.5px; font-weight: 600; color: #1E293B;">
              ${escapeHtml(foundContract.nilaiKontrak)}
            </div>
          </div>
        </div>
      </div>

      <!-- Usage Audit Table (Exact Match with Image 4) -->
      <div class="card" style="padding: 0; border: 1px solid #E2E8F0; border-radius: 8px; background: #FFFFFF; overflow: hidden; margin-bottom: 28px;">
        <!-- Table Search & Filter Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #E2E8F0; gap: 12px; flex-wrap: wrap;">
          <div class="klasifikasi-search-box" style="max-width: 420px; margin: 0;">
            <div class="klasifikasi-search-icon">
              ${getIcon('search', 17)}
            </div>
            <input 
              type="text" 
              class="klasifikasi-search-input" 
              placeholder="Cari Nomor Surat/User..." 
              value="${escapeHtml(appState.contractLogSearchQuery || '')}"
              oninput="handleContractLogSearch(this.value)"
            >
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="klasifikasi-filter-btn" type="button" onclick="showToast('Penyaringan log penggunaan dibuka.')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
              </svg>
              <span>Filter</span>
            </button>
            <button class="klasifikasi-filter-btn" type="button" onclick="showToast('Mengekspor laporan penggunaan provider CSV/Excel...')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Export</span>
            </button>
          </div>
        </div>

        <!-- Table Content -->
        <div style="overflow-x: auto; width: 100%;">
          <table class="tipe-surat-table ${isContractDense ? 'dense-table' : ''}" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 12.5px; color: #475569; text-align: left;">
                <th style="min-width: 190px; padding: 12px 16px;">Nomor Surat</th>
                <th style="min-width: 130px; padding: 12px 16px;">Tanggal</th>
                <th style="min-width: 210px; padding: 12px 16px;">Aktivitas</th>
                <th style="width: 90px; padding: 12px 16px;">Jenis</th>
                <th style="min-width: 180px; padding: 12px 16px;">User</th>
                <th style="min-width: 180px; padding: 12px 16px;">Direktorat</th>
                <th style="min-width: 170px; padding: 12px 16px;">Kompartemen</th>
              </tr>
            </thead>
            <tbody>
              ${filteredLogs.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 40px 20px; color: #64748B; font-size: 13px;">
                    Belum ada riwayat aktivitas penggunaan pada kontrak ini.
                  </td>
                </tr>
              ` : filteredLogs.map(log => `
                <tr style="border-bottom: 1px solid #F1F5F9; font-size: 13px;">
                  <td style="padding: 12px 16px; font-weight: 500; font-family: monospace; color: #1E293B;">
                    ${escapeHtml(log.nomorSurat)}
                  </td>
                  <td style="padding: 12px 16px; color: #64748B;">
                    ${escapeHtml(log.tanggal)}
                  </td>
                  <td style="padding: 12px 16px; color: #1E293B; font-weight: 500;">
                    ${escapeHtml(log.aktivitas)}
                  </td>
                  <td style="padding: 12px 16px;">
                    <span style="font-weight: 600; color: ${log.jenis === 'TTD' ? '#027A48' : '#175CD3'};">
                      ${escapeHtml(log.jenis)}
                    </span>
                  </td>
                  <td style="padding: 12px 16px; color: #1E293B;">
                    ${escapeHtml(log.user)}
                  </td>
                  <td style="padding: 12px 16px; color: #475569;">
                    ${escapeHtml(log.direktorat)}
                  </td>
                  <td style="padding: 12px 16px; color: #64748B;">
                    ${escapeHtml(log.kompartemen || 'Digitalisasi')}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Table Footer: Dense switch, Rows per page 10, pagination 1-7 of 7 -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: #FFFFFF; border-top: 1px solid #E2E8F0; font-size: 12.5px; color: #475569;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="position: relative; display: inline-block; width: 34px; height: 18px; cursor: pointer; margin: 0;">
              <input type="checkbox" ${isContractDense ? 'checked' : ''} onchange="appState.isContractDetailDense = this.checked; renderApp();" style="opacity: 0; width: 0; height: 0; position: absolute;">
              <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isContractDense ? '#00AD78' : '#CBD5E1'}; transition: .2s; border-radius: 18px;">
                <span style="position: absolute; content: ''; height: 14px; width: 14px; left: ${isContractDense ? '17px' : '2px'}; bottom: 2px; background-color: white; transition: .2s; border-radius: 50%;"></span>
              </span>
            </label>
            <span style="font-weight: 500;">Dense</span>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span>Rows per page:</span>
              <select style="border: 1px solid #D0D5DD; border-radius: 6px; padding: 2px 6px; font-size: 12px; background: #fff;">
                <option selected>10</option>
                <option>20</option>
              </select>
            </div>
            <div>1-${filteredLogs.length} of ${filteredLogs.length}</div>
            <div style="display: flex; gap: 4px;">
              <button class="pagination-arrow-btn" disabled><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>
              <button class="pagination-arrow-btn" disabled><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bukti Dokumen Kontrak (Exact Match with Image 4) -->
      <div style="margin-bottom: 32px;">
        <div style="font-size: 14px; font-weight: 700; color: #1E293B; margin-bottom: 10px;">
          Bukti Dokumen Kontrak
        </div>
        <div class="contract-doc-file-box">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 6px; background: #FEF3F2; display: flex; align-items: center; justify-content: center; color: #D92D20;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style="font-size: 13.5px; font-weight: 600; color: #1E293B;">
              ${escapeHtml(foundContract.lampiran || 'Surat Kontrak #500013123.pdf')}
            </div>
          </div>
          <button class="action-icon-plain" onclick="showToast('Membuka pratinjau dokumen ${escapeHtml(foundContract.lampiran || 'kontrak')}')" title="Unduh Dokumen">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <!-- Bottom Right Back Button (Exact Match with Image 4) -->
      <div style="display: flex; justify-content: flex-end;">
        <button 
          type="button" 
          class="btn" 
          onclick="navigate('konfigurasi-provider')" 
          style="padding: 10px 28px; font-size: 14px; font-weight: 600; color: #344054; background: #FFFFFF; border: 1px solid #D0D5DD; border-radius: 8px; cursor: pointer; box-shadow: 0 1px 2px rgba(16,24,40,0.05);"
        >
          Back
        </button>
      </div>
    </div>
  `;
}

function simulateProviderSync() {
  showToast('Menghubungi endpoint Provider Peruri & Privy CA...');
  setTimeout(() => {
    showToast('Sinkronisasi kuota berhasil: Seluruh ledger transaksi mutakhir.');
  }, 1000);
}

// 5. Registrasi Surat Masuk (Admin Penerima Dokumen)
function renderRegistrasiSuratView() {
  const registeredDocs = appState.data.registeredIncomingDocs || [];

  return `
    <div class="page-header">
      <div class="page-title-area">
        <h2>Registrasi Surat Masuk</h2>
        <p>Pencatatan surat dinas fisik/eksternal dari kementerian, mitra, dan asosiasi.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="openRegistrasiModal()">
          ${getIcon('plus', 16)} Registrasi Surat Baru
        </button>
      </div>
    </div>

    <div class="card">
      <div class="table-toolbar">
        <div class="search-input-box" style="width: 320px;">
          ${getIcon('search', 16)}
          <input type="text" placeholder="Cari nomor agenda, instansi luar..." oninput="showToast('Pencarian arsip...')">
        </div>
        <div style="font-size: 12.5px; color: var(--secondary-text);">
          Total <strong>${registeredDocs.length}</strong> naskah tercatat dalam agenda TU
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>No. Agenda TU</th>
              <th>Nomor Surat Asal & Tanggal</th>
              <th>Instansi Pengirim</th>
              <th>Perihal</th>
              <th>Tujuan Disposisi</th>
              <th>Status Registrasi</th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${registeredDocs.map(reg => `
              <tr>
                <td style="font-family: monospace; font-weight: 700; color: var(--primary-green);">${reg.agendaNumber}</td>
                <td>
                  <div style="font-family: monospace; font-weight: 600;">${reg.nomorSuratEksternal}</div>
                  <div style="font-size: 11px; color: var(--secondary-text);">Tgl Surat: ${reg.tanggalSurat}</div>
                </td>
                <td style="font-weight: 500;">${reg.asalSurat}</td>
                <td>
                  <div style="font-weight: 600; color: var(--main-text);">${reg.perihal}</div>
                  <div style="font-size: 11px; color: var(--secondary-text);">${reg.keterangan}</div>
                </td>
                <td>
                  <span class="badge badge-neutral">${reg.penerimaDisposisi}</span>
                </td>
                <td>
                  <span class="badge badge-info">${reg.statusRegistrasi}</span>
                </td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="showToast('Lembar disposisi untuk ${reg.agendaNumber} dibuka.')">
                    Lembar Disposisi
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 6. Matriks RBAC View (Admin DOF)
function renderRbacView() {
  const matrix = appState.data.rbacMatrix || [];

  return `
    <div class="page-header">
      <div class="page-title-area">
        <h2>Matriks Hak Akses Pengguna (Role-Based Access Control)</h2>
        <p>Konfigurasi pemetaan hak akses fitur SENTRA berdasarkan matriks organisasi Pupuk Indonesia.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-secondary" onclick="showToast('Matriks hak akses diekspor ke format PDF audit.')">
          Ekspor Matriks
        </button>
      </div>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Peran (Role)</th>
              <th>Beranda & Pesan Masuk</th>
              <th>Buat Surat Baru</th>
              <th>Telaah (Reviewer Peer)</th>
              <th>Persetujuan (Approver VP/Mgr)</th>
              <th>Verifikasi Stempel Digital</th>
              <th>Kelola Provider & Kuota</th>
              <th>Registrasi Surat Masuk</th>
            </tr>
          </thead>
          <tbody>
            ${matrix.map(row => `
              <tr>
                <td style="font-weight: 700; color: var(--main-text);">${row.role}</td>
                <td><span class="badge badge-success">Ya</span></td>
                <td>${row.buatSurat ? '<span class="badge badge-success">Ya</span>' : '<span class="badge badge-neutral">-</span>'}</td>
                <td>${row.review ? '<span class="badge badge-success">Ya (Peer)</span>' : '<span class="badge badge-neutral">-</span>'}</td>
                <td>${row.approve ? '<span class="badge badge-success">Ya (Manager)</span>' : '<span class="badge badge-neutral">-</span>'}</td>
                <td>${row.verifikasiStempel ? '<span class="badge badge-success">Ya (Admin)</span>' : '<span class="badge badge-neutral">-</span>'}</td>
                <td>${row.providerConfig ? '<span class="badge badge-success">Ya (Admin DOF)</span>' : '<span class="badge badge-neutral">-</span>'}</td>
                <td>${row.registrasiSurat ? '<span class="badge badge-success">Ya (Tata Usaha)</span>' : '<span class="badge badge-neutral">-</span>'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Helper: Safe HTML escape
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper: Ensure Tipe Surat list is populated
function getTipeSuratList() {
  if (!appState.data) appState.data = {};
  if (!Array.isArray(appState.data.tipeSuratList) || appState.data.tipeSuratList.length === 0) {
    appState.data.tipeSuratList = [
      {
        id: "ts-1",
        kode: "IT",
        deskripsi: "Surat Antar Unit Kerja",
        perluDiunggah: false,
        status: "Active",
        diperbaruiTanggal: "20 Juli 2026",
        diperbaruiOleh: "Ragil Brilyan"
      },
      {
        id: "ts-2",
        kode: "ED",
        deskripsi: "Surat Keluar",
        perluDiunggah: true,
        status: "Inactive",
        diperbaruiTanggal: "21 Juli 2026",
        diperbaruiOleh: "Ragil Brilyan"
      }
    ];
  }
  return appState.data.tipeSuratList;
}

// 7. Dedicated Tipe Surat View (Exact Match with Reference media_1792423649503_807847da.png)
function renderTipeSuratView() {
  const list = getTipeSuratList();
  const query = (appState.tipeSuratSearchQuery || '').toLowerCase().trim();
  const filterStatus = appState.tipeSuratFilterStatus || 'all';
  const filterUpload = appState.tipeSuratFilterUpload || 'all';

  // Apply search query and filters
  const filtered = list.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterUpload === 'true' && !item.perluDiunggah) return false;
    if (filterUpload === 'false' && item.perluDiunggah) return false;
    if (!query) return true;
    return (
      (item.kode && item.kode.toLowerCase().includes(query)) ||
      (item.deskripsi && item.deskripsi.toLowerCase().includes(query)) ||
      (item.status && item.status.toLowerCase().includes(query)) ||
      (item.diperbaruiOleh && item.diperbaruiOleh.toLowerCase().includes(query))
    );
  });

  const totalItems = filtered.length;
  const rowsPerPage = appState.tipeSuratRowsPerPage || 10;
  const maxPage = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const currentPage = Math.min(appState.tipeSuratCurrentPage || 1, maxPage);
  const startIdx = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, totalItems);
  const pageItems = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const isDense = !!appState.tipeSuratDense;

  return `
    <!-- Page Header (Exact Match) -->
    <div class="tipe-surat-header">
      <h1>Tipe Surat</h1>
      <div class="tipe-surat-subtitle">Management</div>
    </div>

    <!-- Search & Filter Bar (Exact Match) -->
    <div class="tipe-surat-filter-bar">
      <div class="tipe-surat-search-wrapper">
        <div class="tipe-surat-search-icon">
          ${getIcon('search', 18)}
        </div>
        <input 
          type="text" 
          class="tipe-surat-search-input" 
          placeholder="Cari Kode/Deskripsi/Status..." 
          value="${escapeHtml(appState.tipeSuratSearchQuery || '')}"
          oninput="handleTipeSuratSearch(this.value)"
        >
      </div>

      <button class="btn-tipe-surat-filter" type="button" onclick="openFilterDrawer('tipe-surat')">
        <span>Filter</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"/>
          <line x1="4" y1="10" x2="4" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="3"/>
          <line x1="20" y1="21" x2="20" y2="16"/>
          <line x1="20" y1="12" x2="20" y2="3"/>
          <line x1="1" y1="14" x2="7" y2="14"/>
          <line x1="9" y1="8" x2="15" y2="8"/>
          <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
        ${(filterStatus !== 'all' || filterUpload !== 'all') ? '<span class="filter-btn-active-dot"></span>' : ''}
      </button>
    </div>

    <!-- Data Table Card (Exact Match) -->
    <div class="tipe-surat-table-card">
      <div style="overflow-x: auto; width: 100%;">
        <table class="tipe-surat-table ${isDense ? 'dense-table' : ''}">
          <thead>
            <tr>
              <th style="width: 80px; padding-left: 20px;">Action</th>
              <th style="width: 100px;">Kode</th>
              <th>Deskripsi</th>
              <th style="width: 150px;">Perlu Diunggah</th>
              <th style="width: 130px;">Status</th>
              <th style="width: 180px;">Diperbarui Tanggal</th>
              <th style="width: 180px;">Diperbarui oleh</th>
            </tr>
          </thead>
          <tbody>
            ${pageItems.length === 0 ? `
              <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #94A3B3;">
                  Tidak ada tipe surat yang sesuai pencarian atau filter.
                </td>
              </tr>
            ` : pageItems.map(item => `
              <tr>
                <td style="padding-left: 20px;">
                  <div class="tipe-surat-actions">
                    <button class="action-icon-btn btn-edit" title="Edit Tipe Surat" onclick="openEditTipeSuratModal('${item.id}')">
                      ${getIcon('edit', 17)}
                    </button>
                    <button class="action-icon-btn btn-delete" title="Hapus Tipe Surat" onclick="openDeleteTipeSuratModal('${item.id}')">
                      ${getIcon('trash', 17)}
                    </button>
                  </div>
                </td>
                <td style="font-weight: 500; color: #1E293B;">
                  ${escapeHtml(item.kode)}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.deskripsi)}
                </td>
                <td>
                  ${item.perluDiunggah ? `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="display: block;">
                      <circle cx="12" cy="12" r="10" fill="#00AD78"/>
                      <polyline points="8 12 11 15 16 9" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  ` : `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D92D20" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  `}
                </td>
                <td>
                  ${(item.status === 'Active') ? `
                    <span class="status-badge-active">Active</span>
                  ` : `
                    <span class="status-badge-inactive">Inactive</span>
                  `}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.diperbaruiTanggal || '-')}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.diperbaruiOleh || '-')}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pagination & Dense Footer (Exact Match) -->
      <div class="tipe-surat-pagination-footer">
        <!-- Dense Toggle Switch -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="position: relative; display: inline-block; width: 38px; height: 20px; cursor: pointer; margin: 0;">
            <input type="checkbox" ${isDense ? 'checked' : ''} onchange="toggleTipeSuratDense(this.checked)" style="opacity: 0; width: 0; height: 0; position: absolute;">
            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isDense ? '#00AD78' : '#CBD5E1'}; transition: .25s ease; border-radius: 20px;">
              <span style="position: absolute; content: ''; height: 16px; width: 16px; left: ${isDense ? '20px' : '2px'}; bottom: 2px; background-color: white; transition: .25s ease; border-radius: 50%;"></span>
            </span>
          </label>
          <span style="font-weight: 500; color: #334155;">Dense</span>
        </div>

        <!-- Pagination Controls -->
        <div style="display: flex; align-items: center; gap: 18px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>Rows per page:</span>
            <select onchange="changeTipeSuratRowsPerPage(this.value)" style="border: 1px solid #E2E8F0; border-radius: 4px; padding: 4px 8px; font-size: 13px; color: #334155; background: #fff; cursor: pointer;">
              <option value="10" ${rowsPerPage === 10 ? 'selected' : ''}>10</option>
              <option value="25" ${rowsPerPage === 25 ? 'selected' : ''}>25</option>
              <option value="50" ${rowsPerPage === 50 ? 'selected' : ''}>50</option>
            </select>
          </div>
          <div>${totalItems > 0 ? `${startIdx}-${endIdx}` : '0-0'} of ${totalItems}</div>
          <div style="display: flex; gap: 4px;">
            <button class="pagination-arrow-btn" ${currentPage <= 1 ? 'disabled' : ''} onclick="changeTipeSuratPage(${currentPage - 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="pagination-arrow-btn" ${endIdx >= totalItems ? 'disabled' : ''} onclick="changeTipeSuratPage(${currentPage + 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Search handler for Tipe Surat
function handleTipeSuratSearch(val) {
  appState.tipeSuratSearchQuery = val;
  appState.tipeSuratCurrentPage = 1;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'tipe-surat') {
    contentArea.innerHTML = renderTipeSuratView();
  }
}

// Toggle Dense Mode
function toggleTipeSuratDense(isChecked) {
  appState.tipeSuratDense = isChecked;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'tipe-surat') {
    contentArea.innerHTML = renderTipeSuratView();
  }
}

// Change Rows Per Page
function changeTipeSuratRowsPerPage(val) {
  appState.tipeSuratRowsPerPage = parseInt(val, 10);
  appState.tipeSuratCurrentPage = 1;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'tipe-surat') {
    contentArea.innerHTML = renderTipeSuratView();
  }
}

// Change Page
function changeTipeSuratPage(newPage) {
  appState.tipeSuratCurrentPage = Math.max(1, newPage);
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'tipe-surat') {
    contentArea.innerHTML = renderTipeSuratView();
  }
}

// Filter Dialog
function openTipeSuratFilter() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const currentStatus = appState.tipeSuratFilterStatus || 'all';
  const currentUpload = appState.tipeSuratFilterUpload || 'all';

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="tipe-surat-modal-card" style="max-width: 420px;">
        <h3 class="tipe-surat-modal-title">Filter Tipe Surat</h3>

        <div class="form-field-group">
          <label class="form-field-label">Status</label>
          <select id="filter-tipe-status" class="form-field-input">
            <option value="all" ${currentStatus === 'all' ? 'selected' : ''}>Semua Status</option>
            <option value="Active" ${currentStatus === 'Active' ? 'selected' : ''}>Active</option>
            <option value="Inactive" ${currentStatus === 'Inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>

        <div class="form-field-group" style="margin-bottom: 24px;">
          <label class="form-field-label">Perlu Diunggah</label>
          <select id="filter-tipe-upload" class="form-field-input">
            <option value="all" ${currentUpload === 'all' ? 'selected' : ''}>Semua</option>
            <option value="true" ${currentUpload === 'true' ? 'selected' : ''}>Ya, perlu diunggah</option>
            <option value="false" ${currentUpload === 'false' ? 'selected' : ''}>Tidak perlu diunggah</option>
          </select>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button type="button" class="btn-modal-cancel" onclick="resetTipeSuratFilter()">
            Reset
          </button>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn-modal-cancel" onclick="closeModal()">
              Batal
            </button>
            <button type="button" class="btn-modal-save" onclick="applyTipeSuratFilter()">
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function applyTipeSuratFilter() {
  const statusEl = document.getElementById('filter-tipe-status');
  const uploadEl = document.getElementById('filter-tipe-upload');
  if (statusEl) appState.tipeSuratFilterStatus = statusEl.value;
  if (uploadEl) appState.tipeSuratFilterUpload = uploadEl.value;
  closeModal();
  renderApp();
}

function resetTipeSuratFilter() {
  appState.tipeSuratFilterStatus = 'all';
  appState.tipeSuratFilterUpload = 'all';
  closeModal();
  renderApp();
}

// 8. Edit Tipe Surat Modal (Exact Match with Reference media_1792423663935_f6d8f0d0.png)
function openEditTipeSuratModal(id) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const list = getTipeSuratList();
  const item = list.find(t => t.id === id) || {
    id: id,
    kode: 'IT',
    deskripsi: 'Surat Antar Unit Kerja',
    perluDiunggah: false,
    status: 'Active'
  };

  const isNonActive = item.status === 'Inactive' || item.status === 'Non Active';

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="tipe-surat-modal-card">
        <h3 class="tipe-surat-modal-title">Edit Tipe Surat</h3>

        <form onsubmit="event.preventDefault(); saveTipeSurat('${item.id}');">
          <!-- Kode Field -->
          <div class="form-field-group">
            <label class="form-field-label">
              Kode <span class="required-star">*</span>
            </label>
            <input type="text" id="edit-tipe-kode" class="form-field-input" value="${escapeHtml(item.kode)}" required>
          </div>

          <!-- Deskripsi Field -->
          <div class="form-field-group">
            <label class="form-field-label">
              Deskripsi <span class="required-star">*</span>
            </label>
            <input type="text" id="edit-tipe-deskripsi" class="form-field-input" value="${escapeHtml(item.deskripsi)}" required>
          </div>

          <!-- Apakah dokumen perlu diunggah? -->
          <div class="form-field-group">
            <label class="form-field-label" style="font-size: 13.5px; color: #344054; margin-bottom: 10px;">
              Apakah dokumen perlu diunggah?
            </label>
            <div style="display: flex; align-items: center; gap: 24px;">
              <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13.5px; color: #344054;">
                <input type="radio" name="edit-perlu-unggah" value="true" ${item.perluDiunggah ? 'checked' : ''} style="accent-color: #00AD78; width: 17px; height: 17px; cursor: pointer;">
                <span>Ya, perlu diunggah</span>
              </label>
              <label style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13.5px; color: #344054;">
                <input type="radio" name="edit-perlu-unggah" value="false" ${!item.perluDiunggah ? 'checked' : ''} style="accent-color: #00AD78; width: 17px; height: 17px; cursor: pointer;">
                <span>Tidak perlu diunggah</span>
              </label>
            </div>
          </div>

          <!-- Status Segmented Switch -->
          <div class="form-field-group" style="margin-bottom: 28px;">
            <label class="form-field-label" style="font-size: 13.5px; color: #344054; margin-bottom: 8px;">
              Status
            </label>
            <div class="segmented-status-container">
              <button type="button" id="status-opt-active" class="segmented-status-btn ${!isNonActive ? 'active' : ''}" onclick="selectTipeSuratStatus('Active')">
                Active
              </button>
              <button type="button" id="status-opt-inactive" class="segmented-status-btn ${isNonActive ? 'active' : ''}" onclick="selectTipeSuratStatus('Non Active')">
                Non Active
              </button>
            </div>
            <input type="hidden" id="edit-tipe-status" value="${isNonActive ? 'Non Active' : 'Active'}">
          </div>

          <!-- Footer Buttons -->
          <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
            <button type="button" class="btn-modal-cancel" onclick="closeModal()">
              Cancel
            </button>
            <button type="submit" class="btn-modal-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Switch between Active and Non Active in Edit Modal
function selectTipeSuratStatus(statusVal) {
  const btnActive = document.getElementById('status-opt-active');
  const btnInactive = document.getElementById('status-opt-inactive');
  const inputStatus = document.getElementById('edit-tipe-status');

  if (statusVal === 'Active') {
    if (btnActive) btnActive.className = 'segmented-status-btn active';
    if (btnInactive) btnInactive.className = 'segmented-status-btn';
    if (inputStatus) inputStatus.value = 'Active';
  } else {
    if (btnActive) btnActive.className = 'segmented-status-btn';
    if (btnInactive) btnInactive.className = 'segmented-status-btn active';
    if (inputStatus) inputStatus.value = 'Non Active';
  }
}

// Save Tipe Surat Edit
async function saveTipeSurat(id) {
  const kodeInput = document.getElementById('edit-tipe-kode');
  const deskripsiInput = document.getElementById('edit-tipe-deskripsi');
  const perluUnggahInput = document.querySelector('input[name="edit-perlu-unggah"]:checked');
  const statusInput = document.getElementById('edit-tipe-status');

  if (!kodeInput || !deskripsiInput) return;
  const kodeVal = kodeInput.value.trim();
  const deskripsiVal = deskripsiInput.value.trim();
  const perluUnggahVal = perluUnggahInput ? (perluUnggahInput.value === 'true') : false;
  const rawStatus = statusInput ? statusInput.value : 'Active';
  const statusVal = rawStatus === 'Non Active' ? 'Inactive' : rawStatus;

  if (!kodeVal || !deskripsiVal) {
    showToast('Harap lengkapi Kode dan Deskripsi tipe surat.', true);
    return;
  }

  const list = getTipeSuratList();
  const idx = list.findIndex(item => item.id === id);
  if (idx !== -1) {
    list[idx].kode = kodeVal;
    list[idx].deskripsi = deskripsiVal;
    list[idx].perluDiunggah = perluUnggahVal;
    list[idx].status = statusVal;
    list[idx].diperbaruiTanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const currentPersona = getCurrentPersona();
    list[idx].diperbaruiOleh = currentPersona ? currentPersona.name : 'Ragil Brilyan';

    saveLocalCopy(appState.data);

    try {
      await fetch(`/api/tipe-surat/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list[idx])
      });
    } catch (e) {
      console.warn('Could not sync with server, updated locally');
    }

    closeModal();
    showToast(`Tipe surat ${kodeVal} berhasil diperbarui.`);
    renderApp();
  }
}

// 9. Delete Tipe Surat Modal (Exact Match with Reference media_1792423682351_46b050b0.png)
function openDeleteTipeSuratModal(id) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const list = getTipeSuratList();
  const item = list.find(t => t.id === id) || { id: id, kode: 'ED' };

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="tipe-surat-modal-card" style="max-width: 440px;">
        <h3 class="tipe-surat-modal-title">Delete Tipe Surat</h3>

        <p style="font-size: 14px; color: #344054; line-height: 1.6; margin: 0 0 24px 0;">
          Apakah Anda yakin akan menghapus tipe surat <strong>${escapeHtml(item.kode)}</strong>. Aktivitas ini tidak dapat dikembalikan
        </p>

        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
          <button type="button" class="btn-modal-cancel" onclick="closeModal()">
            Cancel
          </button>
          <button type="button" class="btn-modal-confirm-delete" onclick="confirmDeleteTipeSurat('${item.id}')">
            Confirm
          </button>
        </div>
      </div>
    </div>
  `;
}

// Confirm Delete Tipe Surat
async function confirmDeleteTipeSurat(id) {
  const list = getTipeSuratList();
  const target = list.find(item => item.id === id);
  const targetKode = target ? target.kode : id;

  appState.data.tipeSuratList = list.filter(item => item.id !== id);
  saveLocalCopy(appState.data);

  try {
    await fetch(`/api/tipe-surat/${id}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.warn('Could not sync delete with server, updated locally');
  }

  closeModal();
  showToast(`Tipe surat ${targetKode} berhasil dihapus.`);
  renderApp();
}

// Helper: Ensure Klasifikasi Surat list is populated
function getKlasifikasiSuratList() {
  if (!appState.data) appState.data = {};
  if (!Array.isArray(appState.data.klasifikasiSuratList) || appState.data.klasifikasiSuratList.length === 0) {
    appState.data.klasifikasiSuratList = [
      {
        id: "ks-1",
        kode: "HK.07.07",
        deskripsi: "Perizinan Produk",
        sifat: "Rahasia",
        status: "Active",
        diperbaruiTanggal: "20/07/2026",
        diperbaruiOleh: "Ragil Brilyan"
      },
      {
        id: "ks-2",
        kode: "HK.07.07",
        deskripsi: "Perizinan Produk",
        sifat: "Rahasia",
        status: "Active",
        diperbaruiTanggal: "20/07/2026",
        diperbaruiOleh: "Ragil Brilyan"
      }
    ];
  }
  return appState.data.klasifikasiSuratList;
}

// 10. Dedicated Klasifikasi Surat View (Exact Match with Reference media_1792423717179_1a467673.png)
function renderKlasifikasiSuratView() {
  const list = getKlasifikasiSuratList();
  const query = (appState.klasifikasiSuratSearchQuery || '').toLowerCase().trim();
  const filterSifat = appState.klasifikasiSuratFilterSifat || 'all';
  const filterStatus = appState.klasifikasiSuratFilterStatus || 'all';

  // Apply search and filter
  const filtered = list.filter(item => {
    if (filterSifat !== 'all' && item.sifat !== filterSifat) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (!query) return true;
    return (
      (item.kode && item.kode.toLowerCase().includes(query)) ||
      (item.deskripsi && item.deskripsi.toLowerCase().includes(query)) ||
      (item.sifat && item.sifat.toLowerCase().includes(query)) ||
      (item.status && item.status.toLowerCase().includes(query)) ||
      (item.diperbaruiOleh && item.diperbaruiOleh.toLowerCase().includes(query))
    );
  });

  const totalItems = filtered.length;
  const rowsPerPage = appState.klasifikasiSuratRowsPerPage || 10;
  const maxPage = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const currentPage = Math.min(appState.klasifikasiSuratCurrentPage || 1, maxPage);
  const startIdx = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, totalItems);
  const pageItems = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const isDense = !!appState.klasifikasiSuratDense;

  return `
    <!-- Page Header (Exact Match) -->
    <div class="tipe-surat-header">
      <h1>Klasifikasi Surat</h1>
      <div class="tipe-surat-subtitle">Management</div>
    </div>

    <!-- Search & Filter Bar (Exact Match with Image 1) -->
    <div class="klasifikasi-filter-bar">
      <div class="klasifikasi-search-box">
        <div class="klasifikasi-search-icon">
          ${getIcon('search', 18)}
        </div>
        <input 
          type="text" 
          class="klasifikasi-search-input" 
          placeholder="Cari Kode/Deskripsi/Sifat/Status..." 
          value="${escapeHtml(appState.klasifikasiSuratSearchQuery || '')}"
          oninput="handleKlasifikasiSuratSearch(this.value)"
        >
      </div>

      <button class="klasifikasi-filter-btn" type="button" onclick="openFilterDrawer('klasifikasi-surat')">
        <span>Filter</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="7" y1="12" x2="17" y2="12"></line>
          <line x1="10" y1="18" x2="14" y2="18"></line>
        </svg>
        ${(filterSifat !== 'all' || filterStatus !== 'all') ? '<span class="filter-btn-active-dot"></span>' : ''}
      </button>
    </div>

    <!-- Data Table Card (Exact Match) -->
    <div class="tipe-surat-table-card">
      <div style="overflow-x: auto; width: 100%;">
        <table class="tipe-surat-table ${isDense ? 'dense-table' : ''}">
          <thead>
            <tr>
              <th style="width: 80px; padding-left: 20px;">Action</th>
              <th style="width: 120px;">Kode</th>
              <th>Deskripsi</th>
              <th style="width: 140px;">Sifat</th>
              <th style="width: 130px;">Status</th>
              <th style="width: 180px;">Diperbarui Tanggal</th>
              <th style="width: 180px;">Diperbarui oleh</th>
            </tr>
          </thead>
          <tbody>
            ${pageItems.length === 0 ? `
              <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #94A3B3;">
                  Tidak ada klasifikasi surat yang sesuai pencarian atau filter.
                </td>
              </tr>
            ` : pageItems.map(item => `
              <tr>
                <td style="padding-left: 20px;">
                  <div class="tipe-surat-actions">
                    <button class="action-icon-btn btn-edit" title="Edit Klasifikasi Surat" onclick="openEditKlasifikasiSuratModal('${item.id}')">
                      ${getIcon('edit', 17)}
                    </button>
                    <button class="action-icon-btn btn-delete" title="Hapus Klasifikasi Surat" onclick="openDeleteKlasifikasiSuratModal('${item.id}')">
                      ${getIcon('trash', 17)}
                    </button>
                  </div>
                </td>
                <td style="font-weight: 500; color: #1E293B;">
                  ${escapeHtml(item.kode)}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.deskripsi)}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.sifat || 'Biasa')}
                </td>
                <td>
                  ${(item.status === 'Active' || item.status === 'Aktif') ? `
                    <span class="status-badge-active">Active</span>
                  ` : `
                    <span class="status-badge-inactive">Inactive</span>
                  `}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.diperbaruiTanggal || '-')}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.diperbaruiOleh || '-')}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pagination & Dense Footer (Exact Match) -->
      <div class="tipe-surat-pagination-footer">
        <!-- Dense Toggle Switch -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="position: relative; display: inline-block; width: 38px; height: 20px; cursor: pointer; margin: 0;">
            <input type="checkbox" ${isDense ? 'checked' : ''} onchange="toggleKlasifikasiSuratDense(this.checked)" style="opacity: 0; width: 0; height: 0; position: absolute;">
            <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${isDense ? '#00AD78' : '#CBD5E1'}; transition: .25s ease; border-radius: 20px;">
              <span style="position: absolute; content: ''; height: 16px; width: 16px; left: ${isDense ? '20px' : '2px'}; bottom: 2px; background-color: white; transition: .25s ease; border-radius: 50%;"></span>
            </span>
          </label>
          <span style="font-weight: 500; color: #334155;">Dense</span>
        </div>

        <!-- Pagination Controls -->
        <div style="display: flex; align-items: center; gap: 18px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>Rows per page:</span>
            <select onchange="changeKlasifikasiSuratRowsPerPage(this.value)" style="border: none; background: transparent; font-size: 13px; color: #334155; font-weight: 500; cursor: pointer;">
              <option value="10" ${rowsPerPage === 10 ? 'selected' : ''}>10</option>
              <option value="25" ${rowsPerPage === 25 ? 'selected' : ''}>25</option>
              <option value="50" ${rowsPerPage === 50 ? 'selected' : ''}>50</option>
            </select>
          </div>
          <div>${totalItems > 0 ? (totalItems === 2 ? '2-2 of 2' : `${startIdx}-${endIdx} of ${totalItems}`) : '0-0 of 0'}</div>
          <div style="display: flex; gap: 4px;">
            <button class="pagination-arrow-btn" ${currentPage <= 1 ? 'disabled' : ''} onclick="changeKlasifikasiSuratPage(${currentPage - 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="pagination-arrow-btn" ${endIdx >= totalItems ? 'disabled' : ''} onclick="changeKlasifikasiSuratPage(${currentPage + 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Search handler for Klasifikasi Surat
function handleKlasifikasiSuratSearch(val) {
  appState.klasifikasiSuratSearchQuery = val;
  appState.klasifikasiSuratCurrentPage = 1;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'klasifikasi-surat') {
    contentArea.innerHTML = renderKlasifikasiSuratView();
  }
}

// Toggle Dense Mode for Klasifikasi Surat
function toggleKlasifikasiSuratDense(isChecked) {
  appState.klasifikasiSuratDense = isChecked;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'klasifikasi-surat') {
    contentArea.innerHTML = renderKlasifikasiSuratView();
  }
}

// Change Rows Per Page
function changeKlasifikasiSuratRowsPerPage(val) {
  appState.klasifikasiSuratRowsPerPage = parseInt(val, 10);
  appState.klasifikasiSuratCurrentPage = 1;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'klasifikasi-surat') {
    contentArea.innerHTML = renderKlasifikasiSuratView();
  }
}

// Change Page
function changeKlasifikasiSuratPage(newPage) {
  appState.klasifikasiSuratCurrentPage = Math.max(1, newPage);
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && appState.currentPage === 'klasifikasi-surat') {
    contentArea.innerHTML = renderKlasifikasiSuratView();
  }
}

// Filter Dialog for Klasifikasi Surat
function openKlasifikasiSuratFilter() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const currentSifat = appState.klasifikasiSuratFilterSifat || 'all';
  const currentStatus = appState.klasifikasiSuratFilterStatus || 'all';

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="tipe-surat-modal-card" style="max-width: 420px;">
        <h3 class="tipe-surat-modal-title">Filter Klasifikasi Surat</h3>

        <div class="form-field-group">
          <label class="form-field-label">Sifat</label>
          <select id="filter-klasifikasi-sifat" class="form-field-input">
            <option value="all" ${currentSifat === 'all' ? 'selected' : ''}>Semua Sifat</option>
            <option value="Biasa" ${currentSifat === 'Biasa' ? 'selected' : ''}>Biasa</option>
            <option value="Rahasia" ${currentSifat === 'Rahasia' ? 'selected' : ''}>Rahasia</option>
          </select>
        </div>

        <div class="form-field-group" style="margin-bottom: 24px;">
          <label class="form-field-label">Status</label>
          <select id="filter-klasifikasi-status" class="form-field-input">
            <option value="all" ${currentStatus === 'all' ? 'selected' : ''}>Semua Status</option>
            <option value="Active" ${currentStatus === 'Active' ? 'selected' : ''}>Active / Aktif</option>
            <option value="Inactive" ${currentStatus === 'Inactive' ? 'selected' : ''}>Inactive / Non-aktifkan</option>
          </select>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center;">
          <button type="button" class="btn-modal-cancel" onclick="resetKlasifikasiSuratFilter()">
            Reset
          </button>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn-modal-cancel" onclick="closeModal()">
              Batal
            </button>
            <button type="button" class="btn-modal-save" onclick="applyKlasifikasiSuratFilter()">
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function applyKlasifikasiSuratFilter() {
  const sifatEl = document.getElementById('filter-klasifikasi-sifat');
  const statusEl = document.getElementById('filter-klasifikasi-status');
  if (sifatEl) appState.klasifikasiSuratFilterSifat = sifatEl.value;
  if (statusEl) appState.klasifikasiSuratFilterStatus = statusEl.value;
  closeModal();
  renderApp();
}

function resetKlasifikasiSuratFilter() {
  appState.klasifikasiSuratFilterSifat = 'all';
  appState.klasifikasiSuratFilterStatus = 'all';
  closeModal();
  renderApp();
}

// 11. Edit Klasifikasi Surat Modal (Exact Match with Reference media_1792423727116_1d87009d.png & media_1792423747387_7643f106.png)
function openEditKlasifikasiSuratModal(id) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const list = getKlasifikasiSuratList();
  const item = list.find(t => t.id === id) || {
    id: id,
    kode: 'HK.07.07',
    deskripsi: 'Perizinan Produk',
    sifat: 'Rahasia',
    status: 'Active'
  };

  const isNonActive = item.status === 'Inactive' || item.status === 'Non Active' || item.status === 'Non-aktifkan';

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="tipe-surat-modal-card">
        <h3 class="tipe-surat-modal-title">Edit Klasifikasi Surat</h3>

        <form onsubmit="event.preventDefault(); saveKlasifikasiSurat('${item.id}');">
          <!-- Kode Field with Floating Label -->
          <div class="modal-floating-field">
            <label class="modal-floating-label">Kode <span class="required-star">*</span></label>
            <input type="text" id="edit-klasifikasi-kode" class="modal-floating-input" value="${escapeHtml(item.kode)}" required>
          </div>

          <!-- Deskripsi Field with Floating Label -->
          <div class="modal-floating-field">
            <label class="modal-floating-label">Deskripsi <span class="required-star">*</span></label>
            <input type="text" id="edit-klasifikasi-deskripsi" class="modal-floating-input" value="${escapeHtml(item.deskripsi)}" required>
          </div>

          <!-- Sifat Dropdown Field with Floating Label -->
          <div class="modal-floating-field">
            <label class="modal-floating-label">Sifat <span class="required-star">*</span></label>
            <select id="edit-klasifikasi-sifat" class="modal-floating-select" required>
              <option value="Rahasia" ${item.sifat === 'Rahasia' || !item.sifat ? 'selected' : ''}>Rahasia</option>
              <option value="Biasa" ${item.sifat === 'Biasa' ? 'selected' : ''}>Biasa</option>
            </select>
            <div class="modal-floating-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          <!-- Status Segmented Switch -->
          <div style="margin-bottom: 28px;">
            <label style="display: block; font-size: 13.5px; font-weight: 600; color: #1E293B; margin-bottom: 8px;">
              Status
            </label>
            <div class="segmented-status-container">
              <button type="button" id="status-klasifikasi-opt-active" class="segmented-status-btn ${!isNonActive ? 'active' : ''}" onclick="selectKlasifikasiSuratStatus('Active')">
                Active
              </button>
              <button type="button" id="status-klasifikasi-opt-inactive" class="segmented-status-btn ${isNonActive ? 'active' : ''}" onclick="selectKlasifikasiSuratStatus('Non Active')">
                Non Active
              </button>
            </div>
            <input type="hidden" id="edit-klasifikasi-status" value="${isNonActive ? 'Non Active' : 'Active'}">
          </div>

          <!-- Footer Buttons -->
          <div style="display: flex; justify-content: flex-end; align-items: center; gap: 10px;">
            <button type="button" class="btn-modal-cancel" onclick="closeModal()">
              Cancel
            </button>
            <button type="submit" class="btn-modal-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Switch between Active and Non Active in Edit Klasifikasi Modal
function selectKlasifikasiSuratStatus(statusVal) {
  const btnActive = document.getElementById('status-klasifikasi-opt-active');
  const btnInactive = document.getElementById('status-klasifikasi-opt-inactive');
  const inputStatus = document.getElementById('edit-klasifikasi-status');

  if (statusVal === 'Active') {
    if (btnActive) btnActive.className = 'segmented-status-btn active';
    if (btnInactive) btnInactive.className = 'segmented-status-btn';
    if (inputStatus) inputStatus.value = 'Active';
  } else {
    if (btnActive) btnActive.className = 'segmented-status-btn';
    if (btnInactive) btnInactive.className = 'segmented-status-btn active';
    if (inputStatus) inputStatus.value = 'Non Active';
  }
}

// Save Klasifikasi Surat Edit
async function saveKlasifikasiSurat(id) {
  const kodeInput = document.getElementById('edit-klasifikasi-kode');
  const deskripsiInput = document.getElementById('edit-klasifikasi-deskripsi');
  const sifatInput = document.getElementById('edit-klasifikasi-sifat');
  const statusInput = document.getElementById('edit-klasifikasi-status');

  if (!kodeInput || !deskripsiInput) return;
  const kodeVal = kodeInput.value.trim();
  const deskripsiVal = deskripsiInput.value.trim();
  const sifatVal = sifatInput ? sifatInput.value : 'Rahasia';
  const rawStatus = statusInput ? statusInput.value : 'Active';
  const statusVal = rawStatus === 'Non Active' ? 'Inactive' : rawStatus;

  if (!kodeVal || !deskripsiVal) {
    showToast('Harap lengkapi Kode dan Deskripsi klasifikasi surat.', true);
    return;
  }

  const list = getKlasifikasiSuratList();
  const idx = list.findIndex(item => item.id === id);
  if (idx !== -1) {
    list[idx].kode = kodeVal;
    list[idx].deskripsi = deskripsiVal;
    list[idx].sifat = sifatVal;
    list[idx].status = statusVal;
    list[idx].diperbaruiTanggal = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const currentPersona = getCurrentPersona();
    list[idx].diperbaruiOleh = currentPersona ? currentPersona.name : 'Ragil Brilyan';

    saveLocalCopy(appState.data);

    try {
      await fetch(`/api/klasifikasi-surat/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list[idx])
      });
    } catch (e) {
      console.warn('Could not sync with server, updated locally');
    }

    closeModal();
    showToast(`Klasifikasi surat ${kodeVal} berhasil diperbarui.`);
    renderApp();
  }
}

// 12. Delete Klasifikasi Surat Modal (Exact Match with Reference media_1792423740528_738aa340.png)
function openDeleteKlasifikasiSuratModal(id) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const list = getKlasifikasiSuratList();
  const item = list.find(t => t.id === id) || { id: id, kode: 'HK.07.07', deskripsi: 'Perizinan Produk' };

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="tipe-surat-modal-card" style="max-width: 460px;">
        <h3 class="tipe-surat-modal-title">Delete Kualifikasi Surat</h3>

        <p style="font-size: 14px; color: #344054; line-height: 1.6; margin: 0 0 24px 0;">
          Apakah Anda yakin akan menghapus kualifikasi surat dengan kode <strong>${escapeHtml(item.kode)} - ${escapeHtml(item.deskripsi)}</strong>?
        </p>

        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px;">
          <button type="button" class="btn-modal-cancel" onclick="closeModal()">
            Cancel
          </button>
          <button type="button" class="btn-modal-confirm-delete" onclick="confirmDeleteKlasifikasiSurat('${item.id}')">
            Confirm
          </button>
        </div>
      </div>
    </div>
  `;
}

// Confirm Delete Klasifikasi Surat
async function confirmDeleteKlasifikasiSurat(id) {
  const list = getKlasifikasiSuratList();
  const target = list.find(item => item.id === id);
  const targetKode = target ? `${target.kode} - ${target.deskripsi}` : id;

  appState.data.klasifikasiSuratList = list.filter(item => item.id !== id);
  saveLocalCopy(appState.data);

  try {
    await fetch(`/api/klasifikasi-surat/${id}`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.warn('Could not sync delete with server, updated locally');
  }

  closeModal();
  showToast(`Klasifikasi surat ${targetKode} berhasil dihapus.`);
  renderApp();
}

// 12B. Dedicated Templat Surat View (Exact Match with Reference media_1792428364749_483c5abf.png & media_1792428372893_93f1eb30.png)
function getTemplatSuratList() {
  if (!appState.data) appState.data = {};
  if (!Array.isArray(appState.data.templatSuratList) || appState.data.templatSuratList.length === 0) {
    appState.data.templatSuratList = [
      {
        id: "tpl-1",
        nama: "Surat Akuntansi Keuangan",
        unitKerja: "Semua Unit",
        tipe: "Surat Antar Unit Kerja",
        tandaTanganDigital: false,
        stampDigital: false,
        tujuan: "Internal",
        penerima: "Mujahid - VP Akuntansi Keuangan",
        status: "Active",
        diperbaruiTanggal: "20 Juli 2026",
        diperbaruiOleh: "Ragil Brilyan"
      },
      {
        id: "tpl-2",
        nama: "Surat Eksternal Digital",
        unitKerja: "Semua Unit",
        tipe: "Surat Keluar",
        tandaTanganDigital: true,
        stampDigital: true,
        tujuan: "Eksternal",
        penerima: "-",
        status: "Inactive",
        diperbaruiTanggal: "21 Juli 2026",
        diperbaruiOleh: "Ragil Brilyan"
      }
    ];
  }
  return appState.data.templatSuratList;
}

function renderTemplatSuratView() {
  const list = getTemplatSuratList();
  const query = (appState.templatSuratSearchQuery || '').toLowerCase().trim();

  const isFilterActive = (
    (appState.templatSuratFilterUnitKerja && appState.templatSuratFilterUnitKerja !== 'all') ||
    (appState.templatSuratFilterTujuan && appState.templatSuratFilterTujuan !== 'all') ||
    (appState.templatSuratFilterStatus && appState.templatSuratFilterStatus !== 'all')
  );

  // Apply search & filters
  const filtered = list.filter(item => {
    if (query) {
      const match = (
        (item.nama && item.nama.toLowerCase().includes(query)) ||
        (item.unitKerja && item.unitKerja.toLowerCase().includes(query)) ||
        (item.tipe && item.tipe.toLowerCase().includes(query)) ||
        (item.tujuan && item.tujuan.toLowerCase().includes(query)) ||
        (item.penerima && item.penerima.toLowerCase().includes(query))
      );
      if (!match) return false;
    }
    if (appState.templatSuratFilterUnitKerja && appState.templatSuratFilterUnitKerja !== 'all') {
      const u = (item.unitKerja || '').toLowerCase();
      const f = appState.templatSuratFilterUnitKerja.toLowerCase();
      if (!u.includes(f) && !f.includes(u) && !(f.includes('semua') && (u.includes('semua') || !u))) return false;
    }
    if (appState.templatSuratFilterTujuan && appState.templatSuratFilterTujuan !== 'all') {
      const t = (item.tujuan || '').toLowerCase();
      const tip = (item.tipe || '').toLowerCase();
      const f = appState.templatSuratFilterTujuan.toLowerCase();
      if (!t.includes(f) && !tip.includes(f)) return false;
    }
    if (appState.templatSuratFilterStatus && appState.templatSuratFilterStatus !== 'all') {
      const s = (item.status || 'Active').toLowerCase();
      const f = appState.templatSuratFilterStatus.toLowerCase();
      if (s !== f) return false;
    }
    return true;
  });

  const totalItems = filtered.length;
  const rowsPerPage = appState.templatSuratRowsPerPage || 10;
  const maxPage = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const currentPage = Math.min(appState.templatSuratCurrentPage || 1, maxPage);
  const startIdx = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, totalItems);
  const pageItems = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const isDense = !!appState.templatSuratDense;

  return `
    <!-- Page Header (Exact Match Image 1) -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
      <div>
        <h1 style="font-size: 22px; font-weight: 700; color: #1E293B; margin: 0 0 4px 0;">Templat Surat</h1>
        <div style="font-size: 13.5px; color: #64748B;">Management</div>
      </div>
      <button class="btn-buat-template" type="button" onclick="openCreateTemplatSurat()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Buat Templat Surat Baru</span>
      </button>
    </div>

    <!-- Search & Filter Bar (Exact Match Image 1) -->
    <div class="klasifikasi-filter-bar">
      <div class="klasifikasi-search-box">
        <div class="klasifikasi-search-icon">
          ${getIcon('search', 18)}
        </div>
        <input 
          type="text" 
          class="klasifikasi-search-input" 
          placeholder="Cari Nama/Unit Kerja/Tipe/Tujuan..." 
          value="${escapeHtml(appState.templatSuratSearchQuery || '')}"
          oninput="handleTemplatSuratSearch(this.value)"
        >
      </div>

      <button class="klasifikasi-filter-btn" type="button" onclick="openFilterDrawer('templat-surat')">
        <span>Filter</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="7" y1="12" x2="17" y2="12"></line>
          <line x1="10" y1="18" x2="14" y2="18"></line>
        </svg>
        ${isFilterActive ? '<span class="filter-btn-active-dot"></span>' : ''}
      </button>
    </div>

    <!-- Data Table Card (Exact Match Image 1 & 2) -->
    <div class="tipe-surat-table-card">
      <div style="overflow-x: auto; width: 100%;">
        <table class="tipe-surat-table ${isDense ? 'dense-table' : ''}">
          <thead>
            <tr>
              <th style="width: 70px; padding-left: 20px;">Action</th>
              <th style="min-width: 170px;">Nama</th>
              <th style="min-width: 120px;">Unit Kerja</th>
              <th style="min-width: 160px;">Tipe</th>
              <th style="min-width: 150px; text-align: center;">Tanda Tangan Digital</th>
              <th style="min-width: 120px; text-align: center;">Stamp Digital</th>
              <th style="min-width: 100px;">Tujuan</th>
              <th style="min-width: 180px;">Penerima</th>
              <th style="min-width: 100px;">Status</th>
              <th style="min-width: 140px;">Diperbarui Tanggal</th>
              <th style="min-width: 140px;">Diperbarui Oleh</th>
            </tr>
          </thead>
          <tbody>
            ${pageItems.length === 0 ? `
              <tr>
                <td colspan="11" style="text-align: center; padding: 40px; color: #94A3B3;">
                  Tidak ada templat surat yang sesuai pencarian.
                </td>
              </tr>
            ` : pageItems.map(item => `
              <tr>
                <td style="padding-left: 20px;">
                  <button class="action-icon-btn btn-edit" title="Edit Templat Surat" onclick="openEditTemplatSurat('${item.id}')">
                    ${getIcon('edit', 17)}
                  </button>
                </td>
                <td style="font-weight: 500; color: #1E293B;">
                  ${escapeHtml(item.nama)}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.unitKerja || 'Semua Unit')}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.tipe || '-')}
                </td>
                <td style="text-align: center;">
                  ${item.tandaTanganDigital ? `
                    <span class="icon-check-circle">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="10" fill="#12B76A"/>
                        <path d="M6 10l3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                  ` : `
                    <span class="icon-cross">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D92D20" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </span>
                  `}
                </td>
                <td style="text-align: center;">
                  ${item.stampDigital ? `
                    <span class="icon-check-circle">
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="10" fill="#12B76A"/>
                        <path d="M6 10l3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                  ` : `
                    <span class="icon-cross">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D92D20" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </span>
                  `}
                </td>
                <td>
                  ${item.tujuan === 'Internal' ? `
                    <span class="badge-tujuan-internal">Internal</span>
                  ` : `
                    <span class="badge-tujuan-eksternal">Eksternal</span>
                  `}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.penerima || '-')}
                </td>
                <td>
                  ${(item.status === 'Active' || item.status === 'Aktif') ? `
                    <span class="status-badge-active">Active</span>
                  ` : `
                    <span class="status-badge-inactive">Inactive</span>
                  `}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.diperbaruiTanggal || '-')}
                </td>
                <td style="color: #334155;">
                  ${escapeHtml(item.diperbaruiOleh || '-')}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pagination & Dense Footer (Exact Match Image 1) -->
      <div class="tipe-surat-pagination-footer">
        <!-- Dense Toggle Switch -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <label style="position: relative; display: inline-block; width: 38px; height: 20px; cursor: pointer; margin: 0;">
            <input type="checkbox" ${isDense ? 'checked' : ''} onchange="toggleTemplatSuratDense(this.checked)" style="opacity: 0; width: 0; height: 0; position: absolute;">
            <span style="position: absolute; cursor: pointer; inset: 0; background-color: ${isDense ? '#00AD78' : '#CBD5E1'}; transition: .25s ease; border-radius: 20px;">
              <span style="position: absolute; content: ''; height: 16px; width: 16px; left: ${isDense ? '20px' : '2px'}; bottom: 2px; background-color: white; transition: .25s ease; border-radius: 50%;"></span>
            </span>
          </label>
          <span style="font-weight: 500; color: #334155;">Dense</span>
        </div>

        <!-- Pagination Controls -->
        <div style="display: flex; align-items: center; gap: 18px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>Rows per page:</span>
            <select onchange="changeTemplatSuratRowsPerPage(this.value)" style="border: none; background: transparent; font-size: 13px; color: #334155; font-weight: 500; cursor: pointer;">
              <option value="10" ${rowsPerPage === 10 ? 'selected' : ''}>10</option>
              <option value="25" ${rowsPerPage === 25 ? 'selected' : ''}>25</option>
              <option value="50" ${rowsPerPage === 50 ? 'selected' : ''}>50</option>
            </select>
          </div>
          <div>${totalItems > 0 ? (totalItems === 2 ? '2-2 of 2' : `${startIdx}-${endIdx} of ${totalItems}`) : '0-0 of 0'}</div>
          <div style="display: flex; gap: 4px;">
            <button class="pagination-arrow-btn" ${currentPage <= 1 ? 'disabled' : ''} onclick="changeTemplatSuratPage(${currentPage - 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button class="pagination-arrow-btn" ${endIdx >= totalItems ? 'disabled' : ''} onclick="changeTemplatSuratPage(${currentPage + 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleTemplatSuratSearch(val) {
  appState.templatSuratSearchQuery = val;
  appState.templatSuratCurrentPage = 1;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'template-surat' || appState.currentPage === 'templat-surat')) {
    contentArea.innerHTML = renderTemplatSuratView();
  }
}

function toggleTemplatSuratDense(isChecked) {
  appState.templatSuratDense = isChecked;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'template-surat' || appState.currentPage === 'templat-surat')) {
    contentArea.innerHTML = renderTemplatSuratView();
  }
}

function changeTemplatSuratRowsPerPage(val) {
  appState.templatSuratRowsPerPage = parseInt(val, 10);
  appState.templatSuratCurrentPage = 1;
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'template-surat' || appState.currentPage === 'templat-surat')) {
    contentArea.innerHTML = renderTemplatSuratView();
  }
}

function changeTemplatSuratPage(newPage) {
  appState.templatSuratCurrentPage = Math.max(1, newPage);
  const contentArea = document.getElementById('main-content-view');
  if (contentArea && (appState.currentPage === 'template-surat' || appState.currentPage === 'templat-surat')) {
    contentArea.innerHTML = renderTemplatSuratView();
  }
}

function openCreateTemplatSurat() {
  appState.editingTemplateId = null;
  appState.templateForm = {
    nama: '',
    unitKerja: '',
    tipe: 'Surat Antar Unit Kerja',
    tujuan: 'Internal',
    penerima: '',
    tandaTanganDigital: false,
    stampDigital: false,
    status: 'Active'
  };
  navigate('buat-templat-surat');
}

function openEditTemplatSurat(id) {
  const list = getTemplatSuratList();
  const item = list.find(t => t.id === id);
  if (!item) return;

  appState.editingTemplateId = id;
  appState.templateForm = {
    nama: item.nama || '',
    unitKerja: item.unitKerja || '',
    tipe: item.tipe || 'Surat Antar Unit Kerja',
    tujuan: item.tujuan || 'Internal',
    penerima: item.penerima === '-' ? '' : (item.penerima || ''),
    tandaTanganDigital: !!item.tandaTanganDigital,
    stampDigital: !!item.stampDigital,
    status: item.status || 'Active'
  };
  navigate('buat-templat-surat');
}

// 12C. Buat Templat Surat Baru View (Exact Match with Reference media_1792428387457_fbe5130b.png)
function renderBuatTemplatSuratView() {
  if (!appState.templateForm) {
    appState.templateForm = {
      tandaTanganDigital: false,
      stampDigital: false,
      status: 'Active'
    };
  } else {
    if (appState.templateForm.tandaTanganDigital === undefined) appState.templateForm.tandaTanganDigital = false;
    if (appState.templateForm.stampDigital === undefined) appState.templateForm.stampDigital = false;
    if (!appState.templateForm.status) appState.templateForm.status = 'Active';
  }

  const formData = appState.templateForm;
  const isEditing = !!appState.editingTemplateId;
  const pageTitle = isEditing ? 'Edit Templat Surat' : 'Buat Templat Surat Baru';
  const isTtdActive = !!formData.tandaTanganDigital;
  const isStampActive = !!formData.stampDigital;

  return `
    <div style="max-width: 1200px; margin: 0 auto; padding-bottom: 120px;">
      <!-- Page Header & Breadcrumb (Exact Match Image 3) -->
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 22px; font-weight: 700; color: #1E293B; margin: 0 0 6px 0;">${pageTitle}</h1>
        <div class="detail-breadcrumb" style="font-size: 13px; color: #64748B;">
          <a class="detail-breadcrumb-link" onclick="navigate('template-surat'); return false;">Management</a>
          <span class="detail-breadcrumb-dot">•</span>
          <span>${pageTitle}</span>
        </div>
      </div>

      <!-- Top Grid: 2 Cards (Informasi Template & Pengaturan Dokumen) -->
      <div class="template-grid-row">
        <!-- Card 1: Informasi Template -->
        <div class="template-card">
          <div class="template-card-title">Informasi Template</div>

          <!-- Nama * -->
          <div class="modal-floating-field">
            <label class="modal-floating-label">Nama <span class="required-star">*</span></label>
            <input type="text" id="tpl-form-nama" class="modal-floating-input" placeholder="Tulis nama template" value="${escapeHtml(formData.nama || '')}" required>
          </div>

          <!-- Unit Kerja -->
          <div class="modal-floating-field" style="margin-bottom: 8px;">
            <label class="modal-floating-label">Unit Kerja</label>
            <select id="tpl-form-unit" class="modal-floating-select">
              <option value="" ${!formData.unitKerja ? 'selected' : ''}>Pilih unit kerja</option>
              <option value="Semua Unit" ${formData.unitKerja === 'Semua Unit' ? 'selected' : ''}>Semua Unit</option>
              <option value="Komp. Digitalisasi & Data Science" ${formData.unitKerja === 'Komp. Digitalisasi & Data Science' ? 'selected' : ''}>Komp. Digitalisasi & Data Science</option>
              <option value="Divisi Rantai Pasok" ${formData.unitKerja === 'Divisi Rantai Pasok' ? 'selected' : ''}>Divisi Rantai Pasok</option>
              <option value="Departemen Anggaran & Perbendaharaan" ${formData.unitKerja === 'Departemen Anggaran & Perbendaharaan' ? 'selected' : ''}>Departemen Anggaran & Perbendaharaan</option>
            </select>
            <div class="modal-floating-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div class="template-field-helper">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>Jika tidak diisi, template dapat digunakan untuk seluruh penerima</span>
          </div>

          <!-- Tipe Surat * -->
          <div class="modal-floating-field">
            <label class="modal-floating-label">Tipe Surat <span class="required-star">*</span></label>
            <select id="tpl-form-tipe" class="modal-floating-select" required>
              <option value="" disabled ${!formData.tipe ? 'selected' : ''}>Pilih tipe surat</option>
              <option value="Surat Antar Unit Kerja" ${formData.tipe === 'Surat Antar Unit Kerja' ? 'selected' : ''}>Surat Antar Unit Kerja</option>
              <option value="Surat Keluar" ${formData.tipe === 'Surat Keluar' ? 'selected' : ''}>Surat Keluar</option>
              <option value="Nota Dinas" ${formData.tipe === 'Nota Dinas' ? 'selected' : ''}>Nota Dinas</option>
              <option value="Surat Keputusan" ${formData.tipe === 'Surat Keputusan' ? 'selected' : ''}>Surat Keputusan</option>
            </select>
            <div class="modal-floating-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>

          <!-- Tujuan Surat * -->
          <div class="modal-floating-field">
            <label class="modal-floating-label">Tujuan Surat <span class="required-star">*</span></label>
            <select id="tpl-form-tujuan" class="modal-floating-select" required>
              <option value="" disabled ${!formData.tujuan ? 'selected' : ''}>Pilih tujuan surat</option>
              <option value="Internal" ${formData.tujuan === 'Internal' ? 'selected' : ''}>Internal</option>
              <option value="Eksternal" ${formData.tujuan === 'Eksternal' ? 'selected' : ''}>Eksternal</option>
            </select>
            <div class="modal-floating-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>

          <!-- Penerima Default -->
          <div class="modal-floating-field" style="margin-bottom: 8px;">
            <label class="modal-floating-label">Penerima Default</label>
            <div style="display: flex; align-items: center; gap: 8px; width: 100%;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <select id="tpl-form-penerima" class="modal-floating-select" style="flex: 1;">
                <option value="" ${!formData.penerima || formData.penerima === '-' ? 'selected' : ''}>Pilih penerima default</option>
                <option value="Mujahid - VP Akuntansi Keuangan" ${formData.penerima === 'Mujahid - VP Akuntansi Keuangan' ? 'selected' : ''}>Mujahid - VP Akuntansi Keuangan</option>
                <option value="Yetty Endarwati - SVP Digitalisasi" ${formData.penerima === 'Yetty Endarwati - SVP Digitalisasi' ? 'selected' : ''}>Yetty Endarwati - SVP Digitalisasi</option>
                <option value="Dewi Lestari - AVP Keuangan" ${formData.penerima === 'Dewi Lestari - AVP Keuangan' ? 'selected' : ''}>Dewi Lestari - AVP Keuangan</option>
              </select>
            </div>
            <div class="modal-floating-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div class="template-field-helper">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <span>Jika tidak diisi, template dapat digunakan untuk seluruh penerima</span>
          </div>
        </div>

        <!-- Card 2: Pengaturan Dokumen (Exact Match with Image 2) -->
        <div class="template-card">
          <div class="template-card-title">Pengaturan Dokumen</div>

          <!-- Tanda Tangan Digital Toggle Row -->
          <div 
            id="row-tpl-ttd" 
            class="template-toggle-row ${isTtdActive ? 'active' : ''}" 
            onclick="toggleTemplateSetting('ttd')"
            style="background-color: ${isTtdActive ? '#EAF7EE' : '#F8FAFC'}; border: 1px solid ${isTtdActive ? '#D1F0D9' : '#EAECF0'};"
          >
            <div class="template-toggle-info">
              <strong>Tanda Tangan Digital</strong>
              <div>Aktifkan jika template membutuhkan tanda tangan digital</div>
            </div>
            <div class="template-toggle-switch" id="track-tpl-ttd" style="background-color: ${isTtdActive ? '#00AD78' : '#CBD5E1'};">
              <div class="template-toggle-knob" id="thumb-tpl-ttd" style="transform: ${isTtdActive ? 'translateX(20px)' : 'translateX(0)'};"></div>
            </div>
            <input type="checkbox" id="tpl-form-ttd" ${isTtdActive ? 'checked' : ''} style="display: none;">
          </div>

          <!-- Stamp Digital Toggle Row -->
          <div 
            id="row-tpl-stamp" 
            class="template-toggle-row ${isStampActive ? 'active' : ''}" 
            onclick="toggleTemplateSetting('stamp')"
            style="margin-bottom: 22px; background-color: ${isStampActive ? '#EAF7EE' : '#F8FAFC'}; border: 1px solid ${isStampActive ? '#D1F0D9' : '#EAECF0'};"
          >
            <div class="template-toggle-info">
              <strong>Stamp Digital</strong>
              <div>Aktifkan jika template membutuhkan stamp digital</div>
            </div>
            <div class="template-toggle-switch" id="track-tpl-stamp" style="background-color: ${isStampActive ? '#00AD78' : '#CBD5E1'};">
              <div class="template-toggle-knob" id="thumb-tpl-stamp" style="transform: ${isStampActive ? 'translateX(20px)' : 'translateX(0)'};"></div>
            </div>
            <input type="checkbox" id="tpl-form-stamp" ${isStampActive ? 'checked' : ''} style="display: none;">
          </div>

          <!-- Status Dokumen Segmented Box (Exact Match Image 2) -->
          <div style="margin-top: 20px;">
            <label style="display: block; font-size: 13.5px; font-weight: 600; color: #1E293B; margin-bottom: 8px;">Status Dokumen</label>
            <div class="segmented-status-box">
              <button 
                type="button" 
                id="tpl-status-active" 
                class="segmented-status-btn ${formData.status !== 'Inactive' ? 'active' : ''}" 
                onclick="selectTemplateFormStatus('Active')"
              >
                Active
              </button>
              <button 
                type="button" 
                id="tpl-status-inactive" 
                class="segmented-status-btn ${formData.status === 'Inactive' ? 'active' : ''}" 
                onclick="selectTemplateFormStatus('Inactive')"
              >
                Non Active
              </button>
            </div>
            <input type="hidden" id="tpl-form-status-val" value="${formData.status || 'Active'}">
          </div>
        </div>
      </div>

      <!-- Bottom Card: Dokumen Templat (Exact Match Image 3) -->
      <div class="template-editor-card">
        <div class="template-card-title">Dokumen Templat</div>

        <div class="template-editor-shell">
          <!-- Toolbar -->
          <div class="template-editor-toolbar">
            <select class="template-toolbar-select" onchange="formatTemplateEditor('fontName', this.value)">
              <option value="Arial">Font</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Calibri">Calibri</option>
            </select>
            <span class="template-toolbar-divider"></span>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('bold')" title="Bold">
              <strong style="font-size: 14px;">B</strong>
            </button>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('italic')" title="Italic">
              <em style="font-size: 14px; font-style: italic;">I</em>
            </button>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('underline')" title="Underline">
              <u style="font-size: 14px;">U</u>
            </button>
            <span class="template-toolbar-divider"></span>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('insertUnorderedList')" title="Bullet List">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor"/><circle cx="4" cy="12" r="1.5" fill="currentColor"/><circle cx="4" cy="18" r="1.5" fill="currentColor"/></svg>
            </button>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('insertOrderedList')" title="Numbered List">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/></svg>
            </button>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('justifyLeft')" title="Align Left">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
            </button>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('justifyCenter')" title="Align Center">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="6"/><line x1="21" y1="12" x2="3" y2="12"/><line x1="18" y1="18" x2="6" y2="18"/></svg>
            </button>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('createLink', prompt('Masukkan URL:'))" title="Link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </button>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('insertImage', prompt('Masukkan URL gambar:'))" title="Image">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </button>
            <button type="button" class="template-toolbar-btn" onclick="formatTemplateEditor('removeFormat')" title="Clear Formatting">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="4" x2="20" y2="20"/><path d="M6 4h12l-5.5 8"/><line x1="10" y1="16" x2="14" y2="16"/><line x1="12" y1="13" x2="12" y2="20"/></svg>
            </button>
          </div>

          <!-- Paper Canvas -->
          <div class="template-paper-canvas">
            <div class="template-paper-sheet" contenteditable="true" id="template-editor-paper">
              <!-- Pupuk Indonesia Official Letterhead (Exact Match Image 3) -->
              <div style="display: flex; justify-content: flex-end; align-items: flex-start; margin-bottom: 25px; position: relative;">
                <div style="position: absolute; top: -45px; right: 0; width: 140px; height: 30px; background: #90BEE0; border-radius: 0 0 0 12px;"></div>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                  <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
                    <circle cx="35" cy="40" r="14" fill="#67B82D"/>
                    <circle cx="55" cy="25" r="11" fill="#75C3E5"/>
                    <circle cx="68" cy="42" r="13" fill="#008080"/>
                    <circle cx="58" cy="62" r="14" fill="#F39200"/>
                    <line x1="35" y1="40" x2="55" y2="25" stroke="#94A3B3" stroke-width="4"/>
                    <line x1="55" y1="25" x2="68" y2="42" stroke="#94A3B3" stroke-width="4"/>
                    <line x1="68" y1="42" x2="58" y2="62" stroke="#94A3B3" stroke-width="4"/>
                    <line x1="35" y1="40" x2="58" y2="62" stroke="#94A3B3" stroke-width="4"/>
                  </svg>
                  <div>
                    <div style="font-size: 15px; font-weight: 800; color: #1E3A8A; letter-spacing: 0.5px; line-height: 1.1;">PUPUK<br>INDONESIA</div>
                    <div style="font-size: 8px; font-weight: 600; color: #64748B; letter-spacing: 0.8px;">HOLDING COMPANY</div>
                  </div>
                </div>
              </div>

              <!-- Title Under Letterhead -->
              <div style="text-align: right; margin-bottom: 25px;">
                <strong style="font-size: 15px; text-decoration: underline; letter-spacing: 0.5px;">ANTAR UNIT KERJA</strong>
              </div>

              <!-- Metadata Variables -->
              <div style="margin-bottom: 20px;">
                <div>Jakarta, ###*TglSurat*###</div>
              </div>

              <div style="display: grid; grid-template-columns: 80px 10px 1fr; row-gap: 4px; margin-bottom: 25px;">
                <div>Nomor</div><div>:</div><div><strong>###*NoSurat*###</strong></div>
                <div>Sifat</div><div>:</div><div>................................ (jika Terbatas/Rahasia/Sangat Rahasia)</div>
                <div>Lampiran</div><div>:</div><div>... (......) Lembar/Berkas (jika ada)</div>
                <div>Kepada</div><div>:</div><div>................................</div>
                <div>Dari</div><div>:</div><div>................................</div>
                <div>Hal</div><div>:</div><div>................................</div>
              </div>

              <!-- Salutation -->
              <div style="margin-bottom: 20px;">
                <div>Dengan hormat, (jika ditujukan kepada pimpinan)</div>
              </div>

              <!-- Content Placeholders -->
              <div style="margin-bottom: 25px;">
                <div style="color: #64748B; letter-spacing: 0.5px; text-align: center; margin-bottom: 4px;">.................................................Paragraf Pembuka.................................................</div>
                <div style="color: #CBD5E1; letter-spacing: 1px; text-align: center;">...................................................................................................................</div>
                <div style="color: #CBD5E1; letter-spacing: 1px; text-align: center;">...................................................................................................................</div>
              </div>

              <div style="margin-bottom: 25px;">
                <div style="color: #64748B; letter-spacing: 0.5px; text-align: center; margin-bottom: 4px;">...................................................Paragraf Isi...................................................</div>
                <div style="color: #CBD5E1; letter-spacing: 1px; text-align: center;">...................................................................................................................</div>
                <div style="color: #CBD5E1; letter-spacing: 1px; text-align: center;">...................................................................................................................</div>
              </div>

              <div style="margin-bottom: 30px;">
                <div style="color: #64748B; letter-spacing: 0.5px; text-align: center; margin-bottom: 4px;">.................................................Paragraf Penutup.................................................</div>
              </div>
            </div>

            <!-- Page Counter -->
            <div class="template-page-counter">Halaman 1 dari 1</div>
          </div>
        </div>
      </div>

      <!-- Sticky Bottom Action Bar (Exact Match Image 3) -->
      <div class="template-bottom-bar">
        <button type="button" class="btn-template-cancel" onclick="navigate('template-surat')">Cancel</button>
        <button type="button" class="btn-template-draft" onclick="saveTemplate(true)">Save as Draft</button>
        <button type="button" class="btn-template-create" onclick="saveTemplate(false)">Create Template</button>
      </div>
    </div>
  `;
}

function toggleTemplateSetting(key) {
  if (!appState.templateForm) appState.templateForm = {};
  if (key === 'ttd') {
    appState.templateForm.tandaTanganDigital = !appState.templateForm.tandaTanganDigital;
    const isChecked = !!appState.templateForm.tandaTanganDigital;
    const row = document.getElementById('row-tpl-ttd');
    const track = document.getElementById('track-tpl-ttd');
    const thumb = document.getElementById('thumb-tpl-ttd');
    const input = document.getElementById('tpl-form-ttd');
    if (input) input.checked = isChecked;
    if (row) {
      if (isChecked) {
        row.classList.add('active');
        row.style.backgroundColor = '#EAF7EE';
        row.style.borderColor = '#D1F0D9';
      } else {
        row.classList.remove('active');
        row.style.backgroundColor = '#F8FAFC';
        row.style.borderColor = '#EAECF0';
      }
    }
    if (track) {
      track.style.backgroundColor = isChecked ? '#00AD78' : '#CBD5E1';
    }
    if (thumb) {
      thumb.style.transform = isChecked ? 'translateX(20px)' : 'translateX(0)';
    }
  } else if (key === 'stamp') {
    appState.templateForm.stampDigital = !appState.templateForm.stampDigital;
    const isChecked = !!appState.templateForm.stampDigital;
    const row = document.getElementById('row-tpl-stamp');
    const track = document.getElementById('track-tpl-stamp');
    const thumb = document.getElementById('thumb-tpl-stamp');
    const input = document.getElementById('tpl-form-stamp');
    if (input) input.checked = isChecked;
    if (row) {
      if (isChecked) {
        row.classList.add('active');
        row.style.backgroundColor = '#EAF7EE';
        row.style.borderColor = '#D1F0D9';
      } else {
        row.classList.remove('active');
        row.style.backgroundColor = '#F8FAFC';
        row.style.borderColor = '#EAECF0';
      }
    }
    if (track) {
      track.style.backgroundColor = isChecked ? '#00AD78' : '#CBD5E1';
    }
    if (thumb) {
      thumb.style.transform = isChecked ? 'translateX(20px)' : 'translateX(0)';
    }
  }
}

function selectTemplateFormStatus(statusVal) {
  if (!appState.templateForm) appState.templateForm = {};
  appState.templateForm.status = statusVal;
  const btnActive = document.getElementById('tpl-status-active');
  const btnInactive = document.getElementById('tpl-status-inactive');
  const inputVal = document.getElementById('tpl-form-status-val');

  if (statusVal === 'Active') {
    if (btnActive) {
      btnActive.classList.add('active');
      btnActive.style.backgroundColor = '#D8DEE4';
      btnActive.style.color = '#101828';
      btnActive.style.fontWeight = '600';
    }
    if (btnInactive) {
      btnInactive.classList.remove('active');
      btnInactive.style.backgroundColor = 'transparent';
      btnInactive.style.color = '#475467';
      btnInactive.style.fontWeight = '500';
    }
    if (inputVal) inputVal.value = 'Active';
  } else {
    if (btnActive) {
      btnActive.classList.remove('active');
      btnActive.style.backgroundColor = 'transparent';
      btnActive.style.color = '#475467';
      btnActive.style.fontWeight = '500';
    }
    if (btnInactive) {
      btnInactive.classList.add('active');
      btnInactive.style.backgroundColor = '#D8DEE4';
      btnInactive.style.color = '#101828';
      btnInactive.style.fontWeight = '600';
    }
    if (inputVal) inputVal.value = 'Inactive';
  }
}

function formatTemplateEditor(command, value = null) {
  const paper = document.getElementById('template-editor-paper');
  if (paper) paper.focus();
  document.execCommand(command, false, value);
}

function saveTemplate(isDraft = false) {
  const namaInput = document.getElementById('tpl-form-nama');
  const unitInput = document.getElementById('tpl-form-unit');
  const tipeInput = document.getElementById('tpl-form-tipe');
  const tujuanInput = document.getElementById('tpl-form-tujuan');
  const penerimaInput = document.getElementById('tpl-form-penerima');
  const ttdInput = document.getElementById('tpl-form-ttd');
  const stampInput = document.getElementById('tpl-form-stamp');
  const statusInput = document.getElementById('tpl-form-status-val');

  const nama = namaInput ? namaInput.value.trim() : '';
  if (!nama) {
    showToast('Harap masukkan nama template surat.', true);
    if (namaInput) namaInput.focus();
    return;
  }

  const unitKerja = unitInput && unitInput.value ? unitInput.value : 'Semua Unit';
  const tipe = tipeInput && tipeInput.value ? tipeInput.value : 'Surat Antar Unit Kerja';
  const tujuan = tujuanInput && tujuanInput.value ? tujuanInput.value : 'Internal';
  const penerima = penerimaInput && penerimaInput.value ? penerimaInput.value : '-';
  const tandaTanganDigital = appState.templateForm && appState.templateForm.tandaTanganDigital !== undefined 
    ? appState.templateForm.tandaTanganDigital 
    : (ttdInput ? ttdInput.checked : true);
  const stampDigital = appState.templateForm && appState.templateForm.stampDigital !== undefined 
    ? appState.templateForm.stampDigital 
    : (stampInput ? stampInput.checked : false);
  const status = statusInput ? statusInput.value : (isDraft ? 'Inactive' : 'Active');

  const list = getTemplatSuratList();
  const currentPersona = getCurrentPersona();
  const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  if (appState.editingTemplateId) {
    const idx = list.findIndex(t => t.id === appState.editingTemplateId);
    if (idx !== -1) {
      list[idx].nama = nama;
      list[idx].unitKerja = unitKerja;
      list[idx].tipe = tipe;
      list[idx].tujuan = tujuan;
      list[idx].penerima = penerima;
      list[idx].tandaTanganDigital = tandaTanganDigital;
      list[idx].stampDigital = stampDigital;
      list[idx].status = status;
      list[idx].diperbaruiTanggal = dateStr;
      list[idx].diperbaruiOleh = currentPersona ? currentPersona.name : 'Ragil Brilyan';
    }
  } else {
    const newId = `tpl-${Date.now()}`;
    list.unshift({
      id: newId,
      nama: nama,
      unitKerja: unitKerja,
      tipe: tipe,
      tandaTanganDigital: tandaTanganDigital,
      stampDigital: stampDigital,
      tujuan: tujuan,
      penerima: penerima,
      status: status,
      diperbaruiTanggal: dateStr,
      diperbaruiOleh: currentPersona ? currentPersona.name : 'Ragil Brilyan'
    });
  }

  saveLocalCopy(appState.data);
  showToast(isDraft ? `Draft templat "${nama}" disimpan!` : `Templat "${nama}" berhasil dibuat!`);
  navigate('template-surat');
}

// 12C. Dedicated User Legacy View (Exact Match with References media_1792428447298_2782bcb0.png, media_1792428490051_6e419ed2.png, media_1792428502010_42ea6e9a.png, media_1792428511808_aead5ce4.png, media_1792428521488_a6fe2569.png)
function getUserLegacyList() {
  if (!appState.data) appState.data = {};
  if (!Array.isArray(appState.data.userLegacyList) || appState.data.userLegacyList.length === 0) {
    if (typeof INITIAL_SENTRA_DATA !== 'undefined' && INITIAL_SENTRA_DATA.userLegacyList) {
      appState.data.userLegacyList = JSON.parse(JSON.stringify(INITIAL_SENTRA_DATA.userLegacyList));
    } else {
      appState.data.userLegacyList = [
        {
          id: 'leg-1',
          username: 'admin_pi',
          namaLegacy: 'Admin Pupuk',
          perusahaanLegacy: 'PT Pupuk Indonesia',
          statusIntegrasi: 'Belum Terhubung',
          nik: '-',
          namaSentra: '-',
          jabatanSentra: '-',
          unitKerjaSentra: '-',
          perusahaanSentra: '-',
          diperbaruiTanggal: '20 Juli 2026',
          diperbaruiOleh: 'SYSTEM'
        },
        {
          id: 'leg-2',
          username: 'admin_pendok',
          namaLegacy: 'Admin Pendok',
          perusahaanLegacy: 'PT Pupuk Indonesia',
          statusIntegrasi: 'Terhubung',
          nik: '71100021',
          namaSentra: 'Bramantyo',
          jabatanSentra: 'Administrasi Korporat',
          unitKerjaSentra: 'Sekretaris Perusahaan',
          perusahaanSentra: 'PT Pupuk Indonesia',
          diperbaruiTanggal: '20 Juli 2026',
          diperbaruiOleh: 'SYSTEM'
        }
      ];
    }
  }
  return appState.data.userLegacyList;
}

function getSentraEmployeesList() {
  if (!appState.data) appState.data = {};
  if (!Array.isArray(appState.data.sentraEmployeesList) || appState.data.sentraEmployeesList.length === 0) {
    if (typeof INITIAL_SENTRA_DATA !== 'undefined' && INITIAL_SENTRA_DATA.sentraEmployeesList) {
      appState.data.sentraEmployeesList = JSON.parse(JSON.stringify(INITIAL_SENTRA_DATA.sentraEmployeesList));
    } else {
      appState.data.sentraEmployeesList = [
        {
          nik: '93052134',
          nama: 'Ragil Brilliant',
          jabatan: 'Administrasi Korporat',
          unitKerja: 'Sekretaris Perusahaan',
          perusahaan: 'PT Pupuk Indonesia'
        },
        {
          nik: '71100021',
          nama: 'Bramantyo',
          jabatan: 'Administrasi Korporat',
          unitKerja: 'Sekretaris Perusahaan',
          perusahaan: 'PT Pupuk Indonesia'
        },
        {
          nik: '94071741',
          nama: 'A Nur Fadilla',
          jabatan: 'Admin Project Agrosolution',
          unitKerja: 'Agrosolution',
          perusahaan: 'PT Pupuk Indonesia'
        },
        {
          nik: '92083452',
          nama: 'Citra Dewi',
          jabatan: 'Marketing Specialist Agrosolution',
          unitKerja: 'Agrosolution',
          perusahaan: 'PT Pupuk Indonesia'
        },
        {
          nik: '94112789',
          nama: 'Dedi Santoso',
          jabatan: 'UI/UX Designer Agrosolution',
          unitKerja: 'Agrosolution',
          perusahaan: 'PT Pupuk Indonesia'
        },
        {
          nik: '95021243',
          nama: 'Eka Putri',
          jabatan: 'Quality Assurance Agrosolution',
          unitKerja: 'Agrosolution',
          perusahaan: 'PT Pupuk Indonesia'
        }
      ];
    }
  }
  return appState.data.sentraEmployeesList;
}

function renderUserLegacyView() {
  const list = getUserLegacyList();
  const query = (appState.userLegacySearchQuery || '').toLowerCase().trim();

  // Apply search filter (Username Legacy, Nama Legacy, NIK, Nama Sentra)
  const filtered = list.filter(item => {
    // Filter status
    if (appState.userLegacyFilterStatus && appState.userLegacyFilterStatus !== 'all') {
      if (item.statusIntegrasi !== appState.userLegacyFilterStatus) return false;
    }
    if (!query) return true;
    return (
      (item.username && item.username.toLowerCase().includes(query)) ||
      (item.namaLegacy && item.namaLegacy.toLowerCase().includes(query)) ||
      (item.nik && item.nik.toLowerCase().includes(query)) ||
      (item.namaSentra && item.namaSentra.toLowerCase().includes(query)) ||
      (item.jabatanSentra && item.jabatanSentra.toLowerCase().includes(query)) ||
      (item.perusahaanLegacy && item.perusahaanLegacy.toLowerCase().includes(query))
    );
  });

  const totalItems = filtered.length;
  const rowsPerPage = appState.userLegacyRowsPerPage || 10;
  const maxPage = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const currentPage = Math.min(Math.max(1, appState.userLegacyCurrentPage || 1), maxPage);

  const startIdx = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, totalItems);
  const pagedItems = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const rowsHtml = pagedItems.map(item => {
    const isConnected = item.statusIntegrasi === 'Terhubung';

    const actionBtnHtml = isConnected
      ? `<button class="btn-legacy-action" onclick="openUserLegacyMappingModal('${item.id}')" title="Edit Mapping">${getIcon('edit')}</button>`
      : `<button class="btn-legacy-action" onclick="openUserLegacyMappingModal('${item.id}')" title="Hubungkan User Legacy">${getIcon('eye')}</button>`;

    const statusBadgeHtml = isConnected
      ? `<span class="badge-status-terhubung">Terhubung</span>`
      : `<div class="badge-status-wrap">
           <span class="badge-status-dot-alert">!</span>
           <span class="badge-status-belum">Belum Terhubung</span>
         </div>`;

    return `
      <tr>
        <td style="text-align: center;">${actionBtnHtml}</td>
        <td>${statusBadgeHtml}</td>
        <td><strong>${escapeHtml(item.username || '-')}</strong></td>
        <td>${escapeHtml(item.namaLegacy || '-')}</td>
        <td>${escapeHtml(item.perusahaanLegacy || '-')}</td>
        <td>${escapeHtml(item.nik || '-')}</td>
        <td>${escapeHtml(item.namaSentra || '-')}</td>
        <td>${escapeHtml(item.jabatanSentra || '-')}</td>
        <td>${escapeHtml(item.unitKerjaSentra || '-')}</td>
        <td>${escapeHtml(item.perusahaanSentra || '-')}</td>
        <td>${escapeHtml(item.diperbaruiTanggal || '-')}</td>
        <td>${escapeHtml(item.diperbaruiOleh || 'SYSTEM')}</td>
      </tr>
    `;
  }).join('');

  const emptyHtml = `
    <tr>
      <td colspan="12" style="text-align: center; padding: 40px; color: #94A3B8;">
        Tidak ada data user legacy yang sesuai.
      </td>
    </tr>
  `;

  return `
    <div style="max-width: 100%; margin: 0 auto; padding-bottom: 40px;">
      <!-- Title & Subtitle matching Reference media_1792428447298_2782bcb0.png -->
      <div style="margin-bottom: 22px;">
        <h2 style="font-size: 24px; font-weight: 700; color: #0F172A; margin: 0 0 4px 0; letter-spacing: -0.3px;">User Legacy</h2>
        <div style="font-size: 13.5px; color: #64748B;">Management</div>
      </div>

      <!-- Search & Filter bar -->
      <div class="legacy-toolbar">
        <div class="legacy-search-box">
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text"
                 class="legacy-search-input"
                 placeholder="Cari Username Legacy/Nama Legacy/NIK/Nama Sentra..."
                 value="${escapeHtml(appState.userLegacySearchQuery || '')}"
                 oninput="handleUserLegacySearch(this.value)">
        </div>
        <button type="button" class="btn-legacy-filter" onclick="openFilterDrawer('user-legacy')">
          Filter
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          ${appState.userLegacyFilterStatus !== 'all' ? '<span class="filter-btn-active-dot"></span>' : ''}
        </button>
      </div>

      <!-- Table Card with Grouped Header matching media_1792428490051_6e419ed2.png -->
      <div class="legacy-table-card">
        <div class="legacy-table-scroll">
          <table class="legacy-table ${appState.userLegacyDense ? 'dense' : ''}">
            <thead>
              <tr>
                <th rowspan="2" style="width: 70px; text-align: center;">Action</th>
                <th rowspan="2" style="width: 150px;">Status Integrasi</th>
                <th colspan="3" class="th-group">User Legacy</th>
                <th colspan="5" class="th-group">User Sentra</th>
                <th rowspan="2" style="width: 130px;">Diperbarui Tanggal</th>
                <th rowspan="2" style="width: 120px;">Diperbarui Oleh</th>
              </tr>
              <tr>
                <!-- Subheaders User Legacy -->
                <th style="min-width: 130px;">Username</th>
                <th style="min-width: 140px;">Nama</th>
                <th style="min-width: 160px;">Perusahaan</th>
                <!-- Subheaders User Sentra -->
                <th style="min-width: 110px;">NIK</th>
                <th style="min-width: 140px;">Nama</th>
                <th style="min-width: 160px;">Jabatan</th>
                <th style="min-width: 160px;">Unit Kerja</th>
                <th style="min-width: 160px;">Perusahaan</th>
              </tr>
            </thead>
            <tbody>
              ${pagedItems.length > 0 ? rowsHtml : emptyHtml}
            </tbody>
          </table>
        </div>

        <!-- Table Footer -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-top: 1px solid #E2E8F0; background: #FFFFFF;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label class="switch-dense" style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; color: #334155;">
              <input type="checkbox" ${appState.userLegacyDense ? 'checked' : ''} onchange="toggleUserLegacyDense()">
              <span class="dense-slider"></span>
              <span style="font-weight: 500;">Dense</span>
            </label>
          </div>
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569;">
              <span>Rows per page:</span>
              <select class="dense-rows-select" onchange="changeUserLegacyRowsPerPage(this.value)">
                <option value="10" ${rowsPerPage === 10 ? 'selected' : ''}>10</option>
                <option value="25" ${rowsPerPage === 25 ? 'selected' : ''}>25</option>
                <option value="50" ${rowsPerPage === 50 ? 'selected' : ''}>50</option>
              </select>
            </div>
            <div style="font-size: 13px; color: #475569;">
              ${startIdx}-${endIdx} of ${totalItems}
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <button class="btn-pagination-arrow" ${currentPage <= 1 ? 'disabled' : ''} onclick="changeUserLegacyPage(${currentPage - 1})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="btn-pagination-arrow" ${currentPage >= maxPage ? 'disabled' : ''} onclick="changeUserLegacyPage(${currentPage + 1})">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function handleUserLegacySearch(val) {
  appState.userLegacySearchQuery = val;
  appState.userLegacyCurrentPage = 1;
  renderApp();
}

function toggleUserLegacyDense() {
  appState.userLegacyDense = !appState.userLegacyDense;
  renderApp();
}

function changeUserLegacyRowsPerPage(val) {
  appState.userLegacyRowsPerPage = parseInt(val) || 10;
  appState.userLegacyCurrentPage = 1;
  renderApp();
}

function changeUserLegacyPage(page) {
  appState.userLegacyCurrentPage = page;
  renderApp();
}

function toggleUserLegacyFilterMenu() {
  const current = appState.userLegacyFilterStatus || 'all';
  if (current === 'all') {
    appState.userLegacyFilterStatus = 'Belum Terhubung';
    showToast('Filter: Menampilkan user Belum Terhubung');
  } else if (current === 'Belum Terhubung') {
    appState.userLegacyFilterStatus = 'Terhubung';
    showToast('Filter: Menampilkan user Terhubung');
  } else {
    appState.userLegacyFilterStatus = 'all';
    showToast('Filter: Menampilkan Semua User');
  }
  renderApp();
}

// User Legacy Mapping Modal (Exact Match with References media_1792428502010_42ea6e9a.png, media_1792428511808_aead5ce4.png, media_1792428521488_a6fe2569.png)
function openUserLegacyMappingModal(legacyUserId) {
  const list = getUserLegacyList();
  const legacyUser = list.find(u => u.id === legacyUserId);
  if (!legacyUser) return;

  appState.mappingModal = {
    isOpen: true,
    legacyUserId: legacyUserId,
    selectedNik: (legacyUser.nik && legacyUser.nik !== '-') ? legacyUser.nik : '',
    searchNikQuery: '',
    isDropdownOpen: false
  };

  renderUserLegacyMappingModal();
}

function renderUserLegacyMappingModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const modalState = appState.mappingModal;
  if (!modalState || !modalState.isOpen) {
    modalContainer.innerHTML = '';
    return;
  }

  const list = getUserLegacyList();
  const legacyUser = list.find(u => u.id === modalState.legacyUserId);
  if (!legacyUser) return;

  const employees = getSentraEmployeesList();
  const selectedEmployee = employees.find(e => e.nik === modalState.selectedNik);

  // Search filter for dropdown
  const query = (modalState.searchNikQuery || '').toLowerCase().trim();
  const filteredEmployees = employees.filter(e => {
    if (!query) return true;
    return (
      e.nik.toLowerCase().includes(query) ||
      e.nama.toLowerCase().includes(query) ||
      (e.jabatan && e.jabatan.toLowerCase().includes(query))
    );
  });

  // Dropdown items HTML
  const dropdownHtml = modalState.isDropdownOpen ? `
    <div class="legacy-emp-dropdown" id="legacy-emp-dropdown">
      ${filteredEmployees.length > 0 ? filteredEmployees.map(emp => {
        const isSelected = selectedEmployee && selectedEmployee.nik === emp.nik;
        return `
          <div class="legacy-emp-item ${isSelected ? 'active' : ''}" onclick="selectNikEmployee('${emp.nik}')">
            <div class="legacy-emp-name">${escapeHtml(emp.nama)} - ${escapeHtml(emp.nik)}</div>
            <div class="legacy-emp-role">${escapeHtml(emp.jabatan)}</div>
          </div>
        `;
      }).join('') : `
        <div style="padding: 16px; text-align: center; color: #94A3B8; font-size: 13px;">
          Data pegawai dengan NIK/nama "${escapeHtml(modalState.searchNikQuery)}" tidak ditemukan.
        </div>
      `}
    </div>
  ` : '';

  // Employee details fields (visible when selected, matching media_1792428521488_a6fe2569.png)
  const employeeDetailsHtml = selectedEmployee ? `
    <div class="modal-floating-field" style="margin-bottom: 0;">
      <label class="modal-floating-label">Nama Pegawai <span class="required-star">*</span></label>
      <input type="text" class="modal-floating-input" value="${escapeHtml(selectedEmployee.nama)}" readonly style="color: #475569;">
    </div>
    <div class="modal-floating-field" style="margin-bottom: 0;">
      <label class="modal-floating-label">Jabatan <span class="required-star">*</span></label>
      <input type="text" class="modal-floating-input" value="${escapeHtml(selectedEmployee.jabatan)}" readonly style="color: #475569;">
    </div>
    <div class="modal-floating-field" style="margin-bottom: 0;">
      <label class="modal-floating-label">Unit Kerja <span class="required-star">*</span></label>
      <input type="text" class="modal-floating-input" value="${escapeHtml(selectedEmployee.unitKerja)}" readonly style="color: #475569;">
    </div>
    <div class="modal-floating-field" style="margin-bottom: 0;">
      <label class="modal-floating-label">Perusahaan <span class="required-star">*</span></label>
      <input type="text" class="modal-floating-input" value="${escapeHtml(selectedEmployee.perusahaan)}" readonly style="color: #475569;">
    </div>
    <div class="legacy-info-note">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      <span>Pastikan data pegawai sudah sesuai sebelum menyimpan mapping.</span>
    </div>
  ` : `
    <div class="legacy-info-note">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      <span>Masukkan NIK untuk mencari data pegawai Sentra. Jika ditemukan, sistem akan menampilkan data pegawai sebelum mapping disimpan.</span>
    </div>
  `;

  // Display value for NIK input
  let nikInputValue = '';
  if (modalState.isDropdownOpen && modalState.searchNikQuery !== '') {
    nikInputValue = modalState.searchNikQuery;
  } else if (selectedEmployee) {
    nikInputValue = selectedEmployee.nik;
  }

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleLegacyModalOverlayClick(event)">
      <div class="legacy-modal-box">
        <div class="legacy-modal-header">
          <h3>Hubungkan User Legacy dengan User Sentra</h3>
        </div>

        <div class="legacy-modal-body">
          <!-- Top Card: Akun DOF Lama -->
          <div class="legacy-card-dof">
            <div>
              <div class="legacy-card-dof-title">${escapeHtml(legacyUser.namaLegacy)}</div>
              <div class="legacy-card-dof-user">${escapeHtml(legacyUser.username)}</div>
            </div>
            <div class="legacy-badge-dof">Akun DOF Lama</div>
          </div>

          <!-- Dotted Divider with Link Icon -->
          <div class="legacy-divider">
            <div class="legacy-divider-line"></div>
            <div class="legacy-divider-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
          </div>

          <!-- NIK Pegawai Search / Dropdown Input -->
          <div class="legacy-select-wrap">
            <div class="modal-floating-field" style="margin-bottom: 0;" onclick="handleNikFieldClick(event)">
              <label class="modal-floating-label">NIK Pegawai <span class="required-star">*</span></label>
              <input type="text"
                     id="legacy-nik-input"
                     class="modal-floating-input"
                     placeholder="Masukkan NIK Pegawai"
                     value="${escapeHtml(nikInputValue)}"
                     oninput="handleNikSearchInput(this.value)"
                     onfocus="openNikDropdown()"
                     autocomplete="off">
              <span class="modal-floating-arrow" style="pointer-events: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
            </div>
            ${dropdownHtml}
          </div>

          <!-- Autofilled Employee Info or Guidance Notice -->
          ${employeeDetailsHtml}

          <!-- Modal Action Buttons -->
          <div class="legacy-modal-footer">
            <button type="button" class="btn-legacy-cancel" onclick="closeLegacyMappingModal()">
              Cancel
            </button>
            <button type="button"
                    class="btn-legacy-save"
                    ${!selectedEmployee ? 'disabled' : ''}
                    onclick="saveUserLegacyMapping()">
              Save Mapping
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Focus the input if in dropdown search mode
  if (modalState.isDropdownOpen) {
    const inputEl = document.getElementById('legacy-nik-input');
    if (inputEl) {
      inputEl.focus();
    }
  }
}

function handleLegacyModalOverlayClick(e) {
  if (e.target.classList.contains('modal-overlay')) {
    closeLegacyMappingModal();
  }
}

function closeLegacyMappingModal() {
  if (appState.mappingModal) {
    appState.mappingModal.isOpen = false;
    appState.mappingModal.isDropdownOpen = false;
  }
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}

function openNikDropdown() {
  if (!appState.mappingModal) return;
  appState.mappingModal.isDropdownOpen = true;
  renderUserLegacyMappingModal();
}

function handleNikFieldClick(e) {
  if (e.target.tagName !== 'INPUT') {
    appState.mappingModal.isDropdownOpen = !appState.mappingModal.isDropdownOpen;
    renderUserLegacyMappingModal();
  }
}

function handleNikSearchInput(val) {
  if (!appState.mappingModal) return;
  appState.mappingModal.searchNikQuery = val;
  appState.mappingModal.isDropdownOpen = true;

  const employees = getSentraEmployeesList();
  const exactMatch = employees.find(e => e.nik.toLowerCase() === val.trim().toLowerCase());
  if (exactMatch) {
    appState.mappingModal.selectedNik = exactMatch.nik;
  } else if (val.trim() === '') {
    appState.mappingModal.selectedNik = '';
  }

  renderUserLegacyMappingModal();
}

function selectNikEmployee(nik) {
  if (!appState.mappingModal) return;
  appState.mappingModal.selectedNik = nik;
  appState.mappingModal.searchNikQuery = '';
  appState.mappingModal.isDropdownOpen = false;
  renderUserLegacyMappingModal();
}

async function saveUserLegacyMapping() {
  const modalState = appState.mappingModal;
  if (!modalState || !modalState.legacyUserId || !modalState.selectedNik) return;

  const legacyList = getUserLegacyList();
  const empList = getSentraEmployeesList();

  const user = legacyList.find(u => u.id === modalState.legacyUserId);
  const emp = empList.find(e => e.nik === modalState.selectedNik);

  if (!user || !emp) return;

  user.statusIntegrasi = 'Terhubung';
  user.nik = emp.nik;
  user.namaSentra = emp.nama;
  user.jabatanSentra = emp.jabatan;
  user.unitKerjaSentra = emp.unitKerja;
  user.perusahaanSentra = emp.perusahaan;
  user.diperbaruiTanggal = '24 Juli 2026';
  user.diperbaruiOleh = 'SYSTEM';

  saveLocalCopy(appState.data);

  try {
    await fetch(`/api/user-legacy/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  } catch (e) {
    console.warn('Persist to /api/user-legacy failed:', e);
  }

  closeLegacyMappingModal();
  showToast(`Berhasil menghubungkan akun ${user.username} dengan ${emp.nama} (${emp.nik})!`);
  renderApp();
}

// ==========================================
// 12. MANAJEMEN GROUP MODULE
// ==========================================

function getManagementGroups() {
  if (!appState.data.managementGroups || !appState.data.managementGroups.length) {
    if (window.initialData && window.initialData.managementGroups) {
      appState.data.managementGroups = JSON.parse(JSON.stringify(window.initialData.managementGroups));
    } else {
      appState.data.managementGroups = [];
    }
  }
  return appState.data.managementGroups;
}

function saveManagementGroupsData(groups) {
  appState.data.managementGroups = groups;
  saveLocalCopy(appState.data);
  fetch('/api/management-groups', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(groups)
  }).catch(e => console.warn('Saved managementGroups locally'));
}

function initGroupExpandedState() {
  if (!appState.expandedGroupIds) {
    // Only PI Group is expanded initially, revealing PT Pupuk Indonesia with collapsed chevron
    appState.expandedGroupIds = new Set(['grp-1']);
  }
}

function getAllDescendantGroupIds(groupId, allGroups) {
  const descendants = [];
  const directChildren = allGroups.filter(g => g.parentId === groupId);
  directChildren.forEach(child => {
    descendants.push(child.id);
    descendants.push(...getAllDescendantGroupIds(child.id, allGroups));
  });
  return descendants;
}

function toggleGroupExpand(id) {
  initGroupExpandedState();
  const allGroups = getManagementGroups();
  if (appState.expandedGroupIds.has(id)) {
    // Collapse: remove this id and all descendants so reopening only shows direct children
    appState.expandedGroupIds.delete(id);
    const descendants = getAllDescendantGroupIds(id, allGroups);
    descendants.forEach(dId => appState.expandedGroupIds.delete(dId));
  } else {
    // Expand ONLY this node (direct children will show collapsed by default)
    appState.expandedGroupIds.add(id);
  }
  renderApp();
}

function toggleGroupDense(val) {
  appState.groupDenseMode = Boolean(val);
  renderApp();
}

function onSearchGroupTable(query) {
  appState.groupSearchQuery = query;
  renderApp();
}

function openGroupFilterModal() {
  showToast('Fitur filter kategori grup & entitas anak perusahaan.');
}

function renderManajemenGroupView() {
  initGroupExpandedState();
  const groups = getManagementGroups();
  const denseClass = appState.groupDenseMode ? 'dense' : '';
  const searchQuery = (appState.groupSearchQuery || '').toLowerCase().trim();

  return `
    <div class="page-header" style="margin-bottom: 16px;">
      <div class="page-title-area">
        <h2 style="font-size: 22px; font-weight: 700; color: #101828; margin: 0 0 4px 0;">Manajemen Group</h2>
        <div style="font-size: 13px; color: #667085;">Manajemen</div>
      </div>
    </div>

    <!-- Search & Filter Bar (Matching Screenshot) -->
    <div class="group-toolbar">
      <div class="group-search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#98A2B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          class="group-search-input" 
          id="group-search-input"
          placeholder="Cari Grup/Details/Jumlah Grup Turunan/Jumlah User..."
          value="${escapeHtml(appState.groupSearchQuery || '')}"
          oninput="onSearchGroupTable(this.value)"
        />
      </div>
      <button class="btn-group-filter" onclick="openFilterDrawer('manajemen-group')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        Filter
        ${appState.groupFilterType !== 'all' ? '<span class="filter-btn-active-dot"></span>' : ''}
      </button>
    </div>

    <!-- Cascading Tree Table -->
    <div class="group-table-card">
      <div style="overflow-x: auto;">
        <table class="group-table ${denseClass}">
          <thead>
            <tr class="group-table-head">
              <th style="width: 140px; padding-left: 20px;">Action</th>
              <th style="min-width: 180px;">Grup</th>
              <th style="min-width: 280px;">Details</th>
              <th style="width: 160px; text-align: center;">Jumlah Group turunan</th>
              <th style="width: 130px; text-align: center;">Jumlah User</th>
              <th style="width: 150px;">Diperbarui Tanggal</th>
              <th style="width: 150px;">Diperbarui oleh</th>
            </tr>
          </thead>
          <tbody>
            ${renderCascadingGroupHierarchy(groups, searchQuery)}
          </tbody>
        </table>
      </div>

      <!-- Table Footer / Dense Switch & Pagination -->
      <div class="group-table-footer">
        <label class="dense-toggle-label">
          <input type="checkbox" ${appState.groupDenseMode ? 'checked' : ''} onchange="toggleGroupDense(this.checked)">
          <span class="dense-toggle-slider"></span>
          <span style="font-size: 13px; font-weight: 500; color: #344054;">Dense</span>
        </label>

        <div class="group-pagination-controls">
          <span style="color: #667085; font-size: 13px;">Rows per page:</span>
          <select class="group-rows-per-page" onchange="showToast('Tampilan ' + this.value + ' baris')">
            <option value="10" selected>10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span style="color: #344054; font-size: 13px; margin: 0 12px;">7-7 of 7</span>
          <button class="group-page-nav-btn" disabled>&lt;</button>
          <button class="group-page-nav-btn" disabled>&gt;</button>
        </div>
      </div>
    </div>
  `;
}

function renderCascadingGroupHierarchy(groups, searchQuery) {
  const filterType = appState.groupFilterType || 'all';
  if (filterType !== 'all') {
    const filtered = groups.filter(g =>
      (g.name && g.name.toLowerCase().includes(filterType.toLowerCase())) ||
      (g.details && g.details.toLowerCase().includes(filterType.toLowerCase()))
    );
    if (!filtered.length) {
      return `<tr><td colspan="7" style="text-align: center; padding: 40px; color: #94A3B8;">Tidak ada grup yang sesuai dengan filter '${escapeHtml(filterType)}'.</td></tr>`;
    }
    return filtered.map(g => renderSingleGroupRow(g, 0, false, false)).join('');
  }

  if (searchQuery) {
    const filtered = groups.filter(g =>
      (g.name && g.name.toLowerCase().includes(searchQuery)) ||
      (g.details && g.details.toLowerCase().includes(searchQuery)) ||
      (g.diperbaruiOleh && g.diperbaruiOleh.toLowerCase().includes(searchQuery))
    );
    if (!filtered.length) {
      return `<tr><td colspan="7" style="text-align: center; padding: 40px; color: #94A3B8;">Tidak ada grup yang sesuai dengan pencarian.</td></tr>`;
    }
    return filtered.map(g => renderSingleGroupRow(g, 0, false, false)).join('');
  }

  // Hierarchical rendering matching screenshots
  const rootGroups = groups.filter(g => !g.parentId || g.parentId === 'root');
  let html = '';

  rootGroups.forEach(root => {
    html += renderGroupNodeAndChildren(root, groups, 0);
  });

  return html;
}

function getGroupSubHeaderHtml(depth) {
  // Cascading subheaders shifting by 1 cell per depth level matching design
  let blankBefore = depth + 1;
  let headers = [];

  if (depth === 0) {
    // Under PI Group: Action, Grup, Details, Jumlah Group turunan, Jumlah User
    headers = [
      { text: 'Action', width: '130px', align: 'left' },
      { text: 'Grup', width: 'auto', align: 'left' },
      { text: 'Details', width: 'auto', align: 'left' },
      { text: 'Jumlah Group turunan', width: '160px', align: 'center' },
      { text: 'Jumlah User', width: '130px', align: 'center' }
    ];
  } else if (depth === 1) {
    // Under PT Pupuk Indonesia: Action, Grup, Details, Jumlah Group turunan
    headers = [
      { text: 'Action', width: '130px', align: 'left' },
      { text: 'Grup', width: 'auto', align: 'left' },
      { text: 'Details', width: 'auto', align: 'left' },
      { text: 'Jumlah Group turunan', width: '160px', align: 'center' }
    ];
  } else if (depth === 2) {
    // Under Direktorat: Action, Grup, Details
    headers = [
      { text: 'Action', width: '130px', align: 'left' },
      { text: 'Grup', width: 'auto', align: 'left' },
      { text: 'Details', width: 'auto', align: 'left' }
    ];
  } else {
    blankBefore = 4;
    headers = [
      { text: 'Action', width: '130px', align: 'left' },
      { text: 'Grup', width: 'auto', align: 'left' },
      { text: 'Details', width: 'auto', align: 'left' }
    ];
  }

  const blankCellsBefore = Array(blankBefore).fill('<td class="group-sub-header-blank"></td>').join('');
  const headerCells = headers.map(h => `<th style="text-align: ${h.align}; width: ${h.width};">${h.text}</th>`).join('');
  const remainingCount = Math.max(0, 7 - blankBefore - headers.length);
  const blankCellsAfter = Array(remainingCount).fill('<td class="group-sub-header-blank"></td>').join('');

  return `
    <tr class="group-sub-header-row">
      ${blankCellsBefore}
      ${headerCells}
      ${blankCellsAfter}
    </tr>
  `;
}

function renderGroupNodeAndChildren(node, allGroups, depth) {
  let html = '';
  const isExpanded = appState.expandedGroupIds && appState.expandedGroupIds.has(node.id);
  const children = allGroups.filter(g => g.parentId === node.id);

  html += renderSingleGroupRow(node, depth, isExpanded, children.length > 0);

  if (isExpanded) {
    // Render cascading sub-header if there are child groups
    if (children.length > 0) {
      html += getGroupSubHeaderHtml(depth);
      children.forEach(child => {
        html += renderGroupNodeAndChildren(child, allGroups, depth + 1);
      });
    }

    // Leaf node: only if children.length === 0 and node has users, render user table
    if (children.length === 0 && node.users && node.users.length > 0) {
      html += `
        <tr style="background: #F8FAFC;">
          <td colspan="7" style="padding: 12px 20px 16px ${24 + (depth + 1) * 28}px;">
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <div style="padding: 10px 16px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 12.5px; font-weight: 600; color: #344054; display: flex; justify-content: space-between; align-items: center;">
                <span>Daftar Anggota User – ${escapeHtml(node.details || node.name)} (${node.users.length} User)</span>
                <button class="btn btn-sm btn-primary" onclick="openTambahGroupTurunanModal('${node.id}')" style="font-size: 11.5px; padding: 4px 10px;">+ Tambah User</button>
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
                <thead>
                  <tr style="background: #F1F5F9; color: #475467; border-bottom: 1px solid #E2E8F0;">
                    <th style="padding: 8px 14px; text-align: left; width: 140px;">NIK</th>
                    <th style="padding: 8px 14px; text-align: left;">Nama Karyawan</th>
                    <th style="padding: 8px 14px; text-align: left;">Jabatan</th>
                    <th style="padding: 8px 14px; text-align: center; width: 100px;">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  ${node.users.map(u => {
                    const parts = (typeof u === 'string') ? u.split(' - ') : [u.nik, u.name, u.role];
                    const nik = parts[0] || '-';
                    const nama = parts[1] || '-';
                    const jabatan = parts[2] || '-';
                    return `
                      <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td style="padding: 8px 14px; font-family: monospace; color: #475467;">${escapeHtml(nik)}</td>
                        <td style="padding: 8px 14px; font-weight: 600; color: #1E293B;">${escapeHtml(nama)}</td>
                        <td style="padding: 8px 14px; color: #64748B;">${escapeHtml(jabatan)}</td>
                        <td style="padding: 8px 14px; text-align: center;">
                          <button class="btn-group-icon delete" title="Keluarkan dari grup" onclick="removeUserFromGroup('${node.id}', '${escapeHtml(nik)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      `;
    }
  }

  return html;
}

function renderSingleGroupRow(node, depth, isExpanded, hasChildren) {
  const isPiGroup = (depth === 0) || (node.id === 'grp-1') || (node.name === 'PI Group');
  const denseClass = appState.groupDenseMode ? 'dense' : '';
  const isLeaf = !hasChildren || (node.childCount === 0);
  const hasLeafActions = (depth >= 4) || (isLeaf && depth > 1);

  // Action buttons
  let actionButtonsHtml = '';

  // Pencil & Trash if leaf group (matching screenshot for (PHIC) All Risk Officer)
  if (hasLeafActions) {
    actionButtonsHtml += `
      <button class="btn-group-icon" title="Edit Grup" onclick="openEditGroupModal('${node.id}')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
      </button>
      <button class="btn-group-icon delete" title="Hapus Grup" onclick="confirmDeleteGroup('${node.id}', '${escapeHtml(node.details || node.name)}')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;
  }

  // [+] Tambah Group Turunan: ONLY for descendants after PI Group!
  if (!isPiGroup) {
    actionButtonsHtml += `
      <button class="btn-group-circle-add" title="Tambah Group Turunan" onclick="openTambahGroupTurunanModal('${node.id}')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    `;
  }

  // Chevron button (only if hasChildren or has users to expand)
  const canExpand = hasChildren || (node.users && node.users.length > 0);
  if (canExpand) {
    actionButtonsHtml += `
      <button class="btn-group-chevron ${isExpanded ? 'expanded' : ''}" title="${isExpanded ? 'Tutup' : 'Buka'}" onclick="toggleGroupExpand('${node.id}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform 0.2s;">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    `;
  }

  let cellsHtml = '';

  if (depth === 0) {
    // Depth 0: PI Group (7 standard columns)
    cellsHtml = `
      <td style="width: 140px; padding-left: 20px;">
        <div class="group-action-cell">${actionButtonsHtml}</div>
      </td>
      <td style="font-weight: 700; color: #101828;">${escapeHtml(node.name || '-')}</td>
      <td style="color: #475467;">${escapeHtml(node.details || '-')}</td>
      <td style="text-align: center; color: #344054;">${node.childCount !== undefined ? node.childCount : 100}</td>
      <td style="text-align: center; color: #344054;">${node.userCount !== undefined ? node.userCount : 100}</td>
      <td style="color: #64748B; font-size: 13px;">${escapeHtml(node.diperbaruiTanggal || '20 Juli 2026')}</td>
      <td style="color: #64748B; font-size: 13px;">${escapeHtml(node.diperbaruiOleh || 'Ragil Brilyan')}</td>
    `;
  } else if (depth === 1) {
    // Depth 1: PT Pupuk Indonesia (1 blank + Action + Grup + Details + ChildCount + UserCount + 1 blank = 7)
    cellsHtml = `
      <td class="group-cell-blank"></td>
      <td style="width: 140px;">
        <div class="group-action-cell">${actionButtonsHtml}</div>
      </td>
      <td style="font-weight: 600; color: #101828;">${escapeHtml(node.name || '-')}</td>
      <td style="color: #475467;">${escapeHtml(node.details || '-')}</td>
      <td style="text-align: center; color: #344054;">${node.childCount !== undefined ? node.childCount : 100}</td>
      <td style="text-align: center; color: #344054;">${node.userCount !== undefined ? node.userCount : 12131}</td>
      <td class="group-cell-blank"></td>
    `;
  } else if (depth === 2) {
    // Depth 2: Direktorat (2 blanks + Action + Grup + Details + ChildCount + 1 blank = 7)
    cellsHtml = `
      <td class="group-cell-blank"></td>
      <td class="group-cell-blank"></td>
      <td style="width: 140px;">
        <div class="group-action-cell">${actionButtonsHtml}</div>
      </td>
      <td style="font-weight: 600; color: #101828;">${escapeHtml(node.name || '-')}</td>
      <td style="color: #475467; max-width: 320px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${escapeHtml(node.details || '')}">
        ${escapeHtml(node.details || '-')}
      </td>
      <td style="text-align: center; color: #344054;">${node.childCount !== undefined ? node.childCount : 0}</td>
      <td class="group-cell-blank"></td>
    `;
  } else if (depth === 3) {
    // Depth 3: Kompartemen (3 blanks + Action + Grup + Details + 1 blank = 7)
    cellsHtml = `
      <td class="group-cell-blank"></td>
      <td class="group-cell-blank"></td>
      <td class="group-cell-blank"></td>
      <td style="width: 140px;">
        <div class="group-action-cell">${actionButtonsHtml}</div>
      </td>
      <td style="font-weight: 600; color: #101828;">${escapeHtml(node.name || '-')}</td>
      <td style="color: #475467; max-width: 320px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${escapeHtml(node.details || '')}">
        ${escapeHtml(node.details || '-')}
      </td>
      <td class="group-cell-blank"></td>
    `;
  } else {
    // Depth 4+: Dept DCS, Leaf Groups (4 blanks + Action + Grup + Details = 7)
    const blanks = Array(Math.min(depth, 4)).fill('<td class="group-cell-blank"></td>').join('');
    const showChildCount = (node.childCount !== undefined && node.childCount !== null);
    cellsHtml = `
      ${blanks}
      <td style="width: 140px;">
        <div class="group-action-cell">${actionButtonsHtml}</div>
      </td>
      <td style="font-weight: 500; color: ${node.name === '-' ? '#98A2B3' : '#101828'};">${escapeHtml(node.name || '-')}</td>
      <td style="color: #475467;">
        ${escapeHtml(node.details || '-')}
        ${showChildCount ? `<span style="float: right; margin-right: 16px; color: #344054;">${node.childCount}</span>` : ''}
      </td>
    `;
  }

  return `
    <tr class="group-table-row ${denseClass}">
      ${cellsHtml}
    </tr>
  `;
}


// -------------------------------------------------------------------------
// MODAL: TAMBAH GROUP TURUNAN (Matching Screenshots 3 & 4)
// -------------------------------------------------------------------------

function openTambahGroupTurunanModal(parentId) {
  const groups = getManagementGroups();
  const parentNode = parentId ? groups.find(g => g.id === parentId) : null;
  const parentName = parentNode ? (parentNode.name && parentNode.name !== '-' ? parentNode.name : parentNode.details) : 'PT Pupuk Indonesia';

  // Available users list from initialData
  const availableUsers = window.initialData?.availableGroupUsers || [
    { nik: '93052134', nama: 'Bima Rahadian', jabatan: 'Senior Developer Agrosolution' },
    { nik: '94071741', nama: 'A Nur Fadilla', jabatan: 'Admin Project Agrosolution' },
    { nik: '92083452', nama: 'Citra Dewi', jabatan: 'Marketing Specialist Agrosolution' },
    { nik: '94112789', nama: 'Dedi Santoso', jabatan: 'UI/UX Designer Agrosolution' },
    { nik: '95021243', nama: 'Eka Putri', jabatan: 'Quality Assurance Agrosolution' },
    { nik: '93102056', nama: 'Farhan Maulana', jabatan: 'Data Analyst Agrosolution' }
  ];

  appState.modalGroupState = {
    parentId: parentId || 'grp-2',
    parentName: parentName,
    selectedUsers: [],
    availableUsers: availableUsers,
    appliesToAll: true,
    isDropdownOpen: false,
    searchQuery: ''
  };

  renderGroupModal();
}

function renderGroupModal() {
  const state = appState.modalGroupState;
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const filteredCandidates = state.availableUsers.filter(u => {
    const isAlreadySelected = state.selectedUsers.some(su => su.nik === u.nik);
    if (isAlreadySelected) return false;
    if (!state.searchQuery) return true;
    const q = state.searchQuery.toLowerCase();
    return u.nama.toLowerCase().includes(q) || u.nik.includes(q) || u.jabatan.toLowerCase().includes(q);
  });

  modalContainer.innerHTML = `
    <div class="modal-backdrop" onclick="closeGroupModal()"></div>
    <div class="modal-dialog" style="max-width: 600px; width: 92%; border-radius: 12px; padding: 28px 32px; background: #FFFFFF; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1050; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
      
      <!-- Modal Header -->
      <h3 style="font-size: 18px; font-weight: 700; color: #101828; margin: 0 0 24px 0;">
        Tambah Group Turunan – ${escapeHtml(state.parentName)}
      </h3>

      <!-- Field 1: Group Name -->
      <div class="group-floating-field">
        <fieldset class="group-fieldset">
          <legend>Group Name <span class="req">*</span></legend>
          <input type="text" id="group-name-input" class="group-fieldset-input" placeholder="Masukkan group name" value="${escapeHtml(state.name || '')}">
        </fieldset>
      </div>

      <!-- Field 2: Details -->
      <div class="group-floating-field">
        <fieldset class="group-fieldset">
          <legend>Details <span class="req">*</span></legend>
          <input type="text" id="group-details-input" class="group-fieldset-input" placeholder="Masukkan informasi grup lebih detail" value="${escapeHtml(state.details || '')}">
        </fieldset>
      </div>

      <!-- Field 3: Tambah User dalam Group (Chips + Search Dropdown) -->
      <div class="group-floating-field" style="margin-bottom: 8px; position: relative;">
        <fieldset class="group-fieldset" onclick="focusGroupSearchInput(event)">
          <legend>Tambah User dalam Group</legend>
          
          <div class="group-chips-container">
            ${state.selectedUsers.map(u => `
              <span class="group-user-chip">
                <span>${escapeHtml(u.nik)} - ${escapeHtml(u.nama)} - ${escapeHtml(u.jabatan)}</span>
                <span class="group-user-chip-remove" onclick="event.stopPropagation(); removeUserFromModal('${escapeHtml(u.nik)}')">&times;</span>
              </span>
            `).join('')}

            <input 
              type="text" 
              id="group-user-search-input"
              class="group-user-input" 
              placeholder="${state.selectedUsers.length ? '' : 'Cari nama, NIK, atau jabatan'}"
              value="${escapeHtml(state.searchQuery || '')}"
              onfocus="setGroupDropdown(true)"
              oninput="onSearchCandidateUsers(this.value)"
            />
          </div>
        </fieldset>

        <!-- Dropdown Search Candidates (Matching Screenshot 4) -->
        ${state.isDropdownOpen ? `
          <div class="group-user-dropdown">
            ${filteredCandidates.length > 0 ? filteredCandidates.map(u => `
              <div class="group-user-option" onclick="selectCandidateUser('${escapeHtml(u.nik)}')">
                <strong>${escapeHtml(u.nama)} - ${escapeHtml(u.nik)}</strong>
                <span>${escapeHtml(u.jabatan)}</span>
              </div>
            `).join('') : `
              <div style="padding: 12px 14px; font-size: 13px; color: #94A3B8; text-align: center;">Tidak ada kandidat user ditemukan</div>
            `}
          </div>
        ` : ''}
      </div>

      <!-- Helper text -->
      <div style="font-size: 12px; color: #667085; display: flex; align-items: center; gap: 6px; margin-bottom: 20px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#667085" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>User dapat ditambahkan sekarang atau setelah group dibuat.</span>
      </div>

      <!-- Scope Switch -->
      <div style="display: flex; align-items: flex-start; gap: 14px; margin-bottom: 28px;">
        <label class="dense-toggle-label" style="margin-top: 2px;">
          <input type="checkbox" id="group-scope-toggle" ${state.appliesToAll ? 'checked' : ''} onchange="toggleGroupScope(this.checked)">
          <span class="dense-toggle-slider"></span>
        </label>
        <div>
          <div style="font-size: 13.5px; font-weight: 600; color: #101828;">Berlaku untuk seluruh entitas di lingkungan PI Group</div>
          <div style="font-size: 12px; color: #667085; margin-top: 2px;">Aktifkan jika group ini dapat digunakan atau dilihat oleh anak perusahaan terkait.</div>
        </div>
      </div>

      <!-- Footer Buttons (Matching Image 3 & 4) -->
      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button type="button" class="btn btn-secondary" onclick="closeGroupModal()" style="padding: 10px 22px; font-weight: 600; border-radius: 8px;">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" onclick="submitCreateGroupTurunan()" style="padding: 10px 22px; font-weight: 600; border-radius: 8px; background: #101828; border-color: #101828; color: #FFFFFF;">
          Create Group
        </button>
      </div>

    </div>
  `;
}

function focusGroupSearchInput(e) {
  const input = document.getElementById('group-user-search-input');
  if (input) input.focus();
}

function setGroupDropdown(open) {
  if (appState.modalGroupState) {
    appState.modalGroupState.isDropdownOpen = open;
    renderGroupModal();
  }
}

function onSearchCandidateUsers(query) {
  if (appState.modalGroupState) {
    appState.modalGroupState.searchQuery = query;
    appState.modalGroupState.isDropdownOpen = true;
    renderGroupModal();
  }
}

function selectCandidateUser(nik) {
  if (!appState.modalGroupState) return;
  const user = appState.modalGroupState.availableUsers.find(u => u.nik === nik);
  if (user) {
    appState.modalGroupState.selectedUsers.push(user);
    appState.modalGroupState.searchQuery = '';
    appState.modalGroupState.isDropdownOpen = false;
    renderGroupModal();
  }
}

function removeUserFromModal(nik) {
  if (!appState.modalGroupState) return;
  appState.modalGroupState.selectedUsers = appState.modalGroupState.selectedUsers.filter(u => u.nik !== nik);
  renderGroupModal();
}

function toggleGroupScope(checked) {
  if (appState.modalGroupState) {
    appState.modalGroupState.appliesToAll = checked;
  }
}

function closeGroupModal() {
  appState.modalGroupState = null;
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}

function submitCreateGroupTurunan() {
  const state = appState.modalGroupState;
  if (!state) return;

  const nameInput = document.getElementById('group-name-input');
  const detailsInput = document.getElementById('group-details-input');

  const groupName = nameInput ? nameInput.value.trim() : '';
  const groupDetails = detailsInput ? detailsInput.value.trim() : '';

  if (!groupName) {
    showToast('Silakan isi Group Name terlebih dahulu.');
    if (nameInput) nameInput.focus();
    return;
  }

  const groups = getManagementGroups();
  const parentNode = groups.find(g => g.id === state.parentId);
  const newLevel = parentNode ? (parentNode.level + 1) : 1;

  const newGroupId = 'grp-' + Date.now().toString().slice(-4);
  const formattedUsers = state.selectedUsers.map(u => `${u.nik} - ${u.nama} - ${u.jabatan}`);

  const newGroup = {
    id: newGroupId,
    name: groupName,
    details: groupDetails || groupName,
    parentId: state.parentId,
    level: newLevel,
    childCount: 0,
    userCount: formattedUsers.length,
    diperbaruiTanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    diperbaruiOleh: 'Ragil Brilyan',
    appliesToAllEntities: state.appliesToAll,
    expanded: false,
    users: formattedUsers
  };

  // Update parent childCount
  if (parentNode) {
    parentNode.childCount = (parentNode.childCount || 0) + 1;
  }

  groups.push(newGroup);
  initGroupExpandedState();
  appState.expandedGroupIds.add(state.parentId);
  saveManagementGroupsData(groups);

  closeGroupModal();
  showToast(`Group turunan "${groupName}" berhasil dibuat.`);
  renderApp();
}

function confirmDeleteGroup(id, name) {
  if (confirm(`Apakah Anda yakin ingin menghapus grup "${name}" beserta turunannya?`)) {
    const groups = getManagementGroups();
    
    // Find all descendant IDs recursively
    const idsToDelete = new Set([id]);
    let added = true;
    while (added) {
      added = false;
      groups.forEach(g => {
        if (g.parentId && idsToDelete.has(g.parentId) && !idsToDelete.has(g.id)) {
          idsToDelete.add(g.id);
          added = true;
        }
      });
    }

    const updatedGroups = groups.filter(g => !idsToDelete.has(g.id));
    saveManagementGroupsData(updatedGroups);
    showToast(`Grup "${name}" berhasil dihapus.`);
    renderApp();
  }
}

function openEditGroupModal(id) {
  const groups = getManagementGroups();
  const node = groups.find(g => g.id === id);
  if (!node) return;

  const newName = prompt('Ubah Nama Grup:', node.name === '-' ? (node.details || '') : node.name);
  if (newName !== null && newName.trim()) {
    node.name = newName.trim();
    const newDetails = prompt('Ubah Keterangan / Details Grup:', node.details || '');
    if (newDetails !== null) {
      node.details = newDetails.trim();
    }
    node.diperbaruiTanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    saveManagementGroupsData(groups);
    showToast(`Grup berhasil diperbarui.`);
    renderApp();
  }
}

function removeUserFromGroup(groupId, nik) {
  const groups = getManagementGroups();
  const node = groups.find(g => g.id === groupId);
  if (!node || !node.users) return;

  node.users = node.users.filter(u => {
    if (typeof u === 'string') return !u.startsWith(nik);
    return u.nik !== nik;
  });
  node.userCount = node.users.length;
  saveManagementGroupsData(groups);
  showToast(`Anggota dengan NIK ${nik} dikeluarkan dari grup.`);
  renderApp();
}

// -------------------------------------------------------------------------
// MODAL: PILIH TUJUAN SURAT (DUAL TAB: MANAJEMEN GROUP & PEGAWAI PERORANGAN)
// -------------------------------------------------------------------------

function openSelectTujuanModal() {
  appState.tujuanModalActiveTab = appState.tujuanModalActiveTab || 'group';
  appState.tujuanModalSearch = '';
  renderTujuanModal();
}

function switchTujuanTab(tab) {
  appState.tujuanModalActiveTab = tab;
  renderTujuanModal();
}

function onSearchTujuan(val) {
  appState.tujuanModalSearch = val;
  renderTujuanModal();
}

function renderTujuanModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const activeTab = appState.tujuanModalActiveTab || 'group';
  const query = (appState.tujuanModalSearch || '').toLowerCase().trim();
  const groups = getManagementGroups();

  // Filter groups for tab 1
  const selectableGroups = groups.filter(g => {
    const text = `${g.name} ${g.details} ${g.parentId || ''}`.toLowerCase();
    return !query || text.includes(query);
  });

  // Filter employees for tab 2
  const employees = (window.initialData?.employees || []).filter(e => {
    const text = `${e.nama} ${e.nik} ${e.jabatan}`.toLowerCase();
    return !query || text.includes(query);
  });

  modalContainer.innerHTML = `
    <div class="modal-backdrop" onclick="closeTujuanModal()"></div>
    <div class="modal-dialog modal-fixed-scroll" style="max-width: 650px;">
      
      <!-- Top Fixed Header -->
      <div class="modal-fixed-header">
        <div>
          <h3 style="font-size: 17px; font-weight: 700; color: #101828; margin: 0 0 4px 0;">Pilih Tujuan Surat Keluar</h3>
          <p style="font-size: 12.5px; color: #64748B; margin: 0;">Pilih kelompok/organisasi dari Manajemen Group atau pegawai perorangan.</p>
        </div>
        <button class="modal-close-icon-btn" onclick="closeTujuanModal()">&times;</button>
      </div>

      <!-- Tab Navigation -->
      <div class="tujuan-tab-nav">
        <button class="tujuan-tab-btn ${activeTab === 'group' ? 'active' : ''}" onclick="switchTujuanTab('group')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Manajemen Group & Kelompok Khusus
        </button>
        <button class="tujuan-tab-btn ${activeTab === 'user' ? 'active' : ''}" onclick="switchTujuanTab('user')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Pegawai / Pejabat Perorangan
        </button>
      </div>

      <!-- Search Bar -->
      <div style="padding: 12px 24px; border-bottom: 1px solid #E2E8F0; background: #FFFFFF;">
        <input 
          type="text" 
          class="form-control" 
          placeholder="${activeTab === 'group' ? 'Cari grup, unit kerja, atau kompartemen...' : 'Cari nama pegawai, NIK, atau jabatan...'}"
          value="${escapeHtml(appState.tujuanModalSearch || '')}"
          oninput="onSearchTujuan(this.value)"
          style="width: 100%; border: 1px solid #D0D5DD; border-radius: 8px; padding: 8px 14px; font-size: 13px;"
        />
      </div>

      <!-- Scrollable List Content -->
      <div class="modal-fixed-body" style="padding: 16px 24px; max-height: 400px; overflow-y: auto;">
        ${activeTab === 'group' ? `
          <div style="font-size: 12px; font-weight: 600; color: #64748B; margin-bottom: 10px; text-transform: uppercase;">
            Kelompok Organisasi & Unit Kerja (${selectableGroups.length})
          </div>
          ${selectableGroups.map(g => {
            const displayName = (g.name && g.name !== '-') ? g.name : (g.details || 'Grup');
            const subDetail = (g.name && g.name !== '-') ? g.details : 'Semua Anggota Terdaftar';
            const memberCount = g.userCount || (g.users ? g.users.length : 0);

            return `
              <div class="tujuan-item-card">
                <div>
                  <div style="font-size: 14px; font-weight: 600; color: #101828; display: flex; align-items: center; gap: 8px;">
                    ${escapeHtml(displayName)}
                    <span style="font-size: 11px; background: #E8F7F0; color: #00875A; font-weight: 600; padding: 2px 8px; border-radius: 12px;">
                      ${memberCount} Anggota
                    </span>
                    ${g.appliesToAllEntities ? `<span style="font-size: 10.5px; background: #F0F9FF; color: #0284C7; padding: 2px 6px; border-radius: 10px;">Lintas PI Group</span>` : ''}
                  </div>
                  <div style="font-size: 12px; color: #64748B; margin-top: 3px;">
                    ${escapeHtml(subDetail || '-')}
                  </div>
                </div>
                <button class="btn btn-sm btn-primary" onclick="selectRecipientGroup('${g.id}')" style="font-size: 12px; padding: 6px 14px; border-radius: 6px;">
                  Pilih Grup
                </button>
              </div>
            `;
          }).join('')}
        ` : `
          <div style="font-size: 12px; font-weight: 600; color: #64748B; margin-bottom: 10px; text-transform: uppercase;">
            Daftar Pejabat & Pegawai (${employees.length})
          </div>
          ${employees.map(emp => `
            <div class="tujuan-item-card">
              <div>
                <div style="font-size: 14px; font-weight: 600; color: #101828;">
                  ${escapeHtml(emp.nama)}
                  <span style="font-size: 11px; color: #94A3B8; font-weight: 400; margin-left: 6px;">(${escapeHtml(emp.nik)})</span>
                </div>
                <div style="font-size: 12px; color: #64748B; margin-top: 3px;">
                  ${escapeHtml(emp.jabatan || 'Pejabat')}
                </div>
              </div>
              <button class="btn btn-sm btn-primary" onclick="selectRecipientEmployee('${emp.nik}')" style="font-size: 12px; padding: 6px 14px; border-radius: 6px;">
                Pilih Pejabat
              </button>
            </div>
          `).join('')}
        `}
      </div>

      <!-- Bottom Fixed Bar -->
      <div class="modal-fixed-footer" style="padding: 12px 24px; border-top: 1px solid #E2E8F0; display: flex; justify-content: flex-end;">
        <button type="button" class="btn btn-secondary" onclick="closeTujuanModal()" style="padding: 8px 18px; font-weight: 600; border-radius: 8px;">
          Tutup
        </button>
      </div>

    </div>
  `;
}

function selectRecipientGroup(groupId) {
  const groups = getManagementGroups();
  const group = groups.find(g => g.id === groupId);
  if (!group) return;

  const targetName = (group.name && group.name !== '-') ? group.name : (group.details || 'Grup');
  appState.customRecipient = {
    id: group.id,
    name: targetName,
    role: group.details || 'Grup Organisasi',
    isGroup: true
  };

  closeTujuanModal();
  showToast(`Tujuan surat ditetapkan ke kelompok: ${targetName}`);
  renderApp();
}

function selectRecipientEmployee(nik) {
  const emp = (window.initialData?.employees || []).find(e => e.nik === nik);
  if (!emp) return;

  appState.customRecipient = {
    id: emp.nik,
    name: emp.nama,
    role: emp.jabatan,
    isGroup: false
  };

  closeTujuanModal();
  showToast(`Tujuan surat ditetapkan ke: ${emp.nama}`);
  renderApp();
}

function closeTujuanModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}

// -------------------------------------------------------------------------
// FIELD TUJUAN QUICK SEARCH & DROPDOWN (Matching Screenshot 1)
// -------------------------------------------------------------------------

function focusTujuanSearchInput(e) {
  const input = document.getElementById('tujuan-quick-search-input');
  if (input) input.focus();
}

function setTujuanQuickDropdown(isOpen) {
  appState.isTujuanDropdownOpen = Boolean(isOpen);
  const container = document.getElementById('main-content-view');
  if (container && (appState.currentPage === 'buat-surat-baru' || appState.currentPage === 'detail-surat-keluar')) {
    container.innerHTML = renderBuatSuratBaruView();
    // Keep focus
    setTimeout(() => {
      const input = document.getElementById('tujuan-quick-search-input');
      if (input && isOpen) input.focus();
    }, 50);
  }
}

function onSearchTujuanQuick(query) {
  appState.tujuanQuickQuery = query;
  appState.isTujuanDropdownOpen = true;
  const listEl = document.getElementById('tujuan-quick-dropdown-list');
  if (listEl) {
    const candidates = getFilteredTujuanCandidates();
    listEl.innerHTML = candidates.map(c => `
      <div class="tujuan-quick-item" onclick="selectTujuanCandidate('${escapeHtml(c.nik)}')">
        <strong>${escapeHtml(c.nama)} - ${escapeHtml(c.nik)}</strong>
        <span>${escapeHtml(c.jabatan)}</span>
      </div>
    `).join('');
  }
}

function getFilteredTujuanCandidates() {
  const users = window.initialData?.availableGroupUsers || [
    { nik: '93052134', nama: 'Bima Rahadian', jabatan: 'Senior Developer Agrosolution' },
    { nik: '94071741', nama: 'A Nur Fadilla', jabatan: 'Admin Project Agrosolution' },
    { nik: '92083452', nama: 'Citra Dewi', jabatan: 'Marketing Specialist Agrosolution' },
    { nik: '94112789', nama: 'Dedi Santoso', jabatan: 'UI/UX Designer Agrosolution' },
    { nik: '95021243', nama: 'Eka Putri', jabatan: 'Quality Assurance Agrosolution' }
  ];

  const q = (appState.tujuanQuickQuery || '').toLowerCase().trim();
  if (!q) return users;
  return users.filter(u => 
    u.nama.toLowerCase().includes(q) || 
    u.nik.includes(q) || 
    u.jabatan.toLowerCase().includes(q)
  );
}

function selectTujuanCandidate(nik) {
  const users = window.initialData?.availableGroupUsers || [];
  const candidate = users.find(u => u.nik === nik);
  if (!candidate) return;

  appState.tujuanChips = appState.tujuanChips || [];
  appState.tujuanChips.push({
    id: candidate.nik,
    name: candidate.nama,
    role: candidate.jabatan,
    label: `${candidate.nik} - ${candidate.nama} - ${candidate.jabatan}`
  });

  appState.customRecipient = {
    id: candidate.nik,
    name: candidate.nama,
    role: candidate.jabatan,
    isGroup: false
  };

  appState.isTujuanDropdownOpen = false;
  appState.tujuanQuickQuery = '';
  showToast(`Penerima ${candidate.nama} ditambahkan.`);
  renderApp();
}

function removeTujuanChip(idx) {
  if (appState.tujuanChips && appState.tujuanChips.length > idx) {
    appState.tujuanChips.splice(idx, 1);
    if (!appState.tujuanChips.length) {
      appState.customRecipient = null;
    } else {
      const top = appState.tujuanChips[0];
      appState.customRecipient = {
        id: top.id,
        name: top.name,
        role: top.role,
        isGroup: Boolean(top.isGroup)
      };
    }
    showToast('Tujuan surat diperbarui.');
    renderApp();
  }
}

// -------------------------------------------------------------------------
// MODAL PILIH GROUP DARI MANAJEMEN GROUP (Matching Screenshot 2)
// -------------------------------------------------------------------------

function openPilihGroupModal() {
  if (!appState.pilihGroupState) {
    appState.pilihGroupState = {
      checkedNodes: new Set([
        'grp-2', // PT Pupuk Indonesia
        'grp-3', // Direktorat Utama
        'grp-5', // Kompartemen DDS
        'grp-6', // Dept DCS
        'user-94071741', // A Nur Fadilla
        'user-88112233', // Budi Santoso
        'user-92033456', // Citra Dewi
        'user-89214567', // Rizky Putra
        'user-90127654'  // Nina Safitri
      ]),
      expandedNodes: new Set(['grp-2', 'grp-3', 'grp-5', 'grp-6']),
      searchQuery: '',
      isExpandedMore: false
    };
  }
  renderPilihGroupModalContent();
}

function renderPilihGroupModalContent() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  const state = appState.pilihGroupState;
  const isExp = (id) => state.expandedNodes.has(id);
  const isChk = (id) => state.checkedNodes.has(id);

  modalContainer.innerHTML = `
    <div class="modal-backdrop" onclick="closePilihGroupModal()"></div>
    <div class="modal-dialog pilih-group-modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1050; padding: 24px; max-height: 88vh; display: flex; flex-direction: column;">
      
      <!-- Modal Header (Matching Screenshot 2) -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <h3 style="font-size: 18px; font-weight: 700; color: #101828; margin: 0;">Pilih Group</h3>
        <button class="modal-close-icon-btn" onclick="closePilihGroupModal()" style="background: none; border: none; font-size: 22px; cursor: pointer; color: #64748B; line-height: 1;">&times;</button>
      </div>

      <!-- Search Input -->
      <div style="position: relative; margin-bottom: 16px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#98A2B3" stroke-width="2" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          placeholder="Cari Group"
          value="${escapeHtml(state.searchQuery || '')}"
          oninput="onSearchPilihGroup(this.value)"
          style="width: 100%; border: 1px solid #D0D5DD; border-radius: 8px; padding: 9px 14px 9px 38px; font-size: 13.5px; outline: none;"
        />
      </div>

      <!-- Scrollable Group Tree (Matching Screenshot 2) -->
      <div style="flex: 1; overflow-y: auto; padding-right: 6px; margin-bottom: 20px;">
        
        <!-- Level 1: PT Pupuk Indonesia -->
        <div style="margin-bottom: 8px;">
          <div class="pilih-group-tree-row">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="cursor: pointer; display: inline-flex; align-items: center; color: #64748B;" onclick="togglePilihGroupNodeExpand('grp-2')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: ${isExp('grp-2') ? 'rotate(0deg)' : 'rotate(-90deg)'}; transition: transform 0.15s;"><polyline points="6 9 12 15 18 9"/></svg>
              </span>
              <input type="checkbox" class="pilih-group-checkbox" ${isChk('grp-2') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('grp-2')">
              <span style="font-size: 13.5px; font-weight: 600; color: #101828;">PT Pupuk Indonesia</span>
            </div>
          </div>

          ${isExp('grp-2') ? `
            <div style="padding-left: 28px; margin-top: 6px;">
              
              <!-- Level 2: Direktorat Utama -->
              <div style="margin-bottom: 6px;">
                <div class="pilih-group-tree-row">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="cursor: pointer; display: inline-flex; align-items: center; color: #64748B;" onclick="togglePilihGroupNodeExpand('grp-3')">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: ${isExp('grp-3') ? 'rotate(0deg)' : 'rotate(-90deg)'}; transition: transform 0.15s;"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                    <input type="checkbox" class="pilih-group-checkbox" ${isChk('grp-3') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('grp-3')">
                    <span style="font-size: 13.5px; font-weight: 500; color: #1E293B;">Direktorat Utama</span>
                  </div>
                </div>

                ${isExp('grp-3') ? `
                  <div style="padding-left: 28px; margin-top: 6px;">
                    
                    <!-- Level 3: Kompartemen DDS -->
                    <div style="margin-bottom: 6px;">
                      <div class="pilih-group-tree-row">
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <span style="cursor: pointer; display: inline-flex; align-items: center; color: #64748B;" onclick="togglePilihGroupNodeExpand('grp-5')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: ${isExp('grp-5') ? 'rotate(0deg)' : 'rotate(-90deg)'}; transition: transform 0.15s;"><polyline points="6 9 12 15 18 9"/></svg>
                          </span>
                          <input type="checkbox" class="pilih-group-checkbox" ${isChk('grp-5') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('grp-5')">
                          <span style="font-size: 13.5px; font-weight: 500; color: #1E293B;">Kompartemen DDS</span>
                        </div>
                      </div>

                      ${isExp('grp-5') ? `
                        <div style="padding-left: 28px; margin-top: 6px;">
                          
                          <!-- Level 4: Dept DCS (Matching Screenshot 2 with user count 👥 625) -->
                          <div style="margin-bottom: 6px;">
                            <div class="pilih-group-tree-row">
                              <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="cursor: pointer; display: inline-flex; align-items: center; color: #64748B;" onclick="togglePilihGroupNodeExpand('grp-6')">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: ${isExp('grp-6') ? 'rotate(0deg)' : 'rotate(-90deg)'}; transition: transform 0.15s;"><polyline points="6 9 12 15 18 9"/></svg>
                                </span>
                                <input type="checkbox" class="pilih-group-checkbox" ${isChk('grp-6') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('grp-6')">
                                <span style="font-size: 13.5px; font-weight: 500; color: #1E293B;">Dept DCS</span>
                              </div>
                              <div style="display: flex; align-items: center; gap: 5px; color: #64748B; font-size: 12.5px;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                <span>625</span>
                              </div>
                            </div>

                            <!-- Level 5: Users under Dept DCS (Matching Screenshot 2) -->
                            ${isExp('grp-6') ? `
                              <div style="padding-left: 32px; margin-top: 8px; display: flex; flex-direction: column; gap: 10px;">
                                
                                <!-- User 1 -->
                                <div style="display: flex; align-items: flex-start; gap: 10px;">
                                  <input type="checkbox" class="pilih-group-checkbox" style="margin-top: 2px;" ${isChk('user-94071741') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('user-94071741')">
                                  <div>
                                    <div style="font-size: 13px; font-weight: 600; color: #101828;">A Nur Fadilla - 94071741</div>
                                    <div style="font-size: 11.5px; color: #64748B;">94071741 &bull; Admin Project Agrosolution</div>
                                  </div>
                                </div>

                                <!-- User 2 -->
                                <div style="display: flex; align-items: flex-start; gap: 10px;">
                                  <input type="checkbox" class="pilih-group-checkbox" style="margin-top: 2px;" ${isChk('user-88112233') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('user-88112233')">
                                  <div>
                                    <div style="font-size: 13px; font-weight: 600; color: #101828;">Budi Santoso - 88112233</div>
                                    <div style="font-size: 11.5px; color: #64748B;">94071741 &bull; Admin Project Agrosolution</div>
                                  </div>
                                </div>

                                <!-- User 3 -->
                                <div style="display: flex; align-items: flex-start; gap: 10px;">
                                  <input type="checkbox" class="pilih-group-checkbox" style="margin-top: 2px;" ${isChk('user-92033456') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('user-92033456')">
                                  <div>
                                    <div style="font-size: 13px; font-weight: 600; color: #101828;">Citra Dewi - 92033456</div>
                                    <div style="font-size: 11.5px; color: #64748B;">94071741 &bull; Admin Project Agrosolution</div>
                                  </div>
                                </div>

                                <!-- User 4 -->
                                <div style="display: flex; align-items: flex-start; gap: 10px;">
                                  <input type="checkbox" class="pilih-group-checkbox" style="margin-top: 2px;" ${isChk('user-89214567') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('user-89214567')">
                                  <div>
                                    <div style="font-size: 13px; font-weight: 600; color: #101828;">Rizky Putra - 89214567</div>
                                    <div style="font-size: 11.5px; color: #64748B;">84736210 &bull; Senior Developer Agrosolution</div>
                                  </div>
                                </div>

                                <!-- User 5 -->
                                <div style="display: flex; align-items: flex-start; gap: 10px;">
                                  <input type="checkbox" class="pilih-group-checkbox" style="margin-top: 2px;" ${isChk('user-90127654') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('user-90127654')">
                                  <div>
                                    <div style="font-size: 13px; font-weight: 600; color: #101828;">Nina Safitri - 90127654</div>
                                    <div style="font-size: 11.5px; color: #64748B;">76381294 &bull; UI/UX Designer Agrosolution</div>
                                  </div>
                                </div>

                                <!-- Load 620 More Button (Matching Screenshot 2) -->
                                <div style="text-align: center; padding: 8px 0;">
                                  <button type="button" onclick="showToast('Memuat seluruh 620 anggota user Dept DCS...')" style="background: none; border: none; color: #00AD78; font-weight: 700; font-size: 12.5px; cursor: pointer;">
                                    Load 620 more
                                  </button>
                                </div>

                              </div>
                            ` : ''}

                          </div>

                        </div>
                      ` : ''}

                    </div>

                  </div>
                ` : ''}

              </div>

              <!-- Level 2: Direktorat Operasi (Matching Screenshot 2) -->
              <div style="margin-top: 6px;">
                <div class="pilih-group-tree-row">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="cursor: pointer; display: inline-flex; align-items: center; color: #64748B;" onclick="togglePilihGroupNodeExpand('grp-4')">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="transform: ${isExp('grp-4') ? 'rotate(0deg)' : 'rotate(-90deg)'}; transition: transform 0.15s;"><polyline points="6 9 12 15 18 9"/></svg>
                    </span>
                    <input type="checkbox" class="pilih-group-checkbox" ${isChk('grp-4') ? 'checked' : ''} onchange="togglePilihGroupNodeCheck('grp-4')">
                    <span style="font-size: 13.5px; font-weight: 500; color: #1E293B;">Direktorat Operasi</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 5px; color: #64748B; font-size: 12.5px;">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span>625</span>
                  </div>
                </div>
              </div>

            </div>
          ` : ''}

        </div>

      </div>

      <!-- Modal Footer (Matching Screenshot 2) -->
      <div style="display: flex; justify-content: flex-end; gap: 12px; padding-top: 16px; border-top: 1px solid #E2E8F0;">
        <button type="button" class="btn btn-secondary" onclick="closePilihGroupModal()" style="padding: 10px 22px; font-weight: 600; border-radius: 8px;">
          Cancel
        </button>
        <button type="button" class="btn btn-primary" onclick="submitPilihGroup()" style="padding: 10px 24px; font-weight: 600; border-radius: 8px; background: #00AD78; border-color: #00AD78; color: #FFFFFF;">
          Add Group
        </button>
      </div>

    </div>
  `;
}

function togglePilihGroupNodeCheck(id) {
  if (!appState.pilihGroupState) return;
  if (appState.pilihGroupState.checkedNodes.has(id)) {
    appState.pilihGroupState.checkedNodes.delete(id);
  } else {
    appState.pilihGroupState.checkedNodes.add(id);
  }
  renderPilihGroupModalContent();
}

function togglePilihGroupNodeExpand(id) {
  if (!appState.pilihGroupState) return;
  if (appState.pilihGroupState.expandedNodes.has(id)) {
    appState.pilihGroupState.expandedNodes.delete(id);
  } else {
    appState.pilihGroupState.expandedNodes.add(id);
  }
  renderPilihGroupModalContent();
}

function onSearchPilihGroup(query) {
  if (appState.pilihGroupState) {
    appState.pilihGroupState.searchQuery = query;
    renderPilihGroupModalContent();
  }
}

function submitPilihGroup() {
  const state = appState.pilihGroupState;
  if (!state) return;

  appState.tujuanChips = appState.tujuanChips || [];

  // Determine what was selected
  if (state.checkedNodes.has('grp-6')) {
    // Add Dept DCS Group
    const alreadyExists = appState.tujuanChips.some(c => c.id === 'grp-6');
    if (!alreadyExists) {
      appState.tujuanChips.push({
        id: 'grp-6',
        name: 'Dept DCS',
        role: 'Semua Karyawan DCS',
        isGroup: true,
        label: 'Dept DCS (Semua Karyawan DCS)'
      });
    }
    appState.customRecipient = {
      id: 'grp-6',
      name: 'Dept DCS',
      role: 'Semua Karyawan DCS',
      isGroup: true
    };
  } else if (state.checkedNodes.has('grp-5')) {
    appState.tujuanChips.push({
      id: 'grp-5',
      name: 'Kompartemen DDS',
      role: 'Kompartemen Digitalisasi & Data Science',
      isGroup: true,
      label: 'Kompartemen DDS'
    });
    appState.customRecipient = { id: 'grp-5', name: 'Kompartemen DDS', role: 'Kompartemen DDS', isGroup: true };
  } else {
    // Check if any specific user is selected
    const userMap = {
      'user-94071741': { id: '94071741', name: 'A Nur Fadilla', role: 'Admin Project Agrosolution' },
      'user-88112233': { id: '88112233', name: 'Budi Santoso', role: 'Admin Project Agrosolution' },
      'user-92033456': { id: '92033456', name: 'Citra Dewi', role: 'Admin Project Agrosolution' },
      'user-89214567': { id: '89214567', name: 'Rizky Putra', role: 'Senior Developer Agrosolution' },
      'user-90127654': { id: '90127654', name: 'Nina Safitri', role: 'UI/UX Designer Agrosolution' }
    };

    let addedCount = 0;
    Object.keys(userMap).forEach(key => {
      if (state.checkedNodes.has(key)) {
        const u = userMap[key];
        if (!appState.tujuanChips.some(c => c.id === u.id)) {
          appState.tujuanChips.push({
            id: u.id,
            name: u.name,
            role: u.role,
            label: `${u.id} - ${u.name} - ${u.role}`
          });
          addedCount++;
        }
      }
    });

    if (addedCount > 0) {
      const first = appState.tujuanChips[appState.tujuanChips.length - 1];
      appState.customRecipient = { id: first.id, name: first.name, role: first.role, isGroup: false };
    }
  }

  closePilihGroupModal();
  showToast('Grup / Anggota berhasil ditambahkan ke Tujuan.');
  renderApp();
}

function closePilihGroupModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
}


// 13. Generic Supporting / Master Data View
function renderGenericAdminView(pageKey) {
  const titles = {
    'tipe-surat': 'Manajemen Tipe Surat Dinas',
    'klasifikasi-surat': 'Manajemen Klasifikasi & Jadwal Retensi Arsip',
    'template-surat': 'Manajemen Template & Tata Naskah Standar',
    'permintaan-akses-surat': 'Permintaan Hak Akses Naskah Khusus',
    'daftar-referensi': 'Daftar Referensi & Singkatan Kedinasan',
    'kontak-eksternal': 'Buku Kontak Eksternal & Mitra Korporat'
  };

  const title = titles[pageKey] || 'Halaman Administrasi';

  return `
    <div class="page-header">
      <div class="page-title-area">
        <h2>${title}</h2>
        <p>Konfigurasi data rujukan dan kepatuhan administrasi sistem SENTRA Pupuk Indonesia.</p>
      </div>
      <div class="page-header-actions">
        <button class="btn btn-primary" onclick="showToast('Form penambahan data master dibuka.')">
          ${getIcon('plus', 16)} Tambah Rujukan
        </button>
      </div>
    </div>

    <div class="card">
      <div class="table-toolbar">
        <div class="search-input-box" style="width: 320px;">
          ${getIcon('search', 16)}
          <input type="text" placeholder="Cari data rujukan...">
        </div>
        <span class="badge badge-info">Master Reference Data</span>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama Rujukan / Subjek</th>
              <th>Deskripsi / Sifat</th>
              <th>Status</th>
              <th style="text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${(appState.data.tipeSuratList || []).map(item => `
              <tr>
                <td style="font-family: monospace; font-weight: 700; color: var(--primary-green);">${item.kode}</td>
                <td style="font-weight: 600;">${item.nama}</td>
                <td style="color: var(--secondary-text);">${item.deskripsi}</td>
                <td><span class="badge badge-success">${item.status}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm" onclick="showToast('Edit data ${item.nama}')">Ubah</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ---------------- DETAIL SURAT MASUK VIEW (EXACT REFERENCE MATCH) ---------------- //

function openDocDetail(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;
  appState.selectedDocId = docId;
  appState.activeDoc = doc;
  appState.currentPage = 'detail-surat-masuk';
  appState.activeDetailTab = 'isi-surat';
  appState.isPerihalExpanded = false;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDocHierarki(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;
  appState.selectedDocId = docId;
  appState.activeDoc = doc;
  appState.currentPage = 'detail-surat-masuk';
  appState.activeDetailTab = 'hierarki';
  appState.isPerihalExpanded = false;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchDetailTab(tabKey) {
  appState.activeDetailTab = tabKey;
  renderApp();
}

function togglePerihalAccordion() {
  appState.isPerihalExpanded = !appState.isPerihalExpanded;
  const content = document.getElementById('perihal-collapse-content');
  const chevron = document.getElementById('perihal-chevron');
  if (content && chevron) {
    if (appState.isPerihalExpanded) {
      content.style.display = 'block';
      chevron.classList.add('expanded');
    } else {
      content.style.display = 'none';
      chevron.classList.remove('expanded');
    }
  }
}

function toggleLampiranDense() {
  appState.isLampiranDense = !appState.isLampiranDense;
  const table = document.getElementById('lampiran-table-el');
  const checkbox = document.getElementById('lampiran-dense-checkbox');
  if (table) {
    if (appState.isLampiranDense) {
      table.classList.add('is-dense');
    } else {
      table.classList.remove('is-dense');
    }
  }
  if (checkbox) {
    checkbox.checked = appState.isLampiranDense;
  }
}

function downloadAttachment(fileName) {
  showToast(`Mengunduh file lampiran: ${fileName}`);
}

function renderDetailSuratMasukView() {
  const doc = (appState.data && appState.data.documents.find(d => d.id === appState.selectedDocId)) 
    || (appState.data && appState.data.documents[0]);

  if (!doc) {
    return `<div class="detail-page-container"><div class="empty-state"><h4>Dokumen Tidak Ditemukan</h4><button class="btn btn-primary" onclick="navigate('surat-masuk')">Kembali ke Surat Masuk</button></div></div>`;
  }

  const roleId = appState.currentRole;
  const prioritasClass = doc.prioritas === 'Sangat Segera' 
    ? 'badge-prioritas-sangat-segera' 
    : (doc.prioritas === 'Segera' ? 'badge-prioritas-segera' : 'badge-prioritas-biasa');

  // Lampiran list
  const lampiranList = (doc.lampiran && doc.lampiran.length > 0) 
    ? doc.lampiran 
    : [{ name: 'Surat Pengantar.pdf', tanggal: 'Senin, 26 April 2026, 11:40', oleh: doc.pengirim.split('-')[0].trim(), size: '1.8 MB' }];

  // Tabs HTML
  // Tabs HTML matching Reference media_1792428663935_a446e8c1.png & media_1792428693031_4be360c3.png
  const tabsHtml = `
    <div class="detail-tabs-nav">
      <button class="detail-tab-btn ${appState.activeDetailTab === 'isi-surat' ? 'active' : ''}" onclick="switchDetailTab('isi-surat')">
        Detail Surat
      </button>
      <button class="detail-tab-btn ${appState.activeDetailTab === 'tindak-lanjut' ? 'active' : ''}" onclick="switchDetailTab('tindak-lanjut')">
        Tindak Lanjut
      </button>
      <button class="detail-tab-btn ${appState.activeDetailTab === 'hierarki' ? 'active' : ''}" onclick="switchDetailTab('hierarki')">
        Hirarchy
      </button>
    </div>
  `;

  // Alert Banner
  const alertBannerHtml = doc.perluTindakLanjut ? `
    <div class="detail-alert-banner">
      <div class="detail-alert-icon">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="detail-alert-text">Surat ini memerlukan tindak lanjut.</div>
    </div>
  ` : '';

  // Collapsible Perihal Card
  const perihalCardHtml = `
    <div class="detail-perihal-card">
      <div class="detail-perihal-header" onclick="togglePerihalAccordion()">
        <div>
          <div class="detail-perihal-title-row">
            <span class="detail-perihal-label">Perihal: ${escapeHtml(doc.judul)}</span>
            <span class="detail-sifat-badge">${escapeHtml(doc.sifat || 'Terbatas')}</span>
          </div>
          <div class="detail-perihal-time">${escapeHtml(doc.waktu || 'Selasa, 27 April 2026, 11:41 (Diteruskan pada Rabu, 28 April 2026, 15.00)')}</div>
        </div>
        <div class="detail-accordion-chevron ${appState.isPerihalExpanded ? 'expanded' : ''}" id="perihal-chevron">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div class="detail-perihal-body" id="perihal-collapse-content" style="display: ${appState.isPerihalExpanded ? 'block' : 'none'};">
        <div class="detail-info-surat-box">
          <div class="detail-info-surat-title">Informasi Surat</div>
          <div class="detail-floating-field">
            <label class="detail-floating-label">No. Surat <span class="required-star">*</span></label>
            <div class="detail-floating-val">${escapeHtml(doc.nomorSurat || '07344/A/TI/P14/ET/2026')}</div>
          </div>
          <div class="detail-floating-field">
            <label class="detail-floating-label">Klasifikasi <span class="required-star">*</span></label>
            <div class="detail-floating-val">${escapeHtml(doc.klasifikasi || 'BL.01.04 (pilar Hukum dan Tata Kelola)')}</div>
          </div>
          <div class="detail-floating-grid">
            <div class="detail-floating-field" style="margin-bottom: 0;">
              <label class="detail-floating-label">Sifat <span class="required-star">*</span></label>
              <div class="detail-floating-val">${escapeHtml(doc.sifat || 'Terbatas')}</div>
            </div>
            <div class="detail-floating-field" style="margin-bottom: 0;">
              <label class="detail-floating-label">Kecepatan Tanggapan <span class="required-star">*</span></label>
              <div class="detail-floating-val">${escapeHtml(doc.prioritas || doc.kecepatanTanggapan || 'Biasa')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render Content based on active detail tab
  let tabContentHtml = '';
  if (appState.activeDetailTab === 'isi-surat') {
    tabContentHtml = renderDetailIsiSuratTab(doc, lampiranList);
  } else if (appState.activeDetailTab === 'tindak-lanjut') {
    tabContentHtml = renderDetailTindakLanjutTab(doc);
  } else if (appState.activeDetailTab === 'hierarki') {
    tabContentHtml = renderDetailHierarkiTab(doc);
  }

  // Sticky Bottom Action Bar
  const bottomBarHtml = renderDetailBottomBar(doc, roleId);

  return `
    <div class="detail-page-container">
      <!-- Header Section with Breadcrumb & Title -->
      <div class="detail-header-section">
        <h1 class="detail-page-title">Surat Masuk</h1>
        <div class="detail-breadcrumb">
          <a class="detail-breadcrumb-link" onclick="navigate('surat-masuk'); return false;">Daftar Surat Masuk</a>
          <span class="detail-breadcrumb-dot">•</span>
          <span class="detail-breadcrumb-current">Detail Surat</span>
        </div>
        <div style="margin-top: 10px;">
          <span class="${prioritasClass}">${doc.prioritas || 'Biasa'}</span>
        </div>
      </div>

      <!-- Navigation Tabs -->
      ${tabsHtml}

      <!-- Alert Banner (only on Detail Surat tab) -->
      ${appState.activeDetailTab === 'isi-surat' ? alertBannerHtml : ''}

      <!-- Collapsible Perihal Card (only on Detail Surat tab) -->
      ${appState.activeDetailTab === 'isi-surat' ? perihalCardHtml : ''}

      <!-- Tab View Body -->
      ${tabContentHtml}

      <!-- Sticky Action Bar (Forward, Reply, Approval actions) -->
      ${bottomBarHtml}
    </div>
  `;
}

function renderDetailIsiSuratTab(doc, lampiranList) {
  const isDenseClass = appState.isLampiranDense ? 'is-dense' : '';

  return `
    <!-- Document Viewer Card -->
    <div class="detail-viewer-card">
      <div class="detail-paper-canvas">
        <div class="detail-paper-sheet">
          <!-- Top Blue Header Banner Graphic -->
          <div class="paper-top-banner"></div>

          <!-- Official Letterhead -->
          <div class="paper-letterhead">
            <div style="display: flex; align-items: center; gap: 14px;">
              <svg width="46" height="46" viewBox="0 0 100 100" fill="none">
                <path d="M26 48 L54 26 M26 48 L54 70 M54 26 L78 46 M54 70 L78 46" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
                <circle cx="26" cy="48" r="14" fill="#00A651"/>
                <circle cx="54" cy="26" r="16" fill="#0083CA"/>
                <circle cx="54" cy="70" r="15" fill="#F37021"/>
                <circle cx="78" cy="46" r="13" fill="#FDB913"/>
              </svg>
              <div>
                <div style="font-size: 19px; font-weight: 900; color: #003B6F; letter-spacing: 0.8px; line-height: 1;">PUPUK</div>
                <div style="font-size: 19px; font-weight: 900; color: #003B6F; letter-spacing: 0.8px; line-height: 1.15;">INDONESIA</div>
                <div style="font-size: 8.5px; font-weight: 700; color: #4A6D8C; letter-spacing: 1.5px; margin-top: 1px;">HOLDING COMPANY</div>
              </div>
            </div>
            <div class="paper-title-right">ANTAR UNIT KERJA</div>
          </div>

          <!-- Letter Date -->
          <div class="paper-date-row">
            Jakarta, ${doc.tanggalTercipta === '27/04/2026' ? '27 April 2026' : (doc.tanggalTercipta || '27 April 2026')}
          </div>

          <!-- Metadata Key-Value Table -->
          <div class="paper-meta-table">
            <div class="paper-meta-row">
              <div class="paper-meta-label">Nomor</div>
              <div class="paper-meta-colon">:</div>
              <div class="paper-meta-value">${doc.nomorSurat}</div>
            </div>
            <div class="paper-meta-row">
              <div class="paper-meta-label">Sifat</div>
              <div class="paper-meta-colon">:</div>
              <div class="paper-meta-value">${doc.sifat || 'Terbatas'}</div>
            </div>
            <div class="paper-meta-row">
              <div class="paper-meta-label">Lampiran</div>
              <div class="paper-meta-colon">:</div>
              <div class="paper-meta-value">1 (satu) Berkas</div>
            </div>
            <div class="paper-meta-row">
              <div class="paper-meta-label">Kepada</div>
              <div class="paper-meta-colon">:</div>
              <div class="paper-meta-value">${doc.kepada || 'Seluruh Unit Kerja'}</div>
            </div>
            <div class="paper-meta-row">
              <div class="paper-meta-label">Dari</div>
              <div class="paper-meta-colon">:</div>
              <div class="paper-meta-value">${doc.pengirim}</div>
            </div>
            <div class="paper-meta-row">
              <div class="paper-meta-label">Hal</div>
              <div class="paper-meta-colon">:</div>
              <div class="paper-meta-value">${doc.judul}</div>
            </div>
          </div>

          <!-- Body Text (Matching exact reference screenshot memo) -->
          <div class="paper-body-content">
            <p><strong>Dengan hormat,</strong></p>
            <p>Sehubungan dengan komitmen Perusahaan untuk memperkuat transformasi digital, bersama ini kami informasikan bahwa inisiatif Rebuild Digital Office akan dilaksanakan sebagai bagian dari upaya peningkatan proses kerja digital di lingkungan Pupuk Indonesia.</p>
            <p>Inisiatif ini bertujuan untuk menyempurnakan proses bisnis berbasis digital, meningkatkan efisiensi operasional, mendukung integrasi data yang lebih baik, serta mendorong kolaborasi lintas unit kerja. Rebuild Digital Office akan mencakup pembaruan sistem, penyelarasan alur kerja, serta peningkatan kapabilitas pengguna agar selaras dengan kebutuhan bisnis saat ini dan ke depan.</p>
            <p>Informasi lebih lanjut mengenai tahapan pelaksanaan, ruang lingkup, dan peran masing-masing unit kerja akan disampaikan pada kesempatan berikutnya melalui koordinasi lebih lanjut.</p>
            <p>Demikian kami sampaikan. Atas perhatian dan dukungan seluruh Unit Kerja, kami ucapkan terima kasih.</p>
          </div>

          <!-- Verified Digital Stamp (if applicable) -->
          ${doc.stempelStatus === 'Terverifikasi' ? `
            <div style="margin-top: 36px; display: flex; justify-content: flex-end;">
              <div class="stamp-seal-badge" style="background: #F0FDF4; border: 1.5px solid #16A765; padding: 12px 18px; border-radius: 8px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A765" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <div style="text-align: left;">
                  <div style="font-weight: 700; color: #166534; font-size: 12px;">TERVERIFIKASI DIGITAL STAMP</div>
                  <div style="font-size: 11px; color: #15803D;">Sertifikat Elektronik BSrE &bull; Pupuk Indonesia</div>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Paper Footer Toolbar -->
      <div class="detail-paper-toolbar">
        <div class="detail-page-counter">Halaman 1 dari 1</div>
        <button class="btn-view-full" onclick="openDocFullView('${doc.id}')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
          View Full
        </button>
      </div>
    </div>

    <!-- Lampiran Section -->
    <div class="detail-lampiran-section">
      <h3 class="detail-lampiran-title">Lampiran</h3>
      <div class="detail-lampiran-card">
        <table class="lampiran-table ${isDenseClass}" id="lampiran-table-el">
          <thead>
            <tr>
              <th style="width: 45%;">File</th>
              <th style="width: 30%;">Dibuat Tanggal</th>
              <th style="width: 25%;">Dibuat Oleh</th>
            </tr>
          </thead>
          <tbody>
            ${lampiranList.map(lamp => `
              <tr>
                <td>
                  <div class="lampiran-file-cell" onclick="downloadAttachment('${lamp.name}')">
                    <div class="pdf-icon-badge">PDF</div>
                    <span>${lamp.name}</span>
                  </div>
                </td>
                <td style="color: #475467;">${lamp.tanggal || 'Senin, 26 April 2026, 11:40'}</td>
                <td style="color: #475467;">${lamp.oleh || doc.pengirim.split('-')[0].trim()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Lampiran Footer -->
        <div class="lampiran-footer-bar">
          <label class="lampiran-dense-toggle">
            <input type="checkbox" id="lampiran-dense-checkbox" ${appState.isLampiranDense ? 'checked' : ''} onchange="toggleLampiranDense()">
            <span class="custom-switch-slider"></span>
            <span>Dense</span>
          </label>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span>Rows per page: <strong>2</strong></span>
            <span>1-${lampiranList.length} of ${lampiranList.length}</span>
            <div style="display: flex; gap: 6px;">
              <button class="table-icon-btn" disabled style="opacity: 0.4;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="table-icon-btn" disabled style="opacity: 0.4;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Tindak Lanjut Tab (Exact Match with Reference media_1792428663935_a446e8c1.png & media_1792428693031_4be360c3.png)
function renderDetailTindakLanjutTab(doc) {
  const hasHistory = Array.isArray(doc.riwayatTindakLanjut) && doc.riwayatTindakLanjut.length > 0;

  let bodyContent = '';
  if (!hasHistory) {
    // Empty state matching Reference media_1792428663935_a446e8c1.png
    bodyContent = `
      <div class="tindak-lanjut-empty-card">
        <div class="tindak-lanjut-empty-illus">
          <svg width="88" height="72" viewBox="0 0 88 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14" y="8" width="60" height="52" rx="8" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1.5"/>
            <rect x="14" y="8" width="60" height="16" rx="8" fill="#F1F5F9"/>
            <circle cx="23" cy="16" r="2.5" fill="#94A3B8"/>
            <circle cx="30" cy="16" r="2.5" fill="#94A3B8"/>
            <circle cx="37" cy="16" r="2.5" fill="#94A3B8"/>
            <rect x="22" y="32" width="28" height="20" rx="4" fill="#CBD5E1"/>
            <rect x="54" y="32" width="12" height="4" rx="2" fill="#CBD5E1"/>
            <rect x="54" y="40" width="12" height="4" rx="2" fill="#CBD5E1"/>
            <rect x="54" y="48" width="8" height="4" rx="2" fill="#CBD5E1"/>
            <path d="M78 14L80 18L84 20L80 22L78 26L76 22L72 20L76 18Z" fill="#CBD5E1"/>
            <path d="M8 44L10 47L13 48.5L10 50L8 53L6 50L3 48.5L6 47Z" fill="#CBD5E1"/>
            <circle cx="48" cy="68" r="1.5" fill="#CBD5E1"/>
          </svg>
        </div>
        <h3 class="tindak-lanjut-empty-title">Riwayat tindak lanjut belum tersedia</h3>
        <p class="tindak-lanjut-empty-desc">
          Belum ada aktivitas tindak lanjut yang tercatat untuk surat ini. Catatan, disposisi, penerusan, atau surat tindak lanjut akan muncul di halaman ini.
        </p>
        <div style="margin-top: 24px;">
          <button type="button" class="btn-demo-tindak-lanjut" onclick="simulateRecipientTindakLanjut('${doc.id}')">
            + Simulasikan Tindak Lanjut Penerima (${getCurrentPersona().name.split(' ')[0]})
          </button>
        </div>
      </div>
    `;
  } else {
    // Timeline state matching Reference media_1792428693031_4be360c3.png
    bodyContent = `
      <div class="tindak-lanjut-timeline-card">
        <div class="tindak-lanjut-timeline">
          ${doc.riwayatTindakLanjut.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === doc.riwayatTindakLanjut.length - 1;
            return `
              <div class="tindak-lanjut-timeline-item">
                <div class="tindak-lanjut-timeline-left">
                  <span class="tindak-lanjut-dot ${isFirst ? 'active' : ''}"></span>
                  ${!isLast ? '<span class="tindak-lanjut-line"></span>' : ''}
                </div>
                <div class="tindak-lanjut-timeline-right">
                  <div class="tindak-lanjut-item-time">${escapeHtml(item.waktu)}</div>
                  <div class="tindak-lanjut-item-title">${escapeHtml(item.judul)}</div>
                  <div class="tindak-lanjut-item-actor">Oleh: ${escapeHtml(item.oleh)}</div>
                  ${item.catatan ? `<div class="tindak-lanjut-item-notes">${escapeHtml(item.catatan)}</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div style="margin-top: 20px; padding-top: 14px; border-top: 1px dashed #E2E8F0; display: flex; justify-content: flex-end;">
          <button type="button" class="btn-demo-reset-empty" onclick="resetRecipientTindakLanjut('${doc.id}')">
            Reset ke Empty State
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="tindak-lanjut-pane">
      <!-- 2 Floating Notched Fields matching Reference media_1792428663935_a446e8c1.png & media_1792428693031_4be360c3.png -->
      <div class="tindak-lanjut-header-grid">
        <div class="modal-floating-field" style="margin-bottom: 0; background: #FFFFFF;">
          <label class="modal-floating-label" style="color: #64748B; font-weight: 500;">Judul</label>
          <div style="font-size: 14px; color: #1E293B; font-weight: 500; padding: 2px 0;">${escapeHtml(doc.judul || 'Rebuild Digital Office')}</div>
        </div>
        <div class="modal-floating-field" style="margin-bottom: 0; background: #FFFFFF;">
          <label class="modal-floating-label" style="color: #64748B; font-weight: 500;">No</label>
          <div style="font-size: 14px; color: #1E293B; font-weight: 500; padding: 2px 0;">${escapeHtml(doc.nomorSurat || '07344/A/TI/P14/ET/2026')}</div>
        </div>
      </div>

      <!-- Main Body: Empty State or Timeline -->
      ${bodyContent}
    </div>
  `;
}

function simulateRecipientTindakLanjut(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;

  const persona = getCurrentPersona();
  const userName = persona.name || 'Dewi Lestari';
  const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';

  doc.riwayatTindakLanjut = [
    {
      waktu: nowStr,
      judul: 'Otomatis Closed by System',
      oleh: 'System'
    },
    {
      waktu: nowStr,
      judul: `Ditindak lanjuti tanpa surat oleh ${userName}`,
      oleh: userName
    }
  ];
  doc.statusTindakLanjut = 'Closed';
  saveLocalCopy(appState.data);
  showToast(`Tindak lanjut dari penerima surat (${userName}) berhasil dicatat!`);
  renderApp();
}

function resetRecipientTindakLanjut(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;

  doc.riwayatTindakLanjut = [];
  doc.statusTindakLanjut = 'Open';
  saveLocalCopy(appState.data);
  showToast('Riwayat tindak lanjut dikosongkan (Empty State).');
  renderApp();
}

function renderDetailHierarkiTab(doc) {
  return `
    <div class="detail-tab-pane">
      <div style="margin-bottom: 24px; border-bottom: 1px solid #E5EAEE; padding-bottom: 16px;">
        <h3 style="font-size: 17px; font-weight: 700; color: #101828;">Alur Hierarki & Persetujuan Dokumen</h3>
        <p style="font-size: 13px; color: #667085; margin-top: 2px;">Diagram urutan proses dari pembuat naskah hingga ke unit penerima.</p>
      </div>

      <!-- Flow Diagram -->
      <div class="hierarchy-flow-container">
        <!-- Node 1: Drafter -->
        <div class="hierarchy-node passed">
          <div class="hierarchy-node-icon">✓</div>
          <div class="hierarchy-node-card">
            <div>
              <div style="font-size: 11px; color: #16A765; font-weight: 700; text-transform: uppercase;">1. Konseptor (Drafter)</div>
              <strong style="font-size: 14px; color: #101828;">${doc.drafter.name}</strong>
              <div style="font-size: 12px; color: #667085;">${doc.drafter.unit}</div>
            </div>
            <span class="badge badge-success">Selesai Dibuat</span>
          </div>
        </div>

        <!-- Node 2: Reviewer -->
        <div class="hierarchy-node ${doc.status === 'Menunggu Review' ? 'active' : 'passed'}">
          <div class="hierarchy-node-icon">${doc.status === 'Menunggu Review' ? '⏳' : '✓'}</div>
          <div class="hierarchy-node-card">
            <div>
              <div style="font-size: 11px; color: ${doc.status === 'Menunggu Review' ? '#E99A17' : '#16A765'}; font-weight: 700; text-transform: uppercase;">2. Pemeriksa (Reviewer)</div>
              <strong style="font-size: 14px; color: #101828;">${doc.reviewer ? doc.reviewer.name : 'Siti Rahma'}</strong>
              <div style="font-size: 12px; color: #667085;">${doc.reviewer ? doc.reviewer.title : 'Senior Officer'}</div>
            </div>
            <span class="badge ${doc.status === 'Menunggu Review' ? 'badge-warning' : 'badge-success'}">
              ${doc.status === 'Menunggu Review' ? 'Sedang Ditelaah' : 'Disetujui'}
            </span>
          </div>
        </div>

        <!-- Node 3: Approver -->
        <div class="hierarchy-node ${doc.status === 'Menunggu Approval' ? 'active' : (['Perlu Verifikasi Stempel', 'Selesai'].includes(doc.status) ? 'passed' : '')}">
          <div class="hierarchy-node-icon">${doc.status === 'Menunggu Approval' ? '⏳' : (['Perlu Verifikasi Stempel', 'Selesai'].includes(doc.status) ? '✓' : '3')}</div>
          <div class="hierarchy-node-card">
            <div>
              <div style="font-size: 11px; color: ${doc.status === 'Menunggu Approval' ? '#E99A17' : '#667085'}; font-weight: 700; text-transform: uppercase;">3. Penandatangan (Approver)</div>
              <strong style="font-size: 14px; color: #101828;">${doc.approver ? doc.approver.name : 'Yetty Endarwati'}</strong>
              <div style="font-size: 12px; color: #667085;">${doc.approver ? doc.approver.title : 'SVP Digitalisasi & Data Science'}</div>
            </div>
            <span class="badge ${doc.status === 'Menunggu Approval' ? 'badge-warning' : (['Perlu Verifikasi Stempel', 'Selesai'].includes(doc.status) ? 'badge-success' : 'badge-neutral')}">
              ${doc.status === 'Menunggu Approval' ? 'Menunggu Tandatangan' : (['Perlu Verifikasi Stempel', 'Selesai'].includes(doc.status) ? 'Ditandatangani' : 'Menunggu Antrean')}
            </span>
          </div>
        </div>

        <!-- Node 4: Admin Stempel -->
        <div class="hierarchy-node ${doc.status === 'Perlu Verifikasi Stempel' ? 'active' : (doc.stempelStatus === 'Terverifikasi' ? 'passed' : '')}">
          <div class="hierarchy-node-icon">${doc.status === 'Perlu Verifikasi Stempel' ? '⏳' : (doc.stempelStatus === 'Terverifikasi' ? '✓' : '4')}</div>
          <div class="hierarchy-node-card">
            <div>
              <div style="font-size: 11px; color: ${doc.status === 'Perlu Verifikasi Stempel' ? '#E99A17' : '#667085'}; font-weight: 700; text-transform: uppercase;">4. Verifikasi Stempel CA (Admin Stempel)</div>
              <strong style="font-size: 14px; color: #101828;">Farah Nabila</strong>
              <div style="font-size: 12px; color: #667085;">Tata Usaha / Petugas Stempel Resmi</div>
            </div>
            <span class="badge ${doc.stempelStatus === 'Terverifikasi' ? 'badge-success' : (doc.status === 'Perlu Verifikasi Stempel' ? 'badge-warning' : 'badge-neutral')}">
              ${doc.stempelStatus === 'Terverifikasi' ? 'Stempel Terverifikasi' : (doc.status === 'Perlu Verifikasi Stempel' ? 'Menunggu Verifikasi' : 'Menunggu Antrean')}
            </span>
          </div>
        </div>

        <!-- Node 5: Penerima -->
        <div class="hierarchy-node ${doc.status === 'Selesai' || doc.perluTindakLanjut ? 'active' : ''}">
          <div class="hierarchy-node-icon">5</div>
          <div class="hierarchy-node-card">
            <div>
              <div style="font-size: 11px; color: #667085; font-weight: 700; text-transform: uppercase;">5. Distribusi / Penerima</div>
              <strong style="font-size: 14px; color: #101828;">${doc.kepada || 'Seluruh Unit Kerja'}</strong>
              <div style="font-size: 12px; color: #667085;">Penerima Naskah Dinas & Pelaksana Tindak Lanjut</div>
            </div>
            <span class="badge ${doc.statusTindakLanjut === 'Closed' ? 'badge-success' : 'badge-info'}">
              ${doc.statusTindakLanjut || 'Tindak Lanjut Aktif'}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderDetailBottomBar(doc, roleId) {
  const perms = getUserPermissions(roleId);
  let roleButtons = '';

  if (perms.isApprover && doc.status === 'Menunggu Approval') {
    roleButtons = `
      <button class="btn btn-danger" style="padding: 8px 18px;" onclick="promptApproverAction('${doc.id}', 'reject')">
        Tolak Naskah
      </button>
      <button class="btn btn-primary" style="background: #00AD78; border-color: #00AD78; padding: 8px 20px;" onclick="promptApproverAction('${doc.id}', 'approve')">
        ✓ Sahkan Persetujuan
      </button>
    `;
  } else if (perms.isReviewer && doc.status === 'Menunggu Review') {
    roleButtons = `
      <button class="btn btn-danger" style="padding: 8px 18px;" onclick="promptReviewAction('${doc.id}', 'revise')">
        Minta Revisi
      </button>
      <button class="btn btn-primary" style="background: #00AD78; border-color: #00AD78; padding: 8px 20px;" onclick="promptReviewAction('${doc.id}', 'approve')">
        ✓ Setujui & Teruskan
      </button>
    `;
  } else if (perms.isDrafter && (doc.status === 'Draft' || doc.status === 'Dikembalikan untuk Revisi' || doc.status === 'Draft (Revisi Diminta)')) {
    roleButtons = `
      <button class="btn btn-primary" style="background: #00AD78; border-color: #00AD78; padding: 8px 20px;" onclick="openBuatSuratBaru()">
        ${getIcon('edit', 16)} Edit Surat
      </button>
    `;
  } else if (perms.isAdminDOF && doc.status === 'Perlu Verifikasi Stempel') {
    roleButtons = `
      <button class="btn btn-primary" style="background: #00AD78; border-color: #00AD78; padding: 8px 20px;" onclick="executeStampVerification('${doc.id}')">
        ${getIcon('stamp', 16)} Bubuhkan Stempel Digital CA
      </button>
    `;
  }

  return `
    <div class="detail-sticky-action-bar">
      ${roleButtons}
      <button class="btn-detail-forward" onclick="openForwardModal('${doc.id}')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 14 20 9 15 4"></polyline>
          <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
        </svg>
        Forward
      </button>
      <button class="btn-detail-reply" onclick="openReplyModal('${doc.id}')">
        Reply
      </button>
    </div>
  `;
}

// Fullscreen Document Viewer Modal
function openDocFullView(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card" style="max-width: 900px; width: 95vw; height: 90vh; display: flex; flex-direction: column;">
        <div class="modal-header">
          <div>
            <div style="font-size: 11px; color: var(--secondary-text); font-weight: 600; text-transform: uppercase;">
              Tampilan Penuh Naskah &bull; ${doc.nomorSurat}
            </div>
            <h3 style="font-size: 16px; margin-top: 2px;">${doc.judul}</h3>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body" style="flex: 1; overflow-y: auto; background: #F4F5F7; padding: 24px; display: flex; justify-content: center;">
          <div class="detail-paper-sheet" style="box-shadow: 0 4px 20px rgba(0,0,0,0.1); width: 100%;">
            <div class="paper-top-banner"></div>
            <div class="paper-letterhead">
              <div style="display: flex; align-items: center; gap: 14px;">
                <svg width="46" height="46" viewBox="0 0 100 100" fill="none">
                  <path d="M26 48 L54 26 M26 48 L54 70 M54 26 L78 46 M54 70 L78 46" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
                  <circle cx="26" cy="48" r="14" fill="#00A651"/>
                  <circle cx="54" cy="26" r="16" fill="#0083CA"/>
                  <circle cx="54" cy="70" r="15" fill="#F37021"/>
                  <circle cx="78" cy="46" r="13" fill="#FDB913"/>
                </svg>
                <div>
                  <div style="font-size: 19px; font-weight: 900; color: #003B6F; letter-spacing: 0.8px; line-height: 1;">PUPUK</div>
                  <div style="font-size: 19px; font-weight: 900; color: #003B6F; letter-spacing: 0.8px; line-height: 1.15;">INDONESIA</div>
                  <div style="font-size: 8.5px; font-weight: 700; color: #4A6D8C; letter-spacing: 1.5px; margin-top: 1px;">HOLDING COMPANY</div>
                </div>
              </div>
              <div class="paper-title-right">ANTAR UNIT KERJA</div>
            </div>

            <div class="paper-date-row">
              Jakarta, ${doc.tanggalTercipta === '27/04/2026' ? '27 April 2026' : (doc.tanggalTercipta || '27 April 2026')}
            </div>

            <div class="paper-meta-table">
              <div class="paper-meta-row"><div class="paper-meta-label">Nomor</div><div class="paper-meta-colon">:</div><div class="paper-meta-value">${doc.nomorSurat}</div></div>
              <div class="paper-meta-row"><div class="paper-meta-label">Sifat</div><div class="paper-meta-colon">:</div><div class="paper-meta-value">${doc.sifat || 'Terbatas'}</div></div>
              <div class="paper-meta-row"><div class="paper-meta-label">Lampiran</div><div class="paper-meta-colon">:</div><div class="paper-meta-value">1 (satu) Berkas</div></div>
              <div class="paper-meta-row"><div class="paper-meta-label">Kepada</div><div class="paper-meta-colon">:</div><div class="paper-meta-value">${doc.kepada || 'Seluruh Unit Kerja'}</div></div>
              <div class="paper-meta-row"><div class="paper-meta-label">Dari</div><div class="paper-meta-colon">:</div><div class="paper-meta-value">${doc.pengirim}</div></div>
              <div class="paper-meta-row"><div class="paper-meta-label">Hal</div><div class="paper-meta-colon">:</div><div class="paper-meta-value">${doc.judul}</div></div>
            </div>

            <div class="paper-body-content">
              <p><strong>Dengan hormat,</strong></p>
              <p>Sehubungan dengan komitmen Perusahaan untuk memperkuat transformasi digital, bersama ini kami informasikan bahwa inisiatif Rebuild Digital Office akan dilaksanakan sebagai bagian dari upaya peningkatan proses kerja digital di lingkungan Pupuk Indonesia.</p>
              <p>Inisiatif ini bertujuan untuk menyempurnakan proses bisnis berbasis digital, meningkatkan efisiensi operasional, mendukung integrasi data yang lebih baik, serta mendorong kolaborasi lintas unit kerja. Rebuild Digital Office akan mencakup pembaruan sistem, penyelarasan alur kerja, serta peningkatan kapabilitas pengguna agar selaras dengan kebutuhan bisnis saat ini dan ke depan.</p>
              <p>Informasi lebih lanjut mengenai tahapan pelaksanaan, ruang lingkup, dan peran masing-masing unit kerja akan disampaikan pada kesempatan berikutnya melalui koordinasi lebih lanjut.</p>
              <p>Demikian kami sampaikan. Atas perhatian dan dukungan seluruh Unit Kerja, kami ucapkan terima kasih.</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Tutup</button>
          <button class="btn btn-primary" onclick="window.print()">Cetak / Ekspor PDF</button>
        </div>
      </div>
    </div>
  `;
}

// Forward Message Modal
const FORWARD_RECIPIENTS = [
  { id: 'fwd-1', name: 'Bima Rahadian', nip: '93052134', role: 'Senior Developer Agrosolution' },
  { id: 'fwd-2', name: 'A Nur Fadilla', nip: '94071741', role: 'Admin Project Agrosolution' },
  { id: 'fwd-3', name: 'Citra Dewi', nip: '92083452', role: 'Marketing Specialist Agrosolution' },
  { id: 'fwd-4', name: 'Dedi Santoso', nip: '94112789', role: 'UI/UX Designer Agrosolution' },
  { id: 'fwd-5', name: 'Eka Putri', nip: '95021243', role: 'Quality Assurance Agrosolution' },
  { id: 'fwd-6', name: 'Farhan Maulana', nip: '93102056', role: 'Data Analyst Agrosolution' },
  { id: 'fwd-7', name: 'Gita Lestari', nip: '94076123', role: 'Customer Support Agrosolution' }
];

function openForwardModal(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;

  appState.forwardState = {
    docId: docId,
    isDropdownOpen: false,
    selectedRecipients: [],
    catatan: ''
  };

  renderForwardModal();
}

function renderForwardModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;
  const fwd = appState.forwardState;
  const doc = appState.data.documents.find(d => d.id === fwd.docId);
  if (!doc) return;

  const hasSelected = fwd.selectedRecipients.length > 0;
  const isDropdownOpen = fwd.isDropdownOpen;

  // Recipients inside Tujuan box
  let recipientsContentHtml = '';
  if (!hasSelected) {
    if (isDropdownOpen) {
      recipientsContentHtml = `<span class="fwd-add-more" onclick="toggleForwardDropdown(event)">+ Pilih Tujuan</span>`;
    } else {
      recipientsContentHtml = `<span class="fwd-placeholder" onclick="toggleForwardDropdown(event)">Pilih Tujuan</span>`;
    }
  } else {
    recipientsContentHtml = fwd.selectedRecipients.map(r => `
      <div class="fwd-chip">
        <span>${escapeHtml(r.name)} - ${escapeHtml(r.role)}</span>
        <button type="button" class="fwd-chip-remove" onclick="removeForwardRecipient('${r.id}', event)" title="Hapus">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" fill="#A6F4C5"/>
            <path d="M12.5 7.5L7.5 12.5M7.5 7.5l5 5" stroke="#027A48" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `).join('') + `
      <span class="fwd-add-more" onclick="toggleForwardDropdown(event)">+ Pilih Tujuan</span>
    `;
  }

  // Right actions: clear all icon + chevron
  let rightActionsHtml = '';
  if (hasSelected || isDropdownOpen) {
    rightActionsHtml += `
      <span class="fwd-action-icon" onclick="clearAllForwardRecipients(event)" title="Hapus Semua">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    `;
  }

  if (isDropdownOpen) {
    rightActionsHtml += `
      <span class="fwd-action-icon" onclick="toggleForwardDropdown(event)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </span>
    `;
  } else if (hasSelected) {
    rightActionsHtml += `
      <span class="fwd-action-icon" onclick="toggleForwardDropdown(event)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    `;
  }

  // Dropdown list HTML
  let dropdownListHtml = '';
  if (isDropdownOpen) {
    dropdownListHtml = `
      <div class="fwd-dropdown-menu" id="fwd-dropdown-list" onclick="event.stopPropagation()">
        ${FORWARD_RECIPIENTS.map(r => {
          const isSelected = fwd.selectedRecipients.some(s => s.id === r.id);
          return `
            <div class="fwd-dropdown-item ${isSelected ? 'is-selected' : ''}" onclick="selectForwardRecipient('${r.id}', event)">
              <div class="fwd-item-name">${escapeHtml(r.name)} - ${escapeHtml(r.nip)}</div>
              <div class="fwd-item-role">${escapeHtml(r.role)}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Rich Text Editor Toolbar Icons
  const toolbarHtml = `
    <div class="fwd-editor-toolbar">
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('bold')" title="Bold">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('italic')" title="Italic">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="4" x2="10" y2="4"></line>
          <line x1="14" y1="20" x2="5" y2="20"></line>
          <line x1="15" y1="4" x2="9" y2="20"></line>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('underline')" title="Underline">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
          <line x1="4" y1="21" x2="20" y2="21"></line>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('insertUnorderedList')" title="Bullet List">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="9" y1="6" x2="20" y2="6"></line>
          <line x1="9" y1="12" x2="20" y2="12"></line>
          <line x1="9" y1="18" x2="20" y2="18"></line>
          <circle cx="4" cy="6" r="1.5" fill="currentColor"></circle>
          <circle cx="4" cy="12" r="1.5" fill="currentColor"></circle>
          <circle cx="4" cy="18" r="1.5" fill="currentColor"></circle>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('insertOrderedList')" title="Numbered List">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="10" y1="6" x2="21" y2="6"></line>
          <line x1="10" y1="12" x2="21" y2="12"></line>
          <line x1="10" y1="18" x2="21" y2="18"></line>
          <path d="M4 6h1v4"></path>
          <path d="M4 10h2"></path>
          <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('quote')" title="Quote / Indent">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('justifyLeft')" title="Align Left">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="21" y1="6" x2="3" y2="6"></line>
          <line x1="15" y1="12" x2="3" y2="12"></line>
          <line x1="17" y1="18" x2="3" y2="18"></line>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('createLink')" title="Link">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('insertImage')" title="Image">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('insertVideo')" title="Video">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
          <line x1="7" y1="2" x2="7" y2="22"></line>
          <line x1="17" y1="2" x2="17" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="2" y1="7" x2="7" y2="7"></line>
          <line x1="2" y1="17" x2="7" y2="17"></line>
          <line x1="17" y1="17" x2="22" y2="17"></line>
          <line x1="17" y1="7" x2="22" y2="7"></line>
        </svg>
      </button>
      <button type="button" class="fwd-toolbar-btn" onclick="formatForwardEditor('removeFormat')" title="Clear Formatting">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="4" x2="20" y2="20"></line>
          <path d="M6 4h12l-5.5 8"></path>
          <line x1="10" y1="16" x2="14" y2="16"></line>
          <line x1="12" y1="13" x2="12" y2="20"></line>
        </svg>
      </button>
    </div>
  `;

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="fwd-modal-card" onclick="handleForwardModalCardClick(event)">
        <h2 class="fwd-modal-title">Forward Message</h2>

        <!-- Field: Tujuan -->
        <div class="fwd-tujuan-field ${isDropdownOpen ? 'is-open' : ''}" onclick="toggleForwardDropdown(event)">
          <label class="fwd-tujuan-label">Tujuan <span class="required-star">*</span></label>
          <div class="fwd-tujuan-content">
            <svg class="fwd-user-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            ${recipientsContentHtml}
          </div>
          <div class="fwd-tujuan-actions">
            ${rightActionsHtml}
          </div>
          ${dropdownListHtml}
        </div>

        <!-- Field: Catatan Penerusan -->
        <div>
          <label class="fwd-catatan-label">Catatan Penerusan <span class="required-star">*</span></label>
          <div class="fwd-editor-box">
            ${toolbarHtml}
            <textarea class="fwd-editor-textarea" id="fwd-notes-input" placeholder="" oninput="handleForwardNotesInput(this.value)">${escapeHtml(fwd.catatan || '')}</textarea>
          </div>
          <div class="fwd-char-helper">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span id="fwd-char-count-text">Minimal 50 karakter</span>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="fwd-modal-footer">
          <button type="button" class="btn-fwd-cancel" onclick="closeModal()">Cancel</button>
          <button type="button" class="btn-fwd-submit" onclick="submitForwardMessage()">Forward Message</button>
        </div>
      </div>
    </div>
  `;
}

function handleForwardModalCardClick(event) {
  event.stopPropagation();
  if (appState.forwardState && appState.forwardState.isDropdownOpen) {
    const tujuanField = event.target.closest('.fwd-tujuan-field');
    if (!tujuanField) {
      appState.forwardState.isDropdownOpen = false;
      renderForwardModal();
    }
  }
}

function toggleForwardDropdown(event) {
  if (event) event.stopPropagation();
  appState.forwardState.isDropdownOpen = !appState.forwardState.isDropdownOpen;
  renderForwardModal();
}

function selectForwardRecipient(recipientId, event) {
  if (event) event.stopPropagation();
  const rec = FORWARD_RECIPIENTS.find(r => r.id === recipientId);
  if (!rec) return;

  const exists = appState.forwardState.selectedRecipients.some(r => r.id === recipientId);
  if (exists) {
    appState.forwardState.selectedRecipients = appState.forwardState.selectedRecipients.filter(r => r.id !== recipientId);
  } else {
    appState.forwardState.selectedRecipients.push(rec);
  }
  // Close dropdown on selection
  appState.forwardState.isDropdownOpen = false;
  renderForwardModal();
}

function removeForwardRecipient(recipientId, event) {
  if (event) event.stopPropagation();
  appState.forwardState.selectedRecipients = appState.forwardState.selectedRecipients.filter(r => r.id !== recipientId);
  renderForwardModal();
}

function clearAllForwardRecipients(event) {
  if (event) event.stopPropagation();
  appState.forwardState.selectedRecipients = [];
  appState.forwardState.isDropdownOpen = false;
  renderForwardModal();
}

function handleForwardNotesInput(val) {
  appState.forwardState.catatan = val;
  const countEl = document.getElementById('fwd-char-count-text');
  if (countEl) {
    const len = (val || '').length;
    if (len < 50) {
      countEl.textContent = `Minimal 50 karakter (${len}/50)`;
      countEl.style.color = '#667085';
    } else {
      countEl.textContent = `Minimal 50 karakter terpenuhi (${len} karakter)`;
      countEl.style.color = '#00AD78';
    }
  }
}

function formatForwardEditor(command) {
  const textarea = document.getElementById('fwd-notes-input');
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);

  let replacement = '';
  switch (command) {
    case 'bold':
      replacement = `**${selectedText || 'Teks Tebal'}**`;
      break;
    case 'italic':
      replacement = `*${selectedText || 'Teks Miring'}*`;
      break;
    case 'underline':
      replacement = `<u>${selectedText || 'Teks Garis Bawah'}</u>`;
      break;
    case 'insertUnorderedList':
      replacement = `\n• ${selectedText || 'Item daftar'}\n`;
      break;
    case 'insertOrderedList':
      replacement = `\n1. ${selectedText || 'Item nomor'}\n`;
      break;
    case 'quote':
      replacement = `\n> ${selectedText || 'Kutipan catatan'}\n`;
      break;
    case 'justifyLeft':
      replacement = selectedText;
      break;
    case 'createLink':
      replacement = `[${selectedText || 'Tautan'}](https://)`;
      break;
    case 'insertImage':
      replacement = `[Gambar: ${selectedText || 'Lampiran'}]`;
      break;
    case 'insertVideo':
      replacement = `[Video: ${selectedText || 'Media'}]`;
      break;
    case 'removeFormat':
      replacement = selectedText.replace(/[*_~`<>]/g, '');
      break;
    default:
      replacement = selectedText;
  }

  textarea.setRangeText(replacement, start, end, 'end');
  textarea.focus();
  handleForwardNotesInput(textarea.value);
}

function submitForwardMessage() {
  const fwd = appState.forwardState;
  const doc = appState.data.documents.find(d => d.id === fwd.docId);
  if (!doc) return;

  if (!fwd.selectedRecipients || fwd.selectedRecipients.length === 0) {
    showToast('Harap pilih minimal 1 tujuan penerusan surat.', true);
    return;
  }

  const catatanText = (fwd.catatan || '').trim();
  if (catatanText.length < 50) {
    showToast(`Catatan penerusan minimal 50 karakter (saat ini ${catatanText.length} karakter).`, true);
    return;
  }

  const recipientNames = fwd.selectedRecipients.map(r => r.name).join(', ');
  const now = new Date();
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const dayName = dayNames[now.getDay()];
  const dateNum = now.getDate();
  const monthName = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const nowFormatted = `${dayName}, ${dateNum} ${monthName} ${year}, ${hours}.${minutes}`;

  if (!doc.timeline) doc.timeline = [];
  doc.timeline.push({
    waktu: `${nowFormatted} WIB`,
    aktor: getCurrentPersona().name,
    peran: getCurrentPersona().roleLabel,
    aksi: `Diteruskan ke: ${recipientNames}`,
    catatan: catatanText
  });

  if (!doc.riwayatTindakLanjut) doc.riwayatTindakLanjut = [];
  doc.riwayatTindakLanjut.unshift({
    waktu: nowFormatted,
    judul: `Diteruskan ke: ${recipientNames}`,
    oleh: getCurrentPersona().name,
    catatan: catatanText
  });

  // Update subtitle waktu to reflect forwarding
  doc.waktu = `Selasa, 27 April 2026, 11:41 (Diteruskan pada ${nowFormatted})`;

  saveLocalCopy(appState.data);
  closeModal();
  showToast(`Pesan berhasil diteruskan ke ${recipientNames}!`);
  renderApp();
}

// Reply Modal Dialog
function openReplyModal(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card modal-md">
        <div class="modal-header">
          <div>
            <h3 style="font-size: 16px;">Balas Naskah (Reply)</h3>
            <p style="font-size: 12px; color: var(--secondary-text); margin-top: 2px;">Membalas kepada: ${doc.pengirim}</p>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">&times;</button>
        </div>
        <form onsubmit="submitReplyDoc(event, '${doc.id}')">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Perihal Balasan:</label>
              <input type="text" class="form-control" value="Re: ${doc.judul}" readonly style="background: #F9FAFB;">
            </div>
            <div class="form-group">
              <label class="form-label">Teks Tanggapan / Isi Balasan:</label>
              <textarea class="form-control" id="reply-message-input" rows="4" placeholder="Tuliskan tanggapan resmi atas naskah dinas ini..." required>Terima kasih atas informasinya. Unit kami telah menerima arahan terkait inisiatif Rebuild Digital Office dan siap berkoordinasi dalam tahapan implementasi.</textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Lampiran Balasan (Opsional):</label>
              <input type="file" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
            <button type="submit" class="btn btn-primary" style="background: #00AD78; border-color: #00AD78;">
              Kirim Balasan (Reply)
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function submitReplyDoc(event, docId) {
  event.preventDefault();
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;

  const message = document.getElementById('reply-message-input').value;
  const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';

  if (!doc.timeline) doc.timeline = [];
  doc.timeline.push({
    waktu: nowStr,
    aktor: getCurrentPersona().name,
    peran: getCurrentPersona().roleLabel,
    aksi: `Membalas Naskah (Reply)`,
    catatan: message
  });

  if (!doc.riwayatTindakLanjut) doc.riwayatTindakLanjut = [];
  doc.riwayatTindakLanjut.unshift({
    waktu: nowStr,
    judul: `Membalas Naskah oleh ${getCurrentPersona().name}`,
    oleh: getCurrentPersona().name,
    catatan: message
  });

  doc.statusTindakLanjut = 'In Progress';

  saveLocalCopy(appState.data);
  closeModal();
  showToast(`Balasan berhasil dikirim kepada ${doc.pengirim}!`);
  renderApp();
}

function submitTindakLanjutUpdate(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;

  const notesInput = document.getElementById('tindak-lanjut-catatan-input');
  const statusSelect = document.getElementById('tindak-lanjut-status-select');

  const notes = notesInput ? notesInput.value.trim() : '';
  const newStatus = statusSelect ? statusSelect.value : 'In Progress';
  const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';

  doc.statusTindakLanjut = newStatus;
  doc.tindakLanjutNote = notes;

  if (!doc.timeline) doc.timeline = [];
  doc.timeline.push({
    waktu: nowStr,
    aktor: getCurrentPersona().name,
    peran: getCurrentPersona().roleLabel,
    aksi: `Pembaruan Tindak Lanjut (${newStatus})`,
    catatan: notes || 'Status tindak lanjut diperbarui.'
  });

  saveLocalCopy(appState.data);
  showToast(`Status tindak lanjut berhasil diperbarui ke: ${newStatus}`);
  renderApp();
}

// ---------------- MODALS & WORKFLOWS ---------------- //

// Document Detail & Approval Workflow Modal
function openDocDetailModal(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;

  appState.activeDoc = doc;
  appState.activeDocModalTab = 'preview';

  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = renderDocDetailModalHtml(doc);
}

function renderDocDetailModalHtml(doc) {
  const persona = getCurrentPersona();
  const roleId = appState.currentRole;
  const isActionable = isDocActionableForRole(doc, roleId);

  return `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <div>
            <div style="font-size: 11px; color: var(--secondary-text); font-weight: 600; text-transform: uppercase;">
              Naskah Dinas Elektronik &bull; ${doc.jenisSurat}
            </div>
            <h3 style="font-size: 17px; margin-top: 2px;">${doc.nomorSurat}</h3>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">&times;</button>
        </div>

        <!-- Document Modal Tabs -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); padding: 0 24px; background: var(--subtle-surface);">
          <button class="btn btn-sm ${appState.activeDocModalTab === 'preview' ? 'btn-primary' : 'btn-secondary'}" style="border-bottom-left-radius: 0; border-bottom-right-radius: 0; margin-top: 8px;" onclick="switchDocTab('preview')">
            Isi Naskah & Pratinjau
          </button>
          <button class="btn btn-sm ${appState.activeDocModalTab === 'audit' ? 'btn-primary' : 'btn-secondary'}" style="border-bottom-left-radius: 0; border-bottom-right-radius: 0; margin-top: 8px;" onclick="switchDocTab('audit')">
            Jejak Audit & Riwayat (${doc.timeline ? doc.timeline.length : 0})
          </button>
        </div>

        <div class="modal-body" id="doc-modal-body">
          ${appState.activeDocModalTab === 'preview' ? renderDocPreviewTab(doc, persona, roleId) : renderDocAuditTab(doc)}
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Tutup</button>
          ${renderDocModalActionButtons(doc, roleId)}
        </div>
      </div>
    </div>
  `;
}

function switchDocTab(tabKey) {
  appState.activeDocModalTab = tabKey;
  const modalContainer = document.getElementById('modal-container');
  if (appState.activeDoc) {
    modalContainer.innerHTML = renderDocDetailModalHtml(appState.activeDoc);
  }
}

function renderDocPreviewTab(doc, persona, roleId) {
  return `
    <!-- Top Metadata Card -->
    <div style="background: var(--subtle-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; font-size: 12.5px;">
        <div>
          <span style="color: var(--secondary-text); display: block;">Perihal / Judul:</span>
          <strong style="color: var(--main-text); font-size: 13.5px;">${doc.judul}</strong>
        </div>
        <div>
          <span style="color: var(--secondary-text); display: block;">Drafter (Pembuat):</span>
          <strong>${doc.drafter.name}</strong> (${doc.drafter.unit})
        </div>
        <div>
          <span style="color: var(--secondary-text); display: block;">Reviewer Ditunjuk:</span>
          <strong>${doc.reviewer ? doc.reviewer.name : '-'}</strong>
        </div>
        <div>
          <span style="color: var(--secondary-text); display: block;">Approver (Pejabat Berwenang):</span>
          <strong>${doc.approver ? doc.approver.name : '-'}</strong>
        </div>
        <div>
          <span style="color: var(--secondary-text); display: block;">Tujuan / Penerima:</span>
          <strong>${doc.penerima ? doc.penerima.name : '-'}</strong>
        </div>
        <div>
          <span style="color: var(--secondary-text); display: block;">Sifat Dokumen:</span>
          <span class="badge ${doc.sifat === 'Amat Segera' || doc.sifat === 'Segera' ? 'badge-warning' : 'badge-neutral'}">${doc.sifat}</span>
        </div>
      </div>

      <!-- Stamp & Followup Status Badges -->
      <div style="display: flex; gap: 10px; margin-top: 14px; padding-top: 12px; border-top: 1px solid #E5EAEE; flex-wrap: wrap;">
        <div>
          <span style="font-size: 11px; color: var(--secondary-text);">Status Persetujuan:</span>
          <span class="badge badge-${doc.statusBadge}">${doc.status}</span>
        </div>
        ${doc.perluStempel ? `
          <div>
            <span style="font-size: 11px; color: var(--secondary-text);">Stempel Digital:</span>
            <span class="badge ${doc.stempelStatus === 'Terverifikasi' ? 'badge-success' : 'badge-warning'}">
              ${doc.stempelStatus}
            </span>
          </div>
        ` : ''}
        ${doc.perluTindakLanjut ? `
          <div>
            <span style="font-size: 11px; color: var(--secondary-text);">Tindak Lanjut Penerima:</span>
            <span class="badge ${doc.tindakLanjutStatus === 'Selesai Ditindaklanjuti' ? 'badge-success' : 'badge-info'}">
              ${doc.tindakLanjutStatus}
            </span>
          </div>
        ` : ''}
      </div>

      <!-- Verified Digital Stamp Box -->
      ${doc.stempelDetail && doc.stempelStatus === 'Terverifikasi' ? `
        <div style="margin-top: 14px; background: #F0FDF4; border: 1.5px dashed #16A765; border-radius: var(--radius-md); padding: 12px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 38px; height: 38px; background: #DCFCE7; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #16A765;">
              ${getIcon('stamp', 22)}
            </div>
            <div>
              <div style="font-weight: 700; color: #15803D; font-size: 13px;">Segel Stempel Digital Resmi Terverifikasi</div>
              <div style="font-size: 11.5px; color: #166534;">
                Provider: <strong>${doc.stempelDetail.provider}</strong> &bull; SN: <code style="font-family: monospace;">${doc.stempelDetail.serialNumber}</code>
              </div>
              <div style="font-size: 11px; color: #166534;">Diverifikasi oleh: ${doc.stempelDetail.verifikator} pada ${doc.stempelDetail.waktuVerifikasi}</div>
            </div>
          </div>
          <div>
            <span class="badge badge-success">CA Certified Valid</span>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Official Document Paper View -->
    <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 28px; background: #FFFFFF; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
      <!-- Letterhead (Kop Surat Resmi Pupuk Indonesia) -->
      <div style="text-align: center; border-bottom: 2px solid #26323F; padding-bottom: 14px; margin-bottom: 20px;">
        <h4 style="font-size: 16px; font-weight: 800; letter-spacing: 0.5px; color: var(--main-text); text-transform: uppercase;">
          PT PUPUK INDONESIA (PERSERO)
        </h4>
        <div style="font-size: 12px; color: var(--secondary-text);">
          Jl. Wijaya II No. 4, Melawai, Kebayoran Baru, Jakarta Selatan 12160 &bull; Telp. (021) 7234850
        </div>
        <div style="font-size: 13px; font-weight: 700; color: var(--primary-green); margin-top: 8px; text-transform: uppercase;">
          ${doc.jenisSurat}
        </div>
        <div style="font-size: 12px; font-family: monospace; color: var(--main-text);">
          Nomor: ${doc.nomorSurat}
        </div>
      </div>

      <!-- Letter Body Text -->
      <div style="line-height: 1.7; font-size: 13.5px; color: var(--main-text);">
        <p style="margin-bottom: 12px;"><strong>Kepada Yth:</strong> ${doc.penerima.name} &mdash; ${doc.penerima.unit}</p>
        <p style="margin-bottom: 12px;"><strong>Dari:</strong> ${doc.drafter.name} &mdash; ${doc.drafter.unit}</p>
        <p style="margin-bottom: 16px;"><strong>Perihal:</strong> ${doc.judul}</p>

        <div style="margin-bottom: 16px; text-align: justify; white-space: pre-line;">
          ${doc.ringkasan}
        </div>

        <p style="margin-bottom: 20px;">
          Demikian naskah dinas ini kami sampaikan untuk dapat ditindaklanjuti sesuai ketentuan yang berlaku di lingkungan PT Pupuk Indonesia (Persero).
        </p>

        <!-- Digital Signatures Mockup Block -->
        <div style="display: flex; justify-content: space-between; margin-top: 32px; padding-top: 16px; border-top: 1px dashed #E5EAEE;">
          <div style="text-align: center; width: 200px;">
            <div style="font-size: 11.5px; color: var(--secondary-text);">Diajukan oleh Drafter:</div>
            <div style="font-size: 11px; color: var(--success); font-weight: 600; margin: 8px 0;">[Digital Signature Valid]</div>
            <div style="font-weight: 700; font-size: 12.5px; color: var(--main-text);">${doc.drafter.name}</div>
            <div style="font-size: 11px; color: var(--secondary-text);">${doc.drafter.unit}</div>
          </div>

          ${doc.reviewer ? `
            <div style="text-align: center; width: 200px;">
              <div style="font-size: 11.5px; color: var(--secondary-text);">Diteliti oleh Reviewer:</div>
              <div style="font-size: 11px; color: ${['Menunggu Review', 'Draft'].includes(doc.status) ? 'var(--muted-text)' : 'var(--success)'}; font-weight: 600; margin: 8px 0;">
                ${['Menunggu Review', 'Draft'].includes(doc.status) ? '[Menunggu Telaah]' : '[Telah Diteliti & Disetujui]'}
              </div>
              <div style="font-weight: 700; font-size: 12.5px; color: var(--main-text);">${doc.reviewer.name}</div>
              <div style="font-size: 11px; color: var(--secondary-text);">${doc.reviewer.title}</div>
            </div>
          ` : ''}

          ${doc.approver ? `
            <div style="text-align: center; width: 200px;">
              <div style="font-size: 11.5px; color: var(--secondary-text);">Disahkan oleh Approver:</div>
              <div style="font-size: 11px; color: ${['Menunggu Review', 'Menunggu Approval', 'Draft'].includes(doc.status) ? 'var(--muted-text)' : 'var(--success)'}; font-weight: 600; margin: 8px 0;">
                ${['Menunggu Review', 'Menunggu Approval', 'Draft'].includes(doc.status) ? '[Menunggu Persetujuan]' : '[Digital Signature Certified]'}
              </div>
              <div style="font-weight: 700; font-size: 12.5px; color: var(--main-text);">${doc.approver.name}</div>
              <div style="font-size: 11px; color: var(--secondary-text);">${doc.approver.title}</div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>

    <!-- Attachments Section -->
    ${doc.lampiran && doc.lampiran.length > 0 ? `
      <div style="margin-top: 18px;">
        <div style="font-size: 12.5px; font-weight: 600; color: var(--main-text); margin-bottom: 8px;">Lampiran Berkas Pendukung:</div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          ${doc.lampiran.map(file => `
            <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--subtle-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 12px;">
              ${getIcon('fileText', 16)}
              <span style="font-weight: 500;">${file.name}</span>
              <span style="color: var(--secondary-text);">(${file.size})</span>
              <button class="btn btn-secondary btn-sm" style="height: 24px; padding: 0 6px; font-size: 11px;" onclick="showToast('Mengunduh ${file.name}...')">Unduh</button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Follow up report if exists -->
    ${doc.tindakLanjutNote ? `
      <div style="margin-top: 18px; background: #F0FBF7; border: 1px solid #A2E2D0; border-radius: var(--radius-md); padding: 14px;">
        <div style="font-weight: 700; color: var(--dark-green); font-size: 13px;">Laporan Tindak Lanjut Penerima (${doc.penerima.name}):</div>
        <div style="font-size: 12.5px; color: var(--main-text); margin-top: 4px;">${doc.tindakLanjutNote}</div>
      </div>
    ` : ''}
  `;
}

function renderDocAuditTab(doc) {
  const timeline = doc.timeline || [];

  return `
    <div style="padding: 10px 0;">
      <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 6px;">Jejak Audit Naskah Dinas (${doc.nomorSurat})</h4>
      <p style="font-size: 12.5px; color: var(--secondary-text); margin-bottom: 20px;">
        Traceability riwayat setiap status persetujuan, pembubuhan segel provider, dan pengiriman tindak lanjut.
      </p>

      <div class="timeline-container">
        ${timeline.map(item => `
          <div class="timeline-step">
            <div class="timeline-dot"></div>
            <div class="timeline-header">
              <span class="timeline-actor">${item.aktor}</span>
              <span class="timeline-role">${item.peran}</span>
              <span class="timeline-action">&bull; ${item.aksi}</span>
              <span class="timeline-time">${item.waktu}</span>
            </div>
            <div class="timeline-notes">${item.catatan}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Action buttons rendered inside modal based on PRD Persona Rules
function renderDocModalActionButtons(doc, roleId) {
  const perms = getUserPermissions(roleId);

  // 1. REVIEWER ACTION
  if (perms.isReviewer && doc.status === 'Menunggu Review') {
    return `
      <button class="btn btn-danger" onclick="promptReviewAction('${doc.id}', 'revise')">
        Minta Revisi
      </button>
      <button class="btn btn-primary" onclick="promptReviewAction('${doc.id}', 'approve')">
        ${getIcon('checkCircle', 16)} Setujui & Teruskan ke Approver
      </button>
    `;
  }

  // 2. APPROVER ACTION (Cannot edit content per PRD rule)
  if (perms.isApprover && doc.status === 'Menunggu Approval') {
    return `
      <button class="btn btn-danger" onclick="promptApproverAction('${doc.id}', 'reject')">
        Tolak Naskah
      </button>
      <button class="btn btn-primary" onclick="promptApproverAction('${doc.id}', 'approve')">
        ${getIcon('checkCircle', 16)} Sahkan Persetujuan (Approve)
      </button>
    `;
  }

  // 3. ADMIN STEMPEL ACTION (Verifies digital stamp via provider)
  if (perms.isAdminDOF && doc.status === 'Perlu Verifikasi Stempel') {
    return `
      <button class="btn btn-primary" onclick="executeStampVerification('${doc.id}')">
        ${getIcon('stamp', 16)} Verifikasi & Bubuhkan Stempel Digital
      </button>
    `;
  }

  // 4. TUJUAN / PENERIMA ACTION (Submit follow-up if required)
  if (perms.isRecipient && doc.status === 'Menunggu Tindak Lanjut') {
    return `
      <button class="btn btn-primary" onclick="promptFollowUpAction('${doc.id}')">
        ${getIcon('checkCircle', 16)} Kirim Laporan Tindak Lanjut
      </button>
    `;
  }

  // 5. DRAFTER ACTION ON DRAFT
  if (perms.isDrafter && (doc.status === 'Draft' || doc.status === 'Dikembalikan untuk Revisi' || doc.status === 'Draft (Revisi Diminta)')) {
    return `
      <button class="btn btn-primary" onclick="submitDraftForReview('${doc.id}')">
        ${getIcon('send', 16)} Ajukan Ulang untuk Review
      </button>
    `;
  }

  return '';
}

// Reviewer Action Modal Dialog
function promptReviewAction(docId, action) {
  const isApprove = action === 'approve';
  const notes = prompt(
    isApprove 
      ? 'Masukkan catatan telaah reviewer (opsional):' 
      : 'Masukkan alasan perbaikan / revisi untuk drafter:', 
    isApprove ? 'Telah ditelaah sesuai ketentuan operasional dan anggaran.' : 'Mohon perbaiki rincian pagu anggaran.'
  );

  if (notes === null) return; // user cancelled

  executeReviewSubmit(docId, action, notes);
}

async function executeReviewSubmit(docId, action, notes) {
  try {
    const res = await fetch(`/api/documents/${docId}/review`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        notes,
        actorName: getCurrentPersona().name
      })
    });
    if (!res.ok) throw new Error('API error');
    await fetchState();
  } catch (err) {
    localReview(docId, action, notes);
  }
  closeModal();
  showToast(action === 'approve' ? 'Review disetujui! Naskah diteruskan ke Approver (Hendro Wijaya).' : 'Permintaan revisi dikirimkan ke Drafter.');
}

function localReview(docId, action, notes) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;
  const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';
  if (action === 'approve') {
    doc.status = 'Menunggu Approval';
    doc.statusBadge = 'warning';
    doc.currentAssigneeRole = 'approver';
    doc.currentAssigneeName = doc.approver ? doc.approver.name : 'Hendro Wijaya';
    doc.timeline.push({
      waktu: nowStr,
      aktor: getCurrentPersona().name,
      peran: 'Reviewer',
      aksi: 'Review Disetujui (Reviewed)',
      catatan: notes || 'Telaah teknis dan anggaran telah disetujui. Diteruskan ke Approver.'
    });
  } else {
    doc.status = 'Draft (Revisi Diminta)';
    doc.statusBadge = 'danger';
    doc.currentAssigneeRole = 'drafter';
    doc.currentAssigneeName = doc.drafter.name;
    doc.timeline.push({
      waktu: nowStr,
      aktor: getCurrentPersona().name,
      peran: 'Reviewer',
      aksi: 'Minta Revisi Dokumen',
      catatan: notes || 'Perlu perbaikan rincian anggaran dan spesifikasi.'
    });
  }
  saveLocalCopy(appState.data);
  renderApp();
}

// Approver Action Modal Dialog
function promptApproverAction(docId, action) {
  const isApprove = action === 'approve';
  const notes = prompt(
    isApprove 
      ? 'Konfirmasi persetujuan pengesahan naskah dinas. Catatan Approver (opsional):' 
      : 'Masukkan alasan penolakan naskah dinas:', 
    isApprove ? 'Disetujui untuk diteruskan dan dibubuhkan stempel resmi kedinasan.' : 'Pagu anggaran belum sesuai dengan RKAP 2026.'
  );

  if (notes === null) return;

  executeApproverSubmit(docId, action, notes);
}

async function executeApproverSubmit(docId, action, notes) {
  try {
    const res = await fetch(`/api/documents/${docId}/approve`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        notes,
        actorName: getCurrentPersona().name
      })
    });
    if (!res.ok) throw new Error('API error');
    await fetchState();
  } catch (err) {
    localApprove(docId, action, notes);
  }
  closeModal();
  showToast(action === 'approve' ? 'Dokumen disahkan (Approved)! Status beralih ke: Perlu Verifikasi Stempel (Admin Stempel).' : 'Dokumen ditolak.');
}

function localApprove(docId, action, notes) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;
  const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';
  if (action === 'approve') {
    if (doc.perluStempel) {
      doc.status = 'Perlu Verifikasi Stempel';
      doc.statusBadge = 'warning';
      doc.currentAssigneeRole = 'admin_stempel';
      doc.currentAssigneeName = 'Farah Nabila (Admin Stempel)';
      doc.stempelStatus = 'Menunggu Verifikasi Stempel';
      doc.timeline.push({
        waktu: nowStr,
        aktor: getCurrentPersona().name,
        peran: 'Approver',
        aksi: 'Dokumen Disetujui (Approved)',
        catatan: (notes ? notes + ' - ' : '') + 'Tanda tangan digital disahkan. Diteruskan untuk pembubuhan stempel digital kedinasan.'
      });
    } else {
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
        aktor: getCurrentPersona().name,
        peran: 'Approver',
        aksi: 'Dokumen Disetujui (Approved)',
        catatan: notes || 'Dokumen disetujui tanpa perlu stempel kedinasan.'
      });
    }
  } else {
    doc.status = 'Ditolak (Rejected)';
    doc.statusBadge = 'danger';
    doc.currentAssigneeRole = null;
    doc.currentAssigneeName = '-';
    doc.timeline.push({
      waktu: nowStr,
      aktor: getCurrentPersona().name,
      peran: 'Approver',
      aksi: 'Dokumen Ditolak',
      catatan: notes || 'Pengajuan ditolak oleh Approver.'
    });
  }
  saveLocalCopy(appState.data);
  renderApp();
}

// Admin Stempel Verification Execution
async function executeStampVerification(docId) {
  showToast('Menghubungi Peruri Digital Security CA untuk pembubuhan stempel...');
  try {
    const res = await fetch(`/api/documents/${docId}/verify-stamp`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actorName: getCurrentPersona().name
      })
    });
    if (!res.ok) throw new Error('API error');
    await fetchState();
  } catch (err) {
    localVerifyStamp(docId);
  }
  closeModal();
  showToast('Stempel Digital Peruri resmi dibubuhkan! Kuota berkurang 1. Naskah dinas resmi diteruskan ke Tujuan/Penerima.');
}

function localVerifyStamp(docId) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;
  const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';
  const serialNo = 'PERURI-STMP-2026-' + Math.floor(10000000 + Math.random() * 90000000);
  doc.stempelStatus = 'Terverifikasi';
  doc.stempelDetail = {
    provider: 'Peruri Digital Security',
    verifikator: getCurrentPersona().name,
    serialNumber: serialNo,
    waktuVerifikasi: nowStr,
    statusVerifikasi: 'Valid & Tersegel Resmi (CA-Certified)'
  };
  if (appState.data.providers && appState.data.providers[0]) {
    appState.data.providers[0].kuotaStempel.terpakai += 1;
    appState.data.providers[0].kuotaStempel.sisa -= 1;
  }
  if (doc.perluTindakLanjut) {
    doc.status = 'Menunggu Tindak Lanjut';
    doc.statusBadge = 'info';
    doc.currentAssigneeRole = 'recipient';
    doc.currentAssigneeName = doc.penerima.name;
    doc.tindakLanjutStatus = 'Menunggu Laporan Tindak Lanjut dari Penerima';
  } else {
    doc.status = 'Selesai';
    doc.statusBadge = 'success';
    doc.currentAssigneeRole = null;
    doc.currentAssigneeName = 'Selesai';
  }
  doc.timeline.push({
    waktu: nowStr,
    aktor: getCurrentPersona().name,
    peran: 'Admin Stempel',
    aksi: 'Verifikasi Stempel Digital Berhasil',
    catatan: `Stempel kedinasan resmi dibubuhkan melalui Peruri Digital Security. SN: ${serialNo}. Kuota stempel terpakai terpotong 1.`
  });
  saveLocalCopy(appState.data);
  renderApp();
}

// Tujuan/Penerima Follow up submission
function promptFollowUpAction(docId) {
  const notes = prompt('Masukkan laporan tindak lanjut pelaksanaan naskah dinas:', 'Telah dilaksanakan koordinasi dengan Tim Anggaran & SAP FICO telah dialokasikan.');
  if (!notes) return;

  executeFollowUpSubmit(docId, notes);
}

async function executeFollowUpSubmit(docId, notes) {
  try {
    const res = await fetch(`/api/documents/${docId}/follow-up`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notes,
        actorName: getCurrentPersona().name
      })
    });
    if (!res.ok) throw new Error('API error');
    await fetchState();
  } catch (err) {
    localFollowUp(docId, notes);
  }
  closeModal();
  showToast('Laporan tindak lanjut berhasil dikirim! Dokumen berstatus Selesai.');
}

function localFollowUp(docId, notes) {
  const doc = appState.data.documents.find(d => d.id === docId);
  if (!doc) return;
  const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';
  doc.tindakLanjutNote = notes;
  doc.tindakLanjutStatus = 'Selesai Ditindaklanjuti';
  doc.status = 'Selesai';
  doc.statusBadge = 'success';
  doc.currentAssigneeRole = null;
  doc.currentAssigneeName = 'Selesai';
  doc.timeline.push({
    waktu: nowStr,
    aktor: getCurrentPersona().name,
    peran: 'Tujuan / Penerima',
    aksi: 'Laporan Tindak Lanjut Dikirim',
    catatan: notes
  });
  saveLocalCopy(appState.data);
  renderApp();
}


// Drafter submit draft
async function submitDraftForReview(docId) {
  try {
    const res = await fetch(`/api/documents/${docId}/review`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'approve',
        notes: 'Drafter telah memperbaiki draft dan mengajukan kembali ke Reviewer.',
        actorName: getCurrentPersona().name
      })
    });

    if (!res.ok) throw new Error('Failed to resubmit draft');
    closeModal();
    showToast('Draft diajukan ke Reviewer!');
    await fetchState();
  } catch (err) {
    showToast('Gagal mengajukan draft', true);
  }
}

// Create Document Modal (Buat Surat Baru)
function openCreateDocModal() {
  const modalContainer = document.getElementById('modal-container');
  const reviewers = appState.data.eligibleReviewers || [];
  const approvers = appState.data.eligibleApprovers || [];
  const recipients = appState.data.eligibleRecipients || [];

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card modal-lg">
        <div class="modal-header">
          <div>
            <div style="font-size: 11px; color: var(--secondary-text); font-weight: 600; text-transform: uppercase;">
              Naskah Dinas Elektronik
            </div>
            <h3 style="font-size: 17px; margin-top: 2px;">Buat Surat Baru (Create Document Flow)</h3>
          </div>
          <button class="modal-close-btn" onclick="closeModal()">&times;</button>
        </div>

        <div class="modal-body">
          <form id="create-doc-form" onsubmit="handleCreateDocSubmit(event)">
            <!-- Bagian 1: Informasi Surat -->
            <div style="font-weight: 700; font-size: 14px; color: var(--main-text); margin-bottom: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              1. Informasi Surat
            </div>

            <div class="form-group">
              <label class="form-label">Judul Naskah Dinas <span class="required">*</span></label>
              <input type="text" id="create-judul" class="form-control" placeholder="Contoh: Pengajuan Pengadaan Katalis Semester II 2026" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Jenis Surat <span class="required">*</span></label>
                <select id="create-jenis" class="form-control" required>
                  <option value="Nota Dinas">Nota Dinas</option>
                  <option value="Surat Keputusan">Surat Keputusan</option>
                  <option value="Memo Internal">Memo Internal</option>
                  <option value="Surat Edaran">Surat Edaran</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Klasifikasi Surat <span class="required">*</span></label>
                <select id="create-klasifikasi" class="form-control" required>
                  <option value="UM.01.02 - Pengadaan Barang & Jasa Operasional">UM.01.02 - Pengadaan Barang & Jasa Operasional</option>
                  <option value="DS.02.01 - Alokasi & Distribusi Pupuk Bersubsidi">DS.02.01 - Alokasi & Distribusi Pupuk Bersubsidi</option>
                  <option value="OT.01.00 - Kebijakan & Organisasi">OT.01.00 - Kebijakan & Organisasi</option>
                  <option value="KU.02.04 - Alokasi Capex & Investasi Pabrik">KU.02.04 - Alokasi Capex & Investasi Pabrik</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Template Naskah</label>
                <select id="create-template" class="form-control">
                  <option value="Format Standar Nota Dinas Pupuk Indonesia">Format Standar Nota Dinas Pupuk Indonesia</option>
                  <option value="Format Keputusan Direksi Pupuk Indonesia">Format Keputusan Direksi Pupuk Indonesia</option>
                  <option value="Format Standar Memo Internal Pupuk Indonesia">Format Standar Memo Internal Pupuk Indonesia</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Sifat Surat</label>
                <select id="create-sifat" class="form-control">
                  <option value="Biasa">Biasa</option>
                  <option value="Segera">Segera</option>
                  <option value="Amat Segera">Amat Segera</option>
                  <option value="Rahasia">Rahasia</option>
                </select>
              </div>
            </div>

            <!-- Bagian 2: Penerima & Approval (RBAC-enforced eligible lists) -->
            <div style="font-weight: 700; font-size: 14px; color: var(--main-text); margin: 20px 0 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              2. Penerima & Alur Persetujuan (RBAC-Eligible Person Selection)
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Pilih Reviewer (Peer Rule) <span class="required">*</span></label>
                <select id="create-reviewer" class="form-control" required>
                  ${reviewers.map(r => `<option value="${r.name}">${r.name} &mdash; ${r.title} (${r.unit})</option>`).join('')}
                </select>
                <div class="form-hint">Daftar dibatasi otomatis hanya untuk rekan kerja setara (Senior Officer).</div>
              </div>

              <div class="form-group">
                <label class="form-label">Pilih Approver (Manager/VP Rule) <span class="required">*</span></label>
                <select id="create-approver" class="form-control" required>
                  ${approvers.map(a => `<option value="${a.name}">${a.name} &mdash; ${a.title} (${a.unit})</option>`).join('')}
                </select>
                <div class="form-hint">Daftar dibatasi otomatis hanya untuk pejabat berwenang (VP/SVP).</div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Tujuan / Penerima Resmi <span class="required">*</span></label>
              <select id="create-penerima" class="form-control" required>
                ${recipients.map(rc => `<option value="${rc.name}">${rc.name} &mdash; ${rc.title} (${rc.unit})</option>`).join('')}
              </select>
            </div>

            <!-- Toggles -->
            <div class="checkbox-group">
              <input type="checkbox" id="create-perlu-tindak-lanjut" checked>
              <div class="checkbox-content">
                <h6>Perlu Tindak Lanjut Penerima (Follow-up Required)</h6>
                <p>Jika dicentang, penerima wajib menyampaikan laporan tindak lanjut setelah dokumen disetujui resmi.</p>
              </div>
            </div>

            <div class="checkbox-group">
              <input type="checkbox" id="create-perlu-stempel" checked>
              <div class="checkbox-content">
                <h6>Perlu Stempel Digital Kedinasan (Provider Certified Stamp)</h6>
                <p>Naskah akan diteruskan ke Admin Stempel untuk pembubuhan segel resmi Peruri setelah disetujui Approver.</p>
              </div>
            </div>

            <!-- Bagian 3: Isi Surat -->
            <div style="font-weight: 700; font-size: 14px; color: var(--main-text); margin: 20px 0 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              3. Isi Naskah Dinas
            </div>

            <div class="form-group">
              <label class="form-label">Isi Surat / Ringkasan Permohonan <span class="required">*</span></label>
              <textarea id="create-isi" class="form-control" rows="5" required>Sehubungan dengan kebutuhan operasional pabrik dan target produksi pupuk nasional, diajukan permohonan persetujuan rencana pengadaan dan alokasi sumber daya terkait dengan estimasi anggaran terlampir.</textarea>
            </div>

            <!-- Bagian 4: Lampiran -->
            <div style="font-weight: 700; font-size: 14px; color: var(--main-text); margin: 20px 0 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              4. Lampiran Dokumen
            </div>

            <div class="form-group">
              <label class="form-label">Unggah Berkas Pendukung (Simulasi)</label>
              <div style="padding: 16px; border: 2px dashed var(--border-color); border-radius: var(--radius-md); text-align: center; background: var(--subtle-surface);">
                ${getIcon('fileText', 24)}
                <div style="font-size: 13px; font-weight: 600; margin-top: 6px;">Dokumen_Pendukung_Justifikasi_2026.pdf</div>
                <div style="font-size: 11px; color: var(--secondary-text);">Otomatis terlampir (1.8 MB)</div>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
          <button class="btn btn-secondary" onclick="saveDocAsDraft()">Simpan sebagai Draft</button>
          <button class="btn btn-primary" onclick="submitCreateDocForm()">
            ${getIcon('send', 16)} Kirim untuk Review
          </button>
        </div>
      </div>
    </div>
  `;
}

function submitCreateDocForm() {
  const form = document.getElementById('create-doc-form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  executeCreateDocument('review');
}

function saveDocAsDraft() {
  executeCreateDocument('draft');
}

async function executeCreateDocument(action) {
  const judul = document.getElementById('create-judul').value || 'Dokumen Tanpa Judul';
  const jenisSurat = document.getElementById('create-jenis').value;
  const klasifikasi = document.getElementById('create-klasifikasi').value;
  const template = document.getElementById('create-template').value;
  const sifat = document.getElementById('create-sifat').value;
  const reviewerName = document.getElementById('create-reviewer').value;
  const approverName = document.getElementById('create-approver').value;
  const penerimaName = document.getElementById('create-penerima').value;
  const perluTindakLanjut = document.getElementById('create-perlu-tindak-lanjut').checked;
  const perluStempel = document.getElementById('create-perlu-stempel').checked;
  const ringkasan = document.getElementById('create-isi').value;

  const payload = {
    judul,
    jenisSurat,
    klasifikasi,
    template,
    sifat,
    reviewer: { id: 'reviewer', name: reviewerName, title: 'Senior Officer (Peer)' },
    approver: { id: 'approver', name: approverName, title: 'VP Operasional (Approver)' },
    penerima: { id: 'recipient', name: penerimaName, unit: 'Departemen Terkait' },
    perluTindakLanjut,
    perluStempel,
    ringkasan,
    action
  };

  try {
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('API error');
    await fetchState();
  } catch (err) {
    localCreateDocument(payload);
  }
  closeModal();
  showToast(action === 'draft' ? 'Naskah dinas disimpan sebagai draft.' : `Surat berhasil diajukan ke Reviewer (${reviewerName})!`);
}

function localCreateDocument(payload) {
  const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) + ' WIB';
  const newDoc = {
    id: 'doc-' + Date.now().toString().slice(-5),
    nomorSurat: `ND-${Math.floor(100 + Math.random() * 900)}/OPS/PI/X/2026`,
    judul: payload.judul || 'Dokumen Tanpa Judul',
    jenisSurat: payload.jenisSurat || 'Nota Dinas',
    template: payload.template || 'Format Standar Nota Dinas Pupuk Indonesia',
    klasifikasi: payload.klasifikasi || 'UM.01.02 - Pengadaan Barang & Jasa Operasional',
    sifat: payload.sifat || 'Biasa',
    tanggalDibuat: new Date().toISOString(),
    tanggalUpdate: new Date().toISOString(),
    drafter: { id: 'drafter', name: 'Budi Santoso', unit: 'Divisi Rantai Pasok' },
    reviewer: payload.reviewer,
    approver: payload.approver,
    penerima: payload.penerima,
    cc: ['Tim Terkait'],
    perluTindakLanjut: Boolean(payload.perluTindakLanjut),
    tindakLanjutNote: '',
    tindakLanjutStatus: payload.perluTindakLanjut ? 'Menunggu Proses Approval' : 'Tidak Diperlukan',
    perluStempel: Boolean(payload.perluStempel),
    stempelStatus: payload.perluStempel ? 'Menunggu Verifikasi Stempel' : 'Tidak Diperlukan',
    stempelDetail: null,
    kecepatanTanggapan: 'Segera',
    status: payload.action === 'draft' ? 'Draft' : 'Menunggu Review',
    statusBadge: payload.action === 'draft' ? 'info' : 'warning',
    currentAssigneeRole: payload.action === 'draft' ? 'drafter' : 'reviewer',
    currentAssigneeName: payload.action === 'draft' ? 'Budi Santoso' : (payload.reviewer ? payload.reviewer.name : 'Siti Rahma'),
    ringkasan: payload.ringkasan,
    lampiran: [{ name: 'Dokumen_Pendukung.pdf', size: '1.5 MB' }],
    timeline: [
      {
        waktu: nowStr,
        aktor: 'Budi Santoso',
        peran: 'Drafter',
        aksi: payload.action === 'draft' ? 'Simpan sebagai Draft' : 'Kirim untuk Review',
        catatan: payload.action === 'draft' ? 'Naskah disimpan sementara.' : `Diajukan ke Reviewer (${payload.reviewer ? payload.reviewer.name : 'Siti Rahma'}).`
      }
    ]
  };
  if (!appState.data.documents) appState.data.documents = [];
  appState.data.documents.unshift(newDoc);
  saveLocalCopy(appState.data);
  renderApp();
}

// Registrasi Surat Modal (Admin Penerima Dokumen)
function openRegistrasiModal() {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="handleModalOverlayClick(event)">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Registrasi Surat Masuk Eksternal</h3>
          <button class="modal-close-btn" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <form id="reg-form" onsubmit="handleRegistrasiSubmit(event)">
            <div class="form-group">
              <label class="form-label">Nomor Surat Asal / Eksternal <span class="required">*</span></label>
              <input type="text" id="reg-nomor" class="form-control" placeholder="Contoh: 114/KEMENPERIN/X/2026" required>
            </div>
            <div class="form-group">
              <label class="form-label">Instansi Pengirim <span class="required">*</span></label>
              <input type="text" id="reg-asal" class="form-control" placeholder="Contoh: Kementerian Perindustrian RI" required>
            </div>
            <div class="form-group">
              <label class="form-label">Perihal Naskah <span class="required">*</span></label>
              <input type="text" id="reg-perihal" class="form-control" placeholder="Contoh: Koordinasi Standar Emisi Pabrik Amoniak" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Tanggal Surat</label>
                <input type="date" id="reg-tanggal" class="form-control" value="2026-10-18">
              </div>
              <div class="form-group">
                <label class="form-label">Sifat Surat</label>
                <select id="reg-sifat" class="form-control">
                  <option value="Biasa">Biasa</option>
                  <option value="Segera">Segera</option>
                  <option value="Amat Segera">Amat Segera</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Tujuan Disposisi Awal</label>
              <input type="text" id="reg-disposisi" class="form-control" value="Direktur Utama / Sekretariat Korporat">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
          <button class="btn btn-primary" onclick="submitRegistrasiForm()">
            ${getIcon('clipboardCheck', 16)} Daftarkan ke Agenda TU
          </button>
        </div>
      </div>
    </div>
  `;
}

function submitRegistrasiForm() {
  const form = document.getElementById('reg-form');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const payload = {
    nomorSuratEksternal: document.getElementById('reg-nomor').value,
    asalSurat: document.getElementById('reg-asal').value,
    perihal: document.getElementById('reg-perihal').value,
    tanggalSurat: document.getElementById('reg-tanggal').value,
    sifat: document.getElementById('reg-sifat').value,
    penerimaDisposisi: document.getElementById('reg-disposisi').value
  };

  fetch('/api/registrasi-surat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    closeModal();
    showToast(`Surat berhasil diregistrasi dengan No. Agenda: ${data.agendaNumber}`);
    fetchState();
  })
  .catch(() => showToast('Gagal meregistrasi surat', true));
}



// Modal Helpers
function closeModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) modalContainer.innerHTML = '';
  appState.activeDoc = null;
}

function handleModalOverlayClick(event) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal();
  }
}

// Search and Filter Handlers
function onSearchInput(query) {
  appState.searchQuery = query;
  renderApp();
}

function setFilter(filterKey) {
  appState.activeFilter = filterKey;
  renderApp();
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'daftar-referensi') {
      appState.currentPage = hash;
    } else {
      appState.currentPage = 'beranda';
      window.location.hash = 'beranda';
    }
  } else {
    appState.currentPage = 'beranda';
  }
  fetchState();
});

window.addEventListener('hashchange', () => {
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== appState.currentPage) {
      navigate(hash);
    }
  }
});
