<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="width"
    :before-close="dialogBeforeClose"
  >
    <div>我的</div>
    <div slot="footer">
      <el-button @click="dialogBeforeClose()">取 消</el-button>
      <el-button type="primary" @click="dialogBeforeClose()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["visible"], //v-model传值接收用value
  data() {
    return {
      dialogVisible: false, //props不是对象不能直接修改，所以重新声明一个
    };
  },
  methods: {
    dialogBeforeClose() {
      this.dialogVisible = false;
      this.$emit("update:visible", false);
    },
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
  },
};
</script>

<style></style>
