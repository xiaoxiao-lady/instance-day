then(onFulfilled, onRejected) {
// onFulfilled 如果不是函数，就忽略 onFulfilled，直接返回 value
onFulfilled =
typeof onFulfilled === "function" ? onFulfilled : (value) => value;
onRejected =
typeof onRejected === "function"
? onRejected
: (err) => {
throw err;
};
// 实现链式调用所以需要返回的是一个 promise
let promise2 = new myPromise((resolve, reject) => {
if (this.status === statusOptions["FULFILLED"]) {
// promiseA+规范规定 onFulfilled, onRejected 不能是同步的;
setTimeout(() => {
try {
const x = onFulfilled(this.result); //执行函数，传出去终值
resolvePromise(promise2, x, resolve, reject); //处理 x 的不同值 ,为了将这个 promise2 返回的值传递到下一个 then 中
} catch (error) {
reject(error);
}
}, 0);
} else if (this.status === statusOptions["REJECTED"]) {
setTimeout(() => {
try {
const x = onRejected(this.result); //执行函数，传出去终值
resolvePromise(promise2, x, resolve, reject);
} catch (error) {
reject(error);
}
}, 0);
} else if (this.status === statusOptions["PENDING"]) {
// 实现异步
this.onFulfilledCallbacks.push(() => {
setTimeout(() => {
try {
const x = onFulfilled(this.result); //执行函数，传出去终值
resolvePromise(promise2, x, resolve, reject);
} catch (error) {
reject(error);
}
}, 0);
});
this.onRejectedCallbacks.push(() => {
setTimeout(() => {
try {
const x = onRejected(this.result); //执行函数，传出去终值
resolvePromise(promise2, x, resolve, reject); //处理 x 的不同值
} catch (error) {
reject(error);
}
}, 0);
});
}
});
return promise2;
}
