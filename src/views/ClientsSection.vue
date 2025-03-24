<template>
  <section class="clients-section">
    <div class="slider-container">
      <div class="slider">
        <div class="slide-track">
          <ClientLogo
            v-for="(logo, index) in ShowLogos"
            :key="index"
            :src="logo.src"
            class="slider-item"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ClientLogo from "@/components/ClientLogo.vue";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const logos = ref([]);
const ShowLogos = ref([]);

const fetchLogos = async () => {
  const storage = getStorage();
  const listRef = storageRef(storage, "logo-clients/");

  try {
    const res = await listAll(listRef);
    const fetchedLogos = await Promise.all(
      res.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { src: url };
      })
    );

    logos.value = fetchedLogos;
    ShowLogos.value = [...fetchedLogos]; // Nhân đôi danh sách
  } catch (error) {
    console.error("Lỗi khi lấy ảnh từ Firebase:", error);
  }
};

onMounted(fetchLogos);
</script>

<style scoped>
.clients-section {
  background-color: #dbcbd8;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 54px;
  padding: 38px 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.slider-container {
  width: 70%;
  overflow: hidden;
  position: relative;
}

.slider {
  display: flex;
  width: max-content;
}

.slide-track {
  display: flex;
  gap: 20px;
  align-items: center;
  animation: slide-left 20s linear infinite;
}

@keyframes slide-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.slider-item img {
  height: 70px;
  width: auto;
  object-fit: contain;
}

@media (max-width: 991px) {
  .clients-section {
    padding: 20px;
  }
  .slider-container {
    width: 80%;
  }
}

@media (max-width: 640px) {
  .clients-section {
    padding: 15px;
  }
  .slider-container {
    width: 100%;
  }
  .slide-track {
    gap: 10px;
  }
}
</style>