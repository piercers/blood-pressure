<template>
  <canvas ref="graphEl"></canvas>
</template>

<script lang="ts">
import { Chart, ChartPoint } from "chart.js";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

import { Entry } from "@/core/entries.interfaces";
import { DataConfig } from "@/core/graphs.interfaces";
import { entriesList } from "@/store/types";

interface GroupedEntries {
  diastolic: ChartPoint[];
  labels: string[];
  pulse: ChartPoint[];
  systolic: ChartPoint[];
}

/**
 * Split up a list of Entry objects into individual reading datasets
 */
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

  /**
   * The ChartJS instanac from the template ref
   */
  private graphInstance!: Chart;

  @Prop()
  entries!: Entry[];

  /**
   * Grouped entry datasets matched with their respective configurations
   */
  private get dataConfig(): DataConfig {
    const grouped = groupEntries(this.entries);
    const colorSystolic = "#224ADD";
    const colorDiastolic = "#22A7DD";
    const colorPulse = "#22DDB5";
    return {
      dataSets: [
        {
          backgroundColor: colorSystolic,
          borderColor: colorSystolic,
          data: grouped.systolic,
          label: "Systolic"
        },
        {
          backgroundColor: colorDiastolic,
          borderColor: colorDiastolic,
          data: grouped.diastolic,
          label: "Diastolic"
        },
        {
          backgroundColor: colorPulse,
          borderColor: colorPulse,
          data: grouped.pulse,
          label: "Pulse"
        }
      ],
      labels: grouped.labels
    };
  }

  /**
   * Once HTML is ready, instantiate ChartJS
   */
  mounted() {
    this.initGraph();
  }

  /**
   * Instantiate ChartJS with configurations against the `graphEl` template reference
   */
  private initGraph() {
    const itemBackground = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--app-item-background-rgb");
    const color = `rgba(${itemBackground}, .5)`;
    this.graphInstance = new Chart(this.$refs.graphEl, {
      type: "line",
      data: {
        datasets: this.dataConfig.dataSets,
        labels: this.dataConfig.labels
      },
      options: {
        hover: {
          mode: "nearest",
          intersect: true
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                color
              },
              time: {
                tooltipFormat: "MMM D LT",
                unit: "day"
              },
              type: "time"
            }
          ],
          yAxes: [
            {
              gridLines: {
                color
              }
            }
          ]
        },
        tooltips: {
          mode: "index",
          intersect: false
        }
      }
    });
  }

  /**
   * Update ChartJS instance whenever new data is passed to component
   */
  @Watch("dataConfig")
  private updateData(value: DataConfig) {
    this.graphInstance.data.labels = value.labels;
    this.graphInstance.data.datasets = value.dataSets;
    this.graphInstance.update();
  }
}
</script>
