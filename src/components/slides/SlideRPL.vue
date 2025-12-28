<template>
  <SpotlightWrapper class="slide-container">
    <!-- Blueprint Background -->
    <div class="blueprint-bg"></div>

    <div class="content-grid">
      <!-- LEFT : DEFINITION & CONCEPT -->
      <div class="text-side">
        <div class="tag-wrapper">
          <span class="tag">DEFINITION</span>
          <span class="status-badge">RPL_CORE</span>
        </div>

        <h2 class="main-title">
          Apa itu <span class="gradient-text">RPL?</span>
        </h2>

        <p class="description">
          <span class="text-accent">></span>
          Rekayasa Perangkat Lunak (RPL) adalah disiplin ilmu yang membahas
          <b>pendekatan sistematis dan terstruktur</b> dalam
          <b>analisis, perancangan, pengembangan, pengujian, deployment,</b>
          hingga <b>pemeliharaan perangkat lunak</b>,
          agar solusi yang dihasilkan <b>andal, efisien, aman,</b>
          dan <b>sesuai kebutuhan pengguna</b>.
        </p>

        <!-- CORE CONCEPTS -->
        <div class="points-list">
          <div
            v-for="(item, i) in points"
            :key="i"
            class="point-item"
            @click="togglePoint(i)"
          >
            <div class="point-icon-box">{{ item.icon }}</div>

            <div class="point-content">
              <strong>{{ item.title }}</strong>

              <p v-if="activePoint === i" class="point-desc">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT : PROCESS-BASED VISUAL -->
      <div class="visual-side">
        <div class="process-board">
          <div class="core-node">RPL</div>

          <div class="process-step step-1">📊<span>Analysis</span></div>
          <div class="process-step step-2">🧠<span>Design</span></div>
          <div class="process-step step-3">💻<span>Development</span></div>
          <div class="process-step step-4">🧪<span>Testing</span></div>
          <div class="process-step step-5">🚀<span>Deployment</span></div>

          <div class="mini-result">
<pre><code>build()
test()
deploy()</code></pre>
          </div>
        </div>
      </div>
    </div>
  </SpotlightWrapper>
</template>

<script setup>
import { ref } from "vue";
import SpotlightWrapper from "../SpotlightWrapper.vue";

const activePoint = ref(null);

const togglePoint = (index) => {
  activePoint.value = activePoint.value === index ? null : index;
};

const points = [
  {
    icon: "🧩",
    title: "Pendekatan sistematis & terstruktur",
    desc:
      "RPL dikerjakan dengan tahapan yang jelas dan berurutan agar proses pengembangan dapat dikontrol, dievaluasi, dan menghasilkan sistem yang stabil."
  },
  {
    icon: "📊",
    title: "Analisis kebutuhan pengguna",
    desc:
      "Tahap memahami permasalahan dan kebutuhan pengguna agar solusi yang dibangun benar-benar relevan dan tepat sasaran."
  },
  {
    icon: "🧠",
    title: "Perancangan sistem sebelum coding",
    desc:
      "Perancangan arsitektur, alur kerja, dan struktur data dilakukan terlebih dahulu untuk mencegah kesalahan besar saat pengembangan."
  },
  {
    icon: "🧪",
    title: "Pengujian untuk menjamin kualitas",
    desc:
      "Setiap fitur diuji untuk memastikan berjalan sesuai spesifikasi, minim kesalahan, dan aman digunakan."
  },
  {
    icon: "♻️",
    title: "Pemeliharaan & pengembangan berkelanjutan",
    desc:
      "Perangkat lunak terus diperbaiki dan dikembangkan agar tetap relevan terhadap perubahan kebutuhan dan teknologi."
  }
];
</script>

<style scoped>
/* ===== GLOBAL ===== */
.slide-container {
  height: 100vh;
  background: #020617;
  color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 10%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow: hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

/* ===== BACKGROUND ===== */
.blueprint-bg {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 2px 2px, rgba(56,189,248,0.06) 1px, transparent 0);
  background-size: 28px 28px;
}

/* ===== LAYOUT ===== */
.content-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 4rem;
  z-index: 2;
}

/* ===== LEFT ===== */
.tag {
  color: #38bdf8;
  font-size: 0.75rem;
  letter-spacing: 3px;
  font-weight: 700;
}

.status-badge {
  margin-left: 10px;
  font-size: 0.6rem;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(56,189,248,0.15);
  border: 1px solid rgba(56,189,248,0.4);
  color: #38bdf8;
}

.main-title {
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  margin: 1rem 0 1.5rem;
}

.gradient-text {
  background: linear-gradient(to right, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  padding: 20px 24px;
  background: rgba(56,189,248,0.08);
  border-left: 4px solid #38bdf8;
  border-radius: 12px;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.text-accent {
  color: #38bdf8;
  font-weight: bold;
}

/* ===== POINTS ===== */
.points-list {
  display: grid;
  gap: 12px;
}

.point-item {
  display: flex;
  gap: 14px;
  padding: 14px 20px;
  background: rgba(30,41,59,0.45);
  border: 1px solid rgba(56,189,248,0.15);
  border-radius: 14px;
  cursor: pointer;
}

.point-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(56,189,248,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.point-content strong {
  font-size: 0.95rem;
}

.point-desc {
  margin-top: 6px;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #cbd5f5;
  border-left: 2px solid rgba(56,189,248,0.4);
  padding-left: 8px;
}

/* ===== RIGHT VISUAL ===== */
.process-board {
  position: relative;
  width: 420px;
  height: 520px;
  margin: 0 auto;
  margin-top: 150px; 
  margin-right: 20px;
}

.core-node {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 900;
  color: #38bdf8;
  background: #020617;
}

.process-step {
  position: absolute;
  width: 130px;
  padding: 12px;
  text-align: center;
  background: rgba(30,41,59,0.55);
  border: 1px solid rgba(56,189,248,0.25);
  border-radius: 14px;
  font-size: 0.85rem;
}

.process-step span {
  display: block;
  margin-top: 6px;
  font-weight: 600;
}

.step-1 { top: 10px; left: 50%; transform: translateX(-50%); }
.step-2 { top: 50%; right: -10px; transform: translateY(-50%); }
.step-3 { bottom: 90px; right: -10px; }
.step-4 { bottom: -10px; left: 50%; transform: translateX(-50%); }
.step-5 { top: 50%; left: -10px; transform: translateY(-50%); }

.mini-result {
  position: absolute;
  top: 90px;
  left: -10px;
  width: 140px;
  padding: 10px;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  font-size: 0.7rem;
  color: #38bdf8;
}
</style>
