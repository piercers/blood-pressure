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

@Component
export default class SignIn extends Vue {
  $refs!: {
    containerEl: HTMLButtonElement;
  };

  loading = true;

  private onDestroyed = new Subject();

  mounted() {
    uiStart(this.$refs.containerEl)
      .pipe(takeUntil(this.onDestroyed.asObservable()))
      .subscribe(
        () => {
          this.loading = false;
        },
        error => {
          console.error("[SignIn] Cannot load auth UI: ", error);
          this.loading = false;
        }
      );
  }

  destroyed() {
    this.onDestroyed.next();
    this.onDestroyed.complete();
  }
}
</script>
