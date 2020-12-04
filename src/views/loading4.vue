<template>
  <div class="">
    <div class="box">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.box {
  display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 3px;
  font-size: 40px;
  line-height: 200px;
  color: #d60b52;
  text-align: center;
}
.loader {
  position: relative;
  width: 25%;
  height: 25%;
  display: inline-block;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}
.loader:before,
.loader:after {
  content: "";
  display: block;
  position: absolute;
  background-color: currentcolor;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 50%;
  box-shadow: -0.5em 0 0 currentcolor;
  -webkit-animation: loader 1s linear infinite;
  animation: loader 1s linear infinite;
}
.loader:after {
  top: 50%;
  bottom: 0;
  -webkit-animation-delay: 0.25s;
  animation-delay: 0.25s;
}
@-webkit-keyframes loader {
  0%,
  100% {
    box-shadow: -0.5em 0 0 transparent;
    background-color: currentcolor;
  }
  50% {
    box-shadow: -0.5em 0 0 currentcolor;
    background-color: transparent;
  }
}
@keyframes loader {
  0%,
  100% {
    box-shadow: -0.5em 0 0 transparent;
    background-color: currentcolor;
  }
  50% {
    box-shadow: -0.5em 0 0 currentcolor;
    background-color: transparent;
  }
}
</style>
