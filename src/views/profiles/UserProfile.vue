<template>
<div class="child p-4">
  <div class="text-left">
    <div class="row align-items-center" style="margin: 0px">
      <b-avatar size="96" :src="currentUser.imageProfile"></b-avatar>
      <div class="ml-4">
        <h3>{{currentUser.username}}</h3>
        <h6>Miembro desde 2020</h6>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "@/types/User";
const authModule = namespace("auth");

@Component
export default class UserProfile extends Vue {
  @authModule.Getter
  public currentUser!: User | null;
}
</script>

<style scoped>

</style>
