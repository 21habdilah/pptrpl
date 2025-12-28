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
    judul: "Rancang Bangun", // Judul baru: Fokus pada fase desain
    name: "Desain & Perancangan", 
    expanded: false,
    fullDesc: "Tahap pembuatan arsitektur visual dan alur logika untuk memastikan aplikasi sesuai dengan kebutuhan pengguna sebelum masuk ke tahap coding.",
    tech: [
      { name: "Figma", desc: "Platform kolaborasi desain untuk menyusun UI/UX serta simulasi interaksi antarmuka." },
      { name: "Draw.io", desc: "Alat pemetaan diagram untuk merancang alur logika dan arsitektur sistem agar terstruktur." }
    ],
    methods: [
      { name: "Wireframing", desc: "Penyusunan tata letak kasar aplikasi untuk menentukan posisi elemen-elemen penting." },
      { name: "Prototyping", desc: "Pembuatan model interaktif untuk menguji pengalaman pengguna sebelum aplikasi benar-benar dibuat." },
      { name: "Flowchart", desc: "Penyusunan alur kerja sistem dari awal hingga akhir untuk menghindari logika yang terputus." }
    ]
  },
  { 
    judul: "Fondasi Kode", // Judul baru: Fokus pada struktur awal
    name: "Framework & Library", 
    expanded: false,
    fullDesc: "Kumpulan 'fondasi dan cetakan' siap pakai untuk membangun struktur aplikasi yang standar, rapi, dan kokoh tanpa harus mulai dari nol.",
    tech: [
      { name: "Vue.js", desc: "Teknologi utama untuk menciptakan antarmuka web yang interaktif dan responsif terhadap aksi pengguna." },
      { name: "Nuxt.js", desc: "Framework tingkat lanjut untuk meningkatkan performa kecepatan akses dan kemudahan indeks mesin pencari (SEO)." },
      { name: "Bootstrap", desc: "Koleksi komponen desain standar industri agar tampilan web terlihat konsisten dan profesional di berbagai perangkat." }
    ],
    methods: [
      { name: "Setup Project", desc: "Inisialisasi lingkungan kerja dan struktur folder standar sebelum pengembangan dimulai." },
      { name: "Reusable Components", desc: "Penerapan konsep satu komponen untuk berbagai kebutuhan guna efisiensi kode." }
    ]
  },
  
  { 
    judul: "Pusat Data", // Judul baru: Fokus pada penyimpanan inti
    name: "Database", 
    expanded: false,
    fullDesc: "Pusat penyimpanan data digital yang bertugas menjaga seluruh informasi penting aplikasi agar tetap aman, teratur, dan mudah diakses.",
    tech: [
      { name: "MySQL", desc: "Sistem manajemen database relasional yang andal untuk menangani volume data besar dengan stabil." },
      { name: "PostgreSQL", desc: "Database tingkat lanjut yang fokus pada integritas data dan pemrosesan logika data yang kompleks." },
      { name: "Supabase", desc: "Solusi backend instan yang mempercepat integrasi database dengan API otomatis." }
    ],
    methods: [
      { name: "Schema Design", desc: "Perancangan struktur tabel dan relasi data agar informasi tersimpan secara logis." },
      { name: "Query Optimization", desc: "Teknik pengambilan data yang presisi untuk menjamin kecepatan akses meskipun data berjumlah besar." }
    ]
  },
  { 
    judul: "Mesin Utama", // Judul baru: Fokus pada logika belakang
    name: "Backend & Server", 
    expanded: false,
    fullDesc: "Mesin utama di balik layar yang mengelola lalu lintas data, logika bisnis, serta menjaga keamanan sistem secara keseluruhan.",
    tech: [
      { name: "Node.js", desc: "Lingkungan runtime yang memungkinkan logika sisi server dijalankan dengan performa tinggi menggunakan JavaScript." },
      { name: "npm / pnpm", desc: "Package manager untuk mengelola dan menginstal library pendukung aplikasi." } 
    ],
    methods: [
      { name: "API Development", desc: "Pembangunan jalur komunikasi agar tampilan depan (Frontend) dapat berinteraksi dengan database." },
      { name: "Server Configuration", desc: "Pengaturan lingkungan server guna memastikan aplikasi selalu aktif dan terlindungi dari ancaman luar." }
    ]
  },
  { 
    judul: "Manajemen Kode", // Judul baru: Fokus pada kolaborasi
    name: "Version Control", 
    expanded: false,
    fullDesc: "Sistem dokumentasi perubahan kode yang memungkinkan pelacakan histori pengembangan dan kolaborasi tim yang aman.",
    tech: [
      { name: "Git", desc: "Alat standar untuk mencatat setiap detail perubahan kode secara kronologis." },
      { name: "GitHub", desc: "Platform berbasis cloud untuk penyimpanan kode terpusat dan manajemen kerja tim." }
    ],
    methods: [
      { name: "Branching", desc: "Pembuatan jalur pengembangan fitur baru secara terpisah agar tidak mengganggu kode utama." },
      { name: "Pull Request", desc: "Mekanisme peninjauan kode oleh tim guna menjaga kualitas sebelum digabungkan ke sistem utama." }
    ]
  },
  { 
    judul: "Validasi Kualitas", // Judul baru: Fokus pada pengujian
    name: "Testing & Debugging", 
    expanded: false,
    fullDesc: "Proses verifikasi kualitas untuk memastikan setiap fitur berfungsi sesuai rencana dan bebas dari gangguan teknis (bug).",
    tech: [
      { name: "Browser DevTools", desc: "Instrumen analisis langsung di browser untuk mendeteksi kesalahan pada kode CSS, HTML, maupun JavaScript." }
    ],
    methods: [
      { name: "Unit Test", desc: "Pengujian pada komponen terkecil aplikasi untuk memastikan fungsionalitasnya tepat sasaran." },
      { name: "Debugging", desc: "Identifikasi akar masalah pada error dan perbaikan kode hingga sistem berjalan lancar." }
    ]
  },
  { 
    judul: "Publikasi Global", // Judul baru: Fokus pada rilis produk
    name: "Deployment & Hosting", 
    expanded: false,
    fullDesc: "Tahap publikasi aplikasi dari lingkungan pengembangan ke internet agar dapat diakses oleh pengguna secara global.",
    tech: [
      { name: "Vercel", desc: "Layanan automasi deployment yang mengoptimalkan kecepatan akses situs web secara global." },
    ],
    methods: [
      { name: "CI/CD Pipeline", desc: "Otomatisasi proses pengujian dan pengunggahan kode ke server setiap kali ada perubahan." },
      { name: "Server Setup", desc: "Persiapan lingkungan operasional di server agar aplikasi dapat terpublikasi serta berjalan tanpa henti." }
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