<template>
  <canvas ref="chartCtx"></canvas>
</template>

<script lang="ts">
import { Chart as ChartJs } from "chart.js";
import { Component, Prop, Vue } from "vue-property-decorator";

import { DataConfig } from "@/core/charts.interfaces";

// Follows API: https://www.chartjs.org/docs/latest/configuration/elements.html#line-configuration
// eslint-disable-next-line
ChartJs.defaults.global.elements!.line!.fill = false;

@Component
export default class Chart extends Vue {
  $refs!: {
    chartCtx: HTMLCanvasElement;
  };

  @Prop() private dataConfig!: DataConfig;

  mounted() {
    this.chart();
  }

  chart() {
    new ChartJs(this.$refs.chartCtx, {
      type: "line",
      data: {
        datasets: this.dataConfig.dataSets,
        labels: this.dataConfig.labels
      },
      options: {
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        }
      }
    });
  }
}
</script>
