<template>
  <div class="language-selector">
    <button
      class="lang-button"
      :class="{ 'lang-button-active': $i18n.locale === 'vi' }"
      @click="changeLanguage('vi')"
    >
      VIE
    </button>
    <button
      class="lang-button"
      :class="{ 'lang-button-active': $i18n.locale === 'en' }"
      @click="changeLanguage('en')"
    >
      ENG
    </button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const changeLanguage = (lang) => {
  locale.value = lang; 
  localStorage.setItem("lang", lang); 
};
</script>


<style scoped>
.language-selector {
  position: absolute;
  top: 10px;
  right: 0px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 5px;
  gap: 0;
  font-size: 14px;
  text-align: center;
  width: auto;
  overflow: hidden;
}

.lang-button {
  flex: 1;
  color: rgba(0, 0, 0, 1);
  background: none;
  border: none;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  padding: 9px 15px;
  transition: background-color 0.3s, color 0.3s;
}

.lang-button-active {
  background-color: rgba(60, 78, 243, 1);
  color: rgba(255, 255, 255, 1);
  border-radius: 100px;
}
</style>
