<template>
  <section id="workflow" class="workflow-section">
    <img
      src="../assets/images/workflow_bg.png"
      class="background-image"
      alt="Workflow background"
    />
    <h2 class="section-title">
      {{ lang === "vi" ? "Quy trình làm việc" : "Workflow Process" }}
    </h2>
    <p class="section-description">
      {{
        lang === "vi"
          ? "Đây là các bước chúng tôi thực hiện để hoàn thành dự án của bạn."
          : "These are the steps we take to complete your project."
      }}
    </p>

    <div class="workflow-wrapper">
      <div class="workflow-items-container">
        <WorkflowItem
          v-for="(step, index) in paginatedSteps"
          :key="index"
          :imageUrl="step.imageUrl"
          :stepNumber="step.stepNumber"
          :stepTitle="lang === 'vi' ? step.stepTitle.vi : step.stepTitle.en"
          :stepDetails="step.stepDetails.map((detail) =>
            lang === 'vi' ? detail.vi : detail.en
          )"
        />
      </div>

      <!-- Chỉ hiện nút mũi tên khi có > 5 workflows -->
      <template v-if="showArrows">
        <button class="nav-button left" @click="prevPage" :disabled="currentPage === 1">
          ‹
        </button>
        <button class="nav-button right" @click="nextPage" :disabled="currentPage === totalPages">
          ›
        </button>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import WorkflowItem from "@/components/WorkflowItem.vue";

const steps = ref([]);
const lang = localStorage.getItem("lang") || "vi";

const currentPage = ref(1);
const itemsPerPage = 5; // 5 workflows mỗi trang

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "workflows"));
  steps.value = querySnapshot.docs.map((doc) => doc.data());
});

const sortedSteps = computed(() =>
  [...steps.value].sort((a, b) => a.stepNumber - b.stepNumber)
);

const totalPages = computed(() =>
  Math.ceil(sortedSteps.value.length / itemsPerPage)
);

const paginatedSteps = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedSteps.value.slice(start, end);
});

const showArrows = computed(() => sortedSteps.value.length > itemsPerPage);

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
</script>

<style scoped>
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
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 1px;
  text-align: center;
  margin: 0;
}

.section-description {
  position: relative;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.5px;
  text-align: center;
  margin-top: 10px;
  width: 850px;
  max-width: 100%;
}

/* Wrapper để chứa items và các mũi tên */
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
}

/* Mũi tên điều hướng */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(16, 25, 53, 0.8);
  border: none;
  color: white;
  font-size: 28px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
}

.nav-button:hover {
  background: rgba(221, 100, 66, 0.9);
}

.nav-button.left {
  left: -60px; /* nằm ngoài vùng workflow-wrapper */
}

.nav-button.right {
  right: -60px; /* nằm ngoài vùng workflow-wrapper */
}

.nav-button:disabled {
  background: rgba(16, 25, 53, 0.3);
  cursor: default;
}

@media (max-width: 991px) {
  .workflow-section {
    padding: 30px 16px;
  }

  .section-title {
    font-size: 28px;
  }

  .section-description {
    font-size: 14px;
    margin-top: 24px;
    line-height: 26px;
  }

  .workflow-items-container {
    margin-top: 30px;
    gap: 10px;
  }

  .nav-button.left {
    left: -30px;
  }

  .nav-button.right {
    right: -30px;
  }
}
</style>
