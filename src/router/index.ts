import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    name: "Notfound",
    component: () => import("../views/NotFoundView.vue"),
  },
  {
    path: "/",
    name: "IndexView",
    component: () => import("../views/IndexView.vue"),
  },
  {
    path: "/dashboard",
    name: "home",
    component: HomeView,
  },
  {
    path: "/test-page",
    name: "TestPage",
    component: () => import("../views/TestPage.vue"),
  },
  {
    path: "/calendar",
    name: "CalendarView",
    component: () => import("../views/CalendarView.vue"),
  },
  {
    path: "/chart",
    name: "ChartView",
    component: () => import("../views/ChartView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
