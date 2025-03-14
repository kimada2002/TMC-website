<template>
  <section class="service-row" :style="{ backgroundColor }">
    <div class="service-grid">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="service-column"
      >
        <ServiceCard
          :imageUrl="service.imageUrl"
          :title="service.title"
          :description="service.description"
          :paddingBottom="service.paddingBottom || '90px'"
        />
      </div>
    </div>
  </section>
</template>
  
  <script setup>
import ServiceCard from "./ServiceCard.vue";

defineProps({
  backgroundColor: {
    type: String,
    required: true,
  },
  services: {
    type: Array,
    required: true,
  },
});
</script>
  
  <style scoped>
.service-row {
  position: relative;
  padding: 89px 80px 193px;
}

@media (max-width: 991px) {
  .service-row {
    max-width: 100%;
    padding: 89px 20px 100px;
  }
}

.service-grid {
  gap: 20px;
  display: flex;
}

@media (max-width: 991px) {
  .service-grid {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
}

.service-column {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 33%;
  margin-left: 0px;
}

@media (max-width: 991px) {
  .service-column {
    width: 100%;
    margin-left: 0 !important;
  }
}
</style>
  