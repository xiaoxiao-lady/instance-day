<template>
  <div>
    <el-button ref="btn">点击设置点击设置</el-button>
  </div></template
>

<script>
export default {
  mounted() {
    init();
  },
  methods: {
    init() {
      var arr = [];
      const btn = this.$refs.btn;
      btn.addEventListener("click", () => {
        const a = new Array(10000).fill(1);
        const b = new Array(20000).fill(1);
        arr.push(b);
      });
    },
  },
};
</script>

<style></style>
