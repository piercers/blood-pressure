<template>
  <div ref="containerEl"></div>
</template>

<script lang="ts">
// TODO Do I need to import the full firebase lib?
import * as firebase from "firebase";
import * as firebaseui from "firebaseui";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class SignIn extends Vue {
  $refs!: {
    containerEl: HTMLButtonElement;
  };

  private ui!: firebaseui.auth.AuthUI;

  created() {
    // TODO This throws if visiting twice
    // - Could create a typescript singleton? How?
    // - A Vue instance property?
    // - Could add a prop in store?
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  mounted() {
    this.ui.start(this.$refs.containerEl, {
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    });
  }
}
</script>
