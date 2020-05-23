<template>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Entry } from "../core/entries.interfaces";
import { FormErrors } from "../core/forms.interfaces";

@Component
export default class AddEntry extends Vue {
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
    this.$emit("submit", {
      ...this.form,
      dateTime: new Date().toISOString()
    } as Entry);
    this.form = { ...this.defaultForm };
  }
}
</script>
