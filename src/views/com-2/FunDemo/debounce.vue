<template>
  <div>
    <el-button @click="getDebounce">点击</el-button>
  </div>
</template>

<script>
import { debounce } from "./debounce.js";
export default {
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    // getDebounce() {
    //   return debounce(this.handleGetInfo, 500);
    // },
  },
  methods: {
    getDebounce: debounce(function () {
      this.handleGetInfo();
    }, 500),
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
  },
};
</script>

<style></style>
