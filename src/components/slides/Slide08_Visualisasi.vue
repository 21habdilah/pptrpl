<template>
  <div class="ppt-slide">
    <header class="slide-header">
      <div class="badge">PROCESS_FLOW // STEP_BY_STEP</div>
      <h1 class="title">Cara Kerja <span class="accent">Neural Network</span></h1>
    </header>

    <div class="work-flow-container">
      <div v-for="(step, index) in steps" :key="index" class="flow-item">
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-card" @click="openPopup(step)">
          <h3>{{ step.title }}</h3>
          <p>{{ step.short }}</p>
        </div>
        <div v-if="index < steps.length - 1" class="flow-arrow">→</div>
      </div>
    </div>

    <!-- POPUP CARA KERJA -->
    <Transition name="zoom">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-content">
          <button class="close-btn" @click="closePopup">✕</button>
          <div class="m-header">
             <div class="m-num">Langkah {{ activeData.num }}</div>
             <h2>{{ activeData.title }}</h2>
          </div>
          <p class="m-desc">{{ activeData.description }}</p>
          <div class="m-image-box">
             <img :src="`https://placehold.co{activeData.num}`" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isPopupOpen = ref(false);
const activeData = ref({});

const steps = [
  { num: 1, title: 'Input Data', short: 'Penerimaan data mentah.', description: 'Data seperti gambar atau teks masuk melalui lapisan input.' },
  { num: 2, title: 'Forward Pass', short: 'Perhitungan bobot.', description: 'Data mengalir ke depan melalui neuron-neuron yang dikalikan dengan bobot.' },
  { num: 3, title: 'Activation', short: 'Transformasi non-linear.', description: 'Hasil perhitungan diproses oleh fungsi aktivasi untuk menentukan output neuron.' },
  { num: 4, title: 'Prediction', short: 'Hasil keputusan akhir.', description: 'Lapisan output menghasilkan prediksi (misal: "Ini gambar kucing").' },
  { num: 5, title: 'Learning', short: 'Backpropagation.', description: 'Model menghitung kesalahan dan menyesuaikan bobot (backpropagation) agar lebih akurat.' }
];

const openPopup = (step) => { activeData.value = step; isPopupOpen.value = true; };
const closePopup = () => isPopupOpen.value = false;
</script>

<style scoped>
.ppt-slide { padding: 5vh 6vw; color: white; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;}
.slide-header { margin-bottom: 4rem; }
.title { font-size: 3.8rem; font-weight: 900; }
.accent { color: #38bdf8; }

.work-flow-container { display: flex; align-items: center; justify-content: space-between; margin-top: 2rem; }
.flow-item { position: relative; display: flex; align-items: center; flex: 1; }
.step-number { width: 40px; height: 40px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; position: absolute; top: -20px; left: 50%; transform: translateX(-50%); z-index: 2; box-shadow: 0 0 15px rgba(99,102,241,0.5); }

.step-card { background: rgba(30, 41, 59, 0.6); padding: 2.5rem 1.5rem 1.5rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); width: 100%; margin: 0 10px; cursor: pointer; transition: 0.3s; text-align: center; }
.step-card:hover { border-color: #38bdf8; background: rgba(56, 189, 248, 0.1); transform: scale(1.05); }

.step-card h3 { font-size: 1.5rem; color: #38bdf8; margin-bottom: 10px; }
.step-card p { font-size: 1.1rem; color: #94a3b8; line-height: 1.3; }

.flow-arrow { font-size: 2.5rem; color: #6366f1; font-weight: bold; opacity: 0.5; }

/* MODAL CARA KERJA */
.modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.95); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(20px); }
.modal-content { background: #0f172a; width: 900px; padding: 4rem; border-radius: 40px; border: 2px solid #6366f1; position: relative; color: white;}
.close-btn { position: absolute; top: 2rem; right: 2rem; font-size: 3rem; color: #94a3b8; background: none; border: none; cursor: pointer; }
.m-num { color: #6366f1; font-weight: 800; font-size: 1.4rem; letter-spacing: 2px; }
.m-desc { font-size: 1.8rem; color: #cbd5e1; margin: 2rem 0; line-height: 1.6; }
.m-image-box img { width: 100%; border-radius: 25px; border: 2px solid #334155; }
</style>
