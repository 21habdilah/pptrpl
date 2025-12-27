<template>
  <div v-if="show" class="loader-wrapper">
    <div class="micro-loader">
      <!-- Kurung Siku Kiri -->
      <div class="bracket left-bracket">&lt;</div>
      
      <!-- Logo Utama -->
      <div class="logo-rpl">RPL</div>

      <!-- Kurung Siku Kanan -->
      <div class="bracket right-bracket">/&gt;</div>
    </div>
    
    <p class="status-text">Compiling experience...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const show = ref(true);

onMounted(() => {
  // Loader akan hilang otomatis setelah beberapa detik (simulasi loading selesai)
  setTimeout(() => {
    show.value = false;
  }, 3000); 
});
</script>

<style scoped>
.loader-wrapper {
  position: fixed;
  inset: 0;
  background: #0f172a; /* Warna latar gelap */
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

.logo-rpl {
  font-size: 64px;
  font-weight: 900;
  color: #38bdf8; /* Warna utama logo */
  letter-spacing: 4px;
}

.bracket {
  font-size: 80px;
  position: absolute;
  color: #a855f7; /* Warna ungu */
}

.left-bracket {
  left: -80px; /* Jarak awal dari logo */
  animation: bounceLeft 1.8s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
}

.right-bracket {
  right: -80px; /* Jarak awal dari logo */
  animation: bounceRight 1.8s infinite cubic-bezier(0.4, 0.0, 0.2, 1);
}

.status-text {
  margin-top: 30px;
  color: rgba(255, 255, 255, 0.5);
  font-family: monospace;
}

/* Keyframes untuk animasi */
@keyframes bounceLeft {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20px); } /* Bergerak mendekat ke logo */
}

@keyframes bounceRight {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-20px); } /* Bergerak mendekat ke logo */
}
</style>
