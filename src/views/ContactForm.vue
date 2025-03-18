<template>
  <section id="contact" class="contact-container">
    <div class="contact-form">
      <ContactInfo />
      <ContactFormFields />
    </div>
  </section>
</template>

<script setup>
import ContactInfo from "@/components/ContactInfo.vue";
import ContactFormFields from "@/components/ContactFormFields.vue";
</script>

<style scoped>
.contact-container {
  padding: 40px;
  background-color: #fff;
  max-width: 1366px;
  margin: 0 auto;
}

.contact-form {
  max-width: 1100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  padding: 40px;
  gap: 40px;
  margin: 0 auto;
  border-radius: 12px;
  background-color: #fff;
}

@media (max-width: 991px) {
  .contact-container {
    padding: 20px;
  }

  .contact-form {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .contact-container {
    padding: 15px;
  }

  .contact-form {
    padding: 15px;
    gap: 15px;
  }
}
</style>