import Vue from "vue";
import VueRouter, { RouteConfig, NavigationGuard } from "vue-router";

import { onAuthStateChanged } from "@/core/auth";
import AddEntry from "@/views/AddEntry.vue";
import Entries from "@/views/Entries.vue";
import Graph from "@/views/Graph.vue";
import SignIn from "@/views/SignIn.vue";
import { take } from "rxjs/operators";

Vue.use(VueRouter);

export const inNavRoutes = (routes: RouteConfig[]) =>
  routes.filter((route: RouteConfig) => route.meta?.inNav);

/**
 * Block access to a route unless user is authenticated
 */
const requireAuth: NavigationGuard = (to, from, next) => {
  onAuthStateChanged.pipe(take(1)).subscribe(user => {
    if (user) {
      next();
    } else {
      next("/sign-in");
    }
  });
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
    component: SignIn,
    beforeEnter: (to, from, next) => {
      onAuthStateChanged.pipe(take(1)).subscribe(user => {
        if (user) {
          next("/");
        } else {
          next();
        }
      });
    }
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
