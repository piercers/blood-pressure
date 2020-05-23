<template>
  <canvas ref="chartCtx"></canvas>
</template>

<script lang="ts">
import { Chart as ChartJs } from "chart.js";
import { Component, Prop, Vue } from "vue-property-decorator";

import { Entry } from "@/core/entries.interfaces";

const randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

@Component
export default class Chart extends Vue {
  $refs!: {
    chartCtx: HTMLCanvasElement;
  };

  @Prop() private entries!: Entry[];

  mounted() {
    this.chart();
  }

  chart() {
    new ChartJs(this.$refs.chartCtx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "#ff0000",
            borderColor: "#ff0000",
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ],
            fill: false
          },
          {
            label: "My Second dataset",
            fill: false,
            backgroundColor: "blue",
            borderColor: "blue",
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Chart.js Line Chart"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        }
        // TODO This is throwing a typing error
        // scales: {
        //   x: {
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: "Month"
        //     }
        //   },
        //   y: {
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: "Value"
        //     }
        //   }
        // }
      }
    });
  }
}
</script>
