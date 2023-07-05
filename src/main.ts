import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import ApexCharts from 'apexcharts';

createApp(App)
  .use(store)
  .mixin({
    beforeMount() {
      this.ApexCharts = ApexCharts;
    },
  })
  .mount('#app');