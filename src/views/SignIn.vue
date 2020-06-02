<template>
  <div ref="containerEl"></div>
</template>

<script lang="ts">
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Component, Vue, Watch } from "vue-property-decorator";

import { uiStart } from "@/core/auth";

@Component
export default class SignIn extends Vue {
  $refs!: {
    containerEl: HTMLButtonElement;
  };

  private onDestroyed = new Subject();

  mounted() {
    uiStart(this.$refs.containerEl)
      .pipe(
        filter(result => result.credential),
        takeUntil(this.onDestroyed.asObservable())
      )
      .subscribe(
        ({ credential }) => {
          console.log(`[SignIn] credential: `, credential);
          this.$router.push("/");
        },
        error => {
          console.error("[SignIn] Unable to sign in: ", error);
        }
      );
  }

  destroyed() {
    this.onDestroyed.next();
    this.onDestroyed.complete();
  }
}
</script>
