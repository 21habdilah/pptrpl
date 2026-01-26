<template>
  <div class="ppt-slide-content">
    <header class="slide-header">
      <div class="badge">ARCHITECTURE_DETAILS</div>
      <h1 class="title">Struktur <span class="accent">Neural Network</span></h1>
    </header>

    <div class="structure-layout">
      <div class="diagram-panel">
        <img src="https://placehold.co" class="main-img" />
      </div>

      <div class="details-panel">
        <div v-for="item in structure" :key="item.title" 
             class="struct-item" :style="{ borderColor: item.color }"
             @click="openPopup(item)">
          <div class="layer-title" :style="{ color: item.color }">{{ item.title }}</div>
          <p>{{ item.short }}</p>
        </div>
      </div>
    </div>

    <!-- MODAL POPUP -->
    <Transition name="zoom">
      <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
        <div class="modal-window">
          <button class="close-btn" @click="closePopup">✕</button>
          <h2 :style="{ color: activeData.color }">{{ activeData.title }}</h2>
          <p class="m-desc">{{ activeData.description }}</p>
          <div class="m-image-box">
            <!-- Contoh Gambar Visual per Lapisan -->
            <img :src="`https://placehold.co{activeData.color.replace('#','') }?text=Visual+Detail+${activeData.title}`" />
          </div>
          <div class="footer-note">Klik di luar untuk kembali ke slide</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const isPopupOpen = ref(false);
const activeData = ref({});

const structure = [
  { title: 'Input Layer', color: '#38bdf8', short: 'Penerima data mentah.', description: 'Lapisan ini bertugas menerima input dari luar (seperti nilai piksel gambar 28x28). Setiap node mewakili satu fitur dari data.' },
  { title: 'Hidden Layer', color: '#6366f1', short: 'Pemroses pola kompleks.', description: 'Lapisan tersembunyi melakukan ekstraksi fitur. Semakin dalam (banyak) lapisan ini, semakin pintar jaringan mengenali pola abstrak.' },
  { title: 'Neuron & Bobot', color: '#94a3b8', short: 'Koneksi antar unit.', description: 'Bobot (weights) menentukan seberapa kuat sinyal diteruskan. Pelatihan AI pada dasarnya adalah mencari nilai bobot yang paling pas.' },
  { title: 'Fungsi Aktivasi', color: '#f59e0b', short: 'Pemicu keputusan neuron.', description: 'Menentukan apakah neuron harus "aktif" atau tidak berdasarkan input yang diterima, menggunakan fungsi matematika non-linear (seperti ReLU atau Sigmoid).' },
  { title: 'Output Layer', color: '#f43f5e', short: 'Hasil prediksi akhir.', description: 'Lapisan terakhir yang memberikan jawaban, misalnya klasifikasi 0-9 untuk angka atau probabilitas "Kucing" vs "Anjing".' }
];

const openPopup = (data) => { activeData.value = data; isPopupOpen.value = true; };
const closePopup = () => isPopupOpen.value = false;
</script>

<style scoped>
/* Gunakan style yang mirip dengan SlideKemampuan untuk konsistensi */
.ppt-slide-content { padding: 3rem 5rem; height: 100%; color: white; display: flex; flex-direction: column; }
.slide-header { margin-bottom: 2rem; }
.title { font-size: 3.5rem; font-weight: 900; }
.accent { color: #38bdf8; }
.structure-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; flex-grow: 1; align-items: center; }
.main-img { width: 100%; border-radius: 20px; border: 2px solid #334155; }
.details-panel { display: flex; flex-direction: column; gap: 1rem; }
.struct-item { background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 12px; border-left: 5px solid; cursor: pointer; transition: 0.3s; }
.struct-item:hover { background: rgba(255,255,255,0.1); transform: translateX(10px); }
.layer-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 5px; }
.struct-item p { margin: 0; color: #cbd5e1; font-size: 1rem; }

/* Modal sama dengan sebelumnya agar konsisten */
.modal-overlay { position: fixed; inset: 0; background: rgba(2, 6, 23, 0.95); z-index: 1000; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(15px); }
.modal-window { background: #0f172a; width: 850px; padding: 3rem; border-radius: 30px; border: 1px solid #334155; position: relative; }
.close-btn { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 2rem; color: #94a3b8; border: none; background: none; cursor: pointer; }
.m-desc { font-size: 1.3rem; color: #cbd5e1; line-height: 1.6; margin: 1.5rem 0; }
.m-image-box img { width: 100%; border-radius: 15px; }
.footer-note { margin-top: 1.5rem; text-align: center; color: #64748b; font-size: 0.9rem; }
.zoom-enter-active, .zoom-leave-active { transition: 0.3s; }
.zoom-enter-from, .zoom-leave-to { opacity: 0; transform: translateY(20px); }
</style>
