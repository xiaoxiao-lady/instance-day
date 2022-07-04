<template>
  <div></div>
</template>

<script>
import { cloneDeep } from "./deepclone.js";
import "./shallowclone.js";
export default {
  mounted() {
    let obj = {
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
    let obj1 = {
      name: "王金玉",
      school: {
        address: "大同",
        name: "山西大同大学",
      },
    };
    // 循环引用的对象
    obj1.a = obj1; //调用deepClone会报错
    // 函数
    const fun = function(a) {
      return a;
    };
    // 普通值
    const num = 2;
    // 对象类基础类型
    const numObj = new Number(3);

    const res = cloneDeep(obj1);
    // res.name = "王小玉";
    console.log("----", res);
    console.log("----", obj1.name);
    console.log("+++++", res.name.toString());
  },
  created() {},
  methods: {
    // 测试深拷贝浅拷贝赋值三者之间的区别
    test() {},
  },
};
</script>

<style></style>
