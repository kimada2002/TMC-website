<template>
  <article class="workflow-item">
    <img :src="imageUrl" class="workflow-icon" alt="Workflow step icon" />
    <h3 class="workflow-step-title">
      {{ $t("step") }} {{ stepNumber }}<br />{{ stepTitle }}
    </h3>
    <div class="workflow-step-details">
      <span
        v-for="(detail, index) in stepDetails"
        :key="index"
        class="step-detail"
      >
        {{ detail }}
      </span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  stepNumber: {
    type: String,
    required: true,
  },
  stepTitle: {
    type: String,
    required: true,
  },
  stepDetails: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.workflow-item {
  border-radius: 12px;
  background-color: rgba(219, 203, 216, 0.5);
  display: flex;
  padding: 20px 16px 40px;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  flex: 1;
  transition: background-color 0.5s ease, color 0.5s ease;
  width: 50%;
  min-height: 415px; /* bỏ chiều cao cố định */
}

.workflow-item:hover {
  background-color: rgba(221, 100, 66, 0.7);
  color: white;
}

.workflow-item:hover .workflow-step-title,
.workflow-item:hover .workflow-step-details {
  color: white;
}

.workflow-item:hover .workflow-icon {
  filter: brightness(0) invert(1);
}

.workflow-item:hover .step-detail::before {
  color: white;
}

.workflow-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 130px;
  max-width: 100%;
  transition: filter 0.5s ease;
}

.workflow-step-title {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-top: 20px;
  transition: filter 0.5s ease;
  line-height: 1.3;

  display: -webkit-box;
  -webkit-line-clamp: 3; /* chỉ 2 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: calc(1.3em * 3); /* 2 dòng = 2 x line-height */
}

.workflow-step-details {
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.step-detail {
  margin-top: auto;
  white-space: normal;
  word-wrap: break-word;
  text-align: left;
  display: flex;
  gap: 8px;
}

.step-detail::before {
  content: "•";
  color: #101935;
  font-size: 16px;
  margin-right: 5px;
}

@media (max-width: 991px) {
  .workflow-item {
    width: 100%;
    padding-bottom: 100px;
  }

  .workflow-step-details {
    margin-top: 60px;
  }
}
</style>
