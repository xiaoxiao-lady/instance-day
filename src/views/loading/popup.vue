<template>
  <div class="popup">
    <div class="mask" @click="hidden"></div>
    <div class="content">
      <slot></slot>
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
  methods: {
    hidden() {
      this.$emit("hiddenPopup");
    },
  },
};
</script>

<style scoped>
.popup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.content {
  width: 60%;
  height: 60%;
  background-color: #161b29;
  border-radius: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
