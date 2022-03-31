<template>
  <div>
    <div>
      <h1>场景一</h1>
      <p>提交表单的验证功能</p>
      <el-button type="primary" @click="onsubmit">if-else提交</el-button>
      <el-button @click="onsubmit1">策略模式提交</el-button>
    </div>
    <div>
      <h1>场景二</h1>
      <p>J计算绩效</p>
      <el-button type="primary" @click="onCalculate">if-else计算</el-button>
      <el-button @click="onCalculate1">策略模式计算</el-button>
    </div>
    <div>
      <h1>场景三</h1>
      <p>filters常使用</p>
      <p>{{ sex | formatSex }}</p>
    </div>
  </div>
</template>

<script>
import onsubmit from "./strategies1"; //策略模式案例1
import onsubmit1 from "./nomal1.js"; //策略模式案例1
import calculateBonus from "./strategies2.js"; //策略模式案例1
import calculateBonus1 from "./nomal2.js"; //策略模式案例1

export default {
  data() {
    return {
      sex: "2",
    };
  },
  mounted() {},
  filters: {
    // formatSex(val) {
    //   const actions = {
    //     1: "女",
    //     2: "男",
    //     default: "未知",
    //   };
    //   return actions[val] || actions["default"];
    // },
    formatSex(val) {
      if (val == 1) {
        return "女";
      } else if (val == 2) {
        return "男";
      } else {
        return "未知";
      }
    },
  },
  methods: {
    onsubmit,
    onsubmit1,
    onCalculate() {
      console.log(calculateBonus("B", 1000));
      console.log(calculateBonus("S", 1000));
    },
    onCalculate1() {
      console.log(calculateBonus1("B", 1000));
      console.log(calculateBonus1("S", 1000));
    },
  },
};
</script>

<style></style>
