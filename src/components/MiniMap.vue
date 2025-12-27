<template>
  <div class="map">
    <div
      v-for="i in total"
      :key="i"
      :class="['dot', i-1 === active && 'on']"
      @click="go(i-1)"
    />
  </div>
</template>

<script setup>
defineProps({ total: Number, active: Number, go: Function });
</script>

<style>
.map {
  position: fixed;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 50;
  pointer-events: none;
}

/* Dot biasa */
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(85, 85, 85, 0.35);
  transition: all 0.3s ease;
  pointer-events: auto;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
}

/* Dot aktif: glowing + orbit + pulse */
.dot.on {
  background: #38bdf8;
  transform: scale(1.6) translateX(0);
  animation: pulse 1.5s infinite, orbit 2s infinite alternate ease-in-out;
  box-shadow: 0 0 12px rgba(56,189,248,0.6);
}

/* Hover effect */
.dot:hover {
  transform: scale(1.4);
  cursor: pointer;
  background: #60a5fa;
}

/* Pulse glow */
@keyframes pulse {
  0% { transform: scale(1.6); opacity: 0.9; }
  50% { transform: scale(2); opacity: 0.6; }
  100% { transform: scale(1.6); opacity: 0.9; }
}

/* Orbit halus ke kiri-kanan */
@keyframes orbit {
  0% { transform: scale(1.6) translateX(0); }
  50% { transform: scale(1.6) translateX(3px); }
  100% { transform: scale(1.6) translateX(0); }
}
</style>
