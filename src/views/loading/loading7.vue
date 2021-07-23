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
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
  border: 0.2em solid transparent;
  border-top-color: currentcolor;
  border-radius: 50%;
  -webkit-animation: 1s loader linear infinite;
  animation: 1s loader linear infinite;
  position: relative;
}
.loader:before {
  content: "";
  display: block;
  width: inherit;
  height: inherit;
  position: absolute;
  top: -0.2em;
  left: -0.2em;
  border: 0.2em solid currentcolor;
  border-radius: 50%;
  opacity: 0.5;
}
@-webkit-keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
