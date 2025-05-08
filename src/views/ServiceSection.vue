<template>
  <section id="service" class="services-section">
    <img
      src="../assets/images/service_background.png"
      class="background-image"
      alt="Service background"
    />

    <h2 class="section-title">{{ $t("our_service") }}</h2>

    <div
      class="service-row-wrapper"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <button
        v-if="serviceRows.length > 1"
        class="arrow-button left"
        @click="prevRow"
        :disabled="currentIndex === 0"
      >
        ‹
      </button>

      <ServiceRow
        v-for="(row, index) in serviceRows"
        :key="index"
        :services="row.services"
        v-show="currentIndex === index"
      />

      <button
        v-if="serviceRows.length > 1"
        class="arrow-button right"
        @click="nextRow"
        :disabled="currentIndex >= serviceRows.length - 1"
      >
        ›
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import ServiceRow from "@/components/ServiceRow.vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const currentIndex = ref(0);
const serviceRows = ref([]);
const services = ref([]);

const prepareServiceRows = () => {
  const lang = locale.value;

  const mappedServices = services.value.map((service) => ({
    title: service.title?.[lang] || "",
    description: service.description?.[lang] || "",
    imageUrl: service.imageUrl || "",
    paddingBottom: "90px",
  }));

  const isMobile = window.innerWidth <= 768;
  const chunkSize = isMobile ? 1 : 3;

  const rows = [];
  for (let i = 0; i < mappedServices.length; i += chunkSize) {
    rows.push({
      services: mappedServices.slice(i, i + chunkSize),
    });
  }

  serviceRows.value = rows;
  currentIndex.value = 0;
};

// Responsive
let resizeTimeout;
const debounce = (func, delay = 300) => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(func, delay);
};

const onResize = () => {
  debounce(() => {
    prepareServiceRows();
  });
};

// Swipe support
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipeGesture();
};

const handleSwipeGesture = () => {
  const diff = touchStartX.value - touchEndX.value;
  if (Math.abs(diff) < 50) return; // Vuốt quá nhẹ thì bỏ qua

  if (diff > 0 && currentIndex.value < serviceRows.value.length - 1) {
    nextRow();
  } else if (diff < 0 && currentIndex.value > 0) {
    prevRow();
  }
};

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "services"));
  services.value = querySnapshot.docs.map((doc) => doc.data());
  prepareServiceRows();

  window.addEventListener("resize", onResize);
});

watch(locale, () => {
  prepareServiceRows();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const nextRow = () => {
  if (currentIndex.value < serviceRows.value.length - 1) {
    currentIndex.value++;
  }
};

const prevRow = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
</script>

<style scoped>
.services-section {
  height: 40rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  align-items: center;
  text-align: center;
}

.background-image {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.5;
  object-position: center;
  z-index: -1;
}

.section-title {
  position: relative;
  color: var(--black);
  font-size: 36px;
  text-align: center;
  margin-top: 20px;
}

.service-row-wrapper {
  width: 100%;
  max-width: 1200px;
  min-height: 510px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 40px;
  transform: scale(0.9);
  transform-origin: center;
  touch-action: pan-y;
}

.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.5rem;
  border: none;
  border-radius: 10%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  opacity: 0.2;
  transition: all 0.3s ease;
}

.arrow-button:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.05);
}

.arrow-button:disabled {
  display: none;
}

.arrow-button.left {
  left: -2rem;
}

.arrow-button.right {
  right: -2rem;
}

@media (max-width: 768px) {
  .arrow-button.left {
    left: -2.5rem;
  }

  .arrow-button.right {
    right: -2.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .service-row-wrapper{
    transform: scale(0.8);
  }
}
</style>
