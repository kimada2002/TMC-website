<template>
  <section id="workflow" class="workflow-section">
    <img
      src="../assets/images/workflow_bg.png"
      class="background-image"
      alt="Workflow background"
    />
    <h2 class="section-title">{{ $t("workflow") }}</h2>

    <div
      class="workflow-wrapper"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="workflow-items-container">
        <WorkflowItem
          v-for="(step, index) in paginatedSteps"
          :key="index"
          :imageUrl="step.imageUrl"
          :stepNumber="step.stepNumber"
          :stepTitle="locale === 'vi' ? step.stepTitle.vi : step.stepTitle.en"
          :stepDetails="
            step.stepDetails.map((detail) =>
              locale === 'vi' ? detail.vi : detail.en
            )
          "
        />
      </div>

      <template v-if="showArrows">
        <button
          class="arrow-button left"
          @click="prevPage"
          :disabled="currentPage === 1"
        >
          ‹
        </button>
        <button
          class="arrow-button right"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          ›
        </button>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import WorkflowItem from "@/components/WorkflowItem.vue";

const { locale } = useI18n();
const steps = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);

function updateItemsPerPage() {
  itemsPerPage.value = window.innerWidth < 768 ? 1 : 5;
}

onMounted(async () => {
  updateItemsPerPage();
  window.addEventListener("resize", updateItemsPerPage);

  const querySnapshot = await getDocs(collection(db, "workflows"));
  steps.value = querySnapshot.docs.map((doc) => doc.data());
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateItemsPerPage);
});

const sortedSteps = computed(() =>
  [...steps.value].sort((a, b) => a.stepNumber - b.stepNumber)
);

const totalPages = computed(() =>
  Math.ceil(sortedSteps.value.length / itemsPerPage.value)
);

const paginatedSteps = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedSteps.value.slice(start, end);
});

const showArrows = computed(
  () => sortedSteps.value.length > itemsPerPage.value
);

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// 👇 Thêm hỗ trợ vuốt
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
  if (Math.abs(diff) < 50) return; // Vuốt nhẹ quá thì bỏ qua

  if (diff > 0 && currentPage.value < totalPages.value) {
    nextPage();
  } else if (diff < 0 && currentPage.value > 1) {
    prevPage();
  }
};
</script>

<style scoped>
/* giữ nguyên phần style như bạn đã viết */
.workflow-section {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px 20px;
  min-height: 575px;
  overflow: hidden;
  align-items: center;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  color: rgba(16, 25, 53, 1);
  justify-content: center;
}

.background-image {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.section-title {
  position: relative;
  color: rgba(0, 0, 0, 1);
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 30px;
}

.workflow-wrapper {
  position: relative;
  width: 100%;
  max-width: 1224px;
  margin-top: 10px;
}

.workflow-items-container {
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  width: 100%;
}

.workflow-items-container > * {
  flex: 1 1 250px;
  max-width: 235px;
  height: 530px;
}

.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.5rem;
  border: none;
  border-radius: 10%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  opacity: 0.2;
  transition: all 0.3s ease;
}

.arrow-button:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.05);
}

.arrow-button:disabled {
  display: none;
}

.arrow-button.left {
  left: -60px;
}

.arrow-button.right {
  right: -60px;
}

@media (max-width: 768px) {
  .workflow-section {
    padding: 30px 16px;
  }

  .section-title {
    font-size: var(--text-3xl);
    margin: 0;
  }

  .workflow-items-container {
    margin-top: 30px;
    gap: 10px;
  }

  .arrow-button.left {
    left: 0;
  }

  .arrow-button.right {
    right: 0;
  }

  .arrow-button {
    width: 34px;
    height: 34px;
  }
}
</style>
