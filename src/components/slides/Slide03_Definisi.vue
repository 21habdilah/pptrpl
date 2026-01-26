<template>
  <div class="ppt-slide">
    <header class="slide-header">
      <div class="slide-badge">CHAPTER_02 // HISTORY_TIMELINE</div>
      <h1 class="slide-title">Garis Waktu <span class="accent">Evolusi AI</span></h1>
    </header>

    <div class="timeline-container">
      <div class="main-line"></div>
      
      <div class="era-points">
        <!-- ERA 1 -->
        <div class="era-point" @click="openPopup('1943-1958', 'Awal Mula', 'Munculnya konsep neuron sederhana oleh McCulloch & Pitts serta Perceptron oleh Rosenblatt.', '🧠')">
          <div class="year">1943</div>
          <div class="dot"></div>
          <h3>The Birth</h3>
        </div>

        <!-- ERA 2 -->
        <div class="era-point" @click="openPopup('1980-an', 'Masa Kejayaan', 'Penemuan Backpropagation memungkinkan pelatihan jaringan saraf yang lebih kompleks.', '📈')">
          <div class="year">1980</div>
          <div class="dot"></div>
          <h3>Golden Age</h3>
        </div>

        <!-- ERA 3 -->
        <div class="era-point" @click="openPopup('1990-an', 'AI Winter', 'Minat menurun drastis karena keterbatasan teknologi dan efisiensi algoritma.', '❄️')">
          <div class="year">1990</div>
          <div class="dot"></div>
          <h3>AI Winter</h3>
        </div>

        <!-- ERA 4 -->
        <div class="era-point highlight" @click="openPopup('2010-an', 'Revolusi Deep Learning', 'Kemajuan GPU dan Big Data membawa AI ke level yang melampaui manusia.', '🔥')">
          <div class="year">2010</div>
          <div class="dot"></div>
          <h3>Modern Era</h3>
        </div>
      </div>
    </div>

    <!-- SIMPLE POPUP -->
    <Transition name="fade">
      <div v-if="showModal" class="mini-modal" @click="showModal = false">
        <div class="modal-box">
          <span class="m-icon">{{ modalData.icon }}</span>
          <h2>{{ modalData.title }} ({{ modalData.year }})</h2>
          <p>{{ modalData.desc }}</p>
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
.ppt-slide { padding: 4rem; color: white; height: 100%; display: flex; flex-direction: column; }
.slide-title { font-size: 4rem; font-weight: 900; margin-bottom: 4rem; text-align: center; }
.accent { color: #38bdf8; }

.timeline-container { position: relative; margin-top: 5rem; flex-grow: 1; }
.main-line { position: absolute; top: 75px; width: 100%; height: 6px; background: rgba(99, 102, 241, 0.3); border-radius: 10px; }

.era-points { display: grid; grid-template-columns: repeat(4, 1fr); position: relative; z-index: 2; }
.era-point { text-align: center; cursor: pointer; transition: 0.3s; }
.era-point:hover { transform: translateY(-10px); }

.year { font-size: 2rem; font-weight: 800; color: #6366f1; margin-bottom: 1rem; }
.dot { width: 30px; height: 30px; background: #020617; border: 5px solid #6366f1; border-radius: 50%; margin: 0 auto 1.5rem; transition: 0.3s; }
.era-point:hover .dot { background: #38bdf8; transform: scale(1.3); }
.era-point h3 { font-size: 1.8rem; color: #cbd5e1; }

/* MINI MODAL */
.mini-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 100; }
.modal-box { background: #1e293b; padding: 3rem; border-radius: 20px; border: 2px solid #38bdf8; max-width: 600px; text-align: center; }
.m-icon { font-size: 4rem; display: block; margin-bottom: 1rem; }
.modal-box h2 { font-size: 2.5rem; color: #38bdf8; margin-bottom: 1rem; }
.modal-box p { font-size: 1.5rem; line-height: 1.6; color: #cbd5e1; }
</style>
