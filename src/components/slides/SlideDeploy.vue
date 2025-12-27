<template>
  <SpotlightWrapper class="deployment-slide">
    <h2>Deployment</h2>

    <!-- Tombol Live Demo -->
    <p>
      <a 
        href="https://rpl-godmode.vercel.app" 
        target="_blank" 
        class="btn-live"
      >
        🚀 Visit Live Demo
      </a>
    </p>

    <!-- Preview Mini Website -->
    <iframe 
      src="https://rpl-godmode.vercel.app" 
      class="site-preview"
      loading="lazy"
    ></iframe>

    <!-- Deployment Badge -->
    <p class="badge-wrapper">
      <img 
        src="https://img.shields.io/vercel/deploy/status/username/rpl-godmode?style=for-the-badge" 
        alt="Vercel Deployment Status" 
      />
    </p>
  </SpotlightWrapper>
</template>

<script setup>
import SpotlightWrapper from "../SpotlightWrapper.vue";
</script>

<style scoped>
.deployment-slide {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  text-align: center;
}

.btn-live {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(90deg, #6a5af9, #f95a9c);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-live:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
}

.site-preview {
  width: 100%;
  max-width: 600px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  transition: transform 0.3s;
}

.site-preview:hover {
  transform: scale(1.02);
}

.badge-wrapper img {
  margin-top: 0.5rem;
}
</style>
