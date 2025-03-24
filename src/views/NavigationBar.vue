<template>
  <nav ref="navbar" class="navbar">
    <div class="nav-left">
      <div class="logo">
        <img
          src="@/assets/images/TMC-logo.png"
          class="desktop-logo"
          alt="Desktop Logo"
        />
      </div>
    </div>

    <div class="nav-right">
      <button class="menu-toggle" @click="toggleMenu">☰</button>
      <LanguageSelector />
    </div>

    <div :class="['nav-container', { show: isMenuOpen }]">
      <button class="nav-button" @click="scrollToSection('header')">
        {{ $t("home") }}
      </button>
      <button class="nav-button" @click="scrollToSection('about')">
        {{ $t("about") }}
      </button>
      <button class="nav-button" @click="scrollToSection('service')">
        {{ $t("service") }}
      </button>
      <button class="nav-button" @click="scrollToSection('workflow')">
        {{ $t("work") }}
      </button>
      <button class="nav-button" @click="scrollToSection('contact')">
        {{ $t("contact") }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import LanguageSelector from "./LanguageSelector.vue";

const isMenuOpen = ref(false);
const navbar = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element && navbar.value) {
    const navbarHeight = navbar.value.offsetHeight;
    const offsetTop = element.offsetTop - navbarHeight;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
    isMenuOpen.value = false;
  }
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 10px 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo img {
  max-width: 108px;
}

.nav-right {
  display: flex;
  align-items: center;
}

.menu-toggle {
  font-size: 1.8rem;
  background: none;
  border: none;
  cursor: pointer;
  display: none; /* Ẩn toggle menu trên desktop */
}

.nav-container {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-grow: 1;
}

.nav-button {
  padding: 10px;
  background: none;
  border: none;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  color: rgba(0, 0, 0, 1);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-container {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 50vh;
    background: rgba(255, 255, 255, 0.95);
    flex-direction: column;
    display: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    align-items: center;
    justify-content: center;
  }

  .nav-container.show {
    display: flex;
  }

  .nav-button {
    font-size: 20px;
    padding: 15px;
    width: 100%;
    text-align: center;
  }
}
</style>