<template>
  <div class="container">
    <!-- Main Content -->
    <main class="main-content">
      <!-- Text Section -->
      <div class="text-section">
        <h1 class="title">Technology</h1>
        <h1 class="title">Management</h1>
        <h1 class="title">Consultancy</h1>
        <p class="tagline">
          From Concept to Execution - We Bring Your Brand to Life
        </p>
        <!-- <button @click="goToAbout" class="cta-button">Get Started</button> -->
      </div>

      <!-- Running Character -->
      <div class="character-container">
        <img
          src="@/assets/images/login-image.png"
          alt="Running Character"
          class="runner-image"
        />
      </div>
    </main>
    <div class="images-gallery">
      <image-gallery />
    </div>
  </div>
</template>

<script setup>
import ImageGallery from "./ImageGallery.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToAbout = () => {
  router.push("/about");
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: var(--font-primary);
  overflow-x: hidden;
}

.container {
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  background-image: url("@/assets/images/hero-background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Main Content */
.main-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5vh 5vw;
  gap: 2rem;
  flex-wrap: nowrap;
}

.text-section {
  max-width: 50%;
}

.title {
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0.5em 0;
  color: var(--primary);
}

.tagline {
  font-size: clamp(1rem, 2vw, 1.5rem);
  max-width: 30ch;
  margin: clamp(1rem, 4vw, 2rem) 0;
  color: var(--secondary);
}

.cta-button {
  background: var(--primary);
  color: var(--text);
  border: none;
  padding: clamp(0.5rem, 1.5vw, 1rem) clamp(1rem, 4vw, 2.5rem);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 50px;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Running Character */
.character-container {
  position: relative;
  width: 40%;
  height: 100%;
  min-height: clamp(400px, 60vh, 600px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.runner-image {
  width: 100%;
  max-width: 600px;
  height: auto;
}

/* Floating Animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.images-gallery {
  margin-top: -8vh;
}

/* Responsive */
@media (max-width: 768px) {
  .title {
    font-size: clamp(3rem, 5vw, 2.5rem);
    margin: 0.3em 0;
  }

  .tagline {
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin: 1.5rem 0;
  }

  .character-container {
    display: none;
  }

  .runner-image {
    max-width: 80%;
  }

  .main-content {
    flex-direction: column;
    text-align: center;
  }

  .text-section {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    align-items: center;
  }
}
</style>
