<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">打开</el-button>
    <child :visible.sync="dialogVisible"></child>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: {
    child,
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
    dialogVisible(val) {
      console.log(val);
    },
  },
};
</script>

<style></style>
