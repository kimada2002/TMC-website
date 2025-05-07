<template>
  <section id="about" class="about-us-page">
    <!-- About Us Heading -->
    <div class="header-container" style="background-color: #fff; width: 100%;">
      <h2 class="section-title" style="margin: 20px 0;">
        {{ lang === "vi" ? "Về Chúng Tôi" : "About Us" }}
      </h2>
    </div>

    <!-- About Us Content -->
    <div class="content-container">
      <AboutUsView />
    </div>

    <!-- Client Section -->
    <div class="clients-container">
      <!-- Client Heading -->
      <div class="header-container">
        <h2 class="section-title">
          {{ lang === "vi" ? "Khách Hàng" : "Our Clients" }}
        </h2>
      </div>

      <ClientsSection />
    </div>
  </section>
</template>
  
<script setup>
import AboutUsView from "@/views/AboutUsView.vue";
import ClientsSection from "@/views/ClientsSection.vue";
import { ref } from "vue";

const lang = localStorage.getItem("lang") || "vi"; // Giá trị mặc định là tiếng Việt
</script>

  
<style scoped>
.about-us-page {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  background: #f5f5f5;
}

.section-title {
  position: relative;
  color: var(--black);
  font-size: 36px;
  text-align: center;
  margin-top: 20px;
}

.content-container {
  display: flex;
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

.clients-container {
  width: 100%;
}
</style>
  