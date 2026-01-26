<template>
  <!-- Background utama tetap memenuhi layar -->
  <section class="presentation-space">
    <svg ref="networkSVG" class="network-svg"></svg>

    <!-- BOX SLIDE (ASPEK RASIO 16:9) -->
    <div class="slide-fixed-box">
      
      <header class="slide-header">
        <div class="status-badge">
          <span class="pulse"></span>
          <span class="status-text">NEURAL_NETWORK_CONCEPT // CHAPTER_01</span>
        </div>
        <h1 class="main-title">Apa Itu <span class="accent">Neural Network</span>?</h1>
        <p class="main-subtitle">Model komputasi yang meniru jaringan saraf otak manusia.</p>
      </header>

        <div class="slide-body">
        <!-- KOLOM KIRI (KONTEN DISESUAIKAN) -->
        <div class="content-column">
          <!-- KARTU 1: NEURON -->
          <div class="ppt-card" @click="openPopup(
            'Neuron Buatan',
            '🧠',
            'Neuron buatan adalah unit pemrosesan terkecil yang berfungsi menerima data, memprosesnya, lalu mengirimkan hasilnya ke neuron lain, layaknya sel saraf biologis.',
            'https://placehold.co'
          )">
            <span class="card-icon">🧠</span>
            <div class="card-info">
              <h3>Neuron Buatan</h3>
              <p>Unit pemroses yang menerima dan meneruskan data.</p>
            </div>
          </div>

          <!-- KARTU 2: BOBOT & KONEKSI -->
          <div class="ppt-card" @click="openPopup(
            'Koneksi dan Bobot',
            '🔗',
            'Bobot adalah kekuatan koneksi antar neuron yang mengatur seberapa besar pengaruh sebuah input terhadap output yang dihasilkan.',
            'https://placehold.co'
          )">
            <span class="card-icon">🔗</span>
            <div class="card-info">
              <h3>Koneksi dan Bobot</h3>
              <p>Mengatur kekuatan pengaruh input terhadap output.</p>
            </div>
          </div>

          <!-- KARTU 3: PROSES BELAJAR -->
          <div class="ppt-card" @click="openPopup(
            'Proses Belajar',
            '📚',
            'Neural Network mempelajari pola dengan menyesuaikan bobot secara otomatis melalui algoritma (seperti backpropagation) agar hasil prediksi semakin akurat.',
            'https://placehold.co'
          )">
            <span class="card-icon">📚</span>
            <div class="card-info">
              <h3>Proses Belajar</h3>
              <p>Penyesuaian bobot untuk mengenali pola dan prediksi.</p>
            </div>
          </div>
        </div>

        <!-- KOLOM KANAN (VISUAL) -->
        <div class="visual-column">
          <div class="hero-image-frame">
            <!-- Gambar yang lebih representatif untuk Otak Digital -->
            <img src="https://placehold.co" alt="AI Visual" />
            <div class="image-label">Prinsip Kerja: <span>Otak Digital</span></div>
          </div>
        </div>
      </div>

    </div>

    <!-- POPUP (OVERLAY) -->
    <Transition name="ppt-zoom">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-window">
          <button class="modal-close" @click="closePopup">✕</button>
          <div class="modal-header">
            <span class="m-icon">{{ currentPopup.icon }}</span>
            <h2>{{ currentPopup.title }}</h2>
          </div>
          <p class="m-text">{{ currentPopup.description }}</p>
          <div class="m-img-box">
            <img :src="currentPopup.imagePlaceholder" />
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";

const isPopupOpen = ref(false);
const currentPopup = ref({});
const networkSVG = ref(null);

const openPopup = (title, icon, description, imagePlaceholder) => {
  currentPopup.value = { title, icon, description, imagePlaceholder };
  isPopupOpen.value = true;
};
const closePopup = () => (isPopupOpen.value = false);

onMounted(() => {
  const svg = d3.select(networkSVG.value);
  const width = window.innerWidth, height = window.innerHeight;
  svg.attr("width", width).attr("height", height);
  const nodes = d3.range(30).map(i => ({ id: i }));
  const links = d3.range(40).map(() => ({ source: Math.floor(Math.random()*30), target: Math.floor(Math.random()*30) }));
  const link = svg.append("g").selectAll("line").data(links).enter().append("line").attr("stroke", "#6366f1").attr("opacity", 0.15);
  const node = svg.append("g").selectAll("circle").data(nodes).enter().append("circle").attr("r", 4).attr("fill", "#38bdf8").attr("opacity", 0.4);
  d3.forceSimulation(nodes).force("link", d3.forceLink(links).distance(200)).force("charge", d3.forceManyBody().strength(-100)).force("center", d3.forceCenter(width/2, height/2))
    .on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node.attr("cx", d => d.x).attr("cy", d => d.y);
    });
});
</script>

<style scoped>
/* BACKGROUND SPACE */
.presentation-space {
  width: 100vw;
  height: 100vh;
  background: #020617;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.network-svg { position: absolute; inset: 0; z-index: 1; }

/* SLIDE BOX (Ukuran tetap 16:9 seperti PPT) */
.slide-fixed-box {
  position: relative;
  z-index: 2;
  width: 90vw; /* Lebar slide */
  aspect-ratio: 16 / 9; /* Rasio PPT Standar */
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 4% 5%; /* Menggunakan % agar responsif di dalam box */
  display: flex;
  flex-direction: column;
  box-shadow: 0 50px 100px rgba(0,0,0,0.5);
}

/* TYPOGRAPHY */
.main-title { font-size: clamp(2rem, 5vw, 4.5rem); font-weight: 900; color: white; margin: 0; }
.accent { color: #38bdf8; }
.main-subtitle { font-size: clamp(1rem, 2vw, 1.8rem); color: #94a3b8; margin-top: 10px; }

/* BODY LAYOUT */
.slide-body {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 5%;
  margin-top: 3%;
  flex-grow: 1;
}

/* CARDS */
.content-column { display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; }
.ppt-card {
  background: rgba(30, 41, 59, 0.6);
  border-left: 5px solid #6366f1;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: 0.3s;
}
.ppt-card:hover { transform: scale(1.03); background: rgba(56, 189, 248, 0.1); border-color: #38bdf8; }
.card-icon { font-size: 3rem; }
.card-info h3 { font-size: 1.8rem; color: #38bdf8; margin-bottom: 5px; }
.card-info p { font-size: 1.1rem; color: #cbd5e1; }

/* VISUAL */
.hero-image-frame { text-align: center; }
.hero-image-frame img { width: 100%; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); }
.image-label { margin-top: 1rem; font-size: 1.5rem; font-weight: bold; color: white; }
.image-label span { color: #6366f1; }

/* MODAL / POPUP */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.9);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.modal-window {
  background: #0f172a;
  width: 100%;
  max-width: 800px;
  padding: 3rem;
  border-radius: 30px;
  border: 2px solid #38bdf8;
  position: relative;
}
.modal-close { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 2rem; color: #94a3b8; background: none; border: none; cursor: pointer; }
.modal-header { display: flex; align-items: center; gap: 20px; margin-bottom: 1.5rem; }
.m-icon { font-size: 4rem; }
.modal-header h2 { font-size: 3rem; color: #38bdf8; }
.m-text { font-size: 1.5rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 2rem; }
.m-img-box img { width: 100%; border-radius: 15px; }

/* TRANSITIONS */
.ppt-zoom-enter-active, .ppt-zoom-leave-active { transition: all 0.4s ease; }
.ppt-zoom-enter-from, .ppt-zoom-leave-to { opacity: 0; transform: scale(0.85); }

/* BADGE & PULSE */
.status-badge { display: inline-flex; align-items: center; gap: 8px; color: #6366f1; font-weight: bold; margin-top: 5px; }
.pulse { width: 10px; height: 10px; background: #6366f1; border-radius: 50%; animation: pulse-kf 2s infinite; }
@keyframes pulse-kf { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

/* RESPONSIVE SCALE */
@media (max-width: 1000px) {
  .slide-fixed-box { aspect-ratio: auto; height: 90vh; overflow-y: auto; }
  .slide-body { grid-template-columns: 1fr; }
}
</style>
