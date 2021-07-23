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
  margin-bottom: 0.25em;
  vertical-align: top;
  -webkit-transition: 0.3s color, 0.3s border;
  transition: 0.3s color, 0.3s border;
}
.loader {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
  -webkit-perspective: 1000px;
  perspective: 1000px;
  border-radius: 50%;
  display: inline-block;
  width: 100%;
  height: 100%;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}
.loader:before,
.loader:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}
.loader:before {
  -webkit-transform: rotateX(70deg);
  transform: rotateX(70deg);
}
.loader:after {
  -webkit-transform: rotateY(70deg);
  transform: rotateY(70deg);
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: translate(-50%, -50%) rotateZ(0deg);
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotateZ(360deg);
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: translate(-50%, -50%) rotateZ(0deg);
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotateZ(360deg);
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}
@-webkit-keyframes rotateccw {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(-360deg);
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
@keyframes rotateccw {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(-360deg);
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
@-webkit-keyframes spin {
  0%,
  100% {
    box-shadow: 0.2em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: 0.2em 0.2em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 0.2em 0 0px currentcolor;
  }
  37% {
    box-shadow: -0.2em 0.2em 0 0 currentcolor;
  }
  50% {
    box-shadow: -0.2em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -0.2em -0.2em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -0.2em 0 0 currentcolor;
  }
  87% {
    box-shadow: 0.2em -0.2em 0 0 currentcolor;
  }
}
@keyframes spin {
  0%,
  100% {
    box-shadow: 0.2em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: 0.2em 0.2em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 0.2em 0 0px currentcolor;
  }
  37% {
    box-shadow: -0.2em 0.2em 0 0 currentcolor;
  }
  50% {
    box-shadow: -0.2em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -0.2em -0.2em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -0.2em 0 0 currentcolor;
  }
  87% {
    box-shadow: 0.2em -0.2em 0 0 currentcolor;
  }
}
</style>
