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
  catch(failCallBack) {
    return this.then(undefined, failCallBack); //catch的原理很简单，就是then方法中没有定义错误回调，会走到catch里面,调用then模拟传入错误回调
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
    let promise2 = new myPromise((resolve, reject) => {
      if (this.status === statusOptions["FULFILLED"]) {
        // promiseA+规范规定 onFulfilled, onRejected不能是同步的;
        setTimeout(() => {
          try {
            const x = onFulfilled(this.result); //执行函数，传出去终值
            resolvePromise(promise2, x, resolve, reject); //处理x的不同值 ,为了将这个promise2返回的值传递到下一个then中
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
              resolvePromise(promise2, x, resolve, reject); //处理x的不同值
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  finally(cb) {
    return this.then(
      (value) => {
        return myPromise.resolve(cb()).then(() => value); //
      },
      (err) => {
        return myPromise.resolve(cb()).then(() => {
          throw err;
        });
      }
    );
  }
  static all(promises) {
    try {
      let result = [];
      let i = 0; //这个为了标识每个promise拿到结果之后i自增，等待全部完成之后可以输出结果

      return new myPromise((resolve, reject) => {
        //processData就是封装了一下收集结果的函数
        function processData(index, data) {
          result[index] = data;
          i++;
          if (i === promises.length) {
            resolve(result); //全部成功之后才会改变为fulfilled状态
          }
        }
        promises.forEach((p, index) => {
          p.then((data) => {
            processData(index, data);
          }).catch(reject);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  static allSettled(promises) {
    try {
      let result = [];
      let i = 0; //这个为了标识每个promise拿到结果之后i自增，等待全部完成之后可以输出结果

      return new myPromise((resolve, reject) => {
        //processData就是封装了一下收集结果的函数
        function processData(index, data, status) {
          result[index] = {
            status,
            value: data,
          };
          i++;
          if (i === promises.length) {
            resolve(result); //全部成功之后才会改变为fulfilled状态
          }
        }
        promises.forEach((p, index) => {
          p.then((data) => {
            processData(index, data, "fulFilled");
          }).catch((err) => processData(index, err, "rejected"));
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  static race(promises) {
    try {
      return new myPromise((resolve, reject) => {
        promises.forEach((p) => {
          p.then(resolve, reject); //状态改变之后就不会再改变状态，所以后面执行不会改变结果的状态
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  static any(promises) {
    let result = [];
    let i = 0;
    return new myPromise((resolve, reject) => {
      function processData(index, data) {
        result[index] = data;
        i++;
        if (i === promises.length) {
          reject(new AggregateError(result)); //全部成功之后才会改变为fulfilled状态
        }
      }
      promises.forEach((p, index) => {
        p.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            processData(index, err);
          }
        );
      });
    });
  }
  static resolve(val) {
    // 是Promise实例，直接返回即可
    if (val && typeof val === "object" && val instanceof myPromise) {
      return val;
    }
    return new myPromise((resolve, reject) => {
      resolve(val);
    });
  }
  static reject(val) {
    return new myPromise((resolve, reject) => {
      reject(val);
    });
  }
}
// 为了将这个promise2返回的值传递到下一个then中，实现多个promise互相嵌套
function resolvePromise(promise2, x, resolve, reject) {
  try {
    // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
    // 解决下面案例的这种错误
    // let p = new Promise((resolve) => {
    //   resolve(0);
    // });
    // var p2 = p.then((data) => {
    //   return p2;
    // });
    if (promise2 === x) {
      return reject(
        new TypeError("Chaining cycle detected for promise #<Promise>")
      );
    }
    let called; //防止多次调用
    if (isFunction(x) || isObject(x)) {
      let then = x.then;
      // 如果then是函数，就默认是promise了,案例test6
      if (isFunction(then)) {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
            // 到了这里说明第一个.then返回的是一个promise，这里的y就是这个promise中resolve()成功的值
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } else {
      // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
      resolve(x);
    }
  } catch (error) {
    if (called) return;
    called = true;
    reject(error);
  }
}
module.exports = myPromise;
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
// const test5 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("成功");
//   }, 3000);
// }).then((res) => {
//   console.log(res);
// });
/**
 * 链式调用
 */
// const test5 = new myPromise((resolve, reject) => {
//   resolve("成功");
// })
//   .then((res) => {
//     return "第一个then" + res;
//   })
//   .then((res) => {
//     console.log(res);
//   });
/**
 * 返回的x是对象的形式
 */
// const test6 = new myPromise((resolve, reject) => {
//   resolve(100);
// })
//   .then((res) => {
//     console.log("fulfilled", res);
//     return new myPromise((resolve, reject) => resolve(3 * res));
//   })
//   .then((res) => {
//     console.log("fulfilled", res);
//   });
/**
 * 测试异步输出
 * onFulfilled或onRejected需要加settimeout模拟异步，这样才能让promise异步执行，但是这个只是我们模拟的写源码
 * 对应浏览器异步引擎，可能不是通过settimeout实现的
 */
// const test7 = new myPromise((resolve, reject) => {
//   resolve(100);
// }).then((res) => {
//   console.log("我是异步代码", res);
// });
// console.log("我是同步代码");
/**
 * 测试catch方法
 */
// const test8 = new myPromise((resolve, reject) => {
//   resolve(100);
// })
//   .then((res) => {
//     console.log("fulfilled", res);
//     return new myPromise((resolve, reject) => reject(3 * res)); //状态是rejected的时候，then里面没有错误回调，会走到catch里面
//   })
//   .catch((res) => {
//     console.log("rejected", res);
//   });
/**
 * 测试all方法
 */
// const p1 = new myPromise((resolve, reject) => {
//   resolve(100);
// });
// const p2 = new myPromise((resolve, reject) => {
//   resolve(100);
// });
// const p3 = new myPromise((resolve, reject) => {
//   reject("错误");
// });
// const test9 = myPromise
//   .all([p1, p2, p3])
//   .then(console.log)
//   .catch((err) => console.log("err", err));
// const test10 = myPromise
//   .allSettled([p1, p2, p3])
//   .then(console.log)
//   .catch((err) => console.log("err", err));

// console.log(test9);

/**
 * 测试resolve方法
 */
// const p1 = new myPromise((resolve, reject) => {
//   resolve(100);
// });
// const test11 = myPromise.resolve(p1).then(
//   (res) => console.log(res),
//   (err) => console.log(err)
// );

/**
 * 测试race方法
 */
// const p1 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100);
//   }, 2000);
// });
// const p2 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject("超时");
//   }, 1000);
// });
// const test12= myPromise
//   .race([p1, p2])
//   .then(console.log)
//   .catch((err) => console.log("err", err));
/**
 * 测试finally方法
 * 这个目前还是有点问题的，看视频确认一下
 */

// const test13 = new myPromise((resolve, reject) => {
//   resolve(100);
// })
//   .then(() => {
//     return 200;
//   })
//   .catch((err) => console.log("err", err))
//   .finally(() => {
//     alert("始终会执行的回调");
//   });
// .then((res) => {
//   console.log("我是finally后面的then", res);
// });
/**
 * 测试any方法,有一个成功就成功，所有的失败才失败
 */
// const p1 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100);
//   }, 200);
// });
// const p2 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject("超时");
//   }, 100);
// });
// const p3 = myPromise.resolve(2);

// const test14 = myPromise
//   .any([p1, p2, p3])
//   .then(console.log)
//   .then(console.log)
//   .catch((err) => console.log("err", err));
// 测试是否符合promiseA+规范,含有800多个测试用例，不是很好测试，放弃
myPromise.deferred = function() {
  const dfd = {};
  dfd.promise = new myPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
