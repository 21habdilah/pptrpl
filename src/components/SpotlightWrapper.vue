<template>
  <section ref="el" :class="['spot', active && 'on']">
    <slot />
    <div class="trail"></div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const el = ref(null);
const active = ref(false);

onMounted(() => {
  const obs = new IntersectionObserver(
    ([e]) => (active.value = e.isIntersecting),
    { threshold: 0.6 }
  );
  obs.observe(el.value);
});
</script>

<style>
.spot {
  position: relative;
  min-height: 100vh;
  padding: 120px 60px;
  opacity: 0;
  transform: translateY(80px) scale(.97);
  transition: transform 0.8s cubic-bezier(.19,1,.22,1),
              opacity 0.8s ease-out;
  border-radius: 12px;
  box-shadow: 0 0 0 rgba(56,189,248,0);
  overflow: hidden;
}

/* Neon glow + floating */
.spot.on {
  opacity: 1;
  transform: translateY(0) scale(1);
  box-shadow: 0 0 20px rgba(56,189,248,0.3),
              0 10px 30px rgba(56,189,248,0.2);
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%   { transform: translateY(0) scale(1); }
  50%  { transform: translateY(-8px) scale(1.01); }
  100% { transform: translateY(0) scale(1); }
}

/* Trail neon */
.trail {
  position: absolute;
  bottom: -20px;
  left: 50%;
  width: 80%;
  height: 6px;
  background: linear-gradient(90deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.6) 50%, rgba(56,189,248,0) 100%);
  transform: translateX(-50%) scaleX(0);
  border-radius: 3px;
  pointer-events: none;
  transition: transform 1s ease-out, opacity 1s ease-out;
  opacity: 0;
}

/* Trail muncul saat section aktif */
.spot.on .trail {
  transform: translateX(-50%) scaleX(1);
  opacity: 1;
}

/* Hover micro effect */
.spot:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 25px 50px rgba(56,189,248,0.25);
}
</style>
