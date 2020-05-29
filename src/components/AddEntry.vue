<template>
  <form v-on:submit.prevent="add" class="form">
    <div class="form__field">
      <label for="systolic" class="form__label">SYSTOLIC mm Hg (upper number)</label>
      <input id="systolic" type="number" v-model.number="form.systolic" />
    </div>
    <div class="form__field">
      <label for="diastolic" class="form__label">DIASTOLIC mm Hg (lower number)</label>
      <input id="diastolic" type="number" v-model.number="form.diastolic" />
    </div>
    <div class="form__field">
      <label for="pulse" class="form__label">Pulse</label>
      <input id="pulse" type="number" v-model.number="form.pulse" />
    </div>
    <button type="submit" v-bind:disabled="isFormInvalid">Add</button>
  </form>
</template>

<style scoped>
.form {
  display: inline-block;
  text-align: left;
}

.form__field {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
}

.form__label {
  font-weight: bold;
  padding-bottom: 0.25rem;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
