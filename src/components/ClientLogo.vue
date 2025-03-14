<template>
  <div class="logo-container" :style="containerStyle">
    <img :src="src" class="logo-background" alt="" />
    <img :src="src" class="logo-image" :style="imageStyle" alt="Client logo" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  aspectRatio: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
});

const containerStyle = computed(() => ({
  aspectRatio: props.aspectRatio,
  width: props.width,
}));

const imageStyle = computed(() => ({
  aspectRatio: props.aspectRatio,
}));
</script>

<style scoped>
.logo-container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.logo-background {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.logo-image {
  object-fit: contain;
  object-position: center;
  width: 100%;
}
</style>
