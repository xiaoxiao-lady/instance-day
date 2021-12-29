<template>
  <div></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    // /*
    // Promise对象成功状态
    // */
    // const p2 = new Promise((resolve) => resolve(2));
    // console.log(Promise.resolve(p2)); //Promise {<fulfilled>: '2'}
    // Promise.resolve(p2).then(console.log);
    // /*
    // Promise对象失败状态
    // */
    // const p3 = new Promise((_, reject) => reject("err3"));
    // console.log(Promise.resolve(p3)); //Promise {<rejected>: 'err3'}
    // Promise.resolve(p3).catch((err) => console.log(err)); //err3
    // /*
    // thenable对象
    // */
    // const p4 = {
    //   then(resolve) {
    //     setTimeout(() => resolve(4), 1000);
    //   },
    // };
    // console.log(Promise.resolve(p4)); //Promise {<pending>},值
    // Promise.resolve(p4).then(console.log); // 4
    // // // 5. 啥都没传
    // Promise.resolve().then(console.log); // undefined
    // const p2 = new Promise((resolve) => resolve(2));
    // this.myResolve(p2).then(console.log);
  },
  methods: {
    /*
       实现Promise.resolve
    */
    myResolve(value) {
      // 是Promise实例，直接返回即可
      if (value && typeof value == "object" && value instanceof Promise) {
        return value;
      }
      // 否则其他情况一律再通过Promise包装一下
      return new Promise((resolve) => resolve(value));
    },
    myReject() {
      Promise.myResolve = function(value) {
        return new Promise((_, reject) => reject(value));
      };
    },
  },
};
</script>
