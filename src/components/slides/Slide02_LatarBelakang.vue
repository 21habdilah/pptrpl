<template>
  <section class="nn-definition">
    <!-- SVG Container for D3 Visualization -->
    <svg ref="networkSVG" class="network-svg"></svg>

    <div class="container">
      <header class="header">
        <div class="status-bar">
          <span class="pulse"></span> DEFINITION_CORE
        </div>
        <h2 class="title">Apa Itu <span class="accent">Neural Network</span>?</h2>
        <p class="subtitle">Sistem komputer yang meniru cara kerja otak manusia.</p>
      </header>

      <div class="content-grid">
        <!-- Card 1: Neuron -->
        <div class="def-card" @click="openPopup('Neuron Digital', '🧠', 'Unit pemrosesan dasar. Menerima input, memprosesnya dengan bobot, dan menembakkan output jika ambang batas tercapai.', 'placeholder_neuron.jpg')">
          <div class="icon">🧠</div>
          <h4>Neuron Digital</h4>
          <p>Unit kecil yang meniru sel otak.</p>
        </div>

        <!-- Card 2: Belajar -->
        <div class="def-card" @click="openPopup('Belajar dari Data', '📚', 'Proses pelatihan AI. NN menyesuaikan bobot koneksi secara otomatis melalui paparan data yang banyak untuk mengenali pola tanpa diprogram secara eksplisit.', 'placeholder_learning.jpg')">
          <div class="icon">📚</div>
          <h4>Belajar dari Data</h4>
          <p>Dilatih dengan banyak data (pengalaman).</p>
        </div>

        <!-- Card 3: Koneksi -->
        <div class="def-card" @click="openPopup('Bobot Koneksi', '🔗', 'Nilai numerik yang menentukan kekuatan koneksi antar neuron. Bobot yang tepat adalah kunci akurasi AI dalam membuat keputusan yang benar.', 'placeholder_weights.jpg')">
          <div class="icon">🔗</div>
          <h4>Bobot Koneksi</h4>
          <p>Menentukan "pentingnya" sebuah informasi.</p>
        </div>
      </div>

      <footer class="footer">
        <h3 class="conclusion">Analogi Sederhana: <span>Otak Digital</span></h3>
        <p>Sistem ini belajar dari pengalaman, seperti kita belajar dari melihat dan mencoba.</p>
      </footer>
    </div>
    
    <!-- MODAL POPUP (Sama seperti sebelumnya) -->
    <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
      <div class="modal-content">
        <button class="close-btn" @click="closePopup">✕</button>
        <div class="modal-header">
          <div class="icon">{{ currentPopup.icon }}</div>
          <h3>{{ currentPopup.title }}</h3>
        </div>
        <div class="modal-body">
          <p>{{ currentPopup.description }}</p>
          <div class="image-placeholder">
            ** Placeholder Gambar Anda: {{ currentPopup.imagePlaceholder }} **
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
// Pastikan D3.js sudah diinstal (npm install d3)
import * as d3 from "d3";

// --- FUNGSI POPUP ---
const isPopupOpen = ref(false);
const currentPopup = ref({});
const openPopup = (title, icon, description, imagePlaceholder) => {
  currentPopup.value = { title, icon, description, imagePlaceholder };
  isPopupOpen.value = true;
  document.body.style.overflow = 'hidden';
};
const closePopup = () => {
  isPopupOpen.value = false;
  document.body.style.overflow = '';
};

// --- D3 & GSAP VISUALIZATION ---
const networkSVG = ref(null);

const createNetworkVisualization = () => {
  const svg = d3.select(networkSVG.value);
  const width = window.innerWidth;
  const height = window.innerHeight;
  svg.attr("width", width).attr("height", height);

  const nodesData = d3.range(50).map(i => ({id: i, x: Math.random() * width, y: Math.random() * height}));
  const linksData = d3.range(60).map(i => ({source: Math.floor(Math.random() * 50), target: Math.floor(Math.random() * 50)}));

  // Force simulation for dynamic movement
  const simulation = d3.forceSimulation(nodesData)
    .force("link", d3.forceLink(linksData).id(d => d.id).distance(100).strength(0.1))
    .force("charge", d3.forceManyBody().strength(-30))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

  const link = svg.append("g").attr("class", "links").selectAll("line")
    .data(linksData)
    .enter().append("line")
    .attr("stroke", "#6366f1")
    .attr("stroke-width", 1)
    .attr("opacity", 0.3);

  const node = svg.append("g").attr("class", "nodes").selectAll("circle")
    .data(nodesData)
    .enter().append("circle")
    .attr("r", 5)
    .attr("fill", "#38bdf8")
    .attr("opacity", 0.7);

  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  // GSAP animation on D3 elements
  gsap.from(node.nodes(), { opacity: 0, duration: 1.5, stagger: 0.02, ease: "power2.out" });
  gsap.from(link.nodes(), { opacity: 0, duration: 1.5, stagger: 0.02, ease: "power2.out" });
};

// --- GSAP ANIMATION & MOUNT ---
onMounted(() => {
  createNetworkVisualization(); // Inisialisasi D3

  const tl = gsap.timeline();
  tl.from(".status-bar", { opacity: 0, x: -20, duration: 0.8 })
    .from(".title", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
    .from(".subtitle", { opacity: 0, y: 20, duration: 0.8 }, "-=0.2")
    .from(".def-card", { opacity: 0, y: 30, stagger: 0.2, duration: 0.8, ease: "power2.out" }, "-=0.2")
    .from(".footer", { opacity: 0, duration: 1 });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com');

/* --- MODAL STYLES (Sama seperti sebelumnya) --- */
.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.85); display: flex;
  justify-content: center; align-items: center; z-index: 1000;
  backdrop-filter: blur(5px);
}
.modal-content {
  background: #0f172a; padding: 2rem; border-radius: 16px;
  max-width: 600px; width: 90%; box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
  position: relative; border: 1px solid #6366f1;
}
.close-btn { position: absolute; top: 10px; right: 10px; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }
.modal-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.modal-header h3 { color: #38bdf8; font-size: 1.5rem; }
.modal-body p { color: #e2e8f0; margin-bottom: 1.5rem; }
.image-placeholder { background: #1e293b; padding: 4rem 2rem; border-radius: 8px; text-align: center; color: #6366f1; border: 1px dashed #6366f1; }

/* --- D3 VISUALIZATION STYLES --- */
.network-svg {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* Penting agar tidak menghalangi klik pada konten */
  opacity: 0.7;
}

/* --- STYLE UTAMA (Konsisten) --- */
.nn-definition {
  font-family: 'Plus Jakarta Sans', sans-serif;
  width: 100vw; height: 100vh;
  background: #020617;
  color: #f8fafc;
  display: flex; justify-content: center; align-items: center;
  overflow: hidden; position: relative;
}

.container {
  width: 90%; max-width: 1000px; z-index: 1;
}

.def-card {
    cursor: pointer; transition: all 0.3s ease;
}

.def-card:hover {
    border-color: #38bdf8;
    background: rgba(99, 102, 241, 0.1);
}
/* ... (sisa style lama untuk header, grid, cards, footer, dan keyframes) ... */
.status-bar { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6366f1; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; }
.pulse { width: 8px; height: 8px; background: #6366f1; border-radius: 50%; box-shadow: 0 0 10px #6366f1; animation: pulse-kf 2s infinite; }
.title { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 0.5rem; }
.subtitle { color: #94a3b8; }
.accent { background: linear-gradient(90deg, #6366f1, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.content-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 3rem 0; }
.icon { font-size: 2.5rem; margin-bottom: 1rem; display: block; }
.def-card h4 { color: #38bdf8; margin-bottom: 0.5rem; }
.def-card p { font-size: 0.8rem; color: #94a3b8; }
.footer { text-align: center; margin-top: 2rem; }
.conclusion { font-size: 1.5rem; font-weight: 700; }
.conclusion span { color: #6366f1; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 15px rgba(99, 102, 241, 0.5); }
@keyframes pulse-kf {
  0% { transform: scale(0.95); opacity: 0.5; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.5; }
}
</style>
