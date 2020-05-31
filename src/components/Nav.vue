<template>
  <ul>
    <li v-for="link of links" v-bind:key="link.path">
      <router-link v-bind:to="link.path">{{ link.name }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RouteConfig } from "vue-router";

import { routes } from "@/router";

@Component
export default class Nav extends Vue {
  links = routes.filter((route: RouteConfig) => route.meta?.inNav);
}
</script>
