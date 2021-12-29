<template>
  <div id="we-page">
    <el-button
      type="primary"
      @click="handleBack"
    >返回上一个页面</el-button>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
    ></el-input>
    <el-tree
      size="small"
      class="filter-tree"
      :filter-node-method="filterNode"
      :default-expand-all="false"
      :lazy="true"
      :props="props"
      show-checkbox
      :load="loadNode"
      @check-change="handleCheckChange"
      @check="getNode"
      ref="tree"
    ></el-tree>
    <el-button @click="getCheckedNodes">确定</el-button>
    <img
      :src="imgUrl"
      alt=""
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      imgUrl: "",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  async mounted() {
    this.test();
    // 调用函数，取到截图的二进制数据，对图片进行处理（保存本地、展示等）
    const element = document.getElementById("we-page");
    const imgBlobData = await this.convertToImage(element, {
      width: 128,
      height: 128,
    });
    this.imgUrl = imgBlobData;
    console.log(imgBlobData);
  },

  methods: {
    test() {
      fun1();
      console.log(fun2);
      function fun1() {
        console.log("1");
      }
      const fun2 = function () {
        console.log("b");
      };
    },
    handleBack() {
      //   window.history.go(-1);
      a = 1;
      console.log(a);
      window.history.back();
      //
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
      console.log(node);
      if (node.level === 0) {
        let data = [];
        for (let i = 0; i < 5; i++) {
          data.push({
            name: `菜单${i}`,
          });
        }
        setTimeout(() => {
          return resolve(data);
        }, 100);
      }
      if (node.level == 1) {
        let data = [];
        for (let i = 0; i < 5; i++) {
          data.push({
            name: `二级${i}`,
          });
        }
        setTimeout(() => {
          return resolve(data);
        }, 100);
      }
      if (node.level == 2) {
        let data = [];

        for (let i = 0; i < 100; i++) {
          data.push({
            name: `三级${i}`,
            leaf: true, //申请时候是叶子节点（下面没有子节点）
          });
        }
        setTimeout(() => {
          return resolve(data);
        }, 100);
      }
      return resolve([]);
    },
    getNode() {
      const nodes = this.$refs.tree.getCheckedNodes();
      let data = this.filterTreeAll(nodes);
    },
    filterTreeAll(tree) {
      let arr = [];
      let brr = [];
      if (tree && tree.length !== 0) {
        tree.forEach((item) => {
          if (Array.isArray(item.children)) {
            item.children.forEach((child) => {
              brr.push(child);
            });
          }
          for (let index in brr) {
            if (item.id === brr[index].id) {
              return false; //当前循环不push
            }
          }
          arr.push(item);
        });
      }
      return arr;
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
  },
};
</script>

<style>
</style>