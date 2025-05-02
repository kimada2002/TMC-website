<template>
  <div class="chat-container">
    <div class="chat-header">
      <span>Chatbot</span>
      <button class="close-btn" @click="$emit('close')">✖</button>
    </div>

    <div class="chat-messages">
      <div v-for="msg in messages" :key="msg.id" :class="msg.sender">
        <p>{{ msg.text }}</p>
      </div>
    </div>

    <div class="chat-input">
      <input
        v-model="input"
        @keyup.enter="handleSend"
        placeholder="Nhập câu hỏi..."
      />
      <button @click="handleSend">Gửi</button>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const input = ref("");
const messages = ref([
  { id: 1, sender: "bot", text: "Chào bạn! Hãy đặt câu hỏi." },
]);

let dataFromFirebase = [];

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "faq"));
  dataFromFirebase = querySnapshot.docs.map((doc) => doc.data());
});

function handleSend() {
  if (!input.value.trim()) return;
  const question = input.value;
  messages.value.push({ id: Date.now(), sender: "user", text: question });
  input.value = "";

  const found = dataFromFirebase.find((item) =>
    question.toLowerCase().includes(item.title.toLowerCase())
  );

  const answer = found
    ? found.content
    : "Xin lỗi, tôi chưa có thông tin về câu hỏi này.";

  messages.value.push({ id: Date.now() + 1, sender: "bot", text: answer });
}
</script>
  
  <style scoped>
.chat-container {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
}

.chat-header {
  background: #0084ff;
  color: white;
  padding: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background: #f5f5f5;
}

.user {
  text-align: right;
  margin: 5px 0;
}

.bot {
  text-align: left;
  margin: 5px 0;
}

.chat-input {
  display: flex;
  padding: 10px;
  background: #eee;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
}

.chat-input button {
  background: #0084ff;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
  