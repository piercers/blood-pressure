<template>
  <div id="app">
    <h1>Blood Pressure</h1>
    <div>
      <button v-if="user" v-on:click="signOut">Sign Out</button>
      <router-link v-else to="/sign-in">Sign In</router-link>
    </div>
    <router-view />
    <Nav />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Nav from "@/components/Nav.vue";
import { User, getCurrentUser } from "@/core/auth";
import { signOut } from "@/store/types";

@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {
  get user(): User {
    return this.$store.state.user;
  }

  signOut() {
    this.$store.dispatch(signOut);
  }
}
</script>
