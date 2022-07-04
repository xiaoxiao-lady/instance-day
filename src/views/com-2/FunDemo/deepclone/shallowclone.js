//学习资料： juejin.cn / post / 6844904197595332622;

https: function shallowClone(target) {
  var cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key]; //浅拷贝就是没有递归拷贝里面的子对象，所以子对象还是公用的同一块内存
  }
}

// 浅拷贝
let obj1 = {
  name: "浪里行舟",
  arr: [1, [2, 3], 4],
};
let obj2 = shallowClone(obj1);
obj2.name = "阿浪";
obj2.arr[1] = [6, 7, 8];
console.log("obj1", obj1, obj1.name, obj1.arr);
console.log("obj2", obj2, obj2.name, obj2.arr);
