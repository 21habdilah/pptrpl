<template>
  <div class="ppt-slide">
    <header class="slide-header">
      <div class="slide-badge">HISTORICAL_JOURNEY // CHAPTER_02</div>
      <h1 class="slide-title">Sejarah & Perkembangan <span class="accent">Neural Network</span></h1>
    </header>

    <!-- TIMELINE AREA -->
    <div class="timeline-container">
      <div class="main-line"></div>
      
      <div class="era-points">
        <!-- ERA 1 -->
        <div class="era-point" @click="openPopup('1943-1958', 'Awal Mula', 'Warren McCulloch & Walter Pitts menciptakan model neuron sederhana pertama. Frank Rosenblatt menyusul dengan Perceptron.', '🧠')">
          <div class="year">1943</div>
          <div class="dot-wrapper">
            <div class="dot"></div>
          </div>
          <h3 class="era-label">The Birth</h3>
        </div>

        <!-- ERA 2 -->
        <div class="era-point" @click="openPopup('1980-an', 'Masa Kejayaan', 'Penemuan algoritma Backpropagation oleh Geoffrey Hinton memicu pelatihan jaringan multilayer yang kompleks.', '📈')">
          <div class="year">1980</div>
          <div class="dot-wrapper">
            <div class="dot"></div>
          </div>
          <h3 class="era-label">Golden Age</h3>
        </div>

        <!-- ERA 3 -->
        <div class="era-point" @click="openPopup('1990-an', 'AI Winter', 'Minat menurun drastis karena keterbatasan hardware dan algoritma yang dianggap belum efisien.', '❄️')">
          <div class="year">1990</div>
          <div class="dot-wrapper">
            <div class="dot"></div>
          </div>
          <h3 class="era-label">AI Winter</h3>
        </div>

        <!-- ERA 4 -->
        <div class="era-point highlight" @click="openPopup('2010-an', 'Revolusi Deep Learning', 'Ledakan data besar (Big Data) dan kekuatan GPU (NVIDIA) membawa AI melampaui kemampuan manusia.', '🔥')">
          <div class="year">2010</div>
          <div class="dot-wrapper">
            <div class="dot"></div>
          </div>
          <h3 class="era-label">Modern Era</h3>
        </div>
      </div>
    </div>

    <!-- PLACEHOLDER GAMBAR SEJARAH (BAWAH TIMELINE) -->
    <div class="history-visual-area">
      <div class="visual-card">
        <div class="image-placeholder">
          <img src="https://lens.usercontent.google.com/banana?agsi=CmdnbG9iYWw6OjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAwZWI6MTpkMDEzYjM3ZDQwMDJlNmE4OjAwMDA1NWNmZWM3MDAyNmQ6MDAwMDAxODcyYjkwMzM2ODowMDA2NDk0YzliMzQ0MTZmEAI=" alt="History Visual" />
          <div class="overlay-text">HISTORICAL_ARCHIVE_2026</div>
        </div>
      </div>
    </div>

    <!-- POPUP BESAR (MODAL) -->
    <Transition name="ppt-zoom">
      <div v-if="showModal" class="mini-modal" @click.self="showModal = false">
        <div class="modal-box">
          <button class="close-btn" @click="showModal = false">✕</button>
          <span class="m-icon">{{ modalData.icon }}</span>
          <h2 class="m-title">{{ modalData.title }} <span class="m-year">({{ modalData.year }})</span></h2>
          <div class="m-divider"></div>
          <p class="m-desc">{{ modalData.desc }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const showModal = ref(false);
const modalData = ref({});

const openPopup = (year, title, desc, icon) => {
  modalData.value = { year, title, desc, icon };
  showModal.value = true;
};
</script>

<style scoped>
.ppt-slide { 
  padding: 3rem 5rem; 
  color: white; 
  height: 100vh; 
  display: flex; 
  flex-direction: column; 
  background: #020617;
  font-family: 'Inter', sans-serif;
}

/* HEADER */
.slide-badge { color: #6366f1; font-weight: 800; letter-spacing: 4px; font-size: 1rem; margin-bottom: 0.5rem; text-align: center; }
.slide-title { font-size: 3.5rem; font-weight: 900; margin-bottom: 2rem; text-align: center; }
.accent { color: #38bdf8; text-shadow: 0 0 20px rgba(56, 189, 248, 0.4); }

/* TIMELINE */
.timeline-container { position: relative; margin: 4rem 0; height: 150px; }
.main-line { position: absolute; top: 68px; width: 100%; height: 6px; background: rgba(99, 102, 241, 0.2); border-radius: 10px; }

.era-points { display: grid; grid-template-columns: repeat(4, 1fr); position: relative; z-index: 2; }
.era-point { text-align: center; cursor: pointer; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

.year { font-size: 2.2rem; font-weight: 900; color: #6366f1; margin-bottom: 0.5rem; }
.dot-wrapper { display: flex; justify-content: center; align-items: center; height: 40px; margin-bottom: 1rem;}
.dot { width: 28px; height: 28px; background: #020617; border: 5px solid #6366f1; border-radius: 50%; transition: 0.3s; }

.era-point:hover { transform: translateY(-10px); }
.era-point:hover .dot { background: #38bdf8; border-color: white; box-shadow: 0 0 20px #38bdf8; }
.era-label { font-size: 1.6rem; color: #cbd5e1; font-weight: 700; }

/* VISUAL AREA */
.history-visual-area { flex-grow: 1; display: flex; justify-content: center; align-items: flex-start; }
.visual-card { width: 100%; max-width: 1200px; border-radius: 24px; overflow: hidden; border: 2px solid rgba(255,255,255,0.05); background: rgba(15, 23, 42, 0.5); }
.image-placeholder { position: relative; width: 100%; height: 300px; overflow: hidden; }
.image-placeholder img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
.overlay-text { position: absolute; bottom: 20px; left: 30px; font-family: monospace; color: #38bdf8; font-weight: bold; background: rgba(0,0,0,0.5); padding: 5px 15px; border-radius: 5px; }

/* MODAL (PPT STYLE) */
.mini-modal { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.9); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(10px); }
.modal-box { background: #0f172a; padding: 4rem; border-radius: 32px; border: 2px solid #6366f1; max-width: 900px; width: 90%; text-align: center; position: relative; box-shadow: 0 0 100px rgba(0,0,0,0.5); }
.close-btn { position: absolute; top: 2rem; right: 2rem; background: none; border: none; color: #94a3b8; font-size: 2rem; cursor: pointer; }

.m-icon { font-size: 5rem; display: block; margin-bottom: 1.5rem; }
.m-title { font-size: 3rem; color: #38bdf8; margin-bottom: 1rem; }
.m-year { color: white; opacity: 0.6; }
.m-divider { width: 80px; height: 4px; background: #6366f1; margin: 1.5rem auto; border-radius: 2px; }
.m-desc { font-size: 1.8rem; line-height: 1.5; color: #cbd5e1; margin-bottom: 2.5rem; }
.m-image-preview img { width: 100%; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); }

/* ANIMATION */
.ppt-zoom-enter-active, .ppt-zoom-leave-active { transition: all 0.4s ease; }
.ppt-zoom-enter-from, .ppt-zoom-leave-to { opacity: 0; transform: scale(0.9); }
</style>
