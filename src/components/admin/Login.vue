<template>
  <div class="login-container">
    <h2>Đăng nhập Admin</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Mật khẩu"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
      </button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMsg = ref("");
const router = useRouter();
const loading = ref(false);

const login = async () => {
  if (!email.value || !password.value) {
    errorMsg.value = "Vui lòng nhập email và mật khẩu!";
    return;
  }

  try {
    loading.value = true;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;

    if (user) {
      // ✅ Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem("user", JSON.stringify({ isLoggedIn: true }));
      router.push("/admin"); // Chuyển đến trang admin sau khi đăng nhập thành công
    }
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        errorMsg.value = "Email không hợp lệ!";
        break;
      case "auth/user-not-found":
        errorMsg.value = "Tài khoản không tồn tại!";
        break;
      case "auth/wrong-password":
        errorMsg.value = "Sai mật khẩu!";
        break;
      default:
        errorMsg.value = "Đăng nhập thất bại. Vui lòng thử lại!";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  width: 320px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: white;
}

h2 {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
