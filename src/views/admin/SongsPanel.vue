<template>
  <div class="p-4 text-center" style="background: white">
    <h4>Tabla de canciones</h4>
    <b-button v-b-modal.modal-add-song class="float-right" variant="success"><i class="bx bx-plus"></i> Add song</b-button>
    <br>
    <b-table hover bordered :items="songs" :fields="fields" style="width: 400px">
      <template #cell(artist.name)="data">
        {{ data.item.artist.name }}
      </template>
    </b-table>
    <b-modal id="modal-add-song" title="Add Songs" ref="modal-add-song" @ok="handleOk">
      <b-form ref="form" @submit.stop.prevent="uploadSong">
        <b-form-group
          label="Song Name"
          label-for="song-input"
        >
          <b-form-input
            id="song-input"
            v-model="$v.song.name.$model"
            :required="!$v.song.name.required"
            :state="$v.song.name.$dirty ? !$v.song.name.$invalid : null"
          />
        </b-form-group>
        <b-form-group
          label="Artist"
          label-for="song-artist"
          >
          <b-form-select
           id="song-artist"
           :options="artists"
           v-model="song.artist"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label-for="song-file"
          label="File"
        >
          <b-form-file
            v-model="song.file"
            :state="Boolean(song.file)"
            placeholder="choose a file"
            accept="audio/*"/>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Song } from "@/types/Song";
import { Artist } from "@/types/Artist";
import { minLength, required } from "vuelidate/lib/validators";

@Component
export default class SongsPanel extends Vue {
  song = {
    name: "",
    artist: 0,
    file: "",
  };
  artists:[] = [];
  songs: Song[] = [];
  fields = [
    { key: "id" },
    { key: "name", sortable: true },
    { key: "artist.name", label: "Artist", sortable: true },
  ];
  validations(): any {
    return {
      song: {
        name: {
          required,
          minLength: minLength(4),
        },
        artist: {
          required,
        },
      },
    };
  }
  private async getArtists(): Promise<void> {
    try{
      const req = await this.axios.get("/artists");
      this.artists = req.data.map((x: Artist) => {
        return { value: x.id, text: x.name }
        //return x.id
      });
    } catch (e) {
      console.log(e);
    }
  }
  private async getSongs(): Promise<void> {
    try {
      const req = await this.axios.get("/songs");
      this.songs = req.data;
    } catch (e) {
      console.error(e);
    }
  }
  public handleOk(event: any): void {
    event.preventDefault();
    this.uploadSong();
  }
  public async uploadSong(): Promise<void> {
    try{
      const form = new FormData()
      form.append("name", this.song.name)
      form.append("ArtistId", this.song.artist.toString())
      form.append("song", this.song.file)
      await this.axios
          .post("/songs",
            form,
            { headers: { 'Content-Type': 'multipart/form-data' } })
    } catch (e) {
      console.error(e);
    }
  }
  async mounted(): Promise<void> {
    await this.getSongs();
    await this.getArtists();
  }
}
</script>

<style scoped></style>
