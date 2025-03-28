import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { 
    path: "/", 
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  { 
    path: "/form", 
    name: "ExampleForm",
    component: () => import("../views/ExampleForm.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 