<template>
  <div class="admin-container">
    <h2>Thêm câu hỏi cho ChatBot</h2>

    <form @submit.prevent="addFaq">
      <label for="title">Câu hỏi:</label>
      <input
        v-model="title"
        id="title"
        required
        placeholder="Nhập câu hỏi..."
      />

      <label for="content">Trả lời:</label>
      <textarea
        v-model="content"
        id="content"
        required
        placeholder="Nhập câu trả lời..."
      ></textarea>

      <button type="submit">Lưu vào Firebase</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore"; // ✅ import đúng chỗ

const title = ref("");
const content = ref("");
const successMessage = ref("");

const addFaq = async () => {
  try {
    await addDoc(collection(db, "faq"), {
      title: title.value.trim(),
      content: content.value.trim(),
    });
    successMessage.value = "Đã thêm thành công!";
    title.value = "";
    content.value = "";
    setTimeout(() => (successMessage.value = ""), 3000);
  } catch (err) {
    console.error("Lỗi khi thêm:", err);
    successMessage.value = "Lỗi khi thêm dữ liệu.";
  }
};
</script>
  
  <style scoped>
.admin-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  background: #0084ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.success {
  color: green;
  margin-top: 15px;
}
</style>
  