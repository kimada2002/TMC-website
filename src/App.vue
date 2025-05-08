<template>
  <div class="container">
    <!-- Hiển thị NavigationBar nếu không phải trang auth -->
    <NavigationBar v-if="!isAuthPage" />

    <!-- Nội dung chính -->
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>

    <!-- Hiển thị Footer và MessengerButton nếu không phải trang auth -->
    <Footer v-if="!isAuthPage" />
    <MessengerButton v-if="!isAuthPage" />
  </div>
</template>

<script setup>
import { computed,  } from "vue";
import { useRoute } from "vue-router";

// Import các component
import NavigationBar from "./views/NavigationBar.vue";
import Footer from "./views/Footer.vue";
import MessengerButton from "./components/MessengerButton.vue";

// Lấy thông tin route hiện tại
const route = useRoute();

// Xác định trang auth
const isAuthPage = computed(
  () => route.path === "/login" || route.path.startsWith("/admin")
);

// Quản lý ngôn ngữ


</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

.language-switcher {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin: 8px 16px;
}

.language-switcher button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.language-switcher button.active {
  background-color: #007bff;
  color: white;
}

.language-switcher button:hover {
  background-color: #d0d0d0;
}
</style>
