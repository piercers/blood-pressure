<template>
  <div>
    <h1>Blood Pressure</h1>
    <section>
      <Chart v-bind:dataConfig="dataConfig" />
    </section>
    <section class="add-entry">
      <h2>Add Entry</h2>
      <AddEntry v-on:submit="addEntry" />
    </section>
    <section>
      <h2>Entries</h2>
      <ul class="entries__list">
        <li
          v-for="entry of entriesDescending"
          v-bind:key="entry.dateTime"
        >{{ entry | entryFriendly }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.entries__list {
  display: inline-block;
  text-align: left;
}
</style>

<script lang="ts">
import { parseISO, format } from "date-fns/fp";
import { Component, Vue } from "vue-property-decorator";

import AddEntry from "@/components/AddEntry.vue";
import Chart from "@/components/Chart.vue";
import { DataConfig } from "@/core/charts.interfaces";
import { Entry } from "@/core/entries.interfaces";
import { myData } from "@/core/utils";

interface GroupedEntries {
  diastolic: number[];
  labels: string[];
  pulse: number[];
  systolic: number[];
}

const isoToShortDate = (isoString: string) => {
  if (!isoString) {
    return "";
  }
  const date = parseISO(isoString);
  return format("LLL d", date);
};

const groupEntries = (entries: Entry[]): GroupedEntries => {
  const seed: GroupedEntries = {
    diastolic: [],
    labels: [],
    pulse: [],
    systolic: []
  };
  return entries.reduce(
    (acc, entry) => ({
      diastolic: [...acc.diastolic, entry.diastolic],
      labels: [...acc.labels, entry.dateTime],
      pulse: [...acc.pulse, entry.pulse],
      systolic: [...acc.systolic, entry.systolic]
    }),
    seed
  );
};

@Component({
  components: {
    AddEntry,
    Chart
  },
  filters: {
    entryFriendly: function(entry: Entry) {
      return `${isoToShortDate(entry.dateTime)}: ${entry.systolic} / ${
        entry.diastolic
      } @ ${entry.pulse}`;
  }
  }
})
export default class Entries extends Vue {
  entries: Entry[] = [...myData];

  get dataConfig(): DataConfig {
    const grouped = groupEntries(this.entries);
    return {
      dataSets: [
        {
          backgroundColor: "red",
          borderColor: "red",
          data: grouped.systolic,
          label: "Systolic"
        },
        {
          backgroundColor: "blue",
          borderColor: "blue",
          data: grouped.diastolic,
          label: "Diastolic"
        },
        {
          backgroundColor: "purple",
          borderColor: "purple",
          data: grouped.pulse,
          label: "Pulse"
        }
      ],
      labels: grouped.labels
    };
  }

  get entriesDescending() {
    return this.entries.reverse();
  }

  addEntry(entry: Entry) {
    this.entries.push(entry);
  }
}
</script>
