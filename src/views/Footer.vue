<template>
  <footer class="footer">
    <!-- Phần giới thiệu -->
    <div class="footer-intro">
      <img
        src="@/assets/images/TMC-logo.png"
        class="company-logo"
        alt="Company Logo"
      />
      <p class="tagline">
        {{
          lang === "vi"
            ? "Liên hệ với chúng tôi để tạo ra điều bạn mong muốn hôm nay."
            : "Contact us to create what you desire today."
        }}
      </p>
      <div class="copyright">
        {{
          lang === "vi" ? "© 2003 Công ty TNHH T.M.C" : "© 2003 T.M.C Co., Ltd"
        }}
      </div>
    </div>

    <!-- Phần Explore -->
    <div class="footer-explore">
      <h3 class="section-title">
        {{ lang === "vi" ? "Khám phá" : "Explore" }}
      </h3>
      <div class="explore-grid">
        <div class="explore-column">
          <a href="/about" class="explore-link">
            {{ lang === "vi" ? "Về chúng tôi" : "About Us" }}
          </a>
          <a href="/services" class="explore-link">
            {{ lang === "vi" ? "Dịch vụ" : "Services" }}
          </a>
          <a href="workflow" class="explore-link">
            {{ lang === "vi" ? "Quy trình" : "Workflow" }}
          </a>
          <a href="contact" class="explore-link">
            {{ lang === "vi" ? "Liên hệ" : "Contact" }}
          </a>
        </div>
      </div>
    </div>

    <!-- Phần Contact -->
    <div class="footer-contact">
      <h3 class="section-title">
        {{ lang === "vi" ? "Liên hệ" : "Contact" }}
      </h3>
      <p class="contact-info">
        {{
          lang === "vi"
            ? "14 Nguyễn Thị Diệu, P. Võ Thị Sáu, Q.3, TP.HCM"
            : "14 Nguyen Thi Dieu Street, Vo Thi Sau, District 3, Ho Chi Minh City"
        }}
      </p>
      <p class="contact-info">(84-8) 3930 3792</p>
      <p class="contact-info">info@thienminhhad.com</p>
    </div>
  </footer>
</template>

<script setup>
const lang = localStorage.getItem("lang") || "vi";
</script>

<style scoped>
/* === Base Styles === */
.footer {
  font-family: "Arial", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 20px; /* Giảm padding dưới để chừa chỗ cho copyright */
  display: grid;
  gap: 40px;
  color: #333;
  position: relative;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* === Brand Section === */
.company-logo {
  width: 113px;
  aspect-ratio: 2.82;
  object-fit: contain;
}

.tagline {
  font-size: 16px;
  line-height: 1.5;
  max-width: 400px;
}

/* === Explore Section === */
.explore-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.explore-link {
  display: block;
  margin-bottom: 12px;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.explore-link:hover {
  color: #ff0000;
}

/* === Contact Section === */
.contact-info {
  margin-bottom: 12px;
  line-height: 1.5;
}

/* === Copyright === */
.copyright {
  grid-column: 1 / -1;
  text-align: left;
  padding-top: 30px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #666;
}

/* === Responsive === */
@media (min-width: 768px) {
  .footer {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 60px;
    padding-bottom: 30px;
  }

  .section-title {
    font-size: 20px;
  }

  .brand-name {
    font-size: 28px;
  }

  .copyright {
    margin-top: 20px;
  }
}

@media (max-width: 480px) {
  .explore-grid {
    grid-template-columns: 1fr;
  }

  .copyright {
    font-size: 12px;
    padding-top: 30px;
  }
}
</style>