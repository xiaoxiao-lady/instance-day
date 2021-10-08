<template>
  <div class="home">
    通用名：
    <input type="text" v-model="inputText" @input="handleInput" />
    <div class="list" ref="list">
      <div
        class="item"
        v-for="item in list"
        :key="item.title"
        @click="showLoading(item.title)"
      >
        {{ item.title }}
      </div>
    </div>
    <popup v-show="isShow" @hiddenPopup="hiddenPopup">
      <component :is="currentView"></component>
    </popup>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
let timer = null;
let inputTimer = null;
export default {
  name: "Home",
  components: {
    popup: () => import("./popup.vue"),
    loading1: () => import("./loading1.vue"),
    loading2: () => import("./loading2"),
    loading3: () => import("./loading3"),
    loading4: () => import("./loading4"),
    loading5: () => import("./loading5"),
    loading6: () => import("./loading6"),
    loading7: () => import("./loading7"),
    loading8: () => import("./loading8"),
    loading9: () => import("./loading9"),
    loading10: () => import("./loading10"),
    loading11: () => import("./loading11"),
    loading12: () => import("./loading12"),
    loading13: () => import("./loading13"),
    loading14: () => import("./loading14"),
    loading15: () => import("./loading15"),
    loading16: () => import("./loading16"),
    loading17: () => import("./loading17"),
    loading18: () => import("./loading18"),
    loading19: () => import("./loading19"),
    loading20: () => import("./loading20"),
    loading21: () => import("./loading21"),
    loading22: () => import("./loading22"),
    loading23: () => import("./loading23"),
  },
  data() {
    return {
      inputText: "",
      isShow: false,
      list: [
        {
          title: "loading1",
        },
        {
          title: "loading2",
        },
        {
          title: "loading3",
        },
        {
          title: "loading4",
        },
        {
          title: "loading5",
        },
        {
          title: "loading6",
        },
        {
          title: "loading7",
        },
        {
          title: "loading8",
        },
        {
          title: "loading9",
        },
        {
          title: "loading10",
        },
        {
          title: "loading11",
        },
        {
          title: "loading12",
        },
        {
          title: "loading13",
        },
        {
          title: "loading14",
        },
        {
          title: "loading15",
        },
        {
          title: "loading16",
        },
        {
          title: "loading17",
        },
        {
          title: "loading18",
        },
        {
          title: "loading19",
        },
        {
          title: "loading20",
        },
        {
          title: "loading21",
        },
        {
          title: "loading22",
        },
        {
          title: "loading23",
        },
      ],
      currentView: "loading1",
    };
  },
  mounted() {
    // this.handleGetInfo();

    this.$refs.list.addEventListener("scroll", (e) => {
      console.log("---" + e.target.scrollTop);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        console.log(e.target.scrollTop);
        // timer = undefined;
      }, 30);
    });
  },
  computed: {
    handleInput() {
      return this.throttle(this.handleInputClick, 2000);
    },
  },
  methods: {
    handleInputClick(val) {
      console.log(111);
      // 防抖
      //   if (inputTimer) {
      //     clearInterval(inputTimer);
      //   }
      //   inputTimer = setTimeout(() => {
      //     console.log("防抖");
      //   }, 1000);
      //   节流
    },
    throttle(fn, wait) {
      let last = 0; //这个节流return出去的是函数所以执行的时候执行的就函数不会执行这个
      return function() {
        let now = new Date().valueOf();
        let that = this;
        let args = arguments;
        if (now - last > wait) {
          fn.apply(that, args);
          last = now;
        }
      };
    },

    handleGetInfo() {
      axios({
        method: "get",
        url: "/api/user/getInfo",
      })
        .then((res) => {
          console.log(res);
        })
        .catch(() => {});
    },
    hiddenPopup() {
      this.isShow = false;
    },
    showLoading(item) {
      this.isShow = true;
      this.currentView = item;
    },
  },
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.list {
  width: 400px;
  height: 100%;
  overflow-y: scroll;
  margin: 0 auto;
}
.list::-webkit-scrollbar {
  display: none;
}
.item {
  width: 100%;
  height: 200px;
  border-radius: 24px;
  text-align: center;
  line-height: 200px;
  color: #fff;
  background-color: aqua;
  overflow: hidden;
  margin-bottom: 24px;
}
.item img {
  width: 100%;
}
</style>
