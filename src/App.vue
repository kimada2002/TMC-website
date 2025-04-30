<template>
  <div class="container">
    <NavigationBar v-if="!isAuthPage" />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <Footer v-if="!isAuthPage" />
  </div>
  <div>
    <ChatBot v-if="isOpen" @close="isOpen = false" />

    <button v-if="!isOpen" class="chat-button" @click="isOpen = true">
      💬
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavigationBar from "./views/NavigationBar.vue";
import Footer from "./views/Footer.vue";
import ChatBot from "./components/ChatBot.vue";

const isOpen = ref(false)
const route = useRoute();
const isAuthPage = computed(
  () => route.path === "/login" || route.path.startsWith("/admin")
);
</script>
<style scoped>
.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;
}

.chat-button:hover {
  background-color: #006edc;
}
</style>