// eslint-disable-next-line no-unused-vars
import { Howl, Howler } from "howler";
export default class Player {
  playlist = [];
  index = null;
  duration = 0;
  isPlaying = false;
  progress = 0;
  currentSong = "";
  sound = null;
  actionsHandlers = [
    [
      "play",
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      () => {
        this.resume();
      },
    ],
    [
      "pause",
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      () => {
        this.pause();
      },
    ],
    [
      "previoustrack",
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      () => {
        this.skip("prev");
      },
    ],
    [
      "nexttrack",
      () => {
        this.skip("next");
      },
    ],
    [
      "stop",
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      () => {
        this.stop();
      },
    ],
    //['seekbackward',  (details) => { /* ... */ }],
    //['seekforward',   (details) => { /* ... */ }],
    //['seekto',        (details) => { /* ... */ }],
  ];

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(playlist) {
    this.playlist = playlist;
    console.log("the current playlist");
    console.log(playlist);
    this.index = 0;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getCurrentSong() {
    return this.currentSong;
  }

  getMaxDuration() {
    return this.duration;
  }

  getProgress() {
    return this.progress;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setProgress(val) {
    this.progress = val;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  play(index) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;

    index = typeof index === "number" ? index : self.index;
    //the current song is selected by the index parameter
    let data = self.playlist[index];
    if (data.howl) {
      this.sound = data.howl;
    } else {
      this.sound = data.howl = new Howl({
        src: [data.filePath],
        html5: true,
        onplay: function () {
          console.log(self.playlist[index]);
          self.setProgress(self.sound.seek());
          self.setProgress(setInterval(self.sound.seek(), 1000));
        },
        onload: function () {
          self.duration = self.sound.duration();
        },
        onend: function () {
          self.skip("next");
        },
      });
    }
    //set current song
    this.currentSong = data;
    //begin the sound :v
    this.sound.play();
    this.isPlaying = true;
    //add metadata to control shit
    if ("mediaSession" in navigator) {
      // eslint-disable-next-line no-undef
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.name,
        artist: data.artist.name,
        artwork: [
          { src: data.imageCover, sizes: "96x96", type: "image/png" },
          { src: data.imageCover, sizes: "128x128", type: "image/png" },
          { src: data.imageCover, sizes: "192x192", type: "image/png" },
          { src: data.imageCover, sizes: "256x256", type: "image/png" },
          { src: data.imageCover, sizes: "384x384", type: "image/png" },
          { src: data.imageCover, sizes: "512x512", type: "image/png" },
        ],
      });
    }
    for (const [action, handler] of this.actionsHandlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (error) {
        console.log(
          `The media session action "${action}" is not supported yet.`
        );
      }
    }
    //keep track the current played song
    self.index = index;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  pause() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;
    //get current howl want to stop
    this.sound = self.playlist[self.index].howl;

    //pause the shit
    this.sound.pause();

    this.isPlaying = false;
  }
  resume() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;
    this.sound = self.playlist[self.index].howl;
    this.sound.play();
    this.isPlaying = true;
  }
  stop() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;
    //get current howl want to stop
    this.sound = self.playlist[self.index].howl;
    if (this.sound != null) {
      this.sound.stop();
      this.sound.unload();
      this.sound = null;
    }
    this.isPlaying = false;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  skip(direction) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;

    let index = 0;
    if (direction === "prev") {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }
    self.skipTo(index);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  skipTo(index) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self = this;

    //stop current track;
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }
    self.play(index);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  volume(val) {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-this-alias,@typescript-eslint/no-unused-vars
    let self = this;

    Howler.volume(val);
  }
}
