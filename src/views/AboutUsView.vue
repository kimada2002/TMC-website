<template>
  <div v-if="sections.length">
    <article
      v-for="(section, index) in sections"
      :key="section.id"
      :ref="(el) => (sectionRefs[index] = el)"
      :class="[
        'section',
        section.className,
        index % 2 === 0 ? 'fade-in-right-side' : 'fade-in-left-side',
      ]"
    >
      <!-- Bố cục lồng trong flex -->
      <template v-if="index % 2 === 0">
        <div class="section-image-wrapper">
          <img
            :src="section.imageUrl"
            class="section-image"
            :alt="getTitle(section)"
          />
        </div>
        <div class="section-content">
          <h3 class="section-title">{{ getTitle(section) }}</h3>
          <p class="section-description">{{ getDescription(section) }}</p>
        </div>
      </template>

      <template v-else>
        <div class="section-content">
          <h3 class="section-title">{{ getTitle(section) }}</h3>
          <p class="section-description">{{ getDescription(section) }}</p>
        </div>
        <div class="section-image-wrapper">
          <img
            :src="section.imageUrl"
            class="section-image"
            :alt="getTitle(section)"
          />
        </div>
      </template>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase"; // Firebase instance
import { collection, getDocs } from "firebase/firestore";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";

const sections = ref([]);
const sectionRefs = ref([]);
const lang = ref(localStorage.getItem("lang") || "vi");

const fetchSections = async () => {
  const querySnapshot = await getDocs(collection(db, "aboutus"));
  sections.value = querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    // ✅ Filter only active sections (optional, nếu có field isActive)
    .filter((item) => item.isActive !== false)
    // ✅ Sort theo order
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
};

onMounted(async () => {
  await fetchSections();

  const observer = useIntersectionObserver(
    (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    },
    {
      threshold: 0.2,
      rootMargin: "0px",
    }
  );

  sectionRefs.value.forEach((section) => {
    if (section) observer.observe(section);
  });
});

// Hàm lấy title đúng ngôn ngữ
function getTitle(section) {
  return lang.value === "vi" ? section.title.vi : section.title.en;
}

// Hàm lấy description đúng ngôn ngữ
function getDescription(section) {
  return lang.value === "vi" ? section.description.vi : section.description.en;
}
</script>

<style scoped>
/* Common Styles for Sections */
.section {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0;
  padding: 1.5em;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  will-change: transform;
  backface-visibility: hidden;
}

/* Image Styles */
.section-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
  width: auto;
  height: auto;
  flex-shrink: 0;
}

.section-image {
  width: 100%;
  height: auto;
  max-width: 385px;
  aspect-ratio: 1.11;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  box-shadow: 6px 4px 4px rgba(0, 0, 0, 0.25);
}

/* Content Wrapper Styles */
.section-content {
  display: flex;
  flex-direction: column;
  min-height: 20em;
  padding: 2.5em;
  box-shadow: var(--shadow);
  z-index: 1;
  background-color: #f5f5f5;
  border-radius: 10px;
}

/* Specific Background Colors */
.section.company-overview .section-content {
  background-color: #f7e9e2;
}

.section.resources > .section-content {
  background-color: #575e72;
  color: var(--white);
}

.section.technology > .section-content {
  background-color: var(--gray);
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

/* Keyframes */
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
    border-radius: 0 0 10px 10px;
  }

  .section.resources {
    flex-direction: column-reverse;
  }
}
</style>
