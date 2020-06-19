<template>
  <div>
    <h2>Account</h2>
    <p>{{ email }}</p>
    <button v-on:click="signOut" class="app-button">Sign Out</button>
  </div>
</template>

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
