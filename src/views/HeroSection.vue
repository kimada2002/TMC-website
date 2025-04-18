<template>
  <header id="header" class="hero-section">
      <img
        src="@/assets/images/herosection.png"
        class="hero-background"
        alt="Background image"
      />
  </header>
</template>
  
<style scoped>
.hero-section {
  position: relative;
  max-width: 100%;
  height: 90vh; 
  min-height: 400px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
} 

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 1024px) {
  .hero-section {
    max-width: 100%;
    padding: var(--spacing-4);
    height: auto;
    min-height: 60vh;
  }

}

/* 🔽 Responsive: Mobile */
@media (max-width: 768px) {
  .hero-section {
    max-width: 100%;
    height: auto;
    min-height: 40vh;
  }
}

/* 🔽 Responsive: Mobile nhỏ */
@media (max-width: 480px) {
  .hero-section {
    max-width: 100%;
    height: auto;
    min-height: 20vh;
  }
}
</style>
