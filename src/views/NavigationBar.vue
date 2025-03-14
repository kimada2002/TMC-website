<template>
  <nav ref="navbar" class="navigation-bar">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/be294a4ad080f604daf35a7223e40e3902c72459922b9c181ef1d5c90bc242a8?placeholderIfAbsent=true&apiKey=cba9fc34d6e940d0843c734c0ba9fcc9"
      class="logo"
      alt="Logo"
    />
    <div class="nav-container">
      <div class="navbar">
        <div class="navbar-item">
          <button class="nav-button" @click="scrollToSection('header')">
            {{ $t("home") }}
          </button>
        </div>
        <div class="about">
          <button class="nav-button" @click="scrollToSection('about')">
            {{ $t("about") }}
          </button>
        </div>
        <div class="service">
          <button class="nav-button" @click="scrollToSection('service')">
            {{ $t("service") }}
          </button>
        </div>
        <div class="work">
          <button class="nav-button" @click="scrollToSection('workflow')">
            {{ $t("work") }}
          </button>
        </div>
        <div class="contact">
          <button class="nav-button" @click="scrollToSection('contact')">
            {{ $t("contact") }}
          </button>
        </div>
      </div>
      <LanguageSelector />
    </div>
  </nav>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import LanguageSelector from "../views/LanguageSelector.vue";

const navbar = ref(null);

const handleScroll = () => {
  if (window.scrollY > 50) {
    navbar.value?.classList.add("fixed-navbar");
  } else {
    navbar.value?.classList.remove("fixed-navbar");
  }
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = navbar.value?.offsetHeight || 0;
    const offsetTop =
      element.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

  
  <style scoped>
/* Trạng thái bình thường */
.navigation-bar {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1137px;
  padding: 10px;
  align-items: center;
  gap: 40px 100px;
  flex-wrap: wrap;
  transition: all 0.3s ease-in-out; /* Hiệu ứng mượt */
  margin-left: 60px;
}

/* Khi cuộn xuống: navbar dính vào trên */
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 30px;
  width: 100%;
  background: #fff;
  z-index: 1000;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-left: 60px;
  border-radius: 10px;
}

body {
  padding-top: 70px;
}

.logo {
  aspect-ratio: 2.84;
  object-fit: contain;
  object-position: center;
  width: 108px;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex-shrink: 0;
}

.nav-container {
  align-self: stretch;
  display: flex;
  min-width: 240px;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  gap: 40px 83px;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 777px;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  width: 100%;
  padding: 3px 160px;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
}

.navbar-item,
.about,
.service,
.work,
.contact {
  flex: 1;
  text-align: center;
}

.nav-button,
.nav-button-active {
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  color: rgba(0, 0, 0, 1);
}
</style>
  