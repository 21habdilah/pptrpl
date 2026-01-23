<template>
  <button class="fs" @click="toggle">⛶</button>
</template>

<script setup>
const toggle = () => 
  !document.fullscreenElement
    ? document.documentElement.requestFullscreen()
    : document.exitFullscreen()
</script>

<style scoped>
.fs {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 100;
  border-radius: 50%;
  padding: 10px;
  background: rgba(0,0,0,0.3);
  color: #38bdf8;
  cursor: pointer;
}
</style>
