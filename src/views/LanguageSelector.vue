<template>
  <div class="language-selector">
    <select
      :value="currentLang"
      @change="changeLanguage($event.target.value)"
      class="lang-select"
    >
      <option v-for="lang in languages" :key="lang.code" :value="lang.code">
        {{ lang.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// Supported languages
const languages = [
  { code: "vi", label: "VIE" },
  { code: "en", label: "ENG" },
];

const currentLang = ref(locale.value);

// Đồng bộ khi mounted
onMounted(() => {
  const savedLang = localStorage.getItem("lang");
  if (savedLang && languages.some((l) => l.code === savedLang)) {
    currentLang.value = savedLang;
    locale.value = savedLang;
  }
});

// Đồng bộ khi ngôn ngữ thay đổi
const changeLanguage = (lang) => {
  currentLang.value = lang;
  locale.value = lang;
  localStorage.setItem("lang", lang);

  // Nếu cần reload để áp dụng thay đổi toàn cục
  // window.location.reload();
};

// Theo dõi thay đổi từ bên ngoài (nếu cần)
watch(locale, (newVal) => {
  if (newVal !== currentLang.value) {
    currentLang.value = newVal;
    localStorage.setItem("lang", newVal);
  }
});
</script>

<style scoped>
/* Giữ nguyên phần style như cũ */
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