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
    summary: "Berpikir logis dan sistematis.",
    desc: "Mengasah kemampuan berpikir sistematis untuk menyelesaikan masalah.",
    details: [
      "Mengurai masalah menjadi bagian kecil",
      "Menentukan solusi paling efektif",
      "Menyusun langkah penyelesaian"
    ],
    tools: ["Flowchart", "Pseudocode"],
    methods: [
      { name: "Analisis Masalah", desc: "Mempelajari masalah secara mendalam untuk menemukan akar masalah." },
      { name: "Pemecahan Logika", desc: "Menerapkan logika untuk menyusun solusi optimal." },
      { name: "Optimasi Solusi", desc: "Menentukan solusi yang paling efisien dan efektif." }
    ]
  },
  {
    icon: '🔍',
    title: "Analisis",
    summary: "Identifikasi kebutuhan sistem.",
    desc: "Memahami masalah dan kebutuhan pengguna untuk solusi tepat.",
    details: [
      "Analisis kebutuhan pengguna",
      "Identifikasi masalah sistem",
      "Penyusunan spesifikasi kebutuhan"
    ],
    tools: ["BRD,Draw.io"],
    methods: [
      { name: "Root Cause Analysis", desc: "Menemukan akar masalah secara sistematis." },
      { name: "Use Case Diagram", desc: "Membuat diagram alur kasus penggunaan." },
      { name: "Requirement Gathering", desc: "Mengumpulkan kebutuhan dari pengguna." }
    ]
  },
  {
    icon: '📐',
    title: "Perancangan Sistem",
    summary: "Mendesain solusi sebelum coding.",
    desc: "Merancang sistem, UI/UX, dan struktur database agar efisien.",
    details: [
      "Perancangan UI/UX aplikasi",
      "Pembuatan diagram alur sistem",
      "Perancangan struktur database"
    ],
    tools: ["Figma", "Wireframe"],
    methods: [
      { name: "Wireframing", desc: "Membuat kerangka antarmuka aplikasi." },
      { name: "Diagram Alur", desc: "Mendesain alur kerja sistem secara visual." },
      { name: "Prototyping", desc: "Membuat prototype interaktif sebelum coding." }
    ]
  },
  {
    icon: '💻',
    title: "Coding",
    summary: "Implementasi program.",
    desc: "Menerjemahkan desain dan analisis menjadi kode program.",
    details: [
      "Frontend & backend integration",
      "Penerapan clean code",
      "Optimasi performa aplikasi"
    ],
    tools: ["Vue.js", "Node.js"],
    methods: [
      { name: "Pair Programming", desc: "Bekerja berpasangan untuk menulis kode." },
      { name: "Code Review", desc: "Memeriksa kode tim untuk kualitas dan standar." },
      { name: "Test Driven Development", desc: "Menulis tes sebelum implementasi kode." }
    ]
  },
  {
    icon: '🗄️',
    title: "Database",
    summary: "Pengelolaan data aplikasi.",
    desc: "Menyimpan, mengelola, dan mengoptimalkan data sistem.",
    details: [
      "Perancangan tabel",
      "Relasi data",
      "Optimasi query"
    ],
    tools: ["PostgreSQL", "MySQL"],
    methods: [
      { name: "Normalisasi", desc: "Menyusun data agar terstruktur dan efisien." },
      { name: "Indexing", desc: "Mempercepat pencarian data dengan indeks." },
      { name: "Query Optimization", desc: "Meningkatkan performa query database." }
    ]
  },
  {
    icon: '🧪',
    title: "Testing",
    summary: "Pengujian sistem.",
    desc: "Menjamin kualitas dan stabilitas sistem sebelum digunakan.",
    details: [
      "Unit testing",
      "User Acceptance Test (UAT)",
      "Debugging"
    ],
    tools: ["pagespeed", "Testing Manual"],
    methods: [
      { name: "Unit Test", desc: "Mengujicoba bagian kecil kode secara mandiri." },
      { name: "Integration Test", desc: "Mengujicoba integrasi antar modul." },
      { name: "Mengukur Performa", desc: " berfungsi sebagai perpustakaan dokumentasi teknis yang mengajarkan cara menerapkan standar web modern" }
    ]
  },
  {
    icon: '📅',
    title: "Manajemen Proyek",
    summary: "Pengaturan proses kerja.",
    desc: "Mengatur timeline, tugas, dan sumber daya agar proyek lancar.",
    details: [
      "Pengaturan timeline",
      "Pembagian tugas",
      "Monitoring progres"
    ],
    tools: ["Agile", "Scrum"],
    methods: [
      { name: "Sprint Planning", desc: "Merencanakan sprint dan tugas tim." },
      { name: "Daily Standup", desc: "Koordinasi harian tim proyek." },
      { name: "Retrospective", desc: "Evaluasi proses kerja tim setelah sprint." }
    ]
  },
  {
    icon: '🌿',
    title: "Versioning",
    summary: "Kontrol versi kode.",
    desc: "Mengelola versi kode agar kolaborasi tim efisien dan aman.",
    details: [
      "Branching",
      "Merge code",
      "Kolaborasi tim"
    ],
    tools: ["Git", "GitHub"],
    methods: [
      { name: "Git Flow", desc: "Mengatur alur kerja cabang Git." },
      { name: "Pull Request", desc: "Mereview kode sebelum merge ke main branch." },
      { name: "Code Review", desc: "Memastikan kualitas dan standar kode." }
    ]
  },
  {
    icon: '🚀',
    title: "Deploy",
    summary: "Aplikasi siap digunakan.",
    desc: "Menyiapkan dan mengunggah aplikasi ke lingkungan produksi.",
    details: [
      "Deploy ke server",
      "Konfigurasi hosting",
      "Monitoring aplikasi"
    ],
    tools: ["Vercel", "Cloud Server"],
    methods: [
      { name: "CI/CD", desc: "Otomatisasi proses build dan deploy." },
      { name: "Server Setup", desc: "Menyiapkan server dan lingkungan produksi." },
      { name: "Monitoring & Logging", desc: "Memantau performa dan error aplikasi." }
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
