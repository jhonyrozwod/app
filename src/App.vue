<template>
  <div>
    <Header />
    <CandleStickChart v-if="candles.length > 0" :candles="candles" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { getModule } from "vuex-module-decorators";
import io from "socket.io-client";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import CandleStickChart from "./components/CandleStickChart.vue";
import Header from "./components/Header.vue";
import store from "./store";
import CandleStore from "./store/modules/CandleStore";
import Candle from "./models/Candle";

@Options({
  components: {
    Header,
    CandleStickChart,
  },
})
export default class App extends Vue {
  candleStore = getModule(CandleStore, store);
  socket = io("http://localhost:3000");

  mounted() {
    this.candleStore.loadInitialCandles();

    this.socket.on("newCandle", (msg: any) => {
      const candle = new Candle(msg);
      this.candleStore.addCandle(candle);
      createToast("New candle arrived!", { type: "info" });
    });
  }

  get candles() {
    return this.candleStore.candles;
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
