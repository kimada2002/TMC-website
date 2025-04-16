<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-image">
        <img src="@/assets/images/login-image.png" alt="Login Image">
      </div>
      
      <div class="login-card">
        <h1 class="login-title">Đăng Nhập</h1>
        <p class="login-subtitle">Vui lòng điền thông tin </p>

        <div v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email đăng nhập</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-input"
              placeholder="Nhập Email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Mật khẩu</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-input"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" class="signin-button" :disabled="loading">
            <span v-if="!loading">Đăng nhập</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </form>
      </div>
    </div>
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
    errorMsg.value = "Please enter email and password!";
    return;
  }

  try {
    loading.value = true;
    errorMsg.value = "";
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = userCredential.user;

    if (user) {
      localStorage.setItem("user", JSON.stringify({ isLoggedIn: true }));
      router.push("/admin");
    }
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        errorMsg.value = "Invalid email!";
        break;
      case "auth/user-not-found":
        errorMsg.value = "Account not found!";
        break;
      case "auth/wrong-password":
        errorMsg.value = "Wrong password!";
        break;
      default:
        errorMsg.value = "Login failed. Please try again!";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.login-container {
  display: flex;
  max-width: 900px; /* Điều chỉnh theo nhu cầu */
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.login-image {
  flex: 1;
  background-color: #f0f2f5;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.login-card {
  flex: 1;
  background: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333;
}

.login-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}

.error-message {
  color: #d32f2f;
  background-color: #fde8e8;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #4285f4;
  outline: none;
}

.form-input::placeholder {
  color: #aaa;
}

.signin-button {
  width: 100%;
  padding: 12px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
}

.signin-button:hover:not(:disabled) {
  background-color: #3367d6;
}

.signin-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    max-width: 400px;
  }
  
  .login-image {
    height: 200px; /* Chiều cao hình ảnh trên mobile */
  }
}
</style>