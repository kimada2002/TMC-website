<template>
  <article class="company-overview-section">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a9aedc0acc84ca320bdf73fb1c0d3d53b5f1d5184132082d8b2f516727cf4cc?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
      class="company-image"
      alt="Company overview"
    />
    <div class="content-wrapper">
      <h2 class="section-title">{{ $t("companyoverview") }}</h2>
      <p class="section-description">
        {{ $t("companyoverview_des") }}
      </p>
    </div>
  </article>
</template>
  
<style scoped>
.company-overview-section {
  display: flex;
  align-items: stretch; /* Đảm bảo 2 bên bằng nhau */
  justify-content: center;
  gap: 0;
  width: 100%;
  max-width: 1200px;
  border-radius: 10px;
  overflow: hidden; /* Đảm bảo bo tròn cả 2 phần */
}

.company-image {
  aspect-ratio: 1.11;
  object-fit: contain;
  object-position: center;
  width: 385px;
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
  /* margin-top: auto; */
  margin-bottom: auto;
  min-height: 300px;
  flex-grow: 1;
  flex-shrink: 1;
  width: 380px;
  background-color: #fdf5e6; /* Màu nền sáng (kem) */
  padding: 20px;
  /* border-radius: 10px; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-left: 50px;
}

.section-description {
  font-size: 16px;
  font-weight: 400;
  margin-left: 50px;
}

@media (max-width: 991px) {
  .company-overview-section {
    max-width: 100%;
  }

  .company-image {
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
  