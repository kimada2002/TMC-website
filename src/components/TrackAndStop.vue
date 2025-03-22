<template>
  <div class="track-and-stop">
    <div class="track">
      <div class="track-line" :class="{ dark: darkMode }"></div>
    </div>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc812bb5f8ce9fb465301c9d0c5c5b7f64474cbcdd9cca61436bb07f4fa31e4?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
      class="stop-dot"
      alt="Stop dot"
    />
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
  position: relative;
  display: flex;
  width: 8em;
  max-width: 100%;
  padding-left: 2px;
  align-items: flex-start;
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

.stop-dot {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  aspect-ratio: 1;
  object-fit: contain;
}

@media (max-width: 991px) {
  .track-and-stop {
    margin-top: 0.5em;
  }
}
</style>