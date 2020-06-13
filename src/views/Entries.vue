<template>
  <table class="table">
    <thead class="table__header">
      <th
        v-for="header of headers"
        v-bind:key="header"
        v-on:click="
          sortBy = header;
          descending = !descending;
        "
        class="cell cell--header"
      >
        <span class="header">
          {{ header }}
          <span
            v-show="sortBy === header"
            v-bind:class="{ 'sort-icon--ascending': !descending }"
            class="sort-icon"
          >
            ▼
          </span>
        </span>
      </th>
    </thead>
    <tr v-for="entry of entriesSorted" v-bind:key="entry.dateTime" class="row">
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
  background-color: rgba(var(--app-item-background-rgb), 0.8);
  position: sticky;
  top: 0;
}

.header {
  cursor: pointer;
  position: relative;
  user-select: none;
}

.row:nth-child(odd) {
  background-color: rgba(var(--app-item-background-rgb), 0.5);
}

.row:hover {
  background-color: rgba(var(--app-item-background-rgb), 0.6);
}

.sort-icon {
  position: absolute;
  right: -1.5em;
  top: -0.05em;
  transition: transform .2s ease;
}

.sort-icon--ascending {
  transform: rotate(180deg);
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
import { camelCase } from "lodash/fp";
import { Component, Vue } from "vue-property-decorator";

import { Entry } from "@/core/entries.interfaces";
import { entriesList } from "@/store/types";

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
  descending = true;

  headers = ["Date", "Systolic", "Diastolic", "Pulse"];

  sortBy = "Date";

  get entriesSorted(): Entry[] {
    const sortBy = this.sortBy === "Date" ? "DateTime" : this.sortBy;
    return this.$store.getters.entries(camelCase(sortBy), this.descending);
  }

  /**
   * Ensure user's entries are populated on component create
   */
  created() {
    this.$store.dispatch({
      type: entriesList
    });
  }
}
</script>
