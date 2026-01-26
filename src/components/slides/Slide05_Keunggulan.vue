<template>
  <div class="ppt-slide">
    <header class="slide-header">
      <div class="badge">CAPABILITIES // 2026</div>
      <h1 class="title">Kemampuan <span class="accent">Neural Network</span></h1>
    </header>

    <div class="capabilities-grid">
      <!-- Grid dengan 5 kartu -->
      <div v-for="(cap, index) in capabilities" :key="index" 
           class="cap-card" 
           :class="{ 'full-width': index === 4 }"
           @click="openPopup(cap)">
        <div class="cap-icon">{{ cap.icon }}</div>
        <div class="cap-text">
          <h3>{{ cap.title }}</h3>
          <p>{{ cap.short }}</p>
        </div>
      </div>
    </div>

    <!-- POPUP BESAR UNTUK AUDIENS -->
    <Transition name="zoom">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-window">
          <button class="close-btn" @click="closePopup">✕</button>
          <div class="modal-header">
            <span class="m-icon">{{ activeData.icon }}</span>
            <h2>{{ activeData.title }}</h2>
          </div>
          <p class="m-desc">{{ activeData.description }}</p>
          <div class="m-image-box">
            <img :src="`https://placehold.co{activeData.title}`" />
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

const capabilities = [
  { 
    icon: '👁️', 
    title: 'Pengenalan Pola Kompleks', 
    short: 'Mengenali wajah, suara, & bahasa.', 
    description: 'Mampu mengenali pola yang tidak terstruktur dan sangat rumit, seperti wajah manusia, intonasi suara, dan struktur bahasa alami secara real-time.' 
  },
  { 
    icon: '⚙️', 
    title: 'Pembelajaran Otomatis', 
    short: 'Belajar tanpa program manual.', 
    description: 'Sistem belajar dan beradaptasi secara otomatis melalui proses pelatihan tanpa perlu instruksi kaku (hard-coding) dari pemrogram.' 
  },
  { 
    icon: '🎯', 
    title: 'Peningkatan Akurasi', 
    short: 'Makin banyak data, makin cerdas.', 
    description: 'Performanya terus meningkat secara konsisten seiring bertambahnya data yang diproses, sehingga hasil prediksi menjadi semakin presisi.' 
  },
  { 
    icon: '🧠', 
    title: 'Generalisasi Cerdas', 
    short: 'Prediksi tepat pada data baru.', 
    description: 'Mampu melakukan generalisasi dari data yang telah dipelajari untuk memberikan prediksi yang tepat pada situasi baru yang belum pernah ditemui.' 
  },
  { 
    icon: '🌍', 
    title: 'Fleksibilitas Tinggi', 
    short: 'Diterapkan di berbagai bidang.', 
    description: 'Dapat diterapkan di hampir semua industri, mulai dari pengenalan gambar medis, asisten virtual, hingga analisis risiko keuangan.' 
  }
];

const openPopup = (data) => { activeData.value = data; isPopupOpen.value = true; };
const closePopup = () => isPopupOpen.value = false;
</script>

<style scoped>
.ppt-slide { padding: 4vh 6vw; height: 100%; color: white; display: flex; flex-direction: column; }
.slide-header { text-align: center; margin-bottom: 2.5rem; }
.badge { color: #6366f1; font-weight: 800; font-size: 1.2rem; letter-spacing: 4px; margin-bottom: 10px; }
.title { font-size: 4.2rem; font-weight: 900; margin: 0; line-height: 1.1; }
.accent { color: #38bdf8; text-shadow: 0 0 30px rgba(56, 189, 248, 0.4); }

.capabilities-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 1.5rem; 
}

.cap-card { 
  background: rgba(30, 41, 59, 0.7); 
  padding: 2rem 2.5rem; 
  border-radius: 25px; 
  border: 2px solid rgba(255,255,255,0.1); 
  display: flex; 
  align-items: center; 
  gap: 25px; 
  cursor: pointer; 
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
}

/* Membuat kartu ke-5 memanjang di bawah */
.cap-card.full-width {
  grid-column: span 2;
  width: 60%;
  margin: 0 auto;
}

.cap-card:hover { border-color: #38bdf8; transform: scale(1.03); background: rgba(56, 189, 248, 0.1); }
.cap-icon { font-size: 4rem; }
.cap-text h3 { font-size: 2.1rem; color: #38bdf8; margin: 0; }
.cap-text p { font-size: 1.4rem; color: #cbd5e1; margin-top: 8px; line-height: 1.2; }

/* MODAL / POPUP */
.modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.95); z-index: 1000; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(15px); }
.modal-window { background: #0f172a; width: 90%; max-width: 1000px; padding: 3.5rem; border-radius: 40px; border: 3px solid #6366f1; position: relative; }
.close-btn { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 3rem; color: #94a3b8; border: none; background: none; cursor: pointer; }
.m-icon { font-size: 5rem; display: block; margin-bottom: 1rem; }
.modal-window h2 { font-size: 3.2rem; color: #38bdf8; margin-bottom: 1rem; }
.m-desc { font-size: 1.7rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 2rem; }
.m-image-box img { width: 100%; border-radius: 20px; border: 2px solid #334155; }

.zoom-enter-active, .zoom-leave-active { transition: 0.4s; }
.zoom-enter-from, .zoom-leave-to { opacity: 0; transform: scale(0.95); }

/* Penyesuaian layar kecil agar tidak overflow di layar laptop */
@media (max-height: 800px) {
  .title { font-size: 3.2rem; }
  .cap-card { padding: 1.2rem 2rem; }
  .cap-icon { font-size: 3rem; }
  .cap-text h3 { font-size: 1.7rem; }
  .cap-text p { font-size: 1.2rem; }
}
</style>
