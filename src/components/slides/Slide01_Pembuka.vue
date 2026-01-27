kenapa img gak muncul<template>
  <section class="ppt-slide-wrapper">
    <!-- Background Space Efek Kedalaman -->
    <div class="background-glow"></div>
    
    <div class="slide-viewport">
      <!-- HEADER -->
      <header class="slide-header">
        <div class="status-badge">
          <span class="pulse"></span> 
          <span class="badge-text">NEURAL_NETWORK_APPLICATIONS //</span>
        </div>
        <h2 class="main-title">Di Balik Layar <span class="accent">Keseharian Anda</span></h2>
       <div class="divider"></div>
<p>Setiap kali Anda menggunakan smartphone, mengakses internet, atau bahkan berbelanja online, ada proses kompleks yang terjadi di balik layar. Teknologi canggih ini bekerja secara otomatis untuk membantu memudahkan aktivitas Anda.</p>
<h3 class="conclusion">Conthhnya <span class="glow-text">Dikehidupan sehari-hari</span></h3>
      </header>

      <!-- GRID CARDS (Gaya Kartu Lebih Premium) -->
      <div class="points-grid">
        <div v-for="(item, index) in cards" :key="index" 
             class="node-card" 
             @click="openPopup(item)">
          <div class="card-icon-box">{{ item.icon }}</div>
          <div class="card-text">
            <h4>{{ item.title }}</h4>
            <p>{{ item.short }}</p>
          </div>
          <div class="card-hover-hint">Detail →</div>
        </div>
      </div>

      <!-- FOOTER -->
      <footer class="slide-footer">
        <div class="divider"></div>
        <p>Bagaimana mereka memproses semua itu?</p>
        <h3 class="conclusion">Semuanya berawal dari <span class="glow-text">Neural Network</span></h3>
      </footer>
    </div>
    
    <!-- MODAL POPUP (LAYOUT LEBIH BERSIH) -->
    <Transition name="zoom">
      <div v-if="isPopupOpen" class="ppt-modal-overlay" @click.self="closePopup">
        <div class="ppt-modal-window">
          <button class="close-btn" @click="closePopup">✕</button>
          
          <div class="modal-content-grid">
            <div class="modal-text-side">
              <div class="modal-header">
                <span class="m-icon">{{ activeData.icon }}</span>
                <h2>{{ activeData.title }}</h2>
              </div>
              <p class="m-description">{{ activeData.description }}</p>
              <div class="m-tech-tag">Arsitektur: {{ activeData.tech }}</div>
            </div>
            
            <div class="modal-visual-side">
              <div class="m-img-frame">
                   <img v-if="activeData.img" :src="activeData.img" :alt="activeData.title" />
              </div>
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
import gImage from '../../assets/g.jpeg';
import hImage from '../../assets/h.jpeg';
import kImage from '../../assets/k.jpeg';
const isPopupOpen = ref(false);
const activeData = ref({});

const cards = [
  { title: 'Predictive Text', icon: '⌨️', short: 'Prediksi kata berikutnya.', description: 'HP Anda mempelajari pola bicara dan kebiasaan mengetik Anda untuk menyarankan kata yang paling relevan secara real-time.', tech: 'RNN (Recurrent Neural Network)', img: gImage },
  { title: 'Algorithm FYP', icon: '🎵', short: 'Personalisasi konten.', description: 'Algoritma menganalisis interaksi Anda (like, share, watch time) untuk menyajikan feed yang unik bagi setiap pengguna.', tech: 'Recommendation Engine', img: hImage  },
  { title: 'Smart Security', icon: '🛡️', short: 'Akses biometrik instan.', description: 'Face ID memetakan ribuan titik inframerah di wajah Anda menggunakan jaringan saraf konvolusional untuk keamanan tingkat tinggi.', tech: 'CNN (Convolutional Network)', img: kImage },
  { title: 'Face Unlock', icon: '🔓', short: 'Pembukaan ponsel otomatis.', description: 'Menggunakan pengenalan wajah untuk membuka kunci ponsel Anda secara cepat dan aman.', tech: 'Facial Recognition', img: 'face_unlock' },
  { title: 'Generative Brain', icon: '🤖', short: 'Asisten cerdas (ChatGPT).', description: 'Memungkinkan interaksi teks dan suara yang natural melalui pemahaman bahasa manusia yang sangat kompleks.', tech: 'Large Language Models', img: 'gpt' },
  { title: 'Spam Guard', icon: '📥', short: 'Penyaring email sampah.', description: 'Secara otomatis memisahkan email penting dan spam dengan menganalisis pola teks dan reputasi pengirim.', tech: 'Natural Language Processing', img: 'spam' },
  // Card tambahan untuk game online
  { title: 'Game AI', icon: '🎮', short: 'Bot pemain cerdas.', description: 'Menggunakan AI untuk menghadirkan lawan yang menantang dan pengalaman bermain yang lebih hidup.', tech: 'Reinforcement Learning', img: 'game_ai' },
  // Card tambahan untuk iklan produk
  { title: 'Targeted Ads', icon: '🎯', short: 'Iklan yang relevan.', description: 'Iklan disesuaikan berdasarkan perilaku browsing dan preferensi pengguna untuk meningkatkan efektivitas promosi.', tech: 'Machine Learning', img: 'ads' },
  // Card tambahan untuk online shop
  { title: 'Product Recommendations', icon: '🛍️', short: 'Saran produk personal.', description: 'Rekomendasi produk yang dipersonalisasi membantu pengguna menemukan barang yang sesuai dengan minat mereka.', tech: 'Collaborative Filtering', img: 'shop' }
];


const openPopup = (item) => {
  activeData.value = item;
  isPopupOpen.value = true;
};
const closePopup = () => (isPopupOpen.value = false);


onMounted(() => {
  const tl = gsap.timeline();
  tl.from(".slide-viewport", { opacity: 0, scale: 0.95, duration: 1, ease: "power4.out" });
  tl.from(".status-badge, .main-title, .main-subtitle", { opacity: 0, y: 20, stagger: 0.2, duration: 0.8 }, "-=0.5");
  tl.from(".node-card", { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4");
});
</script>

<style scoped>
/* WRAPPER & BACKGROUND */
.ppt-slide-wrapper {
  width: 100vw; height: 100vh; background: #020617;
  display: flex; justify-content: center; align-items: center;
  position: relative; overflow: hidden;
}
.background-glow {
  position: absolute; width: 60vw; height: 60vw;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  top: -20%; right: -10%; z-index: 0;
}

/* SLIDE VIEWPORT 16:9 */
.slide-viewport {
  position: relative; z-index: 2; width: 92vw; aspect-ratio: 16 / 9;
  background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 40px;
  padding: 4% 5%; display: flex; flex-direction: column;
}

/* HEADER */
.status-badge { display: flex; align-items: center; gap: 10px; color: #6366f1; font-family: monospace; font-weight: bold; margin-bottom: 1rem; font-size: 1rem; }
.pulse { width: 10px; height: 10px; background: #6366f1; border-radius: 50%; box-shadow: 0 0 10px #6366f1; animation: pulse-kf 2s infinite; }
.main-title { font-size: 4rem; font-weight: 900; color: white; line-height: 1; letter-spacing: -2px; }
.accent { color: #38bdf8; text-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
.main-subtitle { font-size: 1.5rem; color: #94a3b8; margin-top: 15px; margin-bottom: 3rem; }

/* GRID CARDS */
.points-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }

.node-card {
  background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem; border-radius: 24px; display: flex; align-items: center; gap: 20px;
  cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative; overflow: hidden;
}
.node-card:hover { transform: translateY(-10px); background: rgba(56, 189, 248, 0.1); border-color: #38bdf8; }
.node-card {
  opacity: 1 !important; 
}
.card-icon-box { font-size: 3rem; }
.card-text h4 { font-size: 1.6rem; color: #38bdf8; margin: 0; font-weight: 800; }
.card-text p { font-size: 1.1rem; color: #cbd5e1; margin-top: 5px; line-height: 1.3; }
.card-hover-hint { position: absolute; bottom: 10px; right: 20px; font-size: 0.8rem; color: #6366f1; opacity: 0; transition: 0.3s; }
.node-card:hover .card-hover-hint { opacity: 1; }

/* FOOTER */
.slide-footer { margin-top: auto; text-align: center; padding-top: 2rem; }
.divider { width: 100px; height: 4px; background: #1e293b; margin: 0 auto 1.5rem; border-radius: 2px; }
.slide-footer p { color: #94a3b8; font-size: 1.2rem; margin-bottom: 5px; }
.conclusion { font-size: 2rem; color: white; font-weight: 300; }
.glow-text { color: #6366f1; font-weight: 900; text-shadow: 0 0 15px rgba(99, 102, 241, 0.5); }

/* MODAL REFINED */
.ppt-modal-overlay {
  position: fixed; inset: 0; background: rgba(2, 6, 23, 0.95);
  display: flex; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(20px);
}
.ppt-modal-window {
  background: #0f172a; width: 1000px; padding: 4rem; border-radius: 40px;
  border: 1px solid #38bdf8; position: relative;
}
.modal-content-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 3rem; align-items: center; }
.m-icon { font-size: 4rem; margin-bottom: 1rem; display: block; }
.modal-text-side h2 { font-size: 3.5rem; color: #38bdf8; margin-bottom: 1.5rem; font-weight: 900; }
.m-description { font-size: 1.6rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 2rem; }
.m-tech-tag { display: inline-block; background: rgba(99, 102, 241, 0.2); color: #6366f1; padding: 8px 20px; border-radius: 50px; font-weight: bold; font-family: monospace; }
.m-img-frame img { width: 100%; border-radius: 24px; border: 1px solid #1e293b; }

.close-btn { position: absolute; top: 2rem; right: 2rem; font-size: 2.5rem; color: #475569; background: none; border: none; cursor: pointer; }

/* ANIMATIONS */
.zoom-enter-active, .zoom-leave-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.zoom-enter-from, .zoom-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }
@keyframes pulse-kf { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.5; } }
</style>
