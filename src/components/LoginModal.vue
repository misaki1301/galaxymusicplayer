<template>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { minLength, required } from "vuelidate/lib/validators";
import { namespace } from "vuex-class";
import { User } from "@/types/User";
const authModule = namespace("auth");

@Component
export default class LoginModal extends Vue {
  user = {
    username: "",
    password: "",
  };
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

  public async handleSubmit(): Promise<void> {
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
  public LogInUser!: (user: any) => void;
}
</script>

<style scoped>

</style>
