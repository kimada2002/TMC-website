<template>
  <section class="form-section">
    <form class="contact-form" @submit.prevent="submitForm">
      <!-- Name Row -->
      <div class="form-row">
        <div class="form-group">
          <input
            type="text"
            v-model="formData.firstName"
            :placeholder="t('form.firstName')"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="formData.lastName"
            :placeholder="t('form.lastName')"
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
            :placeholder="t('form.email')"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="tel"
            v-model="formData.phone"
            :placeholder="t('form.phone')"
            class="form-input"
            required
          />
        </div>
      </div>

      <!-- Subject Section -->
      <fieldset class="subject-section">
        <legend class="field-label">
          {{ t("form.subject") }}
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
            <span>{{ t("form.subjects.design") }}</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="production"
              v-model="formData.subject"
              class="radio-input"
            />
            <span class="radio-custom"></span>
            <span>{{ t("form.subjects.production") }}</span>
          </label>
        </div>
      </fieldset>

      <!-- Message Section -->
      <div class="message-section">
        <label for="message" class="field-label">
          {{ t("form.message") }}
        </label>
        <textarea
          id="message"
          v-model="formData.message"
          :placeholder="t('form.messagePlaceholder')"
          class="message-textarea"
          required
        ></textarea>
      </div>

      <!-- Captcha Verification -->
      <div class="form-row">
        <div class="form-group">
          <label class="field-label">
            {{ t("form.verificationCode") }}
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
            :placeholder="t('form.verificationCodePlaceholder')"
            class="form-input"
            required
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">
        <span>{{ t("form.submit") }}</span>
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
import { useI18n } from "vue-i18n";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const { t } = useI18n(); // Sử dụng hàm t từ vue-i18n

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
      title: t("form.invalidCode"),
      text: t("form.invalidCodeMessage"),
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
      title: t("form.successTitle"),
      text: t("form.successMessage"),
    });

    resetForm();
    generateCaptcha();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: t("form.errorTitle"),
      text: t("form.errorMessage"),
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
