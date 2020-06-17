<template>
  <ul class="links">
    <li v-for="link of links" v-bind:key="link.path">
      <router-link v-bind:to="link.path" class="link">{{ link.name }}</router-link>
    </li>
    <li>
      <a v-if="user" v-on:click.prevent="signOut" class="link js-sign-out">Sign Out</a>
      <router-link v-else to="/sign-in" class="link js-sign-in">Sign In</router-link>
    </li>
  </ul>
</template>

<style scoped>
.links {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.link {
  cursor: pointer;
  color: inherit;
  display: block;
  opacity: .5;
  padding: 1rem;
  text-decoration: none;
}

.link.router-link-active {
  opacity: 1;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";

import { User } from "@/core/auth.interfaces";
import { inNavRoutes, routes } from "@/router";
import { authSignOut } from "@/store/types";

/**
 * Main app navigation route links
 */
@Component
export default class Nav extends Vue {
  links = inNavRoutes(routes);

  get user(): User {
    return this.$store.state.user;
  }

  signOut() {
    this.$store.dispatch(authSignOut);
  }
}
</script>
