<template>
  <section class="ppt-slide-wrapper">
    <!-- Viewport Slide 16:9 -->
    <div class="slide-viewport">
      
      <!-- HEADER -->
      <header class="slide-header">
        <div class="status-badge">
          <span class="pulse"></span> SYSTEM_ACTIVE: REAL_WORLD_APPS
        </div>
        <h2 class="main-title">Di Balik Layar <span class="accent">Keseharian Anda</span></h2>
        <p class="main-subtitle">Neural Network bekerja dalam senyap, memproses jutaan pola di sekitar kita.</p>
      </header>

      <!-- GRID CARDS (6 POIN) -->
      <div class="points-grid">
        <div v-for="(item, index) in cards" :key="index" 
             class="node-card" 
             @click="openPopup(item.title, item.icon, item.description, item.img)">
          <div class="card-icon">{{ item.icon }}</div>
          <div class="card-text">
            <h4>{{ item.title }}</h4>
            <p>{{ item.short }}</p>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <footer class="slide-footer">
        <p>Bagaimana mereka "belajar"?</p>
        <h3 class="conclusion">Melalui Fondasi <span>Neural Network</span></h3>
      </footer>
    </div>
    
    <!-- MODAL POPUP (NYAMBUNG DENGAN STYLE SEBELUMNYA) -->
    <Transition name="zoom">
      <div v-if="isPopupOpen" class="ppt-modal-overlay" @click.self="closePopup">
        <div class="ppt-modal-window">
          <button class="close-btn" @click="closePopup">✕</button>
          
          <div class="modal-header">
            <span class="m-icon">{{ currentPopup.icon }}</span>
            <h2>{{ currentPopup.title }}</h2>
          </div>
          
          <div class="modal-body">
            <p class="m-description">{{ currentPopup.description }}</p>
            <div class="m-img-frame">
              <img :src="`https://placehold.co{currentPopup.title}`" alt="Visual Link" />
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const isPopupOpen = ref(false);
const currentPopup = ref({});

const cards = [
  { title: 'Predictive Text', icon: '⌨️', short: 'HP tahu kata berikutnya.', description: 'Saat Anda mengetik, NN memproses kebiasaan bahasa Anda dan menyarankan kata berikutnya berdasarkan miliaran data pola bicara.', img: 'keyboard' },
  { title: 'Algorithm FYP', icon: '🎵', short: 'Memahami selera Anda.', description: 'Algoritma FYP menggunakan NN untuk memprediksi konten yang Anda sukai berdasarkan likes, skip, dan share.', img: 'algorithm' },
  { title: 'Smart Security', icon: '🛡️', short: 'Face ID di kegelapan.', description: 'Face ID menggunakan CNN (Convolutional Neural Network) untuk memetakan fitur wajah Anda secara unik dan akurat.', img: 'security' },
  { title: 'Autonomous Eye', icon: '🚗', short: 'Navigasi mobil pintar.', description: 'Mobil otonom menggunakan NN untuk memproses input kamera secara real-time demi mengidentifikasi pejalan kaki.', img: 'auto' },
  { title: 'Generative Brain', icon: '🤖', short: 'ChatGPT yang koheren.', description: 'Menggunakan arsitektur Transformer untuk menghasilkan teks yang koheren dan mirip tulisan manusia.', img: 'gpt' },
  { title: 'Spam Guard', icon: '📥', short: 'Filter email sampah.', description: 'NN menganalisis teks dan pola pengiriman untuk membuang email spam secara otomatis tanpa program spesifik.', img: 'spam' }
];

const openPopup = (title, icon, description, imagePlaceholder) => {
  currentPopup.value = { title, icon, description, imagePlaceholder };
  isPopupOpen.value = true;
};

const closePopup = () => (isPopupOpen.value = false);

onMounted(() => {
  const tl = gsap.timeline();
  tl.from(".status-badge", { opacity: 0, x: -20, duration: 0.6 });
  tl.from(".main-title", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");
  tl.from(".node-card", { 
    opacity: 0, 
    scale: 0.9,
    y: 20, 
    stagger: 0.1, 
    duration: 0.5,
    ease: "back.out(1.7)" 
  }, "-=0.2");
});
</script>

<style scoped>
/* WRAPPER UTAMA */
.ppt-slide-wrapper {
  width: 100vw; height: 100vh;
  background: #020617;
  display: flex; justify-content: center; align-items: center;
  overflow: hidden; font-family: 'Inter', sans-serif;
}

/* BOX SLIDE 16:9 */
.slide-viewport {
  position: relative;
  width: 90vw; aspect-ratio: 16 / 9;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 4rem;
  display: flex; flex-direction: column;
}

/* HEADER */
.status-badge {
  display: inline-flex; align-items: center; gap: 8px; margin-top: 3rem;
  color: #6366f1; font-family: monospace; font-weight: bold; margin-bottom: 0.5rem;
}
.pulse { width: 8px; height: 8px; background: #6366f1; border-radius: 50%; animation: pulse-kf 2s infinite; }
.main-title { font-size: 3.2rem; font-weight: 900; color: white; margin: 0; }
.accent { color: #38bdf8; }
.main-subtitle { font-size: 1.4rem; color: #94a3b8; margin-bottom: 2rem; margin-top: 2rem;}

/* GRID CARDS */
.points-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
}

.node-card {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 50px; border-radius: 16px;
  display: flex; align-items: center; gap: 15px;
  cursor: pointer; transition: 0.3s;
}

.node-card:hover {
  background: rgba(99, 102, 241, 0.15);
  border-color: #6366f1;
  transform: translateY(-5px);
}
.node-card {
  opacity: 1 !important; 
}

.card-icon { font-size: 2.5rem; }
.card-text h4 { font-size: 2rem; color: #38bdf8; margin: 0; }
.card-text p { font-size: 2rem; color: #cbd5e1; margin: 4px 0 0; }

/* FOOTER */
.slide-footer { margin-top: auto; margin-bottom: 2rem; text-align: center; }
.slide-footer p { color: #94a3b8; font-size: 1.5rem; margin-bottom: 5px; }
.conclusion { font-size: 1.8rem; color: white; }
.conclusion span { color: #6366f1; font-weight: 800; }

/* MODAL PPT STYLE */
.ppt-modal-overlay {
  position: fixed; inset: 0; background: rgba(2, 6, 23, 0.9);
  display: flex; justify-content: center; align-items: center; z-index: 1000;
}
.ppt-modal-window {
  background: #0f172a; width: 850px; padding: 3rem; border-radius: 30px;
  border: 2px solid #6366f1; position: relative;
}
.close-btn { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 2rem; color: #94a3b8; background: none; border: none; cursor: pointer; }
.m-icon { font-size: 4rem; display: block; margin-bottom: 1rem; }
.ppt-modal-window h2 { font-size: 2.8rem; color: #38bdf8; margin: 0 0 1rem; }
.m-description { font-size: 1.4rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 2rem; }
.m-img-frame img { width: 100%; border-radius: 20px; border: 1px solid #334155; }

/* ANIMATIONS */
.zoom-enter-active, .zoom-leave-active { transition: all 0.3s ease; }
.zoom-enter-from, .zoom-leave-to { opacity: 0; transform: scale(0.9); }
@keyframes pulse-kf { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
</style>
