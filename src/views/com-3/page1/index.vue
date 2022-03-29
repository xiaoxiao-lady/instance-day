<template>
  <div>
    <child v-model="sex"></child>
    <!-- <child v-model="form"></child> -->
    <div>{{ msg }}</div>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  data() {
    return {
      form: {
        name: "",
        sex: "",
      },
      sex: "",
      msg: "哈哈",
    };
  },
  components: {
    child,
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
    sex(val) {
      console.log(val);
    },
  },
};
</script>

<style></style>
