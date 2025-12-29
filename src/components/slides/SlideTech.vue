<template>
  <SpotlightWrapper class="ppt-container">
    
    <!-- ELEMENT DEKORATIF: KODE MELAYANG (RPL VIBE) -->
    <div class="code-bg-overlay" ref="codeBg">
      <div v-for="n in 15" :key="n" class="floating-code" :style="randomPos()">
        {{ "<div>{ system.init(); }</div>" }}
        <span>const dev = "RPL_STUDENT";</span>
      </div>
    </div>

    <div class="main-content">
      <!-- HEADER -->
      <header class="ppt-header">
        <div class="header-top">
          <span class="section-tag">SDLC</span>
          <div class="system-status">
            <span class="pulse-dot"></span> SYSTEM_READY: 9_NODES
          </div>
        </div>
        <h1 class="ppt-title">Lingkup <span class="accent">Rekayasa Perangkat Lunak</span></h1>
      </header>

      <!-- NAVIGATION BUTTONS -->
      <div class="nav-buttons">
        <button class="nav-btn prev" @click="prevGroup" :disabled="currentIndex === 0">❮</button>
        <span class="page-indicator">{{ currentIndex + 1 }} dari {{ totalGroups }}</span>
        <button class="nav-btn next" @click="nextGroup" :disabled="currentIndex >= totalGroups - 1">❯</button>
      </div>

      <!-- GRID CARDS -->
      <div class="ppt-grid" ref="gridContainer">
        <TransitionGroup name="stagger">
          <div 
            v-for="(item, index) in visibleItems" 
            :key="item.title"
            class="ppt-card"
            @click="openDetail(item)"
          >
            <div class="card-terminal-header">
              <span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span>
            </div>
            <div class="card-body">
              <div class="icon-wrapper">
                <span class="main-icon">{{ item.icon }}</span>
                <div class="icon-glow"></div>
              </div>
              <h2 class="card-title">{{ item.title }}</h2>
              <div class="code-divider"><code>&lt;/&gt;</code></div>
              <p class="card-preview">{{ item.summary }}</p>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- FOOTER -->
      <div class="ppt-footer">
        <div class="progress-container">
          <div class="progress-fill" :style="{ width: ((currentIndex + 1) / totalGroups) * 100 + '%' }"></div>
        </div>
        <p class="footer-text">root@dev-machine:~/project_scope$ <span class="cursor">_</span></p>
      </div>
    </div>

    <!-- MODAL DETAIL -->
    <Transition name="modal-zoom">
      <div v-if="selectedItem" class="full-modal-overlay" @click.self="closeDetail">
        <div class="modal-window">
          <div class="modal-code-accent">import { {{ selectedItem.title.replace(/\s/g, '') }} } from 'RPL-Core';</div>
          
          <div class="modal-layout">
            <div class="modal-visual">
              <div class="icon-circle">
                <span class="giant-icon">{{ selectedItem.icon }}</span>
              </div>
            </div>
            
            <div class="modal-info">
              <h2 class="modal-main-title">{{ selectedItem.title }}</h2>
              <div class="modal-divider"></div>
              <p class="modal-desc">{{ selectedItem.desc }}</p>

              <ul class="modal-list">
                <li v-for="(detail, i) in selectedItem.details" :key="i">
                  <code class="list-bullet">0{{ i+1 }}</code> {{ detail }}
                </li>
              </ul>

              <div class="tech-stack-row">
                <strong>Tools:</strong>
                <span class="tech-pill" v-for="t in selectedItem.tools" :key="t">{{ t }}</span>
              </div>

              <div class="tech-stack-row">
                <strong>Methods:</strong>
                <span 
                  class="tech-pill" 
                  v-for="m in selectedItem.methods" 
                  :key="m.name" 
                  @click.stop="openMethodPopup(m, $event)"
                >{{ m.name }}</span>
              </div>
            </div>
          </div>

          <!-- POPUP METHOD -->
          <div v-if="methodPopup" class="method-popup" :style="{ top: methodPopup.y + 'px', left: methodPopup.x + 'px' }">
            <strong>{{ methodPopup.name }}</strong>
            <p>{{ methodPopup.desc }}</p>
          </div>

        </div>
      </div>
    </Transition>

  </SpotlightWrapper>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";
import SpotlightWrapper from "../SpotlightWrapper.vue";

const selectedItem = ref(null);
const methodPopup = ref(null);

const scopeItems = [
  {
    icon: '🧠',
    title: "Problem Solving",
    summary: "Cari solusi masalah secara logis.",
    desc: "Mengasah kemampuan berpikir sistematis untuk menyelesaikan masalah kompleks.",
    details: [
      "Mengurai masalah menjadi bagian kecil",
      "Menentukan solusi paling efektif",
      "Menyusun langkah penyelesaian"
    ],
    tools: ["Flowchart", "Pseudocode"],
    methods: [
      { name: "Breakdown Masalah", desc: "Memecah masalah besar menjadi bagian kecil agar lebih mudah dikelola." },
      { name: "Pola Logika", desc: "Menyusun aturan langkah demi langkah untuk menyelesaikan masalah." },
      { name: "Evaluasi Solusi", desc: "Memilih jalan keluar yang paling cepat dan paling sedikit risikonya." }
    ]
  },
  {
    icon: '🔍',
    title: "Analisis",
    summary: "Bedah kebutuhan & spesifikasi aplikasi.",
    desc: "Memahami masalah dan kebutuhan pengguna untuk solusi yang tepat sasaran.",
    details: [
      "Analisis kebutuhan pengguna",
      "Identifikasi masalah sistem",
      "Penyusunan spesifikasi kebutuhan"
    ],
    tools: ["BRD", "Draw.io"],
    methods: [
      { name: "Wawancara Pengguna", desc: "Menggali apa yang sebenarnya dibutuhkan oleh orang yang akan memakai aplikasi." },
      { name: "Analisis Akar Masalah", desc: "Mencari sumber utama masalah, bukan hanya melihat gejalanya saja." },
      { name: "Pemetaan Alur", desc: "Menggambarkan bagaimana pengguna akan berinteraksi dengan aplikasi." }
    ]
  },
  {
    icon: '📐',
    title: "Perancangan Sistem",
    summary: "Rancang alur & tampilan (Cetak Biru).",
    desc: "Merancang sistem, antarmuka (UI/UX), dan struktur database sebelum tahap coding.",
    details: [
      "Perancangan UI/UX aplikasi",
      "Pembuatan diagram alur sistem",
      "Perancangan struktur database"
    ],
    tools: ["Figma", "Wireframe.cc"],
    methods: [
      { name: "Sketsa Layar (Wireframe)", desc: "Membuat gambar hitam-putih tata letak tombol dan menu aplikasi." },
      { name: "Desain Interaktif", desc: "Membuat simulasi aplikasi yang bisa diklik sebelum benar-benar dibuat." },
      { name: "Arsitektur Data", desc: "Merancang skema penyimpanan agar data tidak berantakan dan mudah dicari." }
    ]
  },
  {
    icon: '💻',
    title: "Coding",
    summary: "Tulis kode & bangun fitur.",
    desc: "Menerjemahkan hasil desain dan analisis menjadi kode program yang fungsional.",
    details: [
      "Integrasi Frontend & Backend",
      "Penerapan Clean Code",
      "Optimasi performa aplikasi"
    ],
    tools: ["Vue.js", "Node.js", "VS Code"],
    methods: [
      { name: "Koding Standar", desc: "Menulis kode yang rapi agar mudah dibaca dan diperbaiki orang lain." },
      { name: "Review Bersama", desc: "Saling mengecek kode antar teman setim untuk menghindari kesalahan." },
      { name: "Penyusunan Komponen", desc: "Membuat potongan kode yang bisa digunakan kembali di fitur lain." }
    ]
  },
  {
    icon: '🗄️',
    title: "Database",
    summary: "Atur penyimpanan data aplikasi.",
    desc: "Menyusun struktur penyimpanan, mengelola, dan mengoptimalkan pengambilan data.",
    details: [
      "Perancangan tabel & relasi",
      "Integritas data",
      "Optimasi query"
    ],
    tools: ["PostgreSQL", "MySQL", "MongoDB"],
    methods: [
      { name: "Perapihan Data", desc: "Menata struktur tabel agar data tidak dobel (duplikat) dan hemat memori." },
      { name: "Pencarian Cepat", desc: "Membuat indeks agar aplikasi bisa mencari data dalam sekejap." },
      { name: "Keamanan Data", desc: "Memastikan data hanya bisa diakses oleh orang yang berhak." }
    ]
  },
  {
    icon: '🧪',
    title: "Testing",
    summary: "Cek error & pastikan kualitas.",
    desc: "Menjamin kualitas, keamanan, dan stabilitas sistem sebelum rilis ke pengguna.",
    details: [
      "Unit & Integration testing",
      "User Acceptance Test (UAT)",
      "Debugging & perbaikan bug"
    ],
    tools: ["Jest", "Cypress", "PageSpeed Insights"],
    methods: [
      { name: "Uji Fungsi", desc: "Mencoba setiap tombol dan fitur untuk memastikan semuanya berjalan benar." },
      { name: "Tes Beban", desc: "Mencoba aplikasi diakses banyak orang sekaligus untuk melihat kekuatannya." },
      { name: "Pencarian Bug", desc: "Sengaja merusak aplikasi untuk menemukan celah atau kesalahan tersembunyi." }
    ]
  },
  {
    icon: '📅',
    title: "Manajemen Proyek",
    summary: "Kelola jadwal & tugas tim.",
    desc: "Mengatur timeline, pembagian tugas, dan sumber daya agar proyek selesai tepat waktu.",
    details: [
      "Pengaturan timeline & roadmap",
      "Manajemen beban kerja tim",
      "Monitoring progres harian"
    ],
    tools: ["Trello", "Jira", "Notion"],
    methods: [
      { name: "Cicilan Tugas (Sprint)", desc: "Membagi pekerjaan besar menjadi tugas-tugas kecil per dua mingguan." },
      { name: "Update Harian", desc: "Pertemuan singkat tiap pagi untuk memastikan tidak ada tim yang kesulitan." },
      { name: "Evaluasi Tim", desc: "Diskusi di akhir tahap untuk memperbaiki cara kerja di tahap berikutnya." }
    ]
  },
  {
    icon: '🌿',
    title: "Versioning",
    summary: "Kelola riwayat & kolaborasi kode.",
    desc: "Mengelola riwayat perubahan kode agar kolaborasi tim tetap aman dan sinkron.",
    details: [
      "Manajemen Branching",
      "Penggabungan kode (Merge)",
      "Resolusi konflik kode"
    ],
    tools: ["Git", "GitHub", "GitLab"],
    methods: [
      { name: "Mesin Waktu Kode", desc: "Menyimpan catatan perubahan sehingga kode bisa dikembalikan jika ada error." },
      { name: "Kerja Paralel", desc: "Memungkinkan banyak orang mengerjakan fitur berbeda tanpa mengganggu satu sama lain." },
      { name: "Izin Gabung", desc: "Proses pengecekan sebelum kode baru diizinkan masuk ke sistem utama." }
    ]
  },
  {
    icon: '🚀',
    title: "Deploy",
    summary: "Rilis aplikasi ke internet/user.",
    desc: "Menyiapkan dan mengunggah aplikasi ke server agar dapat diakses oleh pengguna luas.",
    details: [
      "Deployment ke server produksi",
      "Konfigurasi hosting & domain",
      "Maintenance & Error monitoring"
    ],
    tools: ["Vercel", "Docker", "AWS/Cloud"],
    methods: [
      { name: "Rilis Otomatis", desc: "Sistem yang langsung meng-update aplikasi setiap ada perubahan kode baru." },
      { name: "Pengaturan Server", desc: "Menyiapkan 'rumah' di internet agar aplikasi bisa diakses 24 jam." },
      { name: "Pantau Kesehatan", desc: "Mengawasi aplikasi secara real-time agar tahu jika ada error mendadak." }
    ]
  }
];



const itemsPerPage = 3;
const currentIndex = ref(0);
const totalGroups = Math.ceil(scopeItems.length / itemsPerPage);

const visibleItems = computed(() => {
  const start = currentIndex.value * itemsPerPage;
  return scopeItems.slice(start, start + itemsPerPage);
});

const nextGroup = () => currentIndex.value < totalGroups - 1 && currentIndex.value++;
const prevGroup = () => currentIndex.value > 0 && currentIndex.value--;
const openDetail = (item) => { selectedItem.value = item; methodPopup.value = null; };
const closeDetail = () => { selectedItem.value = null; methodPopup.value = null; };

const openMethodPopup = (method, event) => {
  methodPopup.value = {
    ...method,
    x: event.clientX + 10,
    y: event.clientY + 10
  };
}

const randomPos = () => ({
  top: Math.random() * 100 + "%",
  left: Math.random() * 100 + "%",
  opacity: Math.random() * 0.3
});

onMounted(() => {
  gsap.to(".floating-code", {
    y: "random(-100,100)",
    x: "random(-50,50)",
    duration: "random(10,20)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: 0.5
  });
});
</script>

<style scoped>
.ppt-container {
  width: 100%; height: 100vh; background: #020617; color: #f8fafc;
  display: flex; justify-content: center; align-items: center;
  font-family: 'JetBrains Mono', 'Inter', monospace; overflow: hidden;
  position: relative;
}

/* DEKORATIF BG */
.code-bg-overlay { position: absolute; width: 100%; height: 100%; pointer-events: none; }
.floating-code { position: absolute; color: #38bdf8; font-size: 0.7rem; font-family: monospace; white-space: nowrap; }

.main-content { width: 90%; max-width: 1300px; z-index: 2; }

/* HEADER */
.header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.section-tag { color: #38bdf8; letter-spacing: 5px; font-weight: 700; font-size: 0.75rem; }
.system-status { font-size: 0.75rem; color: #4ade80; display: flex; align-items: center; gap: 8px; }
.pulse-dot { width: 8px; height: 8px; background: #4ade80; border-radius: 50%; animation: pulse 2s infinite; }

.ppt-title { font-size: 2.8rem; font-weight: 800; margin-bottom: 2rem; font-family: 'Inter', sans-serif; }
.accent { color: #38bdf8; text-shadow: 0 0 20px rgba(56, 189, 248, 0.4); }

/* NAVIGATION */
.nav-buttons { display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; align-items: center; }
.nav-btn { background: #0f172a; border: 1px solid #38bdf8; color: #38bdf8; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; transition: 0.3s; }
.nav-btn:disabled { opacity: 0.4; cursor: default; }
.page-indicator { color: #38bdf8; font-weight: 700; }

/* CARDS */
.ppt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.ppt-card { background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 12px; padding: 0; cursor: pointer; transition: 0.4s ease; backdrop-filter: blur(10px); }
.ppt-card:hover { transform: translateY(-10px); border-color: #38bdf8; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

.card-terminal-header { background: rgba(255,255,255,0.05); padding: 10px 15px; display: flex; gap: 6px; border-bottom: 1px solid rgba(255,255,255,0.05); }
.card-terminal-header span { width: 8px; height: 8px; border-radius: 50%; }
.dot-red { background: #ff5f56; } .dot-yellow { background: #ffbd2e; } .dot-green { background: #27c93f; }

.card-body { padding: 2.5rem; text-align: center; }
.icon-wrapper { position: relative; display: inline-block; margin-bottom: 1.5rem; }
.main-icon { font-size: 3.5rem; z-index: 2; position: relative; }
.icon-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background: #38bdf8; filter: blur(40px); opacity: 0.3; }

.code-divider { font-size: 0.8rem; color: #1e293b; margin: 1rem 0; }

/* MODAL */
.full-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(2, 6, 23, 0.98); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-window { width: 85%; max-width: 1000px; background: #0f172a; border-radius: 20px; padding: 4rem; position: relative; border: 1px solid #38bdf8; }
.modal-code-accent { position: absolute; top: 20px; left: 30px; font-size: 0.8rem; color: #334155; }
.modal-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 3rem; align-items: start; }
.icon-circle { width: 250px; height: 250px; border: 2px dashed rgba(56, 189, 248, 0.3); border-radius: 50%; display: flex; justify-content: center; align-items: center; }
.giant-icon { font-size: 8rem; }
.modal-desc { color: #cbd5e1; font-size: 1rem; margin-bottom: 1rem; }
.list-bullet { color: #38bdf8; background: rgba(56, 189, 248, 0.1); padding: 2px 8px; border-radius: 4px; margin-right: 15px; font-size: 0.9rem; }
.modal-list li { font-size: 1.2rem; margin-bottom: 1.5rem; color: #e2e8f0; list-style: none; }
.tech-stack-row { margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.tech-pill { background: rgba(56,189,248,0.2); padding: 2px 8px; border-radius: 4px; color: #38bdf8; font-size: 0.85rem; cursor: pointer; }

.ppt-footer { margin-top: 4rem; }
.progress-container { width: 100%; height: 4px; background: #1e293b; border-radius: 2px; margin-bottom: 1rem; overflow: hidden; }
.progress-fill { height: 100%; background: #38bdf8; transition: 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.footer-text { font-size: 0.85rem; color: #475569; }
.cursor { animation: blink 1s step-end infinite; color: #38bdf8; font-weight: bold; }

/* METHOD POPUP */
.method-popup { position: fixed; background: #0f172a; border: 1px solid #38bdf8; border-radius: 8px; padding: 1rem; max-width: 250px; color: #f8fafc; z-index: 2000; box-shadow: 0 0 20px rgba(56,189,248,0.4); }

@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
@keyframes blink { 50% { opacity: 0; } }

.stagger-enter-active { transition: all 0.5s ease; }
.stagger-enter-from { opacity: 0; transform: translateY(30px); }
.modal-zoom-enter-active, .modal-zoom-leave-active { transition: all 0.4s ease; }
.modal-zoom-enter-from { opacity: 0; transform: scale(0.95); }
</style>
