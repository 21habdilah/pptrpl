<template>
  <div class="bar">
    <div class="fill" :style="{ width: percent + '%' }"></div>
  </div>
</template>

<script setup>
const props = defineProps(["active", "total"]);
const percent = ((props.active + 1) / props.total) * 100;
</script>

<style scoped>
.bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: #020617;
}

.fill {
  height: 100%;
  background: #38bdf8;
}
</style>
