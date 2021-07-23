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
  border: 0 solid transparent;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}
.loader:before,
.loader:after {
  content: "";
  border: 0.2em solid currentcolor;
  border-radius: 50%;
  width: inherit;
  height: inherit;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: loader 1s linear infinite;
  animation: loader 1s linear infinite;
  opacity: 0;
}
.loader:before {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.loader:after {
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}
@-webkit-keyframes loader {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
@keyframes loader {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
