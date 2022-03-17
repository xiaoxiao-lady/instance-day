<template>
  <el-select
    v-model="sex"
    placeholder="placeholder"
    @change="handleSelectChange"
  >
    <el-option label="男" value="1"></el-option>
    <el-option label="女" value="2"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ["value"], //v-model传值接收用value
  data() {
    return {
      sex: "", //props不是对象不能直接修改，所以重新声明一个
    };
  },
  methods: {
    handleSelectChange() {
      this.$emit("input", this.sex);
    },
  },
  watch: {
    value(val) {
      this.sex = val;
    },
  },
};
</script>

<style></style>
