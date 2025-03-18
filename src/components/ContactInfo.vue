<template>
  <aside class="contact-info">
    <h1 class="contact-title">{{ $t("contact_us") }}</h1>
    <p class="contact-subtitle">{{ $t("contactTitle") }}</p>
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
        <span>{{ $t("contactAdd") }}</span>
      </div>
      <div class="map-container">
        <a
          href="https://www.google.com/maps/place/14+Nguy%E1%BB%85n+Th%E1%BB%8B+Di%E1%BB%87u,+Ph%C6%B0%E1%BB%9Dng+6,+Qu%E1%BA%ADn+3,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7769373,106.6869031,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f3ac28d806f:0xa7d917f3252929c6!8m2!3d10.776932!4d106.689478!16s%2Fg%2F11q2njsd_f?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
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

<style scoped>
.contact-info {
  flex: 1;
  background-color: #000;
  color: #fff;
  padding: 40px;
  border-radius: 8px;
}

.contact-title {
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: 600;
  margin: 10px 0;
}

.contact-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #888;
  margin-bottom: 40px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  font-family: "Inter", sans-serif;
}

.icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.phone-numbers {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.map-container {
  margin-top: 30px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.map-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 640px) {
  .contact-info {
    padding: 20px;
  }

  .contact-title {
    font-size: 24px;
  }

  .map-container {
    height: 150px;
  }

  .map-image {
    height: 150px;
  }
}
</style>