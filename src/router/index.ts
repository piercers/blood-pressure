import Vue from "vue";
import VueRouter, { RouteConfig, NavigationGuard } from "vue-router";

import { onAuthStateChanged } from "@/core/auth";
import AddEntry from "@/views/AddEntry.vue";
import Entries from "@/views/Entries.vue";
import SignIn from "@/views/SignIn.vue";
import { take } from "rxjs/operators";

Vue.use(VueRouter);

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
    path: "/entries",
    name: "Entries",
    component: Entries,
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
    redirect: "/entries"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
