import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import AddEntry from "@/views/AddEntry.vue";
import Entries from "@/views/Entries.vue";
import Graph from "@/views/Graph.vue";
import SignIn from "@/views/SignIn.vue";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/graph",
    name: "Graph",
    component: Graph,
    meta: {
      inNav: true,
    },
  },
  {
    path: "/add",
    name: "Add",
    component: AddEntry,
    meta: {
      inNav: true,
    },
  },
  {
    path: "/list",
    name: "List",
    component: Entries,
    meta: {
      inNav: true,
    },
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "*",
    redirect: "/graph",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
