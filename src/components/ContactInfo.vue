<template>
  <aside class="contact-info">
    <h2 class="contact-title">
      {{ lang === "vi" ? "Liên Hệ" : "Contact" }}
    </h2>
    <p class="contact-subtitle">
      {{
        lang === "vi"
          ? "Hãy để chúng tôi đồng hành cùng thiết kế của bạn"
          : "Let’s us accompany your design"
      }}
    </p>
    <div class="contact-details">
      <div class="contact-item">
        <img
          src="@/assets/images/Contact/viber.png"
          class="icon"
          alt="Phone icon"
        />
        <div class="phone-numbers">
          <span>(84-8) 3930 3792</span>
          <span>(84-8) 3930 4339</span>
        </div>
      </div>
      <div class="contact-item">
        <img
          src="@/assets/images/Contact/email.png"
          class="icon"
          alt="Email icon"
        />
        <span>info@thienminhhad.com</span>
      </div>
      <div class="contact-item">
        <img
          src="@/assets/images/Contact/location.png"
          class="icon address-icon"
          alt="Address icon"
        />
        <span>{{
          lang === "vi"
            ? "14 Nguyễn Thị Diệu , phường Võ Thị Sáu, Quận 3, thành phố Hồ Chí Minh"
            : "14 Nguyen Thi Dieu Steet , Vo Thi Sau, District 3, Ho Chi Minh City"
        }}</span>
      </div>
      <div class="map-container">
        <a
          href="https://www.google.com/maps/place/14+Nguy%E1%BB%85n+Th%E1%BB%8B+Di%E1%BB%87u,+Ph%C6%B0%E1%BB%9Dng+6,+Qu%E1%BA%ADn+3,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="@/assets/images/Contact/map.png"
            alt="Location map"
            class="map-image"
          />
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const lang = localStorage.getItem("lang") || "vi";
</script>

<style scoped>
.contact-info {
  flex: 1;
  background-color: #000;
  color: #fff;
  padding: 30px;
  border-radius: 8px;
}

.contact-title {
  font-family: "Inter", sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin: 8px 0;
}

.contact-subtitle {
  color: var(--gray);
  opacity: 0.5;
  margin-bottom: 12px;
  font-size: 14px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 12px; /* giảm gap giữa các mục */
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px; /* giảm khoảng cách icon và text */
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.phone-numbers {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 14px;
}

.map-container {
  margin-top: 16px; /* giảm khoảng cách */
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.map-image {
  width: 100%;
  height: 150px; /* giảm chiều cao bản đồ */
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .contact-info {
    padding: 16px;
  }

  .contact-title {
    font-size: 20px;
  }

  .contact-subtitle {
    font-size: 13px;
  }

  .map-image {
    height: 120px;
  }
}
</style>
