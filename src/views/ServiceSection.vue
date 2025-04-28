<template>
  <section id="service" class="services-section">
    <img
      src="../assets/images/service_background.png"
      class="background-image"
      alt="Service background"
    />

    <h2 class="section-title">
      {{ lang === "vi" ? "Dịch vụ của chúng tôi" : "Our Services" }}
    </h2>

    <div class="service-row-wrapper">
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
import { ref, computed, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import ServiceRow from "@/components/ServiceRow.vue";

const lang = localStorage.getItem("lang") || "vi"; // lấy ngôn ngữ lưu local
const currentIndex = ref(0);
const serviceRows = ref([]);
const services = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "services"));
  services.value = querySnapshot.docs.map((doc) => doc.data());
  prepareServiceRows();
});

const prepareServiceRows = () => {
  const mappedServices = services.value.map((service) => ({
    title: service.title ? service.title[lang] : "",
    description: service.description ? service.description[lang] : "",
    imageUrl: service.imageUrl || "",
    paddingBottom: "90px",
  }));

  const chunkSize = 3;
  const rows = [];
  for (let i = 0; i < mappedServices.length; i += chunkSize) {
    rows.push({
      services: mappedServices.slice(i, i + chunkSize),
    });
  }
  serviceRows.value = rows;
};

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
/* CSS giữ nguyên không đổi */
.services-section {
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
}

.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  border: none;
  border-radius: 10%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.arrow-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.05);
}

.arrow-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.arrow-button.left {
  left: -60px;
}

.arrow-button.right {
  right: -60px;
}

@media (max-width: 768px) {
  .arrow-button.left {
    left: -10px;
  }

  .arrow-button.right {
    right: -10px;
  }

  .arrow-button {
    font-size: 28px;
    width: 40px;
    height: 40px;
  }

  .service-row-wrapper {
    transform: scale(0.75);
  }
}
</style>
