<template>
  <div class="ppt-slide-content">
    <header class="slide-header">
      <div class="badge">SYSTEM_ARCHITECTURE // CHAPTER_05</div>
      <h1 class="title">Struktur <span class="accent">Neural Network</span></h1>
    </header>

    <div class="structure-layout">
      <!-- PANEL KIRI: DIAGRAM (TETAP) -->
      <div class="diagram-panel">
        <div class="image-wrapper">
          <img src="https://miro.medium.com/v2/resize:fit:1400/1*8M5ArIqlccl3ktRUvs00qA.png" class="main-img" />
        </div>
      </div>

      <!-- PANEL KANAN: 5 STRUKTUR (DIPERKECIL/COMPACT) -->
      <div class="details-panel">
        <div v-for="item in structure" :key="item.title" 
             class="struct-item" 
             :style="{ '--item-color': item.color }"
             @click="openPopup(item)">
          <div class="item-content">
            <div class="layer-title" :style="{ color: item.color }">{{ item.title }}</div>
            <p class="item-short">{{ item.short }}</p>
          </div>
          <div class="item-arrow">→</div>
        </div>
      </div>
    </div>

    <!-- MODAL POPUP VISUALISASI -->
    <Transition name="premium-zoom" @after-enter="renderD3Visual">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-window">
          <button class="close-btn" @click="closePopup">✕</button>
          <div class="modal-grid">
            <div class="text-section">
              <h2 :style="{ color: activeData.color }">{{ activeData.title }}</h2>
              <div class="divider" :style="{ background: activeData.color }"></div>
              <p class="m-desc">{{ activeData.description }}</p>
            </div>
            <div class="visual-section">
              <div id="d3-popup-viz" class="d3-canvas"></div>
              <div class="viz-label" v-html="activeData.mathLabel"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import * as d3 from 'd3';
import gsap from 'gsap';

const isPopupOpen = ref(false);
const activeData = ref({});

const structure = [
  { 
    title: 'Input Layer', color: '#38bdf8', 
    short: 'Penerima fitur data awal.', 
    description: 'Lapisan pertama yang menerima data mentah (seperti nilai piksel atau sensor). Setiap neuron di sini mewakili satu variabel input tanpa melakukan komputasi.',
    mathLabel: 'Representasi Data: <span class="math">X₁, X₂, ..., Xₙ</span>'
  },
  { 
    title: 'Hidden Layer', color: '#6366f1', 
    short: 'Pusat ekstraksi pola.', 
    description: 'Lapisan "cerdas" di mana pola kompleks dipelajari. Semakin banyak lapisan ini, semakin mampu AI memahami hubungan data yang sangat rumit.',
    mathLabel: 'Deep Learning: <span class="math">Multiple Layers Pipeline</span>'
  },
  { 
    title: 'Neuron & Bobot', color: '#94a3b8', 
    short: 'Koneksi & kekuatan sinyal.', 
    description: 'Bobot (Weight) menentukan pengaruh input. Di sini terjadi perkalian antara data dengan bobotnya untuk menentukan signifikansi informasi.',
    mathLabel: 'Kalkulasi: <span class="math">Σ(Weight × Input) + Bias</span>'
  },
  { 
    title: 'Fungsi Aktivasi', color: '#f59e0b', 
    short: 'Saklar keputusan non-linear.', 
    description: 'Mengubah hasil kalkulasi menjadi format yang bermakna. Sigmoid, misalnya, memetakan nilai ke rentang 0-1 untuk memberikan probabilitas aktif.',
    mathLabel: 'Fungsi Sigmoid: <span class="math">σ(z) = 1 / (1 + e⁻ᶻ)</span>'
  },
  { 
    title: 'Output Layer', color: '#f43f5e', 
    short: 'Kesimpulan hasil prediksi.', 
    description: 'Lapisan final yang memberikan jawaban. Untuk klasifikasi gambar, ia akan memberitahu kelas mana yang memiliki probabilitas tertinggi.',
    mathLabel: 'Prediksi: <span class="math">ŷ (Probability Class)</span>'
  }
];

const openPopup = (data) => { activeData.value = data; isPopupOpen.value = true; };
const closePopup = () => isPopupOpen.value = false;

const renderD3Visual = async () => {
  await nextTick();
  const container = document.querySelector("#d3-popup-viz");
  if (!container) return;

  const w = container.clientWidth;
  const h = container.clientHeight;
  d3.select("#d3-popup-viz").selectAll("*").remove();
  const svg = d3.select("#d3-popup-viz").append("svg").attr("width", "100%").attr("height", "100%");
  const color = activeData.value.color;

  // --- LOGIKA VISUALISASI PER STRUKTUR ---
  if (activeData.value.title === 'Fungsi Aktivasi') {
    const x = d3.scaleLinear().domain([-5, 5]).range([80, w - 80]);
    const y = d3.scaleLinear().domain().range([h - 80, 80]);
    const line = d3.line().x(d => x(d.x)).y(d => y(1 / (1 + Math.exp(-d.x)))).curve(d3.curveBasis);
    const path = svg.append("path").datum(d3.range(-5, 5.1, 0.1).map(x => ({x}))).attr("fill", "none").attr("stroke", color).attr("stroke-width", 8).attr("d", line);
    const len = path.node().getTotalLength();
    path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len).transition().duration(1200).attr("stroke-dashoffset", 0);
  } 
  else if (activeData.value.title === 'Neuron & Bobot') {
    const group = svg.append("g").attr("transform", `translate(${w/2}, ${h/2})`);
    group.append("circle").attr("r", 90).attr("fill", "none").attr("stroke", color).attr("stroke-width", 5).style("filter", `drop-shadow(0 0 20px ${color})`);
    group.append("text").attr("text-anchor", "middle").attr("dy", ".35em").attr("fill", "#fff").style("font-size", "2rem").text("Σ wx + b");
    
    // Sinyal Bobot masuk
    for(let i=0; i<4; i++) {
        const p = svg.append("circle").attr("r", 5).attr("fill", color);
        gsap.fromTo(p.node(), { attr: { cx: 50, cy: (h/5)*(i+1) }, opacity: 1 }, { attr: { cx: w/2 - 95, cy: h/2 }, opacity: 0, duration: 2, repeat: -1, delay: i*0.4 });
    }
  } 
  else if (activeData.value.title === 'Input Layer') {
    const nodes = d3.range(5).map(i => ({ x: 100, y: (h/6)*(i+1) }));
    svg.selectAll("circle").data(nodes).enter().append("circle")
       .attr("cx", d => d.x).attr("cy", d => d.y).attr("r", 0).attr("fill", color)
       .transition().duration(800).attr("r", 30);
    // Sinyal mengalir keluar
    nodes.forEach(d => {
       const s = svg.append("circle").attr("r", 4).attr("fill", color);
       gsap.to(s.node(), { attr: { cx: w, cy: d.y }, duration: 2, repeat: -1, delay: Math.random() });
    });
  }
  else if (activeData.value.title === 'Output Layer') {
    const nodes = d3.range(3).map(i => ({ x: w-100, y: (h/4)*(i+1) }));
    svg.selectAll("circle").data(nodes).enter().append("circle")
       .attr("cx", d => d.x).attr("cy", d => d.y).attr("r", 30).attr("fill", color);
    // Sinyal Prediksi terpilih
    const winner = svg.append("circle").attr("cx", w-100).attr("cy", (h/4)*2).attr("r", 30).attr("fill", "#fff").attr("opacity", 0.3);
    gsap.to(winner.node(), { r: 50, opacity: 0, duration: 1, repeat: -1 });
  }
  else {
    // Hidden Layer: Pipeline Grid
    for(let i=0; i<3; i++) {
        for(let j=0; j<4; j++) {
            svg.append("circle").attr("cx", (w/4)*(i+1)).attr("cy", (h/5)*(j+1)).attr("r", 15).attr("fill", color).attr("opacity", 0.5);
        }
    }
  }
};
</script>


<style scoped>
/* Reset & Slide Layout */
.ppt-slide-content { width: 100vw; height: 100vh; background: #020617; padding: 3vh 5vw; display: flex; flex-direction: column; overflow: hidden; box-sizing: border-box; }
.slide-header { margin-bottom: 2vh; }
.title { font-size: 4rem; font-weight: 900; letter-spacing: -3px; line-height: 1; }
.accent { color: #38bdf8; }
.badge { background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 0.5rem 1.2rem; border-radius: 50px; font-weight: bold; font-size: 0.9rem; margin-bottom: 0.5rem; display: inline-block; border: 1px solid rgba(56,189,248,0.3); }

/* Grid Layout */
.structure-layout { display: grid; grid-template-columns: 1fr 0.8fr; gap: 4vw; flex-grow: 1; align-items: center; min-height: 0; }
.diagram-panel { background: rgba(30, 41, 59, 0.2); padding: 1rem; border-radius: 25px; border: 1px solid rgba(255,255,255,0.05); }
.main-img { width: 100%; border-radius: 15px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }

/* Panel Kanan Diperkecil */
.details-panel { display: flex; flex-direction: column; gap: 1vh; justify-content: center; }
.struct-item { 
  background: rgba(30, 41, 59, 0.4); 
  padding: 1rem 1.8rem; /* Padding dikecilkan */
  border-radius: 18px; 
  display: flex; align-items: center; justify-content: space-between;
  border-left: 8px solid var(--item-color); 
  cursor: pointer; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.struct-item:hover { transform: translateX(15px); background: rgba(255,255,255,0.08); }

/* Teks Panel Kanan */
.layer-title { font-size: 1.6rem; font-weight: 900; margin-bottom: 2px; }
.item-short { color: #94a3b8; font-size: 1.1rem; margin: 0; line-height: 1.2; }
.item-arrow { font-size: 1.8rem; opacity: 0.2; }

/* Modal / Popup */
.modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.98); z-index: 1000; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(30px); }
.modal-window { background: #0f172a; width: 85vw; max-width: 1500px; padding: 4rem; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); position: relative; }
.modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
.text-section h2 { font-size: 4rem; font-weight: 900; margin-bottom: 1rem; }
.divider { width: 100px; height: 8px; border-radius: 20px; margin-bottom: 1.5rem; }
.m-desc { font-size: 2rem; color: #cbd5e1; line-height: 1.4; }

.d3-canvas { width: 100%; height: 400px; background: #020617; border-radius: 35px; border: 1px solid #1e293b; margin-bottom: 1.5rem; }
.viz-label { font-size: 1.5rem; color: #64748b; font-family: monospace; text-align: center; }
.viz-label :deep(.math) { color: #38bdf8; font-weight: bold; }

.close-btn { position: absolute; top: 2rem; right: 2rem; font-size: 3rem; color: #475569; background: none; border: none; cursor: pointer; transition: 0.3s; }
.close-btn:hover { color: white; transform: rotate(90deg); }

/* Premium Zoom Transition */
.premium-zoom-enter-active, .premium-zoom-leave-active { transition: 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.premium-zoom-enter-from, .premium-zoom-leave-to { opacity: 0; transform: scale(0.8) translateY(50px); }
</style>
