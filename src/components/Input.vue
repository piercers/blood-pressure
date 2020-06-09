<template>
  <div class="field">
    <label v-if="label" v-bind:for="name" class="label">{{ label }}</label>
    <input
      v-bind:id="name"
      v-on:input="$emit('input', $event.target.value)"
      v-bind:type="type"
      v-bind:value="value"
      class="input"
    />
  </div>
</template>

<style scoped>
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
</style>

<script lang="ts">
import { Component, Vue, Prop, Model } from "vue-property-decorator";

@Component
export default class Input extends Vue {
  @Prop()
  label!: string;

  @Model("input")
  value!: string | number;

  @Prop()
  name!: string;

  @Prop()
  type!: string;
}
</script>
