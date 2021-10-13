<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    const obj = {
      name: "王金玉",
      school: {
        address: "大同",
        name: "山西大同大学",
        a: {
          aa: "a",
        },
      },
    };
    const res = this.deepClone(obj);
  },
  methods: {
    isObject(source) {
      return typeof source == "object" && source != null;
    },
    deepClone(source) {
      if (!this.isObject(source)) return source;
      const cloneObj = Array.isArray(source) ? [] : {}; //考虑拷贝的是数组的情况
      for (let key in source) {
        console.log(key);
        //拷贝obj上面存在key
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (this.isObject(source[key])) {
            cloneObj[key] = this.deepClone(source[key]);
          } else {
            cloneObj[key] = source[key];
          }
        }
      }
      return cloneObj;
    },
  },
};
</script>

<style>
</style>