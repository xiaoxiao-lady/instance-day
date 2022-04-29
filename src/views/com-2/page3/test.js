function isFunction(value) {
  return Object.prototype.toString.call(value) == "[object Function]";
}
function isObject(value) {
  return Object.prototype.toString.call(value) == "[object Object]";
}
class myPromise {
  constructor(executor) {
    this.status = "pending";
    this.result = "";
    this.fulfilledCallback = [];
    this.rejectedCallback = [];
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    executor(this.resolve, this.reject);
    // 这个记得改变一下this的执行，不让这个方法只是传参过去，this指向不确定
  }
  resolve(value) {
    if (this.status !== "pending") return;
    this.status = "fulfilled";
    this.result = value;
    this.fulfilledCallback.forEach((fn) => fn());
  }
  reject(reason) {
    if (this.status !== "pending") return;
    this.status = "rejected";
    this.result = reason;
    this.rejectedCallback.forEach((fn) => fn());
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled == "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected == "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let promise2 = new myPromise((resolve1, reject1) => {
      if (this.status == "fulfilled") {
        try {
          const x = onFulfilled(this.result);
          resolvePromise(promise2, x, resolve1, reject1);
        } catch (error) {
          reject1();
        }
      } else if (this.status == "rejected") {
        try {
          const x = onRejected(this.result);
          resolvePromise(promise2, x, resolve1, reject1);
        } catch (error) {
          reject1();
        }
      } else if (this.status == "pending") {
        this.fulfilledCallback.push(() => {
          try {
            const x = onFulfilled(this.result);
            resolvePromise(promise2, x, resolve1, reject1);
          } catch (error) {
            reject1();
          }
        });
        this.rejectedCallback.push(() => {
          try {
            const x = onRejected(this.result);
            resolvePromise(promise2, x, resolve1, reject1);
          } catch (error) {
            reject1();
          }
        });
      }
    });
    return promise2;
  }
  static resolve(value) {
    if (isObject(value) && value instanceof myPromise) {
      return value;
    } //如果值是promise实例，直接返回
    return new myPromise((resolve) => {
      resolve(value);
    });
  }
  static reject(error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
  static all(promises) {
    let result = [];
    let count = 0;

    return new myPromise((resolve, reject) => {
      function addData(i, data) {
        result[i] = data;
        count++;
        if (count == promises.length) {
          resolve(result);
        }
      }
      promises.forEach((p, i) => {
        try {
          p.then(
            (res) => {
              addData(i, res);
            },
            (error) => {
              reject(error);
            }
          );
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  debugger;
  if (promise2 === x) {
    throw new Error("返回的和当前的promise一样会陷入死循环，造成栈溢出");
  }
  if (x instanceof myPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

// new myPromise((resolve, reject) => {
//   resolve(1);
// })
//   .then((res) => {
//     return new myPromise((resolve) => resolve(2));
//   })
//   .then((res) => {
//     // console.log(res);
//   });

// myPromise.resolve(3).then((res) => {
//   console.log("=====", res);
// });

// myPromise.reject("原因错误").then(
//   () => {},
//   (error) => {
//     console.log("=====", error);
//   }
// );

const p1 = new myPromise((resolve, reject) => {
  resolve(1);
}).then((res) => {});
console.log(p1);
const p2 = new myPromise((resolve, reject) => {
  resolve(2);
});
console.log(p2);
console.log("all-before");
myPromise.all([p1, p2]).then((res) => {
  console.log("all", res);
});
