<template>
  <SpotlightWrapper class="slide-container">
    <!-- BACKGROUND: PROCESS GRID -->
    <div class="process-grid">
      <span v-for="(p, i) in processItems" :key="i" :style="p.style">
        {{ p.text }}
      </span>
    </div>

    <!-- BACKGROUND: FLOW LINES -->
    <svg class="flow-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,30 Q50,10 100,30" />
      <path d="M0,55 Q50,75 100,55" />
      <path d="M0,80 Q50,60 100,80" />
    </svg>

    <!-- FLOATING PROCESS ICONS -->
    <div class="floating-elements">
      <div ref="i1" class="glass-icon pos-1">REQ</div>
      <div ref="i2" class="glass-icon pos-2">DESIGN</div>
      <div ref="i3" class="glass-icon pos-3">TEST</div>
      <div ref="i4" class="glass-icon pos-4">DEPLOY</div>
    </div>

    <!-- MAIN HERO -->
    <div class="hero-box" ref="hero">
      <div class="tagline">SYSTEM BOOT :: SOFTWARE ENGINEERING</div>

      <h1 class="title">
        REKAYASA <span class="gradient">PERANGKAT LUNAK</span>
      </h1>

      <h2 class="subtitle">
        NOT BY CODE,<br />
        <span class="process-text">BUT BY PROCESS</span>
      </h2>

      <div class="terminal-line">
        <span class="prompt">awasombak@rpl:~$</span>
        <span class="cmd"> ./build_solution_with_process.sh</span>
        <span class="cursor">_</span>
      </div>
    </div>

    <!-- FOOTER INFO -->
    <div class="system-info">
      <span>MODE: ENGINEERING</span>
      <span>FOCUS: PROCESS</span>
      <span>STATUS: READY</span>
    </div>
  </SpotlightWrapper>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import SpotlightWrapper from "../SpotlightWrapper.vue";

const hero = ref(null);
const i1 = ref(null);
const i2 = ref(null);
const i3 = ref(null);
const i4 = ref(null);

/* PROCESS WORDS BACKGROUND */
const processItems = [
  "ANALYSIS",
  "REQUIREMENT",
  "DESIGN",
  "ARCHITECTURE",
  "TESTING",
  "DEPLOYMENT",
  "MAINTENANCE",
  "DOCUMENTATION",
  "VERSIONING",
  "QUALITY"
].map(text => ({
  text,
  style: {
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    opacity: Math.random() * 0.15 + 0.05,
    fontSize: 12 + Math.random() * 14 + "px"
  }
}));

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(hero.value, {
    opacity: 0,
    scale: 0.9,
    duration: 1.2
  });

  [i1.value, i2.value, i3.value, i4.value].forEach((el, idx) => {
    gsap.to(el, {
      y: "random(-40,40)",
      x: "random(-30,30)",
      rotation: "random(-15,15)",
      duration: 5 + idx,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
});
</script>

<style scoped>
.slide-container {
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at top, #0ea5e9 0%, transparent 35%),
              linear-gradient(180deg, #020617, #000814);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #e5e7eb;
  font-family: "JetBrains Mono", monospace;
}

/* PROCESS GRID BACKGROUND */
.process-grid {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.process-grid span {
  position: absolute;
  color: #38bdf8;
  font-weight: 600;
  letter-spacing: 2px;
}

/* FLOW LINES */
.flow-lines {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.flow-lines path {
  fill: none;
  stroke: rgba(56,189,248,0.15);
  stroke-width: 0.5;
}

/* FLOATING ICONS */
.glass-icon {
  position: absolute;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  background: rgba(56,189,248,0.08);
  border: 1px solid rgba(56,189,248,0.3);
  color: #38bdf8;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 3;
}
.pos-1 { top: 12%; left: 12%; }
.pos-2 { top: 18%; right: 12%; }
.pos-3 { bottom: 18%; left: 14%; }
.pos-4 { bottom: 14%; right: 14%; }

/* HERO */
.hero-box {
  position: relative; /* Tetap relative agar z-index & ::after bekerja */
  z-index: 5;
  padding: 4rem 5rem;
  text-align: center;
  background: rgba(2, 6, 23, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 20px;
  backdrop-filter: blur(14px);
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.7);
  flex-shrink: 0; 
  margin: 0; 
  margin-right:75px ;
}

.hero-box::after {
  content: "";
  position: absolute;
  inset: -40px;
  border-radius: 24px;
  background: radial-gradient(circle, rgba(56,189,248,0.25), transparent 70%);
  z-index: -1;
}

/* TEXT */
.tagline {
  color: #38bdf8;
  letter-spacing: 4px;
  font-size: 0.7rem;
  margin-bottom: 1.5rem;
}

.title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin-bottom: 1rem;
}

.gradient {
  background: linear-gradient(to right, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  line-height: 1.2;
  margin-bottom: 2rem;
}

.process-text {
  color: #38bdf8;
  text-shadow: 0 0 25px rgba(56,189,248,0.6);
}

/* TERMINAL */
.terminal-line {
  font-size: 0.95rem;
  color: #cbd5e1;
}
.prompt { color: #4ade80; margin-right: 8px; }
.cursor {
  animation: blink 1s step-end infinite;
  color: #38bdf8;
  font-weight: bold;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* FOOTER */
.system-info {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 30px;
  font-size: 0.65rem;
  color: #64748b;
  letter-spacing: 2px;
  z-index: 5;
}
</style>
