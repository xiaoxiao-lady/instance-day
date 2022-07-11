<template>
  <div class="page" id="page">
    <div class="left">
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-submenu
          :index="index + ''"
          v-for="(item, index) in menuList"
          :key="index"
        >
          <template slot="title">{{ item.name }}</template>

          <el-menu-item
            :index="index + '' + i"
            v-for="(item1, i) in item.children"
            :key="2 * i"
            @click="handleClickMenu(item1)"
            >{{ item1.name }}</el-menu-item
          >
        </el-submenu>
        <!-- <el-menu-item
          :index="index"
          v-for="(item, index) in menuList"
          :key="index"
          @click="handleClickMenu(item)"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>-->
      </el-menu>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    menuList() {
      return this.$router.options.routes[0].children;
    },
  },
  mounted() {},
  methods: {
    handleClickMenu(item) {
      this.$router.push(item.path);
    },
    async b() {
      await a();
    },
    async a() {
      await new Promise();
    },
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  display: flex;
}
.left {
  width: 200px;
}
.right {
  width: calc(100% - 200px);
  padding: 20px;
}
</style>
