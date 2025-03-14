<template>
  <aside class="contact-info">
    <h1 class="contact-title">{{ $t("contact_us") }}</h1>
    <p class="contact-subtitle">{{ $t("contactTitle") }}</p>
    <div class="contact-details">
      <div class="contact-item">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0f717fb61a1ba7ddccc6138268be5d76601d88b26322690b2cb9bf7157dd942?placeholderIfAbsent=true&apiKey=95c80afda8b5482fbb49e2c75fe75473"
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
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f33a12af71453b99485ac9031fecc220eb9409e1999afd1ffbb8eef1e6b8f8f2?placeholderIfAbsent=true&apiKey=95c80afda8b5482fbb49e2c75fe75473"
          class="icon"
          alt="Email icon"
        />
        <span>info@thienminhhad.com</span>
      </div>
      <div class="contact-item">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a95236edbb272ad63891b22868a195f09637d663fca1420ca3cc4475295718e?placeholderIfAbsent=true&apiKey=95c80afda8b5482fbb49e2c75fe75473"
          class="icon address-icon"
          alt="Address icon"
        />
        <span>
          {{ $t("contactAdd") }}
        </span>
      </div>
      <div class="map-container">
        <a
          href="https://www.google.com/maps/place/14+Nguy%E1%BB%85n+Th%E1%BB%8B+Di%E1%BB%87u,+Ph%C6%B0%E1%BB%9Dng+6,+Qu%E1%BA%ADn+3,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam/@10.7769373,106.6869031,17z/data=!3m1!4b1!4m6!3m5!1s0x31752f3ac28d806f:0xa7d917f3252929c6!8m2!3d10.776932!4d106.689478!16s%2Fg%2F11q2njsd_f?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../assets/images/map.png"
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

@media (max-width: 640px) {
  .contact-info {
    padding: 20px;
  }
}

.contact-title {
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
}

@media (max-width: 640px) {
  .contact-title {
    font-size: 24px;
  }
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

.contact-icon {
  font-size: 24px;
  color: #fff;
}

.phone-numbers {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: -10px;
}

.map-container {
  margin-top: 30px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

@media (max-width: 640px) {
  .map-container {
    height: 150px;
  }
}

.map-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
