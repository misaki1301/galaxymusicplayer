<template>
  <b-navbar class="topbar-misaki">
    <b-navbar-nav class="ml-auto">
      <b-nav-item cols="4">
        <div
          v-if="!currentUser"
          class="float-right misaki-side-profile-chip"
          v-b-modal.modal-login
        >
          <b-avatar
            size="36"
            :src="imageProfile"
            alt="imageProfileLogin"
          />
          <span class="mx-4 text-white">Iniciar sesión</span>
        </div>
        <b-nav-item v-else class="float-right misaki-side-profile-chip">
          <b-nav-item-dropdown>
            <template #button-content>
              <b-avatar size="36" :src="currentUser.imageProfile"></b-avatar>
              <span class="text-white ml-2">{{ currentUser.username }}</span>
            </template>
            <b-dropdown-item to="my-profile">Mi perfil</b-dropdown-item>
            <b-dropdown-item to="/control-panel">Panel de control</b-dropdown-item>
            <b-dropdown-item @click="logOutUser">Cerrar sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav-item>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {namespace} from "vuex-class";
import { User } from "../types/User";
const authModule = namespace("auth");

@Component
export default class NavBar extends Vue {
  imageProfile =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  @authModule.Getter
  public currentUser!: User | null;
  @authModule.Action
  public logOutUser!: () => Promise<boolean>;
}
</script>

<style scoped></style>
