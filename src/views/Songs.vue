<template>
  <div class="child">
    <h1>Songs</h1>
    <vs-row w="6" style="margin-top: 16px">
      <vs-col type="flex" justify="center" align="center" w="12">
        <vs-card
          style="margin: 16px"
          v-for="song in songList"
          :key="song.index"
        >
          <template #title>
            <h3>{{ song.name }}</h3>
          </template>
          <template #img>
            <img :src="song.imageCover" alt="" />
          </template>
          <template #text>
            <p>{{ song.artist.name }}</p>
          </template>
          <template #interactions>
            <vs-button danger icon @click="checkSong(song)">
              <i class="bx bx-play"></i>
            </vs-button>
            <vs-button class="btn-chat" shadow primary>
              <i class="bx bx-heart"></i>
              <span class="span">54</span>
            </vs-button>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Song } from "@/types/Song";
import { mapActions } from "vuex";
import Player from "@/classes/Player.js";

@Component({
  methods: {
    async getSongs(): void {
      try {
        const req = await this.axios.get("songs");
        console.table(req.data);
        this.songList = req.data;
        this.setSongList(req.data);
      } catch (e) {
        console.error(e);
      }
    },
    checkSong(song: void) {
      //this.SetCurrentSong(song);
      //this.player = new Player([song]);
      //this.player.play();
      this.playSelectedSong(song);
    },
    ...mapActions(["SetCurrentSong", "setSongList", "playSelectedSong"]),
  },
  async mounted() {
    await this.getSongs();
  },
})
export default class Songs extends Vue {
  private songList: Song[] = [];
  private player: Player;
  private volume = 0.5;
}
</script>

<style scoped></style>
