<template>
  <section class="nn-bridge">
    <!-- Overlay untuk efek latar belakang -->
    <div class="network-overlay"></div>

    <div class="container">
      <!-- HEADER -->
      <header class="header zoom-proximity">
        <div class="status-bar">
          <span class="pulse"></span> SYSTEM ACTIVE: FOUNDATION_CORE_2026
        </div>
        <h2 class="title">Di Balik Layar <span class="accent">Keseharian Anda</span></h2>
        <p class="subtitle">Neural Network bekerja dalam senyap, memproses jutaan pola...</p>
      </header>

      <!-- GRID PEMANTIK (Ditambah @click handler) -->
      <div class="points-grid">
        <div class="node-card zoom-proximity" @click="openPopup('Predictive Text', '⌨️', 'Saat Anda mengetik di HP, NN memproses kebiasaan bahasa Anda dan menyarankan kata berikutnya berdasarkan miliaran data pola bicara. Tanpa NN, fitur ini hanyalah daftar kata statis.', 'placeholder_keyboard.jpg')">
          <div class="icon">⌨️</div>
          <div class="text">
            <h4>Predictive Text</h4>
            <p>HP tahu kata berikutnya sebelum Anda mengetik.</p>
          </div>
        </div>

        <div class="node-card zoom-proximity" @click="openPopup('Algorithm FYP', '🎵', 'Algoritma FYP (For You Page) di TikTok atau saran lagu di Spotify menggunakan NN untuk memprediksi konten apa yang paling mungkin Anda sukai berdasarkan interaksi Anda sebelumnya (likes, skip, share).', 'placeholder_tiktok.jpg')">
          <div class="icon">🎵</div>
          <div class="text">
            <h4>Algorithm FYP</h4>
            <p>TikTok & Spotify memahami selera Anda.</p>
          </div>
        </div>

        <div class="node-card zoom-proximity" @click="openPopup('Smart Security', '🛡️', 'Fitur Face ID di ponsel Anda menggunakan CNN (Convolutional Neural Network) untuk memetakan fitur wajah Anda secara unik. Ini bekerja dengan cepat dan akurat di berbagai kondisi pencahayaan.', 'placeholder_faceid.jpg')">
          <div class="icon">🛡️</div>
          <div class="text">
            <h4>Smart Security</h4>
            <p>Face ID mengenali wajah Anda meski dalam gelap.</p>
          </div>
        </div>

        <div class="node-card zoom-proximity" @click="openPopup('Autonomous Eye', '🚗', 'Mobil otonom menggunakan NN untuk memproses input kamera secara real-time, mengidentifikasi pejalan kaki, marka jalan, dan kendaraan lain. Ini kunci dari navigasi yang aman.', 'placeholder_tesla.jpg')">
          <div class="icon">🚗</div>
          <div class="text">
            <h4>Autonomous Eye</h4>
            <p>Mobil membedakan pejalan kaki dari objek mati.</p>
          </div>
        </div>

        <div class="node-card zoom-proximity" @click="openPopup('Generative Brain', '🤖', 'ChatGPT menggunakan arsitektur Transformer (jenis NN canggih) untuk memprediksi kata berikutnya dalam sebuah kalimat, memungkinkannya menghasilkan teks yang koheren dan mirip tulisan manusia.', 'placeholder_chatgpt.jpg')">
          <div class="icon">🤖</div>
          <div class="text">
            <h4>Generative Brain</h4>
            <p>ChatGPT menyusun kalimat seperti manusia.</p>
          </div>
        </div>

        <div class="node-card zoom-proximity" @click="openPopup('Spam Guard', '📥', 'Email Spam Guard menggunakan NN untuk menganalisis teks, pola pengiriman, dan tautan dalam email. NN mempelajari ciri-ciri email spam tanpa perlu diprogram secara spesifik.', 'placeholder_email.jpg')">
          <div class="icon">📥</div>
          <div class="text">
            <h4>Spam Guard</h4>
            <p>Email sampah dibuang otomatis.</p>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <footer class="footer zoom-proximity">
        <p>Bagaimana mereka "belajar"?</p>
        <h3 class="conclusion">Melalui Fondasi <span>Neural Network</span></h3>
      </footer>
    </div>
    
    <!-- MODAL POPUP -->
    <div v-if="isPopupOpen" class="modal-overlay" @click.self="closePopup">
      <div class="modal-content">
        <button class="close-btn" @click="closePopup">✕</button>
        <div class="modal-header">
          <div class="icon">{{ currentPopup.icon }}</div>
          <h3>{{ currentPopup.title }}</h3>
        </div>
        <div class="modal-body">
          <p>{{ currentPopup.description }}</p>
          <!-- Placeholder Gambar -->
          <div class="image-placeholder">
            ** Placeholder Gambar Anda: {{ currentPopup.imagePlaceholder }} **
            <p style="margin-top: 10px; font-size: 0.8rem;">Silakan tambahkan tag `<img>` di sini nanti.</p>
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
  document.body.style.overflow = 'hidden'; // Mencegah scrolling latar belakang
};

const closePopup = () => {
  isPopupOpen.value = false;
  document.body.style.overflow = '';
};

// --- FUNGSI ANIMASI GSAP (Sama seperti sebelumnya) ---
onMounted(() => {
  const tl = gsap.timeline();
  tl.from(".status-bar", { opacity: 0, x: -20, duration: 0.8 });
  tl.from(".title", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4");
  tl.from(".subtitle", { opacity: 0, y: 20, duration: 0.8 }, "-=0.2");
  tl.from(".node-card", { 
    opacity: 0, 
    y: 30, 
    stagger: 0.15, 
    duration: 0.8,
    ease: "power2.out" 
  }, "-=0.2");
  tl.from(".footer", { opacity: 0, duration: 1 });
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com');

/* --- MODAL STYLES --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: #0f172a;
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
  position: relative;
  border: 1px solid #6366f1;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.modal-header h3 {
  color: #38bdf8;
  font-size: 1.5rem;
}

.modal-body p {
  color: #e2e8f0;
  margin-bottom: 1.5rem;
}

.image-placeholder {
  background: #1e293b;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #6366f1;
  border: 1px dashed #6366f1;
}

/* --- TINGGALKAN STYLE LAMA DI SINI --- */
/* Pastikan font diimpor di index.html atau di file CSS utama */
@import url('https://fonts.googleapis.com');

.nn-bridge {
  font-family: 'Plus Jakarta Sans', sans-serif;
  width: 100vw;
  height: 100vh;
  background: #020617; /* Warna latar belakang gelap */
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
/* ... (sisa style lama untuk header, grid, cards, dan footer) ... */
.container {
  width: 90%;
  max-width: 1100px;
  z-index: 2;
}

/* HEADER STYLE (Sesuai dengan gambar yang Anda kirim) */
.status-bar {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #6366f1; /* Neon Purple */
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pulse {
  width: 8px;
  height: 8px;
  background: #6366f1;
  border-radius: 50%;
  box-shadow: 0 0 10px #6366f1;
  animation: pulse-kf 2s infinite;
}

.title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.subtitle {
    color: #94a3b8;
}

.accent {
  background: linear-gradient(90deg, #6366f1, #38bdf8); /* Gradien Biru-Ungu */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* GRID & CARDS (Poin Pemantik) */
.points-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 Kolom */
  gap: 20px;
  margin: 3rem 0;
}

.node-card {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  cursor: pointer; /* Tambahkan kursor pointer untuk menunjukkan bisa diklik */
  transition: all 0.3s ease;
}

.node-card:hover {
  border-color: #38bdf8; /* Efek hover */
}


.icon {
  font-size: 1.8rem;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.text h4 {
  font-weight: 600;
  color: #38bdf8; /* Neon Blue */
  margin-bottom: 4px;
}

.text p {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.4;
}

/* FOOTER */
.footer {
  text-align: center;
  margin-top: 2rem;
}

.conclusion {
  font-size: 1.8rem;
  font-weight: 700;
}

.conclusion span {
  color: #6366f1; /* Neon Purple */
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
}
.node-card {
  opacity: 1 !important; /* Paksa kartu untuk terlihat */
}

@keyframes pulse-kf {
  0% { transform: scale(0.95); opacity: 0.5; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.5; }
}
</style>
