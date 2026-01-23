<template>
  <div v-if="show" class="loader-wrapper">
    <div class="micro-loader">
      <!-- Ornamen Dekoratif di Belakang -->
      <div class="orbit-ring"></div>
      
      <!-- Kurung Siku Kiri -->
      <div class="bracket left-bracket">&lt;</div>
      
      <!-- Teks Utama: NN (Neural Network) -->
      <div class="logo-core">
        <span class="text-glow">NN</span>
        <div class="scanline"></div>
      </div>

      <!-- Kurung Siku Kanan -->
      <div class="bracket right-bracket">/&gt;</div>
    </div>
    
    <div class="loading-bar-container">
      <div class="loading-bar-fill"></div>
    </div>
    <p class="status-text">INITIALIZING_SYNAPTIC_WEIGHTS...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const show = ref(true);

onMounted(() => {
  // Loader simulasi 3 detik
  setTimeout(() => {
    show.value = false;
  }, 3000); 
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com');

.loader-wrapper {
  position: fixed;
  inset: 0;
  background: #020617; /* Lebih gelap (Slate 950) */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.micro-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Ring dekorasi di belakang logo */
.orbit-ring {
  position: absolute;
  width: 180px;
  height: 180px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 50%;
  border-top-color: #38bdf8;
  animation: spin 2s linear infinite;
}

.logo-core {
  position: relative;
  font-family: 'Syncopate', sans-serif;
  font-size: 72px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 12px;
  overflow: hidden;
}

.text-glow {
  text-shadow: 0 0 20px rgba(56, 189, 248, 0.8),
               0 0 40px rgba(168, 85, 247, 0.4);
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(56, 189, 248, 0.5);
  box-shadow: 0 0 15px #38bdf8;
  animation: scan 1.5s ease-in-out infinite;
}

.bracket {
  font-family: 'JetBrains Mono', monospace;
  font-size: 60px;
  position: absolute;
  color: #a855f7;
  opacity: 0.6;
}

.left-bracket {
  left: -100px;
  animation: slideInLeft 1.5s infinite alternate cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.right-bracket {
  right: -100px;
  animation: slideInRight 1.5s infinite alternate cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Loading Bar */
.loading-bar-container {
  width: 240px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 50px;
  position: relative;
  overflow: hidden;
}

.loading-bar-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #a855f7, #38bdf8);
  position: absolute;
  left: -100%;
  animation: progress 3s forwards;
}

.status-text {
  margin-top: 15px;
  color: #38bdf8;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  animation: blink 0.8s infinite;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes scan {
  0% { top: -10%; }
  100% { top: 110%; }
}

@keyframes slideInLeft {
  from { transform: translateX(0); opacity: 0.2; }
  to { transform: translateX(30px); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(0); opacity: 0.2; }
  to { transform: translateX(-30px); opacity: 1; }
}

@keyframes progress {
  0% { left: -100%; }
  100% { left: 0%; }
}

@keyframes blink {
  50% { opacity: 0.3; }
}
</style>
