<template>
  <div class="slide-container">
    <!-- Slides -->
    <component
      v-for="(s, i) in slides"
      :key="s.id"
      :is="s.component"
      :ref="el => refs[i] = el?.$el"
      class="spot"
    />

    <!-- MiniMap -->
    <MiniMap :total="slides.length" :active="active" :go="go" />

    <!-- HUD Slide Counter -->
    <div class="hud" :class="{ flash: flash }">
      Slide {{ active + 1 }} / {{ slides.length }}
    </div>

    <!-- Optional background overlay -->
    <div class="bg-tech"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { slides } from "../data/slides";
import MiniMap from "./MiniMap.vue";

const refs = ref([]);
const active = ref(0);
const flash = ref(false);
const sound = new Audio("/slide.mp3");

const go = (i) => {
  if (i === active.value) return;
  sound.currentTime = 0;
  sound.play();
  refs.value[i]?.scrollIntoView({ behavior: "smooth" });

  // HUD flash
  flash.value = true;
  setTimeout(() => (flash.value = false), 200);
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    refs.value.forEach((el, i) => {
      if (el?.getBoundingClientRect().top < window.innerHeight / 2) {
        active.value = i;
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(Math.min(active.value + 1, slides.length - 1));
    if (e.key === "ArrowLeft") go(Math.max(active.value - 1, 0));
  });
});
</script>

<style>
/* Slide container tech overlay */
.slide-container {
  position: relative;
  overflow: hidden;
}

/* Background tech / floating grid */
.bg-tech {
  position: fixed;
  inset: 0;
  background-image: repeating-linear-gradient(0deg, rgba(56,189,248,0.05) 0 1px, transparent 1px 20px),
                    repeating-linear-gradient(90deg, rgba(56,189,248,0.05) 0 1px, transparent 1px 20px);
  z-index: 0;
  pointer-events: none;
}

/* Spot slides */
.spot {
  position: relative;
  min-height: 100vh;
  padding: 120px 60px;
  opacity: 0;
  transform: translateY(80px) scale(.97);
  transition: transform 0.8s cubic-bezier(.19,1,.22,1), opacity 0.8s ease-out;
  border-radius: 12px;
  box-shadow: 0 0 0 rgba(56,189,248,0);
  z-index: 1;
}

/* Slide appears */
.spot.on {
  opacity: 1;
  transform: translateY(0) scale(1);
  box-shadow: 0 0 20px rgba(56,189,248,0.3), 0 10px 30px rgba(56,189,248,0.2);
  animation: float 4s ease-in-out infinite;
}

/* Floating animation */
@keyframes float {
  0%   { transform: translateY(0) scale(1); }
  50%  { transform: translateY(-8px) scale(1.01); }
  100% { transform: translateY(0) scale(1); }
}

/* HUD slide counter */
.hud {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  padding: 6px 12px;
  color: #38bdf8;
  background: rgba(0,0,0,0.3);
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(56,189,248,0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  opacity: 0.85;
  transition: all 0.3s ease;
}

.hud:hover { transform: translateX(-50%) translateY(-4px); opacity: 1; }

/* HUD flash on slide change */
.hud.flash { 
  animation: hudFlash 0.2s ease-in-out; 
}
@keyframes hudFlash {
  0% { transform: translateX(-50%) scale(1); opacity: 1; }
  50% { transform: translateX(-50%) scale(1.1); opacity: 1; }
  100% { transform: translateX(-50%) scale(1); opacity: 1; }
}
</style>
