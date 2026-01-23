<template>
  <div class="map">
    <span
      v-for="i in total"
      :key="i"
      class="dot"
      :class="{ on: i - 1 === active }"
      @click="go(i - 1)"
    />
  </div>
</template>

<script setup>
defineProps(["total", "active", "go"]);
</script>

<style scoped>
.map {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 200;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #475569;
  cursor: pointer;
  transition: transform 0.2s;
}

.dot.on {
  background: #38bdf8;
  transform: scale(1.6);
}
</style>
