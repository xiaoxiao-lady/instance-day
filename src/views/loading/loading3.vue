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
  padding: 1em;
  padding-top: 50%;
  box-sizing: border-box;
}
.loader {
  -webkit-animation: loader-1 2s infinite linear;
  animation: loader-1 2s infinite linear;
}
.loader:before,
.loader:after {
  content: "";
  width: 0;
  height: 0;
  border: 0.5em solid currentcolor;
  display: block;
  position: absolute;
  border-radius: 100%;
  -webkit-animation: loader-2 2s infinite ease-in-out;
  animation: loader-2 2s infinite ease-in-out;
}
.loader:before {
  top: 0;
  left: 50%;
}
.loader:after {
  bottom: 0;
  right: 50%;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
@-webkit-keyframes loader-1 {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loader-1 {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader-2 {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes loader-2 {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
