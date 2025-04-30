import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/components/admin/AdminLayout.vue";
import Login from "@/components/admin/Login.vue";
import Sliders from "@/components/admin/Sliders.vue";
import Clients from "@/components/admin/Clients.vue";
import HeroSection from "@/views/HeroSection.vue";
import AboutUs from "@/components/AboutUs.vue";
import ServiceSection from "@/views/ServiceSection.vue";
import WorkflowSection from "@/views/WorkflowSection.vue";
import ContactForm from "@/views/ContactForm.vue";
import AdminServiceEditor from "@/components/admin/AdminService.vue";
import AdminWorkFlow from "@/components/admin/AdminWorkFlow.vue";
import AdminAboutUs from "@/components/admin/AdminAboutUs.vue";
import AdminChatBot from "@/components/admin/AdminChatBot.vue";


const routes = [
    {
        path: "/",
        name: "HeroSection",
        component: HeroSection,
    },
    {
        path: "/about",
        name: "AboutUs",
        component: AboutUs,
    },
    {
        path: "/services",
        name: "ServiceSection",
        component: ServiceSection,
    },
    {
        path: "/workflow",
        name: "WorkflowSection",
        component: WorkflowSection,
    },
    {
        path: "/contact",
        name: "ContactForm",
        component: ContactForm,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/admin",
        component: AdminLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "sliders", component: Sliders },
            { path: "clients", component: Clients },
            { path: "about", component: AdminAboutUs },
            { path: "services", component: AdminServiceEditor },
            { path: "workflow", component: AdminWorkFlow },
            { path: "chatbot", component: AdminChatBot },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

// Kiểm tra quyền truy cập trước khi vào admin
router.beforeEach((to, from, next) => {
    const isAuthenticated = JSON.parse(
        localStorage.getItem("user")
    )?.isLoggedIn;
    if (
        to.matched.some((record) => record.meta.requiresAuth) &&
        !isAuthenticated
    ) {
        next("/"); // Chuyển về trang chủ nếu chưa đăng nhập
    } else {
        next();
    }
});

export default router;
