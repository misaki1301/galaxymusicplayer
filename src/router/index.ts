import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/songs",
    name: "Songs",
    component: () => import("../views/Songs.vue"),
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/artists",
    name: "Artists",
    component: () => import("../views/Artists.vue"),
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/my-profile",
    name: "UserProfile",
    component: () => import("../views/profiles/UserProfile.vue"),
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/artists/:name",
    name: "ArtistProfile",
    component: () => import("../views/profiles/ArtistProfile.vue"),
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/control-panel",
    name: "ControlPanel",
    component: () => import("../views/admin/ControlPanel.vue"),
    meta: {
      layout: "AdminLayout",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
