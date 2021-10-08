<template>
  <div>
    <import-dialog title="导入" @reflush="handlerUpload"> </import-dialog>
  </div>
</template>

<script>
import importDialog from "./index.vue";
export default {
  data() {
    return {};
  },
  components: {
    importDialog,
  },

  methods: {
    async handlerUpload(result) {
      const newResult = [];
      for (let i = 0; i < result.length; i++) {
        const data = {
          name: result[i]["规则名称"],
          code: result[i]["触发词"],
          groupName: result[i]["规则组"],
          conditions: result[i]["规则条件"],
          status: result[i]["状态"] === "停用" ? 1 : 0,
        };

        if (!data.name) {
          this.$message.error(`第${i + 2}行规则名称为空`);
          return false;
        } else if (data.name.length > 40) {
          this.$message.error(`第${i + 2}行规则名称长度超长`);
          return false;
        }

        if (!data.code) {
          this.$message.error(`第${i + 2}行触发词为空`);
          return false;
        } else if (data.code.length > 40) {
          this.$message.error(`第${i + 2}行触发词长度超长`);
          return false;
        }

        if (!result[i]["返回数据"]) {
          this.$message.error(`第${i + 2}行返回数据为空`);
          return false;
        }

        if (!result[i]["状态"]) {
          this.$message.error(`第${i + 2}行状态为空`);
          return false;
        } else if (
          result[i]["状态"] !== "停用" &&
          result[i]["状态"] !== "启用"
        ) {
          this.$message.error(`第${i + 2}行状态内容错误`);
          return false;
        }
        newResult.push(data);
      }
      try {
        if (!newResult || newResult.length === 0) {
          //   this.importing = false;
          this.$message.error("导入失败，数据为空");
          return false;
        } else {
          this.$message.success("成功");
          return;
          const res = await ruleImport(newResult);
          if (res.code == 0) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        }
      } catch (e) {
        this.$message.error("导入失败，请重试");
        // this.impor说ting = false;
      }
    },
  },
};
</script>

<style></style>
