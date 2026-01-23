<template>
  <section ref="el" :class="['spot', active && 'on']">
    <slot />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const el = ref(null);
const active = ref(false);
let obs;

onMounted(() => {
  obs = new IntersectionObserver(
    ([e]) => (active.value = e.isIntersecting),
    { threshold: 0.6 }
  );
  obs.observe(el.value);
});

onUnmounted(() => obs?.disconnect());
</script>

<style scoped>
.spot {
  min-height: 100vh;
  padding: 120px 80px;
  opacity: 0;
  transform: scale(0.97);
  transition: all 0.6s ease;
}

.spot.on {
  opacity: 1;
  transform: scale(1);
}
</style>
