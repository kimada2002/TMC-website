<template>
  <nav ref="navbar" :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="nav-left">
      <div class="logo">
        <img
          src="@/assets/images/TMC-logo.png"
          alt="Desktop Logo"
        />
      </div>
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
      <!-- <button v-if="!isLoggedIn" class="nav-button" @click="goToLogin">
        Login
      </button> -->
    </div>

    <div class="nav-right">
      <LanguageSelector />
      <button class="menu-toggle" @click="toggleMenu">☰</button>

      <!-- Admin Page -->
      <button v-if="isLoggedIn" class="admin-button" @click="goToAdmin">
        Admin
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LanguageSelector from "./LanguageSelector.vue";

const isMenuOpen = ref(false);
const navbar = ref(null);
const isLoggedIn = ref(false);
const isScrolled = ref(false);
const router = useRouter();

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

// Kiểm tra trạng thái đăng nhập từ Firebase
onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user; 
  });

  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 0;
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 0;
  });
});

// const goToLogin = () => {
//   router.push("/login");
// };

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
  background: white ;
  padding: 10px 20px;
  transition: all 0.3s ease;
  z-index: 1000;
}

.navbar-scrolled {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo img {
  max-width: 90px;
}

.nav-right {
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

.nav-button:hover::after {
  width: calc(80% - 40px); /* 40px accounts for the padding */
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
  
  .logo img{
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

  .admin-button{
    font-size: var(--text-xs);
    padding: 8px 12px;
  }
  
}
</style>