<template>
  <div>
    <h1>Blood Pressure</h1>
    <section>
      <!-- TODO Move to own component (pass entries via props) -->
      <canvas ref="myChart"></canvas>
    </section>
    <section>
      <h2>Entries</h2>
      <ul>
        <li v-for="entry of entries" v-bind:key="entry.dateTime">{{ entry }}</li>
      </ul>
    </section>
    <section class="add-entry">
      <h2>Add Entry</h2>
      <AddEntry v-on:submit="addEntry" />
    </section>
  </div>
</template>

<script lang="ts">
// TODO Not sure why this is erroring
import { Chart } from "chart.js";
import { Component, Vue } from "vue-property-decorator";

import AddEntry from "@/components/AddEntry.vue";
import { Entry } from "@/core/entries.interfaces";

const randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

@Component({
  components: {
    AddEntry
  }
})
export default class Entries extends Vue {
  $refs!: {
    myChart: HTMLCanvasElement;
  };

  mounted() {
    this.chart();
  }

  entries: Entry[] = [];

  chart() {
    new Chart(this.$refs.myChart, {
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
        },
        scales: {
          // TODO This is throwing a typing error
          x: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Month"
            }
          },
          y: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Value"
            }
          }
        }
      }
    });
  }

  addEntry(entry: Entry) {
    this.entries.push(entry);
  }
}
</script>
