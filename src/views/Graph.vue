<template>
  <canvas ref="graphEl"></canvas>
</template>

<script lang="ts">
import { Chart, ChartPoint } from "chart.js";
import { Component, Vue, Watch } from "vue-property-decorator";

import { Entry } from "@/core/entries.interfaces";
import { DataConfig } from "@/core/graphs.interfaces";
import { listEntries } from "@/store/types";

interface GroupedEntries {
  diastolic: ChartPoint[];
  labels: string[];
  pulse: ChartPoint[];
  systolic: ChartPoint[];
}

const groupEntries = (entries: Entry[]): GroupedEntries => {
  const seed: GroupedEntries = {
    diastolic: [],
    labels: [],
    pulse: [],
    systolic: []
  };
  return entries.reduce(
    (acc, entry) => ({
      diastolic: [...acc.diastolic, { x: entry.dateTime, y: entry.diastolic }],
      labels: [...acc.labels, entry.dateTime],
      pulse: [...acc.pulse, { x: entry.dateTime, y: entry.pulse }],
      systolic: [...acc.systolic, { x: entry.dateTime, y: entry.systolic }]
    }),
    seed
  );
};

// Follows API: https://www.chartjs.org/docs/latest/configuration/elements.html#line-configuration
// eslint-disable-next-line
Chart.defaults.global.elements!.line!.fill = false;

@Component
export default class Graph extends Vue {
  $refs!: {
    graphEl: HTMLCanvasElement;
  };

  private graphInstance!: Chart;

  get entries(): Entry[] {
    return this.$store.getters.entriesAscending;
  }

  get dataConfig(): DataConfig {
    const grouped = groupEntries(this.entries);
    return {
      dataSets: [
        {
          backgroundColor: "red",
          borderColor: "red",
          data: grouped.systolic,
          label: "Systolic"
        },
        {
          backgroundColor: "blue",
          borderColor: "blue",
          data: grouped.diastolic,
          label: "Diastolic"
        },
        {
          backgroundColor: "purple",
          borderColor: "purple",
          data: grouped.pulse,
          label: "Pulse"
        }
      ],
      labels: grouped.labels
    };
  }

  created() {
    this.$store.dispatch({
      type: listEntries
    });
  }

  mounted() {
    this.initGraph();
  }

  private initGraph() {
    this.graphInstance = new Chart(this.$refs.graphEl, {
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
  private updateData(value: DataConfig) {
    this.graphInstance.data.labels = value.labels;
    this.graphInstance.data.datasets = value.dataSets;
    this.graphInstance.update();
  }
}
</script>
