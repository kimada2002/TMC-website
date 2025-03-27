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
  background-color: var(--white);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-grow: 1;
  padding: 24px;
  align-items: flex-start;
  gap: 10px;
  overflow: hidden;
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
  margin-top: var(--spacing-6);
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.service-title {
  color: var(--black);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  margin: 0;
}

.service-description {
  margin-top: var(--spacing-4);
  font-weight: var(--font-normal);
}

@media (max-width: 991px) {
  .service-card {
    margin-top: 40px;
    padding: 24px 20px;
  }
}
</style>