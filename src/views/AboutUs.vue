<template>
  <section id="about" class="about-us-page">
    <h1 class="page-title">{{ $t("aboutus") }}</h1>

    <TrackAndStop />

    <div class="content-container">
      <CompanyOverview />
      <ResourcesSection />
      <TechnologySection />
    </div>

    <h2 class="clients-title">{{ $t("clients") }}<br /></h2>

    <TrackAndStop darkMode />

    <ClientsSection />
  </section>
</template>
  
<script setup>
import TrackAndStop from "../components/TrackAndStop.vue";
import CompanyOverview from "../components/CompanyOverView.vue";
import ResourcesSection from "../components/ResourcesSection.vue";
import TechnologySection from "../components/TechnologySection.vue";
import ClientsSection from "./ClientsSection.vue";
</script>

  
  <style scoped>
.about-us-page {
  background-color: rgba(251, 255, 254, 1);
  display: flex;
  padding: 52px 0;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
}

.page-title {
  color: rgba(16, 25, 53, 1);
  font-size: 50px;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 700;
  text-align: center;
  margin: 0;
}

.content-container {
  display: flex;
  margin-top: 80px;
  width: 100%;
  max-width: 1040px;
  flex-direction: column;
  align-items: stretch;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  color: rgba(16, 25, 53, 1);
  justify-content: center;
}

.clients-title {
  color: rgba(0, 0, 0, 1);
  font-size: 50px;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-align: center;
  margin-top: 54px;
  margin-bottom: 0;
}

@media (max-width: 991px) {
  .page-title {
    font-size: 40px;
  }

  .content-container {
    max-width: 100%;
    margin-top: 40px;
  }

  .clients-title {
    margin-top: 40px;
    font-size: 40px;
  }
}
</style>
  