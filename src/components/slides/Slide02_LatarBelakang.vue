<template>
  <section class="presentation-space">
    <!-- Background Animasi Jaringan Saraf (D3.js) -->
    <svg ref="networkSVG" class="network-svg"></svg>

    <div class="slide-fixed-box">
      <!-- Header langsung muncul tanpa animasi -->
      <header class="slide-header">
        <div class="status-badge">
          <span class="pulse"></span>
          <span class="status-text">NEURAL_NETWORK_CONCEPT // CHAPTER_01</span>
        </div>
         <h2 class="main-title">APA ITU <span class="accent">NEURAL NETWORK ?</span></h2>
        <p class="main-subtitle">Sistem komputasi cerdas yang meniru arsitektur saraf biologis otak manusia.</p>
      </header>

      <div class="slide-body">
        <!-- KOLOM KIRI: KARTU INFORMASI -->
        <div class="content-column">
          <div class="ppt-card" v-for="card in cards" :key="card.title" 
               @click="openPopup(card)"
               :style="{ '--accent-color': card.color }">
            <div class="card-icon-box">
               <span class="visual-icon">{{ card.icon }}</span>
            </div>
            <div class="card-info">
              <h3>{{ card.title }}</h3>
              <p>{{ card.short }}</p>
            </div>
          </div>
        </div>

        <!-- KOLOM KANAN: VISUAL HERO -->
        <div class="visual-column">
          <div class="hero-image-frame">
            <img src="https://mriquestions.com/uploads/3/4/5/7/34572113/perceptron-with-neuron_1.png" alt="Neuron Anatomy" />
            <div class="image-label">Visualisasi: <span>Arsitektur Neuron</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL POPUP: BERSIH & TERORGANISIR -->
    <Transition name="ppt-zoom" @after-enter="renderPopupVisual">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-window">
          <button class="modal-close" @click="closePopup">✕</button>
          
          <div class="modal-grid">
            <div class="m-text-side">
              <div class="m-header">
                <span class="m-visual-icon">{{ activeCard.icon }}</span>
                <h2 :style="{ color: activeCard.color }">{{ activeCard.title }}</h2>
              </div>
              <p class="m-desc">{{ activeCard.description }}</p>
            </div>

            <div class="m-visual-side">
              <div id="d3-popup-canvas" class="d3-container"></div>
              <div class="viz-note">Simulasi {{ activeCard.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import * as d3 from "d3";
import gsap from "gsap";

const isPopupOpen = ref(false);
const activeCard = ref({});
const networkSVG = ref(null);

// Data kartu
const cards = [
  { title: 'Neuron Buatan', icon: '🧠', color: '#38bdf8', short: 'Unit pemroses dasar data.', description: 'Bekerja seperti sel saraf (soma), menerima input dari luar, memprosesnya dengan hitungan matematika, lalu mengirimkan hasilnya.' },
  { title: 'Koneksi & Bobot', icon: '🔗', color: '#6366f1', short: 'Pengatur kekuatan transmisi.', description: 'Menentukan seberapa penting sebuah informasi. Semakin besar bobot, semakin kuat pengaruh data tersebut terhadap keputusan akhir.' },
  { title: 'Proses Belajar', icon: '⚙️', color: '#f43f5e', short: 'Adaptasi otomatis sistem.', description: 'Jaringan memperbaiki diri secara otomatis dengan menyesuaikan bobot koneksi setiap kali menemukan kesalahan prediksi.' }
];

const openPopup = (card) => { activeCard.value = card; isPopupOpen.value = true; };
const closePopup = () => (isPopupOpen.value = false);

// Background Animation (Tetap D3)
onMounted(() => {

  const svg = d3.select(networkSVG.value);
  const width = window.innerWidth, height = window.innerHeight;
  svg.attr("width", width).attr("height", height);
  const nodes = d3.range(35).map(i => ({ id: i }));
  const links = d3.range(50).map(() => ({ source: Math.floor(Math.random()*35), target: Math.floor(Math.random()*35) }));
  
  const link = svg.append("g").selectAll("line").data(links).enter().append("line").attr("stroke", "#6366f1").attr("opacity", 0.1);
  const node = svg.append("g").selectAll("circle").data(nodes).enter().append("circle").attr("r", 3).attr("fill", "#38bdf8").attr("opacity", 0.3);

  d3.forceSimulation(nodes).force("link", d3.forceLink(links).distance(200)).force("charge", d3.forceManyBody().strength(-150)).force("center", d3.forceCenter(width/2, height/2))
    .on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      node.attr("cx", d => d.x).attr("cy", d => d.y);
    });
});

// Popup visualisasi
const renderPopupVisual = async () => {
  await nextTick();
  const container = document.querySelector("#d3-popup-canvas");
  if (!container) return;
  const w = container.clientWidth, h = container.clientHeight;
  d3.select("#d3-popup-canvas").selectAll("*").remove();
  const svg = d3.select("#d3-popup-canvas").append("svg").attr("width", "100%").attr("height", "100%");
  const color = activeCard.value.color;

  if (activeCard.value.title === 'Neuron Buatan') {
    svg.append("circle").attr("cx", w/2).attr("cy", h/2).attr("r", 45).attr("fill", "none").attr("stroke", color).attr("stroke-width", 3);
    for(let i=0; i<3; i++) {
      const p = svg.append("circle").attr("r", 6).attr("fill", color);
      gsap.fromTo(p.node(), { attr: { cx: 40, cy: (h/4)*(i+1) } }, { attr: { cx: w/2 - 45, cy: h/2 }, opacity: 0, duration: 2, repeat: -1, delay: i*0.4 });
    }
  } else {
    const mainCircle = svg.append("circle").attr("cx", w/2).attr("cy", h/2).attr("r", 30).attr("fill", color).attr("opacity", 0.6);
    gsap.to(mainCircle.node(), { r: 60, opacity: 0, duration: 1.5, repeat: -1 });
  }
};
</script>

<style scoped>
.presentation-space {
  width: 100vw; height: 100vh; background: #020617;
  display: flex; justify-content: center; align-items: center;
  position: relative; overflow: hidden; font-family: 'Inter', sans-serif;
}

.network-svg { position: absolute; inset: 0; z-index: 1; pointer-events: none; }

.slide-fixed-box {
  position: relative; z-index: 2; width: 85vw; aspect-ratio: 16 / 9;
  background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 40px;
  padding: 4rem; display: flex; flex-direction: column; 
}

/* Hapus animasi muncul, tampil langsung */
.slide-header {
  /* Tidak perlu diubah, tetap default */
  
}


.status-badge { display: flex; align-items: center; gap: 10px; color: #6366f1; font-family: monospace; font-weight: bold; margin-bottom: 1rem; font-size: 1rem; }
.pulse { width: 10px; height: 10px; background: #6366f1; border-radius: 50%; box-shadow: 0 0 10px #6366f1; animation: pulse-kf 2s infinite; }
.main-title { font-size: 2rem; font-weight: 900; color: white; line-height: 1; letter-spacing: -2px; }
.accent { color: #38bdf8; text-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
.main-subtitle { font-size: 1.5rem; color: #94a3b8; margin-top: 15px; margin-bottom: 3rem; }

.slide-body { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-top: 3rem; flex-grow: 1; align-items: center; }

.content-column { display: flex; flex-direction: column; gap: 1.5rem; }

.ppt-card {
  background: rgba(30, 41, 59, 0.4); padding: 1.8rem 2.2rem; border-radius: 24px;
  display: flex; align-items: center; gap: 1.8rem; cursor: pointer;
  border-left: 8px solid var(--accent-color); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.ppt-card:hover { transform: translateX(25px); background: rgba(255,255,255,0.08); }

.visual-icon { font-size: 3.5rem; }

.card-info h3 { font-size: 2rem; color: #fff; margin-bottom: 4px; font-weight: 800; }
.card-info p { font-size: 1.2rem; color: #94a3b8; margin: 0; }

.hero-image-frame img { margin-left: 12rem; width: 50%; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
.image-label { margin-top: 1.5rem; font-size: 1.6rem; color: white; font-weight: bold; text-align: center; }
.image-label span { color: #38bdf8; }

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(2, 6, 23, 0.96);
  z-index: 100; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(25px);
}
.modal-window {
  background: #0f172a; width: 950px; padding: 4rem;
  border-radius: 45px; border: 1px solid rgba(255,255,255,0.1); position: relative;
}
.modal-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: center; }

.m-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
.m-visual-icon { font-size: 4rem; }
.m-header h2 { font-size: 3.5rem; font-weight: 900; margin: 0; }
.m-desc { font-size: 1.8rem; color: #cbd5e1; line-height: 1.6; }

.d3-container { background: #020617; height: 350px; border-radius: 30px; border: 1px solid #1e293b; }
.viz-note { margin-top: 1rem; color: #64748b; font-size: 1rem; text-align: center; font-family: monospace; }

.modal-close { position: absolute; top: 2.5rem; right: 2.5rem; font-size: 3rem; color: #475569; background: none; border: none; cursor: pointer; transition: 0.3s; }
.modal-close:hover { color: white; transform: rotate(90deg); }

/* Badges */
.status-badge { display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; color: #6366f1; font-weight: bold; letter-spacing: 1px; }
.pulse { width: 12px; height: 12px; background: #38bdf8; border-radius: 50%; box-shadow: 0 0 15px #38bdf8; animation: glow 2s infinite; }
@keyframes glow { 0% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } 100% { opacity: 0.5; transform: scale(1); } }

/* Transitions */
.ppt-zoom-enter-active, .ppt-zoom-leave-active { transition: 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.ppt-zoom-enter-from, .ppt-zoom-leave-to { opacity: 0; transform: scale(0.8) translateY(40px); }
</style>
