<template>
  <section class="about-us-wrapper">
    <div class="section-wrapper">
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
            currentPage % 2 === 0 ? 'fade-in-right-side' : 'fade-in-left-side',
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
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import ClientsSection from "./ClientsSection.vue";

const sections = ref([]);
const sectionRefs = ref([]);
const currentPage = ref(1);
const lang = ref(localStorage.getItem("lang") || "vi");
const itemsPerPage = ref(1);

onMounted(async () => {
  await fetchSections();
  observeVisibleSections();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateItemsPerPage);
});

const updateItemsPerPage = () => {
  if (window.innerWidth < 768) {
    itemsPerPage.value = 1;
  } else {
    itemsPerPage.value = 1; // Bạn có thể đặt 2 nếu muốn hiện 2 mục cùng lúc trên desktop
  }
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

function getTitle(section) {
  return lang.value === "vi" ? section.title.vi : section.title.en;
}

function getDescription(section) {
  return lang.value === "vi" ? section.description.vi : section.description.en;
}

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
  width: 100vw;
  height: 60vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: #f5f5f5;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* ZigZag đảo chiều flex row */
.section.reverse {
  flex-direction: row-reverse;
}

.section-content {
  flex: 1;
  text-align: left;
}

.section-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-title-about {
  position: relative;
  color: var(--black);
  font-size: 50px;
}

.section-title-clients {
  position: relative;
  color: var(--black);
  font-size: 50px;
  margin-top: 1rem;
}

.section-description {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.6;
}

.section-content,
.section-image {
  flex: 1;
  max-width: 50%;
  margin: 8rem;
}

.section-image img {
  max-width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: cover;
  border-radius: 10px;
}

/* Arrows */
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
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.arrow-button:hover {
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

/* Responsive */
@media (max-width: 768px) {
  .section {
    margin-top: -2rem;
    flex-direction: column !important;
    text-align: center;
    height: 38rem;
  }

  .section-title-about {
    order: -2;
    font-size: 1.75rem;
    margin-top: 2rem;
  }

  .section-title-clients {
    order: -2;
    font-size: 1.75rem;
    margin-top: 2rem;
  }

  .section-content,
  .section-image {
    max-width: 100%;
    margin: 1rem 0;
  }

  .section-image {
    order: -1;
  }

  .section-title {
    font-size: 1.5rem;
    margin-top: 0;
  }

  .section-description {
    font-size: 1rem;
  }
}
</style>
