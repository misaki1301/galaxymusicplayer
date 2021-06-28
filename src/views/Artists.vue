<template>
  <div class="child p-4">
    <h1>Esta es la pagina de artistas</h1>
    <b-row>
      <b-col cols="3" v-for="artist in artistList" :key="artist.index">
        <div>
          <img
            class="misaki-artist-cover-box"
            :src="artist.imageProfile"
            width="200"
            height="200"
            alt="artist"
          />
          <p class="misaki-artist-label">{{ artist.name }}</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Artist } from "@/types/Artist";

@Component
export default class Artists extends Vue {
  artistList: Artist[] = [];

  async getArtistList(): Promise<void> {
    try {
      const req = await this.axios.get("artists");
      console.table(req.data);
      this.artistList = req.data;
    } catch (e) {
      console.error(e);
    }
  }

  async mounted(): Promise<void> {
    await this.getArtistList();
  }
}
</script>

<style scoped lang="less">
.misaki-artist-cover-box {
  object-fit: cover;
}
.misaki-artist-label {
  font-weight: 500;
}
</style>
