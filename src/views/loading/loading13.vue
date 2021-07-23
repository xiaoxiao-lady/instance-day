<template>
  <div class="">
    <div class="spinner-box">
      <div class="solar-system">
        <div class="earth-orbit orbit">
          <div class="planet earth"></div>
          <div class="venus-orbit orbit">
            <div class="planet venus"></div>
            <div class="mercury-orbit orbit">
              <div class="planet mercury"></div>
              <div class="sun"></div>
            </div>
          </div>
        </div>
      </div>
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
.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.solar-system {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.orbit {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
  border-radius: 50%;
}

.earth-orbit {
  width: 165px;
  height: 165px;
  -webkit-animation: spin 12s linear 0s infinite;
}

.venus-orbit {
  width: 120px;
  height: 120px;
  -webkit-animation: spin 7.4s linear 0s infinite;
}

.mercury-orbit {
  width: 90px;
  height: 90px;
  -webkit-animation: spin 3s linear 0s infinite;
}

.planet {
  position: absolute;
  top: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3ff9dc;
}

.sun {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ffab91;
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
