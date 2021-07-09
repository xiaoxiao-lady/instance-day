import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Table, TableColumn, Button, Message } from "element-ui";
import elTableInfiniteScroll from "el-table-infinite-scroll";

Vue.use(elTableInfiniteScroll);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Message);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
