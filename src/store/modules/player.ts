import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Song } from "@/types/Song";
import Player from "@/classes/Player";
import store from "@/store";

@Module({ namespaced: true, store })
class PlayerState extends VuexModule {
  public songList: Song[] = [];
  public selectedSong: Song = {
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

  @Action({rawError: true})
  setCurrentSong({commit}: any, payload: any) {
    commit("addSong", payload);
  }

  @Action({rawError: true})
  public playSelectedSong(payload: Song): void {
    const current = this.songList.find((x) => x.id === payload.id);
    try {
      this.mediaPlayer.stop();
    } catch (e) {
      console.log("Cant stop RN");
    }
    this.mediaPlayer.playlist = this.songList;
    current && this.mediaPlayer.play(this.songList.indexOf(current));
  }
  @Action({rawError: true})
  public setSongList(payload: any): void {
    this.context.commit("addSongList", payload);
  }
  @Action({rawError: true})
  pausePlayer(): void {
    this.mediaPlayer.pause();
    this.mediaPlayer.isPlaying = false;
  }
  @Action({rawError: true})
  playPlayer() {
    this.mediaPlayer.resume();
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
}
export default PlayerState;
