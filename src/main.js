import Vue from "vue";
import "./assets/css/reset.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";

import { Message } from "element-ui";
import elTableInfiniteScroll from "el-table-infinite-scroll";
import html2canvas from "html2canvas";

Vue.use(elTableInfiniteScroll);
Vue.use(ElementUi);
Vue.use(Message);
Vue.prototype.$message = Message;
Vue.prototype.convertToImage = function(container, options = {}) {
  // 设置放大倍数
  const scale = window.devicePixelRatio;

  // 传入节点原始宽高
  const _width = container.offsetWidth;
  const _height = container.offsetHeight;

  let { width, height } = options;
  width = width || _width;
  height = height || _height;

  // html2canvas配置项
  const ops = {
    scale,
    // width,
    // height,
    useCORS: true,
    allowTaint: false,
    ...options,
  };

  return html2canvas(container, ops).then((canvas) => {
    // 返回图片的二进制数据
    return canvas.toDataURL("image/png");
  });
};
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
