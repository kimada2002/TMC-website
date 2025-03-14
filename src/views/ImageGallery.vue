<template>
  <div class="gallery-container">
    <!-- Swiper Slider -->
    <div :class="{ 'blur-background': selectedImage }">
      <swiper
        v-if="images.length > 0"
        :modules="[Autoplay, Pagination, Navigation]"
        :slides-per-view="3"
        :space-between="10"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        pagination
        navigation
        class="slider"
      >
        <swiper-slide v-for="(img, index) in images" :key="index">
          <img :src="img" class="slide-image" @click="openImage(img)" />
        </swiper-slide>
      </swiper>
    </div>

    <div v-if="images.length === 0">Chưa có ảnh nào.</div>

    <!-- Modal hiển thị ảnh phóng to -->
    <div v-if="selectedImage" class="modal" @click="closeImage">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="closeImage">&times;</span>
        <img :src="selectedImage" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const images = ref([]);
const selectedImage = ref(null);

const fetchImages = async () => {
  const querySnapshot = await getDocs(collection(db, "images"));
  images.value = querySnapshot.docs.map((doc) => doc.data().url);
};

const openImage = (img) => {
  selectedImage.value = img;
};

const closeImage = () => {
  selectedImage.value = null;
};

onMounted(fetchImages);
</script>

<style scoped>
.gallery-container {
  width: 100%;
  height: 250px;
  text-align: center;
  background-image: url("../assets/images/image_bg.png");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blur-background {
  filter: blur(8px);
  pointer-events: none; 
}

.slider {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
}
.slide-image {
  width: 100%;
  height: 175px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s;
}
.slide-image:hover {
  transform: scale(1.05);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; 
}
.modal-content {
  position: relative;
  max-width: 90%;
}
.modal-image {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  color: white;
  cursor: pointer;
}


:deep(.swiper-button-prev) {
  left: 10px; 
}

:deep(.swiper-button-next) {
  right: 10px; 
}

/* Tùy chỉnh kiểu dáng */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white; /* Màu icon */
  background-color: rgba(0, 0, 0, 0.5); 
  border-radius: 10%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background-color: rgba(0, 0, 0, 0.8); 
  transform: scale(1.1);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 24px; 
}
</style>
