<template>
  <div class="mini-player">
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
          <input type="range" v-model="currentDuration" :maxlength="100" />
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
import { namespace } from "vuex-class";
const playerModule = namespace("player");
import { Song } from "@/types/Song";
import Player from "@/classes/Player";
import player from "@/store/modules/player";

@Component
export default class MusicPlayer extends Vue {
  volume = 75;
  currentDuration = 0;
  interval = null;

  @playerModule.Getter
  public mediaPlayerIsPlaying!: boolean;

  @playerModule.Getter
  public currentSong!: any;

  @playerModule.Getter
  public maxDurationSong!: any;

  @playerModule.Getter
  public progressSong!: any;

  @playerModule.State
  public mediaPlayer!: Player;

  @playerModule.Action
  public pausePlayer!: () => void;

  @playerModule.Action
  public playPlayer!: () => void;

  @playerModule.Action
  public skipToPrev!: () => void;

  @playerModule.Action
  public skipToNext!: () => void;

  @playerModule.Action
  public setVolume!: (volume: number) => void;

  @Watch("volume", { immediate: true })
  onVolumeChanged(newVal: number): void {
    let aux = parseFloat((newVal / 100).toFixed(1));
    this.setVolume(aux);
  }

  getProgressCurrentSong(): void {
    this.interval = setInterval(() => {
      this.currentDuration = (this.progressSong) / this.maxDurationSong * 100;
      console.log(this.progressSong);
      console.log(this.maxDurationSong);
      console.log(this.currentDuration);
    }, 1000);
  }

  setActionMedia(): void {
    if (this.mediaPlayerIsPlaying) {
      this.pausePlayer();
      clearInterval(this.interval);
    } else {
      this.playPlayer();
      this.getProgressCurrentSong();
      console.log("inicio de intervals")
    }
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
  width: 100%;
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
