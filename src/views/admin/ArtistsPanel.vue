<template>
  <h1>
    Hola Artistas XD
  </h1>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import { Artist } from "../../types/Artist";

@Component
export default class ArtistsPanel extends Vue {
  artists: Artist[] = [];

  private async getArtists(): Promise<void> {
    try {
      const req = await this.axios.get("artists")
      this.artists = req.data;
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>

</style>
