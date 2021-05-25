<template>
  <div class="mini-player" v-if="currentSong">
    <div class="divider-player">
      <div class="left-control-media">
        <div>
          <vs-avatar square size="64">
            <img :src="currentSong.imageCover" />
          </vs-avatar>
        </div>
        <div>
          <span style="font-size: 16px; font-weight: bold"
            >{{ currentSong.name
            }}<i
              style="vertical-align: middle; margin-left: 8px"
              class="bx bx-heart"
          /></span>
          <br />
          <span>{{ currentSong.artist.name }}</span>
        </div>
      </div>
      <div class="center-media-actions">
        <div class="seekbar-media">
          <input type="range" step="2" />
        </div>
        <div class="actions-media-buttons">
          <div>
            <vs-button circle @click="skipToPrev">
              <i class="bx bx-skip-previous" />
            </vs-button>
          </div>
          <div>
            <vs-button circle @click="setActionMedia">
              <i
                :class="!mediaPlayerIsPlaying ? 'bx bx-play' : 'bx bx-pause'"
              />
            </vs-button>
          </div>
          <div>
            <vs-button circle @click="skipToNext">
              <i class="bx bx-skip-next" />
            </vs-button>
          </div>
        </div>
      </div>
      <div class="right-actions">
        <div>
          <i class="bx bx-volume" />
        </div>
        <div>
          <input type="range" v-model="volume" min="0" max="100" step="1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState, mapGetters, mapActions } from "vuex";
import { Song } from "@/types/Song";
import Player from "@/classes/Player";

@Component({
  computed: {
    ...mapState(["mediaPlayer"]),
    ...mapGetters(["currentSong", "mediaPlayerIsPlaying"]),
  },
  methods: {
    ...mapActions([
      "pausePlayer",
      "playPlayer",
      "skipToPrev",
      "skipToNext",
      "setVolume",
    ]),
    setActionMedia(): void {
      if (this.mediaPlayerIsPlaying) {
        this.pausePlayer();
      } else {
        this.playPlayer();
      }
    },
  },
})
export default class MusicPlayer extends Vue {
  private selectedSong: Song = {};
  private volume = 75;
  private mediaPlayerIsPlaying!: boolean;
  private currentSong = null;
  private mediaPlayer: Player = {};

  @Watch("volume", { immediate: true })
  onVolumeChanged(newVal: number): void {
    let aux = (newVal / 100).toFixed(1);
    this.setVolume(aux);
  }
}
</script>

<style scoped lang="less">
.actions-media-buttons {
  display: flex;
  flex-direction: row;
}
.center-media-actions {
  min-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.seekbar-media {
  align-self: stretch;
}
.seekbar-media > input[type="range"] {
  width: 100%;
}
.divider-player {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 0px 16px 0px 16px;
  text-align: left;
  justify-content: space-between;
}
.divider-player > div {
  margin: 16px;
}

.divider-player {
  .left-control-media {
    flex: 1;
    align-items: center;
  }
  .center-media-actions {
    flex: 2;
    align-items: center;
  }
  .right-actions {
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
  }
}

.left-control-media {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  div:last-child {
    margin-right: 8px;
  }
}
</style>
