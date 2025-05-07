import { createI18n } from "vue-i18n";

const messages = {
    en: {
        //Navbar
        home: "Home",
        about: "About",
        service: "Services",
        work: "WorkFlow",
        contact: "Contact",

        //Contact
        form: {
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            phone: "Phone",
            subject: "Subject",
            subjects: {
                design: "Design",
                production: "Production",
            },
            message: "Message",
            messagePlaceholder: "Enter your message...",
            verificationCode: "Verification Code",
            verificationCodePlaceholder: "Enter verification code",
            submit: "Send Message",
            invalidCode: "Invalid Code",
            invalidCodeMessage: "Please enter the correct verification code.",
            successTitle: "Sent successfully!",
            successMessage: "We will contact you as soon as possible.",
            errorTitle: "Failed to send!",
            errorMessage:
                "There was an error sending the email. Please try again later.",
        },
        contact: {
            title: "Contact",
            subtitle: "Let's us accompany your design",
            address:
                "14 Nguyen Thi Dieu Steet, Vo Thi Sau, District 3, Ho Chi Minh City",
        },

        //Footer
        footer: {
            tagline: "Contact us to create what you desire today.",
            copyright: "© 2003 T.M.C Co., Ltd",
            explore: {
                title: "Explore",
                about: "About Us",
                services: "Services",
                workflow: "Workflow",
                contact: "Contact",
            },
            contact: {
                title: "Contact",
                address:
                    "14 Nguyen Thi Dieu Street, Vo Thi Sau, District 3, Ho Chi Minh City",
            },
        },
    },
    vi: {
        //Navbar
        home: "Trang chủ",
        about: "Giới thiệu",
        service: "Dịch vụ",
        work: "Quy trình",
        contact: "Liên hệ",

        //Contact
        form: {
            firstName: "Họ",
            lastName: "Tên",
            email: "Email",
            phone: "Số điện thoại",
            subject: "Chủ đề liên hệ",
            subjects: {
                design: "Thiết kế",
                production: "Sản xuất",
            },
            message: "Nội dung",
            messagePlaceholder: "Nhập nội dung tin nhắn...",
            verificationCode: "Mã xác thực",
            verificationCodePlaceholder: "Nhập mã xác thực",
            submit: "Gửi liên hệ",
            invalidCode: "Sai mã xác thực",
            invalidCodeMessage: "Vui lòng nhập đúng mã xác thực.",
            successTitle: "Gửi thành công!",
            successMessage: "Chúng tôi sẽ liên hệ với bạn sớm nhất.",
            errorTitle: "Gửi thất bại!",
            errorMessage: "Đã xảy ra lỗi khi gửi email. Vui lòng thử lại sau.",
        },
        contact: {
            title: "Liên Hệ",
            subtitle: "Hãy để chúng tôi đồng hành cùng thiết kế của bạn",
            address:
                "14 Nguyễn Thị Diệu, phường Võ Thị Sáu, Quận 3, thành phố Hồ Chí Minh",
        },

        //Footer
        footer: {
            tagline:
                "Liên hệ với chúng tôi để tạo ra điều bạn mong muốn hôm nay.",
            copyright: "© 2003 Công ty TNHH T.M.C",
            explore: {
                title: "Khám phá",
                about: "Về chúng tôi",
                services: "Dịch vụ",
                workflow: "Quy trình",
                contact: "Liên hệ",
            },
            contact: {
                title: "Liên hệ",
                address: "14 Nguyễn Thị Diệu, P. Võ Thị Sáu, Q.3, TP.HCM",
            },
        },
    },
};

const i18n = createI18n({
    locale: localStorage.getItem("lang") || "en",
    fallbackLocale: "en",
    messages,
});

export default i18n;
