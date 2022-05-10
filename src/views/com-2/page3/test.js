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
        setTimeout(() => {
          try {
            const x = onFulfilled(this.result);
            resolvePromise(promise2, x, resolve1, reject1);
          } catch (error) {
            reject1(error);
          }
        }, 0);
      } else if (this.status == "rejected") {
        setTimeout(() => {
          try {
            const x = onRejected(this.result);
            resolvePromise(promise2, x, resolve1, reject1);
          } catch (error) {
            reject1(error);
          }
        }, 0);
      } else if (this.status == "pending") {
        this.fulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.result);
              resolvePromise(promise2, x, resolve1, reject1);
            } catch (error) {
              reject1(error);
            }
          }, 0);
        });
        this.rejectedCallback.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.result);
              resolvePromise(promise2, x, resolve1, reject1);
            } catch (error) {
              reject1(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  catch(failCallBack) {
    return this.then(undefined, failCallBack);
  }
  finally(cb) {
    return this.then(
      (value) => {
        return myPromise.resolve(cb()).then(() => value); //finall没有返回值，但是他后面的链式有上一个链式的返回值
      },
      (err) => {
        return myPromise.resolve(cb()).then(() => {
          throw err;
        });
      }
    );
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
  // allSettled的结果返回的是数组对象，他返回的结果一直是成功的，但是他内部会表述清楚没有p的状态，有status和value两个状态
  static allSettled(promises) {
    let result = [];
    let count = 0;
    return new myPromise((resolve, reject) => {
      function addData(data, i, status) {
        result[i] = {
          status,
          value: data,
        };
        count++;
        if (count == promises.length) {
          resolve(result);
        }
      }
      promises.forEach((p, i) => {
        p.then((res) => {
          addData(res, i, "fulfilled");
        }).catch((err) => {
          addData(err, i, "rejected");
        });
      });
    });
  }
  static race(promises) {
    return new myPromise((resolve, reject) => {
      promises.forEach((p, i) => {
        p.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
  static any() {
    let result = [];
    let count = 0;
    return new myPromise((resolve, reject) => {
      function addData(err, i) {
        result[i] = err;
        count++;
        if (count === promises.length) {
          reject(new AggregateError(result));
        }
      }
      promises.forEach((p, i) => {
        p.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            addData(err, i);
          }
        );
      });
    });
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error("返回的和当前的promise一样会陷入死循环，造成栈溢出");
  }
  if (x instanceof myPromise) {
    let then = x.then;
    if (isFunction(then)) {
      then.call(
        x,
        (y) => {
          resolvePromise(y, x, resolve, reject);
        },
        (err) => {
          reject(err);
        }
      );
    } else {
      resolve(x);
    }
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
  reject("错误");
});
console.log("p1", p1);
const p2 = new myPromise((resolve, reject) => {
  resolve(2);
})
  .then((res) => {
    return "finally-上";
  })
  .finally(() => {})
  .then((res) => {
    console.log("finally", res);
  });
console.log("p2", p2);
console.log("all-before");
myPromise.race([p1, p2]).then(
  (res) => {
    console.log("all", res);
  },
  (err) => {
    console.log("all-err", err);
  }
);

async function name() {
  console.log("async name");
  const a = await name1();
  console.log("async name2");
  return 1;
}

async function name1() {
  console.log("async name1");
}
