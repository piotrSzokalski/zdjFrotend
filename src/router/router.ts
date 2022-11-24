import { createRouter, createWebHashHistory } from "vue-router";

import Login from "@/views/Login/Login.vue";
import Gallery from "@/views/Gallery/Gallery.vue";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Login },
    { name: "gallery", path: "/gallery", component: Gallery },
  ],
});
