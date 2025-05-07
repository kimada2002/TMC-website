<template>
  <nav ref="navbar" class="navbar">
    <div class="nav-left">
      <div class="logo">
        <img src="@/assets/images/TMC-logo.png" alt="Desktop Logo" />
      </div>
    </div>

    <div :class="['nav-container', { show: isMenuOpen }]">
      <router-link to="/" class="nav-button" @click="closeMenu">
        {{ $t("home") }}
      </router-link>
      <router-link to="/about" class="nav-button" @click="closeMenu">
        {{ $t("about") }}
      </router-link>
      <router-link to="/services" class="nav-button" @click="closeMenu">
        {{ $t("service") }}
      </router-link>
      <router-link to="/workflow" class="nav-button" @click="closeMenu">
        {{ $t("work") }}
      </router-link>
      <router-link to="/contact" class="nav-button" @click="closeMenu">
        {{ $t("contact1") }}
      </router-link>
    </div>

    <div class="nav-right">
      <LanguageSelector />
      <button class="menu-toggle" @click="toggleMenu">☰</button>
      <button
        v-if="isLoggedIn && isAdmin"
        class="admin-button"
        @click="goToAdmin"
      >
        Admin
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import LanguageSelector from "./LanguageSelector.vue";

const isMenuOpen = ref(false);
const isLoggedIn = ref(false);
const isAdmin = ref(false);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.isLoggedIn && user.role === "admin") {
    isLoggedIn.value = user.isLoggedIn;
    isAdmin.value = true;
  }
});

const goToAdmin = () => {
  router.push("/admin");
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  padding: 10px 20px;
  transition: all 0.3s ease;
  z-index: 1000;
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo img {
  margin-left: 10rem;
  max-width: 90px;
}

.nav-right {
  margin-right: 10rem;
  display: flex;
  gap: 15px;
  align-items: center;
}

.menu-toggle {
  font-size: 1.8rem;
  background: none;
  border: none;
  cursor: pointer;
  display: none;
}

.nav-container {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-grow: 1;
}

.nav-button {
  position: relative;
  padding: 10px 20px;
  background: none;
  opacity: 0.6;
  border: none;
  font-weight: var(--font-normal);
  font-size: var(--text-base);
  cursor: pointer;
  transition: all 0.3s ease-out;
  text-decoration: none;
  color: inherit;
}

.nav-button::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  top: 90%;
  left: 20px;
  background-color: var(--black);
  transition: all 0.3s ease-out;
}

.nav-button:hover {
  opacity: 1;
}

.nav-button:hover::after,
.nav-button.router-link-active::after {
  width: calc(80% - 40px);
}

.nav-button.router-link-active {
  opacity: 1;
}

.admin-button {
  background-color: var(--blue);
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.admin-button:hover {
  background-color: var(--white);
  color: var(--black);
  box-shadow: 0 var(--spacing-1) var(--spacing-1) rgba(0, 0, 0, 0.25);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .logo img {
    max-width: 40%;
  }

  .nav-container {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: auto;
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

  .nav-button::after {
    display: none;
  }

  .admin-button {
    font-size: var(--text-xs);
    padding: 8px 12px;
  }
}
</style>
