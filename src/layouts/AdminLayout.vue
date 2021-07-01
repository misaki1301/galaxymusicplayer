<template>
<div id="admin">
  <b-navbar type="dark" variant="info">
    <b-navbar-brand>
      Galaxy Player
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item>Canciones</b-nav-item>
      <b-nav-item>Artistas</b-nav-item>
      <b-nav-item>Albumnes</b-nav-item>
      <b-nav-item-dropdown text="Usuario" right>
        <b-dropdown-item>Configuración</b-dropdown-item>
        <b-dropdown-item to="/">Regresar a la aplicación</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
  <router-view />
</div>
</template>

<script>
export default {
  name: "AdminLayout"
};
</script>

<style scoped>

</style>
