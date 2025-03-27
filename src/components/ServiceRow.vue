<template>
  <section class="service-row" ref="rowRef" :style="{ backgroundColor }">
    <div class="service-grid">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="service-column fade-in"
        :class="`delay-${index}`"
        :ref="el => serviceRefs[index] = el"
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
import { ref, onMounted } from "vue";
import ServiceCard from "./ServiceCard.vue";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";

const props = defineProps({
  backgroundColor: {
    type: String,
    required: true,
  },
  services: {
    type: Array,
    required: true,
  },
});

const rowRef = ref(null);
const serviceRefs = ref([]);

onMounted(() => {
  const observer = useIntersectionObserver(
    (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    },
    {
      threshold: 0.2,
      rootMargin: '50px'
    }
  );

  // Observe each service column
  serviceRefs.value.forEach(el => {
    if (el) observer.observe(el);
  });
});
</script>
  
<style scoped>
.service-row {
  position: relative;
  padding: 89px 80px 193px;
  will-change: transform;
  backface-visibility: hidden;
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

/* Animation Styles */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

Staggered delays for columns
.delay-0 { transition-delay: 0s; }
.delay-1 { transition-delay: 0.2s; }
.delay-2 { transition-delay: 0.4s; }

.fade-in .service-grid {
  animation: slideIn 0.6s ease-out 0.6s both;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Ensure smooth animation performance */
.section {
  will-change: transform;
  backface-visibility: hidden;
}

</style>
