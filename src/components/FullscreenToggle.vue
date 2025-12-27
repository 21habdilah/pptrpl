<template>
  <button class="fs" @click="t">⛶</button>
</template>

<script setup>
const t = () =>
  !document.fullscreenElement
    ? document.documentElement.requestFullscreen()
    : document.exitFullscreen();
</script>

<style>
.fs {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 999;
  border-radius: 50%;
  padding: 10px;
}
</style>
