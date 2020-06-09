<template>
  <div class="container">
    <h1 class="title">Blood Pressure</h1>
    <div class="route">
      <router-view />
    </div>
    <Nav />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.route {
  flex: 1 1 auto;
  overflow: scroll;
}

.title {
  line-height: .7;
  margin: 0;
  padding: 1rem;
  text-align: center;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Nav from "@/components/Nav.vue";

@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {}
</script>
