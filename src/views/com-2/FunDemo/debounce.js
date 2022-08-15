export const debounce = function(fn, wait) {
  let timer;
  return function() {
    let that = this;
    clearTimeout(timer);
    timer = null;
    timer = setTimeout(() => {
      fn.apply(that, arguments);
    }, wait);
  };
};

export const throttle = (fn, wait) => {
  let old = 0;
  return function() {
    let now = +new Date();
    if (now > old + wait) {
      old = now;
      fn.apply(this, arguments);
    }
  };
};

export const throttle1 = (fn, wait) => {
  let timer = null;
  console.log(timer, "jaja----"); //只有第一次执行
  return function() {
    console.log(timer, "jaja"); //每次添加执行，timer不会被回收，这 也就是闭包的作用
    let that = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(that, args);
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  };
};
export const throttle2 = (fn, wait) => {
  let timer = null;
  let old = 0;
  return function() {
    const that = this;
    const args = arguments;
    let now = +new Date();
    if (now > old + wait) {
      if (timer) {
        timer = null;
        clearTimeout(timer);
      }
      old = now;
      fn.apply(that, args);
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          old = +new Date();
          fn.apply(that, args);
        }, wait);
      }
    }
  };
};
