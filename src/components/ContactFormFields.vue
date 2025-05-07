<template>
  <section class="form-section">
    <form class="contact-form" @submit.prevent="submitForm">
      <!-- Name Row -->
      <div class="form-row">
        <div class="form-group">
          <input
            type="text"
            v-model="formData.firstName"
            :placeholder="lang === 'vi' ? 'Họ' : 'First Name'"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="formData.lastName"
            :placeholder="lang === 'vi' ? 'Tên' : 'Last Name'"
            class="form-input"
            required
          />
        </div>
      </div>

      <!-- Contact Row -->
      <div class="form-row">
        <div class="form-group">
          <input
            type="email"
            v-model="formData.email"
            :placeholder="lang === 'vi' ? 'Email' : 'Email'"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="tel"
            v-model="formData.phone"
            :placeholder="lang === 'vi' ? 'Số điện thoại' : 'Phone'"
            class="form-input"
            required
          />
        </div>
      </div>

      <!-- Subject Section -->
      <fieldset class="subject-section">
        <legend class="field-label">
          {{ lang === "vi" ? "Chủ đề liên hệ" : "Subject" }}
        </legend>
        <div class="radio-options">
          <label class="radio-label">
            <input
              type="radio"
              value="design"
              v-model="formData.subject"
              class="radio-input"
            />
            <span class="radio-custom"></span>
            <span>{{ lang === "vi" ? "Thiết kế" : "Design" }}</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="production"
              v-model="formData.subject"
              class="radio-input"
            />
            <span class="radio-custom"></span>
            <span>{{ lang === "vi" ? "Sản xuất" : "Production" }}</span>
          </label>
        </div>
      </fieldset>

      <!-- Message Section -->
      <div class="message-section">
        <label for="message" class="field-label">
          {{ lang === "vi" ? "Nội dung" : "Message" }}
        </label>
        <textarea
          id="message"
          v-model="formData.message"
          :placeholder="
            lang === 'vi'
              ? 'Nhập nội dung tin nhắn...'
              : 'Enter your message...'
          "
          class="message-textarea"
          required
        ></textarea>
      </div>

      <!-- Captcha Verification -->
      <div class="form-row">
        <div class="form-group">
          <label class="field-label">
            {{ lang === "vi" ? "Mã xác thực" : "Verification Code" }}
          </label>
          <div class="captcha-box">
            <span class="captcha-code">{{ captchaCode }}</span>
            <button
              type="button"
              @click="generateCaptcha"
              class="refresh-button"
            >
              🔄
            </button>
          </div>
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="userCaptchaInput"
            :placeholder="lang === 'vi' ? 'Nhập mã xác thực' : 'Enter verification code'"
            class="form-input"
            required
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">
        <span>{{ lang === "vi" ? "Gửi liên hệ" : "Send Message" }}</span>
        <img
          src="../assets/images/Contact/touch-screen.png"
          class="send-icon"
          alt="Send icon"
        />
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const lang = localStorage.getItem("lang") || "vi";

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const captchaCode = ref("");
const userCaptchaInput = ref("");

const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  captchaCode.value = Array.from(
    { length: 5 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

onMounted(() => {
  generateCaptcha();
});

const submitForm = async () => {
  if (userCaptchaInput.value.trim().toUpperCase() !== captchaCode.value) {
    Swal.fire({
      icon: "warning",
      title: lang === "vi" ? "Sai mã xác thực" : "Invalid Code",
      text:
        lang === "vi"
          ? "Vui lòng nhập đúng mã xác thực."
          : "Please enter the correct verification code.",
    });
    generateCaptcha();
    return;
  }

  try {
    await emailjs.send(
      "nqnhatdz008",
      "template_g354xgk",
      formData.value,
      "WlORgExyaUS_YPdn7"
    );

    Swal.fire({
      icon: "success",
      title: lang === "vi" ? "Gửi thành công!" : "Sent successfully!",
      text:
        lang === "vi"
          ? "Chúng tôi sẽ liên hệ với bạn sớm nhất."
          : "We will contact you as soon as possible.",
    });

    resetForm();
    generateCaptcha();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: lang === "vi" ? "Gửi thất bại!" : "Failed to send!",
      text:
        lang === "vi"
          ? "Đã xảy ra lỗi khi gửi email. Vui lòng thử lại sau."
          : "There was an error sending the email. Please try again later.",
    });
  }
};

const resetForm = () => {
  formData.value = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };
  userCaptchaInput.value = "";
};
</script>

<style scoped>
.form-section {
  flex: 1.5;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
  margin-top: var(--spacing-8);
}

.form-row {
  display: flex;
  gap: var(--spacing-5);
}

@media (max-width: 991px) {
  .form-row {
    flex-direction: column;
  }
}

.form-group {
  flex: 1;
}

.form-input,
.message-textarea {
  width: 100%;
  padding: 10px 0;
  font-size: var(--text-base);
  border: none;
  border-bottom: 1px solid var(--gray);
  outline: none;
  resize: none;
}

.subject-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: none;
  padding: 0;
  margin: 0;
}

.field-label {
  font-family: var(--font-primary);
}

.radio-options {
  display: flex;
  gap: var(--spacing-5);
  margin-top: var(--spacing-2);
}

.radio-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--text-base);
  cursor: pointer;
}

.radio-input {
  display: none;
}

.radio-input:checked + .radio-custom {
  background-color: var(--black);
  border-color: var(--black);
}

.radio-input:checked + .radio-custom::after {
  content: "✓";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--white);
  font-size: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--black);
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
  background-color: var(--white);
}

.message-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.submit-button {
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: var(--spacing-3) var(--spacing-6);
  background-color: var(--blue);
  color: var(--white);
  border: none;
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: var(--white);
  color: var(--black);
  box-shadow: 0 var(--spacing-1) var(--spacing-1) rgba(0, 0, 0, 0.25);
}

@media (max-width: 991px) {
  .submit-button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
}

.send-icon {
  font-size: 18px;
}

.submit-button:hover .send-icon {
  filter: invert(1);
}

.captcha-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.captcha-code {
  padding: 5px 10px;
  background-color: var(--gray-light);
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 18px;
  border-radius: 4px;
  user-select: none;
}

.refresh-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
