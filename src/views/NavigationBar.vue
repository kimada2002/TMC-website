<template>
  <nav ref="navbar" class="navigation-bar">
    <!-- Logo Desktop -->
    <img
      src="@/assets//images/TMC-logo.png"
      class="logo desktop-logo"
      alt="Desktop Logo"
    />

    <!-- Hamburger Icon -->
    <button class="hamburger" @click="toggleMenu">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <!-- Nav Container -->
    <div class="nav-container" :class="{ active: isMenuOpen }">
      <!-- Logo Mobile (Chỉ hiển thị khi menu mở) -->
      <img
        src="@/assets//images/TMC-logo.png"
        class="logo mobile-logo"
        alt="Mobile Logo"
      />

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
import LanguageSelector from "@/views/LanguageSelector.vue";

const navbar = ref(null);
const isMenuOpen = ref(false);

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
    isMenuOpen.value = false; // Đóng menu sau khi nhấp vào nút
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
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
  margin-left: 95px;
}

.fixed-navbar {
  position: fixed;
  top: 0;
  left: 20px;
  width: 100%;
  max-width: 1137px; 
  background: #fff;
  z-index: 1000;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-left: 75px;
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

.desktop-logo {
  display: block; 
}

.mobile-logo {
  display: none; 
  width: 80px;
  margin-bottom: 20px;
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
  z-index: 1000;
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

.nav-button {
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

.hamburger {
  display: none; 
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: #000;
  transition: all 0.3s ease;
}

@media (max-width: 991px) {
  .navigation-bar {
    justify-content: space-between;
    background-color: rgba(250, 250, 250, 0);
    width: 85%;
    padding: 10px 20px;
    margin-left: 10px;
  }

  .fixed-navbar {
    width: 85%;
    max-width: none;
    margin-left: -10px;
  }

  .hamburger {
    display: flex; 
  }

  .desktop-logo {
    display: none; 
  }

  .mobile-logo {
    display: block;
    width: 80px;
  }

  .nav-container {
    display: none;
    width: 80%;
    flex-direction: column;
    background: #fff;
    position: absolute;
    top: 100%;
    left: 0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 10px;
  }

  .navbar {
    margin-top: -50px;
  }

  .nav-container.active {
    display: flex;
    width: 95%;
  }

  .navbar {
    flex-direction: column;
    padding: 0;
  }

  .navbar-item,
  .about,
  .service,
  .work,
  .contact {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
