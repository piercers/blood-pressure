import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Entries from "../views/Entries.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Entries,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
