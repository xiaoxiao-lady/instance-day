const statusOptions = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
function isObject(val) {
  return Object.prototype.toString.call(val) === "[object Object]";
}
function isFunction(val) {
  return Object.prototype.toString.call(val) === "[object Function]";
}
// promise用class实现，所以我们平时输出的promise就是类的形式
class myPromise {
  constructor(executor) {
    this.initValue(); //初始化值
    this.initBind(); //绑定this，要不然resolve里面的this指向不正确，this.status等不对
    try {
      //throw的时候执行reject
      executor(this.resolve, this.reject);
    } catch (error) {
      console.log(error);
      this.reject(error);
    }
  }
  initValue() {
    this.result = undefined;
    this.status = "pending";
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(value) {
    if (this.status !== statusOptions["PENDING"]) return; //state不可变，只能从pending变化为成功或者失败
    this.status = statusOptions["FULFILLED"];
    this.result = value;
    this.onFulfilledCallbacks.forEach((fn) => fn());
  }
  reject(reason) {
    if (this.status !== statusOptions["PENDING"]) return; //state不可变
    this.status = statusOptions["REJECTED"];
    this.result = reason;
    this.onRejectedCallbacks.forEach((fn) => fn());
  }
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    // 实现链式调用所以需要返回的是一个promise
    const promise2 = new myPromise((resolve, reject) => {
      if (this.status === statusOptions["FULFILLED"]) {
        try {
          const x = onFulfilled(this.result); //执行函数，传出去终值
          resolvePromise(promise2, x, resolve, reject); //处理x的不同值
        } catch (error) {
          reject(error);
        }
      } else if (this.status === statusOptions["REJECTED"]) {
        try {
          const x = onRejected(this.result); //执行函数，传出去终值
          resolvePromise(promise2, x, resolve, reject); //处理x的不同值
        } catch (error) {
          reject(error);
        }
      } else if (this.status === statusOptions["PENDING"]) {
        // 实现异步
        this.onFulfilledCallbacks.push(() => {
          try {
            const x = onFulfilled(this.result); //执行函数，传出去终值
            resolvePromise(promise2, x, resolve, reject); //处理x的不同值
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.result); //执行函数，传出去终值
            resolvePromise(promise2, x, resolve, reject); //处理x的不同值
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  try {
    // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
    if (promise2 === x) {
      return reject(
        new TypeError("Chaining cycle detected for promise #<Promise>")
      );
    }
    if (isFunction(x) || isObject(x)) {
    } else {
      // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
      resolve(x);
    }
  } catch (error) {
    reject(error);
  }
}
/**
 * resolve
 */
// const test1 = new myPromise((resolve, reject) => {
//   resolve(1213);
//   resolve("失败"); //测试状态不可变
// });
/**
 * reject
 */
// const test2 = new myPromise((resolve, reject) => {
//   reject("失败");
// });
/**
 * throw
 */
// const test3 = new myPromise((resolve, reject) => {
//   throw "错误";
// });
// const test4 = new myPromise((resolve, reject) => {
//   resolve(1212);
// }).then((res) => {});
/**
 * 异步
 */
const test5 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 3000);
}).then((res) => {
  console.log(res);
});
console.log(test5);
// console.log(test2);
// console.log(test3);
