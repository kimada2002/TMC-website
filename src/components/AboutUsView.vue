<template>
  <!-- Company Overview Section -->
  <article class="section company-overview">
    <img
      src="@/assets/images/About/HL1.png"
      class="section-image"
      alt="Company overview"
    />
    <div class="section-content">
      <h2 class="section-title">{{ $t("companyoverview") }}</h2>
      <p class="section-description">
        {{ $t("companyoverview_des") }}
      </p>
    </div>
  </article>

  <!-- Resources Section -->
  <article class="section resources">
    <div class="section-content">
      <h2 class="section-title">{{ $t("resources") }}</h2>
      <p class="section-description">
        {{ $t("resources_des") }}
      </p>
    </div>
    <div class="section-image-wrapper">
      <img
        src="@/assets/images/About/clorox.png"
        class="section-image"
        alt="Our resources"
      />
    </div>
  </article>

  <!-- Technology Section -->
  <article class="section technology">
    <img
      src="@/assets/images/About/technology.png"
      class="section-image"
      alt="Our technology"
    />
    <div class="section-content">
      <h2 class="section-title">{{ $t("technology") }}</h2>
      <p class="section-description">
        {{ $t("technology_des") }}
      </p>
    </div>
  </article>
</template>

<style scoped>
:root {
  --primary-bg: #fdf5e6;
  --secondary-bg: #4a5568;
  --technology-bg: #dbcbd8;
  --text-color: #ffffff;
  --shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Common Styles for Sections */
.section {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0;
  width: 100%;
  max-width: 1200px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
}

.section.company-overview {
  margin-bottom: 76px;
}

.section.resources {
  margin-top: 76px;
}

.section.technology {
  margin-top: 76px;
}

/* Image Styles */
.section-image {
  aspect-ratio: 1.11;
  object-fit: cover;
  object-position: center;
  width: 385px;
  border-radius: 10px;
  box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.25);
  flex: 1;
}

/* Content Wrapper Styles */
.section-content {
  flex: 1;
  min-width: 240px;
  min-height: 300px;
  padding: 20px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}

/* Specific Background Colors */
.section.company-overview .section-content {
  background-color: #f7e9e2;
  height: 100%;
}

.section.resources .section-content {
  background-color: #575e72;
  color: #fff;
  padding: 40px;
  height: 100%;
}

.section.technology .section-content {
  background-color: #dbcbd8;
  height: 100%;
}

/* Title and Description Styles */
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

.section-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.section.resources .section-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.section.resources .section-title {
  font-size: 30px;
  margin-bottom: 20px;
}

.section.resources .section-description {
  line-height: 1.6;
}

/* Responsive Styles */
@media (max-width: 991px) {
  .section {
    flex-direction: column;
  }

  .section-image {
    max-width: 100%;
    margin: 0 auto;
  }

  .section-content {
    max-width: 100%;
    text-align: center;
  }

  .section-title,
  .section-description {
    margin-left: 0;
  }

  .section.resources {
    flex-direction: column-reverse;
  }
  .section.resources .section-image {
    max-width: 385px; 
    width: 100%; 
    height: auto; 
    display: block;
    margin: 0 auto;
  }
}
</style>