<template>
  <form v-on:submit.prevent="addEntry" class="form">
    <section class="fields">
      <div class="field">
        <label for="systolic" class="label">SYSTOLIC mm Hg (upper number)</label>
        <input id="systolic" type="number" v-model.number="form.systolic" class="input" />
    </div>
      <div class="field">
        <label for="diastolic" class="label">DIASTOLIC mm Hg (lower number)</label>
        <input id="diastolic" type="number" v-model.number="form.diastolic" class="input" />
    </div>
      <div class="field">
        <label for="pulse" class="label">Pulse</label>
        <input id="pulse" type="number" v-model.number="form.pulse" class="input" />
    </div>
    </section>
    <button type="submit" v-bind:disabled="isFormInvalid" class="submit">Add</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.fields {
  flex: 1 1 auto;
}

.field {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
}

.input {
  background-color: rgba(var(--app-item-background-rgb), 0.25);
  border: 0;
  font-size: 1em;
  padding: 0.5em;
  color: inherit;
}

.label {
  font-weight: bold;
  padding-bottom: 0.25rem;
}

.submit {
  border: 0;
  font-size: 1em;
  margin-top: 1rem;
  padding: 0.5em;
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { Entry } from "@/core/entries.interfaces";
import { FormErrors } from "@/core/forms.interfaces";
import { addEntry } from "@/store/types";

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

  addEntry() {
    this.$store.dispatch({
      type: addEntry,
      entry: {
        ...this.form,
        dateTime: new Date().toISOString()
      }
    });
    this.form = { ...this.defaultForm };
  }
}
</script>
