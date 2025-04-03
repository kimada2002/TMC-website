<template>
  <footer class="footer">
    <!-- Company Info Section -->
    <section class="company-info">
      <img
        src="@/assets/images/TMC-logo_white.png"
        class="company-logo"
        alt="Company Logo"
      />
      <p class="company-tagline">
        {{ $t("footer_detail") }}
      </p>
      <hr class="divider" />
      <p class="copyright">© 2003 T.M.C Co., Ltd</p>
    </section>

    <!-- Social & Contact Section -->
    <section class="social-contact">
      <h3 class="section-heading">{{ $t("follow") }}</h3>
      <div class="social-icons">
        <a aria-label="Facebook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="12" fill="#FBFFFE" />
            <path
              d="M16.7273 4H14.3471C13.295 4 12.286 4.42143 11.5421 5.17157C10.7981 5.92172 10.3802 6.93913 10.3802 8V10.4H8V13.6H10.3802V20H13.5537V13.6H15.9339L16.7273 10.4H13.5537V8C13.5537 7.78783 13.6373 7.58434 13.7861 7.43431C13.9349 7.28429 14.1367 7.2 14.3471 7.2H16.7273V4Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a aria-label="Twitter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="12" fill="#FBFFFE" />
            <path
              d="M19 5L10 14"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 5L13.4 21L10.2 13.8L3 10.6L19 5Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <a aria-label="Instagram">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="12" fill="#FBFFFE" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.26748 5C6.4629 5 5 6.4629 5 8.26748V15.8024C5 17.607 6.4629 19.0699 8.26748 19.0699H15.8024C17.607 19.0699 19.0699 17.607 19.0699 15.8024V8.26748C19.0699 6.4629 17.607 5 15.8024 5H8.26748ZM4 8.26748C4 5.91062 5.91062 4 8.26748 4H15.8024C18.1593 4 20.0699 5.91062 20.0699 8.26748V15.8024C20.0699 18.1593 18.1593 20.0699 15.8024 20.0699H8.26748C5.91062 20.0699 4 18.1593 4 15.8024V8.26748ZM12.4364 9.51543C11.9134 9.43786 11.3792 9.52721 10.9098 9.77075C10.4404 10.0143 10.0598 10.3996 9.82209 10.872C9.58436 11.3443 9.50161 11.8795 9.58562 12.4016C9.66962 12.9237 9.91611 13.406 10.29 13.7799C10.6639 14.1538 11.1462 14.4003 11.6683 14.4843C12.1903 14.5683 12.7256 14.4855 13.1979 14.2478C13.6703 14.0101 14.0556 13.6294 14.2991 13.1601C14.5427 12.6907 14.632 12.1565 14.5545 11.6335C14.4753 11.0999 14.2267 10.606 13.8453 10.2246C13.4639 9.84316 12.97 9.59454 12.4364 9.51543ZM10.4492 8.88312C11.1053 8.54271 11.852 8.41783 12.5831 8.52624C13.3289 8.63683 14.0193 8.98435 14.5524 9.51746C15.0855 10.0506 15.4331 10.741 15.5436 11.4868C15.6521 12.2179 15.5272 12.9646 15.1868 13.6207C14.8463 14.2767 14.3077 14.8087 13.6475 15.141C12.9873 15.4733 12.2391 15.589 11.5094 15.4716C10.7797 15.3541 10.1055 15.0096 9.58291 14.487C9.06027 13.9643 8.71574 13.2902 8.59832 12.5605C8.48089 11.8308 8.59656 11.0826 8.92886 10.4224C9.26116 9.76216 9.79317 9.22354 10.4492 8.88312ZM16.1792 7.39074C15.903 7.39074 15.6792 7.6146 15.6792 7.89074C15.6792 8.16688 15.903 8.39074 16.1792 8.39074H16.1878C16.464 8.39074 16.6878 8.16688 16.6878 7.89074C16.6878 7.6146 16.464 7.39074 16.1878 7.39074H16.1792Z"
              fill="black"
            />
          </svg>
        </a>
      </div>
      <h3 class="section-heading">{{ $t("call") }}</h3>
      <p class="phone-number">(84-8) 3930 3792</p>
      <p class="phone-number">(84-8) 3930 4339</p>
    </section>

    <!-- Footer Menus -->
    <nav class="footer-menu">
      <h3 class="menu-heading">{{ $t("production") }}</h3>
      <a class="menu-link">{{ $t("digital_printing") }}</a>
      <a class="menu-link">{{ $t("offset_printing") }}</a>
      <a class="menu-link">{{ $t("digital_offset") }}</a>
      <a class="menu-link">{{ $t("pop_posm") }}</a>
      <a class="menu-link">{{ $t("interior_exterior") }}</a>
    </nav>

    <nav class="footer-menu">
      <h3 class="menu-heading">{{ $t("design_creatives") }}</h3>
      <a class="menu-link">{{ $t("brading") }}</a>
      <a class="menu-link">{{ $t("pop_posm") }}</a>
      <a class="menu-link">{{ $t("interior_design") }}</a>
    </nav>

    <nav class="footer-menu">
      <h3 class="menu-heading">{{ $t("company") }}</h3>
      <a class="menu-link">{{ $t("about") }}</a>
      <a class="menu-link">{{ $t("service") }}</a>
      <a class="menu-link">{{ $t("work") }}</a>
      <a class="menu-link">{{ $t("contact") }}</a>
    </nav>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000;
  display: flex;
  flex-wrap: wrap;
  gap: 40px 92px;
  padding: 33px 80px 59px 32px;
  align-items: flex-start;
}

@media (max-width: 991px) {
  .footer {
    padding: 20px;
    gap: 20px;
  }
}

.company-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Roboto, -apple-system, Helvetica, sans-serif;
}

.company-logo {
  width: 113px;
  aspect-ratio: 2.82;
  object-fit: contain;
}

.company-tagline {
  color: #fbfffe;
  font-size: 14px;
  line-height: 22px;
  margin-top: 20px;
}

.divider {
  border-top: 1px solid #fbfffe;
  width: 100%;
  margin: 23px 0;
}

.copyright {
  color: #fff;
  font-size: 12px;
  font-weight: 300;
  margin-top: 25px;
}

.social-contact {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.section-heading {
  color: #fbfffe;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

.social-icons {
  display: flex;
  gap: 16px;
  margin-top: 14px;
}

.social-icon {
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
}

.phone-number {
  color: #fff;
  font-size: 16px;
  margin-top: 12px;
}

.footer-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Roboto, -apple-system, Helvetica, sans-serif;
  font-size: 14px;
  color: #fff;
}

.menu-heading {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.menu-link {
  color: #fff;
  text-decoration: none;
  margin-top: 16px;
}

.menu-link:first-of-type {
  margin-top: 32px;
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .company-info,
  .social-contact,
  .footer-menu {
    align-items: center;
  }

  .footer-menu {
    margin-top: 20px;
  }

  .menu-link:first-of-type {
    margin-top: 16px;
  }
}
</style>