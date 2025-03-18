<template>
  <section id="workflow" class="workflow-section">
    <img
      src="../assets/images/workflow_bg.png"
      class="background-image"
      alt="Workflow background"
    />
    <h2 class="section-title">{{ $t("workflowTitle") }}</h2>
    <p class="section-description">
      {{ $t("workflowDescription") }}
    </p>
    <div class="workflow-items-container">
      <WorkflowItem
        v-for="(step, index) in steps"
        :key="index"
        :imageUrl="step.imageUrl"
        :stepNumber="step.stepNumber"
        :stepTitle="$t(step.stepTitle)"
        :stepDetails="step.stepDetails.map(detail => $t(detail))"
      />
    </div>
  </section>
</template>

<script setup>
import WorkflowItem from "@/components/WorkflowItem.vue";
import Icon_1 from "@/assets/images/WorkFlow/icon1.png"
import Icon_2 from "@/assets/images/WorkFlow/icon2.png"
import Icon_3 from "@/assets/images/WorkFlow/icon3.png"
import Icon_4 from "@/assets/images/WorkFlow/icon4.png"
import Icon_5 from "@/assets/images/WorkFlow/icon5.png"

const steps = [
  {
    imageUrl: Icon_1,
    stepNumber: "1",
    stepTitle: "step1Title",
    stepDetails: ["step1Details.detail1", "step1Details.detail2", "step1Details.detail3"],
  },
  {
    imageUrl: Icon_2,
    stepNumber: "2",
    stepTitle: "step2Title",
    stepDetails: ["step2Details.detail1", "step2Details.detail2", "step2Details.detail3", "step2Details.detail4"],
  },
  {
    imageUrl: Icon_3,
    stepNumber: "3",
    stepTitle: "step3Title",
    stepDetails: ["step3Details.detail1", "step3Details.detail2", "step3Details.detail3"],
  },
  {
    imageUrl: Icon_4,
    stepNumber: "4",
    stepTitle: "step4Title",
    stepDetails: ["step4Details.detail1", "step4Details.detail2", "step4Details.detail3", "step4Details.detail4"],
  },
  {
    imageUrl: Icon_5,
    stepNumber: "5",
    stepTitle: "step5Title",
    stepDetails: ["step5Details.detail1", "step5Details.detail2", "step5Details.detail3"],
  },
];
</script>

<style scoped>
.workflow-section {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 1153px;
  padding: 91px 30px;
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
  font-size: 50px;
  font-weight: 700;
  line-height: 0.8;
  letter-spacing: 2.5px;
  text-align: center;
  margin: 0;
}

.section-description {
  position: relative;
  font-size: 20px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 100px;
  width: 887px;
  max-width: 100%;
}

.workflow-items-container {
  position: relative;
  border-radius: 12px;
  display: flex;
  margin-top: 100px;
  width: 1189px;
  max-width: 100%;
  align-items: stretch;
  gap: 16px;
  flex-wrap: wrap;
}

@media (max-width: 991px) {
  .workflow-section {
    padding-left: 20px;
    padding-right: 20px;
  }

  .section-title {
    font-size: 40px;
  }

  .section-description {
    margin-top: 40px;
  }

  .workflow-items-container {
    margin-top: 40px;
  }
}
</style>