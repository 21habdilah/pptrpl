<template>
  <div class="slide-container" ref="container">
    <section
      v-for="(s, i) in slides"
      :key="s.id"
      class="slide"
      :ref="el => slideRefs[i] = el"
    >
      <component :is="s.component" />
    </section>

    <MiniMap :total="slides.length" :active="active" :go="go" />
    <ProgressBar :active="active" :total="slides.length" />

    <!-- HUD + PANAH -->
    <div class="hud-nav">
      <button @click="prev">‹</button>
      <div class="hud">{{ active + 1 }} / {{ slides.length }}</div>
      <button @click="next">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { slides } from "../data/slides";
import MiniMap from "./MiniMap.vue";
import ProgressBar from "./ProgressBar.vue";

const container = ref(null);
const slideRefs = [];
const active = ref(0);

const go = i => {
  slideRefs[i]?.scrollIntoView({ behavior: "smooth" });
};

const next = () => go(Math.min(active.value + 1, slides.length - 1));
const prev = () => go(Math.max(active.value - 1, 0));

onMounted(() => {
  const el = container.value;

  el.addEventListener("scroll", () => {
    slideRefs.forEach((s, i) => {
      if (s.getBoundingClientRect().top < window.innerHeight * 0.55) {
        active.value = i;
      }
    });
  }, { passive: true });
});
</script>

<style scoped>
.slide-container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.slide {
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
