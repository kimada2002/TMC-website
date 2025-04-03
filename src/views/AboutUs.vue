<template>
  <section id="about" class="about-us-page">
    <!-- About Us Heading -->
    <div class="header-container">
      <h2 class="title">{{ $t("aboutus") }}</h2>
      <TrackAndStop darkMode />
    </div>
    
    <!-- About Us Content -->
    <div class="content-container">
      <AboutUsView />
    </div>

    <!-- Client Section -->
    <div>
      <!-- Client Heading -->
      <div class="header-container">
        <h2 class="title">{{ $t("clients") }}<br /></h2>
        <TrackAndStop darkMode />
      </div>

      <!-- Client Content -->
      <ClientsSection />

    </div>
  </section>
</template>
  
<script setup>
import TrackAndStop from "@/components/TrackAndStop.vue";
import AboutUsView from "@/components/AboutUsView.vue";
import ClientsSection from "./ClientsSection.vue";
</script>

  
<style scoped>
.about-us-page {
  display: flex;
  margin: 50px auto;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
}

.title {
  color: var(--black);
  font-size: var(--text-5xl);
  text-align: center;
}

.content-container {
  display: flex;
  margin: 50px auto;
  width: 100%;
  max-width: 1100px;
  flex-direction: column;
  justify-content: center;
  gap: var(--spacing-12);
}

.header-container {
  display: flex; 
  flex-direction: column; 
  align-items: center; 
}

@media (max-width: 991px) {
  .page-title {
    font-size: var(--text-5xl);
    margin-top: var(--spacing-10);
  }

  .content-container {
    max-width: 100%;
    margin-top: var(--spacing-10);
  }
}
</style>
  