import Vue from "vue";
import Vuex from "vuex";
import PlayerState from "@/store/modules/player";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    player: PlayerState,
  },
});
export default store;
