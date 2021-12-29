<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree
      size="small"
      class="filter-tree"
      :filter-node-method="filterNode"
      :props="props"
      :data="data"
      show-checkbox
      @check-change="handleCheckChange"
      ref="tree"
    ></el-tree>
    <el-button @click="getCheckedNodes">确定</el-button>
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
      },
      data: [],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    // ReactElement.isValidElement = function (object) {
    //    return typeof object === 'object' && object !== null && object.?typeof === REACT_ELEMENT_TYPE;
    // };
    let data = [];
    for (let i = 0; i < 5; i++) {
      data.push({
        name: `菜单${i}`,
        children: [],
      });
      for (let j = 0; j < 50; j++) {
        data[i].children.push({
          name: `二级${j}`,
          children: [],
        });
        for (let k = 0; k < 50; k++) {
          data[i].children[j].children.push({
            name: `三级${k}`,
          });
        }
      }
    }
    console.log(data);
    this.data = data;
  },
  methods: {
    handleBack() {
      window.history.back();
    },
    getCheckedNodes() {
      const nodes = this.$refs.tree.getCheckedNodes();
      console.log(nodes);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        let data = [];
        for (let i = 0; i < 5; i++) {
          data.push({
            name: `菜单${i}`,
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
        for (let i = 0; i < 100; i++) {
          data.push({
            name: `三级${i}`,
            leaf: true, //申请时候是叶子节点（下面没有子节点）
          });
        }
        return resolve(data);
      }
      return resolve([]);
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
  },
};
</script>

<style>
</style>