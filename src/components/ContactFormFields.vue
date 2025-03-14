<template>
  <section class="form-section">
    <form class="contact_info-form" @submit.prevent="submitForm">
      <div class="name-row">
        <div class="form-group">
          <input
            type="text"
            v-model="formData.firstName"
            :placeholder="$t('first_name')"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="formData.lastName"
            :placeholder="$t('last_name')"
            class="form-input"
            required
          />
        </div>
      </div>
      <div class="contact-row">
        <div class="form-group">
          <input
            type="email"
            v-model="formData.email"
            placeholder="Email"
            class="form-input"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="tel"
            v-model="formData.phone"
            :placeholder="$t('phone')"
            class="form-input"
            required
          />
        </div>
      </div>
      <fieldset class="subject-section">
        <legend class="field-label">{{ $t("subjectTitle") }}</legend>
        <div class="radio-options">
          <label class="radio-label">
            <input
              type="radio"
              id="design"
              name="subject"
              value="design"
              v-model="formData.subject"
              class="radio-input"
            />
            <span class="radio-custom"></span>
            <span>{{ $t("subjectdetail1") }}</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              id="production"
              name="subject"
              value="production"
              v-model="formData.subject"
              class="radio-input"
            />
            <span class="radio-custom"></span>
            <span>{{ $t("subjectdetail2") }}</span>
          </label>
        </div>
      </fieldset>
      <div class="message-section">
        <label for="message" class="field-label">{{ $t("message") }}</label>
        <textarea
          id="message"
          v-model="formData.message"
          :placeholder="$t('message_des')"
          class="message-textarea"
          required
        ></textarea>
      </div>
      <button type="submit" class="submit-button">
        <span>{{ $t("contact_button") }}</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/011c2a2381f1f9a864b116d36a52c0534d40a4bf8c327ce21f6773d65b0034d3?placeholderIfAbsent=true&apiKey=95c80afda8b5482fbb49e2c75fe75473"
          class="send-icon"
          alt="Send icon"
        />
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import emailjs from "emailjs-com";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

const { t } = useI18n();

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const submitForm = async () => {
  try {
    await emailjs.send(
      "nqnhatdz008", // Service ID
      "template_g354xgk", // Template ID
      formData.value,
      "WlORgExyaUS_YPdn7" // User ID
    );

    Swal.fire({
      icon: "success",
      title: t("mail_notification_title_success"),
      text: t("mail_notification_text_success"),
    });

    resetForm();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: t("mail_notification_title_fail"),
      text: t("mail_notification_text_fail"),
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
};
</script>

<style scoped>
.form-section {
  flex: 1.5;
}

.contact_info-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.name-row {
  display: flex;
  gap: 20px;
}

@media (max-width: 991px) {
  .name-row {
    flex-direction: column;
  }
}

.form-group {
  flex: 1;
}

.form-input {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #888;
  font-size: 16px;
  outline: none;
  background: transparent;
}

@media (max-width: 640px) {
  .form-input {
    padding: 10px;
  }
}

.contact-row {
  display: flex;
  gap: 20px;
}

@media (max-width: 991px) {
  .contact-row {
    flex-direction: column;
  }
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
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 18px;
}

.radio-options {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  cursor: pointer;
}

.radio-input {
  display: none;
}

.radio-input:checked + .radio-custom {
  background-color: #4040ff; /* Màu nền khi được chọn */
  border-color: #4040ff; /* Màu viền khi được chọn */
}

.radio-input:checked + .radio-custom::after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background-color: white; /* Màu dấu tích */
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 50%;
  position: relative;
}

.message-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-textarea {
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #888;
  font-size: 16px;
  outline: none;
  background: transparent;
}

@media (max-width: 640px) {
  .message-textarea {
    padding: 10px;
  }
}

.submit-button {
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background-color: #4040ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #fff;
  color: #000;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

@media (max-width: 640px) {
  .submit-button {
    width: 100%;
  }
}

.send-icon {
  font-size: 18px;
}

.submit-button:hover .send-icon {
  filter: invert(1);
}
</style>