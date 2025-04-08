import { isFun } from "../utils/index";
import Vue from "vue";

// 防抖

// 不设置时间的
Vue.directive("debounce", {
  bind(el, binding) {
    let timer = null;
    el.addEventListener("click", () => {
      if (timer) {
        clearTimeout(timer);
        timer = null; //防止内存泄漏
      }
      timer = setTimeout(() => {
        binding.value();
      }, 1000);
    });
  },
});
// 传多个参数设置时间的
Vue.directive("debounce1", {
  bind(el, binding) {
    let timer = null;
    const { value = [] } = binding;
    const [fn, wait = 0] = value;
    el.addEventListener("click", () => {
      if (timer) {
        clearTimeout(timer);
        timer = null; //防止内存泄漏
      }
      timer = setTimeout(() => {
        fn();
      }, wait);
    });
  },
});
