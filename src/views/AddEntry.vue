<template>
  <form v-on:submit.prevent="addEntry" class="form">
    <section class="fields">
      <Input
        v-model.number="form.systolic"
        label="SYSTOLIC mm Hg (upper number)"
        type="number"
      />

      <Input
        v-model.number="form.diastolic"
        label="DIASTOLIC mm Hg (lower number number)"
        type="number"
      />

      <Input v-model.number="form.pulse" label="Pulse" />
    </section>
    <button type="submit" v-bind:disabled="isFormInvalid" class="submit">
      Add
    </button>
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

import Input from "@/components/Input.vue";
import { FormErrors } from "@/core/forms.interfaces";
import { addEntry } from "@/store/types";

@Component({
  components: {
    Input
  }
})
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
