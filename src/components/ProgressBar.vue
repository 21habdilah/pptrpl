<template>
  <div class="bar"><div :style="{ width: p + '%' }"></div></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const p = ref(0);
onMounted(() => {
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    p.value = (scrollY / h) * 100;
  });
});
</script>

<style>
.bar {
  position: fixed;
  top: 0;
  height: 4px;
  width: 100%;
  background: rgba(255,255,255,.1);
}
.bar div {
  height: 100%;
  background: linear-gradient(90deg,#38bdf8,#a855f7);
}
</style>
