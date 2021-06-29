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
      <div class="misaki-content">
        <div class="topbar-misaki">
          <b-row class="align-content-center" style="width: 100%">
            <b-col cols="4"> </b-col>
            <b-col cols="4"></b-col>
            <b-col cols="4">
              <div v-if="!loggedUser"
                class="float-right misaki-side-profile-chip"
                v-b-modal.modal-login
              >
                <img
                  class="imageProfileCircular"
                  :src="imageProfile"
                  alt="imageProfileLogin"
                />
                <span class="mx-4 text-white">Iniciar sesión</span>
              </div>
              <div v-else class="float-right misaki-side-profile-chip">
                <img :src="loggedUser.imageProfile" class="imageProfileCircular" />
                <span class="ml-2 mr-4 text-white">{{loggedUser.username}}</span>
              </div>
            </b-col>
          </b-row>
        </div>
        <router-view class="misaki-inner-content" />
      </div>
    </div>
    <MusicPlayer class="misaki-bottom-media" />
    <b-modal
      id="modal-login"
      ref="modal"
      title="Inicio de sesión"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Nombre de usuario"
          label-for="username-input"
          invalid-feedback="el nombre de usuario es requerido."
        >
          <b-form-input
            id="username-input"
            v-model="$v.user.username.$model"
            :required="!$v.user.username.required"
            :state="$v.user.username.$dirty ? !$v.user.username.$invalid : null"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.user.username.minLength">
            Debe ingresar el nombre de usuario mayor a 4 caracteres
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          label="Contraseña"
          label-for="password-input"
          invalid-feedback="la contraseña es requerida."
        >
          <b-form-input
            id="password-input"
            v-model="$v.user.password.$model"
            type="password"
            :required="!$v.user.password.required"
            :state="$v.user.password.$dirty ? !$v.user.password.$invalid : null"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MusicPlayer from "@/components/MusicPlayer.vue";
import { minLength, required } from "vuelidate/lib/validators";
import { namespace } from "vuex-class";
import { User } from "@/types/User";
const authModule = namespace("auth");

@Component({
  components: { MusicPlayer },
})
export default class App extends Vue {
  active = true;
  imageProfile =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
  user = {
    username: "",
    password: "",
  };
  @authModule.State
  public loggedUser!: User;

  validations(): any {
    return {
      user: {
        username: {
          required,
          minLength: minLength(4),
        },
        password: {
          required,
          minLength: minLength(4),
        },
      },
    };
  }
  public resetModal(): void {
    this.user.username = "";
    this.user.password = "";
  }
  public handleOk(event: any): void {
    event.preventDefault();
    this.handleSubmit();
  }

  public async handleSubmit(): void {
    this.$v.$touch();
    console.log(this.$v.$invalid);
    if (this.$v.$invalid) {
      return;
    }
    console.log(this.user);
    this.LogInUser(this.user);

    this.$nextTick(() => {
      this.$bvModal.hide("modal-login");
    });
  }
  @authModule.Action
  public LogInUser!: (user: User) => void;

  async mounted() {
    //await this.GetUserData();
  }
}
</script>

<style lang="less" scoped>
#app {
  text-align: center;
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
    display: flex;
    flex-direction: column;
    width: auto;
    height: 85vh !important;
    .topbar-misaki {
      background: black;
      display: flex;
      position: sticky;
      height: 64px;
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
  border-radius: 36px;
  border: 2px rgba(255, 255, 255, 0.5) solid;
  display: flex;
  align-items: center;
}
body {
  margin: 0 !important;
}
</style>
