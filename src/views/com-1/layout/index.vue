<template>
  <div>
    <div class="selction1">
      <h1>九宫格1</h1>
      <div class="layout-wrap">
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
      </div>
    </div>
    <div class="selction2">
      <h1>九宫格2</h1>
      <div class="layout-wrap">
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
      </div>
    </div>
    <div class="selction3">
      <h1>九宫格2</h1>
      <div class="layout-wrap">
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
        <li>我的</li>
      </div>
    </div>
    <div class="selction4">
      <h1>垂直居中</h1>
      <div class="center-wrap">
        <div class="container">内容</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style scoped>
.selction1 .layout-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid rgb(51, 255, 0);
  box-sizing: border-box;
  overflow: hidden;
  padding: 10px;
}

.selction1 .layout-wrap li {
  width: calc(calc(100% / 3) - 20px);
  height: 200px;
  background-color: red;
  box-sizing: border-box;
  text-align: center;
  line-height: 200px;
  margin: 10px;
}
.selction2 .layout-wrap {
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(0, 81, 255);
}

.selction2 .layout-wrap li {
  float: left;
  width: calc(calc(100% / 3) - 20px);
  height: 200px;
  background-color: rgb(255, 0, 221);
  box-sizing: border-box;
  text-align: center;
  line-height: 200px;
  margin: 10px;
}
.selction3 .layout-wrap {
  width: 900px;
  overflow: hidden;
  border: 1px solid rgb(0, 81, 255);
  padding: 10px;
}

.selction3 .layout-wrap li {
  float: left;
  width: calc(300px - 20px);
  height: 200px;
  background-color: rgb(255, 0, 221);
  box-sizing: border-box;
  text-align: center;
  line-height: 200px;
  margin: 10px;
}
.selction4 .center-wrap {
  width: 500px;
  height: 300px;
  background-color: red;
  display: table;
}
.selction4 .center-wrap .container {
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
</style>