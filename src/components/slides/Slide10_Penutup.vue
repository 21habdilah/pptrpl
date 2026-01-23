<template>
  <SpotlightWrapper class="ppt-container">
    
    <!-- BACKGROUND FLOATING EMOJI -->
    <div class="floating-bg">
      <span v-for="n in 15" :key="n" class="floating-emoji">
        {{ emojis[n % emojis.length] }}
      </span>
    </div>

    <!-- HEADER SECTION -->
    <header class="header-section">
      <h2 class="ppt-title">Terima Kasih</h2>
      <div class="divider"></div>
      <p class="ppt-subtitle">Semoga apa yang disampaikan dapat bermanfaat.</p>
    </header>

    <!-- SINGLE MESSAGE CARD (Tanpa Foto) -->
    <div class="message-container">
      <div
        v-for="meme in memes"
        :key="meme.title"
        class="text-only-card"
      >
        <p class="quote-icon">"</p>
        <p class="message-text">{{ meme.title }}</p>
      </div>
    </div>

    <!-- STIKER ROKET MELUNCUR -->
    <div class="rocket-launcher">
      <span v-for="n in 3" :key="n" class="moving-rocket">🚀</span>
    </div>

    <!-- FOOTER CLOSING -->
    <footer class="closing-statement">
      <p class="wisdom-text">
        "Demikian presentasi dari kami. Kebenaran dan kemudahan memahami datang dari <span>Allah SWT</span>, <br> 
        sementara kekurangan dan kekeliruan adalah dari kami. Terima kasih."
      </p>
      <div class="social-tag">Stay Halal & Syukron!</div>
    </footer>

    <!-- ANIMASI OMBAK (WAVES) -->
    <div class="wave-wrapper">
      <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(56, 189, 248, 0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(56, 189, 248, 0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#38bdf8" />
        </g>
      </svg>
    </div>

  </SpotlightWrapper>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';
import gsap from 'gsap';
import SpotlightWrapper from '../SpotlightWrapper.vue';

const memes = [
  { title: 'Sebaik-baiknya aplikasi? Aplikasi Muslim Pro! 😎' },
];

const emojis = ['✨', '🙏', '💻', '🌙', '🔥', '🤖'];

onMounted(() => {
  nextTick(() => {
    // 1. Animasi Header & Footer
    gsap.from('.header-section', { opacity: 0, y: -50, duration: 1.2, ease: 'power3.out' });
    gsap.from('.closing-statement', { opacity: 0, y: 30, delay: 0.8, duration: 1.5 });

    // 2. Animasi Kartu Teks (Pop In)


    // 3. Animasi Roket Meluncur (Looping)
    gsap.to('.moving-rocket', {
      y: '-120vh',
      x: 'random(-100, 100)',
      duration: 'random(4, 7)',
      repeat: -1,
      delay: 'random(0, 5)',
      ease: 'power1.in',
      onRepeat: function() {
        gsap.set(this._targets, { left: Math.random() * 90 + '%' });
      }
    });

    // 4. Animasi Ombak Bergerak
    gsap.to(".parallax > use", {
      x: -48,
      repeat: -1,
      duration: (i) => [4, 7, 10][i],
      ease: "linear",
    });

    // 5. Animasi Floating Emojis (Background)
    document.querySelectorAll('.floating-emoji').forEach((el) => {
      gsap.set(el, { left: Math.random() * 90 + '%' , top: Math.random() * 90 + '%' });
      gsap.to(el, {
        x: 'random(-40, 40)',
        y: 'random(-40, 40)',
        rotation: 'random(-30, 30)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  });
});
</script>

<style scoped>
.ppt-container {
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at center, #0f172a 0%, #020617 100%);
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 2rem;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.header-section { z-index: 10; }
.ppt-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.divider {
  width: 60px;
  height: 4px;
  background: #38bdf8;
  margin: 1rem auto;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
}

.message-container {
  display: flex;
  justify-content: center;
  z-index: 10;
}

.text-only-card {
  background: rgba(30, 41, 59, 0.5);
  border: 2px solid rgba(56, 189, 248, 0.3);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  padding: 2.5rem;
  max-width: 600px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: relative;
  transition: 0.4s ease;
}

.text-only-card:hover {
  transform: scale(1.02);
  border-color: #38bdf8;
  box-shadow: 0 25px 60px rgba(56, 189, 248, 0.2);
}

.quote-icon {
  font-family: serif;
  font-size: 4rem;
  color: #38bdf8;
  line-height: 0;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.message-text {
  font-size: 1.5rem;
  line-height: 1.4;
  color: #f8fafc;
  font-weight: 600;
  font-style: italic;
}

.closing-statement { z-index: 10; margin-bottom: 4rem; }
.wisdom-text { font-size: 1.1rem; line-height: 1.6; color: #cbd5e1; }
.wisdom-text span { color: #38bdf8; font-weight: 700; }

.rocket-launcher { position: absolute; inset: 0; pointer-events: none; z-index: 5; }
.moving-rocket { position: absolute; bottom: -50px; font-size: 3rem; filter: drop-shadow(0 0 10px #38bdf8); }

.wave-wrapper { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 1; }
.waves { width: 100%; height: 12vh; min-height: 80px; }

.floating-bg { position: absolute; inset: 0; z-index: 0; }
.floating-emoji { position: absolute; font-size: 2rem; opacity: 0.15; }
</style>
