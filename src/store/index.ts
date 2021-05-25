import Vue from "vue";
import Vuex from "vuex";
//import {Howl, Howler} from "howler"
import Player from "@/classes/Player";
import { Song } from "@/types/Song";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songList: [],
    selectedSong: null,
    mediaPlayer: new Player(),
  },
  mutations: {
    addSong(state, payload) {
      state.selectedSong = payload;
    },
    addSongList(state, payload) {
      state.songList = payload;
    },
  },
  actions: {
    SetCurrentSong({ commit }, payload) {
      commit("addSong", payload);
    },
    setSongList({ commit }, payload) {
      commit("addSongList", payload);
    },
    playSelectedSong({ state }, payload) {
      const current = state.songList.find((x: Song) => x.id === payload.id);
      console.log(current);
      try {
        state.mediaPlayer.stop();
      } catch (e) {
        console.log("Cant Stop");
      }
      state.mediaPlayer.playlist = state.songList;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.mediaPlayer.play(state.songList.indexOf(current));
    },
    pausePlayer({ state }) {
      state.mediaPlayer.pause();
      state.mediaPlayer.isPlaying = false;
    },
    playPlayer({ state }) {
      state.mediaPlayer.resume();
      state.mediaPlayer.isPlaying = true;
    },
    skipToPrev({ state }) {
      state.mediaPlayer.skip("prev");
    },
    skipToNext({ state }) {
      state.mediaPlayer.skip("next");
    },
    setVolume({ state }, payload) {
      state.mediaPlayer.volume(payload);
    },
  },
  getters: {
    currentSong(state) {
      return state.mediaPlayer.currentSong;
    },
    mediaPlayerIsPlaying(state) {
      return state.mediaPlayer.isPlaying;
    },
    getMaxDurationSong(state) {
      return state.mediaPlayer.getMaxDuration();
    },
  },
  modules: {},
});
