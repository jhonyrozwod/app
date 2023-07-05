<template>
  <div>
    <apexchart
      type="candlestick"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import { Prop, defineComponent } from "vue";

export default defineComponent({
  name: "CandleStickChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    candles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "Bitcoin last prices",
          align: "left",
        },
        xaxis: {
          type: "time",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  },
  computed: {
    series() {
      return [
        {
          data: this.candles,
        },
      ];
    },
  },
});
</script>

<style></style>
