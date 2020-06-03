import Vue from "vue";
import VueRouter, { RouteConfig, NavigationGuard } from "vue-router";

import AddEntry from "@/views/AddEntry.vue";
import Entries from "@/views/Entries.vue";
import Graph from "@/views/Graph.vue";
import SignIn from "@/views/SignIn.vue";
import store from "@/store";

Vue.use(VueRouter);

const requireAuth: NavigationGuard = (to, from, next) => {
  if (store.state.user) {
    next();
  } else {
    next("/sign-in");
  }
};

export const routes: Array<RouteConfig> = [
  {
    path: "/graph",
    name: "Graph",
    component: Graph,
    meta: {
      inNav: true
    },
    beforeEnter: requireAuth
  },
  {
    path: "/add",
    name: "Add",
    component: AddEntry,
    meta: {
      inNav: true
    },
    beforeEnter: requireAuth
  },
  {
    path: "/list",
    name: "List",
    component: Entries,
    meta: {
      inNav: true
    },
    beforeEnter: requireAuth
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn
  },
  {
    path: "*",
    redirect: "/graph"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
