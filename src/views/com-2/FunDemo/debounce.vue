<template>
  <div>
    <h1>{{ data.id }}</h1>
    <input type="text" :value="id" />
    <el-button v-debounce1="[handleGetInfo, 3000]">点击1</el-button>
  </div>
</template>

<script>
import { debounce } from "./debounce.js";
function debounce1(fn, wait = 200) {
  let timer = null;
  let that = this;
  return function() {
    clearTimeout(timer);
    timer = null;
    timer = setTimeout(() => {
      fn.apply(that, arguments);
    }, wait);
  };
}

export default {
  data() {
    return {
      timer: null,
      data: {},
      id: 0,
    };
  },
  mounted() {
    this.id = this.data?.id;
  },
  computed: {
    getDebounce() {
      debounce1(this.handleGetInfo, 500);
      return debounce1(this.handleGetInfo, 500);
    },
  },
  methods: {
    // getDebounce: debounce(function() {
    //   this.handleGetInfo();
    // }, 500),
    // getDebounce() {
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //     this.timer = null;
    //   }
    //   this.timer = setTimeout(() => {
    //     this.handleGetInfo();
    //   }, 1000);
    // },
    handleGetInfo() {
      console.log("防抖成功");
    },
    // getDebounce() {
    //   if (this.timer) {
    //     cleatTimer(timer);
    //     this.timer = null;
    //   }
    //   timer = setTimeout(() => {
    //     this.getDebounce();
    //   }, 500);
    // },
  },
};
</script>

<style></style>
