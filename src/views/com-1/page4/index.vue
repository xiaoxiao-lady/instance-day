<template>
  <div class="animate">
    <!-- <el-button
      class="btn"
      @mouseenter.native="show = true"
      @mouseleave.native="show = false"
    >
      我的</el-button
    >
    <div class="tip" v-show="show">恭喜你，获得50分</div> -->
    <div class="tra"></div>
    <div class="tra1"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    handlerShow(e) {
      console.log(e);
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.animate {
  .btn {
    background-color: red;
    transition: all 2s ease;
    &:hover {
      background-color: blue;
    }
  }
  .tip {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: rgb(127, 197, 255);
    border-radius: 25px;
    text-align: center;
    opacity: 1;
    transition: opacity 10s ease;
  }
  .tra {
    width: 100px;
    height: 100px;
    background-image: url("https://img1.baidu.com/it/u=369566357,2582807175&fm=253&fmt=auto&app=138&f=JPEG?w=563&h=500");
    background-size: contain;
    border-radius: 50%;
    border: 2px solid #ccc;
    transform: rotate(0deg);
    transition: all 1s ease;
  }
  .tra:hover {
    transform: rotate(360deg);
  }
  .tra1 {
    width: 100px;
    height: 100px;
    background-image: url("https://img1.baidu.com/it/u=369566357,2582807175&fm=253&fmt=auto&app=138&f=JPEG?w=563&h=500");
    background-size: contain;
    border-radius: 50%;
    border: 2px solid #ccc;
    animation: myMove 2s ease;
  }
}
@keyframes myMove {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
