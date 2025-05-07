import { createI18n } from "vue-i18n";

const messages = {
    en: {
        //Navbar
        home: "Home",
        about: "About",
        service: "Services",
        work: "WorkFlow",
        contact: "Contact",
    },
    vi: {
        //Navbar
        home: "Trang chủ",
        about: "Giới thiệu",
        service: "Dịch vụ",
        work: "Quy trình",
        contact: "Liên hệ",
    },
};

const i18n = createI18n({
    locale: localStorage.getItem("lang") || "en",
    fallbackLocale: "en",
    messages,
});

export default i18n;
