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
}
.loader:before,
.loader:after,
.loader {
  border-radius: 50%;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: loader 1.5s infinite ease-in-out;
  animation: loader 1.5s infinite ease-in-out;
}
.loader {
  color: currentcolor;
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  top: -1em;
}
.loader:before {
  right: 100%;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 100%;
}
.loader:before,
.loader:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  width: inherit;
  height: inherit;
}
@-webkit-keyframes loader {
  0%,
  80%,
  100% {
    box-shadow: 0 1em 0 -1em;
  }
  40% {
    box-shadow: 0 1em 0 -0.2em;
  }
}
@keyframes loader {
  0%,
  80%,
  100% {
    box-shadow: 0 1em 0 -1em;
  }
  40% {
    box-shadow: 0 1em 0 -0.2em;
  }
}
</style>
