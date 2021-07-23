import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";

import { Message } from "element-ui";
import elTableInfiniteScroll from "el-table-infinite-scroll";

Vue.use(elTableInfiniteScroll);
Vue.use(ElementUi);
Vue.use(Message);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
