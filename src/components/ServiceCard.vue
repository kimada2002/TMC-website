<template>
  <article class="service-card" :style="{ paddingBottom }">
    <div class="service-content">
      <img :src="imageUrl" class="service-image" :alt="title" />
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
  background-color: #fbfffe;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-grow: 1;
  padding: 24px;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  min-height: 350px;
  justify-content: center;
}

.service-content {
  width: 100%;
  max-width: 344px;
  min-width: 240px;
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
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.service-title {
  color: #000;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.service-description {
  color: #101935;
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
}

@media (max-width: 991px) {
  .service-card {
    margin-top: 40px;
    padding: 24px 20px;
  }
}
</style>