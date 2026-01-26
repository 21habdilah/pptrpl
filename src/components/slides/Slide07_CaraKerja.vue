<template>
  <div class="ppt-slide">
    <header class="slide-header">
      <div class="badge">LOGIC_GATE // ACTIVATION_FUNCTION</div>
      <h1 class="title">Fungsi <span class="accent">Aktivasi</span></h1>
      <p class="subtitle">Saklar cerdas yang menentukan apakah informasi diteruskan atau tidak.</p>
    </header>

    <div class="activation-layout">
      <!-- INFO UTAMA -->
      <div class="intro-box">
        <p>Berfungsi memperkenalkan <strong>Non-Linearitas</strong>, memungkinkan jaringan mempelajari pola rumit yang tidak bisa diselesaikan garis lurus.</p>
      </div>

      <!-- GRID FUNGSI -->
      <div class="function-grid">
        <div class="func-card" @click="openPopup('Sigmoid', 'S-Curve', '0 hingga 1', 'Ideal untuk klasifikasi biner (Ya/Tidak).')">
          <div class="graph sigmoid"></div>
          <h3>Sigmoid</h3>
          <span class="range">Range: 0 to 1</span>
        </div>

        <div class="func-card highlight" @click="openPopup('ReLU', 'Rectified Linear', '0 hingga x', 'Paling populer & efisien untuk Deep Learning saat ini.')">
          <div class="graph relu"></div>
          <h3>ReLU</h3>
          <span class="range">Range: 0 to Max</span>
        </div>

        <div class="func-card" @click="openPopup('Tanh', 'Hyperbolic Tangent', '-1 hingga 1', 'Mirip sigmoid namun pusatnya di angka 0.')">
          <div class="graph tanh"></div>
          <h3>Tanh</h3>
          <span class="range">Range: -1 to 1</span>
        </div>
      </div>
    </div>

    <!-- POPUP DETAIL -->
    <Transition name="zoom">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-content">
          <button class="close-btn" @click="closePopup">✕</button>
          <div class="m-header">
            <h2>Fungsi {{ activeData.name }}</h2>
            <span class="m-badge">{{ activeData.type }}</span>
          </div>
          <p class="m-desc">{{ activeData.desc }}</p>
          <div class="m-visual-box">
             <img :src="`https://placehold.co{activeData.name}`" />
          </div>
          <div class="m-footer">Karakteristik: {{ activeData.range }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isPopupOpen = ref(false);
const activeData = ref({});

const openPopup = (name, type, range, desc) => {
  activeData.value = { name, type, range, desc };
  isPopupOpen.value = true;
};
const closePopup = () => isPopupOpen.value = false;
</script>

<style scoped>
.ppt-slide { padding: 4vh 6vw; color: white; display: flex; flex-direction: column; }
.slide-header { text-align: left; margin-bottom: 2rem; }
.title { font-size: 4rem; font-weight: 900; }
.accent { color: #38bdf8; }
.subtitle { font-size: 1.6rem; color: #94a3b8; }

.activation-layout { display: flex; flex-direction: column; gap: 2rem; }
.intro-box { background: rgba(99, 102, 241, 0.1); padding: 1.5rem 2rem; border-radius: 15px; border-left: 5px solid #6366f1; font-size: 1.4rem; color: #cbd5e1; }

.function-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.func-card { background: rgba(30, 41, 59, 0.6); padding: 2rem; border-radius: 20px; border: 2px solid rgba(255,255,255,0.05); text-align: center; cursor: pointer; transition: 0.3s; }
.func-card:hover { border-color: #38bdf8; transform: translateY(-10px); }
.func-card.highlight { border-color: #6366f1; background: rgba(99, 102, 241, 0.1); }

.graph { height: 120px; width: 100%; margin-bottom: 1.5rem; background-size: contain; background-repeat: no-repeat; background-position: center; filter: drop-shadow(0 0 10px #38bdf8); }
.sigmoid { background-image: url('https://upload.wikimedia.org'); }
.relu { background-image: url('https://upload.wikimedia.org'); }
.tanh { background-image: url('https://upload.wikimedia.org'); }

.func-card h3 { font-size: 2rem; margin: 0; color: #38bdf8; }
.range { font-family: monospace; color: #64748b; font-size: 1.1rem; }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.95); z-index: 1000; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(15px); }
.modal-content { background: #0f172a; width: 850px; padding: 3rem; border-radius: 30px; border: 2px solid #6366f1; position: relative; color: white;}
.close-btn { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 2.5rem; color: #94a3b8; background: none; border: none; cursor: pointer; }
.m-header { display: flex; align-items: center; gap: 20px; margin-bottom: 1.5rem; }
.m-badge { background: #6366f1; padding: 5px 15px; border-radius: 5px; font-weight: bold; }
.m-desc { font-size: 1.6rem; line-height: 1.6; color: #cbd5e1; margin-bottom: 2rem; }
.m-visual-box img { width: 100%; border-radius: 15px; }

.zoom-enter-active, .zoom-leave-active { transition: 0.3s; }
.zoom-enter-from, .zoom-leave-to { opacity: 0; transform: scale(0.9); }
</style>
