<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AppLayout from "@/layouts/AppLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

@Component({
  components: { AdminLayout, AppLayout },
})
export default class App extends Vue {
  layout = null;
  @Watch("$route", { immediate: true })
  onLayoutChanged(to: any): void {
    if (to.meta.layout !== undefined) {
      this.layout = to.meta.layout;
    } else {
      this.layout = "AppLayout";
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  text-align: center;
}
body {
  margin: 0 !important;
}
</style>
