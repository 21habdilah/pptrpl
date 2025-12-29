<template>
  <SpotlightWrapper class="slide deploy" ref="slideRef">
    <!-- BACKGROUND FLOATING CODE -->
    <div class="code-bg">
      <span
        v-for="(c, i) in codes"
        :key="i"
        :style="c.style"
      >
        {{ c.text }}
      </span>
    </div>

    <!-- HEADER -->
    <header class="header">
      <h1>🚀 Deployment</h1>
      <p>Proses membawa aplikasi dari <b>Lokal</b> ke <b>Dunia Nyata</b></p>
    </header>

    <!-- FLOW DIAGRAM -->
    <section class="diagram">
      <div class="node dev">👨‍💻<br />Developer Push</div>
      <div class="arrow">↓</div>

      <div class="node repo">📦<br />GitHub (CI/CD Pipeline)</div>
      <div class="arrow">↓</div>

      <div class="split">
        <div class="node fe">
          🌐<br />
          <b>Frontend (Static)</b>
          <small>Vercel / Netlify / Edge</small>
        </div>

        <div class="node be">
          🧠<br />
          <b>Backend (Runtime)</b>
          <small>Serverless / PaaS / VPS</small>
        </div>
      </div>

      <div class="api-connection">
        <span>HTTPS Request</span>
        <span class="api">⇄ REST API / GraphQL ⇄</span>
        <span>Database</span>
      </div>

      <div class="arrow">↓</div>
      <div class="node user">👤<br />Live Production</div>
    </section>

    <!-- EXPLANATION (PERJELAS DEFINISI & PROSES) -->
    <section class="explain">
      <div class="card">
        <h3>🎨 Frontend Deployment</h3>
        <p>
          <b>Definisi:</b> Menyajikan antarmuka pengguna ke browser. <br />
          <b>Proses:</b> Kode di-<i>compile</i> (Build) menjadi aset statis (HTML/JS/CSS), lalu didistribusikan lewat <b>CDN</b> agar akses instan dari lokasi manapun.
        </p>
      </div>

      <div class="card">
        <h3>⚙️ Backend Deployment</h3>
        <p>
          <b>Definisi:</b> Menjalankan logika server & database. <br />
          <b>Proses:</b> Mengatur <i>environment variables</i>, menjalankan <i>server runtime</i> (Node/Go/Python), dan membuka gerbang <b>CORS</b> agar bisa diakses Frontend.
        </p>
      </div>
    </section>
  </SpotlightWrapper>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import SpotlightWrapper from "../SpotlightWrapper.vue";

const slideRef = ref(null);

/* floating code background */
const codes = Array.from({ length: 22 }, () => ({
  text: ["git push", "npm run build", "fetch(API)", "SSL: OK", "deploy()", "CI/CD"][
    Math.floor(Math.random() * 6)
  ],
  style: {
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    fontSize: 12 + Math.random() * 14 + "px",
    animationDelay: Math.random() * 6 + "s"
  }
}));

/* GSAP TIMELINE KHUSUS SLIDE */
onMounted(async () => {
  await nextTick();

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power2.out" }
    });

    tl.from(".header", { opacity: 0, y: -40 })
      .from(".node", { opacity: 0, y: 30, stagger: 0.15 })
      .from(".api-connection", { opacity: 0, scale: 0.9 })
      .from(".card", { opacity: 0, x: (i) => i === 0 ? -30 : 30, stagger: 0.2 });
  }, slideRef.value);

  return () => ctx.revert();
});
</script>

<style scoped>
/* ROOT SLIDE */
.slide.deploy {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 3rem;
  color: #e5e7eb;
  background:
    radial-gradient(circle at top, #0ea5e9 0%, transparent 35%),
    linear-gradient(180deg, #020617, #000814);
  overflow: hidden;
}

/* FLOATING CODE */
.code-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.code-bg span {
  position: absolute;
  font-family: 'Courier New', monospace;
  color: rgba(56, 189, 248, 0.2);
  animation: float 10s linear infinite;
}
@keyframes float {
  from { transform: translateY(100px); opacity: 0; }
  30% { opacity: 0.8; }
  to { transform: translateY(-100px); opacity: 0; }
}

/* CONTENT LAYER */
.header,
.diagram,
.explain {
  position: relative;
  z-index: 2;
}

/* HEADER */
.header {
  text-align: center;
  margin-bottom: 2rem;
}
.header h1 {
  font-size: 2.8rem;
  color: #38bdf8;
  text-shadow: 0 0 25px rgba(56, 189, 248, 0.5);
  margin: 0;
}

/* DIAGRAM */
.diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}
.node {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 12px;
  padding: 0.7rem 1.5rem;
  text-align: center;
  backdrop-filter: blur(4px);
}
.split {
  display: flex;
  gap: 3rem;
}
.fe { border-left: 4px solid #38bdf8; }
.be { border-left: 4px solid #22c55e; }

.arrow { color: #38bdf8; font-weight: bold; }

.api-connection {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  background: rgba(56, 189, 248, 0.1);
  border-radius: 20px;
}
.api {
  color: #38bdf8;
  letter-spacing: 1px;
}

/* EXPLANATION */
.explain {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.card {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
  border-color: rgba(56, 189, 248, 0.5);
}
.card h3 {
  color: #38bdf8;
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.card p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  color: #cbd5e1;
}
</style>
