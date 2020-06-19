<template>
  <div>
    <section class="section">
      <Graph v-bind:entries="entries" />
    </section>
    <section class="section">
      <List v-bind:entries="entries" />
    </section>
  </div>
</template>

<style scoped>
.section:not(:last-child) {
  margin-bottom: 1rem;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Graph from "@/components/Graph.vue";
import List from "@/components/List.vue";
import { entriesList } from "@/store/types";

@Component({
  components: {
    Graph,
    List
  }
})
export default class Entries extends Vue {
  /**
   * Ensure user's entries are populated on component create
   */
  created() {
    this.$store.dispatch({
      type: entriesList
    });
  }

  private get entries() {
    return this.$store.getters.entriesAscending;
  }
}
</script>
