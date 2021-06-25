import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Vuesax from "vuesax";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";

import "boxicons/css/boxicons.css";
import "vuesax/dist/vuesax.css"; //Vuesax Styles
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://galaxyplayer.somee.com/api/";

Vue.use(VueAxios, axios);
Vue.use(Vuesax, {});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
