<template>
  <div id="appUser">
    <div class="misaki-grid">
      <vs-sidebar
        background="dark"
        text-white
        v-model="activePath"
        relative
        open
        square
        class="misaki-sidebar"
      >
        <template #logo>
          <img src="@/assets/logo-neo-dark.svg" />Galaxy Player
        </template>
        <vs-sidebar-item id="Home" to="/" :active="activePath === 'Home'">
          <template #icon>
            <i class="bx bx-home"></i>
          </template>
          Inicio
        </vs-sidebar-item>
        <vs-sidebar-item
          id="Songs"
          :active="activePath === 'songs'"
          to="/songs"
        >
          <template #icon>
            <i class="bx bx-disc"></i>
          </template>
          Canciones
        </vs-sidebar-item>
        <vs-sidebar-item
          id="Artists"
          to="/artists"
          :active="activePath === 'Artists'"
        >
          <template #icon>
            <i class="bx bx-male"></i>
          </template>
          Artistas
        </vs-sidebar-item>
      </vs-sidebar>
      <div class="misaki-content">
        <NavBar />
        <keep-alive max="5" :key="$route.fullPath">
          <router-view class="misaki-inner-content" />
        </keep-alive>
      </div>
    </div>
    <MusicPlayer class="misaki-bottom-media" />
    <LoginModal />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MusicPlayer from "@/components/MusicPlayer.vue";
import { namespace } from "vuex-class";
import { User } from "@/types/User";
import LoginModal from "@/components/LoginModal.vue";
import NavBar from "@/components/NavBar.vue";
const authModule = namespace("auth");

@Component({
  components: { NavBar, LoginModal, MusicPlayer },
})
export default class AppLayout extends Vue {
  @authModule.Getter
  public currentUser!: User | null;
  @authModule.Getter
  public isUserLogged!: boolean;
  @authModule.Action
  public getUserData!: () => Promise<void>;
  get activePath(): string | null | undefined {
    return this.$route.name;
  }
}
</script>

<style lang="less" scoped>
.mini-player {
  background: rgba(29, 28, 28, 0.51);
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
    display: flex;
    flex-direction: column;
    width: auto;
    height: 85vh !important;
    .topbar-misaki {
      background: black;
      display: flex;
      position: sticky;
      height: 64px;
      z-index: 100;
    }
    .misaki-inner-content {
      overflow-y: auto;
      height: 100%;
    }
  }
}
.imageProfileCircular {
  border-radius: 50%;
  width: 36px;
  height: 36px;
}
.misaki-bottom-media {
  display: flex;
  width: 100vw !important;
  height: 15vh !important;
  justify-content: space-around;
}
.misaki-side-profile-chip {
  display: flex;
  align-items: center;
}
</style>
