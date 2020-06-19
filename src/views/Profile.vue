<template>
  <div class="container">
    <h2>Account</h2>
    <p>{{ email }}</p>
    <button v-on:click="signOut" class="app-button">Sign Out</button>
  </div>
</template>

<style scoped>
.container {
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { signOut } from "../core/auth";

@Component
export default class Profile extends Vue {
  get email() {
    return this.$store.state.user?.email;
  }

  signOut() {
    signOut();
  }
}
</script>
