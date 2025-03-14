<template>
  <header id="header" class="hero-section">
    <img
      src="../assets//images/herosection.png"
      class="hero-background"
      alt="Background image"
    />
    <NavigationBar />
  </header>
</template>
  
  <script setup>
import NavigationBar from "./NavigationBar.vue";
</script>
  
  
  <style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 1366px;
  height: 736px;
  margin: auto;
  padding: 6px 70px;
  overflow: hidden;
  align-items: start;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 500;
}

.hero-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Giữ tỷ lệ ảnh và phủ toàn bộ vùng */
  object-position: center;
}

@media (max-width: 1366px) {
  .hero-section {
    width: 97%;
    padding: 6px 20px;
  }
}
</style>
  