<template>
  <div class="quantum-wrapper">
    <!-- ENGINE: NEURAL SINGULARITY CANVAS -->
    <canvas ref="neuralCanvas" class="neural-engine"></canvas>

    <!-- INTERFACE: OVERCLOCKED HUD -->
    <div class="hud-layer">
      <!-- Top Bar: System Telemetry -->
      <header class="hud-top">
        <div class="telemetry-item">
          <span class="label">ENGINE:</span>
          <span class="value glitch-text" data-text="SINGULARITY_V2.6">SINGULARITY_V2.6</span>
        </div>
        <div class="telemetry-item">
          <span class="label">LATENCY:</span>
          <span class="value">0.003ms</span>
        </div>
        <div class="telemetry-item date-box">
          <span class="value">28 // 01 // 2026</span>
        </div>
      </header>

      <!-- Center: The Core Branding -->
      <main class="hud-center">
        <div class="branding-box">
          <div class="overclock-badge">KELOMPOK 7</div>
          <h1 class="main-title">
            <span class="text-glow">NEURAL</span>
            <span class="text-hollow">NETWORK</span>
          </h1>
          <div class="data-scanner"></div>
          <p class="tagline">FONDASI KECERDASAN BUATAN MODERN</p>
        </div>
      </main>

      <!-- Bottom: Team & Hologram Logo -->
      <footer class="hud-bottom">
        <div class="team-grid">
          <div v-for="(name, i) in team" :key="i" class="member-tag">
            <div class="tag-id">0{{ i + 1 }}</div>
            <div class="tag-name">{{ name }}</div>
          </div>
        </div>

        <div class="institution-hologram">
          <div class="hologram-text">
            <h2 class="uni-name">STMIK DCI</h2>
            <p class="uni-dept">INFORMATIKA • KELOMPOK 7</p>
          </div>
          <div class="logo-core-box">
            <div class="quantum-ring"></div>
            <div class="quantum-ring-inner"></div>
            <img 
              src="../../assets/logo.png" 
              class="dci-logo-final"
            />
            <div class="light-beam"></div>
          </div>
        </div>
      </footer>
    </div>

    <!-- POST-PROCESSING EFFECTS -->
    <div class="noise-overlay"></div>
    <div class="chromatic-aberration"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const neuralCanvas = ref(null);
const team = ["HILAL ABDILAH", "MUHAMMAD NAZIM", "GILANG SURYA", "ARUM ROHIMAH", "DINDA SRI RAHAYU"];

let ctx, points = [], width, height;
let mouse = { x: -1000, y: -1000, active: false };

const initEngine = () => {
  const canvas = neuralCanvas.value;
  ctx = canvas.getContext('2d');
  resize();

  points = Array.from({ length: 100 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 2 + 1
  }));

  render();
};

const render = () => {
  ctx.fillStyle = "rgba(2, 6, 23, 0.2)"; 
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "lighter";

  points.forEach((p, i) => {
    // SINGULARITY PHYSICS (Mouse Gravity)
    if (mouse.active) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 400) {
        const force = (400 - dist) / 400;
        p.vx += (dx / dist) * force * 0.6;
        p.vy += (dy / dist) * force * 0.6;
      }
    }

    p.vx *= 0.95; p.vy *= 0.95;
    p.x += p.vx; p.y += p.vy;

    // Canvas Border Wrap
    if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;

    // Draw Synaptic Links
    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const d = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (d < 150) {
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - d/150)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // Draw Node
    ctx.fillStyle = "#06b6d4";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalCompositeOperation = "source-over";
  requestAnimationFrame(render);
};

const resize = () => {
  width = window.innerWidth;
  height = window.innerHeight;
  neuralCanvas.value.width = width;
  neuralCanvas.value.height = height;
};

onMounted(() => {
  initEngine();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    mouse.active = true;
  });

  // GSAP BEYOND LIMIT ANIMATION
  gsap.from(".main-title", { scale: 1.5, opacity: 0, duration: 2, ease: "expo.out" });
  gsap.from(".member-tag", { x: -50, opacity: 0, stagger: 0.1, duration: 1, ease: "back.out" });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com');

.quantum-wrapper {
  background: #010409; width: 100vw; height: 100vh;
  overflow: hidden; position: relative;
  font-family: 'JetBrains Mono', monospace; color: #fff;
}

.neural-engine { position: absolute; inset: 0; z-index: 1; }

.hud-layer {
  position: relative; z-index: 10; height: 100%;
  display: flex; flex-direction: column; padding: 2.5rem;
  pointer-events: none; background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%);
}
.hud-layer * { pointer-events: auto; }

/* TOP TELEMETRY */
.hud-top { display: flex; gap: 40px; border-bottom: 1px solid rgba(99, 102, 241, 0.2); padding-bottom: 15px; }
.telemetry-item { display: flex; flex-direction: column; }
.label { font-size: 0.6rem; color: #6366f1; font-weight: bold; }
.value { font-size: 0.8rem; letter-spacing: 2px; }
.date-box { margin-left: auto; color: #06b6d4; }

/* CENTER BRANDING */
.hud-center { flex: 1; display: flex; justify-content: center; align-items: center; }
.branding-box { text-align: center; position: relative; }
.overclock-badge { 
  display: inline-block; padding: 4px 15px; background: #6366f1; 
  font-size: 1.7rem; font-weight: 900; letter-spacing: 5px; margin-bottom: 1.5rem;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); transform: skewX(-15deg);
}
.main-title { font-family: 'Orbitron', sans-serif; font-size: 10rem; margin: 0; line-height: 1; }
.text-glow { color: #fff; text-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
.text-hollow { color: transparent; -webkit-text-stroke: 1.5px #06b6d4; margin-left: 20px; }
.tagline { letter-spacing: 12px; color: #94a3b8; font-size: 2rem; margin-top: 2rem; opacity: 0.8; }

/* BOTTOM HUD */
.hud-bottom { display: flex;  justify-content: space-between; align-items: flex-end; }
.team-grid {  display: grid; grid-template-columns: repeat(5, 1fr); gap: 30px; }
.member-tag { 
  display: flex; gap: 30px; background: rgba(255,255,255,0.03); 
  padding: 10px 20px; border-radius: 4px; border-left: 2px solid #06b6d4;
}
.tag-id { color: #6366f1; font-weight: bold; font-size: 0.7rem; }
.tag-name { font-size: 1.2rem; font-weight: bold; letter-spacing: 1px; }

/* HOLOGRAM LOGO DCI */
.institution-hologram { display: flex; align-items: center; gap: 30px; }
.hologram-text { text-align: right; }
.uni-name { font-family: 'Orbitron'; font-size: 1.5rem; margin: 0; color: #fff; }
.uni-dept { font-size: 0.7rem; color: #6366f1; letter-spacing: 2px; }

.logo-core-box { position: relative; width: 120px; height: 120px; display: flex; justify-content: center; align-items: center; }
.dci-logo-final { width: 70px; z-index: 10; filter: drop-shadow(0 0 15px #6366f1); animation: float 3s ease-in-out infinite; }
.quantum-ring, .quantum-ring-inner { position: absolute; border: 2px solid rgba(6, 182, 212, 0.3); border-radius: 50%; }
.quantum-ring { width: 100%; height: 100%; border-top-color: #6366f1; animation: rotate 4s linear infinite; }
.quantum-ring-inner { width: 80%; height: 80%; border-bottom-color: #fff; border-style: dashed; animation: rotate 6s linear infinite reverse; }

/* POST-PROCESSING */
.noise-overlay { position: absolute; inset: 0; background: url('https://media.giphy.com'); opacity: 0.02; pointer-events: none; z-index: 100; }
.chromatic-aberration { position: absolute; inset: 0; background: radial-gradient(circle, transparent 50%, rgba(255,0,0,0.02) 80%, rgba(0,255,255,0.02) 100%); pointer-events: none; }

@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes float { 0%, 100% { transform: translateY(0); filter: brightness(1); } 50% { transform: translateY(-15px); filter: brightness(1.3); } }
</style>
