<template>
  <div>
    <h1>Blood Pressure</h1>
    <section>
      <Chart v-bind:entries="entries" />
    </section>
    <section>
      <h2>Entries</h2>
      <ul>
        <li v-for="entry of entries" v-bind:key="entry.dateTime">{{ entry }}</li>
      </ul>
    </section>
    <section class="add-entry">
      <h2>Add Entry</h2>
      <AddEntry v-on:submit="addEntry" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AddEntry from "@/components/AddEntry.vue";
import Chart from "@/components/Chart.vue";
import { Entry } from "@/core/entries.interfaces";

@Component({
  components: {
    AddEntry,
    Chart
  }
})
export default class Entries extends Vue {
  entries: Entry[] = [];

  addEntry(entry: Entry) {
    this.entries.push(entry);
  }
}
</script>
