<template>
  <div class="contents">
    <!-- 这个是仿照我们文章的目录导航的那种效果，滚动定位到对应的位置 -->
    <div class="container">
      <div style="height:300px"></div>
      <div class="wrapper">
        <div class="section" style="height:100px;width:100%">
          <div>
            内容一
          </div>
        </div>
        <div class="section" style="height:100px;width:100%">
          <div>
            内容二
          </div>
        </div>
        <div class="section" style="height:300px;width:100%">
          <div>
            内容三
          </div>
        </div>
        <div class="section">
          内容4
          <div>
            <button @click="handleAddLine">新增</button>
          </div>
          <div style="border:1px solid red" v-if="tableList.length">
            <div
              v-for="(tab, index) in tableList"
              :key="index"
              style="height:40px"
            >
              {{ tab.name }}
            </div>
          </div>
        </div>
        <div class="section" style="height:700px;width:100%">
          <div>
            内容5
          </div>
        </div>
        <div class="section" style="height:700px;width:100%">
          <div>
            内容6
          </div>
        </div>
      </div>
      <!-- <div id="nac" style="height:500px;"></div> -->
      <nav class="nav">
        <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
          :tab-position="tabPosition"
        >
          <el-tab-pane
            :name="'tab' + index"
            :class="index == 0 ? 'current' : ''"
            v-for="(item, index) in list"
            :key="index"
            :label="item.name"
          ></el-tab-pane>
        </el-tabs>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "tab0",
      tabPosition: "right",
      scroll: "",
      list: [
        {
          name: "重要警示",
        },
        {
          name: "如何用药",
        },
        {
          name: "用药前注意事项",
        },
        {
          name: "用药后可能出现的副作用",
        },
        {
          name: "药品如何保存",
        },
        {
          name: "用药小贴士",
        },
      ],
      tableList: [],
    };
  },
  methods: {
    handleAddLine() {
      const len = this.tableList.length;
      this.tableList.push({ name: "行" + (len + 1) });
    },
    //这里传入的tab相当于item
    handleClick(tab, event) {
      console.log(tab.index);
      this.jump(tab.index);
    },
    dataScroll: function() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    jump(index) {
      let jump = document.getElementsByClassName("section");
      // 获取需要滚动的距离
      let total = jump[index].offsetTop;
      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },
    // 用循环的方式将每个标题离顶部的距离与滚动条当前位置对比来确定哪个标题需要变为高亮
    loadScroll: function() {
      var self = this;
      var sections = document.getElementsByClassName("section");
      for (var i = sections.length - 1; i >= 0; i--) {
        if (self.scroll >= sections[i].offsetTop - 100) {
          //我在上面规定了每个el-tab-pane标签的name属性值为tab+该标签的index值
          self.activeName = "tab" + i;
          break;
        }
      }
    },
  },
  watch: {
    //监听scroll变量，只要滚动条位置变化就会执行方法loadScroll
    // scroll: function() {
    //   this.loadScroll();
    // },
    scroll() {
      this.loadScroll();
    },
  },
  mounted() {
    // scroll代表滚动条距离页面顶部距离
    window.addEventListener("scroll", this.dataScroll);
  },
};
</script>

<style>
.nav {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ccc;
  border-radius: 20px;
}
.section {
  padding: 20px 50px;
}
/* 修改elementUI里面的样式  */
.contents .el-tabs__nav-wrap::after {
  width: 0px !important;
}
.el-tabs__active-bar {
  background-color: inherit;
}
</style>
