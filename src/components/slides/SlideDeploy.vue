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
      <h1>🚀 Deployment Flow</h1>
      <p>Alur <b>Frontend</b> & <b>Backend</b> sampai online</p>
    </header>

    <!-- FLOW DIAGRAM -->
    <section class="diagram">
      <div class="node dev">👨‍💻<br />Developer</div>
      <div class="arrow">↓</div>

      <div class="node repo">📦<br />Git Repository</div>
      <div class="arrow">↓</div>

      <div class="split">
        <div class="node fe">
          🌐<br />
          <b>Frontend Deploy</b>
          <small>Vercel / Netlify</small>
        </div>

        <div class="node be">
          🧠<br />
          <b>Backend Deploy</b>
          <small>API + Database</small>
        </div>
      </div>

      <div class="api-connection">
        <span>Frontend</span>
        <span class="api">⇄ API ⇄</span>
        <span>Backend</span>
      </div>

      <div class="arrow">↓</div>
      <div class="node user">👤<br />User Online</div>
    </section>

    <!-- EXPLANATION -->
    <section class="explain">
      <div class="card">
        <h3>🎨 Frontend</h3>
        <p>
          Source code dibuild menjadi <b>HTML, CSS, JavaScript</b>,
          lalu di-hosting agar bisa diakses lewat browser.
        </p>
      </div>

      <div class="card">
        <h3>⚙️ Backend</h3>
        <p>
          Menyediakan <b>API, logika bisnis, dan database</b>
          yang diakses frontend secara real-time.
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
  text: ["git push", "npm run build", "API()", "</>", "deploy()", "{}"][
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
      .from(".card", { opacity: 0, y: 20, stagger: 0.2 });
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
  overflow: visible;
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
  font-family: monospace;
  color: rgba(56, 189, 248, 0.25);
  animation: float 10s linear infinite;
}
@keyframes float {
  from { transform: translateY(0); opacity: 0; }
  30% { opacity: 1; }
  to { transform: translateY(-80px); opacity: 0; }
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
  font-size: 2.6rem;
  color: #38bdf8;
  text-shadow: 0 0 20px #38bdf8;
}

/* DIAGRAM */
.diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
}
.node {
  background: rgba(2, 6, 23, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 14px;
  padding: 0.8rem 1.3rem;
  text-align: center;
  box-shadow: 0 0 25px rgba(14, 165, 233, 0.15);
}
.split {
  display: flex;
  gap: 2rem;
}
.fe { border-color: #38bdf8; }
.be { border-color: #22c55e; }

.arrow { opacity: 0.6; }

.api-connection {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.9rem;
}
.api {
  color: #38bdf8;
  font-weight: bold;
}

/* EXPLANATION */
.explain {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}
.card {
  background: rgba(2, 6, 23, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.25);
  border-radius: 14px;
  padding: 1.2rem;
}
.card h3 {
  color: #7dd3fc;
  margin-bottom: 0.4rem;
}
</style>
