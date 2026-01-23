<template>
  <div class="main-wrapper">
    <!-- 1. LOADER LAYER -->
    <transition name="fade">
      <div v-if="isLoading" class="loader-overlay">
        <div class="loader-content">
          <div class="orbit-spinner"></div>
          <div class="logo-wrapper">
            <span class="bracket-code">&lt;</span>
            <span class="nn-text">NN</span>
            <span class="bracket-code">/&gt;</span>
          </div>
          <div class="progress-container">
            <div class="progress-bar"></div>
          </div>
          <p class="status-msg">{{ loadingStatus }}</p>
        </div>
      </div>
    </transition>

    <!-- 2. HERO CONTENT LAYER -->
    <section class="hero-container" v-show="!isLoading">
      <!-- Background Interaktif -->
      <svg ref="bg" class="neural-canvas"></svg>
      <div class="mouse-glow" ref="spotlightRef"></div>

      <!-- Main Layout -->
      <div class="content-frame">
        
        <!-- Top Header -->
        <header class="header-meta zoom-proximity">
          <span class="tag">PENGANTAR INFORMATIKA</span>
          <div class="h-line"></div>
          <span class="tag">SYNAPTIC CORE V1.0</span>
        </header>

        <!-- Center Branding -->
        <main class="branding-group">
          <div class="pillar-label zoom-proximity">KELOMPOK 7</div>
          <h1 class="main-title">
            <span class="text-fill zoom-proximity">NEURAL</span>
            <span class="text-outline zoom-proximity">NETWORK</span>
          </h1>
          <p class="tagline zoom-proximity">FONDASI KECERDASAN BUATAN MODERN</p>
        </main>

        <!-- Bottom Info -->
        <footer class="footer-info">
          <div class="team-grid zoom-proximity">
            <div class="member">HILAL ABDILAH</div>
            <div class="v-divider"></div>
            <div class="member">MUHAMMAD NAZIM</div>
            <div class="v-divider"></div>
            <div class="member">GILANG SAPUTRA</div>
            <div class="v-divider"></div>
            <div class="member">ARUM ROHIMAH</div>
            <div class="v-divider"></div>
            <div class="member">DINDA</div>
          </div>
          <div class="institution zoom-proximity">
            TEKNIK INFORMATIKA • STMIK DCI TASIKMALAYA
          </div>
        </footer>

      </div>

      <!-- System Telemetry -->
      <div class="telemetry">
        <div class="tel-item">25/01/2026</div>
        <div class="tel-item">STATUS: STABLE</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as d3 from "d3";
import gsap from "gsap";

const isLoading = ref(true);
const loadingStatus = ref("INITIALIZING...");
const bg = ref(null);
const spotlightRef = ref(null);

onMounted(() => {
  // Sequence Loading
  const sequence = ["LOADING_NEURONS...", "BUILDING_SYNAPSES...", "OPTIMIZING_LAYERS...", "COMPLETE"];
  sequence.forEach((s, i) => setTimeout(() => loadingStatus.value = s, i * 700));

  setTimeout(() => {
    isLoading.value = false;
    setTimeout(() => {
      initD3();
      initInteractivity();
    }, 100);
  }, 2800);
});

function initD3() {
  const svg = d3.select(bg.value);
  const w = window.innerWidth;
  const h = window.innerHeight;
  svg.attr("viewBox", `0 0 ${w} ${h}`);

  const layers = [w * 0.15, w * 0.4, w * 0.6, w * 0.85];
  const nodes = [];
  
  layers.forEach((x, lIdx) => {
    const count = lIdx === 0 || lIdx === 3 ? 5 : 8;
    for(let i=0; i<count; i++) {
      nodes.push({ id: `l${lIdx}n${i}`, x, y: (h/(count+1))*(i+1), color: lIdx === 3 ? '#06b6d4' : '#6366f1' });
    }
  });

  const links = [];
  nodes.forEach(s => nodes.forEach(t => {
    if (t.x > s.x && (t.x - s.x) < w * 0.3) links.push({ s, t });
  }));

  svg.append("g").selectAll("line").data(links).join("line")
    .attr("x1", d => d.s.x).attr("y1", d => d.s.y).attr("x2", d => d.t.x).attr("y2", d => d.t.y)
    .attr("stroke", "rgba(99,102,241,0.1)").attr("stroke-width", 1);

  svg.append("g").selectAll("circle").data(nodes).join("circle")
    .attr("cx", d => d.x).attr("cy", d => d.y).attr("r", 6)
    .attr("fill", d => d.color).style("filter", "blur(1px)");
}

function initInteractivity() {
  // Spotlight
  window.addEventListener("mousemove", e => {
    if(!spotlightRef.value) return;
    gsap.to(spotlightRef.value, {
      background: `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,0.15) 0%, transparent 60%)`,
      duration: 0.5
    });

    // Proximity Zoom
    document.querySelectorAll(".zoom-proximity").forEach(el => {
      const r = el.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width/2), e.clientY - (r.top + r.height/2));
      const scale = d < 300 ? 1 + (1 - d/300) * 0.1 : 1;
      gsap.to(el, { scale, duration: 0.4 });
    });
  });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com');

/* --- RESET & WRAPPER --- */
.main-wrapper {
  background: #000;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Outfit', sans-serif;
}

/* --- CLEAN LOADER --- */
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #020617;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 80px;
  font-weight: 800;
  color: #fff;
}

.bracket-code { color: #6366f1; opacity: 0.6; font-family: 'JetBrains Mono'; }
.nn-text { letter-spacing: 10px; text-shadow: 0 0 30px #6366f1; }

.progress-container {
  width: 280px;
  height: 2px;
  background: rgba(255,255,255,0.05);
  margin-top: 40px;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  width: 100%;
  height: 100%;
  background: #6366f1;
  transform: translateX(-100%);
  animation: load 2.5s forwards cubic-bezier(0.4, 0, 0.2, 1);
}

.status-msg {
  margin-top: 15px;
  font-family: 'JetBrains Mono';
  font-size: 0.7rem;
  letter-spacing: 4px;
  color: #64748b;
}

/* --- HERO SECTION --- */
.hero-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.neural-canvas { position: absolute; inset: 0; z-index: 1; }
.mouse-glow { position: absolute; inset: 0; z-index: 2; pointer-events: none; }

.content-frame {
  position: relative;
  z-index: 10;
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}

.content-frame * { pointer-events: auto; }

/* HEADER META */
.header-meta {
  display: flex;
  align-items: center;
  gap: 20px;
}

.tag { font-family: 'JetBrains Mono'; font-size: 0.75rem; letter-spacing: 4px; color: #6366f1; }
.h-line { width: 60px; height: 1px; background: rgba(99,102,241,0.3); }

/* BRANDING GROUP */
.branding-group { text-align: center; }

.pillar-label {
  display: inline-block;
  background: #6366f1;
  color: #fff;
  padding: 6px 25px;
  font-weight: 800;
  letter-spacing: 6px;
  transform: skewX(-15deg);
  margin-bottom: 1.5rem;
}

.main-title {
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 800;
  line-height: 0.8;
  margin: 0;
}

.text-fill { color: #fff; }
.text-outline {
  color: transparent;
  -webkit-text-stroke: 2px #06b6d4;
  margin-left: 15px;
}

.tagline {
  font-size: clamp(1rem, 2vw, 1.8rem);
  font-weight: 300;
  letter-spacing: 12px;
  margin-top: 2rem;
  color: #94a3b8;
  text-transform: uppercase;
}

/* FOOTER INFO */
.footer-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.team-grid {
  display: flex;
  align-items: center;
  gap: 30px;
}

.member { font-weight: 600; letter-spacing: 2px; color: #f8fafc; font-size: 1.1rem; }
.v-divider { width: 1px; height: 15px; background: #06b6d4; }
.institution {
  font-family: 'JetBrains Mono';
  font-size: 0.85rem;
  color: #475569;
  letter-spacing: 3px;
}

/* TELEMETRY */
.telemetry {
  position: absolute;
  bottom: 30px;
  right: 40px;
  text-align: right;
  z-index: 10;
}

.tel-item {
  font-family: 'JetBrains Mono';
  font-size: 0.6rem;
  color: #1e293b;
  letter-spacing: 2px;
}

/* ANIMATIONS */
@keyframes load { to { transform: translateX(0); } }
.fade-leave-active { transition: opacity 1s ease; }
.fade-leave-to { opacity: 0; }
</style>
