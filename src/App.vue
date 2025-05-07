<template>
  <div class="container">
    <NavigationBar v-if="!isAuthPage" />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <Footer v-if="!isAuthPage" />
    <MessengerButton v-if="!isAuthPage" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavigationBar from "./views/NavigationBar.vue";
import Footer from "./views/Footer.vue";
import MessengerButton from "./components/MessengerButton.vue";

const route = useRoute();
const isAuthPage = computed(
  () => route.path === "/login" || route.path.startsWith("/admin")
);
</script>
