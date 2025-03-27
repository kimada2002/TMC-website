<template>
  <div class="language-selector">
    <select 
      :value="$i18n.locale"
      @change="changeLanguage($event.target.value)"
      class="lang-select"
    >
      <option 
        v-for="lang in languages" 
        :key="lang.code" 
        :value="lang.code"
      >
        {{ lang.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// Supported languages
const languages = [
  { code: "vi", label: "VIE" },
  { code: "en", label: "ENG" }
];

// Change language and save to localStorage
const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem("lang", lang);
};
</script>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
}

.lang-select {
  appearance: none;
  border: none;
  padding: 8px 32px 8px 16px;
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  color: var(--black);
  cursor: pointer;
  transition: all 0.3s ease;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
}

.lang-select:focus {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 2px rgba(60, 78, 243, 0.2);
}

.lang-select option {
  color: var(--black);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  padding: 12px;
  border: none;
}

</style>