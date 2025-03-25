import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/components/admin/AdminLayout.vue";
import Login from "@/components/admin/Login.vue";
import Sliders from "@/components/admin/Sliders.vue";
import Clients from "@/components/admin/Clients.vue";

const routes = [
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
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
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
