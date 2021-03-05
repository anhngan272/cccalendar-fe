import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initialize } from "@/helpers";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";

/* axios-progress-bar */
const config = { showSpinner: false };
loadProgressBar(config);

initialize(store, router);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')