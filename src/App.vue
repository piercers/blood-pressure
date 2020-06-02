<template>
  <div id="app">
    <h1>Blood Pressure</h1>
    <button v-if="user" v-on:click="signOut">Sign Out</button>
    <router-link v-else to="/sign-in">Sign In</router-link>
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

import { user, signOut, getCurrentUser } from "@/core/auth";
import Nav from "@/components/Nav.vue";

@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {
  user = user;

  created() {
    getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  signOut() {
    signOut().subscribe();
  }
}
</script>
