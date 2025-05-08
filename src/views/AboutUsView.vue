<template>
  <section class="about-us-wrapper">
    <div
      class="section-wrapper"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <button
        v-if="totalPages > 1"
        class="arrow-button left"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        ‹
      </button>

      <div class="section-container">
        <article
          v-for="(section, i) in paginatedSections"
          :key="section.id"
          :ref="(el) => (sectionRefs[i] = el)"
          :class="[
            'section',
            'pop-up-section',
            ((currentPage - 1) * itemsPerPage + i) % 2 === 1 ? 'reverse' : '',
          ]"
        >
          <div class="section-content">
            <div class="header-container"></div>
            <h3 class="section-title">{{ getTitle(section) }}</h3>
            <div class="section-description">{{ getDescription(section) }}</div>
          </div>
          <div class="section-image" v-if="section.imageUrl">
            <img :src="section.imageUrl" :alt="getTitle(section)" />
          </div>
        </article>
      </div>

      <button
        v-if="totalPages > 1"
        class="arrow-button right"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        ›
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";

const { locale } = useI18n(); // Lấy ngôn ngữ hiện tại

const sections = ref([]);
const sectionRefs = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(1);

// Vuốt trái/phải
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipeGesture();
};

const handleSwipeGesture = () => {
  const diff = touchStartX.value - touchEndX.value;
  if (Math.abs(diff) < 50) return; // Vuốt quá nhẹ

  if (diff > 0 && currentPage.value < totalPages.value) {
    nextPage();
  } else if (diff < 0 && currentPage.value > 1) {
    prevPage();
  }
};

onMounted(async () => {
  await fetchSections();
  updateItemsPerPage();
  observeVisibleSections();
  window.addEventListener("resize", updateItemsPerPage);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateItemsPerPage);
});

const updateItemsPerPage = () => {
  itemsPerPage.value = window.innerWidth < 768 ? 1 : 1;
};

const fetchSections = async () => {
  const querySnapshot = await getDocs(collection(db, "aboutus"));
  sections.value = querySnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
};

const totalPages = computed(() =>
  Math.ceil(sections.value.length / itemsPerPage.value)
);

const paginatedSections = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return sections.value.slice(start, start + itemsPerPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const getTitle = (section) => {
  return section.title?.[locale.value] || "";
};

const getDescription = (section) => {
  return section.description?.[locale.value] || "";
};

watch(paginatedSections, () => {
  sectionRefs.value = [];
  setTimeout(() => {
    observeVisibleSections();
  }, 100);
});

function observeVisibleSections() {
  const observer = useIntersectionObserver(
    (entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    },
    { threshold: 0.2 }
  );

  sectionRefs.value.forEach((section) => {
    if (section) observer.observe(section);
  });
}
</script>

<style scoped>
:root {
  --gap: clamp(1rem, 2vw, 2rem);
}

.about-us-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--gap);
}

.section-wrapper {
  position: relative;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  overflow: hidden;
}

.section-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  height: 60vh;
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  box-sizing: border-box;
  gap: 2rem;
}

.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.section.reverse {
  flex-direction: row-reverse;
}

.section-content {
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  padding: 1rem;
}

.section-title {
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-description {
  font-size: var(--text-lg);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow-y: auto;
  text-overflow: ellipsis;
  max-height: calc(1.6em * 5);
  padding-right: 4px;
}

.section-description::-webkit-scrollbar {
  width: 6px;
}

.section-description::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.section-image {
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-image img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15),
    -2px -2px 8px rgba(255, 255, 255, 0.8);
}

.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 10%;
  border: none;
  cursor: pointer;
  opacity: 0.2;
  transition: all 0.3s ease;
}

.arrow-button:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.05);
}

.arrow-button:disabled {
  display: none;
}

.arrow-button.left {
  left: 1rem;
}

.arrow-button.right {
  right: 1rem;
}

@media (max-width: 768px) {
  .section {
    margin-top: -2rem;
    flex-direction: column !important;
    text-align: center;
    height: 38rem;
    gap: 0.5rem;
  }

  .section-content,
  .section-image {
    max-width: 100%;
    margin: 1rem 0;
    
  }

  .section-image {
    order: -1;
    width: 280px;
    
  }

  .section-description {
    font-size: 1rem;
  }

  .section.reverse .section-description,
  .section.reverse .section-title {
    text-align: center;
  }

  .arrow-button {
    width: 34px;
    height: 34px;
  }


}

/* Pop-up section animations */
.pop-up-section {
  opacity: 0;
  transform: scale(0.95) translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.pop-up-section.visible {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Add stagger effect for children */
.pop-up-section.visible .section-content {
  animation: fadeInUp 0.6s ease forwards 0.3s;
}

.pop-up-section.visible .section-image {
  animation: fadeInUp 0.6s ease forwards 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure smooth performance */
.section-content,
.section-image {
  opacity: 0;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .pop-up-section,
  .pop-up-section.visible,
  .pop-up-section.visible .section-content,
  .pop-up-section.visible .section-image {
    transition: none;
    animation: none;
    transform: none;
    opacity: 1;
  }
}
</style>
