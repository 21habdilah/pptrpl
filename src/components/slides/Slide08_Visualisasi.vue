<template>
  <div class="ppt-slide">
    <header class="slide-header">
      <div class="badge">AI_ARCHITECTURE // CHAPTER_08</div>
      <h1 class="title">Cara Kerja <span class="accent">Neural Network</span></h1>
    </header>

    <div class="work-flow-container">
      <div v-for="(step, index) in steps" :key="index" class="flow-item">
        <div class="step-number">{{ index + 1 }}</div>
        <div 
          class="step-card" 
          @mouseenter="onMouseEnterCard" 
          @mousemove="onMouseMoveCard"
          @mouseleave="onMouseLeaveCard"
          @click="openPopup(step)"
        >
          <h3>{{ step.title }}</h3>
          <p>{{ step.short }}</p>
        </div>
        <div v-if="index < steps.length - 1" class="flow-arrow">→</div>
      </div>
    </div>

    <!-- POPUP VISUALISASI -->
    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-content">
          <button class="close-btn" @click="closePopup">✕</button>
          <div class="m-header">
             <div class="m-num">Langkah {{ activeData.num }}</div>
             <h2>{{ activeData.title }}</h2>
          </div>
          <p class="m-desc">{{ activeData.description }}</p>
          
          <div class="m-image-box">
             <div id="d3-viz"></div>
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

const steps = [
  { num: 1, title: 'Input Data', short: 'Penerimaan data mentah.', description: 'Setiap neuron di Input Layer menerima satu fitur data (seperti nilai piksel gambar).' },
  { num: 2, title: 'Forward Pass', short: 'Perhitungan berbobot.', description: 'Data dikalikan dengan bobot (weights) dan ditambahkan bias saat mengalir ke depan.' },
  { num: 3, title: 'Activation', short: 'Transformasi non-linear.', description: 'Fungsi Sigmoid memastikan jaringan dapat mempelajari pola yang kompleks (non-linear).' },
  { num: 4, title: 'Prediction', short: 'Hasil keputusan akhir.', description: 'Output layer memberikan prediksi final (misal: "Kucing" dengan probabilitas 98%).' },
  { num: 5, title: 'Learning', short: 'Backpropagation.', description: 'Model mengoreksi bobot secara otomatis berdasarkan tingkat kesalahan (error) yang ditemukan.' }
];

// --- GSAP PARALLAX & HOVER ---
const onMouseEnterCard = (e) => {
  gsap.to(e.currentTarget, { duration: 0.4, scale: 1.05, borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)' });
};

const onMouseMoveCard = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) - rect.width / 2;
  const y = (e.clientY - rect.top) - rect.height / 2;
  gsap.to(card, { duration: 0.2, rotationY: x / 15, rotationX: -y / 15, ease: "power1.out" });
};

const onMouseLeaveCard = (e) => {
  gsap.to(e.currentTarget, { duration: 0.6, rotationX: 0, rotationY: 0, scale: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(30, 41, 59, 0.4)', ease: "elastic.out(1, 0.5)" });
};

// --- MODAL TRANSITIONS ---
const onEnter = (el, done) => {
  const content = el.querySelector('.modal-content');
  gsap.fromTo(el, { opacity: 0 }, { duration: 0.3, opacity: 1 });
  gsap.fromTo(content, { y: 100, scale: 0.8, opacity: 0 }, { duration: 0.5, y: 0, scale: 1, opacity: 1, ease: "back.out(1.4)", onComplete: () => {
    renderD3Visual();
    done();
  }});
};

const onLeave = (el, done) => {
  gsap.to(el, { duration: 0.3, opacity: 0, onComplete: done });
};

// --- D3 VISUALIZATION ---
const renderD3Visual = async () => {
  await nextTick();
  const container = document.querySelector("#d3-viz");
  if (!container) return;
  const width = container.clientWidth;
  const height = 350;
  d3.select("#d3-viz").selectAll("*").remove();
  
  const svg = d3.select("#d3-viz").append("svg").attr("width", "100%").attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);

  if (activeData.value.num === 3) {
    // Kurva Sigmoid
    const x = d3.scaleLinear().domain([-6, 6]).range([100, width - 100]);
    const y = d3.scaleLinear().domain([0, 1]).range([height - 50, 50]);
    const line = d3.line().x(d => x(d.x)).y(d => y(1 / (1 + Math.exp(-d.x)))).curve(d3.curveMonotoneX);
    const path = svg.append("path").datum(d3.range(-6, 6.1, 0.1).map(d => ({x: d}))).attr("fill", "none").attr("stroke", "#38bdf8").attr("stroke-width", 5).attr("d", line);
    const len = path.node().getTotalLength();
    path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len).transition().duration(1500).attr("stroke-dashoffset", 0);
  } else {
    // Network Diagram
    const layers = [3, 5, 2];
    const nodes = [];
    const links = [];
    layers.forEach((count, lIdx) => {
      const lx = (width / (layers.length + 1)) * (lIdx + 1);
      for (let i = 0; i < count; i++) {
        const ly = (height / (count + 1)) * (i + 1);
        nodes.push({ id: `l${lIdx}i${i}`, x: lx, y: ly, layer: lIdx });
      }
    });
    nodes.forEach(s => nodes.filter(t => t.layer === s.layer + 1).forEach(t => links.push({ s, t })));
    
    svg.selectAll("line").data(links).enter().append("line").attr("x1", d => d.s.x).attr("y1", d => d.s.y).attr("x2", d => d.t.x).attr("y2", d => d.t.y).attr("stroke", "rgba(255,255,255,0.1)");
    const circles = svg.selectAll("circle").data(nodes).enter().append("circle").attr("cx", d => d.x).attr("cy", d => d.y).attr("r", 0).attr("fill", d => d.layer === 0 ? "#38bdf8" : d.layer === 2 ? "#fbbf24" : "#6366f1");
    circles.transition().duration(600).delay((d,i) => i * 40).attr("r", 14);

    if (activeData.value.num === 2 || activeData.value.num === 5) {
      const rev = activeData.value.num === 5;
      links.forEach((l, i) => {
        const p = svg.append("circle").attr("r", 4).attr("fill", rev ? "#ef4444" : "#38bdf8");
        gsap.fromTo(p.node(), { attr: { cx: rev ? l.t.x : l.s.x, cy: rev ? l.t.y : l.s.y }, opacity: 1 }, { attr: { cx: rev ? l.s.x : l.t.x, cy: rev ? l.s.y : l.t.y }, opacity: 0, duration: 1.5, repeat: -1, delay: Math.random() });
      });
    }
  }
};

const openPopup = (step) => { activeData.value = step; isPopupOpen.value = true; };
const closePopup = () => isPopupOpen.value = false;
</script>

<style scoped>
.ppt-slide { 
  height: 100vh; width: 100vw; background: radial-gradient(circle at center, #0f172a, #020617);
  display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; font-family: 'Inter', sans-serif;
}
.slide-header { text-align: center; margin-bottom: 6rem; }
.title { font-size: 5rem; font-weight: 900; letter-spacing: -3px; }
.accent { color: #38bdf8; text-shadow: 0 0 20px rgba(56, 189, 248, 0.4); }
.badge { background: rgba(56, 189, 248, 0.1); color: #38bdf8; padding: 0.5rem 1.2rem; border-radius: 50px; font-size: 0.8rem; border: 1px solid rgba(56,189,248,0.3); margin-bottom: 1rem; display: inline-block; }

.work-flow-container { display: flex; align-items: center; width: 90%; max-width: 1400px; perspective: 1000px; }
.flow-item { display: flex; align-items: center; flex: 1; position: relative; }
.step-number { width: 50px; height: 50px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; position: absolute; top: -25px; left: 50%; transform: translateX(-50%); z-index: 10; border: 4px solid #020617; box-shadow: 0 5px 15px rgba(99,102,241,0.4); }
.step-card { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(10px); padding: 4rem 1.5rem 2rem; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); width: 100%; cursor: pointer; text-align: center; transform-style: preserve-3d; }
.step-card h3 { font-size: 1.6rem; color: #38bdf8; margin-bottom: 10px; transform: translateZ(20px); }
.step-card p { font-size: 1rem; color: #94a3b8; transform: translateZ(10px); }
.flow-arrow { font-size: 2rem; color: #334155; padding: 0 1rem; font-weight: bold; }

.modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.95); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(15px); }
.modal-content { background: #0f172a; width: 900px; padding: 4rem; border-radius: 40px; border: 1px solid #38bdf8; position: relative; }
.close-btn { position: absolute; top: 2rem; right: 2rem; font-size: 2.5rem; color: #64748b; background: none; border: none; cursor: pointer; }
.m-desc { font-size: 1.6rem; color: #cbd5e1; margin: 2rem 0; line-height: 1.5; }
.m-image-box { background: #020617; border-radius: 20px; padding: 2rem; border: 1px solid #1e293b; }
</style>
