<template>
  <div class="">
    <h1 class="loadingtext">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
    </h1>
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
h1.loadingtext {
  text-align: center;
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  font-size: 4.6875em;
  color: transparent;
  letter-spacing: 0.01em;
}
h1.loadingtext span {
  text-shadow: 0 0 2px rgba(22, 22, 22, 0.9), 0 15px 25px rgba(0, 0, 0, 0.3),
    0 -2px 3px rgba(0, 0, 0, 0.1), 0 -5px 10px rgba(22, 22, 22, 0.5),
    0 5px 10px rgba(0, 0, 0, 0.3), 0 3px 4px rgba(22, 22, 22, 0.2),
    0 0 20px rgba(22, 22, 22, 0.45);
  -webkit-animation: letters 0.85s ease-in-out infinite alternate;
  -moz-animation: letters 0.85s ease-in-out infinite alternate;
  -ms-animation: letters 0.85s ease-in-out infinite alternate;
  animation: letters 0.85s ease-in-out infinite alternate;
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
}
h1.loadingtext span:nth-child(2) {
  -webkit-animation-delay: 0.15s;
  -moz-animation-delay: 0.15s;
  -o-animation-delay: 0.15s;
  animation-delay: 0.15s;
}
h1.loadingtext span:nth-child(3) {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  -o-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
h1.loadingtext span:nth-child(4) {
  -webkit-animation-delay: 0.45s;
  -moz-animation-delay: 0.45s;
  -o-animation-delay: 0.45s;
  animation-delay: 0.45s;
}
h1.loadingtext span:nth-child(5) {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  -o-animation-delay: 0.6s;
  animation-delay: 0.6s;
}
h1.loadingtext span:nth-child(6) {
  -webkit-animation-delay: 0.75s;
  -moz-animation-delay: 0.75s;
  -o-animation-delay: 0.75s;
  animation-delay: 0.75s;
}
h1.loadingtext span:nth-child(7) {
  -webkit-animation-delay: 0.9s;
  -moz-animation-delay: 0.9s;
  -o-animation-delay: 0.9s;
  animation-delay: 0.9s;
}
@keyframes letters {
  to {
    text-shadow: 0 0 2px rgba(204, 208, 212, 0.2), 0 0 3px rgba(0, 0, 0, 0.02),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0),
      0 0 0 rgba(255, 255, 255, 0);
  }
}
@-moz-keyframes letters {
  to {
    text-shadow: 0 0 2px rgba(204, 208, 212, 0.2), 0 0 3px rgba(0, 0, 0, 0.02),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0),
      0 0 0 rgba(255, 255, 255, 0);
  }
}
@-webkit-keyframes letters {
  to {
    text-shadow: 0 0 2px rgba(22, 22, 22, 0.2), 0 0 3px rgba(0, 0, 0, 0.02),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
