<template>
  <header id="header" class="hero-section">
    <img
      src="@/assets/images/Header6.png"
      class="hero-background"
      alt="Background image"
    />

    <div class="gallery-wrapper">
      <swiper
        v-if="images.length > 0"
        :modules="[Autoplay, Pagination, Navigation]"
        :slides-per-view="3"
        :space-between="10"
        :loop="true"
        :autoplay="{ delay: 1000, disableOnInteraction: false }"
        :pagination="{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }"
        navigation
        :breakpoints="{
          1024: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 1, spaceBetween: 5 },
        }"
        class="slider"
      >
        <swiper-slide v-for="(img, index) in images" :key="index">
          <img :src="img" class="slide-image" @click="openFullscreen(img)" />
        </swiper-slide>
      </swiper>
    </div>

    <div v-if="selectedImage" class="fullscreen-modal" @click="closeFullscreen">
      <img :src="selectedImage" class="fullscreen-image" />
      <span class="close-btn" @click="closeFullscreen">&times;</span>
    </div>
  </header>
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

const openFullscreen = (img) => {
  selectedImage.value = img;
  document.body.style.overflow = "hidden";
};

const closeFullscreen = () => {
  selectedImage.value = null;
  document.body.style.overflow = "";
};

onMounted(fetchImages);
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 90vh;
  min-height: 400px;
  max-width: 1366px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-wrapper {
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1000px;
  z-index: 2;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.slider {
  width: 100%;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 175px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.slide-image:hover {
  transform: scale(1);
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1001;
}

::v-deep(.swiper-button-next),
::v-deep(.swiper-button-prev) {
  background-color: rgba(0, 0, 0, 0.5); 
  color: white;
  border-radius: 10%;
  padding: 10px;
  width: 48px;
  height: 48px;
}

::v-deep(.swiper-button-next::after),
::v-deep(.swiper-button-prev::after) {
  color: white; /* Màu mũi tên */
  font-size: 20px;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .hero-section {
    height: 70vh;
  }

  .gallery-wrapper {
    bottom: 5%;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 60vh;
  }

  .slide-image {
    height: 150px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 50vh;
  }

  .slide-image {
    height: 120px;
  }

  .close-btn {
    top: 15px;
    right: 20px;
    font-size: 30px;
  }
}
</style>