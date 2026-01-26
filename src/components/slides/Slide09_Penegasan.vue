### **File: `components/SlideJenisArsitektur.vue`**

```vue
<template>
  <div class="ppt-slide-wrapper">
    <header class="slide-header">
      <div class="badge">NETWORK_TYPES // ARCHITECTURES</div>
      <h1 class="title">Jenis-Jenis <span class="accent">Neural Network</span></h1>
      <p class="subtitle">Setiap arsitektur dirancang untuk menangani jenis data yang berbeda.</p>
    </header>

    <div class="arch-grid">
      <!-- 1. ANN -->
      <div class="arch-card" @click="openPopup(architectures[0])">
        <div class="arch-icon">📊</div>
        <div class="arch-info">
          <h3>ANN</h3>
          <p>Data Tabular (Angka/Tabel)</p>
        </div>
      </div>

      <!-- 2. CNN -->
      <div class="arch-card highlight-blue" @click="openPopup(architectures[1])">
        <div class="arch-icon">🖼️</div>
        <div class="arch-info">
          <h3>CNN</h3>
          <p>Gambar & Visi Komputer</p>
        </div>
      </div>

      <!-- 3. RNN -->
      <div class="arch-card" @click="openPopup(architectures[2])">
        <div class="arch-icon">🎵</div>
        <div class="arch-info">
          <h3>RNN</h3>
          <p>Data Berurutan (Suara/Teks)</p>
        </div>
      </div>

      <!-- 4. TRANSFORMER -->
      <div class="arch-card highlight-indigo" @click="openPopup(architectures[3])">
        <div class="arch-icon">✨</div>
        <div class="arch-info">
          <h3>Transformer</h3>
          <p>Generative AI (ChatGPT)</p>
        </div>
      </div>
    </div>

    <!-- MODAL POPUP JENIS ARSITEKTUR -->
    <Transition name="zoom">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-window">
          <button class="close-btn" @click="closePopup">✕</button>
          
          <div class="m-header">
            <span class="m-icon">{{ activeData.icon }}</span>
            <div class="m-title-group">
              <h2>{{ activeData.name }}</h2>
              <span class="m-full-name">{{ activeData.fullName }}</span>
            </div>
          </div>

          <p class="m-description">{{ activeData.description }}</p>

          <div class="m-visual">
            <div class="visual-label">Contoh Penerapan: {{ activeData.app }}</div>
            <img :src="`https://placehold.co{activeData.name}`" />
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

const architectures = [
  { 
    name: 'ANN', 
    fullName: 'Artificial Neural Network', 
    icon: '📊', 
    app: 'Prediksi Harga, Klasifikasi Data Tabel',
    description: 'Arsitektur dasar di mana informasi mengalir satu arah. Sangat efektif untuk data angka terstruktur seperti tabel database atau Excel.' 
  },
  { 
    name: 'CNN', 
    fullName: 'Convolutional Neural Network', 
    icon: '🖼️', 
    app: 'FaceID, Diagnosis Medis (X-Ray), Self-Driving Cars',
    description: 'Spesialis pengolahan gambar. CNN menggunakan "filter" untuk memindai piksel dan mengenali bentuk, tepi, hingga objek yang kompleks.' 
  },
  { 
    name: 'RNN', 
    fullName: 'Recurrent Neural Network', 
    icon: '🎵', 
    app: 'Google Translate, Siri, Analisis Sentimen',
    description: 'Memiliki "memori" untuk mengingat urutan data. Sangat pas untuk data yang bergantung pada waktu seperti teks, suara, atau deret waktu.' 
  },
  { 
    name: 'Transformer', 
    fullName: 'Attention-Based Network', 
    icon: '✨', 
    app: 'ChatGPT, Gemini, Midjourney',
    description: 'Arsitektur paling modern yang menggunakan mekanisme "Attention". Mampu memproses data dalam jumlah masif secara paralel untuk menghasilkan teks dan gambar baru.' 
  }
];

const openPopup = (data) => {
  activeData.value = data;
  isPopupOpen.value = true;
};

const closePopup = () => isPopupOpen.value = false;
</script>

<style scoped>
.ppt-slide-wrapper {
  padding: 5vh 8vw; height: 100%; color: white; display: flex; flex-direction: column;
}

.slide-header { text-align: center; margin-bottom: 4rem; }
.badge { color: #6366f1; font-weight: 800; font-size: 1.2rem; letter-spacing: 4px; }
.title { font-size: 4.5rem; font-weight: 900; margin: 0.5rem 0; }
.accent { color: #38bdf8; }
.subtitle { font-size: 1.6rem; color: #94a3b8; }

/* GRID CARDS */
.arch-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;
}

.arch-card {
  background: rgba(30, 41, 59, 0.7); padding: 2.5rem; border-radius: 25px;
  border: 2px solid rgba(255, 255, 255, 0.1); display: flex; align-items: center; gap: 30px;
  cursor: pointer; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.arch-card:hover { border-color: #38bdf8; transform: scale(1.05); background: rgba(56, 189, 248, 0.1); }
.arch-card.highlight-blue { border-color: #38bdf8; }
.arch-card.highlight-indigo { border-color: #6366f1; }

.arch-icon { font-size: 4.5rem; }
.arch-info h3 { font-size: 2.5rem; color: #38bdf8; margin: 0; }
.arch-info p { font-size: 1.5rem; color: #cbd5e1; margin-top: 5px; }

/* MODAL / POPUP */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(2, 6, 23, 0.95); z-index: 1000;
  display: flex; justify-content: center; align-items: center; backdrop-filter: blur(15px);
}
.modal-window {
  background: #0f172a; width: 90%; max-width: 1000px; padding: 4rem;
  border-radius: 40px; border: 3px solid #6366f1; position: relative;
}
.close-btn { position: absolute; top: 2rem; right: 2rem; font-size: 3rem; color: #94a3b8; border: none; background: none; cursor: pointer; }

.m-header { display: flex; align-items: center; gap: 30px; margin-bottom: 2rem; }
.m-icon { font-size: 6rem; }
.m-title-group h2 { font-size: 3.5rem; color: #38bdf8; margin: 0; }
.m-full-name { font-size: 1.5rem; color: #6366f1; font-weight: bold; text-transform: uppercase; }

.m-description { font-size: 1.8rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 2.5rem; }

.m-visual { text-align: center; }
.visual-label { margin-bottom: 1rem; font-size: 1.4rem; color: #38bdf8; font-weight: bold; }
.m-visual img { width: 100%; border-radius: 20px; border: 2px solid #334155; }

/* ANIMATION */
.zoom-enter-active, .zoom-leave-active { transition: 0.4s; }
.zoom-enter-from, .zoom-leave-to { opacity: 0; transform: scale(0.9); }
</style>
