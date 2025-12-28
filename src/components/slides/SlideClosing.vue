<template>
  <SpotlightWrapper class="ppt-container">

    <!-- BACKGROUND FLOATING EMOJI -->
    <div class="floating-bg">
      <span v-for="n in 12" :key="n" class="floating-emoji">
        {{ emojis[Math.floor(Math.random() * emojis.length)] }}
      </span>
    </div>

    <!-- JUDUL SLIDE -->
    <h2 class="ppt-title">Penutup</h2>
    <p class="ppt-subtitle"></p>

    <!-- GRID MEME CINEMATIC -->
    <div class="meme-grid">
      <transition-group name="stagger-meme" tag="div" class="meme-wrapper">
        <div
          v-for="meme in memes"
          :key="meme.title"
          class="meme-card"
        >
          <img :src="meme.src"/>
          <p class="meme-caption">{{ meme.title }}</p>
        </div>
      </transition-group>
    </div>

  </SpotlightWrapper>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import gsap from 'gsap';
import SpotlightWrapper from '../SpotlightWrapper.vue';

const memes = [
  { src: '/memes/1.png', title: 'Sebaik-baiknya apalikasi adalah apalikasi Muslim Pro 😎' },
  { src: '/memes/2.png', title: 'Debugging itu ibarat nyari kunci 🔑' },
  { src: '/memes/meme3.png', title: 'Commit dulu sebelum kopi habis ☕' },
];

const emojis = ['🎉', '🤖', '🐱‍💻', '🍕', '👾'];

onMounted(() => {
  nextTick(() => {
    // Cinematic stagger: dari bawah + scale + bounce
    gsap.from('.meme-card', {
      opacity: 0,
      y: 60,
      scale: 0.9,
      stagger: 0.3,
      duration: 0.8,
      ease: 'back.out(1.7)',
    });

    // Floating emoji lebih dramatis
    gsap.to('.floating-emoji', {
      y: 'random(-30,30)',
      x: 'random(-30,30)',
      rotation: 'random(-20,20)',
      repeat: -1,
      yoyo: true,
      duration: 'random(4,8)',
      ease: 'sine.inOut',
      stagger: 0.2
    });
  });
});
</script>

<style scoped>
.ppt-container {
  width: 100%;
  height: 100vh;
  background: #020617;
  color: #f8fafc;
  font-family: 'JetBrains Mono', monospace;
  padding: 2rem;
  overflow: hidden;
  position: relative;
  text-align: center;
}

.ppt-title {
  font-size: 2.8rem;
  color: #38bdf8;
  text-shadow: 0 0 20px rgba(56,189,248,0.5);
  margin-bottom: 0.5rem;
}

.ppt-subtitle {
  font-size: 1rem;
  color: #cbd5e1;
  margin-bottom: 2rem;
}

/* Meme grid */
.meme-grid {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
  max-height: 65vh;
  overflow-y: auto;
}

.meme-card {
  background: rgba(15,23,42,0.7);
  border-radius: 12px;
  padding: 0.5rem;
  width: 200px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}
.meme-card:hover {
  transform: scale(1.08);
  box-shadow: 0 0 25px #38bdf8;
  border: 1px solid #38bdf8;
}
.meme-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
}
.meme-caption {
  font-size: 0.8rem;
  color: #38bdf8;
  margin-top: 0.25rem;
}

/* Floating emoji background */
.floating-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.floating-emoji {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.6;
}

/* Transition */
.stagger-meme-enter-active { transition: all 0.4s ease; }
.stagger-meme-enter-from { opacity: 0; transform: translateY(60px) scale(0.9); }
</style>
