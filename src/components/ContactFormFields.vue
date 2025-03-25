<template>
  <section class="form-section">
    <form class="contact-form" @submit.prevent="submitForm">
      <!-- Name Row -->
      <div class="form-row">
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

      <!-- Contact Row -->
      <div class="form-row">
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

      <!-- Subject Section -->
      <fieldset class="subject-section">
        <legend class="field-label">{{ $t("subjectTitle") }}</legend>
        <div class="radio-options">
          <label class="radio-label">
            <input
              type="radio"
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
              value="production"
              v-model="formData.subject"
              class="radio-input"
            />
            <span class="radio-custom"></span>
            <span>{{ $t("subjectdetail2") }}</span>
          </label>
        </div>
      </fieldset>

      <!-- Message Section -->
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

      <!-- Submit Button -->
      <button type="submit" class="submit-button">
        <span>{{ $t("contact_button") }}</span>
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

/* Modify the checked state */
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

/* Update the radio custom styles */
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