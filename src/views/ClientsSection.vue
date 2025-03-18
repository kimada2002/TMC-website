<template>
  <section class="clients-section">
    <div class="slider-container">
      <div class="slider">
        <div class="slide-track">
          <ClientLogo
            v-for="(logo, index) in duplicatedLogos"
            :key="index"
            :src="logo.src"
            :aspectRatio="logo.aspectRatio"
            :width="logo.width"
            class="slider-item"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ClientLogo from "@/components/ClientLogo.vue";

const logos = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ae27a551e0287e387506fa1f79c3967d3c71b467ba9ba7d37f618f0e02a7def",
    aspectRatio: "1.5",
    width: "60px",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/130dcb9ae0a8d766250388a130fbacbd82092f652bc913a954d53c899afbdddb",
    aspectRatio: "1.8",
    width: "72px",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/97c430e433df228858a2d8e192f3d2a892fc1e8739964287f25fc5c4eef53ad8",
    aspectRatio: "5.667",
    width: "170px",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/465293afc2f7e1428868b642556ffa63eb25bc3551c598a473aa263f5a78ec0a",
    aspectRatio: "4.733",
    width: "142px",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ba0c2e33c91238fa33ee5276ccc11a4b242de85ee93478173f775e99c54b463e",
    aspectRatio: "1.525",
    width: "61px",
  },
];

const duplicatedLogos = [...logos, ...logos];
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
  width: 50%;
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
  animation: slide-left 10s linear infinite;
}

@keyframes slide-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.slider-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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