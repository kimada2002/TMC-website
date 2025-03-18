<template>
  <div class="container">
    <NavigationBar />
    <HeroSection />
    <ImageGallery />
    <about-us />
    <service-section />
    <workflow-section />
    <contact-form />
    <Footer />
  </div>
</template>

<script setup>
import NavigationBar from "./views/NavigationBar.vue";
import HeroSection from "./views/HeroSection.vue";
import ImageGallery from "./views/ImageGallery.vue";
import AboutUs from "./views/AboutUs.vue";
import ServiceSection from "./views/ServiceSection.vue";
import WorkflowSection from "./views/WorkflowSection.vue";
import ContactForm from "./views/ContactForm.vue";
import Footer from "./views/Footer.vue";
</script>
