<template>
  <!-- Company Overview Section -->
  <article class="section company-overview fade-in-right-side" ref="companySection">
    <div class="section-image-wrapper">
      <img
        src="@/assets/images/About/HL1.png"
        class="section-image"
        alt="Company overview"
      />
    </div>
    <div class="section-content">
      <h3 class="section-title">{{ $t("companyoverview") }}</h3>
      <p class="section-description">
        {{ $t("companyoverview_des") }}
      </p>
    </div>
  </article>

  <!-- Resources Section -->
  <article class="section resources fade-in-left-side" ref="resourcesSection">
    <div class="section-content">
      <h3 class="section-title">{{ $t("resources") }}</h3>
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
  <article class="section technology fade-in-right-side" ref="techSection">
    <div class="section-image-wrapper">
      <img
        src="@/assets/images/About/technology.png"
        class="section-image"
        alt="Our technology"
      />
    </div>
    <div class="section-content">
      <h3 class="section-title">{{ $t("technology") }}</h3>
      <p class="section-description">
        {{ $t("technology_des") }}
      </p>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@/utils/useIntersectionObserver'

const companySection = ref(null)
const resourcesSection = ref(null)
const techSection = ref(null)

onMounted(() => {
  const sections = [companySection.value, resourcesSection.value, techSection.value]
  
  const observer = useIntersectionObserver(
    (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    },
    {
      threshold: 0.2,
      rootMargin: '0px'
    }
  )

  sections.forEach(section => {
    if (section) observer.observe(section)
  })
})
</script>

<style scoped>
/* Common Styles for Sections */
.section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  padding: 1.5em;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
}

/* Image Styles */
.section-image {
  flex: 1; 
  aspect-ratio: 1.11;
  object-fit: cover;
  object-position: center;
  width: 385px;
  height: au;
  border-radius: 10px;
  box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.25);
}

.section-image-wrapper {
  flex: 1;
  display: flex;
  z-index: 2;
}

/* Content Wrapper Styles */
.section-content {
  display: flex;
  flex-direction: column;
  min-height: 20em;
  padding: 2.5em;
  box-shadow: var(--shadow);
  z-index: 1;
}

/* Specific Background Colors */
.section.company-overview .section-content {
  background-color: #f7e9e2;
  height: 100%;
}

.section.resources > .section-content {
  background-color: #575e72;
  color: var(--white);
  height: 100%;
}

.section.technology > .section-content {
  background-color: var(--gray);
  height: 100%;
}

/* Title and Description Styles */
.section-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  margin-bottom: 20px;
}

/* Animation Styles */
.fade-in-right-side,
.fade-in-left-side {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
}

.fade-in-right-side.visible,
.fade-in-left-side.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Add stagger effect for children */
.fade-in-right-side.visible .section-image-wrapper {
  animation: slideInRightSide 0.6s ease-out 0.3s both;
}

.fade-in-right-side.visible .section-content {
  animation: slideInRightSide 0.6s ease-out 0.6s both;
}

.fade-in-left-side.visible .section-image-wrapper {
  animation: slideInLeftSide 0.6s ease-out 0.3s both;
}

.fade-in-left-side.visible .section-content {
  animation: slideInLeftSide 0.6s ease-out 0.6s both;
}

@keyframes slideInRightSide {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeftSide {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Ensure smooth animation performance */
.section {
  will-change: transform;
  backface-visibility: hidden;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .section {
    flex-direction: column;
  }

  .section-image {
    max-width: 100%;
    aspect-ratio: 4/3;
    box-shadow: none;
    border-radius: 10px 10px 0 0;
  }

  .section-content {
    max-width: 385px;
    margin: 0 auto;

    text-align: center;
    border-radius: 0 0 10px 10px ;
  }

  .section.resources {
    flex-direction: column-reverse;
  }
}

</style>