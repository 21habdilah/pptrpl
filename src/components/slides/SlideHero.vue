<template>
  <SpotlightWrapper class="slide-container">
    <!-- BACKGROUND: CODE RAIN (Elemen RPL Kuat) -->
    <div class="code-rain">
      <div v-for="n in 12" :key="n" class="code-column" :style="randomColumnPos()">
        <div class="code-stream">{{ generateCode() }}</div>
      </div>
    </div>

    <!-- Background Particles -->
    <div class="particles-overlay">
      <div v-for="n in 20" :key="n" class="particle"></div>
    </div>

    <!-- Floating 3D Tech Icons (Glassmorphism) -->
    <div class="floating-elements">
      <div ref="icon1" class="glass-icon pos-1">&lt;BRD /&gt;</div>
      <div ref="icon2" class="glass-icon pos-2">git_commit</div>
      <div ref="icon3" class="glass-icon pos-3">npm_run_dev</div>
      <div ref="icon4" class="glass-icon pos-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
      </div>
    </div>

    <!-- MAIN CONTENT: TERMINAL STYLE -->
    <div class="terminal-container" ref="terminalRef">
      <div class="terminal-header">
        <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
        <div class="tab">project_scope.sh — 80x24</div>
      </div>
      
      <div class="content-wrapper">
        <div class="tagline" ref="tagline">REKAYASA PERANGKAT LUNAK</div>
        <h1 class="main-title" ref="titleRef">
          RPL <span class="gradient-text">IN ACTION</span>
        </h1>
        <div class="code-line" ref="subtitle">
          <span class="prompt">admin@RPL:~$</span>
          <span class="typing-text"> ./initialize_project.sh --verbose</span>
          <span class="cursor">_</span>
        </div>
        <div class="accent-bar" ref="bar"></div>
      </div>
    </div>

    <!-- System Info Footer -->
    <div class="system-info">
      <span>CPU: 4.2GHz</span>
      <span>STATUS: STABLE</span>
      <span>ENV: PRODUCTION</span>
    </div>
  </SpotlightWrapper>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import SpotlightWrapper from "../SpotlightWrapper.vue";

const titleRef = ref(null);
const tagline = ref(null);
const subtitle = ref(null);
const bar = ref(null);
const terminalRef = ref(null);
const icon1 = ref(null);
const icon2 = ref(null);
const icon3 = ref(null);
const icon4 = ref(null);

const generateCode = () => {
  const snippets = ["Object.assign(target, ...sources)", "async function fetchAPI()", "import { gsap } from 'gsap'", "while(isAlive) { code() }", "const db = connect()"];
  return snippets[Math.floor(Math.random() * snippets.length)];
};

const randomColumnPos = () => ({
  left: Math.random() * 100 + '%',
  animationDelay: Math.random() * 5 + 's',
  opacity: Math.random() * 0.2
});

onMounted(() => {
  const tl = gsap.timeline();

  // Animasi Terminal Muncul
  tl.from(terminalRef.value, { opacity: 0, scale: 0.9, y: 30, duration: 1.2, ease: "power4.out" })
    .from(tagline.value, { opacity: 0, y: -10, duration: 0.5 }, "-=0.5")
    .from(titleRef.value, { opacity: 0, scale: 0.8, duration: 0.8, ease: "back.out(1.7)" }, "-=0.3")
    .from(bar.value, { width: 0, duration: 0.8, ease: "power4.inOut" }, "-=0.5")
    .from(subtitle.value, { opacity: 0, duration: 0.5 });

  // Animasi Floating Icons
  const icons = [icon1.value, icon2.value, icon3.value, icon4.value];
  icons.forEach((icon, i) => {
    if (icon) {
      gsap.to(icon, {
        y: "random(-50, 50)",
        x: "random(-30, 30)",
        rotation: "random(-20, 20)",
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  });

  // Animasi Partikel
  gsap.to(".particle", {
    y: "-100vh",
    opacity: "random(0.1, 0.4)",
    duration: "random(8, 20)",
    repeat: -1,
    ease: "none",
    stagger: { each: 0.3, from: "random" }
  });
});
</script>

<style scoped>
.slide-container {
  height: 100vh; width: 100%; background: #020617; 
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; font-family: 'JetBrains Mono', monospace; color: white;
}

/* CODE RAIN BACKGROUND */
.code-rain { position: absolute; inset: 0; z-index: 1; overflow: hidden; pointer-events: none; }
.code-column { position: absolute; top: -100px; color: #38bdf8; font-size: 0.7rem; white-space: nowrap; animation: fall linear infinite; }
@keyframes fall { to { transform: translateY(110vh); } }

/* TERMINAL FRAME */
.terminal-container {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 16px;
  padding: 0;
  width: 80%;
  max-width: 900px;
  backdrop-filter: blur(12px);
  z-index: 10;
  box-shadow: 0 40px 100px rgba(0,0,0,0.6);
}

.terminal-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 20px;
  display: flex; align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dots { display: flex; gap: 8px; flex: 1; }
.dots span { width: 12px; height: 12px; border-radius: 50%; }
.r { background: #ff5f56; } .y { background: #ffbd2e; } .g { background: #27c93f; }
.tab { font-size: 0.8rem; color: #64748b; }

.content-wrapper { padding: 4rem 2rem; text-align: center; }

/* TEXT STYLES */
.tagline { font-size: 0.8rem; letter-spacing: 0.4rem; color: #38bdf8; margin-bottom: 1.5rem; font-weight: bold; }
.main-title { font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 900; margin-bottom: 1.5rem; letter-spacing: -2px; }
.gradient-text { background: linear-gradient(to right, #38bdf8, #818cf8, #38bdf8); background-size: 200%; animation: bg-shift 4s linear infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

@keyframes bg-shift { to { background-position: 200%; } }

.code-line { font-size: 1.1rem; color: #cbd5e1; font-family: 'JetBrains Mono', monospace; }
.prompt { color: #4ade80; margin-right: 10px; }
.cursor { animation: blink 1s step-end infinite; color: #38bdf8; font-weight: bold; }

/* FLOATING ICONS */
.glass-icon {
  position: absolute; padding: 0.8rem 1.2rem;
  background: rgba(56, 189, 248, 0.05);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 8px; color: #38bdf8;
  font-size: 0.9rem; font-family: monospace; z-index: 5;
}
.pos-1 { top: 10%; left: 10%; }
.pos-2 { top: 15%; right: 10%; }
.pos-3 { bottom: 15%; left: 12%; }
.pos-4 { bottom: 10%; right: 15%; }

/* SYSTEM INFO FOOTER */
.system-info {
  position: absolute; bottom: 20px; width: 100%;
  display: flex; justify-content: center; gap: 30px;
  font-size: 0.7rem; color: #475569; letter-spacing: 2px;
}

@keyframes blink { 50% { opacity: 0; } }

.particle {
  position: absolute; bottom: -5vh; width: 2px; height: 2px;
  background: #38bdf8; border-radius: 50%;
}
</style>
