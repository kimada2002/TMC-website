<template>
    <footer class="footer">
      <section class="company-info">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/06dfb5eb8301f0b6070fecb524ad3dfde1e005c0c1ad8923954a36ec8c414c2e?placeholderIfAbsent=true&apiKey=95c80afda8b5482fbb49e2c75fe75473"
          class="company-logo"
          alt="Company Logo"
        />
        <p class="company-tagline">
          Highly experienced in design, creating quality products.
        </p>
        <hr class="divider" />
        <p class="copyright">© 2003 T.M.C Co., Ltd</p>
      </section>
  
      <section class="social-contact">
        <h3 class="social-heading">Follow us</h3>
        <div class="social-icons">
          <a href="#" aria-label="Facebook">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/32c6fca215ef6120313ae6da4a8bfcb773e98957c4a8e67d1bf05b75b059ca8c?placeholderIfAbsent=true&apiKey=95c80afda8b5482fbb49e2c75fe75473"
              class="social-icon"
              alt="Facebook"
            />
          </a>
          <a href="#" aria-label="Twitter">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e7412bda20f6fd7508455356ffdfdc84196da13dca8f8d7ea87728cb65152bc?placeholderIfAbsent=true&apiKey=95c80afda8b5482fbb49e2c75fe75473"
              class="social-icon"
              alt="Twitter"
            />
          </a>
          <a href="#" aria-label="Instagram">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ce677eab5e27611b82dac611714f71fa3b2a71ae156f69580d9fdb0966e268d?placeholderIfAbsent=true&apiKey=95c80afda8b5482fbb49e2c75fe75473"
              class="social-icon"
              alt="Instagram"
            />
          </a>
        </div>
        <h3 class="contact-heading">Call us</h3>
        <p class="phone-number">(84-8) 3930 3792</p>
        <p class="phone-number">(84-8) 3930 4339</p>
      </section>
  
      <nav class="footer-menu production-menu">
        <h3 class="menu-heading">Production</h3>
        <a href="#" class="menu-link">Digital Printing</a>
        <a href="#" class="menu-link">Offset Printing</a>
        <a href="#" class="menu-link">Digital Offset</a>
        <a href="#" class="menu-link">POP/POSM</a>
        <a href="#" class="menu-link">Interior/Exterio</a>
      </nav>
  
      <nav class="footer-menu design-menu">
        <h3 class="menu-heading">Design - Creatives</h3>
        <a href="#" class="menu-link">BrandingKeyVisual</a>
        <a href="#" class="menu-link">POP/POSM</a>
        <a href="#" class="menu-link">Interior/ExteriorDesign</a>
      </nav>
  
      <nav class="footer-menu company-menu">
        <h3 class="menu-heading">Company</h3>
        <a href="#" class="menu-link">About</a>
        <a href="#" class="menu-link">Service</a>
        <a href="#" class="menu-link">Work</a>
        <a href="#" class="menu-link">Contact</a>
      </nav>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background-color: rgba(0, 0, 0, 1);
    display: flex;
    padding-left: 32px;
    padding-right: 80px;
    padding-top: 33px;
    padding-bottom: 59px;
    align-items: start;
    gap: 40px 92px;
    flex-wrap: wrap;
  }
  @media (max-width: 991px) {
    .footer {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .company-info {
    display: flex;
    flex-direction: column;
    align-items: start;
    font-family:
      Roboto,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
  }
  .company-logo {
    aspect-ratio: 2.82;
    object-fit: contain;
    object-position: center;
    width: 113px;
    max-width: 100%;
  }
  .company-tagline {
    color: rgba(251, 255, 254, 1);
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin-top: 20px;
  }
  .divider {
    border-color: rgba(251, 255, 254, 1);
    border-style: solid;
    border-width: 1px;
    align-self: stretch;
    margin-top: 23px;
    flex-shrink: 0;
    width: 100%;
  }
  .copyright {
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    margin-top: 25px;
  }
  .social-contact {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: start;
  }
  .social-heading {
    color: rgba(251, 255, 254, 1);
    font-size: 16px;
    font-family:
      Roboto,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-weight: 700;
  }
  .social-icons {
    display: flex;
    margin-top: 14px;
    align-items: start;
    gap: 16px;
    justify-content: start;
  }
  .social-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
    flex-shrink: 0;
  }
  .contact-heading {
    color: rgba(251, 255, 254, 1);
    font-size: 16px;
    font-family:
      Roboto,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-weight: 700;
    margin-top: 32px;
  }
  .phone-number {
    color: #fff;
    font-family:
      Poppins,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 16px;
    font-weight: 400;
    align-self: stretch;
    margin-top: 12px;
  }
  .phone-number:first-of-type {
    margin-top: 12px;
  }
  .phone-number:not(:first-of-type) {
    margin-top: 0;
  }
  @media (max-width: 991px) {
    .phone-number:first-of-type {
      margin-right: 2px;
    }
  }
  .footer-menu {
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    align-items: stretch;
    font-family:
      Roboto,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 14px;
    color: #fff;
    font-weight: 400;
  }
  .menu-heading {
    font-size: 18px;
    font-weight: 700;
  }
  @media (max-width: 991px) {
    .production-menu .menu-heading {
      margin-right: 5px;
    }
  }
  .menu-link {
    color: #fff;
    text-decoration: none;
    margin-top: 16px;
  }
  .menu-link:first-of-type {
    margin-top: 32px;
  }
  @media (max-width: 991px) {
    .production-menu .menu-link:nth-of-type(1) {
      margin-right: 2px;
    }
    .production-menu .menu-link:nth-of-type(2) {
      margin-right: 3px;
    }
  }
  .company-menu {
    white-space: nowrap;
  }
  @media (max-width: 991px) {
    .company-menu {
      white-space: initial;
    }
    .design-menu .menu-link:last-child {
      margin-right: 8px;
    }
  }
  </style>
  