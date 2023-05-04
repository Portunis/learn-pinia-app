import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { userSession } from "@/vuetils/useAuth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    name: "Notfound",
    component: () => import("../views/NotFoundView.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/",
    name: "IndexView",
    component: () => import("../views/IndexView.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "home",
    component: HomeView,
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/test-page",
    name: "TestPage",
    component: () => import("../views/TestPage.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/calendar",
    name: "CalendarView",
    component: () => import("../views/CalendarView.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/chart",
    name: "ChartView",
    component: () => import("../views/ChartView.vue"),
    meta: {
      needsAuth: true,
    },
  },
  {
    path: "/auth",
    name: "LoginUser",
    component: () => import("../components/auth/LoginUser.vue"),
    meta: {
      layout: "auth-layout",
      needsAuth: false,
    },
  },
  {
    path: "/user",
    name: "UserProfile",
    component: () => import("../views/UserProfile.vue"),
    meta: {
      layout: "user-profile-layout",
      needsAuth: true,
    },
  },
  {
    path: "/user/info",
    name: "InfoView",
    component: () => import("../views/InfoView.vue"),
    meta: {
      layout: "user-profile-layout",
      needsAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    if (userSession.value) {
      return next();
    } else {
      return next("/auth");
    }
  }

  return next();
});
export default router;
