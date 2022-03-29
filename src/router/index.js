import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home/home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "/import",
        name: "第一部分",
        component: () => import("../views/parent.vue"),

        children: [
          {
            path: "/a",
            name: "导入1",
            component: () => import("../views/com-1/Import/index.vue"),
          },
          {
            path: "/contents",
            name: "侧边导航",
            component: () => import("../views/com-1/contents/index.vue"),
          },
          {
            path: "/pic",
            name: "图片上传",
            component: () => import("../views/com-1/pic/index.vue"),
          },
          {
            path: "/parse",
            name: "解析网页",
            component: () => import("../views/com-1/parsePages/index.vue"),
          },
          {
            path: "/echarts",
            name: "图表",
            component: () => import("../views/com-1/echart/index.vue"),
          },
          {
            path: "/tree",
            name: "树",
            component: () => import("../views/com-1/tree/index.vue"),
          },
          {
            path: "/layout",
            name: "九宫格",
            component: () => import("../views/com-1/layout/index.vue"),
          },
          {
            path: "/page1",
            name: "积分动画",
            component: () => import("../views/com-1/page1/index.vue"),
          },
          {
            path: "/page3",
            name: "v-model实例",
            component: () => import("../views/com-1/page3/index.vue"),
          },
        ],
      },
      {
        path: "/fun",
        name: "函数",
        component: () => import("../views/parent.vue"),
        children: [
          {
            path: "/debounce",
            name: "防抖节流",
            component: () => import("../views/com-2/FunDemo/debounce.vue"),
          },
          {
            path: "/deep-clone",
            name: "深拷贝",
            component: () => import("../views/com-2/FunDemo/deepClone.vue"),
          },
        ],
      },
      {
        path: "/data-type",
        name: "数据类型",
        component: () => import("../views/parent.vue"),
        // children: [
        //   {
        //     path: "/instanceof",
        //     name: "instanceof",
        //     component: () => import("../views/data-type/instanceof/index.vue"),
        //   },
        //   {
        //     path: "/deep-clone",
        //     name: "深拷贝",
        //     component: () => import("../views/com-2/FunDemo/deepClone.vue"),
        //   },
        // ],
      },
      {
        path: "/vue",
        name: "vue2",
        component: () => import("../views/parent.vue"),
        children: [
          {
            path: "/page3-1",
            name: "v-model实例",
            component: () => import("../views/com-3/page1/index.vue"),
          },
          {
            path: "/page3-2",
            name: "v-bind.sync实例",
            component: () => import("../views/com-3/page2/index.vue"),
          },
          {
            path: "/page3-3",
            name: "watch探索",
            component: () => import("../views/com-3/page3/index.vue"),
          },
          {
            path: "/page3-4",
            name: "v-for上面的key",
            component: () => import("../views/com-3/page4/index.vue"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
