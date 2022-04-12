const statusOptions = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
// promise用class实现，所以我们平时输出的promise就是类的形式
class myPromise {
  constructor(executor) {
    this.initValue(); //初始化值
    this.initBind(); //绑定this，要不然resolve里面的this指向不正确，this.status等不对
    try {
      //throw的时候执行reject
      executor(this.resolve, this.reject);
    } catch (error) {
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
    (this.onFulfilledCallbacks || []).forEach((fn) => fn());
  }
  reject(reason) {
    if (this.status !== statusOptions["PENDING"]) return; //state不可变
    this.status = statusOptions["REJECTED"];
    this.result = reason;
    (this.onRejectedCallbacks || []).forEach((fn) => fn());
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
    if (this.status === statusOptions["FULFILLED"]) {
      console.log(this.value);
      onFulfilled(this.value); //执行函数，传出去终值
    } else if (this.status === statusOptions["REJECTED"]) {
      onRejected(this.value);
    }
    // else if (this.status === statusOptions["PENDING"]) {
    //   // 定时器的时候状态会是pending
    //   this.onFulfilledCallbacks.push(onFulfilled.bind(this));
    //   this.onRejectedCallbacks.push(onRejected.bind(this));
    // }
  }
}
/**
 * resolve
 */
const test1 = new myPromise((resolve, reject) => {
  resolve(1213);
  resolve("失败"); //测试状态不可变
});
/**
 * reject
 */
const test2 = new myPromise((resolve, reject) => {
  reject("失败");
});
/**
 * throw
 */
const test3 = new myPromise((resolve, reject) => {
  throw "错误";
});
const test4 = new myPromise((resolve, reject) => {
  resolve(1212);
}).then((res) => {
  console.log(res);
});
console.log(test1);
// console.log(test2);
// console.log(test3);
