<template>
  <div ref="containerEl"></div>
</template>

<script lang="ts">
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { Component, Vue, Watch } from "vue-property-decorator";

import { uiStart } from "@/core/auth";
import { signIn, signInError } from '@/store/types';

@Component
export default class SignIn extends Vue {
  $refs!: {
    containerEl: HTMLButtonElement;
  };

  private onDestroyed = new Subject();

  mounted() {
    uiStart(this.$refs.containerEl)
      .pipe(
        filter(result => !!result.currentUser),
        takeUntil(this.onDestroyed.asObservable())
      )
      .subscribe(
        ({ currentUser }) => {
          this.$store.commit({
            type: signIn,
            user: currentUser,
          });
          this.$router.push("/");
        },
        error => {
          this.$store.dispatch(signInError);
        }
      );
  }

  destroyed() {
    this.onDestroyed.next();
    this.onDestroyed.complete();
  }
}
</script>
