import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/IndexPage.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../pages/ChatPage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/AboutPage.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/ProfilePage.vue"),
  },
  {
    path: "/friends",
    name: "Friends",
    component: () => import("../pages/FriendsPage.vue"),
  },
  {
    path: "/challenge",
    name: "Challenge",
    component: () => import("../pages/ChallengePage.vue"),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("../pages/ShopPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: () => import("../pages/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
