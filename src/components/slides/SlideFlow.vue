<template>
  <SpotlightWrapper class="ppt-container">
   <!-- BACKGROUND RPL ELEMENTS -->
    <div class="rpl-bg-icons">
      <span>&lt;/&gt;</span>
      <span>⚙</span>
      <span>🗄</span>
      <span>☁</span>
      <span>📦</span>
    </div>
  <div class="slide-main">
  <!-- Header -->
 <header class="slide-header">
  <h1 class="slide-title">RPL <span class="gradient-text">Sinergi</span></h1>
  <p class="slide-subtitle">
    Peta jalan teknis <strong>Rekayasa Perangkat Lunak</strong> yang mengintegrasikan pilar utama pembangunan sistem:
  </p>

  <!-- Gunakan struktur pembungkus yang lebih rapi -->
  <div class="definition-container">
  
      <div class="def-text">
        <span class="icon">🛠</span><strong>Tools:</strong> Perangkat teknis untuk membangun, mengelola, dan meluncurkan kode secara efisien.
      </div>
    
    
      <div class="def-text">
       <span class="icon">📋</span> <strong>Methods:</strong> Prosedur sistematis yang menentukan alur kerja agar terarah dan berkualitas.
      </div>
    

    <div class="def-footer">
      Gabungan keduanya membentuk <strong>Proses</strong> yang saling terhubung untuk menciptakan solusi digital yang stabil dan skalabel bagi pengguna.
    </div>
  </div>


</header>




      <!-- Sidebar + Content Grid -->
      <div class="slide-body">
        <!-- Sidebar Folder/File -->
        <aside class="sidebar">
          <ul class="folder-tree">
            <li v-for="tool in tools" :key="tool.name">
              <div class="folder-header" @click="tool.expanded = !tool.expanded">
                <span class="folder-icon">📁</span>
                <span>{{ tool.judul }}</span>
                <span class="toggle-indicator">{{ tool.expanded ? '-' : '+' }}</span>
              </div>
              <ul v-if="tool.expanded" class="file-list">
                <li @click="selectTool(tool)">
                  <span class="file-icon">📄</span> {{ tool.name }}
                </li>
              </ul>
            </li>
          </ul>
        </aside>

        <!-- Right Panel Slide Detail -->
        <div class="slide-detail">
  <div v-if="activeTool">
    <h2>{{ activeTool.name }}</h2>
    <p>{{ activeTool.fullDesc }}</p>

    <div class="tech-section">
      <strong>Technologies:</strong>
      <ul>
        <!-- Ubah tech menjadi tech.name dan tambahkan deskripsinya jika perlu -->
        <li v-for="tech in activeTool.tech" :key="tech.name">
          <strong>{{ tech.name }}</strong>: {{ tech.desc }}
        </li>
      </ul>
    </div>

    <div class="methods-section">
      <strong>Methods:</strong>
      <ul>
        <li v-for="method in activeTool.methods" :key="method.name">
          <strong>{{ method.name }}</strong>: {{ method.desc }}
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="slide-placeholder">
    Klik folder/file untuk melihat detail.
  </div>
</div>
      </div>

      <!-- Footer -->
      <footer class="slide-footer">
        root@dev-machine:~/project_scope$ <span class="cursor">_</span>
      </footer>
    </div>
  </SpotlightWrapper>
</template>

<script setup>
import { ref } from "vue";
import SpotlightWrapper from "../SpotlightWrapper.vue";

const tools = ref([
  { 
    judul: "Rancang Bangun", 
    name: "Desain & Perancangan", 
    expanded: false,
    fullDesc: "Proses pembuatan cetak biru visual dan alur logika aplikasi agar sesuai dengan kebutuhan pengguna sebelum mulai dikoding.",
    tech: [
      { name: "Figma", desc: "Alat desain visual untuk membuat tampilan aplikasi dan simulasi klik antarmuka." },
      { name: "Draw.io", desc: "Alat pembuat diagram untuk memetakan alur kerja sistem agar tidak ada logika yang buntu." }
    ],
    methods: [
      { name: "Sketsa Layar", desc: "Menyusun tata letak kasar aplikasi untuk menentukan posisi tombol dan informasi penting." },
      { name: "Simulasi Klik", desc: "Uji coba alur aplikasi menggunakan desain interaktif sebelum benar-benar diprogram." },
      { name: "Pemetaan Alur", desc: "Menyusun diagram langkah-demi-langkah perjalanan pengguna di dalam aplikasi." }
    ]
  },
  { 
    judul: "Fondasi Kode", 
    name: "Framework & Library", 
    expanded: false,
    fullDesc: "Kumpulan kerangka kerja siap pakai untuk membangun struktur aplikasi yang rapi, cepat, dan standar industri.",
    tech: [
      { name: "Vue.js", desc: "Teknologi untuk membangun halaman web yang hidup, gesit, dan reaktif terhadap input pengguna." },
      { name: "Nuxt.js", desc: "Framework tambahan untuk mempercepat loading web dan memudahkan Google menemukan situs Anda." },
      { name: "Bootstrap", desc: "Koleksi komponen desain siap pakai agar tampilan web rapi di HP maupun Laptop." }
    ],
    methods: [
      { name: "Persiapan Projek", desc: "Mengatur struktur folder dan aturan main koding agar tim bisa bekerja dengan seragam." },
      { name: "Komponen Reusable", desc: "Membuat potongan kode yang bisa dipakai berulang kali untuk menghemat waktu." }
    ]
  },
  { 
    judul: "Pusat Data", 
    name: "Database", 
    expanded: false,
    fullDesc: "Gudang penyimpanan digital tempat semua informasi penting aplikasi disimpan secara aman dan terorganisir.",
    tech: [
      { name: "MySQL / Postgre", desc: "Sistem penyimpanan data yang sangat stabil dan mampu menampung jutaan informasi." },
      { name: "Supabase", desc: "Layanan database modern yang memudahkan aplikasi terhubung ke data secara instan." }
    ],
    methods: [
      { name: "Struktur Tabel", desc: "Merancang rak-rak penyimpanan data agar saling terhubung secara logis." },
      { name: "Optimasi Pencarian", desc: "Teknik khusus agar pengambilan data tetap kilat meski jumlah data sangat banyak." }
    ]
  },
  { 
    judul: "Mesin Belakang", 
    name: "Backend & Server", 
    expanded: false,
    fullDesc: "Mesin utama di balik layar yang mengolah logika bisnis, keamanan, dan menjembatani data ke tampilan.",
    tech: [
      { name: "Node.js", desc: "Teknologi yang memungkinkan bahasa JavaScript menjalankan perintah berat di sisi server." },
      { name: "npm / pnpm", desc: "Alat bantu untuk mengunduh dan mengelola berbagai modul tambahan aplikasi." } 
    ],
    methods: [
      { name: "Pembuatan API", desc: "Membangun 'pintu akses' agar tampilan depan bisa mengambil data dari gudang data." },
      { name: "Keamanan Server", desc: "Menyusun benteng pelindung agar data aplikasi tidak bocor atau diserang pihak luar." }
    ]
  },
  { 
    judul: "Kontrol Versi", 
    name: "Version Control", 
    expanded: false,
    fullDesc: "Sistem perekam jejak perubahan kode yang memungkinkan kolaborasi banyak orang tanpa takut kode tertimpa.",
    tech: [
      { name: "Git", desc: "Alat pencatat riwayat setiap perubahan kode (seperti mesin waktu)." },
      { name: "GitHub", desc: "Rumah online untuk menyimpan kode dan bekerja sama dengan tim dari mana saja." }
    ],
    methods: [
      { name: "Cabang Fitur", desc: "Mengerjakan fitur baru di 'jalur terpisah' agar tidak merusak aplikasi yang sudah jalan." },
      { name: "Review Kode", desc: "Proses diskusi dan pengecekan kode rekan tim sebelum digabungkan ke aplikasi utama." }
    ]
  },
  { 
    judul: "Uji Kualitas", 
    name: "Testing & Debugging", 
    expanded: false,
    fullDesc: "Tahap pembersihan aplikasi dari kesalahan (bug) dan memastikan semua fitur bekerja 100% sesuai rencana.",
    tech: [
      { name: "DevTools", desc: "Alat bedah kode langsung di browser untuk melacak error secara real-time." }
    ],
    methods: [
      { name: "Tes Mandiri", desc: "Menguji setiap fungsi kecil secara otomatis untuk memastikan tidak ada logika yang salah." },
      { name: "Pelacakan Error", desc: "Proses mencari akar masalah saat terjadi error dan memperbaikinya hingga tuntas." }
    ]
  },
  { 
    judul: "Rilis Publik", 
    name: "Deployment & Hosting", 
    expanded: false,
    fullDesc: "Proses menerbangkan aplikasi dari komputer lokal ke internet agar bisa diakses oleh siapa saja di seluruh dunia.",
    tech: [
      { name: "Vercel / Cloud", desc: "Layanan yang menyediakan 'rumah' di internet agar website selalu aktif 24 jam." },
    ],
    methods: [
      { name: "Update Otomatis", desc: "Sistem yang langsung memperbarui website setiap kali ada perbaikan kode terbaru." },
      { name: "Rilis Publik", desc: "Proses final mempublikasikan aplikasi agar mendapatkan alamat (domain) resmi." }
    ]
  }
]);





const activeTool = ref(null);
const selectTool = (tool) => { activeTool.value = tool; };
</script>
<style>
.ppt-container {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  /* Warna latar utama yang gelap dengan gradien halus */
  background: #020617; color: #f8fafc;
  color: #e2e8f0; /* Warna teks default */
  min-height: 100vh;
  padding: 20px;
}

.slide-main {
  max-width: 1200px;
  margin: 0 auto;
}

/* --- Header Styles --- */
.slide-header {
  padding-bottom: 20px;
  border-bottom: 1px solid #334155;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
   text-shadow: 
    0 0 5px rgba(6, 182, 212, 0.5),  
    0 0 10px rgba(6, 182, 212, 0.3),  
    0 0 20px rgba(236, 72, 153, 0.2)
}

.gradient-text {
  /* Warna aksen cyan dari gambar */
  color: #06b6d4; 
}

.slide-subtitle {
  margin-top: 10px;
  color: #94a3b8;
}

.definition-container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.def-text {
  /* Kartu info latar belakang yang lebih terang, sedikit transparan */
  background-color: rgba(30, 41, 59, 0.7); 
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  /* Shadow yang lebih gelap */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); 
}

.icon {
  font-size: 1.2rem;
  /* Warna aksen untuk ikon */
  color: #ec4899; 
}

/* Mengubah ikon default menjadi simbol tech yang lebih relevan */
.def-text:nth-child(1) .icon::before { content: '< >'; font-family: monospace; }
.def-text:nth-child(2) .icon::before { content: '{}'; font-family: monospace; }


.def-footer {
  margin-top: 15px;
  width: 100%;
  color: #94a3b8;
}

/* --- Body Styles (Sidebar + Content) --- */
.slide-body {
  display: flex;
  margin-top: 20px;
  gap: 20px;
}

/* Sidebar */
.sidebar {
  flex-basis: 250px;
  /* Latar belakang sidebar yang lebih gelap */
  background-color: rgba(15, 23, 42, 0.5); 
  padding: 15px;
  border-radius: 8px;
  border-right: 1px solid #334155;
}
strong {
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.4);
}

.folder-tree {
  list-style: none;
  padding: 0;
}

.folder-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
  color: #fff;
  font-weight: bold;
}

.folder-icon {
  margin-right: 8px;
  color: #facc15; /* Warna aksen kuning untuk folder */
}

.toggle-indicator {
  margin-left: auto;
}

.file-list {
  list-style: none;
  padding-left: 20px;
}

.file-list li {
  padding: 5px 0;
  cursor: pointer;
  color: #94a3b8;
  transition: color 0.3s;
}

.file-list li:hover {
  color: #fff;
}

.file-icon {
  margin-right: 8px;
  color: #60a5fa; /* Warna aksen biru untuk file */
}

/* Right Panel */
.slide-detail {
  flex-grow: 1;
  /* Latar belakang panel konten yang lebih terang */
  background-color: rgba(30, 41, 59, 0.85); 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slide-detail h2 {
  color: #fff;
  margin-bottom: 10px;
}

.slide-detail p {
  color: #94a3b8;
  margin-bottom: 20px;
}

.tech-section, .methods-section {
  margin-bottom: 20px;
}

.tech-section strong, .methods-section strong {
  color: #06b6d4; /* Warna aksen cyan untuk judul bagian */
}

.slide-detail ul {
  list-style: none; /* Hilangkan bullet default */
  margin-left: 0;
  color: #e2e8f0;
}

/* Menambahkan icon list gaya programmer */
.slide-detail ul li::before {
    content: '> '; 
    color: #ec4899; /* Warna aksen pink */
    font-family: monospace;
    margin-right: 5px;
}


.slide-placeholder {
  color: #94a3b8;
  text-align: center;
  padding: 50px;
}

/* --- Footer Styles --- */
.slide-footer {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #334155;
  color: #facc15; /* Warna aksen kuning untuk footer terminal */
  font-family: monospace;
}
/* BACKGROUND RPL ICONS */
.rpl-bg-icons {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  font-size: 6rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-items: center;
}

/* PHASE TAG */
.phase-tag {
  margin-left: 8px;
  font-size: 0.6rem;
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(6,182,212,0.15);
  color: #06b6d4;
  border: 1px solid rgba(6,182,212,0.4);
}

/* ICON POLISH */
.tech-section strong,
.methods-section strong {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}


.cursor {
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
</style>