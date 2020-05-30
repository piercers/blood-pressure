<template>
  <canvas ref="chartCtx"></canvas>
</template>

<script lang="ts">
import { Chart } from "chart.js";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { DataConfig } from "@/core/graphs.interfaces";

// Follows API: https://www.chartjs.org/docs/latest/configuration/elements.html#line-configuration
// eslint-disable-next-line
Chart.defaults.global.elements!.line!.fill = false;

@Component
export default class Graph extends Vue {
  $refs!: {
    chartCtx: HTMLCanvasElement;
  };

  private graphInstance!: Chart;

  @Prop() private dataConfig!: DataConfig;

  mounted() {
    this.initGraph();
  }

  private initGraph() {
    this.graphInstance = new Chart(this.$refs.chartCtx, {
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

  @Watch("dataConfig")
  private udpateData(value: DataConfig) {
    this.graphInstance.data.labels = value.labels;
    this.graphInstance.data.datasets = value.dataSets;
    this.graphInstance.update();
  }
}
</script>
