<template>
  <el-button @click="goOpen">打开新窗口</el-button>
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
    this.promiseAllTest();
  },
  methods: {
    goOpen() {
      const { href } = this.$router.resolve({ path: "/tree" });
      const popup = window.open(href);
      setTimeout(() => {
        console.log("加入消息");
        popup.postMessage("close", "*");
      }, 1000 * 6);
    },
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
      Promise.myResolve = function (value) {
        return new Promise((_, reject) => reject(value));
      };
    },
    promiseAllTest() {
      const p1 = Promise.resolve(1);
      const p2 = new Promise((resolve) => {
        setTimeout(() => resolve(2), 1000);
      });
      const p3 = new Promise((resolve) => {
        setTimeout(() => resolve(3), 3000);
      });
      // const p4 = Promise.reject("err4");
      // const p5 = Promise.reject("err5");
      // Promise.all([p1, p2, p5])
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
      this.promiseAll([p1, p2, p3])
        .then((res) => console.log(res))
        .catch(console.log);

      // // 1. 所有的异步Promise都成功了
      // const p11 = Promise.all([p1, p2, p3])
      //   .then(console.log) // [ 1, 2, 3 ]
      //   .catch(console.log);

      // // 2. 有一个Promise失败了
      // const p12 = Promise.all([p1, p2, p4])
      //   .then(console.log)
      //   .catch(console.log); // err4

      // // 3. 有两个Promise失败了，可以看到最终输出的是err4，第一个失败的返回值
      // const p13 = Promise.all([p1, p4, p5])
      //   .then(console.log)
      //   .catch(console.log); // err4
    },
    // 遍历传入的数组把接入放到数组里面，有一个错误直接reject()
    promiseAll(promises) {
      if (!Array.isArray(promises)) return;
      return new Promise((resolve, reject) => {
        let count = 0;
        let result = [];
        const len = promises.length;
        if (len === 0) return resolve([]);
        promises.forEach((p, i) => {
          Promise.resolve(p)
            .then((res) => {
              count += 1;
              result[i] = res;
              if (count === len) {
                resolve(result);
              }
            })
            .catch(reject);
        });
      });
    },
  },
};
</script>
