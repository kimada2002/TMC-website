<template>
  <div class="track-and-stop">
    <div class="track">
      <div class="track-line" :class="{ dark: darkMode }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  darkMode: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.track-and-stop {
  position: absolute;
  display: flex;
  width: 8em;
  max-width: 100%;
  padding-left: 2px;
  align-items: flex-start;
  margin: 60px auto;
}

.track {
  z-index: 0;
  display: flex;
  padding: 4px 0;
  flex: 1;
  align-items: center;
}

.track-line {
  border-radius: 8px;
  background-color: #101935;
  height: 4px;
  width: 100%;
}

.track-line.dark {
  background-color: #000;
}

@media (max-width: 991px) {
  .track-and-stop {
    margin-top: 0.5em;
  }
  .track-line {
    margin-top: 40px;
    width: 100%;
  }
}
</style>