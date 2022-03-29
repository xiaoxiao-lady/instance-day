<template>
  <div>
    {{ aa }}
  </div>
</template>

<script>
// Vue实例化
import Vue from "vue";
let vm = new Vue({
  el: "#app",
  data() {
    return {
      aa: 1,
      bb: 2,
    };
  },
  template: `<div id="a">hello 这是我自己写的Vue{{name}}</div>`,
  methods: {
    doSomething() {},
  },
  watch: {
    // aa(newVal, oldVal) {
    //   console.log(newVal);
    // },

    // aa: {
    //   handler(newVal， oldVal) {
    //     console.log(newVal);
    //   },
    //   deep: true
    // },
    // aa: 'doSomething',
    aa: [
      // {
      //   handler(newVal, oldVal) {
      //     console.log("1", newVal);
      //   },
      //   deep: true,
      // },
      {
        handler(newVal, oldVal) {
          console.log("2", newVal);
        },
        deep: true,
      },
    ],
  },
});
setTimeout(() => {
  vm.aa = 1111;
}, 1000);
export default {};
</script>

<style></style>
