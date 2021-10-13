<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree
      size="small"
      class="filter-tree"
      default-expand-all
      :filter-node-method="filterNode"
      :load="loadNode"
      :props="props"
      :default-expand-all="false"
      :lazy="true"
      ref="tree"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      filterText: "",
      props: {
        label: "name",
        children: "zones",
        isLeaf: true,
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {},
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    loadNode(node, resolve) {
      console.log(node.level);
      if (node.level === 0) {
        let data = [];
        for (let i = 0; i < 5; i++) {
          data.push({
            name: "好的",
          });
        }
        console.log(data);
        return resolve(data);
      }
      if (node.level == 1) {
        let data = [];
        for (let i = 0; i < 100; i++) {
          data.push({
            name: `二级${i}`,
          });
        }
        return resolve(data);
      }
      if (node.level == 2) {
        let data = [];
        for (let i = 0; i < 1000; i++) {
          data.push({
            name: `三级${i}`,
          });
        }
        return resolve(data);
      }
    },
  },
};
</script>

<style>
</style>