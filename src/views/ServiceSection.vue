<template>
  <section id="service" class="services-section">
    <img
      src="../assets/images/service_background.png"
      class="background-image"
      alt=""
    />
    <h2 class="section-title">{{ $t("our_service") }}</h2>

    <ServiceRow
      backgroundColor="rgba(16, 25, 53, 0.5)"
      :services="[
        {
          imageUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/3ff30300d6fb1f1b255558ba7ca6641406763ab38db63a951b0df84bbd3cdd17?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9',
          title: $t('interior_exterior'),
          description: $t('service_des1'),
        },
        {
          imageUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/09f87f1a97e83a212965c3df272deb2ec2d8f51e907c3dad184ab40538d43f3e?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9',
          title: $t('pop_posm'),
          description: $t('service_des2'),
        },
        {
          imageUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/5571876baa7221b38e951eca953350dbe53ae650627985e562823865392b5bea?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9',
          title: $t('large_format_printer'),
          description: $t('service_des3'),
        },
      ]"
    />

    <ServiceRow
      backgroundColor="rgba(221, 110, 66, 0.5)"
      :services="[
        {
          imageUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/a062108f55b104649902e40a8b75e9db733924aa77e0e345b388ed5fe3bc8ee7?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9',
          title: $t('interior_design'),
          description: $t('service_des4'),
        },
        {
          imageUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/a1d07a931e4fad548d0c7cdbda40d544cdf5b3799c5f6bdfd988fe23ff2861a6?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9',
          title: $t('advertising_design'),
          description: $t('service_des5'),
        },
        {
          imageUrl:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/8d4345ffeb023b89ccd175dfd6dc4e121f654b5885d6c5ef639bf33a49de9412?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9',
          title: $t('pop_posm_design'),
          description: $t('service_des6'),
        },
      ]"
    />
  </section>
</template>

<script setup>
import ServiceRow from "../components/ServiceRow.vue";
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
