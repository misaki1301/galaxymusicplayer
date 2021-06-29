import Vue from "vue";
import Vuex from "vuex";
import PlayerState from "@/store/modules/player";
import AuthState from "@/store/modules/auth";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    player: PlayerState,
    auth: AuthState,
  },
});
export default store;
