<template>
  <div class="">
    <div class="shaft-load3">
      <div class="shaft1"></div>
      <div class="shaft2"></div>
      <div class="shaft3"></div>
      <div class="shaft4"></div>
      <div class="shaft5"></div>
      <div class="shaft6"></div>
      <div class="shaft7"></div>
      <div class="shaft8"></div>
      <div class="shaft9"></div>
      <div class="shaft10"></div>
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
.shaft-load3 {
  position: relative;
  width: 100px;
  height: 100px;
}
.shaft-load3 > div {
  background: transparent;
  border: 4px solid transparent;
  border-color: transparent transparent transparent #506248;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate "("-50%, -50% ")";
  -moz-transform: translate "("-50%, -50% ")";
  -ms-transform: translate "("-50%, -50% ")";
  -o-transform: translate "("-50%, -50% ")";
  transform: translate "("-50%, -50% ")";
  -webkit-transform: translate(-50%, -50%) rotate(0);
  -moz-transform: translate(-50%, -50%) rotate(0);
  -ms-transform: translate(-50%, -50%) rotate(0);
  -o-transform: translate(-50%, -50%) rotate(0);
  transform: translate(-50%, -50%) rotate(0);
  -webkit-animation: loading3 2s infinite ease-in-out;
  -moz-animation: loading3 2s infinite ease-in-out;
  -o-animation: loading3 2s infinite ease-in-out;
  animation: loading3 2s infinite ease-in-out;
}
.shaft-load3 .shaft1 {
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  -o-animation-delay: 0.1s;
  animation-delay: 0.1s;
  width: 20px;
  height: 20px;
}
.shaft-load3 .shaft2 {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  -o-animation-delay: 0.2s;
  animation-delay: 0.2s;
  width: 25px;
  height: 25px;
}
.shaft-load3 .shaft3 {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  animation-delay: 0.3s;
  width: 30px;
  height: 30px;
}
.shaft-load3 .shaft4 {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  -o-animation-delay: 0.4s;
  animation-delay: 0.4s;
  width: 35px;
  height: 35px;
}
.shaft-load3 .shaft5 {
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
  -o-animation-delay: 0.5s;
  animation-delay: 0.5s;
  width: 40px;
  height: 40px;
}
.shaft-load3 .shaft6 {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  animation-delay: 0.6s;
  width: 45px;
  height: 45px;
}
.shaft-load3 .shaft7 {
  -webkit-animation-delay: 0.7s;
  -moz-animation-delay: 0.7s;
  -o-animation-delay: 0.7s;
  animation-delay: 0.7s;
  width: 50px;
  height: 50px;
}
.shaft-load3 .shaft8 {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  -o-animation-delay: 0.8s;
  animation-delay: 0.8s;
  width: 55px;
  height: 55px;
}
.shaft-load3 .shaft9 {
  -webkit-animation-delay: 0.9s;
  -moz-animation-delay: 0.9s;
  -o-animation-delay: 0.9s;
  animation-delay: 0.9s;
  width: 60px;
  height: 60px;
}
.shaft-load3 .shaft10 {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  -o-animation-delay: 1s;
  animation-delay: 1s;
  width: 65px;
  height: 65px;
}

@-webkit-keyframes loading3 {
  50% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    -moz-transform: translate(-50%, -50%) rotate(360deg);
    -ms-transform: translate(-50%, -50%) rotate(360deg);
    -o-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
    border-color: transparent transparent rgba(143, 165, 132, 0.1) #8fa584;
  }
  75% {
    border-color: rgba(143, 165, 132, 0.1) transparent transparent #8fa584;
  }
}
@-moz-keyframes loading3 {
  50% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    -moz-transform: translate(-50%, -50%) rotate(360deg);
    -ms-transform: translate(-50%, -50%) rotate(360deg);
    -o-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
    border-color: transparent transparent rgba(143, 165, 132, 0.1) #8fa584;
  }
  75% {
    border-color: rgba(143, 165, 132, 0.1) transparent transparent #8fa584;
  }
}
@-o-keyframes loading3 {
  50% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    -moz-transform: translate(-50%, -50%) rotate(360deg);
    -ms-transform: translate(-50%, -50%) rotate(360deg);
    -o-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
    border-color: transparent transparent rgba(143, 165, 132, 0.1) #8fa584;
  }
  75% {
    border-color: rgba(143, 165, 132, 0.1) transparent transparent #8fa584;
  }
}
@keyframes loading3 {
  50% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    -moz-transform: translate(-50%, -50%) rotate(360deg);
    -ms-transform: translate(-50%, -50%) rotate(360deg);
    -o-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
    border-color: transparent transparent rgba(143, 165, 132, 0.1) #8fa584;
  }
  75% {
    border-color: rgba(143, 165, 132, 0.1) transparent transparent #8fa584;
  }
}
</style>
