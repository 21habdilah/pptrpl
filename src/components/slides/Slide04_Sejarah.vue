<template>
  <section class="nn-history">
    <div class="container">
      <header class="header">
        <div class="status-bar">
          <span class="pulse"></span> EVOLUTION_TIMELINE
        </div>
        <h2 class="title">Perjalanan <span class="accent">Neural Network</span></h2>
        <p class="subtitle">Dari konsep biologis sederhana hingga revolusi AI 2026.</p>
      </header>

      <div class="timeline-container">
        <!-- Event 1 -->
        <div class="timeline-event" @click="openPopup('1958: Perceptron', '🧠', 'Model awal jaringan saraf buatan yang diperkenalkan oleh Frank Rosenblatt. Mampu mengenali pola visual sederhana, tetapi memiliki keterbatasan signifikan yang membuatnya terlupakan sementara waktu.', 'placeholder_perceptron.jpg')">
          <div class="year">1958</div>
          <div class="description-box">
            <h4>Perceptron Pertama</h4>
            <p>Model awal NN yang lahir dari inspirasi otak.</p>
          </div>
        </div>

        <!-- Event 2 -->
        <div class="timeline-event" @click="openPopup('1986: Backpropagation', '🔄', 'Penemuan kembali algoritma backpropagation (propagasi balik kesalahan). Ini memungkinkan NN belajar dari kesalahan secara efisien dengan menyesuaikan bobot koneksi, membuka jalan untuk pelatihan jaringan yang lebih dalam.', 'placeholder_backprop.jpg')">
          <div class="year">1986</div>
          <div class="description-box">
            <h4>Algoritma Kunci</h4>
            <p>NN mulai bisa belajar dari kesalahan secara otomatis.</p>
          </div>
        </div>

        <!-- Event 3 -->
        <div class="timeline-event" @click="openPopup('2010s: Deep Learning Boom', '💥', 'Dengan komputasi yang lebih cepat (GPU) dan data internet yang melimpah, Deep Learning (NN yang sangat dalam/besar) berkembang pesat, mengungguli metode AI tradisional di berbagai bidang seperti visi komputer.', 'placeholder_deeplearning.jpg')">
          <div class="year">2010s</div>
          <div class="description-box">
            <h4>Era Deep Learning</h4>
            <p>Kecerdasan buatan meledak ke publik.</p>
          </div>
        </div>

        <!-- Event 4 -->
        <div class="timeline-event" @click="openPopup('2026: Fondasi AI Modern', '🚀', 'Hingga tahun 2026, NN menjadi tulang punggung AI adaptif (Agentic AI) dan Edge AI. Kemampuannya untuk memproses bahasa alami dan data kompleks menjadikannya fondasi utama di balik inovasi masa depan.', 'placeholder_ai2026.jpg')">
          <div class="year">2026</div>
          <div class="description-box">
            <h4>Fondasi Masa Depan</h4>
            <p>Dasar dari semua inovasi AI modern.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL POPUP (Sama seperti slide sebelumnya) -->
    <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
      <div class="modal-content">
        <button class="close-btn" @click="closePopup">✕</button>
        <div class="modal-header">
          <div class="icon">{{ currentPopup.icon }}</div>
          <h3>{{ currentPopup.title }}</h3>
        </div>
        <div class="modal-body">
          <p>{{ currentPopup.description }}</p>
          <div class="image-placeholder">
            ** Placeholder Gambar Anda: {{ currentPopup.imagePlaceholder }} **
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

// --- FUNGSI POPUP ---
const isPopupOpen = ref(false);
const currentPopup = ref({});
const openPopup = (title, icon, description, imagePlaceholder) => {
  currentPopup.value = { title, icon, description, imagePlaceholder };
  isPopupOpen.value = true;
  document.body.style.overflow = 'hidden';
};
const closePopup = () => {
  isPopupOpen.value = false;
  document.body.style.overflow = '';
};

// --- ANIMASI GSAP ---
onMounted(() => {
  const tl = gsap.timeline();
  
  tl.from(".status-bar", { opacity: 0, x: -20, duration: 0.8 });
  tl.from(".title", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4");
  tl.from(".subtitle", { opacity: 0, y: 20, duration: 0.8 }, "-=0.2");
  // Animasi stagger untuk event timeline
  tl.from(".timeline-event", { 
    opacity: 0, 
    y: 50, 
    stagger: 0.3, // Muncul berurutan dari kiri ke kanan
    duration: 1,
    ease: "power2.out" 
  }, "-=0.2");
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com');

.nn-history {
  font-family: 'Plus Jakarta Sans', sans-serif;
  width: 100vw;
  height: 100vh;
  background: #020617;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.container {
  width: 90%;
  max-width: 1100px;
  z-index: 2;
  position: relative;
  background: rgba(2, 6, 23, 0.7); 
  padding: 2rem 1rem; 
  border-radius: 10px;
}

/* HEADER STYLE (Sama seperti slide lain) */
.status-bar { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #6366f1; margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; }
.pulse { width: 8px; height: 8px; background: #6366f1; border-radius: 50%; box-shadow: 0 0 10px #6366f1; animation: pulse-kf 2s infinite; }
.title { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 800; margin-bottom: 0.5rem; }
.subtitle { color: #94a3b8; }
.accent { background: linear-gradient(90deg, #6366f1, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }


/* TIMELINE STYLES */
.timeline-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 4rem 0;
  /* Garis horizontal timeline */
  border-bottom: 2px solid rgba(99, 102, 241, 0.5); 
}

.timeline-event {
  flex: 1;
  text-align: center;
  position: relative;
  cursor: pointer;
  padding-bottom: 20px;
  transition: all 0.3s ease;
}

.timeline-event:hover {
    transform: translateY(-5px);
}

/* Lingkaran di timeline */
.timeline-event::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -12px;
  width: 25px;
  height: 25px;
  background: #020617;
  border: 2px solid #38bdf8;
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px #38bdf8;
}

.year {
  font-size: 1.2rem;
  font-weight: 700;
  color: #38bdf8;
  margin-bottom: 0.5rem;
}

.description-box {
  background: rgba(30, 41, 59, 0.7);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 10px;
}

.description-box h4 {
    color: #fff;
    margin-bottom: 5px;
}

.description-box p {
    font-size: 0.8rem;
    color: #94a3b8;
}

/* MODAL STYLES (Sama seperti sebelumnya) */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(5px); }
.modal-content { background: #0f172a; padding: 2rem; border-radius: 16px; max-width: 600px; width: 90%; box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3); position: relative; border: 1px solid #6366f1; }
.close-btn { position: absolute; top: 10px; right: 10px; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }
.modal-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.modal-header h3 { color: #38bdf8; font-size: 1.5rem; }
.modal-body p { color: #e2e8f0; margin-bottom: 1.5rem; }
.image-placeholder { background: #1e293b; padding: 4rem 2rem; border-radius: 8px; text-align: center; color: #6366f1; border: 1px dashed #6366f1; }

@keyframes pulse-kf {
  0% { transform: scale(0.95); opacity: 0.5; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.5; }
}
</style>
