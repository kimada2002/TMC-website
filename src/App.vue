<template>
  <div class="container">
    <template v-if="!isAuthPage">
      <NavigationBar />
      <HeroSection />
      <ImageGallery />
      <AboutUs />
      <ServiceSection />
      <WorkflowSection />
      <ContactForm />
      <Footer />
    </template>
    <router-view />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavigationBar from "./views/NavigationBar.vue";
import HeroSection from "./views/HeroSection.vue";
import ImageGallery from "./views/ImageGallery.vue";
import AboutUs from "./views/AboutUs.vue";
import ServiceSection from "./views/ServiceSection.vue";
import WorkflowSection from "./views/WorkflowSection.vue";
import ContactForm from "./views/ContactForm.vue";
import Footer from "./views/Footer.vue";

const route = useRoute();
const isAuthPage = computed(
  () => route.path === "/login" || route.path.startsWith("/admin")
);

const $route = useRoute();
</script>
