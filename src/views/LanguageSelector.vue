<template>
  <div class="language-selector">
    <button
      v-for="lang in languages"
      :key="lang.code"
      class="lang-button"
      :class="{ 'lang-button-active': $i18n.locale === lang.code }"
      @click="changeLanguage(lang.code)"
    >
      {{ lang.label }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// Supported languages
const languages = [
  { code: "vi", label: "VIE" },
  { code: "en", label: "ENG" },
];

// Change language and save to localStorage
const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem("lang", lang);
};
</script>

<style scoped>
.language-selector {
  position: absolute;
  top: 10px;
  right: 0;
  border-radius: 100px;
  background-color: #fff;
  display: flex;
  padding: 5px;
  gap: 0;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
}

.lang-button {
  flex: 1;
  color: #000;
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
  background-color: #3c4ef3;
  color: #fff;
  border-radius: 100px;
}

@media (max-width: 768px) {
  .language-selector{
    right: 50px;
  }
}
</style>