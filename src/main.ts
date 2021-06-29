import "mutationobserver-shim";
import Vue from "vue";
import Vuelidate from "vuelidate";
import "./registerComponentHook";
import "./plugins/bootstrap-vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
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

axios.defaults.baseURL = process.env.VUE_APP_URL_API + "/api/";

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(Vuesax, {});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
