<template>
  <article
    class="service-card"
    :style="{ minHeight: '350px', paddingBottom: paddingBottom }"
  >
    <div class="service-content">
      <img :src="imageUrl" class="service-image" alt="" />
      <div class="service-details">
        <h3 class="service-title">{{ title }}</h3>
        <p class="service-description">{{ description }}</p>
      </div>
    </div>
  </article>
</template>
  
  <script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paddingBottom: {
    type: String,
    default: "90px",
  },
});
</script>
  
  
  <style scoped>
.service-card {
  border-radius: 12px;
  background-color: rgba(251, 255, 254, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  flex-grow: 1;
  padding: 24px 24px;
  align-items: start;
  gap: 10px;
  overflow: hidden;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  /* width: 300px; */
  justify-content: center;
}

@media (max-width: 991px) {
  .service-card {
    margin-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

.service-content {
  min-width: 240px;
  width: 344px;
}

.service-image {
  aspect-ratio: 1.19;
  object-fit: contain;
  object-position: center;
  width: 100%;
  border-radius: 12px;
}

.service-details {
  display: flex;
  margin-top: 24px;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}

.service-title {
  color: rgba(0, 0, 0, 1);
  font-size: 24px;
  font-weight: 600;
  align-self: center;
  margin: 0;
}

.service-description {
  color: rgba(16, 25, 53, 1);
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
}
</style>
  