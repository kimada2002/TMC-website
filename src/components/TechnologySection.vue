<template>
  <article class="technology-section">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/82507ae6d59eca04872b027a0bd0ce31f812aac36e9d2d592ae23f40bcffeeab?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
      class="technology-image"
      alt="Our technology"
    />
    <div class="content-wrapper">
      <h2 class="section-title">{{ $t("technology") }}</h2>
      <p class="section-description">
        {{ $t("technology_des") }}
      </p>
    </div>
  </article>
</template>
  
  <style scoped>
.technology-section {
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

.technology-image {
  aspect-ratio: 1.11;
  object-fit: contain;
  object-position: center;
  width: 384px;
  border-radius: 10px;
  box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.25);
  align-self: stretch;
  min-width: 240px;
  margin-top: auto;
  margin-bottom: auto;
  flex-grow: 1;
  flex-shrink: 1;
}

.content-wrapper {
  align-self: stretch;
  min-width: 240px;
  margin-bottom: auto;
  min-height: 300px;
  flex-grow: 1;
  flex-shrink: 1;
  width: 380px;
  background-color: #dbcbd8; 
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 50px;
  margin-left: 50px;
}

.section-description {
  font-size: 16px;
  font-weight: 400;
  margin-top: 30px;
  margin-left: 50px;

}

@media (max-width: 991px) {
  .technology-section {
    max-width: 100%;
    margin-top: 40px;
  }

  .technology-image {
    max-width: 100%;
  }

  .content-wrapper {
    max-width: 100%;
  }

  .section-title {
    max-width: 100%;
  }

  .section-description {
    max-width: 100%;
  }
}
</style>
  