import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/loading/Home.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/import",
    name: "Import",
    component: () => import("../views/Import/excelImport.vue"),
  },
  {
    path: "/a",
    name: "Import1",
    component: () => import("../views/Import/index.vue"),
  },
  {
    path: "/contents",
    name: "Contents",
    component: () => import("../views/contents/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
