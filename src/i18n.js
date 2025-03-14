import { createI18n } from "vue-i18n";

const messages = {
    en: {
        //Navbar
        home: "Home",
        about: "About",
        service: "Services",
        work: "WorkFlow",
        contact: "Contact",

        //About Us
        aboutus: "About Us",
        clients: "Our Clients",
        companyoverview: "Company Overview",
        companyoverview_des:
            "A reputable company in Vietnam since 2003, specializing in activation and production services. We provide end-to-end campaign solutions, from concept to execution, with a strategic and integrated communications approach. Our experienced team has extensive market knowledge and strong local relationships to ensure successful campaign outcomes.",
        resources: "Resources",
        resources_des:
            "We have a highly skilled workforce, a technology-driven management system, and a structured workflow to ensure smooth operations and optimal efficiency.",
        technology: "Up-to-Date Technology and Equipment",
        technology_des:
            "We utilize modern printing and production technologies, including Offset & Digital Printing, Large Format Digital Printing, and CNC/Laser Cutting Machines, to meet diverse customer demands with precision and quality.",

        //Services
        our_service: "Our Services",
        interior_exterior: "Interior/Exterior",
        pop_posm: "POP/POSM",
        large_format_printer: "Large Format Printer",
        interior_design: "Interior/Exterior Design",
        advertising_design: "Advertising Design",
        pop_posm_design: "POP/POSM Design",
        service_des1: "Retails, Coffee chains, Fashion stores, Offices,…",
        service_des2:
            "Signs,  light box, Billboard Graphic Wall, Standee Banner, Table tent card, Wobblers ,Hanging poster, shelves, Stage, booth exhibition...",
        service_des3: " Poster,  Hanger, Banner, Graphic Wall …",
        service_des4: "Showrooms Retail, Fashion shop, office,…",
        service_des5:
            " Logo, Name card, Envelope, Letter head,  Invitation, Folder,  Leaflet, Brochure, Catalog, Poster, Calendar, PrintAD...",
        service_des6:
            "Wobbler, Shelf-Talker, Standee, Table stand card, shelves, Stage, booth exhibition...",

        //WorkFlow
        workflowTitle: "Our WorkFlow",
        workflowDescription:
            "The company has a clear operating process, ensuring communication between departments in the company, performing work most efficiently, ensure high quality product as well as minimize all risks.",
        step: "Step",
        step1Title: "Quotation for Design",
        step1Details: {
            detail1: "Receive customer information",
            detail2: "Design quotation",
            detail3: "Customer agrees to the quotation",
        },
        step2Title: "Execute the design",
        step2Details: {
            detail1: "Creative Brief",
            detail2: "Idea sketch",
            detail3: "Create layout",
            detail4: "Final Artwork",
        },
        step3Title: "Production quotation",
        step3Details: {
            detail1: "FA/Final Layout",
            detail2: "Production quotation",
            detail3: "Agree to the quotation",
        },
        step4Title: "Make a prototype",
        step4Details: {
            detail1: "Final Artwork",
            detail2: "Produce a prototype",
            detail3: "Approve the sample",
            detail4: "Agree to the quotation",
        },
        step5Title: "Manufacturing",
        step5Details: {
            detail1: "Manufacturing",
            detail2: "Quality control",
            detail3: "Distribution",
        },

        //Contact
        contact_us: "Contact Us",
        contactTitle: "Let’s us accompany your design",
        contactAdd:
            "14 Nguyen Thi Dieu Steet , Vo Thi Sau, District 3, Ho Chi Minh City",
        first_name: "First Name",
        last_name: "Last Name",
        phone: "Phone",
        subjectTitle: "Select Subject?",
        subjectdetail1: "Design - Creatives",
        subjectdetail2: "Production",
        message: "Message",
        message_des: "Write your message...",
        contact_button: "Send Message",
        mail_notification_title_success: "Succes!",
        mail_notification_text_success: "Your message has been sent!",
        mail_notification_title_fail: "Oops...",
        mail_notification_text_fail:
            "Failed to send message. Please try again.",
    },
    vi: {
        //Navbar
        home: "Trang chủ",
        about: "Giới thiệu",
        service: "Dịch vụ",
        work: "Quy trình",
        contact: "Liên hệ",

        //About us
        aboutus: "Giới thiệu",
        clients: "Khách hàng",
        companyoverview: "Khái quát về công ty",
        companyoverview_des:
            "Một công ty uy tín tại Việt Nam từ năm 2003, chuyên về dịch vụ kích hoạt và sản xuất. Chúng tôi cung cấp các giải pháp chiến dịch trọn gói, từ ý tưởng đến thực hiện, với phương pháp tiếp cận truyền thông chiến lược và tích hợp. Đội ngũ giàu kinh nghiệm của chúng tôi có kiến ​​thức sâu rộng về thị trường và các mối quan hệ địa phương chặt chẽ để đảm bảo kết quả chiến dịch thành công.",
        resources: "Nguồn lực",
        resources_des:
            "Chúng tôi có lực lượng lao động có tay nghề cao, hệ thống quản lý ứng dụng công nghệ và quy trình làm việc có cấu trúc để đảm bảo hoạt động trơn tru và hiệu quả tối ưu.",
        technology: "Công nghệ và thiết bị hiện đại",
        technology_des:
            "Chúng tôi sử dụng các công nghệ in ấn và sản xuất hiện đại, bao gồm In Offset & Kỹ thuật số, In kỹ thuật số khổ lớn và Máy cắt CNC/Laser để đáp ứng nhu cầu đa dạng của khách hàng với độ chính xác và chất lượng.",

        //Services
        our_service: "Dịch vụ",
        interior_exterior: "Nội thất/Ngoại thất",
        pop_posm: "POP/POSM",
        large_format_printer: "In Khổ Lớn",
        interior_design: "Thiết Kế Nội thất/Ngoại thất",
        advertising_design: "Thiết Kế Quảng Cáo",
        pop_posm_design: "Thiết Kế POP/POSM",
        service_des1: "Bán lẻ, Chuỗi cà phê, Cửa hàng thời trang, Văn phòng,…",
        service_des2:
            "Biển hiệu, hộp đèn, Tường đồ họa Billboard, Banner Standee, Thẻ lều để bàn, Wobblers, Poster treo, kệ, Sân khấu, gian hàng triển lãm...",
        service_des3: "Poster, Móc treo, Biểu ngữ, Đồ họa treo tường …",
        service_des4:
            "Phòng trưng bày Bán lẻ, Cửa hàng thời trang, văn phòng,…",
        service_des5:
            "Logo, Danh thiếp, Phong bì, Giấy tiêu đề, Thư mời, Gấp, Tờ rơi, Tờ gấp, Danh mục, Áp phích, Lịch, In ấn …",
        service_des6:
            "Wobbler, Shelf-Talker, Standee, Thẻ đứng để bàn, kệ, Sân khấu, gian hàng triển lãm...",

        //WorkFlow
        workflowTitle: "Quy trình làm việc",
        workflowDescription:
            "Công ty có quy trình vận hành rõ ràng, đảm bảo sự liên lạc giữa các phòng ban trong công ty, thực hiện công việc hiệu quả nhất, đảm bảo chất lượng sản phẩm cao cũng như giảm thiểu mọi rủi ro.",
        step: "Bước",
        step1Title: "Báo giá thiết kế",
        step1Details: {
            detail1: "Nhận thông tin khách hàng",
            detail2: "Báo giá thiết kế",
            detail3: "Khách hàng đồng ý với báo giá",
        },
        step2Title: "Thực hiện thiết kế",
        step2Details: {
            detail1: "Tóm tắt ý tưởng",
            detail2: "Phác thảo ý tưởng",
            detail3: "Tạo bố cục",
            detail4: "Thiết kế cuối cùng",
        },
        step3Title: "Báo giá sản xuất",
        step3Details: {
            detail1: "Bản vẽ cuối cùng/Bố cục cuối cùng",
            detail2: "Báo giá sản xuất",
            detail3: "Đồng ý với báo giá",
        },
        step4Title: "Tạo nguyên mẫu",
        step4Details: {
            detail1: "Sản phẩm cuối cùng",
            detail2: "Sản xuất nguyên mẫu",
            detail3: "Phê duyệt mẫu",
            detail4: "Đồng ý với báo giá",
        },
        step5Title: "Sản xuất",
        step5Details: {
            detail1: "Sản xuất",
            detail2: "Kiểm soát chất lượng",
            detail3: "Phân phối",
        },

        //Contact
        contact_us: "Liên Hệ",
        contactTitle: "Hãy để chúng tôi đồng hành cùng thiết kế của bạn",
        contactAdd:
            "14 Nguyễn Thị Diệu , phường Võ Thị Sáu, Quận 3, thành phố Hồ Chí Minh",
        first_name: "Họ tên",
        last_name: "Tên",
        phone: "Số điện thoại",
        subjectTitle: "Chọn chủ đề?",
        subjectdetail1: "Thiết kế - Sáng tạo",
        subjectdetail2: "Sản xuất",
        message: "Lời nhắn",
        message_des: "Lời nhắn của bạn...",
        contact_button: "Gửi tin nhắn",
        mail_notification_title_success: "Thành công!",
        mail_notification_text_success: "Lời nhắn của bạn đã được gửi!",
        mail_notification_title_fail: "Ôi...",
        mail_notification_text_fail:
            "Gửi lời nhắn thất bại. Hãy thử lại.",
    },
};

const i18n = createI18n({
    locale: localStorage.getItem("lang") || "en",
    fallbackLocale: "en",
    messages,
});

export default i18n;
