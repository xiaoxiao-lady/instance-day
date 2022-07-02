<template>
  <div></div>
</template>

<script>
import { cloneDeep } from "./deepclone.js";
export default {
  mounted() {
    const obj = {
      name: "王金玉",
      school: {
        address: "大同",
        name: "山西大同大学",
        a: {
          aa: "a",
        },
      },
    };
    //普通的对象
    const obj1 = {
      name: "王金玉",
      school: {
        address: "大同",
        name: "山西大同大学",
      },
    };
    // 函数
    const fun = function(a) {
      return a;
    };
    // 普通值
    const num = 2;
    // 对象类基础类型
    const numObj = new Number(3);
    // 循环引用的对象
    obj1.a = obj1; //调用deepClone会报错
    const res = cloneDeep(fun);
    console.log("----", res);
  },
  methods: {},
};
</script>

<style></style>
