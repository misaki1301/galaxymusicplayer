<template>
  <div id="app">
    <div class="misaki-grid">
      <vs-sidebar
        background="dark"
        text-white
        v-model="active"
        relative
        open
        square
        class="misaki-sidebar"
      >
        <template #logo>
          <i class="bx bxl-vuejs"></i><i class="bx bxs-music"></i>Galaxy Player
        </template>
        <vs-sidebar-item id="/" to="/" :active="active === '/'">
          <template #icon>
            <i class="bx bx-home"></i>
          </template>
          Inicio
        </vs-sidebar-item>
        <vs-sidebar-item id="songs" :active="active === 'songs'" to="/songs">
          <template #icon>
            <i class="bx bx-disc"></i>
          </template>
          Canciones
        </vs-sidebar-item>
        <vs-sidebar-item id="home" to="/artists" :active="active === 'artists'">
          <template #icon>
            <i class="bx bx-male"></i>
          </template>
          Artistas
        </vs-sidebar-item>
      </vs-sidebar>
      <router-view class="misaki-content" />
    </div>
    <MusicPlayer class="misaki-bottom-media" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MusicPlayer from "@/components/MusicPlayer.vue";
@Component({
  components: { MusicPlayer },
})
export default class App extends Vue {
  active = true;
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mini-player {
  background: rgba(47, 41, 39, 0.51);
  backdrop-filter: blur(4px);
}
.misaki-grid {
  display: flex;
  .misaki-sidebar {
    width: 250px;
    height: 85vh !important;
  }
  .misaki-content {
    flex: 1;
    overflow-y: auto;
    width: auto;
    height: 85vh !important;
  }
}
.misaki-bottom-media {
  display: flex;
  width: 100vw !important;
  height: 15vh !important;
  justify-content: space-around;
}
body {
  margin: 0 !important;
}
</style>
