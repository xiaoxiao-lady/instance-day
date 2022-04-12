const statusOptions = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class myPromise {
  constructor(executor) {
    this.initValue(); //初始化值
    this.initBind(); //绑定this，要不然resolve里面的this指向不正确，this.status等不对
    executor(this.resolve, this.reject);
  }
  initValue() {
    this.result = undefined;
    this.status = "pending";
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(value) {
    this.status = statusOptions["FULFILLED"];
    this.result = value;
  }
  reject(reason) {
    this.status = statusOptions["REJECTED"];
    this.result = reason;
  }
  then() {}
}
const test1 = new myPromise((resolve, reject) => {
  resolve(1213);
});
const test2 = new myPromise((resolve, reject) => {
  reject("失败");
});
console.log(test1);
console.log(test2);
