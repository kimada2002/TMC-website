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
        imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/46b2da90b20379c4ef4dd2ae320e6ed3df67a381aa09a2b3e07e52ebab5308b8?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
        stepNumber="1"
        :stepTitle="$t('step1Title')"
        :stepDetails="[
          $t('step1Details.detail1'),
          $t('step1Details.detail2'),
          $t('step1Details.detail3'),
        ]"
      />
      <WorkflowItem
        imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/bc109da810a41da576045e0901669d4eb2485b1fe961aca8d5ad5f8959829156?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
        stepNumber="2"
        :stepTitle="$t('step2Title')"
        :stepDetails="[
          $t('step2Details.detail1'),
          $t('step2Details.detail2'),
          $t('step2Details.detail3'),
          $t('step2Details.detail4'),
        ]"
      />
      <WorkflowItem
        imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/471b36026868f7655fece867b3fea89aeeccb266b917a22d9b59fe1e061f0c95?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
        stepNumber="3"
        :stepTitle="$t('step3Title')"
        :stepDetails="[
          $t('step3Details.detail1'),
          $t('step3Details.detail2'),
          $t('step3Details.detail3'),
        ]"
      />
      <WorkflowItem
        imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/e96bd175c606ee19322dbcbcedd6c51c8807aa66df6dd4bc1915630ddd4421d0?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
        stepNumber="4"
        :stepTitle="$t('step4Title')"
        :stepDetails="[
          $t('step4Details.detail1'),
          $t('step4Details.detail2'),
          $t('step4Details.detail3'),
          $t('step4Details.detail4'),
        ]"
      />
      <WorkflowItem
        imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/4c69b8856f5a72c25869a6693f7e7c98adbee85ae16eee29ca9f4a046db1ffd3?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
        stepNumber="5"
        :stepTitle="$t('step5Title')"
        :stepDetails="[
          $t('step5Details.detail1'),
          $t('step5Details.detail2'),
          $t('step5Details.detail3'),
        ]"
      />
    </div>
  </section>
</template>

<script setup>
import WorkflowItem from "../components/WorkflowItem.vue";
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
  