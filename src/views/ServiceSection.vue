<template>
  <section id="service" class="services-section">
    <img
      src="../assets/images/service_background.png"
      class="background-image"
      alt="Service background"
    />
    <h2 class="section-title">{{ $t("our_service") }}</h2>

    <ServiceRow
      v-for="(row, index) in serviceRows"
      :key="index"
      :backgroundColor="row.backgroundColor"
      :services="row.services"
    />
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import ServiceRow from "@/components/ServiceRow.vue";
import ServiceImage_1 from "@/assets/images/Service/Interior-Exterior.png";
import ServiceImage_2 from "@/assets/images/Service/POP-POSM.png";
import ServiceImage_3 from "@/assets/images/Service/LargeFormatPrinter.png";
import ServiceImage_4 from "@/assets/images/Service/Interior-Exterior-Design.png";
import ServiceImage_5 from "@/assets/images/Service/AdvertisingDesign.png";
import ServiceImage_6 from "@/assets/images/Service/POP-POSM-Design,png.png";

const { t } = useI18n();

const serviceRows = computed(() => [
  {
    backgroundColor: "rgba(16, 25, 53, 0.5)",
    services: [
      {
        imageUrl: ServiceImage_1,
        title: t("interior_exterior"),
        description: t("service_des1"),
      },
      {
        imageUrl: ServiceImage_2,
        title: t("pop_posm"),
        description: t("service_des2"),
      },
      {
        imageUrl: ServiceImage_3,
        title: t("large_format_printer"),
        description: t("service_des3"),
      },
    ],
  },
  {
    backgroundColor: "rgba(221, 110, 66, 0.5)",
    services: [
      {
        imageUrl: ServiceImage_4,
        title: t("interior_design"),
        description: t("service_des4"),
      },
      {
        imageUrl: ServiceImage_5,
        title: t("advertising_design"),
        description: t("service_des5"),
      },
      {
        imageUrl: ServiceImage_6,
        title: t("pop_posm_design"),
        description: t("service_des6"),
      },
    ],
  },
]);
</script>

<style scoped>
.services-section {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 1786px;
  padding-top: 44px;
  overflow: hidden;
  align-items: stretch;
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
  color: black;
  font-size: 50px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-align: center;
  align-self: center;
  margin: 0 0 98px;
}

@media (max-width: 991px) {
  .section-title {
    font-size: 40px;
    margin-bottom: 40px;
  }
}
</style>