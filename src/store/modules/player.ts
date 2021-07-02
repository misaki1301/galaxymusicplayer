import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Song } from "@/types/Song";
import Player from "@/classes/Player";
import store from "@/store";

@Module({ namespaced: true, store })
class PlayerState extends VuexModule {
  public interval = 0;
  public currentProgress = 0;
  public songList: Song[] = [];
  public selectedSong: Song | null = {
    id: 1,
    name: "",
    imageCover: "",
    artist: { id: 1, name: "", songs: [], imageProfile: "" },
    filePath: "",
    duration: 0,
  };
  public mediaPlayer = new Player();

  @Mutation
  public addSong(newSong: Song) {
    this.selectedSong = newSong;
  }

  @Mutation
  public addSongList(songList: Song[]) {
    this.songList = songList;
  }

  @Mutation
  public addInterval(interval: any): void {
    this.interval = setInterval(interval, 1000);
  }

  @Mutation
  public removeInterval(): void {
    clearInterval(this.interval);
  }

  @Mutation
  public setProgress(progress: number) {
    console.log("intenrval",progress)
    this.currentProgress = progress;
  }

  @Action({rawError: true})
  setCurrentSong({commit}: any, payload: any) {
    commit("addSong", payload);
  }

  @Action({rawError: true})
  public playSelectedSong(payload: Song): void {
    const current = this.songList.find((x) => x.id === payload.id);
    try {
      this.mediaPlayer.stop();
      this.context.commit("removeInternal");
    } catch (e) {
      console.log("Cant stop RN");
    }
    this.mediaPlayer.playlist = this.songList;
    current && this.mediaPlayer.play(this.songList.indexOf(current));
    const interval = () => {
      const value =
        this.mediaPlayer.getProgress() /
        this.mediaPlayer.getMaxDuration() *
        100;
      this.context.commit("setProgress", value);
    };
    this.context.commit("addInterval", interval);
  }

  @Action({rawError: true})
  public setSongList(payload: any): void {
    this.context.commit("addSongList", payload);
  }

  @Action({rawError: true})
  pausePlayer(): void {
    this.mediaPlayer.pause();
    this.context.commit("removeInterval");
    this.mediaPlayer.isPlaying = false;
  }

  @Action({rawError: true})
  playPlayer() {
    this.mediaPlayer.resume();
    const interval = () => {
      const value =
        this.mediaPlayer.getProgress() /
        this.mediaPlayer.getMaxDuration() *
        100;
      this.context.commit("setProgress", value);
    };
    this.context.commit("addInterval", interval);
    this.mediaPlayer.isPlaying = true;
  }
  @Action({rawError: true})
  skipToPrev() {
    this.mediaPlayer.skip("prev");
  }
  @Action({rawError: true})
  skipToNext() {
    this.mediaPlayer.skip("next");
  }
  @Action({rawError: true})
  setVolume(volume: number): void {
    this.mediaPlayer.volume(volume);
  }
  get currentSong(): any {
    return this.mediaPlayer.currentSong == ""
      ? this.selectedSong
      : this.mediaPlayer.currentSong;
  }
  get mediaPlayerIsPlaying(): any {
    return this.mediaPlayer.isPlaying;
  }
  get maxDurationSong(): any {
    return this.mediaPlayer.getMaxDuration();
  }
  get progressSong(): number {
    return this.currentProgress;
  }
}
export default PlayerState;
