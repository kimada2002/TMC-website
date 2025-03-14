<template>
  <article class="resources-section">
    <div class="content-wrapper">
      <h2 class="section-title">{{ $t('resources') }}</h2>
      <p class="section-description">
        {{ $t('resources_des') }}
      </p>
    </div>
    <div class="image-wrapper">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/82fcca1dc01ffd31856f6db3f60394ea9cbbedf1d880e7ffed07a7f039fd0ac8?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
        class="resources-image"
        alt="Our resources"
      />
    </div>
  </article>
</template>
  
  <style scoped>
.resources-section {
  display: flex;
  align-items: stretch; 
  justify-content: center;
  gap: 0;
  width: 100%;
  max-width: 1200px;
  margin-top: 76px;
  border-radius: 10px;
  overflow: hidden; 
}

.content-wrapper {
  flex: 1;
  background-color: #4a5568;
  padding: 40px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%; 
  max-height: 250px; 
}

.section-title {
    margin-top: -50px;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.section-description {
  font-size: 16px;
  line-height: 1.6;
  color: white;
}

.image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

.resources-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 991px) {
  .resources-section {
    flex-direction: column;
  }

  .content-wrapper {
    max-width: 100%;
    text-align: center;
  }
}
</style>
  