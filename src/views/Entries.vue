<template>
  <table class="table">
    <thead class="table__header">
      <th class="cell cell--header">Date</th>
      <th class="cell cell--header">Systolic</th>
      <th class="cell cell--header">Diastolic</th>
      <th class="cell cell--header">Pulse</th>
    </thead>
    <tr v-for="entry of entriesDescending" v-bind:key="entry.dateTime" class="row">
      <td class="cell">{{ entry.dateTime | date }}</td>
      <td class="cell">{{ entry.systolic }}</td>
      <td class="cell">{{ entry.diastolic }}</td>
      <td class="cell">{{ entry.pulse }}</td>
    </tr>
  </table>
</template>

<style scoped>
.cell {
  padding: 0.5em;
}

.cell--header {
  background-color: rgb(var(--app-item-background-rgb));
  position: sticky;
  top: 0;
}

.row:nth-child(odd) {
  background-color: rgba(var(--app-item-background-rgb), 0.25);
}

.row:hover {
  background-color: rgba(var(--app-item-background-rgb), 0.33);
}

.table {
  border-spacing: 0;
  position: relative;
  text-align: center;
  width: 100%;
}
</style>

<script lang="ts">
import { parseISO, format } from "date-fns/fp";
import { Component, Vue } from "vue-property-decorator";

import { Entry } from "@/core/entries.interfaces";
import { listEntries } from "@/store/types";

@Component({
  filters: {
    date: function(dateTime: string) {
      if (!dateTime) {
        return "";
      }
      return format("LLL d", parseISO(dateTime));
    }
  }
})
export default class Entries extends Vue {
  get entriesDescending(): Entry[] {
    return this.$store.getters.entriesDescending;
  }

  created() {
    this.$store.dispatch({
      type: listEntries
    });
  }
}
</script>
