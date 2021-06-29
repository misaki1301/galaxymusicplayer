<template>
  <div class="child p-4">
    <b-row>
      <b-col
        cols="12"
        sm="3"
        md="3"
        lg="3"
        xl="2"
        class="my-2"
        v-for="song in songList"
        :key="song.index"
      >
        <b-card
          class="rounded misaki-song-card h-100"
          :img-src="song.imageCover"
          :title="song.name"
        >
          <b-card-sub-title>
            {{ song.artist.name }}
          </b-card-sub-title>
          <div class="mini-button-play" @click="checkSong(song)">
            <i class="bx bx-play"></i>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Song } from "@/types/Song";
import Player from "@/classes/Player.js";
import { namespace } from "vuex-class";
const playerModule = namespace("player");

@Component
export default class Songs extends Vue {
  songList: Song[] = [];
  volume = 0.2;

  @playerModule.State
  public player!: Player;

  @playerModule.Action
  public setCurrentSong!: (item: any) => void;

  @playerModule.Action
  public setSongList!: (songList: any) => void;

  @playerModule.Action
  public playSelectedSong!: (payload: Song) => void;

  checkSong(song: Song): void {
    this.playSelectedSong(song);
  }

  async getSongs(): Promise<void> {
    try {
      const req = await this.axios.get("songs");
      this.songList = req.data;
      this.setSongList(req.data);
    } catch (e) {
      console.error(e);
    }
  }

  async mounted() {
    await this.getSongs();
  }
}
</script>

<style lang="less" scoped>
.misaki-song-card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 200px;
  border: 0.5px;
  .card-title {
    font-size: 16px;
  }
  .card-img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
}
.mini-button-play {
  position: absolute;
  width: 32px;
  height: 32px;
  top: 16px;
  font-size: 24px;
  color: red;
  font-weight: 600;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transition: all 0.2s ease-in-out;
}
.mini-button-play:hover {
  transform: scale(1.1);
  cursor: pointer;
}
</style>
