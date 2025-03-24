<template>
  <div class="client-logo">
    <img :src="src" alt="Client Logo" />
  </div>
</template>

<script setup>
defineProps({
  src: String
});
</script>

<style scoped>
.client-logo img {
  height: 50px; 
  width: auto; 
}
</style>
