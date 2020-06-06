<template>
  <div>
      <ul class="entries__list">
        <li v-for="entry of entriesDescending" v-bind:key="entry.dateTime">
          {{ entry | entryFriendly }}
        </li>
      </ul>
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

import { Entry } from "@/core/entries.interfaces";
import { listEntries } from "@/store/types";

const isoToShortDate = (isoString: string) => {
  if (!isoString) {
    return "";
  }
  const date = parseISO(isoString);
  return format("LLL d", date);
};


@Component({
  filters: {
    entryFriendly: function(entry: Entry) {
      if (!entry) {
        return "";
      }
      const dateTime = format("LLL d", parseISO(entry.dateTime));
      return `${dateTime}: ${entry.systolic} / ${entry.diastolic} @ ${entry.pulse}`;
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
