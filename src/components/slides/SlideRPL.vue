<template>
  <SpotlightWrapper class="slide-container">
    <!-- Blueprint Background -->
    <div class="blueprint-bg"></div>

    <div class="content-grid">
      <!-- SISI KIRI: DEFINISI (Materi Anda) -->
      <div class="text-side">
        <div class="tag-wrapper" ref="tag">
          <span class="tag">DEFINITION</span>
          <span class="status-badge">DOCS_V1.0</span>
        </div>
        
        <h2 ref="title" class="main-title">
          Apa itu <span class="gradient-text">RPL?</span>
        </h2>
        
        <p ref="desc" class="description">
          <span class="text-accent">></span> Rekayasa Perangkat Lunak (RPL) adalah bidang ilmu yang mempelajari cara merancang, membangun, menguji, dan memelihara perangkat lunak dengan pendekatan yang terstruktur dan sistematis agar software berkualitas dan sesuai kebutuhan pengguna.
        </p>

        <!-- KONSEP UTAMA RPL (Materi Anda) -->
        <div class="points-list">
          <div v-for="(item, i) in points" :key="i" class="point-item" ref="pointRefs">
            <div class="point-icon-box">
              <span class="icon">{{ item.icon }}</span>
            </div>
            <div class="point-text">
              <strong>{{ item.title }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- SISI KANAN: VISUAL (Dashboard Developer) -->
      <div class="visual-side" ref="visual">
        <div class="dev-dashboard">
          <!-- Window: Analisis Kebutuhan -->
          <div class="window code-window">
            <div class="win-header">
              <span class="dot-r"></span><span class="dot-y"></span><span class="dot-g"></span>
              <span class="win-title">system_architecture.js</span>
            </div>
            <div class="win-content">
              <pre><code><span class="k">if</span> (user_needs === <span class="s">'COMPLEX'</span>) {
  <span class="n">apply_structured_approach</span>();
  <span class="v">return</span> <span class="n">HIGH_QUALITY_SOFTWARE</span>;
}</code></pre>
            </div>
          </div>

          <!-- Circular Core -->
          <div class="core-node">
            <div class="orbit-ring"></div>
            <div class="node-center">RPL</div>
          </div>

          <!-- Window: Maintenance Stats -->
          <div class="window status-window">
            <div class="stat-row">
              <span class="label">SECURE</span>
              <div class="bar-bg"><div class="bar-fill" style="width: 85%"></div></div>
            </div>
            <div class="stat-row">
              <span class="label">SCALABLE</span>
              <div class="bar-bg"><div class="bar-fill" style="width: 95%"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SpotlightWrapper>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import SpotlightWrapper from "../SpotlightWrapper.vue";

const title = ref(null);
const tag = ref(null);
const desc = ref(null);
const visual = ref(null);
const pointRefs = ref([]);

// Mapping Materi Konsep Utama Anda
const points = [
  { icon: '📑', title: 'Proses & tahapan yang jelas' },
  { icon: '🚫', title: 'Tidak hanya fokus pada coding' },
  { icon: '🔍', title: 'Analisis & perancangan sistem' },
  { icon: '🛡️', title: 'Kualitas, perbaikikan & keberlanjutan' },
  { icon: '🚀', title: 'Aplikasi siap guna & scalable' }
];

onMounted(() => {
  const tl = gsap.timeline();
  tl.from(tag.value, { opacity: 0, x: -30, duration: 0.6 })
    .from(title.value, { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
    .from(desc.value, { opacity: 0, x: -20, duration: 0.6 }, "-=0.5")
    .from(visual.value, { opacity: 0, scale: 0.8, duration: 1 }, "-=0.8")
    .from(pointRefs.value, { opacity: 0, x: -20, stagger: 0.1, duration: 0.4 }, "-=0.4");
});
</script>

<style scoped>
.slide-container {
  height: 100vh; background: #020617; color: white;
  display: flex; align-items: center; justify-content: center;
  padding: 60px 10%;  overflow: hidden; font-family: 'JetBrains Mono', monospace;
}

.blueprint-bg {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(56, 189, 248, 0.05) 1px, transparent 0);
  background-size: 30px 30px;
}

.content-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 4rem; z-index: 10; }

.tag { color: #38bdf8; font-weight: 700; letter-spacing: 3px; font-size: 0.8rem; }
.status-badge { background: #38bdf811; color: #38bdf8; font-size: 0.6rem; padding: 2px 8px; border-radius: 4px; margin-left: 10px; border: 1px solid #38bdf833; }

.main-title { font-size: clamp(2rem, 5vw, 4rem); font-weight: 800; margin-bottom: 1.5rem; line-height: 1; }
.gradient-text { background: linear-gradient(to right, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

.description { color: #94a3b8; font-size: 1.05rem; margin-bottom: 2rem; line-height: 1.6; border-left: 3px solid #38bdf8; padding-left: 20px; }
.text-accent { color: #38bdf8; font-weight: bold; }

/* POINTS STYLE */
.points-list { display: grid; grid-template-columns: 1fr; gap: 12px; }
.point-item { 
  display: flex; align-items: center; gap: 15px; 
  background: rgba(30, 41, 59, 0.4); padding: 12px 20px; 
  border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.1);
}
.point-icon-box { font-size: 1.2rem; }
.point-text strong { font-size: 0.95rem; color: #f1f5f9; font-weight: 500; }

/* VISUAL SIDE */
.dev-dashboard { position: relative; height: 100%; display: flex; align-items: center; justify-content: center; }
.window { background: #0f172a; border-radius: 10px; border: 1px solid #1e293b; box-shadow: 0 20px 50px rgba(0,0,0,0.5); position: absolute; z-index: 5; }
.win-header { padding: 8px 15px; border-bottom: 1px solid #1e293b; display: flex; align-items: center; gap: 6px; }
.win-header span { width: 8px; height: 8px; border-radius: 50%; }
.dot-r { background: #ff5f56; } .dot-y { background: #ffbd2e; } .dot-g { background: #27c93f; }
.win-title { font-size: 0.6rem; color: #475569; margin-left: 10px; }
.win-content { padding: 15px; font-size: 0.75rem; color: #38bdf8; }

.code-window { top: -40px; right: -20px; width: 280px; }
.status-window { bottom: -40px; left: -20px; width: 220px; padding: 15px; }

.stat-row { margin-bottom: 10px; }
.label { font-size: 0.6rem; color: #64748b; display: block; margin-bottom: 4px; }
.bar-bg { width: 100%; height: 4px; background: #1e293b; border-radius: 2px; }
.bar-fill { height: 100%; background: #38bdf8; border-radius: 2px; }

.core-node { width: 180px; height: 180px; position: relative; display: flex; justify-content: center; align-items: center; }
.node-center { 
  width: 90px; height: 90px; background: #020617; border: 2px solid #38bdf8; 
  border-radius: 50%; display: flex; justify-content: center; align-items: center;
  font-weight: 900; font-size: 1.5rem; color: #38bdf8; box-shadow: 0 0 30px rgba(56, 189, 248, 0.3);
}
.orbit-ring { position: absolute; width: 100%; height: 100%; border: 1px dashed rgba(56, 189, 248, 0.2); border-radius: 50%; animation: spin 20s linear infinite; }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
