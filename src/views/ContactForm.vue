<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
  <section id="contact" class="contact-container">
    <div class="contact-form">
      <ContactInfo />
      <ContactFormFields />
    </div>
  </section>
</template>
  
<script setup>
import ContactInfo from "../components/ContactInfo.vue";
import ContactFormFields from "../components/ContactFormFields.vue";
</script>
  
<style scoped>
.contact-container {
  padding: 40px;
  background-color: #fff;
  max-width: 1366px;
}

.contact-form {
  max-width: 1100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  padding: 40px;
  gap: 40px;
  margin: 0 auto;
  border-radius: 12px;
}

@media (max-width: 991px) {
  .contact-container {
    flex-direction: column;
    padding: 20px;
  }
}

@media (max-width: 640px) {
  .contact-container {
    padding: 15px;
  }
}
</style>
  