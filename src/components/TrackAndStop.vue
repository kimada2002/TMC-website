<template>
  <div class="track-and-stop">
    <div class="track">
      <div class="track-line" :class="{ dark: darkMode }"></div>
    </div>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cc812bb5f8ce9fb465301c9d0c5c5b7f64474cbcdd9cca61436bb07f4fa31e4?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
      class="stop-dot"
      alt=""
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
  /* margin-top: 43px; */
  width: 158px;
  max-width: 100%;
  padding-left: 2px;
  align-items: flex-start;
  justify-content: start;
}

.track {
  z-index: 0;
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  padding: 4px 0;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.track-line {
  border-radius: 8px;
  background-color: rgba(16, 25, 53, 1);
  display: flex;
  flex-shrink: 0;
  height: 4px;
}

.track-line.dark {
  background-color: rgba(0, 0, 0, 1);
}

.stop-dot {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 4px;
  align-self: start;
  position: absolute;
  z-index: 0;
  flex-shrink: 0;
  right: 0;
  top: 50%;
  transform: translate(0%, -50%);
  height: 4px;
}

@media (max-width: 991px) {
  .track-and-stop {
    margin-top: 40px;
  }
}
</style>
