<template>
  <div>
    <p v-if="loading">Loading...</p>
    <div v-show="!loading" ref="containerEl"></div>
  </div>
</template>

<script lang="ts">
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Component, Vue } from "vue-property-decorator";

import { uiStart } from "@/core/auth";
import { importStylesheet } from "@/core/utils";

@Component
export default class SignIn extends Vue {
  $refs!: {
    containerEl: HTMLButtonElement;
  };

  loading = true;

  private onDestroyed = new Subject();

  /**
   * Dynamically load Firebase Auth UI's stylesheet
   */
  created() {
    importStylesheet(
      "https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css"
    );
  }

  /**
   * Once HTML is ready, instantiate Firebase's Auth UI
   *
   * - Remove loading element once Auth UI is ready
   * - Unsubscribe on destroy of component
   */
  mounted() {
    uiStart(this.$refs.containerEl)
      .pipe(takeUntil(this.onDestroyed.asObservable()))
      .subscribe({
        next: () => {
          this.loading = false;
        },
        error: error => {
          this.loading = false;
        }
      });
  }

  destroyed() {
    this.onDestroyed.next();
    this.onDestroyed.complete();
  }
}
</script>
