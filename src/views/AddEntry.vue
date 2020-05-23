<template>
  <div>
    <section>
      <h1>Entries</h1>
      <ul>
        <li v-for="entry of entries" v-bind:key="entry.datetime">{{ entry }}</li>
      </ul>
    </section>
    <section class="add-entry">
      <h2>Add Entry</h2>
      <form v-on:submit.prevent="add">
        <div>
          <label for="systolic">SYSTOLIC mm Hg (upper number)</label>
          <input id="systolic" type="number" v-model.number="form.systolic" />
        </div>
        <div>
          <label for="diastolic">DIASTOLIC mm Hg (lower number)</label>
          <input id="diastolic" type="number" v-model.number="form.diastolic" />
        </div>
        <div>
          <label for="pulse">Pulse</label>
          <input id="pulse" type="number" v-model.number="form.pulse" />
        </div>
        <button type="submit" v-bind:disabled="isFormInvalid">Add</button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Entry {
  datetime: string;
  diastolic: number;
  pulse: number;
  systolic: number;
}

interface FormErrors {
  message: string;
}

@Component
export default class AddEntry extends Vue {
  entries: Entry[] = [];

  private defaultForm = {
    diastolic: 0,
    pulse: 0,
    systolic: 0
  };

  form = {
    ...this.defaultForm
  };

  get isFormInvalid(): FormErrors | undefined {
    const entry = { ...this.form };
    if (!entry.diastolic || !entry.pulse || !entry.systolic) {
      return {
        message: "Missing required fields."
      };
    }
    return undefined;
  }

  add() {
    this.entries.push({ ...this.form, datetime: new Date().toISOString() });
    this.form = { ...this.defaultForm };
  }
}
</script>
