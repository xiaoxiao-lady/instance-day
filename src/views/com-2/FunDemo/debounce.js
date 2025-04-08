import Vue from "vue";
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
